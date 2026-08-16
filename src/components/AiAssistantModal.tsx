'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  ArrowRight, 
  Loader2, 
  CheckCircle, 
  Bot 
} from 'lucide-react';
import { Requirement } from '../types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerated: (req: Requirement) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onGenerated
}) => {
  if (!isOpen) return null;

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate-requirement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          companyName: 'FinServe Pvt. Ltd.'
        })
      });

      const data = await res.json();
      
      const generatedReq: Requirement = {
        id: `req-${Date.now()}`,
        title: data.title || prompt.substring(0, 45),
        companyName: 'FinServe Pvt. Ltd.',
        category: data.category || 'Executive Leadership',
        targetAudience: data.targetAudience || 'Middle Management',
        deliveryMode: data.deliveryMode || 'Hybrid',
        cohortSize: data.cohortSize || 25,
        durationDays: data.durationDays || 2,
        startDate: '2026-09-30',
        budgetRange: data.budgetRange || '₹1,000,000 - ₹2,500,000',
        location: data.location || 'Mumbai, India',
        objectives: data.objectives || prompt,
        additionalRequirements: data.additionalRequirements || '',
        status: 'Matching',
        createdAt: new Date().toISOString().split('T')[0],
        matchedCount: 18
      };

      setLoading(false);
      onGenerated(generatedReq);
      onClose();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-6">
        
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff603d] to-amber-500 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Gemini AI RFP Generator</h3>
              <p className="text-xs text-slate-500">Describe your training need in natural language</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Describe your organizational training need:
            </label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. We need a 2-day interactive workshop for 30 Vice Presidents on Generative AI leadership strategy, prompt engineering, and risk governance in banking..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ff603d]/20"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="text-slate-400 font-bold">Try examples:</span>
            {[
              'Middle Mgmt Leadership',
              'Gen AI for Product Managers',
              'B2B MEDDPICC Sales'
            ].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => setPrompt(`I need a high-impact corporate training program focused on ${sample} for our enterprise leaders.`)}
                className="bg-orange-50 hover:bg-orange-100 text-[#ff603d] font-semibold px-2.5 py-1 rounded-lg transition-colors border border-orange-200/60"
              >
                {sample}
              </button>
            ))}
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="px-6 py-2.5 bg-[#ff603d] hover:bg-[#e05232] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Structuring RFP...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Training RFP</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
