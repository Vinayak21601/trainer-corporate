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
  FileText
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onExploreExperts) {
      onExploreExperts(undefined, searchQuery || undefined, undefined);
    } else {
      router.push(searchQuery ? `/experts?search=${encodeURIComponent(searchQuery)}` : '/experts');
    }
  };

  const handleTrainerSignUp = () => {
    router.push('/register?role=trainer');
  };

  const handleTrainerSignIn = () => {
    router.push('/login?role=trainer');
  };

  const handleCorporateSignUp = () => {
    router.push('/register?role=organization');
  };

  const handleCorporateSignIn = () => {
    router.push('/login?role=corporate');
  };

  const navItems = [
    { id: 'choose-path', label: 'Get Started', action: () => document.getElementById('choose-path')?.scrollIntoView({ behavior: 'smooth' }) },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white font-sans text-[#111111] antialiased selection:bg-[#1677FF] selection:text-white">
      {/* ORIGINAL HERO BACKDROP ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[850px] overflow-hidden bg-[#FBFAF7] sm:h-[800px] lg:h-[760px]" aria-hidden="true">
        <HeroBackdrop />
      </div>

      {/* FLOATING GLASS NAVBAR */}
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-40 w-full bg-transparent px-3 py-3 sm:px-6 sm:py-4 lg:px-8"
      >
        <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-full border border-[#DCE8F4] bg-white/85 px-3 py-2.5 shadow-[0_16px_44px_rgba(34,67,93,0.10)] backdrop-blur-2xl sm:gap-4 sm:px-5 sm:py-3" style={{ WebkitBackdropFilter: 'blur(24px) saturate(180%)' }}>
          {/* Logo */}
          <button type="button" aria-label="Go to Atlas home" className="atlas-focus group flex shrink-0 items-center gap-2 rounded-xl text-left" onClick={() => router.push('/')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#18BFA5] text-xs font-black text-white shadow-[0_10px_24px_rgba(49,151,242,0.18)] transition-all duration-300 group-hover:scale-105 sm:h-9 sm:w-9 sm:text-sm">
              A
            </div>
            <div className="flex flex-col">
              <span className="atlas-display text-sm font-black text-[#091536] sm:text-base leading-none">Atlas</span>
              <span className="text-[9px] font-bold text-[#64748B] tracking-tight">Learn. Connect. Grow.</span>
            </div>
          </button>

          {/* Nav Links */}
          <div className="hidden items-center gap-1 rounded-full bg-white/65 p-1 text-[13px] font-semibold text-[#4D5B73] md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={item.action}
                className="rounded-full px-3 py-2 transition-all hover:bg-[#EEF7FF] hover:text-[#1677FF]"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button onClick={() => router.push('/login')} className="atlas-focus hidden rounded-lg px-3 py-2 text-xs font-black text-[#526179] transition hover:bg-[#EEF7FF] hover:text-[#176BFF] sm:inline-flex">
              Sign in
            </button>
            <LandingButton onClick={() => router.push('/login')} size="sm" variant="secondary" className="hidden md:inline-flex">
              Login
            </LandingButton>
            <button
              type="button"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="atlas-focus flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF7FF] text-[#17365D] transition hover:bg-[#DFF0FF] hover:text-[#176BFF] md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          {/* Mobile Drawer */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute left-0 right-0 top-[calc(100%+10px)] overflow-hidden rounded-[20px] border border-[#DCE8F4] bg-white/96 p-3 shadow-[0_22px_55px_rgba(34,67,93,0.16)] backdrop-blur-2xl md:hidden"
              >
                <nav className="grid gap-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        item.action();
                      }}
                      className="atlas-focus flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-black text-[#34445D] transition hover:bg-[#EEF7FF] hover:text-[#1677FF]"
                    >
                      {item.label}<ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </nav>

                <div className="my-2 h-px bg-[#E7EEF5]" />
                <div className="grid gap-2">
                  <button onClick={() => { setIsMobileMenuOpen(false); router.push('/login'); }} className="atlas-focus flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-black text-[#526179] transition hover:bg-[#F3F7FB]">
                    <LogIn className="h-4 w-4 text-[#176BFF]" />Sign in
                  </button>
                  <button onClick={() => { setIsMobileMenuOpen(false); router.push('/register?role=trainer'); }} className="atlas-focus flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-black text-[#526179] transition hover:bg-[#F3F7FB]">
                    <UserPlus className="h-4 w-4 text-[#11BFA5]" />Join as Trainer
                  </button>
                  <button onClick={() => { setIsMobileMenuOpen(false); handleCorporateSignUp(); }} className="atlas-focus flex items-center gap-2 rounded-xl bg-[#0D3270] px-3 py-2.5 text-left text-xs font-black text-white transition hover:bg-[#176BFF]">
                    <FileText className="h-4 w-4" />Post a Training Brief
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* HERO SECTION */}
      <section id="hero-search" className="relative space-y-8 pt-4 sm:pt-7 lg:pt-9">
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
                <span className="box-decoration-clone rounded-xl bg-[#95F2D8] px-2 py-0.5 text-[#082733] sm:inline-block sm:rounded-full sm:px-4 sm:py-1 sm:whitespace-nowrap">
                  Stronger Teams.
                </span>{' '}
                Greater Impact.
              </h1>

              <p className="max-w-xl text-[14px] font-medium leading-6 text-[#5A6680] sm:text-[16px] sm:leading-7">
                Atlas is where organizations and professionals come together to learn, share and grow.
              </p>

              {/* SEARCH BOX COMPONENT (Original UI Glass styling) */}
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

            {/* Right Hero Stats Badges (Original UI design) */}
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
                <div className="text-[10px] font-semibold text-[#6A7690]">Join thousands growing faster with Atlas.</div>
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

      {/* JOIN ATLAS TODAY DUAL ROLE SECTION (Ultra-Premium Redesign) */}
      <section id="choose-path" className="relative py-20 sm:py-24 lg:py-28 overflow-hidden bg-gradient-to-b from-[#FBFAF7] via-[#F4F8FC] to-[#EEF5FF]">
        {/* Subtle decorative background glow spheres */}
        <div className="pointer-events-none absolute left-1/4 top-10 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 bottom-10 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="JOIN ATLAS TODAY"
            title="Choose your path to get started"
            description="Select whether you are a corporate L&D leader looking for facilitators or an expert trainer ready to grow your enterprise practice."
          />

          <div className="relative mt-14 flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:justify-center">
            {/* Trainer Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative flex w-full flex-1 flex-col justify-between overflow-hidden rounded-[28px] border border-[#DCE8F4] bg-white/95 p-8 shadow-[0_20px_50px_rgba(34,67,93,0.08)] backdrop-blur-2xl transition-all duration-300 hover:border-[#1677FF]/60 hover:shadow-[0_30px_70px_rgba(22,119,255,0.18)] sm:p-10"
            >
              {/* Card top glow bar */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#1677FF] via-[#2584FF] to-[#60A5FA] opacity-90" />

              <div>
                <div className="flex items-center justify-between">
                  {/* Icon Container */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1677FF] to-[#2584FF] text-white shadow-lg shadow-[#1677FF]/25 transition-transform duration-300 group-hover:scale-105">
                    <User className="h-8 w-8 stroke-[2]" />
                  </div>
                  <span className="rounded-full border border-[#D0E2FF] bg-[#EEF5FF] px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#1677FF]">
                    For Facilitators
                  </span>
                </div>

                <h3 className="atlas-display mt-6 text-2xl font-black text-[#081536] sm:text-3xl">
                  Trainer
                </h3>

                <p className="mt-2 text-sm font-semibold text-[#5A6680]">
                  Share your knowledge. Empower organizations.
                </p>

                {/* Feature Bullet Points */}
                <div className="my-7 space-y-3 border-t border-b border-[#F0F5FA] py-5">
                  <div className="flex items-start gap-3 text-xs font-semibold text-[#334155]">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EEF5FF] text-[#1677FF] mt-0.5">
                      <Sparkles className="h-3 w-3" />
                    </div>
                    <span>Create a verified expert profile showcasing client outcomes</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs font-semibold text-[#334155]">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EEF5FF] text-[#1677FF] mt-0.5">
                      <Sparkles className="h-3 w-3" />
                    </div>
                    <span>Get matched to corporate training briefs aligned with your skills</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs font-semibold text-[#334155]">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EEF5FF] text-[#1677FF] mt-0.5">
                      <Sparkles className="h-3 w-3" />
                    </div>
                    <span>Full control over your availability, delivery mode &amp; rates</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={handleTrainerSignUp}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1677FF] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#1677FF]/25 transition-all hover:bg-[#1562D6] active:scale-98"
                >
                  <span>Sign Up</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleTrainerSignIn}
                  className="w-full sm:w-32 inline-flex items-center justify-center rounded-xl border border-[#1677FF] bg-white px-6 py-3 text-sm font-bold text-[#1677FF] transition-all hover:bg-[#EEF5FF] active:scale-98"
                >
                 Log In
                </button>
              </div>
            </motion.div>

            {/* Middle OR Divider Badge */}
            <div className="relative z-10 -my-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#DCE8F4] bg-white font-black text-xs text-[#081536] shadow-[0_10px_25px_rgba(34,67,93,0.12)] lg:my-auto lg:-mx-7">
              <span className="bg-gradient-to-r from-[#1677FF] to-[#11BFA5] bg-clip-text text-transparent font-black">OR</span>
            </div>

            {/* Corporate Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative flex w-full flex-1 flex-col justify-between overflow-hidden rounded-[28px] border border-[#DCE8F4] bg-white/95 p-8 shadow-[0_20px_50px_rgba(34,67,93,0.08)] backdrop-blur-2xl transition-all duration-300 hover:border-[#11BFA5]/60 hover:shadow-[0_30px_70px_rgba(17,191,165,0.18)] sm:p-10"
            >
              {/* Card top glow bar */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#11BFA5] via-[#10B981] to-[#34D399] opacity-90" />

              <div>
                <div className="flex items-center justify-between">
                  {/* Icon Container */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#11BFA5] to-[#10B981] text-white shadow-lg shadow-[#11BFA5]/25 transition-transform duration-300 group-hover:scale-105">
                    <Building2 className="h-8 w-8 stroke-[2]" />
                  </div>
                  <span className="rounded-full border border-[#BDEBDD] bg-[#E8FAF5] px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#0E8D76]">
                    For L&amp;D Teams
                  </span>
                </div>

                <h3 className="atlas-display mt-6 text-2xl font-black text-[#081536] sm:text-3xl">
                  Corporate
                </h3>

                <p className="mt-2 text-sm font-semibold text-[#5A6680]">
                  Find the right trainers. Drive real results.
                </p>

                {/* Feature Bullet Points */}
                <div className="my-7 space-y-3 border-t border-b border-[#F0F5FA] py-5">
                  <div className="flex items-start gap-3 text-xs font-semibold text-[#334155]">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8FAF5] text-[#11BFA5] mt-0.5">
                      <Sparkles className="h-3 w-3" />
                    </div>
                    <span>Access top 1% verified corporate facilitators &amp; experts</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs font-semibold text-[#334155]">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8FAF5] text-[#11BFA5] mt-0.5">
                      <Sparkles className="h-3 w-3" />
                    </div>
                    <span>Post custom training briefs and receive tailored proposals</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs font-semibold text-[#334155]">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8FAF5] text-[#11BFA5] mt-0.5">
                      <Sparkles className="h-3 w-3" />
                    </div>
                    <span>AI-powered matchmaking with transparent peer reviews</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={handleCorporateSignUp}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0E9F88] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#0E9F88]/25 transition-all hover:bg-[#0C8B77] active:scale-98"
                >
                  <span>Sign Up</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCorporateSignIn}
                  className="w-full sm:w-32 inline-flex items-center justify-center rounded-xl border border-[#0E9F88] bg-white px-6 py-3 text-sm font-bold text-[#0E9F88] transition-all hover:bg-[#E8FAF5] active:scale-98"
                >
                  Log In
                </button>
              </div>
            </motion.div>
          </div>

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
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#18BFA5] text-sm font-black text-white">A</span>
                <span className="text-sm font-black uppercase text-[#7EE7D0]">Corporate learning, simplified</span>
              </div>
              <h2 className="mt-6 max-w-2xl text-[24px] font-extrabold leading-tight sm:text-[32px]">
                Build stronger teams with the right experts.
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

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="overflow-hidden border-b border-white/12 py-10 text-center"
          >
            <div className="atlas-display text-[76px] font-black leading-[0.78] text-white sm:text-[128px] lg:text-[180px]">
              ATLAS
            </div>
          </motion.div>

          <div className="grid gap-8 py-9 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand Intro & Socials */}
            <div className="lg:col-span-2 space-y-4">
              <p className="max-w-sm text-xs font-medium leading-relaxed text-[#AAB7D0]">
                A curated marketplace of expert trainers empowering organizations and professionals to learn, share and grow.
              </p>
              <div className="flex items-center gap-2.5 pt-2">
                <a href="#linkedin" aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-colors hover:border-white hover:text-white">
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
                <a href="#twitter" aria-label="Twitter" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-colors hover:border-white hover:text-white">
                  <Twitter className="h-3.5 w-3.5" />
                </a>
                <a href="#facebook" aria-label="Facebook" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-colors hover:border-white hover:text-white">
                  <Facebook className="h-3.5 w-3.5" />
                </a>
                <a href="#website" aria-label="Website" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-colors hover:border-white hover:text-white">
                  <Globe className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Link Columns */}
            <div>
              <div className="mb-3 text-[10px] font-black uppercase text-[#7EE7D0]">For Corporates</div>
              <div className="flex flex-col items-start gap-2 text-xs font-semibold text-[#DCE5F5]">
                <a href="#how-it-works" className="transition-colors hover:text-[#31E6B1]">How It Works</a>
                <button onClick={handleCorporateSignUp} className="transition-colors hover:text-[#31E6B1]">Post a Requirement</button>
                <button onClick={() => router.push('/experts')} className="transition-colors hover:text-[#31E6B1]">Find Trainers</button>
                <a href="#pricing" className="transition-colors hover:text-[#31E6B1]">Pricing</a>
                <a href="#resources" className="transition-colors hover:text-[#31E6B1]">Resources</a>
              </div>
            </div>

            <div>
              <div className="mb-3 text-[10px] font-black uppercase text-[#7EE7D0]">For Trainers</div>
              <div className="flex flex-col items-start gap-2 text-xs font-semibold text-[#DCE5F5]">
                <a href="#why-join" className="transition-colors hover:text-[#31E6B1]">Why Join Atlas</a>
                <button onClick={handleTrainerSignUp} className="transition-colors hover:text-[#31E6B1]">Create Profile</button>
                <a href="#opportunities" className="transition-colors hover:text-[#31E6B1]">Find Opportunities</a>
                <a href="#trainer-resources" className="transition-colors hover:text-[#31E6B1]">Resources</a>
                <a href="#guidelines" className="transition-colors hover:text-[#31E6B1]">Trainer Guidelines</a>
              </div>
            </div>

            <div>
              <div className="mb-3 text-[10px] font-black uppercase text-[#7EE7D0]">Company &amp; Support</div>
              <div className="flex flex-col items-start gap-2 text-xs font-semibold text-[#DCE5F5]">
                <a href="#about-us" className="transition-colors hover:text-[#31E6B1]">About Us</a>
                <a href="#careers" className="transition-colors hover:text-[#31E6B1]">Careers</a>
                <a href="#help" className="transition-colors hover:text-[#31E6B1]">Help Center</a>
                <a href="#terms" className="transition-colors hover:text-[#31E6B1]">Terms of Use</a>
                <a href="#privacy" className="transition-colors hover:text-[#31E6B1]">Privacy Policy</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/12 pt-6 text-[11px] font-medium text-[#8290AA] sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 Project Atlas. Corporate Trainer &amp; Facilitator Platform. All rights reserved.</p>
            <div className="flex flex-wrap gap-5">
              <a href="#terms" className="transition-colors hover:text-white">Terms</a>
              <a href="#privacy" className="transition-colors hover:text-white">Privacy</a>
              <a href="#security" className="transition-colors hover:text-white">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
