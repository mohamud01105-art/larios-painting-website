import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  Mail,
  ShieldCheck,
  FileImage,
  ArrowRight,
} from 'lucide-react';
import { EstimateFormData } from '../types.ts';

interface EstimateFormProps {
  initialService?: string;
}

export const EstimateForm: React.FC<EstimateFormProps> = ({ initialService }) => {
  const [formData, setFormData] = useState<EstimateFormData>({
    fullName: '',
    phone: '',
    email: '',
    zipCode: '',
    propertyType: 'residential',
    serviceNeeded: initialService || 'Interior Painting',
    interiorOrExterior: 'both',
    projectSize: 'Medium (2–4 Rooms or Standard Siding)',
    preferredStartDate: 'Within the next 2–4 weeks',
    projectDetails: '',
    photos: [],
    website_trap: '', // Anti-spam honeypot
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successResponse, setSuccessResponse] = useState<{
    referenceNumber: string;
    message: string;
    submittedDetails: any;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync initialService if prop changes
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceNeeded: initialService }));
    }
  }, [initialService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handlePhotoFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const remainingSlots = 4 - formData.photos.length;
    if (remainingSlots <= 0) {
      setError('You can upload up to 4 project photos with your estimate request.');
      return;
    }

    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      // Validate file size (< 4MB per photo)
      if (file.size > 4 * 1024 * 1024) {
        setError(`"${file.name}" exceeds the 4MB limit. Please upload a smaller photo.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            photos: [
              ...prev.photos,
              {
                name: file.name,
                size: file.size,
                type: file.type,
                dataUrl: event.target?.result as string,
              },
            ],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validations
    if (!formData.fullName.trim()) {
      setError('Please provide your full name.');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please provide a valid 10-digit phone number so Austin can contact you.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!/^\d{5}$/.test(formData.zipCode.trim())) {
      setError('Please provide a valid 5-digit ZIP code for the property.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit estimate request. Please try again or call us.');
      }

      // Success
      setSuccessResponse(data);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(
        err.message ||
          'A network error occurred while submitting your request. Please call (402) 504-2881 directly.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      zipCode: '',
      propertyType: 'residential',
      serviceNeeded: 'Interior Painting',
      interiorOrExterior: 'both',
      projectSize: 'Medium (2–4 Rooms or Standard Siding)',
      preferredStartDate: 'Within the next 2–4 weeks',
      projectDetails: '',
      photos: [],
      website_trap: '',
    });
    setSuccessResponse(null);
    setError(null);
  };

  return (
    <section id="free-estimate" className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A50918] mb-3">
            <span>Fast & Free Quotes</span>
            <span aria-hidden="true">·</span>
            <span>No Obligation</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight mb-4">
            Request Your Free Painting Estimate
          </h2>
          <p className="text-base text-neutral-600">
            Tell us about your home or commercial project. Austin will review your details, inspect photos, and follow up promptly with a clear estimate or to arrange an on-site walkthrough.
          </p>
        </div>

        {/* Success Card */}
        {successResponse ? (
          <div className="bg-neutral-50 rounded-2xl border-2 border-[#A50918]/20 p-8 sm:p-10 shadow-sm animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-display text-2xl font-bold text-center text-neutral-900 mb-2">
              Estimate Request Received
            </h3>
            <p className="text-center text-sm text-neutral-600 max-w-lg mx-auto mb-6">
              Thank you, <strong className="text-neutral-900">{successResponse.submittedDetails?.fullName}</strong>. Your estimate inquiry has been securely recorded and dispatched directly to Austin at Larios Painting.
            </p>

            {/* Reference Box */}
            <div className="bg-white rounded-xl p-5 border border-neutral-200 max-w-md mx-auto mb-8">
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                <span>Confirmation Reference:</span>
                <span className="font-mono font-bold text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded">
                  {successResponse.referenceNumber}
                </span>
              </div>
              <div className="text-xs text-neutral-600 space-y-1 pt-2 border-t border-neutral-100">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Service:</span>
                  <span className="font-semibold text-neutral-900">{successResponse.submittedDetails?.serviceNeeded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Property:</span>
                  <span className="capitalize font-semibold text-neutral-900">{successResponse.submittedDetails?.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Location ZIP:</span>
                  <span className="font-mono font-semibold text-neutral-900">{successResponse.submittedDetails?.zipCode}</span>
                </div>
                {successResponse.submittedDetails?.photoCount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Photos Attached:</span>
                    <span className="font-semibold text-neutral-900">{successResponse.submittedDetails?.photoCount} images</span>
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-[#111111] text-white rounded-xl p-6 mb-8 text-xs leading-relaxed">
              <div className="font-bold text-sm mb-2 text-[#E53E3E] uppercase tracking-wider">
                What Happens Next:
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-neutral-300">
                <li>Austin reviews your surface specifications and project size.</li>
                <li>We contact you by phone or email within 1 business day to confirm details or schedule an on-site walkthrough.</li>
                <li>You receive an itemized, transparent written estimate with no hidden fees.</li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:14025042881"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider bg-[#A50918] text-white hover:bg-[#870612] rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call (402) 504-2881 Now</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          /* The Quote Request Form */
          <form
            onSubmit={handleSubmit}
            className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 sm:p-10 shadow-xs"
            noValidate
          >
            {/* Anti-spam Honeypot field (hidden from real users) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website_trap">Leave this blank</label>
              <input
                type="text"
                id="website_trap"
                name="website_trap"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website_trap}
                onChange={handleChange}
              />
            </div>

            {/* Error Message Box */}
            {error && (
              <div className="mb-8 p-4 bg-red-50 border-l-4 border-[#A50918] text-red-800 rounded-r-lg flex items-start gap-3 text-sm animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-[#A50918] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Please check your submission</div>
                  <div>{error}</div>
                </div>
              </div>
            )}

            {/* Step 1: Contact Information */}
            <div className="mb-8 pb-8 border-b border-neutral-200">
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">
                1. Your Contact Information
              </h3>
              <p className="text-xs text-neutral-500 mb-5">
                We will only use this to send your estimate and confirm walkthrough scheduling.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold text-neutral-800 mb-1.5">
                    Full Name <span className="text-[#A50918]">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="e.g. Michael Henderson"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A50918] focus:border-transparent outline-none transition-shadow"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-neutral-800 mb-1.5">
                    Phone Number <span className="text-[#A50918]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="(402) 555-0199"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A50918] focus:border-transparent outline-none transition-shadow"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-neutral-800 mb-1.5">
                    Email Address <span className="text-[#A50918]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A50918] focus:border-transparent outline-none transition-shadow"
                  />
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-xs font-bold text-neutral-800 mb-1.5">
                    Property ZIP Code <span className="text-[#A50918]">*</span>
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    required
                    maxLength={5}
                    placeholder="e.g. 68102, 68502, 51501"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A50918] focus:border-transparent outline-none transition-shadow"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Project Specifications */}
            <div className="mb-8 pb-8 border-b border-neutral-200">
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">
                2. Project Specifications
              </h3>
              <p className="text-xs text-neutral-500 mb-5">
                Select your property type and primary painting needs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {/* Property Type Radio */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-2">
                    Property Type <span className="text-[#A50918]">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer text-xs font-bold transition-colors ${
                        formData.propertyType === 'residential'
                          ? 'border-[#A50918] bg-white text-[#A50918] ring-1 ring-[#A50918]'
                          : 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="propertyType"
                        value="residential"
                        checked={formData.propertyType === 'residential'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span>Residential</span>
                    </label>

                    <label
                      className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer text-xs font-bold transition-colors ${
                        formData.propertyType === 'commercial'
                          ? 'border-[#A50918] bg-white text-[#A50918] ring-1 ring-[#A50918]'
                          : 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="propertyType"
                        value="commercial"
                        checked={formData.propertyType === 'commercial'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span>Commercial</span>
                    </label>
                  </div>
                </div>

                {/* Scope: Interior or Exterior */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-2">
                    Surface Scope <span className="text-[#A50918]">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['interior', 'exterior', 'both'] as const).map((scope) => (
                      <label
                        key={scope}
                        className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer text-xs font-bold capitalize transition-colors ${
                          formData.interiorOrExterior === scope
                            ? 'border-[#A50918] bg-white text-[#A50918] ring-1 ring-[#A50918]'
                            : 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        <input
                          type="radio"
                          name="interiorOrExterior"
                          value={scope}
                          checked={formData.interiorOrExterior === scope}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span>{scope === 'both' ? 'Both Int/Ext' : scope}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Service Needed Dropdown */}
                <div>
                  <label htmlFor="serviceNeeded" className="block text-xs font-bold text-neutral-800 mb-1.5">
                    Primary Service Needed <span className="text-[#A50918]">*</span>
                  </label>
                  <select
                    id="serviceNeeded"
                    name="serviceNeeded"
                    value={formData.serviceNeeded}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A50918] focus:border-transparent outline-none"
                  >
                    <option value="Interior Painting">Interior Painting</option>
                    <option value="Exterior Painting">Exterior Painting</option>
                    <option value="Residential Painting">Residential Painting</option>
                    <option value="Commercial Painting">Commercial Painting</option>
                    <option value="Painting & Staining">Painting & Staining</option>
                    <option value="Wallpapering">Wallpapering</option>
                    <option value="Pressure Washing">Pressure Washing</option>
                    <option value="Multiple Services">Multiple Combined Services</option>
                  </select>
                </div>

                {/* Approximate Project Size */}
                <div>
                  <label htmlFor="projectSize" className="block text-xs font-bold text-neutral-800 mb-1.5">
                    Approximate Project Size
                  </label>
                  <select
                    id="projectSize"
                    name="projectSize"
                    value={formData.projectSize}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A50918] focus:border-transparent outline-none"
                  >
                    <option value="Small (Single Room, Accent Wall or Touch-up)">
                      Small (Single Room, Accent Wall or Touch-up)
                    </option>
                    <option value="Medium (2–4 Rooms or Standard Siding)">
                      Medium (2–4 Rooms or Standard Siding)
                    </option>
                    <option value="Large (Full Home Interior or Exterior)">
                      Large (Full Home Interior or Exterior)
                    </option>
                    <option value="Full Commercial Facility / Multi-Unit">
                      Full Commercial Facility / Multi-Unit
                    </option>
                    <option value="Deck / Pergola / Fence Staining Only">
                      Deck / Pergola / Fence Staining Only
                    </option>
                    <option value="Not sure / Need consultation">
                      Not sure / Need on-site walkthrough
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="preferredStartDate" className="block text-xs font-bold text-neutral-800 mb-1.5">
                  Preferred Project Start Date
                </label>
                <select
                  id="preferredStartDate"
                  name="preferredStartDate"
                  value={formData.preferredStartDate}
                  onChange={handleChange}
                  className="w-full text-sm px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A50918] focus:border-transparent outline-none"
                >
                  <option value="As soon as possible">As soon as possible</option>
                  <option value="Within the next 2–4 weeks">Within the next 2–4 weeks</option>
                  <option value="Within the next 1–2 months">Within the next 1–2 months</option>
                  <option value="Flexible / Planning ahead for season">
                    Flexible / Planning ahead for season
                  </option>
                  <option value="Specific target date (see notes)">
                    Specific target date (noted in details)
                  </option>
                </select>
              </div>

              {/* Additional Project Details */}
              <div className="mt-4">
                <label htmlFor="projectDetails" className="block text-xs font-bold text-neutral-800 mb-1.5">
                  Additional Project Details
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  rows={3}
                  placeholder="Tell us about the current condition of the paint, ceiling height, peeling areas, color changes, or any specific deadlines..."
                  value={formData.projectDetails}
                  onChange={handleChange}
                  className="w-full text-sm px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A50918] focus:border-transparent outline-none transition-shadow"
                />
              </div>
            </div>

            {/* Step 3: Optional Photo Uploads */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display text-lg font-bold text-neutral-900">
                  3. Optional Project Photos
                </h3>
                <span className="text-xs text-neutral-500">
                  {formData.photos.length}/4 photos attached
                </span>
              </div>
              <p className="text-xs text-neutral-500 mb-4">
                Snap a few photos of your walls, siding, trim, or deck. Photos help Austin estimate labor and surface prep requirements accurately.
              </p>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-neutral-300 hover:border-[#A50918] bg-white rounded-xl p-6 text-center cursor-pointer transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handlePhotoFiles(e.target.files)}
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-2 text-neutral-600">
                  <Upload className="w-5 h-5 text-[#A50918]" />
                </div>
                <div className="text-xs font-bold text-neutral-900 mb-1">
                  Click to select photos or drag and drop
                </div>
                <div className="text-[11px] text-neutral-500">
                  PNG, JPG, or WEBP up to 4MB each (Max 4 photos)
                </div>
              </div>

              {/* Photo Thumbnails */}
              {formData.photos.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  {formData.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="relative aspect-4/3 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group"
                    >
                      <img
                        src={photo.dataUrl}
                        alt={`Project attachment ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePhoto(index);
                        }}
                        className="absolute top-1.5 right-1.5 p-1 bg-black/70 hover:bg-black text-white rounded-full transition-colors"
                        aria-label="Remove photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 px-2 py-1 text-[10px] text-white truncate">
                        {photo.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Privacy & Anti-Spam Notice */}
            <div className="mb-6 p-3.5 bg-neutral-100/70 rounded-lg flex items-center gap-2.5 text-xs text-neutral-600">
              <ShieldCheck className="w-4 h-4 text-[#A50918] shrink-0" />
              <span>
                Your privacy is protected. Inquiries are transmitted directly to Austin at Larios Painting. We never sell or share your contact details.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 text-sm font-extrabold uppercase tracking-wider text-white bg-[#A50918] hover:bg-[#870612] active:bg-[#70040e] disabled:opacity-60 rounded-xl shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A50918]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting & Dispatching Estimate...</span>
                </>
              ) : (
                <>
                  <span>REQUEST MY FREE ESTIMATE</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
