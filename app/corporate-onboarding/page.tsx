'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Award
} from 'lucide-react';
import { AuthLayout } from '@/src/components/auth/AuthLayout';

export default function CorporateOnboardingPage() {
  const router = useRouter();

  // 5 Field States
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('IT & Financial Technology');
  const [companySize, setCompanySize] = useState('500 - 1,000 Employees');
  const [trainingFocus, setTrainingFocus] = useState('Executive Leadership & Tech Upskilling');
  
  // POC Details
  const [pocName, setPocName] = useState('');
  const [pocDesignation, setPocDesignation] = useState('Head of Learning & Development');
  const [pocPhone, setPocPhone] = useState('');
  const [location, setLocation] = useState('Mumbai, Maharashtra');

  const [logoFileName, setLogoFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('onboarding_user');
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          if (parsed.organization && !companyName) setCompanyName(parsed.organization);
          if (parsed.name && !pocName) setPocName(parsed.name);
        }
      } catch (err) {
        // ignore
      }
    }
  }, []);

  const handleFillDemoProfile = () => {
    setCompanyName('Acme Global Technologies');
    setIndustry('IT & Financial Technology');
    setCompanySize('500 - 1,000 Employees');
    setTrainingFocus('Executive Leadership & Tech Upskilling');
    setPocName('Sarah Jenkins');
    setPocDesignation('Head of Learning & Leadership Development');
    setPocPhone('+91 98765 12345');
    setLocation('Mumbai, Maharashtra');
    setLogoFileName('Acme_Corporate_Logo.png');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const corporateProfile = {
      companyName: companyName || 'Acme Global Technologies',
      industry,
      companySize,
      trainingFocus,
      pocName: pocName || 'Sarah Jenkins',
      pocDesignation: pocDesignation || 'Head of L&D',
      pocPhone: pocPhone || '+91 98765 12345',
      location,
      onboardedAt: new Date().toISOString()
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('atlas_corporate_profile', JSON.stringify(corporateProfile));
      localStorage.setItem('user_name', corporateProfile.pocName);
      localStorage.setItem('company_name', corporateProfile.companyName);
    }

    setTimeout(() => {
      router.push('/create-requirement');
    }, 450);
  };

  return (
    <AuthLayout mode="register">
      <div className="relative overflow-hidden rounded-[24px] border border-white bg-white/90 p-4 min-[400px]:p-5 sm:p-8 shadow-[0_24px_70px_rgba(32,75,114,0.14)] backdrop-blur-2xl">
        <div className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,#11BFA5,#176BFF,transparent)]" />
        
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col min-[480px]:flex-row min-[480px]:items-center justify-between gap-2.5">
            <div className="inline-flex self-start items-center gap-1.5 rounded-full border border-[#0E9F88]/30 bg-[#E8FAF5] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#0E8D76]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#0E9F88]" />
              Corporate Account Verified
            </div>

            <button
              type="button"
              onClick={handleFillDemoProfile}
              className="inline-flex self-start min-[480px]:self-auto items-center gap-1.5 rounded-full border border-[#1677FF]/30 bg-[#EEF5FF] px-3.5 py-1 text-[10px] font-black text-[#1677FF] transition hover:bg-[#DDF0FF]"
            >
              <Sparkles className="h-3 w-3 text-[#1677FF]" />
              Auto-Fill Demo Profile
            </button>
          </div>

          <h1 className="atlas-display mt-3 text-2xl sm:text-3xl font-black tracking-tight text-[#091536]">
            Complete Corporate Profile
          </h1>
          <p className="mt-1 text-xs font-medium text-[#5A6680]">
            Provide 5 quick details about your organization &amp; primary point of contact to post training requirements.
          </p>
        </div>

        {/* 5-Field Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* FIELD 1: Company Logo & Name */}
          <div className="rounded-2xl border border-[#DCE8F4] bg-[#F9FCFF] p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black text-[#091536] uppercase tracking-wider">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0E9F88] text-[10px] font-bold text-white">1</span>
              Company Identity &amp; Logo
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  Organization Name *
                </label>
                <div className="relative flex items-center">
                  <Building2 className="pointer-events-none absolute left-3 h-4 w-4 text-[#94A3B8]" />
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Global Technologies"
                    className="w-full rounded-xl border border-[#CBD5E1] bg-white pl-9 pr-3 py-2 text-xs font-semibold text-[#091536] placeholder-[#94A3B8] focus:border-[#0E9F88] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  Company Logo (Optional)
                </label>
                <div className="relative flex items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setLogoFileName(e.target.files[0].name);
                      }
                    }}
                    className="w-full text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-[#EEF5FF] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#1677FF] cursor-pointer"
                  />
                </div>
                {logoFileName ? (
                  <p className="mt-1 text-[10px] font-semibold text-[#0E9F88]">Uploaded: {logoFileName}</p>
                ) : null}
              </div>
            </div>
          </div>

          {/* FIELD 2: Industry & Scale */}
          <div className="rounded-2xl border border-[#DCE8F4] bg-[#F9FCFF] p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black text-[#091536] uppercase tracking-wider">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0E9F88] text-[10px] font-bold text-white">2</span>
              Industry Sector &amp; Company Size
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  Primary Industry *
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-semibold text-[#091536] focus:border-[#0E9F88] focus:outline-none"
                >
                  <option>IT &amp; Financial Technology</option>
                  <option>BFSI &amp; Banking</option>
                  <option>Healthcare &amp; Pharma</option>
                  <option>Manufacturing &amp; Automotive</option>
                  <option>FMCG &amp; Retail</option>
                  <option>Consulting &amp; Professional Services</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  Employee Strength *
                </label>
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-semibold text-[#091536] focus:border-[#0E9F88] focus:outline-none"
                >
                  <option>1 - 50 Employees</option>
                  <option>51 - 200 Employees</option>
                  <option>201 - 500 Employees</option>
                  <option>500 - 1,000 Employees</option>
                  <option>1,000 - 5,000 Employees</option>
                  <option>5,000+ Enterprise</option>
                </select>
              </div>
            </div>
          </div>

          {/* FIELD 3: Training Priorities */}
          <div className="rounded-2xl border border-[#DCE8F4] bg-[#F9FCFF] p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black text-[#091536] uppercase tracking-wider">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0E9F88] text-[10px] font-bold text-white">3</span>
              Primary L&amp;D Training Priorities
            </div>

            <div>
              <input
                type="text"
                value={trainingFocus}
                onChange={(e) => setTrainingFocus(e.target.value)}
                placeholder="e.g. Leadership Development, AI Upskilling, Communication, Sales"
                className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-semibold text-[#091536] placeholder-[#94A3B8] focus:border-[#0E9F88] focus:outline-none"
              />
            </div>
          </div>

          {/* FIELD 4: Point of Contact Details */}
          <div className="rounded-2xl border border-[#DCE8F4] bg-[#F9FCFF] p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black text-[#091536] uppercase tracking-wider">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0E9F88] text-[10px] font-bold text-white">4</span>
              Primary Point of Contact (POC)
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  POC Full Name *
                </label>
                <div className="relative flex items-center">
                  <User className="pointer-events-none absolute left-3 h-4 w-4 text-[#94A3B8]" />
                  <input
                    type="text"
                    required
                    value={pocName}
                    onChange={(e) => setPocName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full rounded-xl border border-[#CBD5E1] bg-white pl-9 pr-3 py-2 text-xs font-semibold text-[#091536] placeholder-[#94A3B8] focus:border-[#0E9F88] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  Designation / Role *
                </label>
                <div className="relative flex items-center">
                  <Briefcase className="pointer-events-none absolute left-3 h-4 w-4 text-[#94A3B8]" />
                  <input
                    type="text"
                    required
                    value={pocDesignation}
                    onChange={(e) => setPocDesignation(e.target.value)}
                    placeholder="e.g. Head of L&D"
                    className="w-full rounded-xl border border-[#CBD5E1] bg-white pl-9 pr-3 py-2 text-xs font-semibold text-[#091536] placeholder-[#94A3B8] focus:border-[#0E9F88] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FIELD 5: POC Contact & Location */}
          <div className="rounded-2xl border border-[#DCE8F4] bg-[#F9FCFF] p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black text-[#091536] uppercase tracking-wider">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0E9F88] text-[10px] font-bold text-white">5</span>
              Contact Phone &amp; Location
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  Work Contact Phone *
                </label>
                <div className="relative flex items-center">
                  <Phone className="pointer-events-none absolute left-3 h-4 w-4 text-[#94A3B8]" />
                  <input
                    type="tel"
                    required
                    value={pocPhone}
                    onChange={(e) => setPocPhone(e.target.value)}
                    placeholder="+91 98765 12345"
                    className="w-full rounded-xl border border-[#CBD5E1] bg-white pl-9 pr-3 py-2 text-xs font-semibold text-[#091536] placeholder-[#94A3B8] focus:border-[#0E9F88] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  Headquarters Location *
                </label>
                <div className="relative flex items-center">
                  <MapPin className="pointer-events-none absolute left-3 h-4 w-4 text-[#94A3B8]" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Mumbai, Maharashtra"
                    className="w-full rounded-xl border border-[#CBD5E1] bg-white pl-9 pr-3 py-2 text-xs font-semibold text-[#091536] placeholder-[#94A3B8] focus:border-[#0E9F88] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="atlas-focus group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0E9F88] text-sm font-black text-white shadow-lg shadow-[#0E9F88]/25 transition hover:bg-[#0C8B77] active:scale-98 disabled:opacity-70"
          >
            {isSubmitting ? (
              <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/25 border-t-white" /> Saving Corporate Profile…</>
            ) : (
              <>Save Profile &amp; Post Requirement <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>
            )}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
