'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  ShieldCheck,
  UserCheck,
  Copy,
  Check,
  Plus,
  Sparkles,
  MapPin,
  Mail,
  PhoneCall,
  Edit3,
  Save,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  User,
  Briefcase,
  Globe
} from 'lucide-react';

export const CorporateProfileView: React.FC = () => {
  const router = useRouter();
  const [copiedAccountId, setCopiedAccountId] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile Data State (Separated Corporate Profile Data)
  const [profileData, setProfileData] = useState({
    // Organization Details (from /corporate-onboarding)
    companyName: 'ABC Corporation',
    industry: 'IT & Financial Technology',
    companySize: '500 - 1,000 Employees',
    location: 'Mumbai, Maharashtra, India',
    website: 'https://www.abccorp.com',
    taxId: '27AAACA0000A1Z5',
    corporateAccountId: 'AT-CORP-00482',
    accountTier: 'Enterprise Pro Tier',

    // Point of Contact Details (from /corporate-onboarding)
    pocName: 'Sarah Jenkins',
    pocDesignation: 'Head of Learning & Leadership Development',
    pocEmail: 'sarah.jenkins@abccorp.com',
    pocPhone: '+91 98765 12345',
    department: 'Global Talent & Capability Development',

    // Strategic Priorities (from /corporate-onboarding)
    priorities: [
      'Executive Leadership & Management',
      'AI & Technology Upskilling',
      'Sales Enablement & Negotiation',
      'Soft Skills & Communication',
      'Compliance & Cybersecurity'
    ],
    customPriority: 'Cloud Security, GenAI Enterprise Integration & Strategic Management',

    // Requirement Preferences (from /create-requirement)
    deliveryModes: ['In-Person', 'Hybrid', 'Online'],
    targetAudiences: ['Middle management', 'Senior management', 'Technical team', 'CXO / Leadership'],
    typicalDuration: '1-2 Days / Multiple Sessions',
    trainerPreferences: [
      'Corporate training experience (10+ yrs)',
      'Practitioner / hands-on expert',
      'Industry-specific domain expertise',
      'Leadership / Executive experience'
    ],
    budgetRange: 'Rs 50,000 - Rs 1 lakh / Day',
    addons: [
      'Pre-training Assessment',
      'Post-training Assessment',
      'Customisation of existing content',
      'Certification & Analytics Report'
    ],
    preferredCities: 'Mumbai, Bengaluru, Delhi NCR, Virtual'
  });

  // Load from localStorage if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedProfile = localStorage.getItem('atlas_corporate_profile');
        if (storedProfile) {
          const parsed = JSON.parse(storedProfile);
          setProfileData(prev => ({
            ...prev,
            companyName: parsed.companyName || prev.companyName,
            industry: parsed.industry || prev.industry,
            companySize: parsed.companySize || prev.companySize,
            pocName: parsed.pocName || prev.pocName,
            pocDesignation: parsed.pocDesignation || prev.pocDesignation,
            pocPhone: parsed.pocPhone || prev.pocPhone,
            location: parsed.location || prev.location
          }));
        }
      } catch (err) {
        // ignore fallback
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyAccountId = () => {
    navigator.clipboard.writeText(profileData.corporateAccountId);
    setCopiedAccountId(true);
    showToast('Corporate Account ID copied to clipboard!');
    setTimeout(() => setCopiedAccountId(false), 2000);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('atlas_corporate_profile', JSON.stringify({
        companyName: profileData.companyName,
        industry: profileData.industry,
        companySize: profileData.companySize,
        pocName: profileData.pocName,
        pocDesignation: profileData.pocDesignation,
        pocPhone: profileData.pocPhone,
        location: profileData.location
      }));
    }
    showToast('Corporate profile & requirement preferences updated successfully!');
  };

  return (
    <div className="flex min-h-screen flex-1 bg-[#F4F7FA] px-4 py-6 sm:px-6 lg:px-8 lg:py-8 font-sans text-[#091536]">
      <div className="mx-auto w-full max-w-[1360px] space-y-6">

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#091536] px-5 py-3.5 text-sm font-semibold text-white shadow-2xl animate-fade-in border border-slate-700">
            <CheckCircle2 className="h-5 w-5 text-[#0E9F88]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* TOP BREADCRUMB & HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <span>Corporate Home</span>
              <span className="text-slate-300">/</span>
              <span className="text-[#1677FF] font-black">Corporate Profile & Setup</span>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#091536]">
                {profileData.companyName}
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Verified Corporate Profile
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {isEditingProfile ? (
              <button
                onClick={handleSaveProfile}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0E9F88] px-5 py-2.5 text-xs sm:text-sm font-black text-white shadow-md shadow-[#0E9F88]/20 transition hover:bg-[#0C8975] cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>Save Profile Changes</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-black text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-xs"
              >
                <Edit3 className="h-4 w-4 text-[#1677FF]" />
                <span>Edit Profile Details</span>
              </button>
            )}

            <button
              onClick={() => router.push('/create-requirement')}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1677FF] px-4 py-2.5 text-xs sm:text-sm font-black text-white shadow-md shadow-[#1677FF]/20 transition hover:bg-[#1562D6] cursor-pointer"
            >
              <Plus className="h-4 w-4 stroke-[3]" />
              <span>Post New Requirement</span>
            </button>
          </div>
        </div>

        {/* PROFILE BANNER CARD */}
        <section className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#091536] to-[#1677FF] text-white shadow-md">
                <Building2 className="h-8 w-8" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-[#091536]">{profileData.companyName}</h2>
                  <ShieldCheck className="h-4 w-4 text-[#1677FF]" />
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200">
                    <span className="font-bold text-slate-500">Account ID:</span>
                    <span className="font-mono font-black text-[#091536]">{profileData.corporateAccountId}</span>
                    <button
                      onClick={handleCopyAccountId}
                      title="Copy Account ID"
                      className="ml-1 text-slate-400 hover:text-[#1677FF] transition cursor-pointer"
                    >
                      {copiedAccountId ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 bg-[#EEF5FF] px-2.5 py-1 rounded-md border border-[#D0E2FF]">
                    <UserCheck className="h-3.5 w-3.5 text-[#1677FF]" />
                    <span className="font-bold text-slate-600">Account Manager:</span>
                    <span className="font-black text-[#1677FF]">Atlas Team</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    <span className="font-bold text-emerald-800">Status:</span>
                    <span className="font-black text-emerald-700">Active</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              <div className="text-center sm:text-right">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Account Tier</p>
                <p className="text-sm font-black text-[#091536]">{profileData.accountTier}</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-center sm:text-right">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">L&D Specialist</p>
                <p className="text-sm font-black text-[#1677FF]">Vikram Sharma</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 DETAILED PROFILE SECTIONS */}
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* SECTION 1: ORGANIZATION & ACCOUNT DETAILS (from /corporate-onboarding) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-[#091536]">
                <Building2 className="h-5 w-5 text-[#1677FF]" />
                <h3 className="text-base font-black">Organization & Entity Details</h3>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-500">From Corporate Onboarding</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-500 mb-1">Company / Entity Name</label>
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={profileData.companyName}
                    onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 font-bold text-[#091536] outline-hidden focus:border-[#1677FF]"
                  />
                ) : (
                  <p className="font-black text-sm text-[#091536]">{profileData.companyName}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Industry Sector</label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={profileData.industry}
                      onChange={(e) => setProfileData({ ...profileData, industry: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 font-semibold text-[#091536] outline-hidden"
                    />
                  ) : (
                    <p className="font-bold text-[#091536]">{profileData.industry}</p>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Workforce Size</label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={profileData.companySize}
                      onChange={(e) => setProfileData({ ...profileData, companySize: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 font-semibold text-[#091536] outline-hidden"
                    />
                  ) : (
                    <p className="font-bold text-[#091536]">{profileData.companySize}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">HQ / Corporate Location</label>
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 font-semibold text-[#091536] outline-hidden"
                  />
                ) : (
                  <p className="font-bold text-[#091536] flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {profileData.location}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block font-bold text-slate-500 mb-0.5">Corporate Account ID</label>
                  <p className="font-mono font-black text-[#1677FF]">{profileData.corporateAccountId}</p>
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-0.5">GSTIN / Registration ID</label>
                  <p className="font-mono font-bold text-slate-700">{profileData.taxId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: L&D POINT OF CONTACT (POC DETAILS from /corporate-onboarding) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-[#091536]">
                <UserCheck className="h-5 w-5 text-[#0E9F88]" />
                <h3 className="text-base font-black">L&D Point of Contact (POC)</h3>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">Verified Officer</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-500 mb-1">Primary POC Name</label>
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={profileData.pocName}
                    onChange={(e) => setProfileData({ ...profileData, pocName: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 font-bold text-[#091536] outline-hidden focus:border-[#0E9F88]"
                  />
                ) : (
                  <p className="font-black text-sm text-[#091536]">{profileData.pocName}</p>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Designation / Official Role</label>
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={profileData.pocDesignation}
                    onChange={(e) => setProfileData({ ...profileData, pocDesignation: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 font-semibold text-[#091536] outline-hidden"
                  />
                ) : (
                  <p className="font-bold text-[#091536]">{profileData.pocDesignation}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Work Email</label>
                  {isEditingProfile ? (
                    <input
                      type="email"
                      value={profileData.pocEmail}
                      onChange={(e) => setProfileData({ ...profileData, pocEmail: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 font-semibold text-[#091536] outline-hidden"
                    />
                  ) : (
                    <p className="font-bold text-[#1677FF] flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-[#1677FF]" />
                      {profileData.pocEmail}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Contact Phone</label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={profileData.pocPhone}
                      onChange={(e) => setProfileData({ ...profileData, pocPhone: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 font-semibold text-[#091536] outline-hidden"
                    />
                  ) : (
                    <p className="font-bold text-[#091536] flex items-center gap-1.5">
                      <PhoneCall className="h-3.5 w-3.5 text-slate-400" />
                      {profileData.pocPhone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Department / Business Unit</label>
                <p className="font-bold text-slate-700">{profileData.department}</p>
              </div>
            </div>
          </div>

          {/* SECTION 3: STRATEGIC TRAINING PRIORITIES (from /corporate-onboarding) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-[#091536]">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <h3 className="text-base font-black">Strategic Training Priorities</h3>
              </div>
              <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold text-purple-700">Learning Strategy</span>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Key strategic focus areas selected during corporate onboarding:
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {profileData.priorities.map((p, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50/70 px-3 py-1.5 text-xs font-black text-purple-900"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
                  {p}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-500 mb-1">Custom Priorities & Special Focus</label>
              <p className="text-xs font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200">
                {profileData.customPriority}
              </p>
            </div>
          </div>

          {/* SECTION 4: REQUIREMENT & FACILITATOR PREFERENCES (from /create-requirement) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-[#091536]">
                <SlidersHorizontal className="h-5 w-5 text-cyan-600" />
                <h3 className="text-base font-black">Requirement & Facilitator Specs</h3>
              </div>
              <span className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-[10px] font-bold text-cyan-700">From Requirement Wizard</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-500 mb-1.5">Preferred Delivery Modes</label>
                <div className="flex flex-wrap gap-1.5">
                  {profileData.deliveryModes.map((mode, idx) => (
                    <span key={idx} className="rounded-lg bg-cyan-50 px-2.5 py-1 font-black text-cyan-800 border border-cyan-200">
                      {mode}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1.5">Trainer Qualification Criteria</label>
                <div className="space-y-1">
                  {profileData.trainerPreferences.map((pref, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700 font-semibold">
                      <Check className="h-3.5 w-3.5 text-[#0E9F88]" />
                      <span>{pref}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block font-bold text-slate-500 mb-0.5">Default Daily Budget</label>
                  <p className="font-mono font-black text-[#0E9F88]">{profileData.budgetRange}</p>
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-0.5">Typical Program Duration</label>
                  <p className="font-bold text-slate-800">{profileData.typicalDuration}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="block font-bold text-slate-500 mb-1.5">Standard Program Add-ons</label>
                <div className="flex flex-wrap gap-1.5">
                  {profileData.addons.map((addon, idx) => (
                    <span key={idx} className="rounded-lg bg-slate-100 px-2.5 py-1 font-bold text-slate-700 border border-slate-200">
                      + {addon}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
