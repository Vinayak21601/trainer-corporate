'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Trainer } from '../types';
import { LandingHeader } from './landing/LandingHeader';
import { LandingHero } from './landing/LandingHero';
import { BuiltForEveryoneSection } from './landing/BuiltForEveryoneSection';
import { PlatformOverviewSection } from './landing/PlatformOverviewSection';
import { TestimonialsSection } from './landing/TestimonialsSection';
import { FeaturedTrainersSection } from './landing/FeaturedTrainersSection';
import { LandingFooter } from './landing/LandingFooter';
import { HeroBackdrop } from './landing/HeroBackdrop';
import { PersonaSwitcher, LandingPersona } from './landing/PersonaSwitcher';
import { TrainerLandingExperience } from './landing/TrainerLandingExperience';

interface LandingPageProps {
  onExploreExperts: (domain?: string, query?: string, delivery?: string) => void;
  onCreateRequirement: () => void;
  featuredTrainers: Trainer[];
  onSelectTrainer: (trainer: Trainer) => void;
  onToggleShortlist: (trainerId: string) => void;
  onOpenAiAssistant: () => void;
}

const MemoTrainerLandingExperience = React.memo(TrainerLandingExperience);

const CorporateLandingExperience = React.memo(function CorporateLandingExperience({
  onExploreExperts,
  onCreateRequirement,
  featuredTrainers,
  onSelectTrainer,
  onToggleShortlist,
  onOpenAiAssistant,
}: LandingPageProps) {
  return (
    <>
      <LandingHero
        onExploreExperts={onExploreExperts}
        onCreateRequirement={onCreateRequirement}
        onOpenAiAssistant={onOpenAiAssistant}
        featuredTrainerCount={featuredTrainers.length}
      />
      <BuiltForEveryoneSection onExploreExperts={() => onExploreExperts()} />
      <PlatformOverviewSection onExploreExperts={() => onExploreExperts()} />
      <TestimonialsSection />
      {/* Featured corporate instructors section intentionally hidden.
      <FeaturedTrainersSection
        featuredTrainers={featuredTrainers}
        onExploreExperts={() => onExploreExperts()}
        onSelectTrainer={onSelectTrainer}
        onToggleShortlist={onToggleShortlist}
      />
      */}
    </>
  );
});

export const LandingPage: React.FC<LandingPageProps> = ({
  onExploreExperts,
  onCreateRequirement,
  featuredTrainers,
  onSelectTrainer,
  onToggleShortlist,
  onOpenAiAssistant
}) => {
  const [persona, setPersona] = useState<LandingPersona>('corporate');
  const [displayedPersona, setDisplayedPersona] = useState<LandingPersona>('corporate');
  const [isFading, setIsFading] = useState(false);
  const switchTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const requestedPersona = new URLSearchParams(window.location.search).get('for');
    const storedPersona = window.localStorage.getItem('atlas-landing-persona');
    const initialPersona = requestedPersona === 'trainer' || requestedPersona === 'corporate'
      ? requestedPersona
      : storedPersona === 'trainer' || storedPersona === 'corporate'
        ? storedPersona
        : 'corporate';
    setPersona(initialPersona);
    setDisplayedPersona(initialPersona);
    return () => {
      if (switchTimerRef.current !== null) window.clearTimeout(switchTimerRef.current);
    };
  }, []);

  const selectPersona = (nextPersona: LandingPersona) => {
    if (nextPersona === persona) return;
    setPersona(nextPersona);
    setIsFading(true);
    if (switchTimerRef.current !== null) window.clearTimeout(switchTimerRef.current);
    switchTimerRef.current = window.setTimeout(() => {
      setDisplayedPersona(nextPersona);
      window.requestAnimationFrame(() => setIsFading(false));
      switchTimerRef.current = null;
    }, 90);
    window.setTimeout(() => {
      window.localStorage.setItem('atlas-landing-persona', nextPersona);
      const url = new URL(window.location.href);
      url.searchParams.set('for', nextPersona);
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    }, 0);
  };

  return (
  <div className="relative min-h-screen overflow-x-hidden bg-white font-sans text-[#111111]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-312.5 overflow-hidden bg-[#FBFAF7] sm:h-245 lg:h-205" aria-hidden="true">
        <HeroBackdrop />
      </div>
    <LandingHeader persona={persona} onExploreExperts={() => onExploreExperts()} onCreateRequirement={onCreateRequirement} />
    <PersonaSwitcher persona={persona} onChange={selectPersona} />
    <div className={`${displayedPersona === 'corporate' ? 'block' : 'hidden'} transition-opacity duration-150 ease-out ${isFading ? 'opacity-0' : 'opacity-100'}`} aria-hidden={displayedPersona !== 'corporate'}>
      <CorporateLandingExperience
        onExploreExperts={onExploreExperts}
        onCreateRequirement={onCreateRequirement}
        featuredTrainers={featuredTrainers}
        onSelectTrainer={onSelectTrainer}
        onToggleShortlist={onToggleShortlist}
        onOpenAiAssistant={onOpenAiAssistant}
      />
    </div>
    <div className={`${displayedPersona === 'trainer' ? 'block' : 'hidden'} transition-opacity duration-150 ease-out ${isFading ? 'opacity-0' : 'opacity-100'}`} aria-hidden={displayedPersona !== 'trainer'}>
      <MemoTrainerLandingExperience featuredTrainers={featuredTrainers} onSelectTrainer={onSelectTrainer} />
    </div>
    <LandingFooter
      persona={displayedPersona}
      onExploreExperts={() => onExploreExperts()}
      onCreateRequirement={onCreateRequirement}
      onOpenAiAssistant={onOpenAiAssistant}
    />
  </div>
  );
};
