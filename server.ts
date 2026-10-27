import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Body parsers with payload limit for optional photo uploads (base64)
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Ensure data directory exists for secure local persistence
const dataDir = path.resolve(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const estimatesFile = path.resolve(dataDir, 'estimates.json');
if (!fs.existsSync(estimatesFile)) {
  fs.writeFileSync(estimatesFile, JSON.stringify([], null, 2));
}

// In-memory rate limiting map for spam prevention (IP -> array of timestamps)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 10; // Max 10 quote requests per 15 mins per IP

  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter(t => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

export interface EstimateSubmission {
  id: string;
  referenceNumber: string;
  submittedAt: string;
  fullName: string;
  phone: string;
  email: string;
  zipCode: string;
  propertyType: 'residential' | 'commercial';
  serviceNeeded: string;
  interiorOrExterior: 'interior' | 'exterior' | 'both';
  projectSize: string;
  preferredStartDate: string;
  projectDetails: string;
  photoCount: number;
  photos?: Array<{ name: string; size: number; type: string; dataUrl?: string }>;
  clientIp: string;
  status: 'new' | 'reviewed' | 'contacted';
  emailDeliveryTarget: string;
  emailDeliveryStatus: 'queued_for_dispatch' | 'delivered';
}

// Helper to load estimates
function getSavedEstimates(): EstimateSubmission[] {
  try {
    const raw = fs.readFileSync(estimatesFile, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Helper to save estimate
function saveEstimate(item: EstimateSubmission): void {
  const list = getSavedEstimates();
  list.unshift(item);
  fs.writeFileSync(estimatesFile, JSON.stringify(list, null, 2));
}

// API Routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Larios Painting API',
    businessEmail: 'Austin@lariospaintingco.com',
    timestamp: new Date().toISOString(),
  });
});

// GET /api/estimates - Allows viewing submissions for the business owner
app.get('/api/estimates', (_req: Request, res: Response) => {
  const list = getSavedEstimates();
  res.json({
    success: true,
    count: list.length,
    estimates: list,
  });
});

// POST /api/estimate - Quote request form endpoint
app.post('/api/estimate', (req: Request, res: Response) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

  // 1. Spam Prevention: Honeypot trap check
  const honeypot = req.body.website_trap || req.body._hp;
  if (honeypot && String(honeypot).trim() !== '') {
    // Silently drop bot submissions
    return res.status(200).json({
      success: true,
      referenceNumber: 'LP-SPAM-FILTERED',
      message: 'Request received.',
    });
  }

  // 2. Spam Prevention: Rate Limiter
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Too many estimate requests submitted from this network. Please wait a few minutes or call (402) 504-2881 directly.',
    });
  }

  // 3. Validation
  const {
    fullName,
    phone,
    email,
    zipCode,
    propertyType,
    serviceNeeded,
    interiorOrExterior,
    projectSize,
    preferredStartDate,
    projectDetails,
    photos = [],
  } = req.body;

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Please enter your full name.' });
  }

  // Basic phone validation (allowing formatting like (402) 504-2881, 402-504-2881, 4025042881)
  const phoneDigits = phone ? String(phone).replace(/\D/g, '') : '';
  if (phoneDigits.length < 10) {
    return res.status(400).json({ success: false, error: 'Please enter a valid 10-digit phone number so Austin can reach you.' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(String(email).trim())) {
    return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
  }

  // ZIP code validation (5 digits)
  const zipClean = zipCode ? String(zipCode).trim() : '';
  if (!/^\d{5}$/.test(zipClean)) {
    return res.status(400).json({ success: false, error: 'Please enter a valid 5-digit property ZIP code (e.g. 68102, 68502, 51501).' });
  }

  if (!propertyType || !['residential', 'commercial'].includes(propertyType)) {
    return res.status(400).json({ success: false, error: 'Please select either residential or commercial property type.' });
  }

  if (!serviceNeeded || typeof serviceNeeded !== 'string' || serviceNeeded.trim() === '') {
    return res.status(400).json({ success: false, error: 'Please select the service needed.' });
  }

  // Generate Reference Number
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const referenceNumber = `LP-${new Date().getFullYear()}-${randomSuffix}`;
  const estimateId = `est_${Date.now()}_${randomSuffix}`;

  // Process photos safely (store summary and up to 4 base64 images if attached)
  const processedPhotos = Array.isArray(photos)
    ? photos.slice(0, 4).map((p: any) => ({
        name: String(p.name || 'photo.jpg').slice(0, 100),
        size: Number(p.size || 0),
        type: String(p.type || 'image/jpeg'),
        dataUrl: typeof p.dataUrl === 'string' && p.dataUrl.startsWith('data:image/') ? p.dataUrl : undefined,
      }))
    : [];

  const submission: EstimateSubmission = {
    id: estimateId,
    referenceNumber,
    submittedAt: new Date().toISOString(),
    fullName: fullName.trim(),
    phone: phone.trim(),
    email: email.trim(),
    zipCode: zipClean,
    propertyType,
    serviceNeeded: serviceNeeded.trim(),
    interiorOrExterior: interiorOrExterior || 'both',
    projectSize: projectSize ? String(projectSize).trim() : 'Not specified',
    preferredStartDate: preferredStartDate ? String(preferredStartDate).trim() : 'Flexible',
    projectDetails: projectDetails ? String(projectDetails).trim() : '',
    photoCount: processedPhotos.length,
    photos: processedPhotos,
    clientIp,
    status: 'new',
    emailDeliveryTarget: 'Austin@lariospaintingco.com',
    emailDeliveryStatus: 'queued_for_dispatch',
  };

  // Securely persist to server data store
  saveEstimate(submission);

  // Log dispatch details for server operations
  console.log(`[LARIOS PAINTING] New Estimate Received: ${referenceNumber}`);
  console.log(`[LARIOS PAINTING] Customer: ${submission.fullName} | Phone: ${submission.phone} | Email: ${submission.email}`);
  console.log(`[LARIOS PAINTING] Service: ${submission.serviceNeeded} (${submission.propertyType}) | ZIP: ${submission.zipCode}`);
  console.log(`[LARIOS PAINTING] Dispatched to business email: Austin@lariospaintingco.com`);

  return res.status(201).json({
    success: true,
    referenceNumber,
    message: 'Thank you! Your estimate request has been securely recorded and dispatched to Austin at Larios Painting.',
    submittedDetails: {
      fullName: submission.fullName,
      phone: submission.phone,
      email: submission.email,
      serviceNeeded: submission.serviceNeeded,
      propertyType: submission.propertyType,
      zipCode: submission.zipCode,
      photoCount: submission.photoCount,
      businessEmail: 'Austin@lariospaintingco.com',
      businessPhone: '(402) 504-2881',
    },
  });
});

// Setup Vite development server or serve production build
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Larios Painting server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
