'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowRight, Home, FileCheck, Sparkles, Building2, GraduationCap, Users, LayoutGrid } from 'lucide-react';
import { HeroBackdrop } from '@/src/components/landing/HeroBackdrop';

function ThankYouContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'default';

  const [userName, setUserName] = useState('');
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('user_name');
      const company = localStorage.getItem('company_name');
      if (name) setUserName(name);
      if (company) setCompanyName(company);
    }
  }, []);

  const getDetails = () => {
    switch (type) {
      case 'corporate':
        return {
          badge: 'Corporate Profile Saved',
          title: 'Thank You for Setting Up Your Corporate Account!',
          subtitle: `Welcome aboard${userName ? `, ${userName}` : ''}! Your corporate profile for ${companyName || 'your organization'} has been successfully registered.`,
          icon: Building2,
          iconTone: 'bg-[#E8FAF5] text-[#0E9F88]',
          nextStep: 'You can now post custom training briefs or explore verified corporate facilitators on AtlasCircle.'
        };
      case 'institution':
        return {
          badge: 'Institution Profile Saved',
          title: 'Thank You! Institutional Profile Complete.',
          subtitle: `Your organization profile for ${companyName || 'your institute'} has been saved successfully.`,
          icon: GraduationCap,
          iconTone: 'bg-[#F3E8FF] text-[#7C3AED]',
          nextStep: 'Your training capabilities, domain expertise, and program formats are now active on AtlasCircle.'
        };
      case 'trainer':
        return {
          badge: 'Application Received',
          title: 'Thank You for Joining the Expert Facilitator Network!',
          subtitle: `Welcome${userName ? `, ${userName}` : ''}! Your trainer profile and credentials have been submitted for verification.`,
          icon: Users,
          iconTone: 'bg-[#EEF5FF] text-[#1677FF]',
          nextStep: 'Our verification team reviews applications within 24-48 hours. You will receive updates via email.'
        };
      case 'requirement':
        return {
          badge: 'Training Brief Posted',
          title: 'Your Training Requirement Has Been Submitted!',
          subtitle: 'Our AI matchmaking engine is matching your brief with top 1% verified corporate facilitators.',
          icon: FileCheck,
          iconTone: 'bg-[#E8FAF5] text-[#0E9F88]',
          nextStep: 'You will start receiving tailored proposals and trainer shortlists directly in your inbox.'
        };
      default:
        return {
          badge: 'Submission Successful',
          title: 'Thank You! Your Submission Has Been Received.',
          subtitle: 'We have received your information and saved your preferences on AtlasCircle.',
          icon: CheckCircle2,
          iconTone: 'bg-[#E8FAF5] text-[#0E9F88]',
          nextStep: 'Our platform team will be in touch shortly if any further details are required.'
        };
    }
  };

  const info = getDetails();
  const IconComp = info.icon;

  return (
    <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 pt-6">
      <div className="relative overflow-hidden rounded-[24px] border border-[#DCE8F4] bg-white p-6 sm:p-10 text-center shadow-[0_24px_70px_rgba(32,75,114,0.08)]">
        
        {/* Animated Icon Badge */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#F4F8FC] border border-[#DCE8F4] shadow-xs">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${info.iconTone}`}>
            <IconComp className="h-8 w-8 stroke-[2.2]" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#1677FF]/30 bg-[#EEF5FF] px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#1677FF] mb-3">
          <Sparkles className="h-3.5 w-3.5 text-[#1677FF]" />
          {info.badge}
        </div>

        <h1 className="atlas-display text-2xl sm:text-3xl font-black tracking-tight text-[#091536] leading-tight">
          {info.title}
        </h1>

        <p className="mt-2.5 max-w-lg mx-auto text-xs sm:text-sm font-semibold leading-relaxed text-[#5A6680]">
          {info.subtitle}
        </p>

        {/* Next Steps Information Box */}
        <div className="my-6 rounded-2xl border border-[#DCE8F4] bg-[#F9FCFF] p-4 text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#081536]">
            <CheckCircle2 className="h-4 w-4 text-[#0E9F88]" />
            What Happens Next?
          </div>
          <p className="text-xs font-medium text-[#475569] leading-relaxed">
            {info.nextStep}
          </p>
        </div>

        {/* Action Buttons Container */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-4 w-full">
          {type === 'trainer' && (
            <button
              type="button"
              onClick={() => router.push('/trainer-dashboard')}
              className="w-full sm:w-auto h-12 px-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0E9F88] text-xs sm:text-sm font-black text-white shadow-md shadow-[#0E9F88]/20 transition hover:bg-[#0C8975] active:scale-98 cursor-pointer whitespace-nowrap shrink-0"
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Go to Trainer Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}

          {type === 'corporate' && (
            <>
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="w-full sm:w-auto h-12 px-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0E9F88] text-xs sm:text-sm font-black text-white shadow-md shadow-[#0E9F88]/20 transition hover:bg-[#0C8975] active:scale-98 cursor-pointer whitespace-nowrap shrink-0"
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Go to Corporate Dashboard</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => router.push('/create-requirement')}
                className="w-full sm:w-auto h-12 px-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#EEF5FF] text-[#1677FF] border border-[#D0E2FF] hover:bg-[#E2EEFF] text-xs sm:text-sm font-black transition active:scale-98 cursor-pointer whitespace-nowrap shrink-0"
              >
                <FileCheck className="h-4 w-4 text-[#1677FF]" />
                <span>Create Requirement</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </>
          )}

          {type === 'requirement' && (
            <>
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="w-full sm:w-auto h-12 px-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0E9F88] text-xs sm:text-sm font-black text-white shadow-md shadow-[#0E9F88]/20 transition hover:bg-[#0C8975] active:scale-98 cursor-pointer whitespace-nowrap shrink-0"
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Go to Corporate Dashboard</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => router.push('/create-requirement')}
                className="w-full sm:w-auto h-12 px-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#EEF5FF] text-[#1677FF] border border-[#D0E2FF] hover:bg-[#E2EEFF] text-xs sm:text-sm font-black transition active:scale-98 cursor-pointer whitespace-nowrap shrink-0"
              >
                <FileCheck className="h-4 w-4 text-[#1677FF]" />
                <span>Post Another Requirement</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => router.push('/')}
            className={`w-full sm:w-auto h-12 px-6 inline-flex items-center justify-center gap-2 rounded-xl ${
              type === 'corporate' || type === 'trainer' || type === 'requirement'
                ? 'bg-slate-100 text-[#475569] hover:bg-slate-200 border border-slate-200'
                : 'bg-[#1677FF] text-white shadow-md shadow-[#1677FF]/20 hover:bg-[#1562D6]'
            } text-xs sm:text-sm font-black transition active:scale-98 cursor-pointer whitespace-nowrap shrink-0`}
          >
            <Home className="h-4 w-4" />
            <span>Return to Homepage</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <div className="relative min-h-screen bg-[#FBFAF7] font-sans text-[#091536] antialiased selection:bg-[#1677FF] selection:text-white pb-16">
      <HeroBackdrop />

      {/* Top Header Bar */}
      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-4 py-6 sm:px-6">
        <Link href="/" className="atlas-focus flex items-center rounded-xl group transition-transform duration-300 hover:scale-105">
          <img src="/logo/atlas-logo.webp" alt="AtlasCircle Logo" className="h-12 sm:h-16 w-auto object-contain" />
        </Link>
      </header>

      {/* Main Centered Content inside Suspense boundary */}
      <main>
        <Suspense fallback={
          <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 pt-12 text-center text-xs font-bold text-slate-400">
            Loading submission summary...
          </div>
        }>
          <ThankYouContent />
        </Suspense>
      </main>
    </div>
  );
}
