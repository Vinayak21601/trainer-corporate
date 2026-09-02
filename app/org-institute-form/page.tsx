'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Building2, 
  User, 
  Phone, 
  MapPin, 
  Briefcase, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Upload,
  ShieldCheck,
  Globe,
  FileText,
  GraduationCap,
  Layers,
  Award,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { HeroBackdrop } from '@/src/components/landing/HeroBackdrop';

const orgTypeOptions = [
  'Corporate Training Company',
  'Educational Institute',
  'University / College',
  'Other'
];

const clientDomainOptions = [
  'BFSI',
  'IT / Technology',
  'Consulting',
  'Manufacturing',
  'FMCG',
  'Healthcare / Pharma',
  'Government',
  'Education',
  'Retail',
  'Real Estate',
  'Other'
];

const assignmentTypeOptions = [
  'Leadership & Management',
  'Sales',
  'Communication',
  'Finance & Financial Markets',
  'Technology',
  'AI & Data',
  'HR',
  'Marketing',
  'Operations',
  'Compliance',
  'Entrepreneurship',
  'Industry-specific training',
  'Other'
];

const audienceServedOptions = [
  'Corporates',
  'SMEs',
  'Start-ups',
  'Government organisations',
  'Educational institutions',
  'Individuals',
  'Students',
  'Professionals',
  'Other'
];

const baseProgrammeTypes = [
  'Workshops',
  'Short-term courses',
  'Leadership programmes',
  'Executive education',
  'Certification programmes',
  'Bootcamps',
  'Long-term corporate programmes',
  'Coaching',
  'Consulting',
  'Conferences / seminars',
  'Custom corporate programmes'
];

const academicProgrammeTypes = [
  'Full time undergrad programme',
  'Full time post graduate programme'
];

const deliveryFormatOptions = ['In-person', 'Online', 'Hybrid'];

const deliveryGeoOptions = ['Local / city', 'Across India', 'International', 'Online globally'];

const cohortSizeOptions = ['<10 participants', '10–25', '26–50', '51–100', '101–250', '250+'];

const experienceDurationOptions = ['<2 years', '2–5 years', '5–10 years', '10–20 years', '20+ years'];

const orgsTrainedCountOptions = ['1–10', '11–50', '51–100', '101–500', '500+'];

