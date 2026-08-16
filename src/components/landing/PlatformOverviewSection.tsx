'use client';

import {
  ArrowRight,
  BarChart3,
  Bell,
  Bookmark,
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  FileText,
  Layers,
  Settings,
  TrendingUp,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';
import { LandingButton } from './LandingButton';
import { SectionHeading } from './SectionHeading';

interface PlatformOverviewSectionProps {
  onExploreExperts: () => void;
}

export function PlatformOverviewSection({ onExploreExperts }: PlatformOverviewSectionProps) {
  return (
    <>
      {/* PLATFORM OVERVIEW */}
      <section className="mx-auto w-full max-w-7xl space-y-7 px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Platform overview"
          title="Manage learning with complete visibility"
          description="Coordinate experts, workshops, participants, and performance from one focused operating system."
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="grid gap-4 lg:grid-cols-[minmax(330px,0.32fr)_minmax(0,0.68fr)]"
        >
          <div className="flex min-h-[500px] flex-col justify-center rounded-[22px] border border-[#DCE9F8] bg-[linear-gradient(135deg,#F4F8FF,#ECF4FF)] p-6 sm:p-8 lg:p-7 xl:p-8">
            <span className="inline-flex w-fit rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase text-[#176BFF] shadow-sm">
              Powerful platform
            </span>
            <h2 className="mt-5 max-w-xl text-[30px] font-black leading-[1.16] text-[#091536] sm:text-[34px] lg:text-[30px] xl:text-[34px]">
              Everything you need to manage learning at scale
            </h2>

            <div className="mt-6 space-y-3.5">
              {[
                'AI-powered trainer matching & shortlisting',
                'End-to-end workshop planning & scheduling',
                'Real-time analytics & actionable insights',
                'Ratings, feedback & performance tracking',
                'Reports that prove learning impact'
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="flex items-center gap-3 text-[13px] font-semibold text-[#18325E] xl:text-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#10B96E] text-white shadow-[0_6px_14px_rgba(16,185,110,0.22)]">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>

            <LandingButton
              onClick={onExploreExperts}
              className="mt-7"
              endIcon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              Explore the Platform
            </LandingButton>
          </div>

          <div className="min-h-[500px] overflow-hidden rounded-[22px] border border-[#DCE7F3] bg-white shadow-[0_20px_55px_rgba(42,92,132,0.09)]">
            <div className="grid min-h-[500px] lg:grid-cols-[158px_1fr]">
              <aside className="hidden border-r border-[#E5ECF4] bg-[#FCFDFF] p-4 lg:block">
                <div className="mb-6 flex items-center gap-2 px-2 pt-1">
                  <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#18BFA5] text-sm font-black text-white">A</span>
                  <span className="text-xl font-black text-[#091536]">Atlas</span>
                </div>

                <nav className="space-y-1.5" aria-label="Platform dashboard preview">
                  {[
                    { label: 'Overview', icon: Layers, active: true },
                    { label: 'Trainers', icon: Users },
                    { label: 'Workshops', icon: CalendarDays },
                    { label: 'Bookings', icon: Bookmark },
                    { label: 'Analytics', icon: BarChart3 },
                    { label: 'Reports', icon: FileText },
                    { label: 'Settings', icon: Settings }
                  ].map(({ label, icon: NavIcon, active }) => (
                    <div
                      key={label}
                      className={`flex items-center gap-2.5 rounded-[9px] px-2.5 py-2.5 text-xs font-bold ${
                        active ? 'bg-[#EAF3FF] text-[#176BFF]' : 'text-[#53617A]'
                      }`}
                    >
                      <NavIcon className="h-4 w-4" />
                      <span>{label}</span>
                    </div>
                  ))}
                </nav>
              </aside>

              <div className="min-w-0 p-4 xl:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-[#091536] xl:text-[22px]">Welcome back, Alex!</h3>
                    <p className="mt-0.5 text-xs font-medium text-[#6B7890]">Here&apos;s what&apos;s happening with your learning programs.</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 text-[#53617A]">
                    <Bell className="h-4 w-4" />
                    <CircleHelp className="hidden h-4 w-4 sm:block" />
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1746C8] text-xs font-black text-white">A</span>
                    <span className="hidden text-xs font-bold text-[#091536] sm:block">Alex</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
                  {[
                    { label: 'Total Workshops', value: '256', change: '12%' },
                    { label: 'Participants Trained', value: '8,420', change: '18%' },
                    { label: 'Completion Rate', value: '92%', change: '9%' },
                    { label: 'Satisfaction Score', value: '4.8 / 5', change: '0.3' }
                  ].map((stat) => (
                    <div key={stat.label} className="min-h-[96px] rounded-[12px] border border-[#E3EAF2] bg-white p-3.5 shadow-[0_6px_18px_rgba(42,92,132,0.05)]">
                      <div className="text-[10px] font-bold text-[#53617A]">{stat.label}</div>
                      <div className="mt-2 text-[22px] font-black text-[#091536]">{stat.value}</div>
                      <div className="mt-1.5 flex items-center gap-1 text-[9px] font-bold text-[#12A968]">
                        <TrendingUp className="h-3 w-3" />
                        <span>{stat.change}</span>
                        <span className="font-medium text-[#7A889C]">vs last month</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
                  <div className="rounded-[14px] border border-[#E3EAF2] bg-white p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-[#091536]">Workshop Trend</span>
                      <span className="text-[9px] font-semibold text-[#6B7890]">This Month</span>
                    </div>
                    <svg viewBox="0 0 520 230" className="mt-2 h-[190px] w-full" role="img" aria-label="Workshop trend chart">
                      <defs>
                        <linearGradient id="platformTrendArea" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#176BFF" stopOpacity="0.24" />
                          <stop offset="100%" stopColor="#176BFF" stopOpacity="0.02" />
                        </linearGradient>
                      </defs>
                      {[45, 90, 135, 180].map((y, index) => (
                        <g key={y}>
                          <line x1="36" x2="510" y1={y} y2={y} stroke="#E8EEF5" />
                          <text x="2" y={y + 4} fill="#7A889C" fontSize="11">{100 - index * 25}</text>
                        </g>
                      ))}
                      <motion.path
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.35 }}
                        d="M42 170 L82 142 L120 137 L160 108 L198 142 L236 134 L276 86 L314 103 L352 90 L390 72 L428 96 L462 77 L492 38 L510 58 L510 190 L42 190 Z"
                        fill="url(#platformTrendArea)"
                      />
                      <motion.path
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                        d="M42 170 L82 142 L120 137 L160 108 L198 142 L236 134 L276 86 L314 103 L352 90 L390 72 L428 96 L462 77 L492 38 L510 58"
                        fill="none"
                        stroke="#176BFF"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {[42, 82, 120, 160, 198, 236, 276, 314, 352, 390, 428, 462, 492, 510].map((x, index) => {
                        const points = [170, 142, 137, 108, 142, 134, 86, 103, 90, 72, 96, 77, 38, 58];
                        return (
                          <motion.circle
                            key={x}
                            cx={x}
                            cy={points[index]}
                            r="4.5"
                            fill="#176BFF"
                            stroke="white"
                            strokeWidth="2"
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.25, delay: 0.25 + index * 0.085 }}
                          />
                        );
                      })}
                      <motion.circle
                        cx="510"
                        cy="58"
                        r="8"
                        fill="none"
                        stroke="#176BFF"
                        strokeWidth="2"
                        animate={{ r: [6, 13, 6], opacity: [0.65, 0, 0.65] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                      />
                      <motion.line
                        x1="42"
                        x2="42"
                        y1="32"
                        y2="190"
                        stroke="#176BFF"
                        strokeWidth="1"
                        strokeDasharray="4 5"
                        animate={{ x1: [42, 510], x2: [42, 510], opacity: [0, 0.24, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
                      />
                      <text x="42" y="218" fill="#6B7890" fontSize="11">May 1</text>
                      <text x="155" y="218" fill="#6B7890" fontSize="11">May 8</text>
                      <text x="272" y="218" fill="#6B7890" fontSize="11">May 15</text>
                      <text x="388" y="218" fill="#6B7890" fontSize="11">May 22</text>
                      <text x="472" y="218" fill="#6B7890" fontSize="11">May 29</text>
                    </svg>
                  </div>

                  <div className="rounded-[14px] border border-[#E3EAF2] bg-white p-4">
                    <div className="text-sm font-black text-[#091536]">Top Categories</div>
                    <div className="text-[10px] font-medium text-[#7A889C]">By Workshops</div>
                    <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:justify-center xl:items-center">
                      <div className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#176BFF_0_35%,#18BFA5_35%_60%,#38C696_60%_80%,#FFB000_80%_90%,#FF7626_90%_100%)]">
                        <div className="flex h-[88px] w-[88px] flex-col items-center justify-center rounded-full bg-white">
                          <span className="text-[22px] font-black text-[#091536]">256</span>
                          <span className="text-[10px] font-semibold text-[#7A889C]">Total</span>
                        </div>
                      </div>
                      <div className="w-full space-y-2.5 text-[10px] font-semibold text-[#24324A]">
                        {[
                          ['Leadership', '35%', '#176BFF'],
                          ['Communication', '25%', '#18BFA5'],
                          ['Compliance', '20%', '#38C696'],
                          ['Sales', '10%', '#FFB000'],
                          ['Other', '10%', '#FF7626']
                        ].map(([label, value, color]) => (
                          <div key={label} className="flex items-center justify-between gap-4">
                            <span className="flex items-center gap-2">
                              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                              {label}
                            </span>
                            <span className="font-black text-[#091536]">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
