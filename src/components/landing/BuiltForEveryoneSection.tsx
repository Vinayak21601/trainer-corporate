'use client';

import { useState } from 'react';
import { BarChart3, CalendarDays, ChevronRight, Globe, GraduationCap, ShieldCheck, Star, TrendingUp, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { LandingButton } from './LandingButton';

interface BuiltForEveryoneSectionProps {
  onExploreExperts: () => void;
}

export function BuiltForEveryoneSection({ onExploreExperts }: BuiltForEveryoneSectionProps) {
  const [chartTimeframe, setChartTimeframe] = useState<'weekly' | 'monthly'>('weekly');

  return (
    <>
      {/* SECTION 3 - "BUILT FOR EVERYONE" GRID */}
      <section id="built-for-everyone" className="mx-auto my-8 w-full max-w-7xl space-y-7 bg-white px-4 py-10 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl space-y-3 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FF] px-4 py-2 text-xs font-black uppercase text-[#176BFF]">
            <Users className="h-4 w-4" />
            Built for everyone
          </span>
          <h2 className="text-[24px] font-extrabold text-[#091536] sm:text-[32px]">
            Built for everyone
          </h2>
          <p className="mx-auto max-w-2xl text-sm font-medium leading-6 text-[#5E6C84] sm:text-base">
            Thousands of businesses, from high-growth startups to enterprises, use Atlas to handle corporate learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[220px_220px_150px]">
        {/* Explicit spans reproduce the asymmetric bento layout on desktop. */}
        <div className="contents">
          
          {/* Card 1: For HR / L&D Professionals */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="flex min-h-[430px] flex-col justify-between space-y-4 rounded-[18px] border border-[#BFD9FF] bg-[#FBFDFF] p-5 shadow-[0_10px_28px_rgba(42,92,132,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(42,92,132,0.10)] lg:col-span-3 lg:row-span-2 lg:min-h-0"
          >
            <div className="space-y-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#EAF4FF] text-[#176BFF]">
                <Users className="h-7 w-7" />
              </div>
              <span className="block text-[10px] font-black uppercase text-[#176BFF]">For HR professionals</span>
              <h3 className="text-xl font-black leading-tight text-[#091536]">Streamline L&amp;D operations</h3>
              <p className="text-xs leading-5 text-[#5E6C84]">
                Use a single hub to plan programs, track attendance, and prove impact.
              </p>
            </div>

            {/* Preview Mini UI Widget */}
            <div className="space-y-3 rounded-[14px] border border-[#E1EAF4] bg-white p-3 shadow-[0_8px_20px_rgba(42,92,132,0.06)]">
              <div className="flex justify-between items-center text-[11px] font-bold">
                <span className="text-[#111111]">Attendance Report</span>
                <div className="flex rounded-[8px] bg-[#F1F5F9] p-0.5 text-[9px]">
                  <button 
                    onClick={() => setChartTimeframe('weekly')}
                    className={`rounded-[6px] px-1.5 py-1 transition-all ${chartTimeframe === 'weekly' ? 'bg-white text-[#091536] shadow-sm' : 'text-[#7A889C]'}`}
                  >
                    Weekly
                  </button>
                  <button 
                    onClick={() => setChartTimeframe('monthly')}
                    className={`rounded-[6px] px-1.5 py-1 transition-all ${chartTimeframe === 'monthly' ? 'bg-white text-[#091536] shadow-sm' : 'text-[#7A889C]'}`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Animated attendance chart */}
              <div className="relative h-32 pl-7 pt-1">
                <div className="absolute inset-x-7 bottom-5 top-1 flex flex-col justify-between">
                  {[100, 75, 50, 25, 0].map((value) => (
                    <div key={value} className="relative border-t border-[#E9EFF6]">
                      <span className="absolute -left-7 -top-1.5 w-5 text-right text-[7px] font-semibold text-[#7A889C]">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="absolute inset-x-7 bottom-0 top-1 flex items-end justify-between gap-1.5">
                  {(chartTimeframe === 'weekly'
                    ? [50, 72, 18, 58, 68, 96, 77]
                    : [62, 84, 47, 76, 91, 69, 88]
                  ).map((height, index) => {
                    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                    const strongBars = [0, 4, 6];
                    return (
                      <div key={`${chartTimeframe}-${days[index]}`} className="flex h-full min-w-0 flex-1 flex-col justify-end">
                        <div className="flex h-[105px] items-end justify-center">
                          <motion.div
                            initial={{ height: 0, opacity: 0.45 }}
                            whileInView={{ height: `${height}%`, opacity: 1 }}
                            viewport={{ once: true, amount: 0.45 }}
                            transition={{ duration: 0.65, delay: index * 0.08, ease: 'easeOut' }}
                            whileHover={{ scaleX: 1.12 }}
                            className={`w-full max-w-4 rounded-t-[2px] ${
                              strongBars.includes(index) ? 'bg-[#176BFF]' : index === 2 || index === 5 ? 'bg-[#BDE8FF]' : 'bg-[#78B7FF]'
                            }`}
                          />
                        </div>
                        <span className="mt-1 text-center text-[7px] font-semibold text-[#53617A]">{days[index]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: For Managers & Leaders */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="flex min-h-[430px] flex-col justify-between gap-5 rounded-[18px] border border-[#FFD8BE] bg-[#FFFEFC] p-5 shadow-[0_10px_28px_rgba(42,92,132,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(42,92,132,0.10)] lg:col-span-5 lg:col-start-4 lg:row-start-1 lg:min-h-0 lg:flex-row lg:items-center"
          >
            <div className="space-y-3 lg:flex lg:w-[48%] lg:items-start lg:gap-4 lg:space-y-0">
              <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#FFF1E7] text-[#FF6B1A]">
                <TrendingUp className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <span className="block text-[10px] font-black uppercase text-[#F46616]">For managers &amp; leaders</span>
                <h3 className="text-xl font-black leading-tight text-[#091536]">Drive team performance</h3>
                <p className="text-xs leading-5 text-[#5E6C84]">
                  Get data-driven insights and monitor workshop completion.
                </p>
              </div>
            </div>

            {/* Preview Mini UI Widget */}
            <div className="space-y-4 rounded-[14px] border border-[#F0E2D8] bg-white p-4 shadow-[0_8px_20px_rgba(42,92,132,0.06)] lg:w-[48%]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111111]">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFF1E7] text-[#FF6B1A]">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <span>Access Real-Time Insights</span>
              </div>

              <div className="space-y-3 border-t border-[#E7EEF6] pt-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#526179]">Cohort Satisfaction</span>
                  <span className="font-extrabold text-[#FF6B1A]">94.2%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#FFE8D8]">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "94.2%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-[#FF6B1A]"
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: For Legal & Procurement */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="flex min-h-[430px] flex-col justify-between gap-5 rounded-[18px] border border-[#BFEBD9] bg-[#FBFFFD] p-5 shadow-[0_10px_28px_rgba(42,92,132,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(42,92,132,0.10)] lg:col-span-5 lg:col-start-4 lg:row-start-2 lg:min-h-0 lg:flex-row lg:items-center"
          >
            <div className="space-y-3 lg:flex lg:w-[52%] lg:items-start lg:gap-4 lg:space-y-0">
              <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#E7FAF3] text-[#13B981]">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <span className="block text-[10px] font-black uppercase text-[#13A875]">For legal &amp; finance teams</span>
                <h3 className="text-xl font-black leading-tight text-[#091536]">Ensure compliance &amp; skills</h3>
                <p className="text-xs leading-5 text-[#5E6C84]">
                  Find trainers for compliance, KSE contracts, and sector-specific topics.
                </p>
              </div>
            </div>

            {/* Preview Mini UI Widget */}
            <div className="space-y-4 rounded-[14px] border border-[#D5EFE4] bg-white p-4 shadow-[0_8px_20px_rgba(42,92,132,0.06)] lg:w-[44%]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111111]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E7FAF3]">
                  <ShieldCheck className="h-5 w-5 text-[#13B981]" />
                </span>
                <span>Compliance Ready</span>
              </div>
              <p className="text-xs leading-5 text-[#5E6C84]">
                Enterprise-grade compliance and certified training.
              </p>
            </div>
          </motion.div>

        </div>

        <div className="contents">
          
          {/* Card 4 (Wide 7 cols): All Trainer Data at Once */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex min-h-[430px] flex-col justify-between space-y-4 rounded-[18px] border border-[#DCCBFF] bg-[#FEFCFF] p-5 shadow-[0_10px_28px_rgba(42,92,132,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(42,92,132,0.10)] lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:min-h-0"
          >
            <div className="space-y-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#F2EAFE] text-[#7C3AED]">
                <GraduationCap className="h-7 w-7" />
              </div>
              <span className="block text-[10px] font-black uppercase text-[#7C3AED]">All trainer data in one place</span>
              <h3 className="text-xl font-black leading-tight text-[#091536]">Your trainer intelligence hub</h3>
              <p className="text-xs leading-5 text-[#5E6C84]">
                Consolidate profiles, ratings, rates, and past performance in one place.
              </p>
            </div>

            {/* Table Preview */}
            <div className="space-y-2 rounded-[14px] border border-[#E1EAF4] bg-white p-3 shadow-[0_8px_20px_rgba(42,92,132,0.06)]">
              <div className="border-b border-[#E7EEF6] pb-2 text-[11px] font-black text-[#091536]">Top Rated Trainers</div>

              <div className="divide-y divide-[#E7EEF6]">
                {[
                  { name: 'Meher K.', domain: 'Leadership' },
                  { name: 'Karan R.', domain: 'Behavioral' },
                  { name: 'David F.', domain: 'Agile Coaching' }
                ].map((trainer, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ scale: 1.01, x: 2 }}
                    className="flex items-center justify-between gap-2 py-2 text-xs transition-all"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAF4FF] text-[10px] font-black text-[#176BFF]">
                        {trainer.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-bold text-[#091536]">{trainer.name}</div>
                        <div className="truncate text-[9px] font-medium text-[#7A889C]">{trainer.domain}</div>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-0.5">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star key={star} className="h-2.5 w-2.5 fill-[#FFB000] text-[#FFB000]" />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() => onExploreExperts()}
                className="flex w-full items-center justify-center gap-1.5 border-t border-[#E7EEF6] pt-2 text-[10px] font-bold text-[#7C3AED]"
              >
                View all trainers
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 5 (5 cols): For Teams & Employees */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex min-h-[300px] flex-col justify-between gap-5 rounded-[18px] border border-[#BFDFFF] bg-[#FBFDFF] p-5 shadow-[0_10px_28px_rgba(42,92,132,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(42,92,132,0.10)] sm:col-span-2 lg:col-span-12 lg:row-start-3 lg:min-h-0 lg:flex-row lg:items-center"
          >
            <div className="space-y-3 lg:flex lg:w-[35%] lg:items-center lg:gap-5 lg:space-y-0">
              <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#E8F6FF] text-[#0796D2]">
                <CalendarDays className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <span className="block text-[10px] font-black uppercase text-[#0796D2]">For teams &amp; employees</span>
                <h3 className="text-xl font-black leading-tight text-[#091536]">Learning that fits your flow</h3>
                <p className="text-xs leading-5 text-[#5E6C84]">
                  Book training, track progress, and access materials anytime.
                </p>
              </div>
            </div>

            <div className="space-y-3 rounded-[14px] border border-[#D9E9F8] bg-white p-4 shadow-[0_8px_20px_rgba(42,92,132,0.06)] lg:grid lg:w-[62%] lg:grid-cols-[1fr_auto] lg:items-center lg:gap-x-8 lg:space-y-0">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#0796D2]">
                <CalendarDays className="h-3.5 w-3.5" />
                Upcoming Workshop
              </div>
              <div className="text-sm font-black text-[#091536]">Effective Communication</div>
              <div className="text-[10px] font-medium text-[#6B7890]">May 24, 2025 - 10:00 AM</div>
              <LandingButton
                onClick={onExploreExperts}
                className="w-full lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:w-auto"
                endIcon={<ChevronRight className="h-3.5 w-3.5" />}
              >
                Join Session
              </LandingButton>
            </div>
          </motion.div>

        </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.45 }}
          className="hidden"
        >
          <div className="flex items-center gap-4 py-2 lg:border-r lg:border-[#DCE8F3] lg:pr-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#DDEEFF] text-[#176BFF]">
              <BarChart3 className="h-6 w-6" />
            </span>
            <div>
              <div className="text-lg font-black text-[#091536]">One platform. Endless impact.</div>
              <div className="mt-1 text-xs font-medium text-[#5E6C84]">Everything you need to train, engage and grow your people.</div>
            </div>
          </div>

          {[
            { value: '160+', label: 'Integrations', color: 'text-[#176BFF]', icon: Users, iconBg: 'bg-[#EAF4FF]' },
            { value: '$1.8M', label: 'Saved Monthly', color: 'text-[#13B981]', icon: TrendingUp, iconBg: 'bg-[#E7FAF3]' },
            { value: '200+', label: 'Countries Available', color: 'text-[#7C3AED]', icon: Globe, iconBg: 'bg-[#F2EAFE]' }
          ].map((metric) => {
            const MetricIcon = metric.icon;
            return (
              <div key={metric.label} className="flex items-center gap-3 border-t border-[#DCE8F3] py-4 sm:border-t-0 sm:px-4 lg:border-l-0 lg:border-r lg:last:border-r-0">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${metric.iconBg} ${metric.color}`}>
                  <MetricIcon className="h-5 w-5" />
                </span>
                <div>
                  <div className={`text-2xl font-black ${metric.color}`}>{metric.value}</div>
                  <div className="text-xs font-semibold text-[#5E6C84]">{metric.label}</div>
                </div>
              </div>
            );
          })}
        </motion.div>

      </section>
    </>
  );
}
