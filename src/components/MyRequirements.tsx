'use client';

import React from 'react';
import { 
  FileText, 
  PlusCircle, 
  Users, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  CheckCircle 
} from 'lucide-react';
import { Requirement } from '../types';

interface MyRequirementsProps {
  requirements: Requirement[];
  onCreateRequirement: () => void;
  onSelectRequirement: (req: Requirement) => void;
  onExploreExperts: () => void;
}

export const MyRequirements: React.FC<MyRequirementsProps> = ({
  requirements,
  onCreateRequirement,
  onSelectRequirement,
  onExploreExperts
}) => {
  return (
    <div className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#ff603d]" />
            <span>My Corporate Training Requirements (RFPs)</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage your active organizational training posts and track incoming trainer proposals.
          </p>
        </div>

        <button
          onClick={onCreateRequirement}
          className="px-5 py-2.5 bg-[#ff603d] hover:bg-[#e05232] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Requirement</span>
        </button>
      </div>

      {/* REQUIREMENTS LIST */}
      <div className="space-y-4">
        {requirements.map((req) => (
          <div
            key={req.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">RFP ID: {req.id}</span>
                <h3 className="text-lg font-bold text-slate-900">{req.title}</h3>
              </div>

              <span className={`self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full ${
                req.status === 'Matching'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                ● {req.status}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{req.objectives}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block font-medium">Category</span>
                <span className="font-bold text-slate-800">{req.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Format & Location</span>
                <span className="font-bold text-slate-800">{req.deliveryMode} ({req.location})</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Cohort & Duration</span>
                <span className="font-bold text-slate-800">{req.cohortSize} Leaders • {req.durationDays} Days</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Budget Range</span>
                <span className="font-bold text-slate-800">{req.budgetRange}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>{req.matchedCount} AI Matched Experts Available</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onSelectRequirement(req);
                    onExploreExperts();
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center gap-1.5"
                >
                  <span>View Matched Experts</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ff603d]" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
