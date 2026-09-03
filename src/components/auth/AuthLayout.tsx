'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Building2, GraduationCap, UsersRound, Check } from 'lucide-react';
import { HeroBackdrop } from '../landing/HeroBackdrop';

interface AuthLayoutProps {
  children: ReactNode;
  mode: 'login' | 'register';
}

const metrics = [
  { icon: Building2, value: '12,500+', label: 'Organizations served', tone: 'text-[#2584FF] bg-[#EAF4FF]' },
  { icon: UsersRound, value: '25,000+', label: 'Expert trainers', tone: 'text-[#11BFA5] bg-[#E8FFFB]' },
  { icon: GraduationCap, value: '98%', label: 'Client satisfaction', tone: 'text-[#F6A300] bg-[#FFF5E1]' },
];

export function AuthLayout({ children, mode }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-y-auto bg-white text-[#091536]">
      <HeroBackdrop />

      <main className="relative mx-auto grid min-h-screen max-w-[1440px] lg:my-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(540px,1.15fr)]">
        <section className="relative hidden overflow-hidden px-10 py-8 lg:flex lg:flex-col xl:px-14 xl:py-9">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-[linear-gradient(transparent,#CFE2F4_20%,#CFE2F4_80%,transparent)]" />
          <Link href="/" className="atlas-focus relative z-10 flex w-fit items-center rounded-xl group transition-transform duration-300 hover:scale-105">
            <img src="/logo/atlas-logo.webp" alt="AtlasCircle Logo" className="h-12 sm:h-16 w-auto object-contain" />
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10 my-auto max-w-xl py-4 space-y-5"
          >
            <div>
              <span className="inline-flex rounded-full bg-[#EAF4FF] px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#2584FF] shadow-sm">
                {mode === 'login' ? 'Welcome back' : 'Join the network'}
              </span>
              <h1 className="atlas-display mt-3 text-3xl font-black leading-[1.08] tracking-[-0.025em] xl:text-[40px]">
                Expert trainers.<br />Stronger teams.<br /><span className="inline-block rounded-full bg-[#95F2D8] px-3 py-1 text-[#082733]">Better results.</span>
              </h1>
              <p className="mt-2.5 max-w-md text-sm font-semibold leading-6 text-[#5A6680]">
                AtlasCircle connects organizations with vetted experts to deliver learning programs that create measurable impact.
              </p>
            </div>

            {/* WHY LEADING TEAMS CHOOSE ATLASCIRCLE */}
            <div className="rounded-2xl border border-[#DCE8F4] bg-white/70 p-4 shadow-xs backdrop-blur-sm space-y-3">
              <div className="text-[11px] font-black uppercase tracking-wider text-[#081536]">
                Why Leading L&amp;D Teams Choose AtlasCircle
              </div>
              <div className="space-y-2.5 text-xs font-medium text-[#475569]">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8FAF5] text-[#0E9F88]">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  <span><strong className="text-[#091536]">Top 1% Vetted Experts:</strong> Pre-screened facilitators with verified corporate track records.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EEF5FF] text-[#1677FF]">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  <span><strong className="text-[#091536]">AI Matchmaking:</strong> Instant proposals tailored specifically to your brief requirements.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7C3AED]">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  <span><strong className="text-[#091536]">Transparent Pricing:</strong> Direct commercial terms with zero agency markups or hidden fees.</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative z-10 grid grid-cols-3 gap-3">
            {metrics.map(({ icon: Icon, value, label, tone }) => (
              <div key={label} className="rounded-2xl border border-white/80 bg-white/58 p-3 shadow-[0_10px_30px_rgba(42,92,132,0.07)] backdrop-blur-md">
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${tone}`}><Icon className="h-4 w-4" /></span>
                <div className="mt-2 text-base font-black">{value}</div>
                <div className="mt-0.5 text-[10px] font-semibold leading-4 text-[#69758C]">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative flex min-h-screen items-center justify-center bg-white/18 px-4 py-8 sm:px-8 lg:px-10 lg:py-6">
          <Link href="/" className="atlas-focus absolute left-5 top-5 flex items-center rounded-lg lg:hidden group">
            <img src="/logo/atlas-logo.webp" alt="AtlasCircle Logo" className="h-8 w-auto object-contain" />
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full max-w-[680px] my-auto py-4"
          >
            {children}
          </motion.div>
        </section>
      </main>
    </div>
  );
}
