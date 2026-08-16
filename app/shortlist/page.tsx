'use client';

import { useRouter } from 'next/navigation';
import { Shortlist } from '@/src/components/Shortlist';
import { useApp } from '@/src/context/AppContext';

export default function ShortlistPage() {
  const router = useRouter();
  const { shortlistedTrainers, toggleShortlist, openTrainerProfile, sendMessageToTrainer } = useApp();

  return (
    <Shortlist
      shortlistedTrainers={shortlistedTrainers}
      onRemoveFromShortlist={toggleShortlist}
      onSelectTrainer={openTrainerProfile}
      onSendMessage={sendMessageToTrainer}
      onExploreExperts={() => router.push('/experts')}
    />
  );
}
