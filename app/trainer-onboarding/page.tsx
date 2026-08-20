'use client';

import { useRouter } from 'next/navigation';
import { TrainerRegistrationWizard } from '@/src/components/TrainerRegistrationWizard';

export default function TrainerOnboardingPage() {
  const router = useRouter();

  return (
    <TrainerRegistrationWizard
      onComplete={() => router.push('/trainer-portal')}
      onCancel={() => router.push('/')}
    />
  );
}
