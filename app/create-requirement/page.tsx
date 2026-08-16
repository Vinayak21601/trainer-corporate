'use client';

import { useRouter } from 'next/navigation';
import { CreateRequirementWizard } from '@/src/components/CreateRequirementWizard';
import { useApp } from '@/src/context/AppContext';

export default function CreateRequirementPage() {
  const router = useRouter();
  const { addRequirement, openAiAssistant } = useApp();

  return (
    <CreateRequirementWizard
      onComplete={(req) => {
        addRequirement(req);
        router.push('/experts');
      }}
      onCancel={() => router.push('/requirements')}
      onOpenAiAssistant={openAiAssistant}
    />
  );
}
