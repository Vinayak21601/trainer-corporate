'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  User,
  Building2,
  Menu,
  X,
  Linkedin,
  Twitter,
  Facebook,
  Globe,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Award,
  Zap,
  LogIn,
  UserPlus,
  FileText,
  GraduationCap,
  CheckCircle2,
  Clock,
  Star,
  TrendingUp,
  Briefcase,
  UserRound,
  Mail,
  LockKeyhole,
  Check,
  UsersRound,
  Calendar,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Trainer } from '../types';
import { LandingButton } from './landing/LandingButton';
import { HeroBackdrop } from './landing/HeroBackdrop';
import { SectionHeading } from './landing/SectionHeading';
import { landingTestimonials as testimonials } from './landing/landingData';

interface LandingPageV2Props {
  onExploreExperts?: (domain?: string, query?: string, delivery?: string) => void;
  onCreateRequirement?: () => void;
  featuredTrainers?: Trainer[];
  onSelectTrainer?: (trainer: Trainer) => void;
  onToggleShortlist?: (trainerId: string) => void;
  onOpenAiAssistant?: () => void;
}

export const LandingPageV2: React.FC<LandingPageV2Props> = ({
  onExploreExperts,
  onCreateRequirement,
  onOpenAiAssistant
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const [activePathRole, setActivePathRole] = useState<'corporate' | 'trainer' | 'institution'>('corporate');
  const [activePreviewTab, setActivePreviewTab] = useState<'dashboard' | 'matches' | 'briefs' | 'analytics'>('dashboard');

  // Embedded Register Form States - strictly synchronized with the selected path tab
  const regRole = activePathRole;
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regOrg, setRegOrg] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regTerms, setRegTerms] = useState(false);
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});
  const [regIsSubmitting, setRegIsSubmitting] = useState(false);

  // Email verification modal states
  const [showRegModal, setShowRegModal] = useState(false);
  const [regOtpCode, setRegOtpCode] = useState('');
  const [regOtpError, setRegOtpError] = useState('');
  const [regIsVerifying, setRegIsVerifying] = useState(false);

  const scrollToRegisterForm = () => {
    const el = document.getElementById('inline-register-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const scrollToPlatformPreview = () => {
    const el = document.getElementById('platform-preview');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const [previewToast, setPreviewToast] = useState<string | null>(null);

  const handlePreviewAction = (message: string) => {
    setPreviewToast(message);
    setTimeout(() => setPreviewToast(null), 4000);
    scrollToRegisterForm();
  };

  const handleFillDemoReg = () => {
    if (regRole === 'trainer') {
      setRegName('Vikram Malhotra');
      setRegEmail('vikram.malhotra@experttrainers.com');
      setRegPassword('password123');
      setRegTerms(true);
      setRegErrors({});
    } else if (regRole === 'institution') {
      setRegName('Dr. Ramesh Rao');
      setRegEmail('ramesh.rao@nit-campus.edu');
      setRegOrg('National Institute of Technology');
      setRegPassword('password123');
      setRegTerms(true);
      setRegErrors({});
    } else {
      setRegName('Sarah Jenkins');
      setRegEmail('sarah.j@acmecorp.com');
      setRegOrg('Acme Corporation');
      setRegPassword('password123');
      setRegTerms(true);
      setRegErrors({});
    }
  };

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (regName.trim().length < 2) errs.name = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(regEmail)) errs.email = 'Enter a valid work email address.';
    if ((regRole === 'corporate' || regRole === 'institution') && regOrg.trim().length < 2) {
      errs.org = regRole === 'institution' ? 'Enter institution name.' : 'Enter organization name.';
    }
    if (regPassword.length < 8) errs.password = 'Use at least 8 characters.';
    if (!regTerms) errs.terms = 'Accept terms to continue.';
    setRegErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setShowRegModal(true);
  };

  const handleConfirmRegVerification = (codeToVerify = regOtpCode) => {
    setRegIsVerifying(true);
    setRegOtpError('');

    setTimeout(() => {
      if (codeToVerify.trim() === '' || codeToVerify.trim() === '1234' || codeToVerify === 'AUTO_VERIFY') {
        if (typeof window !== 'undefined') {
          localStorage.setItem('onboarding_user', JSON.stringify({
            name: regName,
            email: regEmail,
            organization: regOrg,
            accountType: regRole === 'trainer' ? 'trainer' : regRole === 'institution' ? 'institution' : 'organization',
            emailVerified: true,
            verifiedAt: new Date().toISOString()
          }));
          localStorage.setItem('registered_email', regEmail);
          localStorage.setItem('user_name', regName);
        }
        setShowRegModal(false);
        setRegIsSubmitting(true);
        window.setTimeout(() => {
          router.push(regRole === 'trainer' ? '/trainer-registration' : regRole === 'institution' ? '/org-institute-form' : '/corporate-onboarding');
        }, 400);
      } else {
        setRegIsVerifying(false);
        setRegOtpError('Invalid code. Enter 1234 or click Auto-Verify.');
      }
    }, 400);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onExploreExperts) {
      onExploreExperts(undefined, searchQuery || undefined, undefined);
    } else {
      router.push(searchQuery ? `/experts?search=${encodeURIComponent(searchQuery)}` : '/experts');
    }
  };

  const handleTrainerSignUp = () => {
    setActivePathRole('trainer');
    scrollToRegisterForm();
  };

  const handleTrainerSignIn = () => {
    setActivePathRole('trainer');
    scrollToRegisterForm();
  };

  const handleCorporateSignUp = () => {
    setActivePathRole('corporate');
    scrollToRegisterForm();
  };

  const handleCorporateSignIn = () => {
    setActivePathRole('corporate');
    scrollToRegisterForm();
  };

  const handleInstitutionSignUp = () => {
    setActivePathRole('institution');
    scrollToRegisterForm();
  };

  const renderRegisterForm = () => (
    <div id="inline-register-form" className="relative overflow-hidden rounded-2xl border border-[#DCE8F4] bg-white p-5 sm:p-7 shadow-[0_12px_32px_rgba(20,45,80,0.06)]">
      <div className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,#0E9F88,#1677FF,#7C3AED,transparent)]" />

      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 pb-3.5">
        <div>
          <div
            className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.14em] ${
              activePathRole === 'corporate'
                ? 'text-[#0E9F88]'
                : activePathRole === 'trainer'
                ? 'text-[#1677FF]'
                : 'text-[#7C3AED]'
            }`}
          >
            <Sparkles className="h-3 w-3" />
            {activePathRole === 'corporate' && 'Corporate Registration'}
            {activePathRole === 'trainer' && 'Trainer Registration'}
            {activePathRole === 'institution' && 'Institution Registration'}
          </div>
          <h4 className="atlas-display mt-0.5 text-lg sm:text-xl font-black text-[#091536]">
            Create your AtlasCircle account
          </h4>
          <p className="text-[11px] font-medium text-[#5A6680] mt-0.5">
            {activePathRole === 'corporate' && 'Sign up as an organization to source and hire verified corporate trainers.'}
            {activePathRole === 'trainer' && 'Sign up as an expert trainer to receive high-paying corporate briefs directly.'}
            {activePathRole === 'institution' && 'Sign up as an institution to bring industry masterclasses to students.'}
          </p>
        </div>
        <button
          type="button"
          onClick={handleFillDemoReg}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-full border border-[#1677FF]/30 bg-[#EEF5FF] px-3 py-1 text-[11px] font-black text-[#1677FF] transition hover:bg-[#DDF0FF]"
        >
          <Sparkles className="h-3 w-3 text-[#1677FF]" />
          Demo Data
        </button>
      </div>

      <form onSubmit={handleRegSubmit} className="space-y-3.5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#64748B] mb-1">
              Full Name
            </label>
            <div className="relative">
              <UserRound className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#94A3B8]" />
              <input
                type="text"
                placeholder={
                  activePathRole === 'trainer'
                    ? 'Vikram Malhotra'
                    : activePathRole === 'institution'
                    ? 'Dr. Ramesh Rao'
                    : 'Sarah Jenkins'
                }
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full rounded-xl border border-[#CBD5E1] bg-white pl-9 pr-3 py-2 text-xs font-semibold text-[#091536] placeholder:text-[#94A3B8] focus:border-[#1677FF] focus:outline-none"
              />
            </div>
            {regErrors.name && <p className="mt-1 text-[10px] font-bold text-[#C62E40]">{regErrors.name}</p>}
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#64748B] mb-1">
              {activePathRole === 'corporate'
                ? 'Work Email'
                : activePathRole === 'institution'
                ? 'Official Campus Email'
                : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#94A3B8]" />
              <input
                type="email"
                placeholder={
                  activePathRole === 'trainer'
                    ? 'vikram@example.com'
                    : activePathRole === 'institution'
                    ? 'name@nit-campus.edu'
                    : 'name@company.com'
                }
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full rounded-xl border border-[#CBD5E1] bg-white pl-9 pr-3 py-2 text-xs font-semibold text-[#091536] placeholder:text-[#94A3B8] focus:border-[#1677FF] focus:outline-none"
              />
            </div>
            {regErrors.email && <p className="mt-1 text-[10px] font-bold text-[#C62E40]">{regErrors.email}</p>}
          </div>

          {(activePathRole === 'corporate' || activePathRole === 'institution') && (
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#64748B] mb-1">
                {activePathRole === 'institution' ? 'Institution / Campus Name' : 'Organization Name'}
              </label>
              <div className="relative">
                {activePathRole === 'institution' ? (
                  <GraduationCap className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#94A3B8]" />
                ) : (
                  <Building2 className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#94A3B8]" />
                )}
                <input
                  type="text"
                  placeholder={
                    activePathRole === 'institution'
                      ? 'National Institute of Technology'
                      : 'Acme Corporation'
                  }
                  value={regOrg}
                  onChange={(e) => setRegOrg(e.target.value)}
                  className="w-full rounded-xl border border-[#CBD5E1] bg-white pl-9 pr-3 py-2 text-xs font-semibold text-[#091536] placeholder:text-[#94A3B8] focus:border-[#1677FF] focus:outline-none"
                />
              </div>
              {regErrors.org && <p className="mt-1 text-[10px] font-bold text-[#C62E40]">{regErrors.org}</p>}
            </div>
          )}

          <div className="sm:col-span-2">
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#64748B] mb-1">
              Password
            </label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#94A3B8]" />
              <input
                type="password"
                placeholder="At least 8 characters"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full rounded-xl border border-[#CBD5E1] bg-white pl-9 pr-3 py-2 text-xs font-semibold text-[#091536] placeholder:text-[#94A3B8] focus:border-[#1677FF] focus:outline-none"
              />
            </div>
            {regErrors.password && <p className="mt-1 text-[10px] font-bold text-[#C62E40]">{regErrors.password}</p>}
          </div>
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-2 text-[11px] font-semibold text-[#5A6680]">
            <input
              type="checkbox"
              checked={regTerms}
              onChange={(e) => setRegTerms(e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-[#CBD5E1] accent-[#1677FF]"
            />
            <span>
              I agree to the{' '}
              <button type="button" className="font-bold text-[#1677FF]">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="font-bold text-[#1677FF]">
                Privacy Policy
              </button>
              .
            </span>
          </label>
          {regErrors.terms && <p className="mt-1 text-[10px] font-bold text-[#C62E40]">{regErrors.terms}</p>}
        </div>

        <button
          type="submit"
          disabled={regIsSubmitting}
          className={`atlas-focus group flex h-11 w-full items-center justify-center gap-2 rounded-xl text-xs sm:text-sm font-black transition hover:-translate-y-0.5 disabled:opacity-70 ${
            activePathRole === 'corporate'
              ? 'bg-[#0E9F88] text-white hover:bg-[#0C8B77] shadow-[0_12px_28px_rgba(14,159,136,0.24)]'
              : activePathRole === 'trainer'
              ? 'bg-[#1677FF] text-white hover:bg-[#1562D6] shadow-[0_12px_28px_rgba(22,119,255,0.24)]'
              : 'bg-[#7C3AED] text-white hover:bg-[#6D28D9] shadow-[0_12px_28px_rgba(124,58,237,0.24)]'
          }`}
        >
          {regIsSubmitting ? (
            'Creating account...'
          ) : (
            <>
              {activePathRole === 'corporate' && 'Create Corporate Account'}
              {activePathRole === 'trainer' && 'Create Trainer Account'}
              {activePathRole === 'institution' && 'Create Institution Account'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );

  const renderSaaSPreview = () => (
    <div id="platform-preview" className="mt-8 sm:mt-10 mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-2xl border border-[#D5E2EE] bg-[#EEF2F6] p-2 sm:p-2.5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-xs">
          {/* Action Feedback Banner */}
          {previewToast && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between border-b border-slate-900 bg-[#091536] px-4 py-2.5 text-xs text-white"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span className="font-semibold">{previewToast}</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewToast(null)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}

          {/* CORPORATE / L&D PREVIEW WINDOW */}
          {activePathRole === 'corporate' && (
            <div>
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#EC6A5E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F4BF4F]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#61C554]" />
                  </div>
                  <span className="ml-2 font-mono text-[11px] sm:text-xs font-semibold text-slate-500">
                    atlascircle.com / corporate / ai-matcher
                  </span>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-[#E8FAF5] px-3 py-1 text-[11px] font-extrabold text-[#0E8D76] border border-[#BDEBDD]">
                  <span className="h-2 w-2 rounded-full bg-[#0E9F88]" />
                  3 Matches Ready
                </span>
              </div>

              {/* Sub-Tabs Bar */}
              <div className="flex items-center gap-1 border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 pt-2">
                {[
                  { id: 'dashboard', label: 'AI Shortlist' },
                  { id: 'briefs', label: 'Active Brief' },
                  { id: 'analytics', label: 'Metrics' },
                ].map((subTab) => (
                  <button
                    key={subTab.id}
                    type="button"
                    onClick={() => setActivePreviewTab(subTab.id as any)}
                    className={`rounded-t-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                      activePreviewTab === subTab.id
                        ? 'bg-white text-slate-900 border-t-2 border-[#0E9F88] shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {subTab.label}
                  </button>
                ))}
              </div>

              {/* Sub-Tabs Content */}
              <div className="p-4 sm:p-5 text-slate-800 min-h-[310px] bg-gradient-to-b from-white to-[#FAFCFE]">
                {/* 1. AI SHORTLIST */}
                {activePreviewTab === 'dashboard' && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                      <span className="font-extrabold text-[#115E59] text-sm sm:text-base">Top Recommended Facilitators</span>
                      <span className="font-bold text-[#0E9F88] text-xs sm:text-sm">Ranked by Outcome Score</span>
                    </div>

                    <div className="grid gap-3">
                      {/* Facilitator 1: Dr. Rajesh Verma */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-[#F8FAFC] p-4 border border-slate-200/90 shadow-xs hover:border-[#0E9F88] transition-all">
                        <div className="flex items-center gap-3.5">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8FAF5] font-black text-[#0E8D76] text-base border border-[#BDEBDD]">
                            D
                          </div>
                          <div>
                            <div className="text-sm font-black text-slate-900">Dr. Rajesh Verma</div>
                            <div className="text-xs font-semibold text-slate-600">BFSI Leadership &amp; Risk Facilitator</div>
                            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                              <span>16+ yrs</span>
                              <span>•</span>
                              <span>Ex-McKinsey</span>
                              <span>•</span>
                              <span className="font-bold text-slate-700 inline-flex items-center gap-1">
                                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                                4.95
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 border-slate-200/60 pt-2 sm:pt-0">
                          <span className="text-sm font-black text-[#0E9F88]">98% Match</span>
                          <button
                            type="button"
                            onClick={() => handlePreviewAction('Invite dispatched to Dr. Rajesh Verma! Complete your organization account above to confirm dates.')}
                            className="rounded-lg bg-[#0E9F88] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#0C8B77] transition shadow-xs"
                          >
                            Invite
                          </button>
                        </div>
                      </div>

                      {/* Facilitator 2: Ananya Deshmukh */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-[#F8FAFC] p-4 border border-slate-200/90 shadow-xs hover:border-[#0E9F88] transition-all">
                        <div className="flex items-center gap-3.5">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8FAF5] font-black text-[#0E8D76] text-base border border-[#BDEBDD]">
                            A
                          </div>
                          <div>
                            <div className="text-sm font-black text-slate-900">Ananya Deshmukh</div>
                            <div className="text-xs font-semibold text-slate-600">Enterprise Generative AI Adoption</div>
                            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                              <span>11+ yrs</span>
                              <span>•</span>
                              <span>Trained TATA, Siemens</span>
                              <span>•</span>
                              <span className="font-bold text-slate-700 inline-flex items-center gap-1">
                                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                                4.98
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 border-slate-200/60 pt-2 sm:pt-0">
                          <span className="text-sm font-black text-[#0E9F88]">96% Match</span>
                          <button
                            type="button"
                            onClick={() => handlePreviewAction('Invite dispatched to Ananya Deshmukh! Complete your organization account above to confirm dates.')}
                            className="rounded-lg bg-[#0E9F88] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#0C8B77] transition shadow-xs"
                          >
                            Invite
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status Bar */}
                    <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] px-4 py-2.5 border border-slate-200/80 text-xs font-semibold text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Zap className="h-4 w-4 text-amber-500" />
                        <span>Avg shortlist response: <strong>&lt; 24 hours</strong></span>
                      </span>
                      <span className="text-[#0E9F88] font-bold">100% Quality Guaranteed</span>
                    </div>
                  </div>
                )}

                {/* 2. ACTIVE BRIEF */}
                {activePreviewTab === 'briefs' && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-700">Brief #REQ-9482</span>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                          Live • Sourcing Facilitators
                        </span>
                      </div>
                      <span className="font-bold text-[#0E9F88]">4 Verified Proposals Received</span>
                    </div>

                    <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFC] p-4 space-y-3">
                      <div>
                        <h5 className="text-sm font-black text-slate-900">
                          Generative AI &amp; Agentic Workflows for Engineering Leaders
                        </h5>
                        <p className="text-xs text-slate-600 mt-1">
                          TATA Enterprise L&amp;D • 2-Day Executive Masterclass (On-Site, Bengaluru)
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="rounded-lg bg-white px-2.5 py-1 font-semibold text-slate-700 border border-slate-200">
                          👥 32 Senior Directors &amp; Tech Leads
                        </span>
                        <span className="rounded-lg bg-white px-2.5 py-1 font-semibold text-slate-700 border border-slate-200">
                          📅 Confirmed Dates: Sept 22-23
                        </span>
                        <span className="rounded-lg bg-[#E8FAF5] px-2.5 py-1 font-black text-[#0E8D76] border border-[#BDEBDD]">
                          ₹ 2,40,000 Budget Allocated
                        </span>
                      </div>

                      <div className="rounded-xl bg-white p-3 border border-slate-200/80 space-y-2">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Shortlisted Facilitator Bid Overview
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">Dr. Rajesh Verma</span>
                          <span className="font-black text-[#0E9F88]">₹ 1,10,000 / day</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">Ananya Deshmukh</span>
                          <span className="font-black text-[#0E9F88]">₹ 95,000 / day</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handlePreviewAction('Brief selected! Sign up above to access the complete NDA and facilitate contract signing.')}
                        className="w-full rounded-xl bg-[#0E9F88] py-2.5 text-xs font-black text-white hover:bg-[#0C8B77] transition shadow-xs"
                      >
                        Review &amp; Lock Facilitator Contract
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. METRICS */}
                {activePreviewTab === 'analytics' && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                      <span className="font-black text-slate-800 text-sm">Enterprise Training Performance Metrics</span>
                      <span className="text-xs font-bold text-[#0E9F88]">Quarterly Executive Report</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div className="rounded-xl bg-[#F8FAFC] p-3 border border-slate-200/90 text-center">
                        <div className="text-xl font-black text-[#0E9F88]">98.6%</div>
                        <div className="text-[10px] font-bold text-slate-600 mt-0.5">CSAT Satisfaction</div>
                      </div>
                      <div className="rounded-xl bg-[#F8FAFC] p-3 border border-slate-200/90 text-center">
                        <div className="text-xl font-black text-blue-600">&lt; 18 hrs</div>
                        <div className="text-[10px] font-bold text-slate-600 mt-0.5">Shortlist Turnaround</div>
                      </div>
                      <div className="rounded-xl bg-[#F8FAFC] p-3 border border-slate-200/90 text-center">
                        <div className="text-xl font-black text-purple-600">₹ 24.5L</div>
                        <div className="text-[10px] font-bold text-slate-600 mt-0.5">Budget Optimized</div>
                      </div>
                      <div className="rounded-xl bg-[#F8FAFC] p-3 border border-slate-200/90 text-center">
                        <div className="text-xl font-black text-emerald-600">100%</div>
                        <div className="text-[10px] font-bold text-slate-600 mt-0.5">Vetted Pedigree</div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-[#F8FAFC] p-3.5 border border-slate-200/90">
                      <div className="text-xs font-bold text-slate-700 mb-2">Training Domains Delivered (This Quarter)</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-semibold text-slate-600">
                        <div className="rounded-lg bg-white p-2 border border-slate-200">
                          <span className="font-black text-slate-900 block text-xs">42%</span>
                          <span>GenAI &amp; LLMs</span>
                        </div>
                        <div className="rounded-lg bg-white p-2 border border-slate-200">
                          <span className="font-black text-slate-900 block text-xs">28%</span>
                          <span>BFSI Leadership</span>
                        </div>
                        <div className="rounded-lg bg-white p-2 border border-slate-200">
                          <span className="font-black text-slate-900 block text-xs">18%</span>
                          <span>Agile Architecture</span>
                        </div>
                        <div className="rounded-lg bg-white p-2 border border-slate-200">
                          <span className="font-black text-slate-900 block text-xs">12%</span>
                          <span>DevSecOps &amp; Cloud</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TRAINER / FACILITATOR PREVIEW WINDOW */}
          {activePathRole === 'trainer' && (
            <div>
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#EC6A5E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F4BF4F]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#61C554]" />
                  </div>
                  <span className="ml-2 font-mono text-[11px] sm:text-xs font-semibold text-slate-500">
                    atlascircle.com / trainer / portal
                  </span>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-[#EEF5FF] px-3 py-1 text-[11px] font-extrabold text-[#1677FF] border border-[#D0E2FF]">
                  <span className="h-2 w-2 rounded-full bg-[#1677FF]" />
                  4 Direct Briefs
                </span>
              </div>

              {/* Sub-Tabs Bar */}
              <div className="flex items-center gap-1 border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 pt-2">
                {[
                  { id: 'dashboard', label: 'Lead Hub' },
                  { id: 'briefs', label: 'Calendar' },
                  { id: 'analytics', label: 'Earnings' },
                ].map((subTab) => (
                  <button
                    key={subTab.id}
                    type="button"
                    onClick={() => setActivePreviewTab(subTab.id as any)}
                    className={`rounded-t-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                      activePreviewTab === subTab.id
                        ? 'bg-white text-slate-900 border-t-2 border-[#1677FF] shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {subTab.label}
                  </button>
                ))}
              </div>

              {/* Sub-Tabs Content */}
              <div className="p-4 sm:p-5 text-slate-800 min-h-[310px] bg-gradient-to-b from-white to-[#FAFCFE]">
                {/* 1. LEAD HUB */}
                {activePreviewTab === 'dashboard' && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                      <span className="font-extrabold text-[#091536] text-sm sm:text-base">Direct Enterprise Briefs</span>
                      <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-black text-blue-700 border border-blue-200">
                        4 New
                      </span>
                    </div>

                    <div className="grid gap-3">
                      {/* Brief 1 */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-[#F8FAFC] p-4 border border-slate-200/90 shadow-xs hover:border-[#1677FF] transition-all">
                        <div>
                          <div className="text-sm font-black text-slate-900">
                            Generative AI for Enterprise Product Teams
                          </div>
                          <div className="text-xs font-semibold text-slate-600 mt-0.5">
                            TATA Enterprise L&amp;D • Sept 22-23 • On-site
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 border-slate-200/60 pt-2 sm:pt-0">
                          <div className="text-sm font-black text-[#059669]">Rs 1,10,000 / day</div>
                          <button
                            type="button"
                            onClick={() => handlePreviewAction('Brief accepted! Complete your trainer account above to lock your delivery dates.')}
                            className="rounded-lg bg-[#1677FF] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#1562D6] transition shadow-xs"
                          >
                            Accept Brief
                          </button>
                        </div>
                      </div>

                      {/* Brief 2 */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-[#F8FAFC] p-4 border border-slate-200/90 shadow-xs hover:border-[#1677FF] transition-all">
                        <div>
                          <div className="text-sm font-black text-slate-900">
                            Executive High-Stakes Negotiation Masterclass
                          </div>
                          <div className="text-xs font-semibold text-slate-600 mt-0.5">
                            Global Fintech Unicorn • Oct 04 • Virtual
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 border-slate-200/60 pt-2 sm:pt-0">
                          <div className="text-sm font-black text-[#059669]">Rs 95,000 / day</div>
                          <button
                            type="button"
                            onClick={() => handlePreviewAction('Brief accepted! Complete your trainer account above to lock your delivery dates.')}
                            className="rounded-lg bg-[#1677FF] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#1562D6] transition shadow-xs"
                          >
                            Accept Brief
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status Bar */}
                    <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] px-4 py-2.5 border border-slate-200/80 text-xs font-semibold text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-blue-500" />
                        <span>Platform commission: <strong>0% (Keep 100%)</strong></span>
                      </span>
                      <span className="text-[#1677FF] font-bold">7-Day Direct Payout</span>
                    </div>
                  </div>
                )}

                {/* 2. CALENDAR */}
                {activePreviewTab === 'briefs' && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                      <span className="font-extrabold text-[#091536] text-sm">Confirmed Facilitation Calendar</span>
                      <span className="text-xs font-bold text-[#1677FF]">3 Confirmed Engagements</span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="rounded-xl bg-[#F8FAFC] p-3.5 border border-slate-200/90 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-blue-100 text-[#1677FF] flex flex-col items-center justify-center font-bold text-[10px]">
                            <span className="text-[12px] font-black">22</span>
                            <span>SEP</span>
                          </div>
                          <div>
                            <div className="text-xs font-black text-slate-900">GenAI for Product Teams (2 Days)</div>
                            <div className="text-[11px] text-slate-500">TATA Motors HQ • Mumbai (On-Site)</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-black text-emerald-600">₹ 2,20,000</div>
                          <div className="text-[10px] font-bold text-slate-400">Confirmed</div>
                        </div>
                      </div>

                      <div className="rounded-xl bg-[#F8FAFC] p-3.5 border border-slate-200/90 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-blue-100 text-[#1677FF] flex flex-col items-center justify-center font-bold text-[10px]">
                            <span className="text-[12px] font-black">04</span>
                            <span>OCT</span>
                          </div>
                          <div>
                            <div className="text-xs font-black text-slate-900">High-Stakes Negotiation Masterclass</div>
                            <div className="text-[11px] text-slate-500">Global Fintech Unicorn • Virtual Live</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-black text-emerald-600">₹ 95,000</div>
                          <div className="text-[10px] font-bold text-slate-400">Confirmed</div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePreviewAction('Calendar sync enabled! Register your trainer account above to connect Google Calendar or Outlook.')}
                      className="w-full rounded-xl bg-[#1677FF] py-2.5 text-xs font-black text-white hover:bg-[#1562D6] transition shadow-xs"
                    >
                      Connect &amp; Sync With Google / Outlook Calendar
                    </button>
                  </div>
                )}

                {/* 3. EARNINGS */}
                {activePreviewTab === 'analytics' && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                      <span className="font-extrabold text-[#091536] text-sm">Consulting Earnings &amp; Direct Disbursements</span>
                      <span className="text-xs font-bold text-[#1677FF]">100% Retained</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 text-center">
                      <div className="rounded-xl bg-[#F8FAFC] p-3 border border-slate-200/90">
                        <div className="text-xl font-black text-[#1677FF]">₹ 6,85,000</div>
                        <div className="text-[10px] font-bold text-slate-600 mt-0.5">Billed This Quarter</div>
                      </div>
                      <div className="rounded-xl bg-[#F8FAFC] p-3 border border-slate-200/90">
                        <div className="text-xl font-black text-emerald-600 inline-flex items-center gap-1 justify-center">
                          <span>4.96</span>
                          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                        </div>
                        <div className="text-[10px] font-bold text-slate-600 mt-0.5">Avg Participant Rating</div>
                      </div>
                      <div className="rounded-xl bg-[#F8FAFC] p-3 border border-slate-200/90">
                        <div className="text-xl font-black text-purple-600">0%</div>
                        <div className="text-[10px] font-bold text-slate-600 mt-0.5">Platform Cut Taken</div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-emerald-50/80 p-3.5 border border-emerald-200 text-xs text-emerald-900">
                      <div className="flex items-center justify-between font-bold">
                        <span>Direct Payout Schedule</span>
                        <span className="text-emerald-700">Bank Transfer (RTGS/NEFT)</span>
                      </div>
                      <p className="mt-1 text-[11px] text-emerald-800">
                        Next scheduled disbursement: <strong>₹ 2,20,000</strong> on Sept 25 directly into your verified bank account.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* INSTITUTION / CAMPUS PREVIEW WINDOW */}
          {activePathRole === 'institution' && (
            <div>
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#EC6A5E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F4BF4F]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#61C554]" />
                  </div>
                  <span className="ml-2 font-mono text-[11px] sm:text-xs font-semibold text-slate-500">
                    atlascircle.com / campus / cohort-hub
                  </span>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-[#F3E8FF] px-3 py-1 text-[11px] font-extrabold text-[#7C3AED] border border-[#DDD6FE]">
                  <span className="h-2 w-2 rounded-full bg-[#7C3AED]" />
                  450 Active Students
                </span>
              </div>

              {/* Sub-Tabs Bar */}
              <div className="flex items-center gap-1 border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 pt-2">
                {[
                  { id: 'dashboard', label: 'Active Cohorts' },
                  { id: 'briefs', label: 'Bootcamps' },
                  { id: 'analytics', label: 'Outcomes' },
                ].map((subTab) => (
                  <button
                    key={subTab.id}
                    type="button"
                    onClick={() => setActivePreviewTab(subTab.id as any)}
                    className={`rounded-t-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                      activePreviewTab === subTab.id
                        ? 'bg-white text-slate-900 border-t-2 border-[#7C3AED] shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {subTab.label}
                  </button>
                ))}
              </div>

              {/* Sub-Tabs Content */}
              <div className="p-4 sm:p-5 text-slate-800 min-h-[310px] bg-gradient-to-b from-white to-[#FAFCFE]">
                {/* 1. ACTIVE COHORTS */}
                {activePreviewTab === 'dashboard' && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                      <span className="font-extrabold text-[#091536] text-sm sm:text-base">Ongoing Campus Programs</span>
                      <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-black text-purple-700 border border-purple-200">
                        2 Active
                      </span>
                    </div>

                    <div className="grid gap-3">
                      {/* Program 1 */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-[#F8FAFC] p-4 border border-slate-200/90 shadow-xs hover:border-[#7C3AED] transition-all">
                        <div>
                          <div className="text-sm font-black text-slate-900">
                            Industry AI &amp; Machine Learning Bootcamp
                          </div>
                          <div className="text-xs font-semibold text-slate-600 mt-0.5">
                            120 CS Students • Lead AI Engineer
                          </div>
                          <span className="inline-block mt-1.5 rounded-full bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold text-[#7C3AED] border border-purple-200">
                            Week 3 of 6
                          </span>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 border-slate-200/60 pt-2 sm:pt-0">
                          <button
                            type="button"
                            onClick={() => handlePreviewAction('Cohort management opened! Sign up above to review student assessment reports.')}
                            className="rounded-lg bg-[#7C3AED] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#6D28D9] transition shadow-xs"
                          >
                            Manage
                          </button>
                        </div>
                      </div>

                      {/* Program 2 */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-[#F8FAFC] p-4 border border-slate-200/90 shadow-xs hover:border-[#7C3AED] transition-all">
                        <div>
                          <div className="text-sm font-black text-slate-900">
                            Placement Readiness &amp; Case Interview Prep
                          </div>
                          <div className="text-xs font-semibold text-slate-600 mt-0.5">
                            280 Students • Ex-Deloitte HR Director
                          </div>
                          <span className="inline-block mt-1.5 rounded-full bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold text-[#7C3AED] border border-purple-200">
                            Starts Monday
                          </span>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 border-slate-200/60 pt-2 sm:pt-0">
                          <button
                            type="button"
                            onClick={() => handlePreviewAction('Cohort management opened! Sign up above to review student assessment reports.')}
                            className="rounded-lg bg-[#7C3AED] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#6D28D9] transition shadow-xs"
                          >
                            Manage
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status Bar */}
                    <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] px-4 py-2.5 border border-slate-200/80 text-xs font-semibold text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4 text-purple-500" />
                        <span>Campus placement boost: <strong>+40% avg</strong></span>
                      </span>
                      <span className="text-[#7C3AED] font-bold">Digital Verified Certs</span>
                    </div>
                  </div>
                )}

                {/* 2. BOOTCAMPS */}
                {activePreviewTab === 'briefs' && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                      <span className="font-extrabold text-[#091536] text-sm">Turnkey Masterclass Offerings</span>
                      <span className="text-xs font-bold text-[#7C3AED]">Ready For Next Semester</span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="rounded-xl bg-[#F8FAFC] p-3.5 border border-slate-200/90">
                        <div className="text-xs font-black text-slate-900">Full-Stack GenAI &amp; Agentic Systems (60 Hours)</div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          Hands-on capstone evaluated directly by FAANG engineering managers. Mapped to AICTE credit requirements.
                        </p>
                      </div>

                      <div className="rounded-xl bg-[#F8FAFC] p-3.5 border border-slate-200/90">
                        <div className="text-xs font-black text-slate-900">Investment Banking &amp; Financial Valuation (30 Hours)</div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          Real corporate M&amp;A models and pitchbook modeling instructed by Big-4 advisory leaders.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePreviewAction('Bootcamp catalog selected! Sign up above to request tailored syllabi and institutional pricing.')}
                      className="w-full rounded-xl bg-[#7C3AED] py-2.5 text-xs font-black text-white hover:bg-[#6D28D9] transition shadow-xs"
                    >
                      Request Syllabi &amp; Deploy to Next Semester
                    </button>
                  </div>
                )}

                {/* 3. OUTCOMES */}
                {activePreviewTab === 'analytics' && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                      <span className="font-extrabold text-[#091536] text-sm">Graduate Placement &amp; Skill Outcomes</span>
                      <span className="text-xs font-bold text-[#7C3AED]">Accredited Badges</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                      <div className="rounded-xl bg-[#F8FAFC] p-3 border border-slate-200/90">
                        <div className="text-xl font-black text-[#7C3AED]">94.2%</div>
                        <div className="text-[10px] font-bold text-slate-600 mt-0.5">Placement Rate</div>
                      </div>
                      <div className="rounded-xl bg-[#F8FAFC] p-3 border border-slate-200/90">
                        <div className="text-xl font-black text-emerald-600">450+</div>
                        <div className="text-[10px] font-bold text-slate-600 mt-0.5">Verified Certs</div>
                      </div>
                      <div className="rounded-xl bg-[#F8FAFC] p-3 border border-slate-200/90">
                        <div className="text-xl font-black text-blue-600">38+</div>
                        <div className="text-[10px] font-bold text-slate-600 mt-0.5">Hiring Partners</div>
                      </div>
                      <div className="rounded-xl bg-[#F8FAFC] p-3 border border-slate-200/90">
                        <div className="text-xl font-black text-amber-600">₹ 8.4 LPA</div>
                        <div className="text-[10px] font-bold text-slate-600 mt-0.5">Avg Starting CTC</div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-purple-50/80 p-3.5 border border-purple-200 text-xs text-purple-900">
                      <div className="font-bold">Enterprise Recruiter Connect</div>
                      <p className="mt-1 text-[11px] text-purple-800">
                        Students completing AtlasCircle cohorts receive tamper-proof digital verified credentials recognized by 40+ multinational corporate hiring partners.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white font-sans text-[#111111] antialiased selection:bg-[#1677FF] selection:text-white">
      {/* ORIGINAL HERO BACKDROP ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[850px] overflow-hidden bg-[#FBFAF7] sm:h-[800px] lg:h-[760px]" aria-hidden="true">
        <HeroBackdrop />
      </div>

      {/* TOP HEADER ATTACHED TO PAGE */}
      <header className="relative z-40 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex items-center justify-between">
        {/* Left Logo */}
        <button
          type="button"
          aria-label="Go to AtlasCircle home"
          className="atlas-focus group flex shrink-0 items-center text-left transition-transform duration-300 hover:scale-105"
          onClick={() => router.push('/')}
        >
          <img
            src="/logo/atlas-logo.png"
            alt="AtlasCircle Logo"
            className="h-28 w-auto object-contain"
          />
        </button>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="atlas-focus rounded-xl px-4 py-2 text-xs sm:text-sm font-bold text-[#526179] transition hover:bg-[#EEF7FF] hover:text-[#176BFF]"
          >
            Sign in
          </button>
          <LandingButton
            type="button"
            onClick={() => router.push('/login')}
            size="sm"
            variant="secondary"
          >
            Login
          </LandingButton>
        </div>
      </header>

      {/* HERO / SEARCH & STATS SECTION */}
      <section id="hero-search" className="relative space-y-8 pb-2 sm:pt-4 lg:pt-4">
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            {/* Left Hero Column */}  
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="max-w-[640px] space-y-5 text-left"
            >
              <span className="inline-flex rounded-full bg-[#EAF4FF] px-3.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#2584FF] shadow-sm">
                AI-powered marketplace
              </span>

              <h1 className="atlas-display text-[32px] font-extrabold leading-[1.12] text-[#081536] min-[380px]:text-[34px] sm:text-[42px] lg:text-[46px] xl:text-[50px]">
                Expert Trainers.{' '}
                <motion.span
                  initial={{ opacity: 0, scale: 0.92, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: 0.2 }}
                  className="relative inline-block rounded-full bg-[#95F2D8] -ml-2.5 px-3 py-0 sm:-ml-3.5 sm:px-4 sm:py-0.5 text-[#082733] whitespace-nowrap overflow-hidden align-baseline shadow-[0_4px_20px_rgba(149,242,216,0.45)]"
                >
                  {/* Light sweep shimmer effect */}
                  <motion.span
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                  />
                  <span className="relative z-10">Stronger Teams.</span>
                </motion.span>{' '}
                Greater Impact.
              </h1>

              <p className="max-w-xl text-[14px] font-medium leading-6 text-[#5A6680] sm:text-[16px] sm:leading-7">
                AtlasCircle is where organizations and professionals come together to learn, share and grow.
              </p>

              {/* SEARCH BOX COMPONENT */}
              <div className="pt-2">
                <form onSubmit={handleSearchSubmit} className="relative flex w-full max-w-xl items-center">
                  <div className="relative flex w-full items-center rounded-full border border-[#DCE8F4] bg-white/95 p-2 shadow-[0_18px_50px_rgba(34,67,93,0.12)] backdrop-blur-xl transition-all hover:shadow-[0_22px_60px_rgba(34,67,93,0.16)]">
                    <div className="pl-3.5 text-[#94A3B8]">
                      <Search className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by skill, topic, or trainer name.."
                      className="w-full bg-transparent px-3 py-2.5 text-sm font-semibold text-[#081536] placeholder-[#94A3B8] focus:outline-none"
                    />
                    <LandingButton
                      type="submit"
                      variant="secondary"
                      size="md"
                      className="shrink-0 rounded-full px-7"
                    >
                      Search
                    </LandingButton>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Right Hero Stats Badges */}
            <div className="relative mx-auto grid w-full max-w-[520px] grid-cols-3 overflow-hidden rounded-[18px] border border-[#E1E9F2] bg-white/90 p-2 shadow-[0_14px_34px_rgba(28,57,96,0.10)] sm:block sm:min-h-[390px] sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none lg:min-h-[455px]">
              <div className="absolute inset-x-8 bottom-8 top-10 hidden rounded-[40px] bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.76),rgba(232,248,255,0.24)_45%,transparent_70%)] sm:block" />

              {/* Stat Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4 }}
                className="relative w-full border-r border-[#E5EAF1] bg-transparent p-2 text-left sm:absolute sm:left-8 sm:top-4 sm:w-[178px] sm:rounded-[18px] sm:border sm:border-[#E7EDF5] sm:bg-white sm:p-4 sm:shadow-[0_24px_60px_rgba(28,57,96,0.14)] lg:left-2"
              >
                <div className="min-h-6 text-[8px] font-bold leading-3 text-[#58647C] sm:min-h-0 sm:text-[11px]">Match Accuracy</div>
                <div className="atlas-display mt-1.5 text-[22px] font-black text-[#0A1638] sm:mt-4 sm:text-4xl">98%</div>
                <svg viewBox="0 0 150 54" className="mt-3 hidden h-14 w-full sm:block" role="img" aria-label="Match accuracy trend">
                  <motion.path
                    d="M4 42 C22 39 31 35 43 26 C57 15 65 17 78 18 C95 20 98 8 112 6 C126 4 134 5 146 0"
                    fill="none"
                    stroke="#26C88D"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.25, delay: 0.35, ease: 'easeOut' }}
                  />
                </svg>
                <div className="mt-2 text-[8px] font-bold text-[#15977E] sm:mt-3 sm:text-[10px]">Industry leading</div>
              </motion.div>

              {/* Stat Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, delay: 0.06 }}
                className="relative w-full border-r border-[#E5EAF1] bg-transparent p-2 text-left sm:absolute sm:right-8 sm:top-9 sm:w-[170px] sm:rounded-[18px] sm:border sm:border-[#E7EDF5] sm:bg-white sm:p-4 sm:shadow-[0_24px_60px_rgba(28,57,96,0.14)] lg:right-2"
              >
                <div className="min-h-6 text-[8px] font-bold leading-3 text-[#58647C] sm:min-h-0 sm:text-[11px]">Workshops Managed</div>
                <div className="atlas-display mt-1.5 text-[22px] font-black text-[#0A1638] sm:mt-4 sm:text-4xl">
                  1.2K<span className="text-[#13CBAF]">+</span>
                </div>
                <div className="mt-7 hidden h-10 items-end gap-3 sm:flex">
                  {[18, 28, 21, 36, 44, 30, 50].map((height, index) => (
                    <motion.span
                      key={index}
                      className="w-1.5 origin-bottom rounded-full bg-[#2A83FF]"
                      style={{ height }}
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{ duration: 0.38, delay: 0.3 + index * 0.08, ease: 'easeOut' }}
                    />
                  ))}
                </div>
                <div className="mt-2 text-[8px] font-bold text-[#176BFF] sm:hidden">1,200+ delivered</div>
              </motion.div>

              {/* Stat Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="relative w-full bg-transparent p-2 text-left sm:absolute sm:bottom-4 sm:left-[calc(50%_-_85px)] sm:w-[170px] sm:rounded-[18px] sm:border sm:border-[#E7EDF5] sm:bg-white sm:p-4 sm:shadow-[0_24px_60px_rgba(28,57,96,0.14)] lg:bottom-12"
              >
                <div className="min-h-6 text-[8px] font-bold leading-3 text-[#58647C] sm:min-h-0 sm:text-[11px]">Active Trainers</div>
                <div className="atlas-display mt-1.5 text-[22px] font-black text-[#0A1638] sm:mt-3 sm:text-4xl">
                  24K<span className="text-[#13CBAF]">+</span>
                </div>
                <svg viewBox="0 0 150 42" className="mt-3 hidden h-10 w-full sm:block" role="img" aria-label="Active trainers trend">
                  <motion.path
                    d="M5 31 L24 35 L43 23 L61 28 L80 17 L99 22 L119 10 L143 15"
                    fill="none"
                    stroke="#26C88D"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.55, ease: 'easeOut' }}
                  />
                </svg>
                <div className="mt-2 text-[8px] font-black text-[#1FC88F] sm:text-[10px]">+18% this month</div>
              </motion.div>
            </div>
          </div>

          {/* Highlights Row */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-10 mt-8 grid grid-cols-2 gap-2 overflow-hidden rounded-[18px] bg-white/88 p-2 shadow-[0_18px_42px_rgba(43,74,111,0.09)] backdrop-blur-xl sm:mt-10 sm:rounded-[22px] lg:grid-cols-[1.45fr_repeat(4,1fr)] lg:shadow-[0_22px_55px_rgba(43,74,111,0.11)]"
          >
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ duration: 0.42, delay: 0.42, ease: 'easeOut' }}
              className="relative col-span-2 flex min-w-0 items-center gap-3 rounded-[14px] bg-[linear-gradient(135deg,#F7FBFF,#FFFFFF)] px-3 py-3 shadow-[0_8px_20px_rgba(43,74,111,0.05)] sm:gap-4 sm:px-4 sm:py-3.5 lg:col-span-1 lg:rounded-[16px]"
            >
              <div className="flex shrink-0 -space-x-3">
                {testimonials.map((item) => (
                  <img key={item.id} src={item.avatar} alt={item.name} className="h-10 w-10 rounded-full border-2 border-white object-cover" />
                ))}
                <motion.span
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#EAF4FF] text-[10px] font-black text-[#2584FF] shadow-sm"
                >
                  +5k
                </motion.span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black text-[#122044]">Active users 5,000+</div>
                <div className="text-[10px] font-semibold text-[#6A7690]">Join thousands growing faster with AtlasCircle.</div>
              </div>
            </motion.div>

            {[
              { icon: Sparkles, title: 'AI-powered matches', detail: 'Find the perfect fit', color: 'text-[#11C7B7] bg-[#E8FFFB]' },
              { icon: ShieldCheck, title: 'Enterprise secure', detail: 'Data you can trust', color: 'text-[#287BFF] bg-[#EEF5FF]' },
              { icon: Award, title: 'Verified experts', detail: 'Top 1% facilitators', color: 'text-[#287BFF] bg-[#EEF5FF]' },
              { icon: Zap, title: 'End-to-end support', detail: 'From brief to success', color: 'text-[#FFB000] bg-[#FFF8DB]' }
            ].map(({ icon: Icon, title, detail, color }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, scale: 1.02, backgroundColor: '#FFFFFF' }}
                transition={{ duration: 0.38, delay: 0.48 + index * 0.09, ease: 'easeOut' }}
                className="group flex min-w-0 items-center gap-2 rounded-[14px] bg-[#F9FCFF] px-2.5 py-3 shadow-[0_8px_20px_rgba(43,74,111,0.04)] sm:gap-3 sm:px-3 sm:py-3.5 lg:rounded-[16px]"
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${color}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[9px] font-black leading-3 text-[#122044] sm:text-[10px]">{title}</span>
                  <span className="mt-0.5 block text-[9px] font-semibold text-[#6A7690]">{detail}</span>
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* JOIN ATLASCIRCLE TODAY TABBED ROLE SECTION */}
      <section id="choose-path" className="relative pt-8 pb-14 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#FBFAF7] via-[#F4F8FC] to-[#EEF5FF]">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="JOIN ATLASCIRCLE TODAY"
            title="Choose your path to get started"
            description="Select your role below to explore tailored features, live AI matches, and specialized management tools."
          />

          {/* MAIN ROLE TABS BAR */}
          <div className="mt-8 sm:mt-10 flex justify-center">
            <div className="inline-flex max-w-full overflow-x-auto rounded-2xl border border-[#DCE8F4] bg-white p-1.5 shadow-sm">
              {[
                {
                  id: 'corporate',
                  label: 'Corporate & L&D',
                  role: 'For L&D Teams',
                  icon: Building2,
                  activeBg: 'bg-[#0E9F88]',
                  activeText: 'text-[#0E9F88]',
                  lightBg: 'bg-[#E8FAF5]',
                  badgeBorder: 'border-[#BDEBDD]',
                },
                {
                  id: 'trainer',
                  label: 'Facilitators & Trainers',
                  role: 'For Facilitators',
                  icon: User,
                  activeBg: 'bg-[#1677FF]',
                  activeText: 'text-[#1677FF]',
                  lightBg: 'bg-[#EEF5FF]',
                  badgeBorder: 'border-[#D0E2FF]',
                },
                {
                  id: 'institution',
                  label: 'Colleges & Institutions',
                  role: 'For Institutions',
                  icon: GraduationCap,
                  activeBg: 'bg-[#7C3AED]',
                  activeText: 'text-[#7C3AED]',
                  lightBg: 'bg-[#F3E8FF]',
                  badgeBorder: 'border-[#DDD6FE]',
                },
              ].map((tab) => {
                const isActive = activePathRole === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActivePathRole(tab.id as any);
                      setRegErrors({});
                    }}
                    className={`relative flex items-center gap-2.5 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? 'text-slate-900 shadow-md shadow-slate-200/50'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/80'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeRoleTabPill"
                        className="absolute inset-0 rounded-xl bg-white shadow-sm border border-slate-200/80"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                          isActive ? `${tab.activeBg} text-white` : 'bg-slate-100 text-slate-500'
                        } transition-colors`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{tab.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE TAB SHOWCASE CONTAINER */}
          <div className="mt-8 sm:mt-10">
            <AnimatePresence mode="wait">
              {activePathRole === 'corporate' && (
                <motion.div
                  key="corporate"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                  className="grid lg:grid-cols-12 gap-8 items-center rounded-3xl border border-[#DCE8F4] bg-white p-6 sm:p-8 shadow-[0_12px_32px_rgba(14,159,136,0.06)]"
                >
                  {/* Left Column: Concise Value & CTAs */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#BDEBDD] bg-[#E8FAF5] px-3 py-1 text-xs font-black uppercase tracking-wider text-[#0E8D76]">
                      <Building2 className="h-3.5 w-3.5" />
                      <span>For L&amp;D &amp; HR Teams</span>
                    </div>

                    <div>
                      <h3 className="atlas-display text-2xl sm:text-3xl font-black text-[#081536] leading-tight">
                        Source Verified Corporate Trainers in 24 Hours
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#5A6680] font-medium">
                        Post your brief in 2 minutes. AtlasCircle AI matches verified domain experts with transparent pricing and milestone guarantees.
                      </p>
                    </div>

                    <div className="space-y-2.5 border-y border-[#F0F5FA] py-4">
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#334155]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0E9F88]" />
                        <span>Access top 1% verified corporate facilitators</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#334155]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0E9F88]" />
                        <span>Post custom briefs &amp; receive proposals</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#334155]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0E9F88]" />
                        <span>AI matchmaking with peer reviews</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={scrollToPlatformPreview}
                          className="inline-flex items-center gap-2 rounded-xl bg-[#0E9F88] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#0E9F88]/20 transition-all hover:bg-[#0C8B77] active:scale-98"
                        >
                          <Zap className="h-4 w-4" />
                          <span>View Platform Preview</span>
                        </button>
                        <button
                          type="button"
                          onClick={scrollToRegisterForm}
                          className="inline-flex items-center gap-2 rounded-xl border border-[#0E9F88] bg-[#F4FBF9] px-4 py-3 text-xs sm:text-sm font-bold text-[#0E8D76] transition-all hover:bg-[#E8FAF5]"
                        >
                          <span>Register Organization</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-[#0E9F88] shrink-0" />
                        <span>Direct enterprise briefs • Instant AI matching • Zero platform commission</span>
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Register Form */}
                  <div className="lg:col-span-7">
                    {renderRegisterForm()}
                  </div>
                </motion.div>
              )}

              {activePathRole === 'trainer' && (
                <motion.div
                  key="trainer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                  className="grid lg:grid-cols-12 gap-8 items-center rounded-3xl border border-[#DCE8F4] bg-white p-6 sm:p-8 shadow-[0_12px_32px_rgba(22,119,255,0.06)]"
                >
                  {/* Left Column: Details & CTAs */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#D0E2FF] bg-[#EEF5FF] px-3 py-1 text-xs font-black uppercase tracking-wider text-[#1677FF]">
                      <User className="h-3.5 w-3.5" />
                      <span>For Trainers &amp; Facilitators</span>
                    </div>

                    <div>
                      <h3 className="atlas-display text-2xl sm:text-3xl font-black text-[#081536] leading-tight">
                        High-Paying Corporate Briefs Direct to You
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#5A6680] font-medium">
                        Connect directly with enterprise L&amp;D buyers looking for your expertise. Keep 100% of your commercial fees without agency cuts.
                      </p>
                    </div>

                    <div className="space-y-2.5 border-y border-[#F0F5FA] py-4">
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#334155]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1677FF]" />
                        <span>Verified expert profile showcasing outcomes</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#334155]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1677FF]" />
                        <span>Matched to training briefs aligned with skills</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#334155]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1677FF]" />
                        <span>Full control over availability, mode &amp; rates</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={scrollToPlatformPreview}
                          className="inline-flex items-center gap-2 rounded-xl bg-[#1677FF] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#1677FF]/20 transition-all hover:bg-[#1562D6] active:scale-98"
                        >
                          <Zap className="h-4 w-4" />
                          <span>View Portal Preview</span>
                        </button>
                        <button
                          type="button"
                          onClick={scrollToRegisterForm}
                          className="inline-flex items-center gap-2 rounded-xl border border-[#1677FF] bg-[#F4F8FF] px-4 py-3 text-xs sm:text-sm font-bold text-[#1677FF] transition-all hover:bg-[#EEF5FF]"
                        >
                          <span>Fill Trainer Form</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-[#1677FF] shrink-0" />
                        <span>Verified expert credentials • Fast-track approval • Keep 100% of fees</span>
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Register Form */}
                  <div className="lg:col-span-7">
                    {renderRegisterForm()}
                  </div>
                </motion.div>
              )}

              {activePathRole === 'institution' && (
                <motion.div
                  key="institution"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                  className="grid lg:grid-cols-12 gap-8 items-center rounded-3xl border border-[#DCE8F4] bg-white p-6 sm:p-8 shadow-[0_12px_32px_rgba(124,58,237,0.06)]"
                >
                  {/* Left Column: Details & CTAs */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD6FE] bg-[#F3E8FF] px-3 py-1 text-xs font-black uppercase tracking-wider text-[#6D28D9]">
                      <GraduationCap className="h-3.5 w-3.5" />
                      <span>For Colleges &amp; Academies</span>
                    </div>

                    <div>
                      <h3 className="atlas-display text-2xl sm:text-3xl font-black text-[#081536] leading-tight">
                        Industry-Led Masterclasses for Your Students
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#5A6680] font-medium">
                        Bring active tech leaders and CXOs to campus for guest lectures, faculty development, and placement bootcamps.
                      </p>
                    </div>

                    <div className="space-y-2.5 border-y border-[#F0F5FA] py-4">
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#334155]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#7C3AED]" />
                        <span>Bulk faculty &amp; student cohort training</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#334155]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#7C3AED]" />
                        <span>Connect with accredited industry experts</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#334155]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#7C3AED]" />
                        <span>Institutional dashboard &amp; certifications</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={scrollToPlatformPreview}
                          className="inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#7C3AED]/20 transition-all hover:bg-[#6D28D9] active:scale-98"
                        >
                          <Zap className="h-4 w-4" />
                          <span>View Campus Preview</span>
                        </button>
                        <button
                          type="button"
                          onClick={scrollToRegisterForm}
                          className="inline-flex items-center gap-2 rounded-xl border border-[#7C3AED] bg-[#FAF5FF] px-4 py-3 text-xs sm:text-sm font-bold text-[#7C3AED] transition-all hover:bg-[#F3E8FF]"
                        >
                          <span>Fill Campus Form</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-[#7C3AED] shrink-0" />
                        <span>Bulk cohort pricing • Tailored syllabi • Accredited badges</span>
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Register Form */}
                  <div className="lg:col-span-7">
                    {renderRegisterForm()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* PLATFORM SAAS PREVIEW WINDOW DIRECTLY BENEATH PATH SELECTION */}
          {renderSaaSPreview()}


          {/* TRUSTED BY LEADING ORGANIZATIONS (Original Brand Logos) */}
          <div className="mt-24 text-center">
            <h4 className="atlas-display mb-10 text-xs font-black uppercase tracking-widest text-[#5A6680]">
              Trusted by leading organizations
            </h4>

            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14 lg:gap-16">
              {/* TATA Logo */}
              <div className="group flex items-center gap-2.5 transition-transform duration-300 hover:scale-105">
                <svg viewBox="0 0 120 40" className="h-8 w-auto fill-current text-[#004B87]" aria-label="TATA">
                  <path d="M12 8 C 4 8 0 16 0 20 C 0 24 4 32 12 32 C 20 32 24 24 24 20 C 24 16 20 8 12 8 Z M 12 12 C 16 12 19 16 19 20 C 19 24 16 28 12 28 C 8 28 5 24 5 20 C 5 16 8 12 12 12 Z" fill="#004B87" />
                  <path d="M8 17 L16 17 M12 17 L12 25" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                  <text x="32" y="26" fontFamily="sans-serif" fontSize="20" fontWeight="900" fill="#0A2540" letterSpacing="2">TATA</text>
                </svg>
              </div>

              {/* Infosys Logo */}
              <div className="group transition-transform duration-300 hover:scale-105">
                <svg viewBox="0 0 120 32" className="h-7 w-auto" aria-label="Infosys">
                  <text x="0" y="24" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fontStyle="italic" fill="#007CC3" letterSpacing="-0.5">Infosys</text>
                </svg>
              </div>

              {/* Wipro Logo */}
              <div className="group flex items-center gap-2 transition-transform duration-300 hover:scale-105">
                <svg viewBox="0 0 32 32" className="h-7 w-7" aria-label="Wipro Symbol">
                  <circle cx="16" cy="6" r="3.5" fill="#E84A5F" />
                  <circle cx="23" cy="9" r="3.5" fill="#FF847C" />
                  <circle cx="26" cy="16" r="3.5" fill="#FECEAB" />
                  <circle cx="23" cy="23" r="3.5" fill="#99B898" />
                  <circle cx="16" cy="26" r="3.5" fill="#2A363B" />
                  <circle cx="9" cy="23" r="3.5" fill="#008080" />
                  <circle cx="6" cy="16" r="3.5" fill="#007CC3" />
                  <circle cx="9" cy="9" r="3.5" fill="#6C5CE7" />
                </svg>
                <span className="text-xl font-bold lowercase text-[#0A2540] tracking-tight">wipro</span>
              </div>

              {/* HDFC BANK Logo */}
              <div className="group flex items-center gap-2 transition-transform duration-300 hover:scale-105">
                <div className="flex h-7 w-7 items-center justify-center bg-[#004B8D] p-1 rounded-sm">
                  <div className="h-full w-full border-2 border-[#ED232A] bg-white flex items-center justify-center">
                    <div className="h-2 w-2 bg-[#004B8D]" />
                  </div>
                </div>
                <span className="text-base font-extrabold text-[#004B8D] tracking-wider">HDFC BANK</span>
              </div>

              {/* SIEMENS Logo */}
              <div className="group transition-transform duration-300 hover:scale-105">
                <span className="text-xl font-black text-[#009999] tracking-[0.25em]">SIEMENS</span>
              </div>

              {/* Deloitte. Logo */}
              <div className="group transition-transform duration-300 hover:scale-105">
                <span className="text-2xl font-black text-[#0A2540] tracking-tight">
                  Deloitte<span className="text-[#86BC25]">.</span>
                </span>
              </div>

              {/* & more */}
              <div className="text-xs font-bold text-[#64748B] hover:text-[#0A2540]">
                &amp; more
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORIGINAL DEEP NAVY FOOTER */}
      <footer className="relative overflow-hidden border-t border-[#17305B] bg-[#07132F] px-4 pb-8 pt-14 text-white sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-8 border-b border-white/12 pb-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-2xl bg-white p-3.5 shadow-md">
                  <img src="/logo/atlas-logo.webp" alt="AtlasCircle Logo" className="h-12 sm:h-14 md:h-16 w-auto object-contain" />
                </div>
              </div>
              <h2 className="mt-6 max-w-2xl text-[24px] font-extrabold leading-tight sm:text-[32px]">
                EXPERTISE MEETS OPPORTUNITY
              </h2>
            </div>
            <LandingButton
              onClick={handleCorporateSignUp}
              variant="accent"
              endIcon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              Post a Training Brief
            </LandingButton>
          </div>

          {/* BIG ATLASCIRCLE TEXT BANNER COMMENTED OUT */}
          {/*
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="overflow-hidden border-b border-white/12 py-10 text-center"
          >
            <div className="atlas-display text-[48px] font-black leading-[0.85] tracking-tight text-white sm:text-[88px] lg:text-[130px]">
              ATLASCIRCLE
            </div>
          </motion.div>
          */}

          <div className="grid gap-8 py-9 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand Intro & Socials */}
            <div className="lg:col-span-2 space-y-4">
              <p className="max-w-sm text-xs font-medium leading-relaxed text-[#AAB7D0]">
                A curated marketplace of expert corporate trainers and facilitators empowering organizations to learn, share and grow.
              </p>
              <div className="flex items-center gap-2.5 pt-2">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-colors hover:border-white hover:text-white">
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-colors hover:border-white hover:text-white">
                  <Twitter className="h-3.5 w-3.5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-colors hover:border-white hover:text-white">
                  <Facebook className="h-3.5 w-3.5" />
                </a>
                <a href="/" aria-label="Website" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-colors hover:border-white hover:text-white">
                  <Globe className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Link Columns */}
            <div>
              <div className="mb-3 text-[10px] font-black uppercase text-[#7EE7D0]">For Corporates</div>
              <div className="flex flex-col items-start gap-2 text-xs font-semibold text-[#DCE5F5]">
                <button onClick={() => router.push('/experts')} className="transition-colors hover:text-[#31E6B1]">Find Trainers</button>
                <button onClick={handleCorporateSignUp} className="transition-colors hover:text-[#31E6B1]">Post a Training Brief</button>
                <button onClick={() => router.push('/requirements')} className="transition-colors hover:text-[#31E6B1]">My Requirements</button>
                <button onClick={() => router.push('/engagements')} className="transition-colors hover:text-[#31E6B1]">Workshops &amp; Engagements</button>
              </div>
            </div>

            <div>
              <div className="mb-3 text-[10px] font-black uppercase text-[#7EE7D0]">For Trainers</div>
              <div className="flex flex-col items-start gap-2 text-xs font-semibold text-[#DCE5F5]">
                <button onClick={handleTrainerSignUp} className="transition-colors hover:text-[#31E6B1]">Join as Verified Trainer</button>
                <button onClick={() => router.push('/trainer-portal')} className="transition-colors hover:text-[#31E6B1]">Trainer Portal</button>
                <button onClick={() => router.push('/trainer-registration')} className="transition-colors hover:text-[#31E6B1]">Trainer Verification</button>
                <button onClick={() => router.push('/login')} className="transition-colors hover:text-[#31E6B1]">Account Sign In</button>
              </div>
            </div>

            <div>
              <div className="mb-3 text-[10px] font-black uppercase text-[#7EE7D0]">Platform &amp; Tools</div>
              <div className="flex flex-col items-start gap-2 text-xs font-semibold text-[#DCE5F5]">
                <button onClick={() => router.push('/shortlist')} className="transition-colors hover:text-[#31E6B1]">Shortlist &amp; Bookings</button>
                <button onClick={() => router.push('/reports')} className="transition-colors hover:text-[#31E6B1]">Reports &amp; Analytics</button>
                <button onClick={() => router.push('/settings')} className="transition-colors hover:text-[#31E6B1]">Account Settings</button>
                <button onClick={() => router.push('/')} className="transition-colors hover:text-[#31E6B1]">Home Overview</button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/12 pt-6 text-[11px] font-medium text-[#8290AA] sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 AtlasCircle. Corporate Trainer &amp; Facilitator Platform. All rights reserved.</p>
            <div className="flex flex-wrap gap-5">
              <button onClick={() => router.push('/terms')} className="transition-colors hover:text-white">Terms</button>
              <button onClick={() => router.push('/privacy')} className="transition-colors hover:text-white">Privacy</button>
              <button onClick={() => router.push('/settings')} className="transition-colors hover:text-white">Settings</button>
            </div>
          </div>
        </div>
      </footer>

      {/* EMAIL VERIFICATION MODAL FOR EMBEDDED FORM */}
      {showRegModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07132F]/60 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-md overflow-hidden rounded-[24px] border border-white bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF5FF] text-[#1677FF] mb-4">
              <Mail className="h-6 w-6 stroke-[2]" />
            </div>

            <h3 className="atlas-display text-xl font-black text-[#091536]">Verify Your Email Address</h3>
            <p className="mt-1 text-xs font-medium text-[#5A6680]">
              We have sent a verification code to <span className="font-bold text-[#091536]">{regEmail}</span>. Please verify to complete your sign up.
            </p>

            <div className="my-4 rounded-xl bg-[#F4F8FC] p-3 border border-[#DCE8F4] text-xs font-medium text-[#334155]">
              <span className="font-bold text-[#1677FF]">Demo Verification OTP:</span> Enter code <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#CBD5E1]">1234</span> or click Auto-Verify below.
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  4-Digit Verification Code
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={regOtpCode}
                  onChange={(e) => setRegOtpCode(e.target.value)}
                  placeholder="1234"
                  className="w-full rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-center font-mono text-lg font-bold tracking-widest text-[#091536] focus:border-[#1677FF] focus:outline-none"
                />
              </div>

              {regOtpError && (
                <p className="text-xs font-semibold text-[#C62E40]">{regOtpError}</p>
              )}

              <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                <button
                  type="button"
                  disabled={regIsVerifying}
                  onClick={() => handleConfirmRegVerification('AUTO_VERIFY')}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#31E6B1] px-4 py-3 text-xs font-black text-[#071B2F] shadow-md transition hover:bg-[#55EFC1]"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Auto-Verify &amp; Proceed
                </button>
                <button
                  type="button"
                  disabled={regIsVerifying}
                  onClick={() => handleConfirmRegVerification()}
                  className="inline-flex items-center justify-center rounded-xl bg-[#1677FF] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#1562D6]"
                >
                  Verify Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
