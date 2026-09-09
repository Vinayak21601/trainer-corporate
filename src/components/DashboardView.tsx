'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  ShieldCheck,
  UserCheck,
  Copy,
  Check,
  Plus,
  Sparkles,
  AlertCircle,
  Clock,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Star,
  IndianRupee,
  Users,
  Award,
  BookOpen,
  LayoutGrid,
  Table as TableIcon,
  X,
  PhoneCall,
  User
} from 'lucide-react';
import { Trainer, Requirement, Conversation } from '../types';

interface DashboardViewProps {
  requirements?: Requirement[];
  shortlistCount?: number;
  conversations?: Conversation[];
  featuredTrainers?: Trainer[];
  setActiveView?: (view: string) => void;
  onSelectTrainer?: (trainer: Trainer) => void;
  onOpenAiAssistant?: () => void;
}

interface AttentionItem {
  id: string;
  type: 'danger' | 'warning' | 'success';
  dotColor: string;
  badgeBg: string;
  badgeText: string;
  title: string;
  description: string;
  category: string;
  timestamp: string;
  actionText: string;
  actionType: 'proposals' | 'requirement' | 'schedule' | 'feedback';
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenAiAssistant
}) => {
  const router = useRouter();

  const [copiedAccountId, setCopiedAccountId] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table');
  const [contactManagerModalOpen, setContactManagerModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyAccountId = () => {
    navigator.clipboard.writeText('AT-CORP-00482');
    setCopiedAccountId(true);
    showToast('Corporate Account ID copied to clipboard!');
    setTimeout(() => setCopiedAccountId(false), 2000);
  };

  // 1. Attention Items (Actionable section)
  const attentionItems: AttentionItem[] = [
    {
      id: 'att-1',
      type: 'danger',
      dotColor: 'bg-red-500',
      badgeBg: 'bg-red-50 text-red-700 border-red-200',
      badgeText: '🔴 Proposals Ready',
      title: '2 trainer proposals awaiting decision',
      description: 'Facilitator proposals received for "Executive Leadership Workshop" & "Agile Management".',
      category: 'Proposal Review',
      timestamp: 'Action needed today',
      actionText: 'Review Proposals',
      actionType: 'proposals'
    },
    {
      id: 'att-2',
      type: 'warning',
      dotColor: 'bg-amber-500',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      badgeText: '🟠 Info Needed',
      title: '1 requirement needs additional information',
      description: 'Clarification needed on target audience size & tech stack details for "Cloud Security Training".',
      category: 'Requirement Brief',
      timestamp: 'Updated 2h ago',
      actionText: 'Update Information',
      actionType: 'requirement'
    },
    {
      id: 'att-3',
      type: 'success',
      dotColor: 'bg-emerald-500',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badgeText: '🟢 Upcoming Event',
      title: 'Leadership program scheduled for 15 September',
      description: 'Batch 2 confirmed with Senior Facilitator Dr. Rajesh Kumar • 45 Participants registered.',
      category: 'Scheduled Program',
      timestamp: '15 Sept 2026',
      actionText: 'View Schedule',
      actionType: 'schedule'
    },
    {
      id: 'att-4',
      type: 'warning',
      dotColor: 'bg-amber-500',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      badgeText: '🟠 Feedback Pending',
      title: 'Feedback pending for Sales Excellence program',
      description: 'Session completed on 5 Sept • 32 participant feedback ratings ready for final review.',
      category: 'Post-Program Review',
      timestamp: 'Completed 5 Sept',
      actionText: 'Provide Feedback',
      actionType: 'feedback'
    }
  ];

  // 2. At a Glance Metrics (Exact user requested fields)
  const atAGlanceMetrics = [
    {
      metric: 'Total Requirements',
      value: '38',
      context: '34 Processed • 4 Active Briefs',
      icon: BookOpen,
      color: 'text-[#1677FF]',
      bgColor: 'bg-[#EEF5FF]'
    },
    {
      metric: 'Completed Programs',
      value: '29',
      context: '96.8% Successful Completion',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      metric: 'Active Programs',
      value: '4',
      context: 'In Execution Across 3 Locations',
      icon: Clock,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      metric: 'Trainers Engaged',
      value: '47',
      context: 'Top 1% Verified Experts',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      metric: 'Training Organizations',
      value: '8',
      context: 'Empaneled Partners & Institutes',
      icon: Building2,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    },
    {
      metric: 'Participants Trained',
      value: '1,240',
      context: '94% Avg Attendance Rate',
      icon: Award,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      metric: 'Total Training Spend',
      value: '₹18,45,000',
      context: 'Within Approved Annual Budget',
      icon: IndianRupee,
      color: 'text-[#0E9F88]',
      bgColor: 'bg-[#E8FAF5]'
    },
    {
      metric: 'Average Trainer Rating',
      value: '4.6 / 5',
      context: '⭐ Based on 890+ Participant Reviews',
      icon: Star,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  return (
    <div className="flex min-h-screen flex-1 bg-[#F4F7FA] px-4 py-6 sm:px-6 lg:px-8 lg:py-8 font-sans text-[#091536]">
      <div className="mx-auto w-full max-w-[1360px] space-y-6">

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#091536] px-5 py-3.5 text-sm font-semibold text-white shadow-2xl animate-fade-in border border-slate-700">
            <CheckCircle2 className="h-5 w-5 text-[#0E9F88]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* TOP BAR / BREADCRUMB HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <span>Corporate Home</span>
              <span className="text-slate-300">/</span>
              <span className="text-[#1677FF] font-black">Overview</span>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#091536]">
                ABC Corporation
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => router.push('/create-requirement')}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0E9F88] px-4 py-2.5 text-xs sm:text-sm font-black text-white shadow-md shadow-[#0E9F88]/20 transition hover:bg-[#0C8975] active:scale-98 cursor-pointer"
            >
              <Plus className="h-4 w-4 stroke-[3]" />
              <span>Post Requirement</span>
            </button>

            {onOpenAiAssistant && (
              <button
                onClick={onOpenAiAssistant}
                className="inline-flex items-center gap-2 rounded-xl border border-[#1677FF]/30 bg-[#EEF5FF] px-4 py-2.5 text-xs sm:text-sm font-black text-[#1677FF] transition hover:bg-[#DDF0FF] cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-[#1677FF]" />
                <span>AI Draft Brief</span>
              </button>
            )}

            <button
              onClick={() => setContactManagerModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs"
            >
              <PhoneCall className="h-4 w-4 text-slate-500" />
              <span>Account Manager</span>
            </button>

            <button
              onClick={() => router.push('/corporate-profile')}
              className="inline-flex items-center gap-2 rounded-xl border border-[#1677FF]/30 bg-[#1677FF] px-4 py-2.5 text-xs sm:text-sm font-black text-white shadow-md hover:bg-[#1562D6] cursor-pointer"
            >
              <Building2 className="h-4 w-4" />
              <span>Corporate Profile & Setup</span>
            </button>
          </div>
        </div>

        {/* CORPORATE OVERVIEW BANNER CARD */}
        <section className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Left: Account Identity */}
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#091536] to-[#1677FF] text-white shadow-md">
                <Building2 className="h-7 w-7" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black text-[#091536]">ABC Corporation</h2>
                  <ShieldCheck className="h-4 w-4 text-[#1677FF]" />
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
                  {/* Account ID */}
                  <div className="flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200">
                    <span className="font-bold text-slate-500">Corporate Account ID:</span>
                    <span className="font-mono font-black text-[#091536]">AT-CORP-00482</span>
                    <button
                      onClick={handleCopyAccountId}
                      title="Copy Account ID"
                      className="ml-1 text-slate-400 hover:text-[#1677FF] transition cursor-pointer"
                    >
                      {copiedAccountId ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  {/* Account Manager */}
                  <div className="flex items-center gap-1.5 bg-[#EEF5FF] px-2.5 py-1 rounded-md border border-[#D0E2FF]">
                    <UserCheck className="h-3.5 w-3.5 text-[#1677FF]" />
                    <span className="font-bold text-slate-600">Account Manager:</span>
                    <span className="font-black text-[#1677FF]">Atlas Team</span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    <span className="font-bold text-emerald-800">Account Status:</span>
                    <span className="font-black text-emerald-700">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Quick Summary Meta */}
            <div className="flex items-center gap-3 sm:gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              <div className="text-center sm:text-right">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Organization Plan</p>
                <p className="text-sm font-black text-[#091536]">Enterprise Pro Tier</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-center sm:text-right">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Assigned L&D Specialist</p>
                <p className="text-sm font-black text-[#1677FF]">Vikram Sharma</p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 1: WHAT NEEDS YOUR ATTENTION? (ACTIONABLE SECTION) */}
        <section className="rounded-2xl border border-red-100 bg-gradient-to-br from-white via-white to-red-50/20 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight text-[#091536]">
                  What needs your attention?
                </h2>
                <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-black text-red-700">
                  4 Action Items
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                Immediate actions requiring review, input, or confirmation from your team
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>Real-time updates</span>
            </div>
          </div>

          {/* Attention Items Grid */}
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {attentionItems.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-black ${item.badgeBg}`}>
                      {item.badgeText}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{item.timestamp}</span>
                  </div>

                  <h3 className="text-sm font-black text-[#091536] leading-snug group-hover:text-[#1677FF] transition">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs font-medium text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {item.category}
                  </span>

                  <button
                    onClick={() => setActiveModal(item.actionType)}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#1677FF] hover:text-[#0f54b8] transition cursor-pointer"
                  >
                    <span>{item.actionText}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: AT A GLANCE (METRICS TABLE & VISUAL CARDS) */}
        <section className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black tracking-tight text-[#091536]">
                At a glance
              </h2>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                Key performance indicators and account summary for ABC Corporation
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-lg transition cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-[#091536] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <TableIcon className="h-3.5 w-3.5" />
                <span>Structured Table</span>
              </button>

              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-lg transition cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-white text-[#091536] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Visual Cards</span>
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: STRUCTURED TABLE VIEW */}
          {viewMode === 'table' ? (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#F8FAFC] text-[11px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="px-5 py-3.5">Metric</th>
                    <th scope="col" className="px-5 py-3.5">Value</th>
                    <th scope="col" className="px-5 py-3.5 hidden md:table-cell">Account Context</th>
                    <th scope="col" className="px-5 py-3.5 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-[#091536]">
                  {atAGlanceMetrics.map((row, idx) => {
                    const IconComp = row.icon;
                    return (
                      <tr key={idx} className="hover:bg-slate-50/80 transition">
                        <td className="px-5 py-3.5 font-bold flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${row.bgColor} ${row.color}`}>
                            <IconComp className="h-4 w-4" />
                          </div>
                          <span>{row.metric}</span>
                        </td>

                        <td className="px-5 py-3.5 font-black text-sm text-[#091536]">
                          {row.metric === 'Average Trainer Rating' ? (
                            <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                              {row.value}
                            </span>
                          ) : row.metric === 'Total Training Spend' ? (
                            <span className="font-mono text-[#0E9F88] font-black">
                              {row.value}
                            </span>
                          ) : (
                            <span className="font-mono font-black text-slate-900">{row.value}</span>
                          )}
                        </td>

                        <td className="px-5 py-3.5 text-xs text-slate-500 font-medium hidden md:table-cell">
                          {row.context}
                        </td>

                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => {
                              if (row.metric.includes('Requirements')) router.push('/requirements');
                              else if (row.metric.includes('Trainers')) router.push('/experts');
                              else if (row.metric.includes('Programs')) router.push('/engagements');
                              else showToast(`Opening ${row.metric} analytics breakdown...`);
                            }}
                            className="text-xs font-black text-[#1677FF] hover:underline cursor-pointer"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* VIEW MODE 2: VISUAL CARDS GRID */
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {atAGlanceMetrics.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-[#F9FAFC] p-4 transition hover:bg-white hover:shadow-sm hover:border-slate-300"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-600">{item.metric}</p>
                      <div className={`p-2 rounded-xl ${item.bgColor} ${item.color}`}>
                        <IconComp className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-2xl font-black tracking-tight text-[#091536]">
                        {item.value}
                      </p>
                      <p className="mt-1 text-[11px] font-medium text-slate-500">
                        {item.context}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </section>

      </div>

      {/* MODAL 1: PROPOSAL DECISION MODAL */}
      {activeModal === 'proposals' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <h3 className="text-lg font-black text-[#091536]">Trainer Proposals Awaiting Decision</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Review and select verified facilitators for your active requirements:
            </p>

            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-black text-[#091536]">Executive Leadership Workshop</h4>
                    <p className="text-xs text-slate-500 font-medium">Trainer: Dr. Rajesh Kumar • 18+ Yrs Exp</p>
                  </div>
                  <span className="font-mono font-black text-[#0E9F88] text-sm">₹65,000 / Day</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      showToast('Proposal from Dr. Rajesh Kumar Accepted!');
                      setActiveModal(null);
                    }}
                    className="rounded-lg bg-[#0E9F88] px-3.5 py-1.5 text-xs font-black text-white hover:bg-[#0C8975] cursor-pointer"
                  >
                    Accept Proposal
                  </button>
                  <button
                    onClick={() => router.push('/messages')}
                    className="rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    Message Trainer
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-black text-[#091536]">Agile Project Management</h4>
                    <p className="text-xs text-slate-500 font-medium">Trainer: Priya Sharma • 12+ Yrs Exp</p>
                  </div>
                  <span className="font-mono font-black text-[#0E9F88] text-sm">₹55,000 / Day</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      showToast('Proposal from Priya Sharma Accepted!');
                      setActiveModal(null);
                    }}
                    className="rounded-lg bg-[#0E9F88] px-3.5 py-1.5 text-xs font-black text-white hover:bg-[#0C8975] cursor-pointer"
                  >
                    Accept Proposal
                  </button>
                  <button
                    onClick={() => router.push('/messages')}
                    className="rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    Message Trainer
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: REQUIREMENT UPDATE MODAL */}
      {activeModal === 'requirement' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-[#091536]">Update Requirement Details</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200">
              <strong>Requirement:</strong> Cloud Security Training<br />
              Please provide target audience cohort details & tech stack focus to finalize trainer matching.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Audience Profile</label>
                <input
                  type="text"
                  defaultValue="50 Mid-level DevOps Engineers"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-semibold focus:border-[#1677FF] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Key Tech Stack / Topics</label>
                <input
                  type="text"
                  defaultValue="AWS, Kubernetes, Terraform"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-semibold focus:border-[#1677FF] outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast('Requirement updated successfully! Facilitators notified.');
                  setActiveModal(null);
                }}
                className="rounded-xl bg-[#1677FF] px-4 py-2 text-xs font-black text-white hover:bg-[#1562D6] cursor-pointer"
              >
                Submit Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: SCHEDULE MODAL */}
      {activeModal === 'schedule' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-black text-[#091536]">Scheduled Program Details</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="rounded-xl bg-emerald-50/80 p-4 border border-emerald-200 space-y-2 text-xs text-emerald-900">
              <h4 className="text-sm font-black text-emerald-950">Executive Leadership Program (Batch 2)</h4>
              <p><strong>Date:</strong> 15 September 2026 • 09:30 AM - 05:00 PM IST</p>
              <p><strong>Facilitator:</strong> Senior Trainer Dr. Rajesh Kumar</p>
              <p><strong>Location / Mode:</strong> In-Person • ABC Corporate Tower, Bengaluru</p>
              <p><strong>Enrolled Roster:</strong> 45 Senior Managers & Directors</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  showToast('Calendar invite & roster exported to email.');
                  setActiveModal(null);
                }}
                className="rounded-xl bg-[#0E9F88] px-4 py-2 text-xs font-black text-white hover:bg-[#0C8975] cursor-pointer"
              >
                Download Roster & Calendar
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: FEEDBACK MODAL */}
      {activeModal === 'feedback' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-[#091536]">Program Feedback Review</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-2">
              <p className="font-bold text-[#091536] text-sm">Sales Excellence Program (Completed 5 Sept)</p>
              <p>Participant Responses Received: <strong>32 / 35 Attendees</strong></p>
              <p>Average Participant Rating: <strong>4.8 / 5 ⭐</strong></p>
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-700">Submit Corporate L&D Score:</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`h-6 w-6 fill-amber-400 text-amber-500`}
                    />
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Overall Remarks / Testimonial</label>
                <textarea
                  rows={3}
                  placeholder="Share feedback on trainer effectiveness, content alignment, and domain impact..."
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-[#1677FF] outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast('Feedback submitted & program marked complete!');
                  setActiveModal(null);
                }}
                className="rounded-xl bg-[#1677FF] px-4 py-2 text-xs font-black text-white hover:bg-[#1562D6] cursor-pointer"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT ACCOUNT MANAGER MODAL */}
      {contactManagerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-[#1677FF]" />
                <h3 className="text-lg font-black text-[#091536]">Contact Atlas Account Team</h3>
              </div>
              <button onClick={() => setContactManagerModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="rounded-xl bg-[#EEF5FF] p-4 border border-[#D0E2FF] text-xs space-y-1.5">
              <p className="font-bold text-[#1677FF]">Dedicated L&D Account Lead: Vikram Sharma</p>
              <p className="text-slate-600">Email: support@atlascircle.com</p>
              <p className="text-slate-600">Direct Line: +91 98765 43210</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Quick Inquiry / Request</label>
              <textarea
                rows={3}
                placeholder="Ask about custom trainer shortlists, bulk pricing, or enterprise SLAs..."
                className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-[#1677FF] outline-hidden"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setContactManagerModalOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast('Message sent to Atlas Account Team! We will get back within 2 hours.');
                  setContactManagerModalOpen(false);
                }}
                className="rounded-xl bg-[#1677FF] px-4 py-2 text-xs font-black text-white hover:bg-[#1562D6] cursor-pointer"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
