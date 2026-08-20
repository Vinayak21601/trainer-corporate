'use client';

import { useRouter } from 'next/navigation';
import { TrainerRegistrationWizard } from '@/src/components/TrainerRegistrationWizard';

export default function JoinAsTrainerPage() {
  const router = useRouter();

  return (
    <TrainerRegistrationWizard
      onComplete={() => router.push('/trainer-portal')}
      onCancel={() => router.push('/')}
    />
  );
}
