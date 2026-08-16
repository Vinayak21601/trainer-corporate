'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Building2, GraduationCap, UsersRound } from 'lucide-react';
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
    <div className="relative min-h-screen overflow-hidden bg-white text-[#091536] lg:h-screen lg:min-h-0">
      <HeroBackdrop />

      <main className="relative mx-auto grid min-h-screen max-w-[1420px] lg:my-4 lg:h-[calc(100vh-2rem)] lg:min-h-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(480px,0.95fr)] lg:overflow-hidden lg:rounded-[32px] lg:border lg:border-white/80 lg:bg-white/35 lg:shadow-[0_30px_90px_rgba(42,92,132,0.13)] lg:backdrop-blur-sm">
        <section className="relative hidden overflow-hidden px-12 py-8 lg:flex lg:flex-col xl:px-16 xl:py-9">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-[linear-gradient(transparent,#CFE2F4_20%,#CFE2F4_80%,transparent)]" />
          <Link href="/" className="atlas-focus relative z-10 flex w-fit items-center gap-3 rounded-xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#1FC8DB,#31F29B)] text-xl font-black text-white shadow-[0_12px_30px_rgba(49,151,242,0.20)]">A</span>
            <span className="atlas-display text-2xl font-black">Atlas</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10 my-auto max-w-xl py-5"
          >
            <span className="inline-flex rounded-full bg-[#EAF4FF] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#2584FF] shadow-sm">
              {mode === 'login' ? 'Welcome back' : 'Join the network'}
            </span>
            <h1 className="atlas-display mt-4 text-3xl font-black leading-[1.08] tracking-[-0.025em] xl:text-[42px]">
              Expert trainers.<br />Stronger teams.<br /><span className="inline-block rounded-full bg-[#95F2D8] px-3 py-1 text-[#082733]">Better results.</span>
            </h1>
            <p className="mt-3 max-w-md text-sm font-semibold leading-6 text-[#5A6680]">
              Atlas connects organizations with vetted experts to deliver learning programs that create measurable impact.
            </p>
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

        <section className="relative flex min-h-screen items-center justify-center bg-white/18 px-4 py-6 sm:px-8 lg:h-auto lg:min-h-0 lg:px-10 lg:py-4">
          <Link href="/" className="atlas-focus absolute left-5 top-5 flex items-center gap-2 rounded-lg lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#1FC8DB,#31F29B)] font-black text-white">A</span>
            <span className="atlas-display text-xl font-black">Atlas</span>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full max-w-[500px]"
          >
            {children}
          </motion.div>
        </section>
      </main>
    </div>
  );
}
