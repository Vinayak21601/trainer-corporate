'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, FileText, LogIn, Menu, Search, UserPlus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { LandingButton } from './LandingButton';
import { LandingPersona } from './PersonaSwitcher';

interface LandingHeaderProps {
  persona: LandingPersona;
  onExploreExperts: () => void;
  onCreateRequirement: () => void;
}

export function LandingHeader({ persona, onExploreExperts, onCreateRequirement }: LandingHeaderProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setIsMenuOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const trainerExperience = persona === 'trainer';
  const navItems = trainerExperience
    ? [
        { href: '#trainer-workflow', label: 'How it works' },
        { href: '#trainer-calendar', label: 'Calendar' },
        { href: '#testimonials', label: 'Trainer stories' },
      ]
    : [
        { href: '#hero-section', label: 'Find trainers' },
        { href: '#built-for-everyone', label: 'For teams' },
        { href: '#testimonials', label: 'Reviews' },
      ];
  const handlePrimaryAction = () => trainerExperience ? router.push('/register?role=trainer') : onExploreExperts();

  return (
    <>
      {/* FLOATING NAVBAR */}
      <motion.div 
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        ref={headerRef}
        className="sticky top-0 z-40 w-full bg-transparent px-3 py-3 sm:px-6 sm:py-4 lg:px-8"
      >
        <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-full border border-[#DCE8F4] bg-white/82 px-3 py-2.5 shadow-[0_16px_44px_rgba(34,67,93,0.10)] backdrop-blur-2xl sm:gap-4 sm:px-5 sm:py-3" style={{ WebkitBackdropFilter: 'blur(24px) saturate(180%)' }}>
          {/* Logo */}
          <button type="button" aria-label="Go to Atlas home" className="atlas-focus group flex shrink-0 items-center gap-2 rounded-xl" onClick={() => router.push('/')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#18BFA5] text-xs font-black text-white shadow-[0_10px_24px_rgba(49,151,242,0.18)] transition-all duration-300 group-hover:scale-105 sm:h-9 sm:w-9 sm:text-sm">
              A
            </div>
            <span className="atlas-display text-sm font-black text-[#091536] sm:text-base">Atlas</span>
          </button>

          {/* Nav Links */}
          <div className="hidden items-center gap-1 rounded-full bg-white/65 p-1 text-[13px] font-semibold text-[#4D5B73] md:flex">
            {navItems.map((item, index) => <a key={item.href} href={item.href} className={`rounded-full px-3 py-2 transition-all hover:bg-[#EEF7FF] hover:text-[#1677FF] ${index === 0 ? 'text-[#091536]' : ''}`}>{item.label}</a>)}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button onClick={() => router.push('/login')} className="atlas-focus hidden rounded-lg px-3 py-2 text-xs font-black text-[#526179] transition hover:bg-[#EEF7FF] hover:text-[#176BFF] sm:inline-flex">
              Sign in
            </button>
            <LandingButton onClick={handlePrimaryAction} size="sm" variant={trainerExperience ? 'primary' : 'secondary'} className="hidden md:inline-flex">
              {trainerExperience ? 'Join as Trainer' : 'Find trainers'}
            </LandingButton>
            <button
              type="button"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
              className="atlas-focus flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF7FF] text-[#17365D] transition hover:bg-[#DFF0FF] hover:text-[#176BFF] md:hidden"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute left-0 right-0 top-[calc(100%+10px)] overflow-hidden rounded-[20px] border border-[#DCE8F4] bg-white/96 p-2 shadow-[0_22px_55px_rgba(34,67,93,0.16)] backdrop-blur-2xl md:hidden"
              >
                <nav className="grid gap-1" aria-label="Mobile navigation">
                  {navItems.map((item) => (
                    <a key={item.href} href={item.href} onClick={closeMenu} className="atlas-focus flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-black text-[#34445D] transition hover:bg-[#EEF7FF] hover:text-[#176BFF]">
                      {item.label}<ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </nav>

                <div className="my-2 h-px bg-[#E7EEF5]" />
                <div className="grid gap-1 sm:grid-cols-3">
                  <button onClick={() => { closeMenu(); router.push('/login'); }} className="atlas-focus flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-black text-[#526179] transition hover:bg-[#F3F7FB]"><LogIn className="h-4 w-4 text-[#176BFF]" />Sign in</button>
                  <button onClick={() => { closeMenu(); handlePrimaryAction(); }} className="atlas-focus flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-black text-[#526179] transition hover:bg-[#F3F7FB]">{trainerExperience ? <UserPlus className="h-4 w-4 text-[#11BFA5]" /> : <Search className="h-4 w-4 text-[#176BFF]" />}{trainerExperience ? 'Join as Trainer' : 'Find trainers'}</button>
                  <button onClick={() => { closeMenu(); if (trainerExperience) document.getElementById('trainer-workflow')?.scrollIntoView({ behavior: 'smooth' }); else onCreateRequirement(); }} className="atlas-focus flex items-center gap-2 rounded-xl bg-[#0D3270] px-3 py-2.5 text-left text-xs font-black text-white transition hover:bg-[#176BFF]">{trainerExperience ? <ArrowRight className="h-4 w-4" /> : <FileText className="h-4 w-4" />}{trainerExperience ? 'Explore trainer workflow' : 'Post a training brief'}</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
