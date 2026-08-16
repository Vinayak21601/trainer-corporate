'use client';

import React from 'react';
import { 
  Briefcase, 
  DollarSign, 
  Calendar, 
  Star, 
  Send, 
  TrendingUp, 
  CheckCircle,
  Building
} from 'lucide-react';
import { Requirement } from '../types';

interface TrainerDashboardProps {
  requirements: Requirement[];
  onOpenRequirement: (req: Requirement) => void;
}

export const TrainerDashboard: React.FC<TrainerDashboardProps> = ({
  requirements,
  onOpenRequirement
}) => {
  return (
    <div className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#ff603d] uppercase tracking-wider">
            <span>Trainer Portal View</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Welcome back, Vikram Malhotra
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            You have 3 incoming corporate RFPs matching your Executive Leadership expertise.
          </p>
        </div>

        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full self-start">
          ● Available for Workshops
        </span>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-[11px] text-slate-400 font-bold uppercase">Active Inquiries</span>
          <div className="text-2xl font-extrabold text-slate-900">4 RFPs</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-[11px] text-slate-400 font-bold uppercase">Workshops Completed</span>
          <div className="text-2xl font-extrabold text-slate-900">42 Sessions</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-[11px] text-slate-400 font-bold uppercase">Average Rating</span>
          <div className="text-2xl font-extrabold text-amber-500">★ 4.8 / 5.0</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-[11px] text-slate-400 font-bold uppercase">YTD Earnings</span>
          <div className="text-2xl font-extrabold text-emerald-600">$48,500</div>
        </div>
      </div>

      {/* OPPORTUNITIES LIST */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900">Matching Corporate Training RFPs</h2>

        {requirements.map((req) => (
          <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-bold text-[#ff603d] bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
                  {req.companyName}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{req.title}</h3>
              </div>
              <span className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-xl">
                Budget: {req.budgetRange}
              </span>
            </div>

            <p className="text-xs text-slate-600">{req.objectives}</p>

            <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div>Format: <strong className="text-slate-800">{req.deliveryMode}</strong></div>
              <div>Cohort: <strong className="text-slate-800">{req.cohortSize} Leaders</strong></div>
              <div>Duration: <strong className="text-slate-800">{req.durationDays} Days</strong></div>
              <div>Location: <strong className="text-slate-800">{req.location}</strong></div>
            </div>

            <button
              onClick={() => alert(`Proposal form opened for ${req.title}. You can submit custom syllabus & day rates directly to ${req.companyName}.`)}
              className="px-5 py-2.5 bg-[#ff603d] hover:bg-[#e05232] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Proposal & Syllabus</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
