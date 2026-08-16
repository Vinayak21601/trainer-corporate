'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FindExperts } from '@/src/components/FindExperts';
import { useApp } from '@/src/context/AppContext';
import { DeliveryMode } from '@/src/types';

function ExpertsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { trainers, requirements, activeRequirement, selectRequirement, toggleShortlist, openTrainerProfile } = useApp();
  const deliveryParam = searchParams.get('delivery');
  const initialDelivery = deliveryParam && ['In-Person', 'Virtual', 'Hybrid', 'All'].includes(deliveryParam)
    ? deliveryParam as DeliveryMode
    : undefined;

  return (
    <FindExperts
      trainers={trainers}
      requirements={requirements}
      activeRequirement={activeRequirement}
      onSelectRequirement={selectRequirement}
      onSelectTrainer={openTrainerProfile}
      onToggleShortlist={toggleShortlist}
      onModifyRequirement={() => router.push('/create-requirement')}
      initialDomain={searchParams.get('domain') ?? undefined}
      initialSearch={searchParams.get('search') ?? undefined}
      initialDelivery={initialDelivery}
    />
  );
}

export default function ExpertsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-[#777777]">Loading experts...</div>}>
      <ExpertsContent />
    </Suspense>
  );
}
