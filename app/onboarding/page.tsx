'use client';

import { useRouter } from 'next/navigation';
import { CreateRequirementWizard } from '@/src/components/CreateRequirementWizard';
import { useApp } from '@/src/context/AppContext';

export default function OnboardingPage() {
  const router = useRouter();
  const { addRequirement, openAiAssistant } = useApp();

  return (
    <CreateRequirementWizard
      onComplete={(req) => {
        addRequirement(req);
        router.push('/experts');
      }}
      onCancel={() => router.push('/dashboard')}
      onOpenAiAssistant={openAiAssistant}
    />
  );
}
