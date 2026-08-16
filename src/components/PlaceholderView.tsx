'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface PlaceholderViewProps {
  title: string;
  description: string;
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title, description }) => {
  const router = useRouter();

  return (
    <div className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8 space-y-6">
      <button
        onClick={() => router.push('/dashboard')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#777777] hover:text-[#111111] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>

      <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 max-w-xl mx-auto my-10">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
        <span className="inline-block px-3 py-1 bg-orange-50 text-[#ff603d] border border-orange-200 text-xs font-bold rounded-full">
          Coming Soon
        </span>
      </div>
    </div>
  );
};
