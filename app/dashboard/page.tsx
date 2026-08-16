'use client';

import { useRouter } from 'next/navigation';
import { DashboardView } from '@/src/components/DashboardView';
import { useApp } from '@/src/context/AppContext';

export default function DashboardPage() {
  const router = useRouter();
  const { requirements, shortlistedTrainers, conversations, trainers, openTrainerProfile, openAiAssistant } = useApp();

  return (
    <DashboardView
      requirements={requirements}
      shortlistCount={shortlistedTrainers.length}
      conversations={conversations}
      featuredTrainers={trainers}
      setActiveView={(view) => router.push(view === 'landing' ? '/' : `/${view}`)}
      onSelectTrainer={openTrainerProfile}
      onOpenAiAssistant={openAiAssistant}
    />
  );
}
