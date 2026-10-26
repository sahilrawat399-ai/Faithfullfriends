import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Mission } from './components/Mission';
import { Causes } from './components/Causes';
import { DonationSection } from './components/DonationSection';
import { ImpactDashboard } from './components/ImpactDashboard';
import { Stories } from './components/Stories';
import { Gallery } from './components/Gallery';
import { VolunteerSection } from './components/VolunteerSection';
import { Transparency } from './components/Transparency';
import { Footer } from './components/Footer';
import { ReceiptModal } from './components/ReceiptModal';
import { AdminDashboard } from './components/AdminDashboard';
import { LegalModals } from './components/LegalModals';

import { Cause, ImpactStats, SystemSettings, DonationRecord } from './types';
import { INITIAL_CAUSES, INITIAL_IMPACT } from './data/mockData';

const DEFAULT_SETTINGS: SystemSettings = {
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
  razorpayKeyId: 'rzp_test_FFWelfareDemo',
  upiId: 'faithfulfriends@sbi',
  receiptPrefix: 'FFW/2026-27/'
};

export default function App() {
  const [causes, setCauses] = useState<Cause[]>(INITIAL_CAUSES);
  const [impactStats, setImpactStats] = useState<ImpactStats>(INITIAL_IMPACT);
  const [systemSettings, setSystemSettings] = useState<SystemSettings>(DEFAULT_SETTINGS);

  // Interaction Modals & States
  const [selectedCauseId, setSelectedCauseId] = useState<string>('feed-child');
  const [activeReceipt, setActiveReceipt] = useState<DonationRecord | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'refund' | 'tax80g' | null>(null);

  // Fetch initial dynamic configuration from server
  useEffect(() => {
    // 1. Fetch Causes
    fetch('/api/causes')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCauses(data);
        }
      })
      .catch((err) => console.log('Using default causes:', err));

    // 2. Fetch Impact Stats
    fetch('/api/impact')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.mealsDistributed) {
          setImpactStats(data);
        }
      })
      .catch((err) => console.log('Using default impact stats:', err));

    // 3. Fetch Settings
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.legalName) {
          setSystemSettings((prev) => ({ ...prev, ...data }));
        }
      })
      .catch((err) => console.log('Using default settings:', err));
  }, []);

  const scrollToDonate = () => {
    const el = document.getElementById('donate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMission = () => {
    const el = document.getElementById('mission');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCauseToDonate = (causeId: string) => {
    setSelectedCauseId(causeId);
    scrollToDonate();
  };

  const handleDonationSuccess = (donation: DonationRecord) => {
    setActiveReceipt(donation);
    // Refresh live impact metrics from server
    fetch('/api/impact')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.mealsDistributed) {
          setImpactStats(data);
        }
      })
      .catch(() => {});
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#202720] flex flex-col font-sans selection:bg-[#103D2B] selection:text-[#FAF7F0]">
      {/* Sticky 3-Zone Navigation Bar */}
      <Navbar
        onDonateClick={scrollToDonate}
        onAdminClick={() => setIsAdminOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Cinematic Hero Section */}
        <Hero
          onDonateClick={scrollToDonate}
          onExploreClick={scrollToMission}
          impactMetrics={{
            mealsDistributed: impactStats.mealsDistributed,
            childrenSupported: impactStats.childrenSupported,
            cowsCaredFor: impactStats.cowsCaredFor,
            activeVolunteers: impactStats.activeVolunteers
          }}
        />

        {/* Our Mission: Compassion in Action */}
        <Mission />

        {/* 4 Interactive Causes */}
        <Causes
          causes={causes}
          onSelectCauseToDonate={handleSelectCauseToDonate}
        />

        {/* Primary Interactive Donation Form */}
        <DonationSection
          causes={causes}
          selectedCauseId={selectedCauseId}
          onDonationSuccess={handleDonationSuccess}
        />

        {/* Verified Impact Dashboard */}
        <ImpactDashboard
          stats={impactStats}
          onDonateClick={scrollToDonate}
        />

        {/* Stories of Change */}
        <Stories />

        {/* Activity & Field Gallery */}
        <Gallery />

        {/* Volunteer, CSR & Google Forms Integration */}
        <VolunteerSection settings={systemSettings} />

        {/* Statutory Transparency, Registrations & 80G */}
        <Transparency
          settings={systemSettings}
          onOpenLegalModal={(type) => setLegalModalType(type)}
        />
      </main>

      {/* Footer */}
      <Footer
        settings={systemSettings}
        onDonateClick={scrollToDonate}
        onAdminClick={() => setIsAdminOpen(true)}
        onOpenLegalModal={(type) => setLegalModalType(type)}
      />

      {/* Verified 80G Donation Receipt Modal */}
      <ReceiptModal
        donation={activeReceipt}
        onClose={() => setActiveReceipt(null)}
      />

      {/* Protected Admin Console */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        systemSettings={systemSettings}
        impactStats={impactStats}
        onUpdateImpactStats={(newStats) => setImpactStats(newStats)}
        onViewReceipt={(donation) => setActiveReceipt(donation)}
      />

      {/* Statutory Legal & Policy Modals */}
      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        settings={systemSettings}
      />
    </div>
  );
}