export default function OrgInstituteRegistrationForm() {
  const router = useRouter();

  // 1. Organisation Details State
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState('Corporate Training Company');
  const [customOrgType, setCustomOrgType] = useState('');
  const [website, setWebsite] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [orgPhone, setOrgPhone] = useState('');
  
  // Location
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Maharashtra');
  const [city, setCity] = useState('Mumbai');
  const [zipcode, setZipcode] = useState('400001');

  // Documents
  const [regDocName, setRegDocName] = useState('');
  const [gstDocName, setGstDocName] = useState('');

  // 2. Primary Areas of Expertise & Clients Served State
  const [selectedDomains, setSelectedDomains] = useState<string[]>(['BFSI', 'IT / Technology', 'Consulting']);
  const [customDomain, setCustomDomain] = useState('');
  
  const [selectedAssignments, setSelectedAssignments] = useState<string[]>([
    'Leadership & Management',
    'Technology',
    'AI & Data'
  ]);
  const [customAssignment, setCustomAssignment] = useState('');

  const [selectedAudiences, setSelectedAudiences] = useState<string[]>(['Corporates', 'Professionals']);
  const [customAudience, setCustomAudience] = useState('');

  // 3. Training Capabilities State
  const [selectedProgrammes, setSelectedProgrammes] = useState<string[]>([
    'Workshops',
    'Leadership programmes',
    'Custom corporate programmes'
  ]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['In-person', 'Hybrid']);
  const [selectedGeos, setSelectedGeos] = useState<string[]>(['Across India', 'Online globally']);
  const [cohortSize, setCohortSize] = useState('26–50');

  // 4. Track Record State
  const [experienceDuration, setExperienceDuration] = useState('5–10 years');
  const [orgsTrainedCount, setOrgsTrainedCount] = useState('51–100');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync stored user if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('onboarding_user');
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          if (parsed.organization && !orgName) setOrgName(parsed.organization);
          if (parsed.email && !orgEmail) setOrgEmail(parsed.email);
        }
      } catch (err) {
        // ignore
      }
    }
  }, []);

  const toggleArrayItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleFillDemoProfile = () => {
    setOrgName('Vanguard Corporate Learning Institute');
    setOrgType('Corporate Training Company');
    setWebsite('https://vanguardlearning.com');
    setLinkedin('https://linkedin.com/company/vanguard-learning');
    setOrgEmail('connect@vanguardlearning.com');
    setOrgPhone('+91 98200 45678');
    setCountry('India');
    setState('Maharashtra');
    setCity('Mumbai');
    setZipcode('400051');
    setRegDocName('Incorporation_Certificate_Vanguard.pdf');
    setGstDocName('GSTIN_27AABCV1234F1Z5.pdf');

    setSelectedDomains(['BFSI', 'IT / Technology', 'Consulting', 'Healthcare / Pharma']);
    setSelectedAssignments(['Leadership & Management', 'Technology', 'AI & Data', 'Sales']);
    setSelectedAudiences(['Corporates', 'Professionals', 'SMEs']);
    setSelectedProgrammes(['Workshops', 'Leadership programmes', 'Bootcamps', 'Custom corporate programmes']);
    setSelectedFormats(['In-person', 'Hybrid', 'Online']);
    setSelectedGeos(['Across India', 'Online globally']);
    setCohortSize('26–50');

    setExperienceDuration('5–10 years');
    setOrgsTrainedCount('51–100');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isAcademicType = orgType === 'Educational Institute' || orgType === 'University / College';

    const institutionProfile = {
      orgName: orgName || 'Vanguard Corporate Learning Institute',
      orgType: orgType === 'Other' && customOrgType.trim() ? customOrgType.trim() : orgType,
      website,
      linkedin,
      orgEmail,
      orgPhone,
      location: { country, state, city, zipcode },
      documents: { regDocName, gstDocName },
      expertise: {
        domains: [...selectedDomains, ...(customDomain.trim() ? [customDomain.trim()] : [])],
        assignments: [...selectedAssignments, ...(customAssignment.trim() ? [customAssignment.trim()] : [])],
        audiences: [...selectedAudiences, ...(customAudience.trim() ? [customAudience.trim()] : [])],
      },
      capability: {
        programmes: selectedProgrammes,
        formats: selectedFormats,
        geographies: selectedGeos,
        cohortSize,
      },
      trackRecord: {
        experienceDuration,
        orgsTrainedCount,
      },
      submittedAt: new Date().toISOString()
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('atlas_institution_profile', JSON.stringify(institutionProfile));
      localStorage.setItem('company_name', institutionProfile.orgName);
      localStorage.setItem('user_name', institutionProfile.orgName);
    }

    setTimeout(() => {
      router.push('/thankyou?type=institution');
    }, 500);
  };

  const isAcademic = orgType === 'Educational Institute' || orgType === 'University / College';
  const availableProgrammeOptions = isAcademic
    ? [...baseProgrammeTypes, ...academicProgrammeTypes]
    : baseProgrammeTypes;

  return (
    <div className="relative min-h-screen bg-[#FBFAF7] font-sans text-[#091536] antialiased selection:bg-[#0E9F88] selection:text-white pb-16">
      <HeroBackdrop />

      {/* Top Header Bar */}
      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-4 py-6 sm:px-6">
        <Link href="/" className="atlas-focus flex items-center gap-2.5 rounded-xl group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1 shadow-xs transition-transform duration-300 group-hover:scale-105 border border-[#E1E9F2]">
            <img src="/logo/atlas-icon.png" alt="AtlasCircle" className="h-full w-full object-contain mix-blend-multiply" />
          </div>
          <div className="flex flex-col">
            <span className="atlas-display text-xl font-black tracking-tight text-[#081536] leading-none">AtlasCircle</span>
            <span className="text-[9px] font-bold text-[#5A6680] tracking-tight mt-0.5">Institution &amp; Agency Portal</span>
          </div>
        </Link>

        <button
          type="button"
          onClick={handleFillDemoProfile}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#1677FF]/30 bg-[#EEF5FF] px-4 py-1.5 text-xs font-black text-[#1677FF] transition hover:bg-[#DDF0FF] shadow-xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#1677FF]" />
          Auto-Fill Demo Profile
        </button>
      </header>

      {/* Main Single-Page Centered Form Container */}
      <main className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[24px] border border-[#DCE8F4] bg-white p-4 min-[400px]:p-5 sm:p-8 shadow-[0_24px_70px_rgba(32,75,114,0.08)]">
          
          {/* Form Header */}
          <div className="mb-6 border-b border-slate-100 pb-5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#7C3AED]/30 bg-[#F3E8FF] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#7C3AED] mb-2.5">
              <GraduationCap className="h-3.5 w-3.5 text-[#7C3AED]" />
              Organisation &amp; Institute Account Verified
            </div>

            <h1 className="atlas-display text-xl min-[400px]:text-2xl sm:text-3xl font-black text-[#091536]">
              Complete Organisation &amp; Institute Profile
            </h1>
            <p className="mt-1 text-xs font-medium text-[#657189]">
              Provide details about your institution, capabilities &amp; track record to showcase your training offerings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* SECTION 1: ORGANISATION DETAILS */}
            <div className="rounded-2xl border border-[#DCE8F4] bg-[#F9FCFF] p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-[#091536] uppercase tracking-wider">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7C3AED] text-[10px] font-bold text-white">1</span>
                Organisation Details &amp; Location
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                    Organisation / Institute Name *
                  </label>
                  <div className="relative flex items-center">
                    <Building2 className="pointer-events-none absolute left-3 h-4 w-4 text-[#94A3B8]" />
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. Vanguard Corporate Learning Institute"
                      className="w-full rounded-xl border border-[#CBD5E1] bg-white pl-9 pr-3 py-2.5 text-xs font-semibold text-[#091536] placeholder-[#94A3B8] focus:border-[#1677FF] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                    Organisation Type *
                  </label>
                  <select
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value)}
                    className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2.5 text-xs font-semibold text-[#091536] focus:border-[#1677FF] focus:outline-none"
                  >
                    {orgTypeOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {orgType === 'Other' && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                      Specify Organisation Type *
                    </label>
                    <input
                      type="text"
                      required
                      value={customOrgType}
                      onChange={(e) => setCustomOrgType(e.target.value)}
                      placeholder="e.g. EdTech Consultancy"
                      className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2.5 text-xs font-semibold text-[#091536] focus:border-[#1677FF] focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                    Website URL
                  </label>
                  <div className="relative flex items-center">
                    <Globe className="pointer-events-none absolute left-3 h-4 w-4 text-[#94A3B8]" />
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://institute.com"
                      className="w-full rounded-xl border border-[#CBD5E1] bg-white pl-9 pr-3 py-2.5 text-xs font-semibold text-[#091536] placeholder-[#94A3B8] focus:border-[#1677FF] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                    LinkedIn Page
                  </label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/company/institute"
                    className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2.5 text-xs font-semibold text-[#091536] placeholder-[#94A3B8] focus:border-[#1677FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                    Organisation Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={orgEmail}
                    onChange={(e) => setOrgEmail(e.target.value)}
                    placeholder="contact@institute.com"
                    className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2.5 text-xs font-semibold text-[#091536] placeholder-[#94A3B8] focus:border-[#1677FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                    Organisation Phone Number *
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="pointer-events-none absolute left-3 h-4 w-4 text-[#94A3B8]" />
                    <input
                      type="tel"
                      required
                      value={orgPhone}
                      onChange={(e) => setOrgPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-[#CBD5E1] bg-white pl-9 pr-3 py-2.5 text-xs font-semibold text-[#091536] placeholder-[#94A3B8] focus:border-[#1677FF] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Head Office Location */}
                <div className="sm:col-span-2 grid gap-3 grid-cols-2 sm:grid-cols-4 pt-2 border-t border-slate-200/80">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="India"
                      className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-semibold text-[#091536] focus:border-[#1677FF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Maharashtra"
                      className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-semibold text-[#091536] focus:border-[#1677FF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Mumbai"
                      className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-semibold text-[#091536] focus:border-[#1677FF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                      placeholder="400001"
                      className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-semibold text-[#091536] focus:border-[#1677FF] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Document Uploads */}
                <div className="sm:col-span-2 grid gap-3 sm:grid-cols-2 pt-2">
                  <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-white p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-[#334155]">Company Registration Doc</span>
                      <span className="text-[9px] font-semibold text-[#64748B]">PDF / Image</span>
                    </div>
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#F1F5F9] px-3 py-2 text-xs font-bold text-[#475569] hover:bg-[#E2E8F0] transition">
                      <Upload className="h-3.5 w-3.5" />
                      <span>{regDocName || 'Upload Incorporation Doc'}</span>
                      <input type="file" className="hidden" onChange={(e) => setRegDocName(e.target.files?.[0]?.name || '')} />
                    </label>
                  </div>

                  <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-white p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-[#334155]">GST Certificate (Optional)</span>
                      <span className="text-[9px] font-semibold text-[#64748B]">For Billing</span>
                    </div>
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#F1F5F9] px-3 py-2 text-xs font-bold text-[#475569] hover:bg-[#E2E8F0] transition">
                      <Upload className="h-3.5 w-3.5" />
                      <span>{gstDocName || 'Upload GST Certificate'}</span>
                      <input type="file" className="hidden" onChange={(e) => setGstDocName(e.target.files?.[0]?.name || '')} />
                    </label>
                  </div>
                </div>

              </div>
            </div>

            {/* SECTION 2: PRIMARY AREAS OF EXPERTISE */}
            <div className="rounded-2xl border border-[#DCE8F4] bg-[#F9FCFF] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black text-[#091536] uppercase tracking-wider">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7C3AED] text-[10px] font-bold text-white">2</span>
                  Primary Areas of Expertise &amp; Clientele
                </div>
                <span className="text-[10px] font-bold text-[#7C3AED]">Select multiple</span>
              </div>

              {/* a) Client Domains */}
              <div className="space-y-2">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#475569]">
                  a) Which client domains / sectors do you cater to?
                </label>
                <div className="flex flex-wrap gap-2">
                  {clientDomainOptions.map(domain => {
                    const selected = selectedDomains.includes(domain);
                    return (
                      <button
                        key={domain}
                        type="button"
                        onClick={() => toggleArrayItem(selectedDomains, setSelectedDomains, domain)}
                        className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                          selected
                            ? 'border-[#1677FF] bg-[#EEF5FF] text-[#1677FF] shadow-xs'
                            : 'border-[#CBD5E1] bg-white text-[#475569] hover:border-[#94A3B8]'
                        }`}
                      >
                        <span className={`flex h-3.5 w-3.5 items-center justify-center rounded ${selected ? 'bg-[#1677FF] text-white' : 'border border-[#CBD5E1] bg-white'}`}>
                          {selected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                        </span>
                        <span>{domain}</span>
                      </button>
                    );
                  })}
                </div>
                {selectedDomains.includes('Other') && (
                  <input
                    type="text"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="Specify other domain..."
                    className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-semibold text-[#091536] focus:border-[#1677FF] focus:outline-none mt-1"
                  />
                )}
              </div>

              {/* b) Training Assignments */}
              <div className="space-y-2 pt-2 border-t border-slate-200/80">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#475569]">
                  b) What kind of training assignments does your company undertake?
                </label>
                <div className="flex flex-wrap gap-2">
                  {assignmentTypeOptions.map(assignment => {
                    const selected = selectedAssignments.includes(assignment);
                    return (
                      <button
                        key={assignment}
                        type="button"
                        onClick={() => toggleArrayItem(selectedAssignments, setSelectedAssignments, assignment)}
                        className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                          selected
                            ? 'border-[#1677FF] bg-[#EEF5FF] text-[#1677FF] shadow-xs'
                            : 'border-[#CBD5E1] bg-white text-[#475569] hover:border-[#94A3B8]'
                        }`}
                      >
                        <span className={`flex h-3.5 w-3.5 items-center justify-center rounded ${selected ? 'bg-[#1677FF] text-white' : 'border border-[#CBD5E1] bg-white'}`}>
                          {selected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                        </span>
                        <span>{assignment}</span>
                      </button>
                    );
                  })}
                </div>
                {selectedAssignments.includes('Other') && (
                  <input
                    type="text"
                    value={customAssignment}
                    onChange={(e) => setCustomAssignment(e.target.value)}
                    placeholder="Specify other assignment type..."
                    className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-semibold text-[#091536] focus:border-[#1677FF] focus:outline-none mt-1"
                  />
                )}
              </div>

              {/* c) Who do you serve */}
              <div className="space-y-2 pt-2 border-t border-slate-200/80">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#475569]">
                  c) Who do you primarily serve?
                </label>
                <div className="flex flex-wrap gap-2">
                  {audienceServedOptions.map(audience => {
                    const selected = selectedAudiences.includes(audience);
                    return (
                      <button
                        key={audience}
                        type="button"
                        onClick={() => toggleArrayItem(selectedAudiences, setSelectedAudiences, audience)}
                        className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                          selected
                            ? 'border-[#1677FF] bg-[#EEF5FF] text-[#1677FF] shadow-xs'
                            : 'border-[#CBD5E1] bg-white text-[#475569] hover:border-[#94A3B8]'
                        }`}
                      >
                        <span className={`flex h-3.5 w-3.5 items-center justify-center rounded ${selected ? 'bg-[#1677FF] text-white' : 'border border-[#CBD5E1] bg-white'}`}>
                          {selected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                        </span>
                        <span>{audience}</span>
                      </button>
                    );
                  })}
                </div>
                {selectedAudiences.includes('Other') && (
                  <input
                    type="text"
                    value={customAudience}
                    onChange={(e) => setCustomAudience(e.target.value)}
                    placeholder="Specify other audience..."
                    className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-semibold text-[#091536] focus:border-[#1677FF] focus:outline-none mt-1"
                  />
                )}
              </div>
            </div>

            {/* SECTION 3: TRAINING CAPABILITIES */}
            <div className="rounded-2xl border border-[#DCE8F4] bg-[#F9FCFF] p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-[#091536] uppercase tracking-wider">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7C3AED] text-[10px] font-bold text-white">3</span>
                Your Training Capability &amp; Program Formats
              </div>

              {/* Programme Types */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#475569]">
                    What types of programmes do you offer?
                  </label>
                  {isAcademic && (
                    <span className="text-[10px] font-bold text-[#7C3AED] bg-[#F3E8FF] px-2 py-0.5 rounded-md">
                      Academic Programs Enabled
                    </span>
                  )}
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {availableProgrammeOptions.map(prog => {
                    const selected = selectedProgrammes.includes(prog);
                    const isAcademicOpt = academicProgrammeTypes.includes(prog);
                    return (
                      <button
                        key={prog}
                        type="button"
                        onClick={() => toggleArrayItem(selectedProgrammes, setSelectedProgrammes, prog)}
                        className={`atlas-focus flex items-center gap-2.5 rounded-xl border p-2.5 text-left text-xs font-bold transition-all ${
                          selected
                            ? isAcademicOpt ? 'border-[#7C3AED] bg-[#F3E8FF] text-[#7C3AED]' : 'border-[#1677FF] bg-[#EEF5FF] text-[#1677FF]'
                            : 'border-[#CBD5E1] bg-white text-[#475569] hover:border-[#94A3B8]'
                        }`}
                      >
                        <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${selected ? isAcademicOpt ? 'bg-[#7C3AED] text-white border-[#7C3AED]' : 'bg-[#1677FF] text-white border-[#1677FF]' : 'border-[#CBD5E1] bg-white'}`}>
                          {selected && <Check className="h-3 w-3 stroke-[3]" />}
                        </span>
                        <span>{prog}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Formats & Geography */}
              <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-slate-200/80">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#475569] mb-1.5">
                    Delivery Formats
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {deliveryFormatOptions.map(fmt => {
                      const selected = selectedFormats.includes(fmt);
                      return (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => toggleArrayItem(selectedFormats, setSelectedFormats, fmt)}
                          className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                            selected ? 'border-[#1677FF] bg-[#EEF5FF] text-[#1677FF]' : 'border-[#CBD5E1] bg-white text-[#475569]'
                          }`}
                        >
                          {fmt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#475569] mb-1.5">
                    Delivery Geography
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {deliveryGeoOptions.map(geo => {
                      const selected = selectedGeos.includes(geo);
                      return (
                        <button
                          key={geo}
                          type="button"
                          onClick={() => toggleArrayItem(selectedGeos, setSelectedGeos, geo)}
                          className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                            selected ? 'border-[#1677FF] bg-[#EEF5FF] text-[#1677FF]' : 'border-[#CBD5E1] bg-white text-[#475569]'
                          }`}
                        >
                          {geo}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Typical Programme Size */}
              <div className="pt-2 border-t border-slate-200/80">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#475569] mb-1.5">
                  Typical Programme / Cohort Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {cohortSizeOptions.map(size => {
                    const selected = cohortSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setCohortSize(size)}
                        className={`rounded-xl border px-3.5 py-1.5 text-xs font-bold transition-all ${
                          selected ? 'border-[#1677FF] bg-[#1677FF] text-white shadow-xs' : 'border-[#CBD5E1] bg-white text-[#475569] hover:border-[#94A3B8]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SECTION 4: CORPORATE TRACK RECORD */}
            <div className="rounded-2xl border border-[#DCE8F4] bg-[#F9FCFF] p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-[#091536] uppercase tracking-wider">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7C3AED] text-[10px] font-bold text-white">4</span>
                Corporate Track Record &amp; Experience
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#475569] mb-1.5">
                    Years Providing Training Services
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {experienceDurationOptions.map(exp => {
                      const selected = experienceDuration === exp;
                      return (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => setExperienceDuration(exp)}
                          className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                            selected ? 'border-[#1677FF] bg-[#1677FF] text-white shadow-xs' : 'border-[#CBD5E1] bg-white text-[#475569]'
                          }`}
                        >
                          {exp}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#475569] mb-1.5">
                    Approx. Organisations Trained
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {orgsTrainedCountOptions.map(cnt => {
                      const selected = orgsTrainedCount === cnt;
                      return (
                        <button
                          key={cnt}
                          type="button"
                          onClick={() => setOrgsTrainedCount(cnt)}
                          className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                            selected ? 'border-[#1677FF] bg-[#1677FF] text-white shadow-xs' : 'border-[#CBD5E1] bg-white text-[#475569]'
                          }`}
                        >
                          {cnt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="atlas-focus group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1677FF] text-sm font-black text-white shadow-lg shadow-[#1677FF]/25 transition hover:bg-[#1562D6] active:scale-98 disabled:opacity-70"
            >
              {isSubmitting ? (
                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/25 border-t-white" /> Saving Profile…</>
              ) : (
                <>Save Profile &amp; Access Dashboard <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>
              )}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}
