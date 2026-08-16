'use client';

import { useRouter } from 'next/navigation';
import { MyRequirements } from '@/src/components/MyRequirements';
import { useApp } from '@/src/context/AppContext';

export default function RequirementsPage() {
  const router = useRouter();
  const { requirements, selectRequirement } = useApp();

  return (
    <MyRequirements
      requirements={requirements}
      onCreateRequirement={() => router.push('/create-requirement')}
      onSelectRequirement={selectRequirement}
      onExploreExperts={() => router.push('/experts')}
    />
  );
}
