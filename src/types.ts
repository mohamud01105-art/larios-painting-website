export type ServiceId =
  | 'interior'
  | 'exterior'
  | 'residential'
  | 'commercial'
  | 'staining'
  | 'wallpapering'
  | 'pressure-washing';

export interface ServiceItem {
  id: ServiceId;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  surfaceDetails: string[];
  popularFor: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'exterior' | 'residential' | 'before-after' | 'prep' | 'interior' | 'staining' | 'commercial';
  location: string;
  description: string;
  image: string;
  isBeforeAfter?: boolean;
  beforeImage?: string;
  afterImage?: string;
  beforeDetails?: string;
  afterDetails?: string;
}

export interface EstimateFormData {
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
  photos: Array<{ name: string; size: number; type: string; dataUrl: string }>;
  website_trap?: string;
}
