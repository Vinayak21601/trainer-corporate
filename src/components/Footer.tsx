'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Linkedin,
  Twitter,
  Facebook,
  Globe
} from 'lucide-react';
import { LandingButton } from './landing/LandingButton';

interface FooterProps {
  onPostBrief?: () => void;
  onJoinTrainer?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPostBrief, onJoinTrainer }) => {
  const router = useRouter();

  const handleCorporateSignUp = () => {
    if (onPostBrief) {
      onPostBrief();
    } else {
      router.push('/corporate-onboarding');
    }
  };

  const handleTrainerSignUp = () => {
    if (onJoinTrainer) {
      onJoinTrainer();
    } else {
      router.push('/trainer-registration');
    }
  };

  return (
    <footer className="relative z-10 border-t border-[#1F2E4D] bg-[#081536] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-white/12 pb-10">
          <div>
            <img
              src="/logo/atlas-logo.webp"
              alt="Atlas Circle"
              className="h-20 sm:h-20 w-auto object-contain rounded-xl"
            />
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
              <button onClick={() => router.push('/about-us')} className="transition-colors hover:text-[#31E6B1]">About Us</button>
              <button onClick={() => router.push('/')} className="transition-colors hover:text-[#31E6B1]">Home Overview</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/12 pt-6 text-[11px] font-medium text-[#8290AA] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 AtlasCircle. Corporate Trainer &amp; Facilitator Platform. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <button onClick={() => router.push('/about-us')} className="transition-colors hover:text-white">About Us</button>
            <button onClick={() => router.push('/terms')} className="transition-colors hover:text-white">Terms</button>
            <button onClick={() => router.push('/privacy')} className="transition-colors hover:text-white">Privacy</button>
            <button onClick={() => router.push('/settings')} className="transition-colors hover:text-white">Settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
