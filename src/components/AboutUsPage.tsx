'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Building2,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { HeroBackdrop } from './landing/HeroBackdrop';
import { Footer } from './Footer';

export const AboutUsPage: React.FC = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<'about' | 'mission' | 'vision' | 'founders'>('about');

  const scrollToSection = (id: string, sectionKey: 'about' | 'mission' | 'vision' | 'founders') => {
    setActiveSection(sectionKey);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-white font-sans text-[#111111] antialiased selection:bg-[#1677FF] selection:text-white">
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[500px] overflow-hidden bg-[#FBFAF7]">
        <HeroBackdrop />
      </div>

      {/* TOP NAVBAR HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 sm:gap-10">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="flex shrink-0 items-center transition-transform hover:scale-105"
            >
              <img
                src="/logo/atlas-logo.png"
                alt="Atlas Circle"
                className="h-20 sm:h-20 w-auto object-contain rounded-xl"
              />
            </button>

            {/* Nav links: About Us · Mission · Vision · From Founders */}
            <nav className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-bold text-slate-600">
              <button
                onClick={() => scrollToSection('about-us-section', 'about')}
                className={`transition-colors ${
                  activeSection === 'about' ? 'text-[#1677FF] font-extrabold' : 'hover:text-slate-900'
                }`}
              >
                About Us
              </button>
              <span className="text-slate-300">·</span>
              <button
                onClick={() => scrollToSection('mission-section', 'mission')}
                className={`transition-colors ${
                  activeSection === 'mission' ? 'text-[#1677FF] font-extrabold' : 'hover:text-slate-900'
                }`}
              >
                Mission
              </button>
              <span className="text-slate-300">·</span>
              <button
                onClick={() => scrollToSection('vision-section', 'vision')}
                className={`transition-colors ${
                  activeSection === 'vision' ? 'text-[#1677FF] font-extrabold' : 'hover:text-slate-900'
                }`}
              >
                Vision
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/register')}
              className="hidden sm:inline-block rounded-xl px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* MAIN EDITORIAL CONTENT - CLEAN PROSE, NO CARD BOXES */}
      <main className="relative z-10 mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 space-y-16">
        
        {/* ABOUT US SECTION */}
        <section id="about-us-section" className="scroll-mt-24 space-y-6">
          <div className="space-y-1">
            <h1 className="atlas-display text-3xl sm:text-5xl font-black text-[#081536] tracking-tight">
              About Us
            </h1>
            <p className="text-lg sm:text-xl font-bold text-[#1677FF] pt-2">
              We are a marketplace for corporate trainers and industry faculty in India.
            </p>
          </div>

          <div className="space-y-5 text-base sm:text-lg text-slate-700 leading-relaxed">
            <p>
              Today, finding a good trainer is a phone-call business. An HR manager asks a vendor, who asks a broker, who asks someone they once worked with. Three weeks and three markups later, a trainer shows up. That trainer is paid 40% of what the client was billed, and waits another 60 days for it.
            </p>

            <p>
              Colleges have the same problem in a different shape. Every semester, a placement cell or department head needs a working professional to teach a module, run a Faculty Development Programme, or take a guest session. They find one through personal contacts, verify almost nothing, and repeat the scramble next term.
            </p>

            <p className="font-medium text-slate-900">
              We replace all of that with one place to look. Trainers and industry experts build a verified profile once. Buyers post what they need. Matches come back in 24 to 48 hours for corporate work, and against the academic calendar for institutional work. Payment sits in escrow and releases on delivery, with same-week payout available.
            </p>
          </div>

          {/* FOUR GROUPS */}
          <div className="pt-6 space-y-4 border-t border-slate-200/80">
            <h2 className="text-base sm:text-lg font-black text-[#081536]">
              Four groups use Atlas Circle:
            </h2>

            <div className="grid gap-3 sm:grid-cols-2 pt-1">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <Users className="h-5 w-5 text-[#1677FF] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Freelance and contract corporate trainers, and working professionals who teach.
                </span>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <Building2 className="h-5 w-5 text-[#0E9F88] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Corporates and MSMEs sourcing for their own L&amp;D programmes.
                </span>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <Layers className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Training companies and EdTech aggregators staffing client contracts.
                </span>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <GraduationCap className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Colleges and universities hiring guest, visiting, and adjunct faculty.
                </span>
              </div>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed pt-2">
            We are built in India, for how India actually contracts, invoices, and pays. GST-compliant billing, escrow that clears fast, KYC that runs in minutes, and credential records a university can put in front of an accreditation panel.
          </p>
        </section>

        {/* OUR MISSION */}
        <section id="mission-section" className="scroll-mt-24 space-y-6 pt-8 border-t border-slate-200">
          <h2 className="atlas-display text-2xl sm:text-4xl font-black text-[#081536]">
            Our Mission
          </h2>

          <div className="border-l-4 border-[#1677FF] pl-5 py-1 text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
            Put every trainer's work on the record, and every Organization one search away from the right expert.
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
            <p>
              Two things have to be true for this market to work. A trainer's track record has to follow them, instead of living in one client's memory. And the people who need that trainer have to be able to find them without asking three intermediaries first.
            </p>
            <p className="font-semibold text-slate-900">
              Everything we build serves one of those two. If a feature does neither, it does not ship.
            </p>
          </div>
        </section>

        {/* OUR VISION */}
        <section id="vision-section" className="scroll-mt-24 space-y-6 pt-8 border-t border-slate-200">
          <h2 className="atlas-display text-2xl sm:text-4xl font-black text-[#081536]">
            Our Vision
          </h2>

          <div className="border-l-4 border-[#0E9F88] pl-5 py-1 text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
            Make Atlas Circle the default first search for training and teaching talent in India.
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
            <p>
              Not another vendor on the list. The place people check first, the way they check a job board before calling a recruiter.
            </p>
            <p>
              Get that right in India and the same trust layer then goes Global. Indian trainers in GenAI, cloud, data, and compliance already command global rates. Once their record is verifiable and their payment is guaranteed, geography stops being the constraint it is today. We can truly say, we are “Made in India, for the World”.
            </p>
          </div>
        </section>

        {/* FROM THE FOUNDERS */}
        <section id="founders-section" className="scroll-mt-24 space-y-6 pt-8 border-t border-slate-200">
          <h2 className="atlas-display text-2xl sm:text-4xl font-black text-[#081536]">
            From the Founders
          </h2>

          <div className="space-y-5 text-base sm:text-lg text-slate-700 leading-relaxed">
            <p className="font-medium text-slate-900">
              We kept hearing the same complaint from every side of this market, and nobody realised they were describing the same problem.
            </p>

            <p>
              L&amp;D heads said good trainers were impossible to find. Deans said the same about industry faculty. Training firms said they were always one resignation away from missing a delivery. And the trainers themselves, who were in demand from all three, told us they were underpaid and/or paid late.
            </p>

            <p>
              Everyone was short of the same person. Nobody could see them. That is not a supply problem. It is an infrastructure problem, and infrastructure is buildable.
            </p>

            <p className="font-bold text-[#081536] text-lg sm:text-xl pt-2">
              A marketplace earns its commission by making both sides better off than they were without it. That is the only test that matters, and we intend to keep passing it.
            </p>
          </div>
        </section>

      </main>

      {/* COMMON FOOTER */}
      <Footer />
    </div>
  );
};
