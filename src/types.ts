export interface Cause {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  imageIndex: 'child' | 'hungry' | 'cows' | 'community';
  donorsCount: number;
  isUrgent?: boolean;
  impactNote: string;
}

export interface ImpactStats {
  mealsDistributed: number;
  childrenSupported: number;
  cowsCaredFor: number;
  welfareDrives: number;
  activeVolunteers: number;
  totalDonationsAmount: number;
  lastVerifiedDate: string;
  auditNote: string;
}

export interface DonationRecord {
  id: string;
  orderId: string;
  paymentId: string;
  amount: number;
  currency: string;
  causeId: string;
  causeTitle: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  panNumber?: string;
  frequency: 'one-time' | 'monthly';
  message?: string;
  consentUpdates: boolean;
  status: 'verified' | 'pending' | 'failed' | 'refunded';
  receiptNumber: string;
  createdAt: string;
}

export interface SystemSettings {
  ngoName: string;
  legalName: string;
  registrationNumber: string;
  darpanId: string;
  section80G: string;
  section12A: string;
  officeAddress: string;
  contactEmail: string;
  contactPhone: string;
  googleFormsVolunteerUrl: string;
  googleFormsPartnerUrl: string;
  googleFormsEnabled: boolean;
  razorpayKeyId: string;
  upiId: string;
  receiptPrefix: string;
  hasServerSecret?: boolean;
}

export interface VolunteerSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  areaOfInterest: string;
  availability: string;
  message?: string;
  status: 'new' | 'contacted' | 'onboarded';
  createdAt: string;
}

export interface PartnershipSubmission {
  id: string;
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  partnershipType: string;
  estimatedBudget?: string;
  proposalDetails: string;
  status: 'new' | 'in_discussion' | 'approved';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'children' | 'meals' | 'cows' | 'community' | 'volunteers';
  image: string;
  caption: string;
  date: string;
  location: string;
}

export interface StoryItem {
  id: string;
  title: string;
  summary: string;
  cause: string;
  date: string;
  image: string;
  fullStory: string;
  metrics: string;
}
