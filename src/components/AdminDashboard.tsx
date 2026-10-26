import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  DollarSign,
  Users,
  Heart,
  FileSpreadsheet,
  Download,
  Search,
  CheckCircle,
  AlertCircle,
  Edit3,
  Save,
  RefreshCw,
  LogOut,
  Building,
  Shield,
  Eye
} from 'lucide-react';
import { DonationRecord, ImpactStats, SystemSettings, VolunteerSubmission, PartnershipSubmission } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  systemSettings: SystemSettings;
  impactStats: ImpactStats;
  onUpdateImpactStats: (newStats: ImpactStats) => void;
  onViewReceipt: (donation: DonationRecord) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  systemSettings,
  impactStats,
  onUpdateImpactStats,
  onViewReceipt,
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [loginEmail, setLoginEmail] = useState('admin@faithfulfriends.org');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active tab inside admin dashboard
  const [adminTab, setAdminTab] = useState<'overview' | 'donations' | 'impact' | 'volunteers' | 'partnerships' | 'settings'>('overview');

  // Dashboard Data states
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [volunteers, setVolunteers] = useState<VolunteerSubmission[]>([]);
  const [partnerships, setPartnerships] = useState<PartnershipSubmission[]>([]);
  const [totalVerifiedAmount, setTotalVerifiedAmount] = useState(0);

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [causeFilter, setCauseFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingData, setLoadingData] = useState(false);

  // Editable Impact Form
  const [editImpact, setEditImpact] = useState<ImpactStats>({ ...impactStats });
  const [saveImpactStatus, setSaveImpactStatus] = useState<string | null>(null);

  // Editable Settings Form
  const [editSettings, setEditSettings] = useState<SystemSettings>({ ...systemSettings });
  const [saveSettingsStatus, setSaveSettingsStatus] = useState<string | null>(null);

  useEffect(() => {
    setEditImpact({ ...impactStats });
  }, [impactStats]);

  useEffect(() => {
    setEditSettings({ ...systemSettings });
  }, [systemSettings]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginEmail, password: loginPassword })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');

      setIsAuthenticated(true);
      setAdminToken(data.token);
      loadAdminData(data.token);
    } catch (err: any) {
      setLoginError(err.message || 'Invalid administrator login credentials.');
    }
  };

  const loadAdminData = async (token: string) => {
    setLoadingData(true);
    try {
      // 1. Fetch Donations
      const donRes = await fetch(`/api/donations?adminToken=${token}&status=${statusFilter}&causeId=${causeFilter}&search=${encodeURIComponent(searchTerm)}`);
      if (donRes.ok) {
        const donData = await donRes.json();
        setDonations(donData.donations || []);
        setTotalVerifiedAmount(donData.totalVerifiedAmount || 0);
      }

      // 2. Fetch Volunteers
      const volRes = await fetch(`/api/volunteer/list?adminToken=${token}`);
      if (volRes.ok) {
        const volData = await volRes.json();
        setVolunteers(volData || []);
      }

      // 3. Fetch Partnerships
      const partRes = await fetch(`/api/partnerships/list?adminToken=${token}`);
      if (partRes.ok) {
        const partData = await partRes.json();
        setPartnerships(partData || []);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && adminToken) {
      loadAdminData(adminToken);
    }
  }, [statusFilter, causeFilter, searchTerm]);

  const handleSaveImpact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveImpactStatus('Saving...');
    try {
      const res = await fetch('/api/impact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminToken,
          updates: {
            mealsDistributed: Number(editImpact.mealsDistributed),
            childrenSupported: Number(editImpact.childrenSupported),
            cowsCaredFor: Number(editImpact.cowsCaredFor),
            welfareDrives: Number(editImpact.welfareDrives),
            activeVolunteers: Number(editImpact.activeVolunteers),
            auditNote: editImpact.auditNote
          }
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update impact');

      onUpdateImpactStats(data.impactStats);
      setSaveImpactStatus('Verified metrics successfully updated and published!');
      setTimeout(() => setSaveImpactStatus(null), 3000);
    } catch (err: any) {
      setSaveImpactStatus('Error: ' + err.message);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSettingsStatus('Updating configuration...');
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminToken,
          settings: editSettings
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update settings');

      setSaveSettingsStatus('System configuration saved successfully!');
      setTimeout(() => setSaveSettingsStatus(null), 3000);
    } catch (err: any) {
      setSaveSettingsStatus('Error: ' + err.message);
    }
  };

  const handleExportCsv = () => {
    window.open(`/api/donations/export-csv?adminToken=${adminToken}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden my-4">
        {/* Header Bar */}
        <div className="bg-[#103D2B] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#176B4D] rounded-lg">
              <Lock className="w-5 h-5 text-[#D6B46A]" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white">
                Faithful Friends Welfare · Administration Console
              </h2>
              <p className="text-xs text-[#FAF7F0]/80">
                Auditable Operations, Statutory Compliance & Real-Time Donor Records
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer"
              aria-label="Close Admin Console"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* LOGIN SCREEN IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full my-auto text-center space-y-6">
            <div className="w-12 h-12 bg-[#176B4D]/10 text-[#176B4D] rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif font-bold text-2xl text-[#103D2B]">
                Administrator Sign In
              </h3>
              <p className="text-xs text-[#202720]/70 mt-1">
                Enter your administrative key to manage donations, update verified impact, and view audit reports.
              </p>
            </div>

            {loginError && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#103D2B] mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-stone-200 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#103D2B] mb-1">
                  Access Key / Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter administrator password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-stone-200 rounded-lg text-sm text-[#202720] focus:outline-none focus:border-[#176B4D]"
                />
              </div>

              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900">
                <span className="font-semibold">Demo Evaluation Credentials:</span>
                <p>User: <code className="font-mono">admin@faithfulfriends.org</code></p>
                <p>Pass: <code className="font-mono">FFWelfare#2026</code></p>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#176B4D] hover:bg-[#103D2B] text-white rounded-lg text-sm font-bold transition-all shadow-sm cursor-pointer"
              >
                Authenticate & Access Console
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD CONTENT */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Sub Navigation Bar */}
            <div className="flex items-center gap-1 px-6 pt-3 border-b border-stone-200 bg-[#FAF7F0] overflow-x-auto whitespace-nowrap">
              <button
                onClick={() => setAdminTab('overview')}
                className={`py-2.5 px-4 text-xs font-semibold rounded-t-lg transition-all cursor-pointer ${
                  adminTab === 'overview'
                    ? 'bg-white text-[#103D2B] border-t-2 border-[#176B4D] shadow-sm'
                    : 'text-stone-600 hover:text-[#103D2B]'
                }`}
              >
                Overview & KPIs
              </button>

              <button
                onClick={() => setAdminTab('donations')}
                className={`py-2.5 px-4 text-xs font-semibold rounded-t-lg transition-all cursor-pointer ${
                  adminTab === 'donations'
                    ? 'bg-white text-[#103D2B] border-t-2 border-[#176B4D] shadow-sm'
                    : 'text-stone-600 hover:text-[#103D2B]'
                }`}
              >
                Donation Records & Audit
              </button>

              <button
                onClick={() => setAdminTab('impact')}
                className={`py-2.5 px-4 text-xs font-semibold rounded-t-lg transition-all cursor-pointer ${
                  adminTab === 'impact'
                    ? 'bg-white text-[#103D2B] border-t-2 border-[#176B4D] shadow-sm'
                    : 'text-stone-600 hover:text-[#103D2B]'
                }`}
              >
                Verified Impact Editor
              </button>

              <button
                onClick={() => setAdminTab('volunteers')}
                className={`py-2.5 px-4 text-xs font-semibold rounded-t-lg transition-all cursor-pointer ${
                  adminTab === 'volunteers'
                    ? 'bg-white text-[#103D2B] border-t-2 border-[#176B4D] shadow-sm'
                    : 'text-stone-600 hover:text-[#103D2B]'
                }`}
              >
                Volunteer Registrations ({volunteers.length})
              </button>

              <button
                onClick={() => setAdminTab('partnerships')}
                className={`py-2.5 px-4 text-xs font-semibold rounded-t-lg transition-all cursor-pointer ${
                  adminTab === 'partnerships'
                    ? 'bg-white text-[#103D2B] border-t-2 border-[#176B4D] shadow-sm'
                    : 'text-stone-600 hover:text-[#103D2B]'
                }`}
              >
                Corporate CSR ({partnerships.length})
              </button>

              <button
                onClick={() => setAdminTab('settings')}
                className={`py-2.5 px-4 text-xs font-semibold rounded-t-lg transition-all cursor-pointer ${
                  adminTab === 'settings'
                    ? 'bg-white text-[#103D2B] border-t-2 border-[#176B4D] shadow-sm'
                    : 'text-stone-600 hover:text-[#103D2B]'
                }`}
              >
                Settings & Google Forms
              </button>
            </div>

            {/* Tab View Container */}
            <div className="flex-1 overflow-y-auto p-6 bg-white space-y-6">
              {/* TAB 1: OVERVIEW */}
              {adminTab === 'overview' && (
                <div className="space-y-6">
                  {/* Top 3 Overview KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="p-6 bg-[#FAF7F0] rounded-xl border border-[#103D2B]/10">
                      <span className="text-xs uppercase tracking-wider text-[#176B4D] font-bold block mb-1">
                        Total Verified Funds
                      </span>
                      <p className="text-3xl font-serif font-bold text-[#103D2B] tabular-nums">
                        ₹{totalVerifiedAmount.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-stone-500 mt-2">
                        Settled directly to NGO SBI Account
                      </p>
                    </div>

                    <div className="p-6 bg-[#FAF7F0] rounded-xl border border-[#103D2B]/10">
                      <span className="text-xs uppercase tracking-wider text-[#176B4D] font-bold block mb-1">
                        Verified Transactions
                      </span>
                      <p className="text-3xl font-serif font-bold text-[#103D2B] tabular-nums">
                        {donations.length}
                      </p>
                      <p className="text-xs text-stone-500 mt-2">
                        Form 10BE compliant receipts issued
                      </p>
                    </div>

                    <div className="p-6 bg-[#FAF7F0] rounded-xl border border-[#103D2B]/10">
                      <span className="text-xs uppercase tracking-wider text-[#176B4D] font-bold block mb-1">
                        Active Volunteers
                      </span>
                      <p className="text-3xl font-serif font-bold text-[#103D2B] tabular-nums">
                        {volunteers.length + impactStats.activeVolunteers}
                      </p>
                      <p className="text-xs text-stone-500 mt-2">
                        Enrolled in regular distribution cohorts
                      </p>
                    </div>
                  </div>

                  {/* Recent Donations Quick Table */}
                  <div className="border border-stone-200 rounded-xl overflow-hidden">
                    <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#103D2B]">
                        Recent Verified Donations
                      </h4>
                      <button
                        onClick={() => setAdminTab('donations')}
                        className="text-xs font-semibold text-[#176B4D] hover:underline"
                      >
                        View All
                      </button>
                    </div>
                    <div className="divide-y divide-stone-100 text-xs">
                      {donations.slice(0, 5).map((d) => (
                        <div key={d.id} className="p-4 flex items-center justify-between hover:bg-stone-50">
                          <div>
                            <span className="font-bold text-[#103D2B]">{d.donorName}</span>
                            <span className="text-stone-400 mx-2">·</span>
                            <span className="text-stone-500">{d.causeTitle}</span>
                            <div className="text-[11px] text-stone-400 mt-0.5">
                              Receipt: {d.receiptNumber} · {new Date(d.createdAt).toLocaleDateString('en-IN')}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-[#176B4D] tabular-nums text-sm">
                              ₹{d.amount.toLocaleString('en-IN')}
                            </span>
                            <button
                              onClick={() => onViewReceipt(d)}
                              className="block text-[11px] text-[#103D2B] hover:underline mt-1 font-medium"
                            >
                              View 80G Receipt
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: DONATIONS & AUDIT LOG */}
              {adminTab === 'donations' && (
                <div className="space-y-4">
                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="relative flex-1 max-w-sm">
                        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search by donor, email, receipt..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-200 rounded-lg text-[#202720] focus:outline-none focus:border-[#176B4D]"
                        />
                      </div>

                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="py-2 px-3 text-xs bg-white border border-stone-200 rounded-lg text-stone-700 focus:outline-none"
                      >
                        <option value="all">All Statuses</option>
                        <option value="verified">Verified</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleExportCsv}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#176B4D] hover:bg-[#103D2B] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV for Audit</span>
                      </button>
                      <button
                        onClick={() => loadAdminData(adminToken)}
                        className="p-2 border border-stone-200 hover:bg-stone-100 rounded-lg text-stone-600 transition-colors cursor-pointer"
                        title="Refresh"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Transactions Table */}
                  <div className="border border-stone-200 rounded-xl overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FAF7F0] border-b border-stone-200 text-[#103D2B] uppercase tracking-wider text-[11px] font-bold">
                        <tr>
                          <th className="py-3 px-4">Receipt No</th>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4">Donor Name</th>
                          <th className="py-3 px-4">PAN Card</th>
                          <th className="py-3 px-4">Cause</th>
                          <th className="py-3 px-4 text-right">Amount (INR)</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-stone-700">
                        {donations.map((d) => (
                          <tr key={d.id} className="hover:bg-stone-50">
                            <td className="py-3 px-4 font-mono font-semibold text-[#103D2B]">
                              {d.receiptNumber}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              {new Date(d.createdAt).toLocaleDateString('en-IN')}
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-semibold text-stone-900 block">{d.donorName}</span>
                              <span className="text-[11px] text-stone-500">{d.donorEmail}</span>
                            </td>
                            <td className="py-3 px-4 font-mono">
                              {d.panNumber || '—'}
                            </td>
                            <td className="py-3 px-4">
                              {d.causeTitle}
                            </td>
                            <td className="py-3 px-4 text-right font-bold tabular-nums text-stone-900">
                              ₹{d.amount.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                {d.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => onViewReceipt(d)}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#176B4D] hover:underline"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Receipt</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: VERIFIED IMPACT EDITOR */}
              {adminTab === 'impact' && (
                <form onSubmit={handleSaveImpact} className="max-w-2xl space-y-6">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#103D2B]">
                      Edit Verified Public Impact Figures
                    </h3>
                    <p className="text-xs text-[#202720]/70">
                      Changes made here instantly update the public hero ticker, impact counters, and annual reports.
                    </p>
                  </div>

                  {saveImpactStatus && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-lg flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-700" />
                      <span>{saveImpactStatus}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-[#103D2B] mb-1">
                        Meals Distributed
                      </label>
                      <input
                        type="number"
                        value={editImpact.mealsDistributed}
                        onChange={(e) => setEditImpact({ ...editImpact, mealsDistributed: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-[#FAF7F0] border border-stone-200 rounded-lg text-sm text-[#202720]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#103D2B] mb-1">
                        Children Nourished
                      </label>
                      <input
                        type="number"
                        value={editImpact.childrenSupported}
                        onChange={(e) => setEditImpact({ ...editImpact, childrenSupported: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-[#FAF7F0] border border-stone-200 rounded-lg text-sm text-[#202720]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#103D2B] mb-1">
                        Cows in Gaushala Care
                      </label>
                      <input
                        type="number"
                        value={editImpact.cowsCaredFor}
                        onChange={(e) => setEditImpact({ ...editImpact, cowsCaredFor: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-[#FAF7F0] border border-stone-200 rounded-lg text-sm text-[#202720]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#103D2B] mb-1">
                        Community Welfare Drives
                      </label>
                      <input
                        type="number"
                        value={editImpact.welfareDrives}
                        onChange={(e) => setEditImpact({ ...editImpact, welfareDrives: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-[#FAF7F0] border border-stone-200 rounded-lg text-sm text-[#202720]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-[#103D2B] mb-1">
                        Active Verified Volunteers
                      </label>
                      <input
                        type="number"
                        value={editImpact.activeVolunteers}
                        onChange={(e) => setEditImpact({ ...editImpact, activeVolunteers: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-[#FAF7F0] border border-stone-200 rounded-lg text-sm text-[#202720]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-[#103D2B] mb-1">
                        Auditor Certification Note
                      </label>
                      <input
                        type="text"
                        value={editImpact.auditNote}
                        onChange={(e) => setEditImpact({ ...editImpact, auditNote: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF7F0] border border-stone-200 rounded-lg text-sm text-[#202720]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-[#176B4D] hover:bg-[#103D2B] text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save & Publish Impact Numbers</span>
                  </button>
                </form>
              )}

              {/* TAB 4: VOLUNTEER REGISTRATIONS */}
              {adminTab === 'volunteers' && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-[#103D2B]">
                    Volunteer Applicants & Cohort Registry
                  </h3>

                  <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden">
                    {volunteers.map((v) => (
                      <div key={v.id} className="p-4 hover:bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <span className="font-bold text-[#103D2B] text-sm">{v.fullName}</span>
                          <div className="text-stone-500 mt-0.5 space-x-2">
                            <span>{v.email}</span>
                            <span>·</span>
                            <span>{v.phone}</span>
                            <span>·</span>
                            <span className="font-medium">{v.city}</span>
                          </div>
                          <p className="text-stone-600 mt-1 italic">
                            Focus: {v.areaOfInterest} ({v.availability})
                          </p>
                          {v.message && (
                            <p className="text-[11px] text-stone-500 mt-1">
                              Note: “{v.message}”
                            </p>
                          )}
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                            {v.status.toUpperCase()}
                          </span>
                          <span className="text-[11px] text-stone-400 block mt-1">
                            {new Date(v.createdAt).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: CSR PROPOSALS */}
              {adminTab === 'partnerships' && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-[#103D2B]">
                    Corporate CSR & Sponsorship Enquiries
                  </h3>

                  <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden">
                    {partnerships.map((p) => (
                      <div key={p.id} className="p-5 hover:bg-stone-50 text-xs space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-[#103D2B] text-sm block">
                              {p.organizationName}
                            </span>
                            <span className="text-stone-600 font-medium">
                              Contact: {p.contactPerson} ({p.email} · {p.phone})
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {p.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="p-3 bg-[#FAF7F0] rounded-lg text-stone-700 space-y-1">
                          <p><span className="font-semibold">Type:</span> {p.partnershipType}</p>
                          {p.estimatedBudget && <p><span className="font-semibold">Budget:</span> {p.estimatedBudget}</p>}
                          <p className="text-stone-600 leading-relaxed italic">
                            “{p.proposalDetails}”
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: SETTINGS & GOOGLE FORMS */}
              {adminTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="max-w-2xl space-y-6">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#103D2B]">
                      Portal Settings & Integrations
                    </h3>
                    <p className="text-xs text-[#202720]/70">
                      Configure connected Google Forms, UPI IDs, and official statutory registration identifiers.
                    </p>
                  </div>

                  {saveSettingsStatus && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-lg flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-700" />
                      <span>{saveSettingsStatus}</span>
                    </div>
                  )}

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-[#103D2B] mb-1">
                        Google Forms Embed URL (Volunteers)
                      </label>
                      <input
                        type="url"
                        value={editSettings.googleFormsVolunteerUrl}
                        onChange={(e) => setEditSettings({ ...editSettings, googleFormsVolunteerUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF7F0] border border-stone-200 rounded-lg text-sm text-[#202720]"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="gfEnable"
                        checked={editSettings.googleFormsEnabled}
                        onChange={(e) => setEditSettings({ ...editSettings, googleFormsEnabled: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 text-[#176B4D]"
                      />
                      <label htmlFor="gfEnable" className="text-xs font-medium text-stone-700 cursor-pointer">
                        Enable Google Forms tab on public Get Involved section
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block font-semibold text-[#103D2B] mb-1">
                          Section 80G Approval URN
                        </label>
                        <input
                          type="text"
                          value={editSettings.section80G}
                          onChange={(e) => setEditSettings({ ...editSettings, section80G: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF7F0] border border-stone-200 rounded-lg text-sm text-[#202720]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-[#103D2B] mb-1">
                          Registered Office UPI VPA
                        </label>
                        <input
                          type="text"
                          value={editSettings.upiId}
                          onChange={(e) => setEditSettings({ ...editSettings, upiId: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF7F0] border border-stone-200 rounded-lg text-sm text-[#202720]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-[#176B4D] hover:bg-[#103D2B] text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Portal Settings</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
