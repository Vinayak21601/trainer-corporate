'use client';

import { useRouter } from 'next/navigation';
import { TrainerRegistrationWizard } from '@/src/components/TrainerRegistrationWizard';
import { useApp } from '@/src/context/AppContext';

export default function TrainerRegistrationPage() {
  const router = useRouter();
  const { } = useApp();

  return (
    <TrainerRegistrationWizard
      onComplete={(trainerData) => {
        // Stored into local storage and redirect to portal
        router.push('/trainer-portal');
      }}
      onCancel={() => router.push('/')}
    />
  );
}
