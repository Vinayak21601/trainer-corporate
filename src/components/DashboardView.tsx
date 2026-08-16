'use client';

import React from 'react';
import { Bell, CircleHelp, TrendingUp } from 'lucide-react';
import { Trainer, Requirement, Conversation } from '../types';

interface DashboardViewProps {
  requirements: Requirement[];
  shortlistCount: number;
  conversations: Conversation[];
  featuredTrainers: Trainer[];
  setActiveView: (view: string) => void;
  onSelectTrainer: (trainer: Trainer) => void;
  onOpenAiAssistant: () => void;
}

const chartPoints = [[48, 156], [96, 126], [144, 122], [192, 82], [240, 128], [288, 119], [336, 54], [384, 76], [432, 61], [480, 41], [528, 72], [576, 34], [612, 8], [632, 29]];
const linePath = chartPoints.map(([x, y], index) => `${index ? 'L' : 'M'}${x} ${y}`).join(' ');

export const DashboardView: React.FC<DashboardViewProps> = () => {
  const stats = [
    { label: 'Total Workshops', value: '256', change: '12%' },
    { label: 'Participants Trained', value: '8,420', change: '18%' },
    { label: 'Completion Rate', value: '92%', change: '9%' },
    { label: 'Satisfaction Score', value: '4.8 / 5', change: '0.3' },
  ];

  return (
    <div className="flex min-h-screen flex-1 bg-[#F5F7FA] px-5 py-6 sm:px-7 lg:px-6 lg:py-7">
      <div className="mx-auto w-full max-w-[1280px]">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-extrabold leading-tight tracking-[-0.02em] text-[#071638] md:text-[28px]">Welcome back, Alex!</h1>
            <p className="mt-1 text-sm font-medium text-[#5F7290] md:text-[15px]">Here&apos;s what&apos;s happening with your learning programs.</p>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-[#536681]">
            <button className="relative rounded-full p-2 transition hover:bg-white"><Bell className="h-5 w-5" /><span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-[#1967E8]" /></button>
            <button className="hidden rounded-full p-2 transition hover:bg-white sm:block"><CircleHelp className="h-5 w-5" /></button>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1749BD] text-sm font-black text-white">A</span>
            <span className="hidden text-sm font-black text-[#071638] sm:block">Alex</span>
          </div>
        </header>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="min-h-[132px] rounded-[15px] border border-[#D4DEE9] bg-white p-5 shadow-[0_5px_18px_rgba(42,74,112,0.045)]">
              <p className="text-[12px] font-black text-[#314361]">{stat.label}</p>
              <p className="mt-4 text-[28px] font-black leading-none tracking-[-0.02em] text-[#071638]">{stat.value}</p>
              <p className="mt-4 flex items-center gap-1 text-[10px] font-bold text-[#009B59]"><TrendingUp className="h-3.5 w-3.5" /><span>{stat.change}</span><span className="ml-0.5 font-medium text-[#697B96]">vs last month</span></p>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <section className="min-h-[360px] rounded-[16px] border border-[#D4DEE9] bg-white p-5 shadow-[0_5px_18px_rgba(42,74,112,0.035)] sm:p-6">
            <div className="flex items-center justify-between"><h2 className="text-[17px] font-black text-[#071638]">Workshop Trend</h2><span className="text-[10px] font-medium text-[#52647F]">This Month</span></div>
            <svg viewBox="0 0 660 225" className="mt-12 h-[225px] w-full" role="img" aria-label="Workshop trend line chart">
              <defs><linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#176BFF" stopOpacity="0.24" /><stop offset="100%" stopColor="#176BFF" stopOpacity="0.025" /></linearGradient></defs>
              {[25, 75, 125, 175].map((value, index) => <g key={value}><line x1="48" x2="632" y1={176 - index * 50} y2={176 - index * 50} stroke="#E4EAF1" /><text x="2" y={180 - index * 50} fill="#75849A" fontSize="9">{value}</text></g>)}
              <line x1="336" x2="336" y1="12" y2="176" stroke="#BED1EB" strokeDasharray="4 4" />
              <path d={`${linePath} L632 176 L48 176 Z`} fill="url(#trendFill)" />
              <path d={linePath} fill="none" stroke="#176BFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              {chartPoints.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="4.5" fill="#176BFF" stroke="white" strokeWidth="2" />)}
              <circle cx="632" cy="29" r="8" fill="#BBD6FF" stroke="#176BFF" strokeWidth="2" />
              {['May 1', 'May 8', 'May 15', 'May 22', 'May 29'].map((label, index) => <text key={label} x={48 + index * 142} y="211" fill="#62738E" fontSize="9">{label}</text>)}
            </svg>
          </section>

          <section className="min-h-[360px] rounded-[16px] border border-[#D4DEE9] bg-white p-5 shadow-[0_5px_18px_rgba(42,74,112,0.035)] sm:p-6">
            <h2 className="text-[17px] font-black text-[#071638]">Top Categories</h2><p className="mt-0.5 text-xs font-medium text-[#657693]">By Workshops</p>
            <div className="flex min-h-[280px] flex-col items-center justify-center gap-9 sm:flex-row">
              <div className="flex h-[190px] w-[190px] shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#1E65E8_0_35%,#18AD9A_35%_60%,#31AF84_60%_80%,#F0A000_80%_90%,#ED681D_90%_100%)]">
                <div className="flex h-[116px] w-[116px] flex-col items-center justify-center rounded-full bg-white"><span className="text-[29px] font-black text-[#071638]">256</span><span className="mt-1 text-xs font-medium text-[#67758C]">Total</span></div>
              </div>
              <div className="w-full max-w-[230px] space-y-4 text-xs font-medium text-[#071638]">
                {[
                  ['Leadership', '35%', '#1E65E8'], ['Communication', '25%', '#18AD9A'], ['Compliance', '20%', '#31AF84'], ['Sales', '10%', '#F0A000'], ['Other', '10%', '#ED681D'],
                ].map(([label, value, color]) => <div key={label} className="flex items-center justify-between gap-6"><span className="flex items-center gap-2.5"><span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />{label}</span><span className="font-black">{value}</span></div>)}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
