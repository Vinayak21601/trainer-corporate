'use client';

import { useRouter } from 'next/navigation';
import { TrainerDashboard } from '@/src/components/TrainerDashboard';
import { useApp } from '@/src/context/AppContext';

export default function TrainerPortalPage() {
  const router = useRouter();
  const { requirements, selectRequirement } = useApp();

  return (
    <TrainerDashboard
      requirements={requirements}
      onOpenRequirement={(req) => {
        selectRequirement(req);
        router.push('/experts');
      }}
    />
  );
}
