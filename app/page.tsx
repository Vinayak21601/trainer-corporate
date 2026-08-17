'use client';

import { useRouter } from 'next/navigation';
import { LandingPage } from '@/src/components/LandingPage';
import { LandingPageV2 } from '@/src/components/LandingPageV2';
import { useApp } from '@/src/context/AppContext';

export default function Home() {
  const router = useRouter();
  const { trainers, toggleShortlist, openTrainerProfile, openAiAssistant } = useApp();

  const handleExploreExperts = (domain?: string, query?: string, delivery?: string) => {
    const params = new URLSearchParams();
    if (domain) params.set('domain', domain);
    if (query) params.set('search', query);
    if (delivery) params.set('delivery', delivery);
    const qs = params.toString();
    router.push(qs ? `/experts?${qs}` : '/experts');
  };

  return (
    <LandingPageV2
      onExploreExperts={handleExploreExperts}
      onCreateRequirement={() => router.push('/create-requirement')}
      featuredTrainers={trainers}
      onSelectTrainer={openTrainerProfile}
      onToggleShortlist={toggleShortlist}
      onOpenAiAssistant={openAiAssistant}
    />
  );
}
