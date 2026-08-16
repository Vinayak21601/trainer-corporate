'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  BarChart3,
  Building2,
  CheckCircle2,
  FileText,
  GraduationCap,
  MonitorSmartphone,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { landingTestimonials as testimonials } from './landingData';
import { LandingButton } from './LandingButton';
import { SectionHeading } from './SectionHeading';
import { SearchFilterDropdown } from './SearchFilterDropdown';

interface LandingHeroProps {
  onExploreExperts: (domain?: string, query?: string, delivery?: string) => void;
  onCreateRequirement: () => void;
  onOpenAiAssistant: () => void;
  featuredTrainerCount: number;
}

export function LandingHero({ onExploreExperts, onCreateRequirement, onOpenAiAssistant, featuredTrainerCount }: LandingHeroProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [deliveryMode, setDeliveryMode] = useState('');
  const [activeHeroTab, setActiveHeroTab] = useState<'solutions' | 'matchmaking' | 'pool'>('solutions');
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onExploreExperts(selectedDomain || undefined, searchQuery, deliveryMode || undefined);
  };

  return (
    <>
      {/* HERO SECTION 1 */}
      <section id="hero-section" className="relative space-y-8">
        <div className="relative w-full overflow-hidden bg-transparent pb-4 pt-4 sm:pt-7 lg:min-h-[610px] lg:pt-9">

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="max-w-[620px] space-y-4 text-left sm:space-y-5"
            >
              <span className="inline-flex rounded-full bg-[#EAF4FF] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#2584FF] shadow-sm">
                AI-powered marketplace
              </span>
              <h1 className="atlas-display max-w-[660px] text-[30px] font-extrabold leading-[1.12] text-[#081536] min-[380px]:text-[32px] sm:text-[38px] lg:text-[42px] xl:text-[44px]">
                Experience seamless trainer matching for{' '}
                <span className="box-decoration-clone rounded-xl bg-[#95F2D8] px-2 py-0.5 text-[#082733] sm:inline-block sm:rounded-full sm:px-4 sm:py-1 sm:whitespace-nowrap">
                  modern L&amp;D teams
                </span>
              </h1>
              <p className="max-w-xl text-[13px] font-medium leading-6 text-[#5A6680] sm:text-[15px] sm:leading-7">
                Atlas is a modern, all-in-one corporate facilitator marketplace designed to perfectly fit your enterprise learning needs.
              </p>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <LandingButton
                  onClick={onCreateRequirement}
                  variant="secondary"
                  className="w-full sm:w-auto"
                  endIcon={<ArrowRight className="h-3.5 w-3.5" />}
                >
                 Join as Corporate
                </LandingButton>
              </div>

            </motion.div>

            <div className="relative mx-auto grid w-full max-w-[520px] grid-cols-3 overflow-hidden rounded-[18px] border border-[#E1E9F2] bg-white/90 p-2 shadow-[0_14px_34px_rgba(28,57,96,0.10)] sm:block sm:min-h-[390px] sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none lg:min-h-[455px]">
              <div className="absolute inset-x-8 bottom-8 top-10 hidden rounded-[40px] bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.76),rgba(232,248,255,0.24)_45%,transparent_70%)] sm:block" />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4 }}
                className="relative w-full border-r border-[#E5EAF1] bg-transparent p-2 text-left sm:absolute sm:left-8 sm:top-4 sm:w-[178px] sm:rounded-[18px] sm:border sm:border-[#E7EDF5] sm:bg-white sm:p-4 sm:shadow-[0_24px_60px_rgba(28,57,96,0.14)] lg:left-2"
              >
                <div className="min-h-6 text-[8px] font-bold leading-3 text-[#58647C] sm:min-h-0 sm:text-[11px]">Match Accuracy</div>
                <div className="atlas-display mt-1.5 text-[22px] font-black text-[#0A1638] sm:mt-4 sm:text-4xl">98%</div>
                <svg viewBox="0 0 150 54" className="mt-3 hidden h-14 w-full sm:block" role="img" aria-label="Match accuracy trend">
                  <motion.path
                    d="M4 42 C22 39 31 35 43 26 C57 15 65 17 78 18 C95 20 98 8 112 6 C126 4 134 5 146 0"
                    fill="none"
                    stroke="#26C88D"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.25, delay: 0.35, ease: 'easeOut' }}
                  />
                </svg>
                <div className="mt-2 text-[8px] font-bold text-[#15977E] sm:mt-3 sm:text-[10px] sm:text-[#58647C]">Industry leading</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, delay: 0.06 }}
                className="relative w-full border-r border-[#E5EAF1] bg-transparent p-2 text-left sm:absolute sm:right-8 sm:top-9 sm:w-[170px] sm:rounded-[18px] sm:border sm:border-[#E7EDF5] sm:bg-white sm:p-4 sm:shadow-[0_24px_60px_rgba(28,57,96,0.14)] lg:right-2"
              >
                <div className="min-h-6 text-[8px] font-bold leading-3 text-[#58647C] sm:min-h-0 sm:text-[11px]">Workshops Managed</div>
                <div className="atlas-display mt-1.5 text-[22px] font-black text-[#0A1638] sm:mt-4 sm:text-4xl">
                  1.2K<span className="text-[#13CBAF]">+</span>
                </div>
                <div className="mt-7 hidden h-10 items-end gap-3 sm:flex">
                  {[18, 28, 21, 36, 44, 30, 50].map((height, index) => (
                    <motion.span
                      key={index}
                      className="w-1.5 origin-bottom rounded-full bg-[#2A83FF]"
                      style={{ height }}
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{ duration: 0.38, delay: 0.3 + index * 0.08, ease: 'easeOut' }}
                    />
                  ))}
                </div>
                <div className="mt-2 text-[8px] font-bold text-[#176BFF] sm:hidden">1,200+ delivered</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="relative w-full bg-transparent p-2 text-left sm:absolute sm:bottom-4 sm:left-[calc(50%_-_85px)] sm:w-[170px] sm:rounded-[18px] sm:border sm:border-[#E7EDF5] sm:bg-white sm:p-4 sm:shadow-[0_24px_60px_rgba(28,57,96,0.14)] lg:bottom-12"
              >
                <div className="min-h-6 text-[8px] font-bold leading-3 text-[#58647C] sm:min-h-0 sm:text-[11px]">Active Trainers</div>
                <div className="atlas-display mt-1.5 text-[22px] font-black text-[#0A1638] sm:mt-3 sm:text-4xl">
                  24K<span className="text-[#13CBAF]">+</span>
                </div>
                <svg viewBox="0 0 150 42" className="mt-3 hidden h-10 w-full sm:block" role="img" aria-label="Active trainers trend">
                  <motion.path
                    d="M5 31 L24 35 L43 23 L61 28 L80 17 L99 22 L119 10 L143 15"
                    fill="none"
                    stroke="#26C88D"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.55, ease: 'easeOut' }}
                  />
                </svg>
                <div className="mt-2 text-[8px] font-black text-[#1FC88F] sm:text-[10px]">+18% this month</div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-10 mt-6 grid grid-cols-2 gap-2 overflow-hidden rounded-[18px] bg-white/88 p-2 shadow-[0_18px_42px_rgba(43,74,111,0.09)] backdrop-blur-xl sm:mt-8 sm:rounded-[22px] lg:grid-cols-[1.45fr_repeat(4,1fr)] lg:shadow-[0_22px_55px_rgba(43,74,111,0.11)]"
          >
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ duration: 0.42, delay: 0.42, ease: 'easeOut' }}
              className="relative col-span-2 flex min-w-0 items-center gap-3 rounded-[14px] bg-[linear-gradient(135deg,#F7FBFF,#FFFFFF)] px-3 py-3 shadow-[0_8px_20px_rgba(43,74,111,0.05)] sm:gap-4 sm:px-4 sm:py-3.5 lg:col-span-1 lg:rounded-[16px]"
            >
              <div className="flex shrink-0 -space-x-3">
                {testimonials.map((item) => (
                  <img key={item.id} src={item.avatar} alt={item.name} className="h-10 w-10 rounded-full border-2 border-white object-cover" />
                ))}
                <motion.span
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#EAF4FF] text-[10px] font-black text-[#2584FF] shadow-sm"
                >
                  +5k
                </motion.span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black text-[#122044]">Active users 5,000+</div>
                <div className="text-[10px] font-semibold text-[#6A7690]">Join thousands growing faster with Atlas.</div>
              </div>
            </motion.div>

            {[
              { icon: Sparkles, title: 'AI-powered matches', detail: 'Find the perfect fit', color: 'text-[#11C7B7] bg-[#E8FFFB]' },
              { icon: ShieldCheck, title: 'Enterprise secure', detail: 'Data you can trust', color: 'text-[#287BFF] bg-[#EEF5FF]' },
              { icon: Award, title: 'Verified experts', detail: 'Top 1% facilitators', color: 'text-[#287BFF] bg-[#EEF5FF]' },
              { icon: Zap, title: 'End-to-end support', detail: 'From brief to success', color: 'text-[#FFB000] bg-[#FFF8DB]' }
            ].map(({ icon: Icon, title, detail, color }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, scale: 1.02, backgroundColor: '#FFFFFF' }}
                transition={{ duration: 0.38, delay: 0.48 + index * 0.09, ease: 'easeOut' }}
                className="group flex min-w-0 items-center gap-2 rounded-[14px] bg-[#F9FCFF] px-2.5 py-3 shadow-[0_8px_20px_rgba(43,74,111,0.04)] sm:gap-3 sm:px-3 sm:py-3.5 lg:rounded-[16px]"
              >
                <motion.span
                  whileHover={{ scale: 1.13, rotate: 6 }}
                  transition={{ type: 'spring', stiffness: 340, damping: 18 }}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${color}`}
                >
                  <Icon className="h-4 w-4" />
                </motion.span>
                <span className="min-w-0">
                  <span className="block text-[9px] font-black leading-3 text-[#122044] sm:text-[10px]">{title}</span>
                  <span className="mt-0.5 block text-[9px] font-semibold text-[#6A7690]">{detail}</span>
                </span>
              </motion.div>
            ))}
          </motion.div>
          </div>
        </div>
        
        {/* HERO SECTION 2 - Interactive Solution Feature Switch */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-4 max-w-7xl overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#FFFFFF_0%,#F7FBFF_58%,#EEF8FF_100%)] p-5  sm:mx-6 sm:p-7 lg:mx-auto"
        >
          <motion.div
            aria-hidden="true"
            animate={{ x: ['-15%', '115%'] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            className="pointer-events-none absolute top-0 h-px w-40 bg-[linear-gradient(90deg,transparent,#43B5FF,transparent)]"
          />

          <SectionHeading
            eyebrow="Corporate trainer search"
            title="Find the right trainer for your team"
            description="Search verified corporate facilitators by expertise, program outcome, delivery mode, and location—then compare the strongest matches."
          />
           
          <div className="relative z-10 mt-6 grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
            <div className="flex min-w-0 flex-col justify-between">

          <AnimatePresence mode="wait">
            {activeHeroTab === 'solutions' && (
              <motion.div
                key="solutions"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="order-1 max-w-2xl space-y-3 text-left"
              >
                <h3 className="text-2xl font-black text-[#091536] sm:text-3xl">What does your team need to learn?</h3>
                <p className="text-xs sm:text-sm text-[#526179] leading-relaxed">
                  Start with a skill, workshop topic, or business outcome. Atlas will surface trainers with the most relevant enterprise experience.
                </p>
              </motion.div>
            )}

            {activeHeroTab === 'matchmaking' && (
              <motion.div
                key="matchmaking"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="order-1 max-w-2xl space-y-3 text-left"
              >
                <h3 className="text-2xl font-black text-[#091536] sm:text-3xl">Turn your training brief into a shortlist</h3>
                <p className="text-xs sm:text-sm text-[#526179] leading-relaxed">
                  Describe the audience, goals, budget, and timeline. Atlas analyzes the requirement and ranks the trainers best suited to deliver it.
                </p>
                <LandingButton
                  onClick={onOpenAiAssistant}
                  endIcon={<Sparkles className="h-3.5 w-3.5" />}
                >
                  Build brief with AI
                </LandingButton>
              </motion.div>
            )}

            {activeHeroTab === 'pool' && (
              <motion.div
                key="pool"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="order-1 max-w-2xl space-y-3 text-left"
              >
                <h3 className="text-2xl font-black text-[#091536] sm:text-3xl">Explore enterprise-ready facilitators</h3>
                <p className="text-xs sm:text-sm text-[#526179] leading-relaxed">
                  Review verified profiles, client ratings, delivery experience, programs, availability, and pricing before adding trainers to your shortlist.
                </p>
                <LandingButton
                  onClick={() => onExploreExperts()}
                  endIcon={<ArrowRight className="h-3.5 w-3.5" />}
                >
                  Browse {featuredTrainerCount} featured experts
                </LandingButton>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`capabilities-${activeHeroTab}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              className="order-3 mt-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="text-[10px] font-black uppercase text-[#176BFF]">Search with confidence</span>
                <span className="h-px flex-1 bg-[linear-gradient(90deg,#C8DEF6,transparent)]" />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {(activeHeroTab === 'solutions'
                  ? [
                      { icon: Search, title: 'Expertise search', detail: 'Find trainers by skill and outcome', tone: 'bg-[#EAF4FF] text-[#176BFF]' },
                      { icon: Users, title: 'Corporate experience', detail: 'Review relevant client delivery', tone: 'bg-[#E8FFFB] text-[#11BFA5]' },
                      { icon: BarChart3, title: 'Easy comparison', detail: 'Compare ratings, rates and fit', tone: 'bg-[#FFF5E6] text-[#F59E0B]' }
                    ]
                  : activeHeroTab === 'matchmaking'
                    ? [
                        { icon: Sparkles, title: 'Brief intelligence', detail: 'Extract skills and priorities', tone: 'bg-[#F0ECFF] text-[#7C3AED]' },
                        { icon: Award, title: 'Smart ranking', detail: 'Compare verified expertise', tone: 'bg-[#EAF4FF] text-[#176BFF]' },
                        { icon: CheckCircle2, title: 'Decision ready', detail: 'Review the strongest matches', tone: 'bg-[#E8FFFB] text-[#11BFA5]' }
                      ]
                    : [
                        { icon: Play, title: 'Video screened', detail: 'Communication quality reviewed', tone: 'bg-[#EAF4FF] text-[#176BFF]' },
                        { icon: ShieldCheck, title: 'Reference verified', detail: 'Enterprise history validated', tone: 'bg-[#E8FFFB] text-[#11BFA5]' },
                        { icon: Building2, title: 'Enterprise ready', detail: 'Prepared for complex programs', tone: 'bg-[#F0ECFF] text-[#7C3AED]' }
                      ]
                ).map(({ icon: CapabilityIcon, title, detail, tone }, index) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="rounded-[15px] border border-[#DCE9F6] bg-white/85 p-3.5 shadow-[0_10px_24px_rgba(42,92,132,0.06)]"
                  >
                    <span className={`flex h-9 w-9 items-center justify-center rounded-[10px] ${tone}`}>
                      <CapabilityIcon className="h-4 w-4" />
                    </span>
                    <div className="mt-3 text-[11px] font-black text-[#102044]">{title}</div>
                    <div className="mt-1 text-[9px] font-semibold leading-4 text-[#748198]">{detail}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Corporate trainer search console */}
          <div className="order-2 max-w-3xl pt-5">
            <form onSubmit={handleSearchSubmit} className="bg-white p-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative flex w-full flex-1 items-center rounded-xl bg-[#F8FBFE] px-3.5 py-1.5 ring-1 ring-[#E0EAF4] transition focus-within:bg-white focus-within:ring-[#176BFF]">
                  <Search className="mr-2.5 h-4 w-4 shrink-0 text-[#176BFF]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="e.g. Leadership, GenAI, consultative selling..."
                    className="w-full bg-transparent py-2 text-xs font-semibold text-[#111111] placeholder:font-medium placeholder:text-[#99A5B7] focus:outline-none"
                  />
                </div>

                <LandingButton type="submit" className="w-full sm:w-auto">
                  Find trainers
                </LandingButton>
              </div>

              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                <SearchFilterDropdown
                  label="Expertise"
                  value={selectedDomain}
                  onChange={setSelectedDomain}
                  icon={<GraduationCap className="h-3.5 w-3.5" />}
                  options={[
                    { value: '', label: 'All expertise' },
                    { value: 'Executive Leadership', label: 'Leadership' },
                    { value: 'Generative AI & Tech', label: 'Technology & GenAI' },
                    { value: 'Sales & Revenue Enablement', label: 'Sales effectiveness' },
                    { value: 'Soft Skills & DE&I', label: 'Communication & soft skills' }
                  ]}
                />
                <SearchFilterDropdown
                  label="Delivery"
                  value={deliveryMode}
                  onChange={setDeliveryMode}
                  icon={<MonitorSmartphone className="h-3.5 w-3.5" />}
                  options={[
                    { value: '', label: 'Any delivery mode' },
                    { value: 'Virtual', label: 'Virtual' },
                    { value: 'In-Person', label: 'In-person' },
                    { value: 'Hybrid', label: 'Hybrid' }
                  ]}
                />
                <div className="flex items-center gap-2 rounded-xl bg-[#EAFBF5] px-3 py-2 text-[10px] font-bold text-[#147A61] ring-1 ring-[#D5F3E7]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />Verified experts only
                </div>
              </div>
            </form>
          </div>

            </div>

            <motion.div
              key={`workflow-${activeHeroTab}`}
              initial={{ opacity: 0, x: 24, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.42, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-[20px] border border-[#D8E8F7] bg-white p-5 shadow-[0_18px_42px_rgba(38,86,128,0.10)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-black uppercase text-[#176BFF]">Matching preview</div>
                  <div className="mt-1 text-sm font-black text-[#091536]">
                    {activeHeroTab === 'solutions' ? 'Trainer search results' : activeHeroTab === 'matchmaking' ? 'Brief-to-shortlist workflow' : 'Verified expert directory'}
                  </div>
                </div>
                <motion.span
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7FAF3] text-[#18B98A]"
                >
                  <CheckCircle2 className="h-5 w-5" />
                </motion.span>
              </div>

              <div className="relative mt-5 space-y-3">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                  className="absolute bottom-5 left-[17px] top-5 w-px origin-top bg-[linear-gradient(#7BC3FF,#43D8B2)]"
                />
                {[
                  { icon: Search, title: 'Requirement captured', detail: 'Topic, audience and delivery preferences', tone: 'bg-[#EAF4FF] text-[#176BFF]' },
                  { icon: Sparkles, title: 'Best-fit trainers ranked', detail: 'Expertise and enterprise ratings compared', tone: 'bg-[#E8FFFB] text-[#11BFA5]' },
                  { icon: CheckCircle2, title: 'Profiles ready to compare', detail: 'Availability, pricing and programs included', tone: 'bg-[#F0ECFF] text-[#7C3AED]' }
                ].map(({ icon: StepIcon, title, detail, tone }, index) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.16 + index * 0.12 }}
                    whileHover={{ x: 4 }}
                    className="relative flex items-center gap-3 rounded-[14px] border border-[#E4EDF6] bg-[#FBFDFF] p-3"
                  >
                    <span className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${tone}`}>
                      <StepIcon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-black text-[#102044]">{title}</span>
                      <span className="mt-0.5 block text-[9px] font-semibold text-[#758198]">{detail}</span>
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-[12px] bg-[#F0F7FF] p-3">
                  <div className="text-lg font-black text-[#176BFF]">24</div>
                  <div className="text-[9px] font-bold text-[#64748B]">Vetted experts</div>
                </div>
                <div className="rounded-[12px] bg-[#EAFBF5] p-3">
                  <div className="text-lg font-black text-[#10A978]">98%</div>
                  <div className="text-[9px] font-bold text-[#64748B]">Top match score</div>
                </div>
              </div>
            </motion.div>
          </div>

        </motion.div>

      </section>
    </>
  );
}
