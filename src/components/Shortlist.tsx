'use client';

import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Star, 
  MessageSquare, 
  ArrowRight, 
  SlidersHorizontal, 
  X, 
  CheckCircle,
  Play
} from 'lucide-react';
import { Trainer } from '../types';

interface ShortlistProps {
  shortlistedTrainers: Trainer[];
  onRemoveFromShortlist: (trainerId: string) => void;
  onSelectTrainer: (trainer: Trainer) => void;
  onSendMessage: (trainerId: string) => void;
  onExploreExperts: () => void;
}

export const Shortlist: React.FC<ShortlistProps> = ({
  shortlistedTrainers,
  onRemoveFromShortlist,
  onSelectTrainer,
  onSendMessage,
  onExploreExperts
}) => {
  const [showCompareMatrix, setShowCompareMatrix] = useState(false);

  return (
    <div className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-[#ff603d] fill-[#ff603d]" />
            <span>My Shortlisted Experts ({shortlistedTrainers.length})</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Compare candidate profiles side-by-side and issue custom proposal requests.
          </p>
        </div>

        {shortlistedTrainers.length > 1 && (
          <button
            onClick={() => setShowCompareMatrix(!showCompareMatrix)}
            className="px-4 py-2 bg-[#ff603d] hover:bg-[#e05232] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{showCompareMatrix ? 'Hide Comparison Matrix' : 'Compare Side-by-Side'}</span>
          </button>
        )}
      </div>

      {shortlistedTrainers.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 max-w-xl mx-auto my-10">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200">
            <Bookmark className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Your Shortlist is Empty</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Browse our AI-matched database of 10,000+ vetted corporate trainers and bookmark top candidates for your programs.
          </p>
          <button
            onClick={onExploreExperts}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>Explore Experts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* SIDE-BY-SIDE COMPARISON MATRIX */}
          {showCompareMatrix && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4 overflow-x-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-extrabold text-slate-900 text-sm">Side-by-Side Expert Matrix</h3>
                <button 
                  onClick={() => setShowCompareMatrix(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="p-3 font-bold text-slate-500 w-40">Attribute</th>
                    {shortlistedTrainers.map((t) => (
                      <th key={t.id} className="p-3 font-bold text-slate-900 min-w-48">
                        <div className="flex items-center gap-2">
                          <img src={t.avatarUrl} alt={t.name} className="w-8 h-8 rounded-lg object-cover" />
                          <div>
                            <div className="font-bold">{t.name}</div>
                            <div className="text-[10px] text-blue-600 font-semibold">{t.matchScore}% Match</div>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-bold text-slate-500">Day Rate</td>
                    {shortlistedTrainers.map((t) => (
                      <td key={t.id} className="p-3 font-extrabold text-slate-900">${t.dayRate}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-500">Rating</td>
                    {shortlistedTrainers.map((t) => (
                      <td key={t.id} className="p-3 font-bold text-slate-800">★ {t.rating} ({t.reviewCount})</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-500">Experience</td>
                    {shortlistedTrainers.map((t) => (
                      <td key={t.id} className="p-3 font-medium text-slate-800">{t.yearsExperience}+ Yrs</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-500">Delivery Format</td>
                    {shortlistedTrainers.map((t) => (
                      <td key={t.id} className="p-3 font-medium text-slate-800">{t.deliveryModes.join(', ')}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* GRID OF SHORTLISTED CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shortlistedTrainers.map((trainer) => (
              <div
                key={trainer.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-lg">
                    {trainer.matchScore}% Match
                  </span>
                  <button
                    onClick={() => onRemoveFromShortlist(trainer.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove from shortlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-4 items-start">
                  <img
                    src={trainer.avatarUrl}
                    alt={trainer.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
                  />
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">{trainer.name}</h3>
                    <p className="text-xs font-medium text-slate-600">{trainer.title}</p>
                    <p className="text-[11px] text-slate-400">{trainer.location}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500">${trainer.dayRate} / Day</span>
                  <span className="text-emerald-700 font-bold">★ {trainer.rating}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => onSelectTrainer(trainer)}
                    className="w-full text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 py-2.5 rounded-xl transition-all"
                  >
                    View Profile
                  </button>

                  <button
                    onClick={() => onSendMessage(trainer.id)}
                    className="w-full text-xs font-bold bg-slate-900 hover:bg-black text-white py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#ff603d]" />
                    <span>Message</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
