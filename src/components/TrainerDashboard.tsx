'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Briefcase, 
  DollarSign, 
  Calendar, 
  Star, 
  Send, 
  TrendingUp, 
  CheckCircle,
  Building,
  Clock,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Home
} from 'lucide-react';
import { Requirement } from '../types';

interface TrainerDashboardProps {
  requirements: Requirement[];
  onOpenRequirement: (req: Requirement) => void;
}

export const TrainerDashboard: React.FC<TrainerDashboardProps> = ({
  requirements,
  onOpenRequirement
}) => {
  const router = useRouter();
  const [trainerName, setTrainerName] = useState('Vikram Malhotra');
  const [trainerEmail, setTrainerEmail] = useState('vikram.malhotra@experttrainers.com');
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [emailSent, setEmailSent] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('user_name');
      const storedEmail = localStorage.getItem('registered_email');
      const storedStatus = localStorage.getItem('trainer_verification_status');
      const storedProfile = localStorage.getItem('atlas_trainer_profile');

      if (storedName) setTrainerName(storedName);
      if (storedEmail) setTrainerEmail(storedEmail);
      if (storedStatus) setVerificationStatus(storedStatus);

      if (storedProfile) {
        try {
          const parsed = JSON.parse(storedProfile);
          if (parsed.fullName) setTrainerName(parsed.fullName);
          if (parsed.email) setTrainerEmail(parsed.email);
        } catch (e) {
          // ignore
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex-1 bg-slate-50 font-sans">
      {/* TOP NAVIGATION BAR FOR TRAINER PORTAL */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 shadow-xs backdrop-blur-md sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1677FF] font-black text-white shadow-md shadow-[#1677FF]/20">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="atlas-display text-base font-black text-[#091536]">Atlas</span>
              <span className="rounded-md bg-[#EEF5FF] px-2 py-0.5 text-[10px] font-black text-[#1677FF]">Trainer Portal</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-100"
        >
          <Home className="h-4 w-4 text-slate-500" />
          <span>Back to Home</span>
        </button>
      </header>

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#ff603d] uppercase tracking-wider">
            <span>Trainer Portal View</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Welcome back, {trainerName}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Your registration has been received. Your profile and submitted credentials are currently under review.
          </p>
        </div>

        <span className="bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full self-start inline-flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          Details Being Verified
        </span>
      </div>

      {/* VERIFICATION & EMAIL CONFIRMATION BANNERS */}
      <div className="grid gap-5 sm:grid-cols-2 pt-2">
        {/* Verification Status Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/90 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/25">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">Profile Details Being Verified</h3>
                <span className="rounded-full bg-amber-200 px-2.5 py-0.5 text-[10px] font-black uppercase text-amber-900">In Review</span>
              </div>
              <p className="mt-2 text-xs font-medium text-slate-600 leading-relaxed">
                Your trainer profile and credentials have been submitted. The Atlas Verification Team is reviewing your documents (typically takes 1-2 business days).
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation Email Alert */}
        <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-blue-50/90 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1677FF] text-white shadow-md shadow-[#1677FF]/25">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">Confirmation Mail Sent</h3>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-800">Delivered</span>
              </div>
              <p className="mt-2 text-xs font-medium text-slate-600 leading-relaxed">
                A welcome &amp; verification confirmation email has been dispatched to <span className="font-bold text-slate-900">{trainerEmail}</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
