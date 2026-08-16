'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { LandingButton } from './LandingButton';
import { LandingPersona } from './PersonaSwitcher';

interface LandingFooterProps {
  persona?: LandingPersona;
  onExploreExperts: () => void;
  onCreateRequirement: () => void;
  onOpenAiAssistant: () => void;
}

export function LandingFooter({ persona = 'corporate', onExploreExperts, onCreateRequirement, onOpenAiAssistant }: LandingFooterProps) {
  const trainerExperience = persona === 'trainer';
  const handlePrimaryAction = () => {
    if (trainerExperience) window.location.href = '/register?role=trainer';
    else onCreateRequirement();
  };
  return (
    <>
      {/* FOOTER */}
      <footer className="relative overflow-hidden border-t border-[#17305B] bg-[#07132F] px-4 pb-8 pt-14 text-white sm:px-6 lg:px-8">
        
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-8 border-b border-white/12 pb-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#18BFA5] text-sm font-black text-white">A</span>
                <span className="text-sm font-black uppercase text-[#7EE7D0]">{trainerExperience ? 'Your training career, elevated' : 'Corporate learning, simplified'}</span>
              </div>
              <h2 className="mt-6 max-w-2xl text-[24px] font-extrabold leading-tight sm:text-[32px]">
                {trainerExperience ? 'Turn your expertise into meaningful corporate work.' : 'Build stronger teams with the right experts.'}
              </h2>
            </div>
            <LandingButton
              onClick={handlePrimaryAction}
              variant="accent"
              endIcon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              {trainerExperience ? 'Join as a Trainer' : 'Post a Training Brief'}
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

          <div className="grid gap-8 py-9 md:grid-cols-[1.4fr_1fr_1fr]">
            <p className="max-w-md text-sm font-medium leading-6 text-[#AAB7D0]">
              {trainerExperience ? 'A professional platform for showcasing your expertise, finding relevant corporate opportunities, and managing your training practice.' : 'A modern marketplace for discovering, evaluating, and engaging verified corporate trainers and facilitators.'}
            </p>

            <div>
              <div className="mb-3 text-[10px] font-black uppercase text-[#7EE7D0]">{trainerExperience ? 'For trainers' : 'Explore'}</div>
              <div className="flex flex-col items-start gap-2.5 text-sm font-semibold text-[#DCE5F5]">
                {trainerExperience ? <><button onClick={handlePrimaryAction} className="transition-colors hover:text-[#31E6B1]">Create Profile</button><a href="#trainer-workflow" className="transition-colors hover:text-[#31E6B1]">How It Works</a><a href="#testimonials" className="transition-colors hover:text-[#31E6B1]">Trainer Stories</a></> : <><button onClick={() => onExploreExperts()} className="transition-colors hover:text-[#31E6B1]">Find Trainers</button><button onClick={onCreateRequirement} className="transition-colors hover:text-[#31E6B1]">Post a Brief</button><button onClick={onOpenAiAssistant} className="transition-colors hover:text-[#31E6B1]">AI RFP Assistant</button></>}
              </div>
            </div>

            <div>
              <div className="mb-3 text-[10px] font-black uppercase text-[#7EE7D0]">Company</div>
              <div className="flex flex-col items-start gap-2.5 text-sm font-semibold text-[#DCE5F5]">
                <a href={trainerExperience ? '#trainer-workflow' : '#built-for-everyone'} className="transition-colors hover:text-[#31E6B1]">{trainerExperience ? 'For Trainers' : 'For Teams'}</a>
                <a href="#testimonials" className="transition-colors hover:text-[#31E6B1]">Customer Stories</a>
                <a href="#hero-section" className="transition-colors hover:text-[#31E6B1]">Platform</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/12 pt-6 text-[11px] font-medium text-[#8290AA] sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Project Atlas. Corporate Trainer & Facilitator Platform.</p>
            <div className="flex flex-wrap gap-5">
              <a href="#" className="transition-colors hover:text-white">Terms</a>
              <a href="#" className="transition-colors hover:text-white">Privacy</a>
              <a href="#" className="transition-colors hover:text-white">Security</a>
              <a href="#" className="transition-colors hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}
