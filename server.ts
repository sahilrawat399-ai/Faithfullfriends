import express, { Request, Response } from 'express';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- IN-MEMORY AUDITABLE DATA STORE WITH SEED DATA ---
interface DonationRecord {
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

interface VolunteerSubmission {
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

interface PartnershipSubmission {
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

// Seed Verified Impact Stats
let impactStats = {
  mealsDistributed: 142850,
  childrenSupported: 3840,
  cowsCaredFor: 645,
  welfareDrives: 188,
  activeVolunteers: 456,
  totalDonationsAmount: 3125400,
  lastVerifiedDate: '2026-10-20',
  auditNote: 'Verified by Chartered Accountant & Governing Council'
};

// Seed Causes with Verified Goals
let causesData = [
  {
    id: 'feed-child',
    title: 'Feed a Child',
    subtitle: 'Nutritious meals & daily morning nourishment for children in need',
    description: 'Providing wholesome, hygiene-certified balanced meals rich in proteins and vitamins to school-going and underprivileged children in temporary settlements.',
    targetAmount: 500000,
    raisedAmount: 342500,
    imageIndex: 'child',
    donorsCount: 428,
    isUrgent: true,
    impactNote: 'Every ₹501 provides wholesome daily lunches to children for a week.'
  },
  {
    id: 'feed-hungry',
    title: 'Feed the Hungry',
    subtitle: 'Daily hot meal langar and mobile food distribution for vulnerable families',
    description: 'Hot meal distribution van serving daily lunches and dinners outside public hospitals, elder care homes, and daily-wage clusters.',
    targetAmount: 600000,
    raisedAmount: 485000,
    imageIndex: 'hungry',
    donorsCount: 612,
    isUrgent: false,
    impactNote: 'Fresh rotis, dal, and seasonal vegetables prepared fresh daily.'
  },
  {
    id: 'cow-welfare',
    title: 'Care for Cows (Gau Seva)',
    subtitle: 'Nutritious green fodder, clean water, and shelter for sacred cows',
    description: 'Dedicated sanctuary care for injured, abandoned, and elderly cows with 24/7 veterinarian access, fresh green grass, jaggery, and clean bedding.',
    targetAmount: 450000,
    raisedAmount: 310200,
    imageIndex: 'cows',
    donorsCount: 395,
    isUrgent: false,
    impactNote: 'Supporting over 640 cows in verified gaushalas with daily nutritional care.'
  },
  {
    id: 'community-welfare',
    title: 'Community Welfare & Relief',
    subtitle: 'Emergency winter kits, dry rations, and healthcare assistance',
    description: 'Relief operations delivering heavy winter blankets, tarpaulins, dry grocery ration kits, and medical aid to marginalized communities during emergencies.',
    targetAmount: 400000,
    raisedAmount: 265000,
    imageIndex: 'community',
    donorsCount: 284,
    isUrgent: false,
    impactNote: 'Direct on-ground relief verified by local welfare coordinators.'
  }
];

// Seed Verified Donations
const donationsStore: DonationRecord[] = [
  {
    id: 'don_seed_001',
    orderId: 'order_ffw_179210012',
    paymentId: 'pay_rzp_test_9041284',
    amount: 1001,
    currency: 'INR',
    causeId: 'feed-child',
    causeTitle: 'Feed a Child',
    donorName: 'Aarav Sharma',
    donorEmail: 'aarav.sharma@example.com',
    donorPhone: '+91 98765 43210',
    panNumber: 'ABCPS1234F',
    frequency: 'one-time',
    message: 'May all children receive good health and education.',
    consentUpdates: true,
    status: 'verified',
    receiptNumber: 'FFW/2026-27/1001',
    createdAt: '2026-10-21T09:14:00.000Z'
  },
  {
    id: 'don_seed_002',
    orderId: 'order_ffw_179210089',
    paymentId: 'pay_rzp_test_9041299',
    amount: 2500,
    currency: 'INR',
    causeId: 'cow-welfare',
    causeTitle: 'Care for Cows (Gau Seva)',
    donorName: 'Meera Deshmukh',
    donorEmail: 'meera.d@example.com',
    donorPhone: '+91 98220 11223',
    panNumber: 'BMDPD4321K',
    frequency: 'monthly',
    message: 'Monthly Gau Seva contribution for fodder and veterinary medicines.',
    consentUpdates: true,
    status: 'verified',
    receiptNumber: 'FFW/2026-27/1002',
    createdAt: '2026-10-22T14:32:00.000Z'
  },
  {
    id: 'don_seed_003',
    orderId: 'order_ffw_179210144',
    paymentId: 'pay_rzp_test_9041350',
    amount: 501,
    currency: 'INR',
    causeId: 'feed-hungry',
    causeTitle: 'Feed the Hungry',
    donorName: 'Rajesh K. Verma',
    donorEmail: 'rajesh.verma@example.com',
    donorPhone: '+91 99112 88776',
    frequency: 'one-time',
    message: 'In loving memory of my grandparents.',
    consentUpdates: false,
    status: 'verified',
    receiptNumber: 'FFW/2026-27/1003',
    createdAt: '2026-10-22T18:45:00.000Z'
  }
];

// Seed Volunteers
const volunteersStore: VolunteerSubmission[] = [
  {
    id: 'vol_001',
    fullName: 'Pooja Sundaram',
    email: 'pooja.sundaram@example.com',
    phone: '+91 97110 44556',
    city: 'New Delhi',
    areaOfInterest: 'Children Education & Meals',
    availability: 'Weekends (Saturday & Sunday)',
    message: 'I have experience in conducting weekend workshops and food packing.',
    status: 'onboarded',
    createdAt: '2026-10-18T11:20:00.000Z'
  },
  {
    id: 'vol_002',
    fullName: 'Vikram Malhotra',
    email: 'vikram.m@example.com',
    phone: '+91 98990 33221',
    city: 'Noida',
    areaOfInterest: 'Gau Seva & Animal Care',
    availability: 'Flexible (4 hours weekly)',
    message: 'Passionate about animal rescue and gaushala assistance.',
    status: 'contacted',
    createdAt: '2026-10-20T16:15:00.000Z'
  }
];

// Seed Partnerships
const partnershipsStore: PartnershipSubmission[] = [
  {
    id: 'part_001',
    organizationName: 'Zenith Logistics CSR',
    contactPerson: 'Anjali Kapoor (Director CSR)',
    email: 'csr@zenithlogistics.in',
    phone: '+91 11 4050 6070',
    partnershipType: 'CSR Meal Van Sponsorship',
    estimatedBudget: '₹12,00,000 / year',
    proposalDetails: 'Interested in sponsoring a dedicated daily hot food distribution van in industrial worker corridors.',
    status: 'in_discussion',
    createdAt: '2026-10-15T10:00:00.000Z'
  }
];

// Admin & Portal Settings
let systemSettings = {
  ngoName: 'Faithful Friends Welfare',
  legalName: 'Faithful Friends Welfare Society',
  registrationNumber: 'FFWS/2021/DEL/7841',
  darpanId: 'DL/2021/0284721',
  section80G: 'AAATF1289RF20214',
  section12A: 'AAATF1289RE20212',
  officeAddress: 'Plot 14-B, Institutional Area, Sector 5, Rohini, New Delhi - 110085',
  contactEmail: 'contact@faithfulfriendswelfare.org',
  contactPhone: '+91 11 2786 5400 / +91 98100 12345',
  googleFormsVolunteerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScDemoVolunteerForm_FFWelfare/viewform?embedded=true',
  googleFormsPartnerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScDemoPartnerForm_FFWelfare/viewform?embedded=true',
  googleFormsEnabled: true,
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_FFWelfareDemo',
  upiId: 'faithfulfriends@sbi',
  receiptPrefix: 'FFW/2026-27/'
};

// --- API ROUTES ---

// Health
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Impact Statistics
app.get('/api/impact', (_req: Request, res: Response) => {
  res.json(impactStats);
});

app.put('/api/impact', (req: Request, res: Response) => {
  const { adminToken, updates } = req.body;
  if (adminToken !== 'ffw_admin_secret_token_2026') {
    return res.status(401).json({ error: 'Unauthorized administrative operation.' });
  }
  impactStats = {
    ...impactStats,
    ...updates,
    lastVerifiedDate: new Date().toISOString().split('T')[0]
  };
  res.json({ success: true, impactStats });
});

// Causes
app.get('/api/causes', (_req: Request, res: Response) => {
  res.json(causesData);
});

// Settings (Public & Admin)
app.get('/api/settings', (_req: Request, res: Response) => {
  // Return safe public config
  const safeConfig = {
    ...systemSettings,
    hasServerSecret: Boolean(process.env.RAZORPAY_KEY_SECRET)
  };
  res.json(safeConfig);
});

app.put('/api/settings', (req: Request, res: Response) => {
  const { adminToken, settings } = req.body;
  if (adminToken !== 'ffw_admin_secret_token_2026') {
    return res.status(401).json({ error: 'Unauthorized administrative operation.' });
  }
  systemSettings = { ...systemSettings, ...settings };
  res.json({ success: true, settings: systemSettings });
});

// Payment: Create Order
app.post('/api/donations/create-order', (req: Request, res: Response) => {
  try {
    const { amount, causeId, donorName, donorEmail, donorPhone, panNumber, frequency, message, consentUpdates } = req.body;

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount < 10) {
      return res.status(400).json({ error: 'Donation amount must be at least ₹10.' });
    }
    if (!donorName || !donorEmail || !donorPhone) {
      return res.status(400).json({ error: 'Full name, email address, and mobile number are required.' });
    }

    const matchedCause = causesData.find(c => c.id === causeId) || causesData[0];
    const generatedOrderId = `order_ffw_${Date.now()}_${Math.floor(Math.random() * 9000 + 1000)}`;

    // Generate cryptographic order signature for test sandbox verification
    const secret = process.env.RAZORPAY_KEY_SECRET || 'test_demo_secret_key_ffw_2026';
    const mockExpectedToken = crypto
      .createHmac('sha256', secret)
      .update(`${generatedOrderId}|${numericAmount}`)
      .digest('hex');

    res.json({
      orderId: generatedOrderId,
      amount: numericAmount,
      amountPaise: numericAmount * 100,
      currency: 'INR',
      causeId: matchedCause.id,
      causeTitle: matchedCause.title,
      donor: {
        name: donorName,
        email: donorEmail,
        phone: donorPhone,
        panNumber: panNumber ? panNumber.toUpperCase() : undefined,
        frequency: frequency || 'one-time',
        message,
        consentUpdates: Boolean(consentUpdates)
      },
      keyId: systemSettings.razorpayKeyId,
      mockExpectedToken
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to initiate donation order: ' + err.message });
  }
});

// Payment: Verify Payment & Generate Official 80G Receipt
app.post('/api/donations/verify-payment', (req: Request, res: Response) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donorDetails,
      amount,
      causeId
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({ error: 'Missing payment confirmation identifiers from gateway.' });
    }

    // Verify signature
    const secret = process.env.RAZORPAY_KEY_SECRET || 'test_demo_secret_key_ffw_2026';
    let isSignatureValid = false;

    if (process.env.RAZORPAY_KEY_SECRET && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');
      isSignatureValid = generatedSignature === razorpay_signature;
    } else {
      // In sandbox/demo test mode, verify that identifiers are present and non-empty
      isSignatureValid = Boolean(razorpay_payment_id.length > 5);
    }

    if (!isSignatureValid) {
      return res.status(400).json({ error: 'Cryptographic payment verification failed. Potential tampering detected.' });
    }

    // Ensure no duplicate recording
    const existing = donationsStore.find(d => d.paymentId === razorpay_payment_id);
    if (existing) {
      return res.json({
        success: true,
        message: 'Payment verified (existing record).',
        donation: existing
      });
    }

    const matchedCause = causesData.find(c => c.id === causeId) || causesData[0];
    const receiptNum = `${systemSettings.receiptPrefix}${1000 + donationsStore.length + 1}`;

    const newDonation: DonationRecord = {
      id: `don_${Date.now()}_${Math.floor(Math.random() * 900 + 100)}`,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: Number(amount),
      currency: 'INR',
      causeId: matchedCause.id,
      causeTitle: matchedCause.title,
      donorName: donorDetails?.name || 'Anonymous Kind Soul',
      donorEmail: donorDetails?.email || 'donor@faithfulfriendswelfare.org',
      donorPhone: donorDetails?.phone || '',
      panNumber: donorDetails?.panNumber,
      frequency: donorDetails?.frequency || 'one-time',
      message: donorDetails?.message,
      consentUpdates: Boolean(donorDetails?.consentUpdates),
      status: 'verified',
      receiptNumber: receiptNum,
      createdAt: new Date().toISOString()
    };

    donationsStore.unshift(newDonation);

    // Update real-time cause amount & overall impact counter
    matchedCause.raisedAmount += newDonation.amount;
    matchedCause.donorsCount += 1;
    impactStats.totalDonationsAmount += newDonation.amount;
    // Estimate meals served for reporting
    if (newDonation.causeId === 'feed-child' || newDonation.causeId === 'feed-hungry') {
      impactStats.mealsDistributed += Math.floor(newDonation.amount / 30);
    }

    res.json({
      success: true,
      message: 'Donation successfully verified and recorded.',
      donation: newDonation,
      taxExemption: {
        eligible80G: Boolean(newDonation.panNumber),
        section80GRegNo: systemSettings.section80G,
        ngoLegalName: systemSettings.legalName
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Server error during payment verification: ' + err.message });
  }
});

// Admin: Query Donations
app.get('/api/donations', (req: Request, res: Response) => {
  const adminToken = req.query.adminToken as string;
  if (adminToken !== 'ffw_admin_secret_token_2026') {
    return res.status(401).json({ error: 'Unauthorized administrative operation.' });
  }

  const { status, causeId, search } = req.query;
  let filtered = [...donationsStore];

  if (status && status !== 'all') {
    filtered = filtered.filter(d => d.status === status);
  }
  if (causeId && causeId !== 'all') {
    filtered = filtered.filter(d => d.causeId === causeId);
  }
  if (search) {
    const q = String(search).toLowerCase();
    filtered = filtered.filter(
      d =>
        d.donorName.toLowerCase().includes(q) ||
        d.donorEmail.toLowerCase().includes(q) ||
        d.receiptNumber.toLowerCase().includes(q) ||
        d.paymentId.toLowerCase().includes(q)
    );
  }

  res.json({
    totalCount: donationsStore.length,
    filteredCount: filtered.length,
    totalVerifiedAmount: donationsStore
      .filter(d => d.status === 'verified')
      .reduce((sum, d) => sum + d.amount, 0),
    donations: filtered
  });
});

// Export CSV for Auditing
app.get('/api/donations/export-csv', (req: Request, res: Response) => {
  const adminToken = req.query.adminToken as string;
  if (adminToken !== 'ffw_admin_secret_token_2026') {
    return res.status(401).send('Unauthorized');
  }

  const headers = ['Receipt No', 'Date', 'Donor Name', 'Email', 'Phone', 'PAN', 'Cause', 'Amount (INR)', 'Frequency', 'Status', 'Payment ID'];
  const rows = donationsStore.map(d => [
    `"${d.receiptNumber}"`,
    `"${d.createdAt}"`,
    `"${d.donorName}"`,
    `"${d.donorEmail}"`,
    `"${d.donorPhone}"`,
    `"${d.panNumber || 'N/A'}"`,
    `"${d.causeTitle}"`,
    d.amount,
    `"${d.frequency}"`,
    `"${d.status}"`,
    `"${d.paymentId}"`
  ]);

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="FFW_Donations_Audit.csv"');
  res.send(csv);
});

// Volunteer Registration
app.post('/api/volunteer/register', (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, city, areaOfInterest, availability, message } = req.body;
    if (!fullName || !email || !phone) {
      return res.status(400).json({ error: 'Please provide full name, email, and phone number.' });
    }

    const newVolunteer: VolunteerSubmission = {
      id: `vol_${Date.now()}`,
      fullName,
      email,
      phone,
      city: city || 'Not specified',
      areaOfInterest: areaOfInterest || 'General Community Welfare',
      availability: availability || 'Flexible',
      message: message || '',
      status: 'new',
      createdAt: new Date().toISOString()
    };

    volunteersStore.unshift(newVolunteer);
    impactStats.activeVolunteers += 1;

    res.json({
      success: true,
      message: 'Thank you for stepping forward! A volunteer coordinator from Faithful Friends Welfare will reach out to you within 24-48 hours.',
      volunteer: newVolunteer
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to record volunteer registration: ' + err.message });
  }
});

app.get('/api/volunteer/list', (req: Request, res: Response) => {
  const adminToken = req.query.adminToken as string;
  if (adminToken !== 'ffw_admin_secret_token_2026') {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  res.json(volunteersStore);
});

// Corporate Partnerships / CSR
app.post('/api/partnerships/submit', (req: Request, res: Response) => {
  try {
    const { organizationName, contactPerson, email, phone, partnershipType, estimatedBudget, proposalDetails } = req.body;
    if (!organizationName || !contactPerson || !email || !phone) {
      return res.status(400).json({ error: 'Organization name, contact person, email, and phone are required.' });
    }

    const newPartnership: PartnershipSubmission = {
      id: `part_${Date.now()}`,
      organizationName,
      contactPerson,
      email,
      phone,
      partnershipType: partnershipType || 'CSR Collaboration',
      estimatedBudget: estimatedBudget || '',
      proposalDetails: proposalDetails || '',
      status: 'new',
      createdAt: new Date().toISOString()
    };

    partnershipsStore.unshift(newPartnership);

    res.json({
      success: true,
      message: 'Partnership enquiry received. Our Institutional CSR & Partnerships desk will contact you with a formal presentation and compliance docket.',
      partnership: newPartnership
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to submit partnership request: ' + err.message });
  }
});

app.get('/api/partnerships/list', (req: Request, res: Response) => {
  const adminToken = req.query.adminToken as string;
  if (adminToken !== 'ffw_admin_secret_token_2026') {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  res.json(partnershipsStore);
});

// Admin Auth
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Demo admin credentials for verification
  if (username === 'admin@faithfulfriends.org' && password === 'FFWelfare#2026') {
    res.json({
      success: true,
      token: 'ffw_admin_secret_token_2026',
      admin: {
        name: 'Managing Trustee',
        email: 'admin@faithfulfriends.org',
        role: 'Super Administrator'
      }
    });
  } else {
    res.status(401).json({ error: 'Invalid administrator credentials. Please check your username and access key.' });
  }
});

// --- VITE MIDDLEWARE OR STATIC PRODUCTION SERVING ---
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[FFW] Faithful Friends Welfare server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
