'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight, Bookmark, BriefcaseBusiness, Check, ChevronDown, ChevronLeft, ChevronRight,
  MapPin, Search, SlidersHorizontal, Sparkles, Star, Users, X,
} from 'lucide-react';
import { DeliveryMode, Requirement, Trainer } from '../types';

interface FindExpertsProps {
  trainers: Trainer[];
  requirements: Requirement[];
  activeRequirement: Requirement | null;
  onSelectRequirement: (req: Requirement) => void;
  onSelectTrainer: (trainer: Trainer) => void;
  onToggleShortlist: (trainerId: string) => void;
  onModifyRequirement: () => void;
  initialDomain?: string;
  initialSearch?: string;
  initialDelivery?: DeliveryMode;
}

const domainStyles = [
  'border-[#CFE0FF] bg-[#EDF4FF] text-[#176BFF]',
  'border-[#C7EEE8] bg-[#EBFAF7] text-[#078A76]',
  'border-[#F9DFC0] bg-[#FFF6E9] text-[#C66B06]',
  'border-[#E4D5FA] bg-[#F7F0FF] text-[#7950B5]',
];

export const FindExperts: React.FC<FindExpertsProps> = ({
  trainers, activeRequirement, onSelectTrainer, onToggleShortlist,
  initialDomain, initialSearch, initialDelivery,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');
  const [selectedDomain, setSelectedDomain] = useState(initialDomain || 'All');
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryMode | 'All'>(initialDelivery || 'All');
  const [minMatch, setMinMatch] = useState(70);
  const [minExp, setMinExp] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [sortBy, setSortBy] = useState<'match' | 'rating' | 'experience' | 'rate'>('match');
  const [currentPage, setCurrentPage] = useState(1);

  const domains = useMemo(() => Array.from(new Set(trainers.flatMap((trainer) => trainer.domains))), [trainers]);
  const locations = useMemo(() => Array.from(new Set(trainers.map((trainer) => trainer.location))), [trainers]);

  const filteredTrainers = useMemo(() => trainers.filter((trainer) => {
    const query = searchQuery.trim().toLowerCase();
    if (query && ![trainer.name, trainer.title, trainer.bio, ...trainer.skills].some((item) => item.toLowerCase().includes(query))) return false;
    if (selectedDomain !== 'All' && !trainer.domains.includes(selectedDomain)) return false;
    if (selectedDelivery !== 'All' && !trainer.deliveryModes.includes(selectedDelivery)) return false;
    if (trainer.matchScore < minMatch || trainer.yearsExperience < minExp) return false;
    if (selectedLocation !== 'All' && trainer.location !== selectedLocation) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'experience') return b.yearsExperience - a.yearsExperience;
    if (sortBy === 'rate') return a.dayRate - b.dayRate;
    return b.matchScore - a.matchScore;
  }), [trainers, searchQuery, selectedDomain, selectedDelivery, minMatch, minExp, selectedLocation, sortBy]);

  const activeFilterCount = [selectedDomain !== 'All', selectedDelivery !== 'All', minMatch !== 70, minExp !== 0, selectedLocation !== 'All'].filter(Boolean).length;
  const resetFilters = () => { setSelectedDomain('All'); setSelectedDelivery('All'); setMinMatch(70); setMinExp(0); setSelectedLocation('All'); setSearchQuery(''); };

  return (
    <div className="min-h-full flex-1 bg-[#F5F7FA] px-4 py-5 text-[#071638] sm:px-6 lg:px-7 lg:py-7">
      <div className="mx-auto max-w-[1440px] space-y-5">
        <section className="relative overflow-hidden rounded-[22px] border border-[#D4E4F7] bg-[linear-gradient(120deg,#F4F8FF_0%,#ECF5FF_58%,#E9FAF7_125%)] px-6 py-7 text-[#071638] shadow-[0_14px_38px_rgba(42,92,132,0.09)] sm:px-8 sm:py-9">
          <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[55px] border-[#176BFF]/5" />
          <div className="absolute bottom-[-90px] right-[18%] h-56 w-56 rounded-full bg-[#25D3B7]/18 blur-3xl" />
          <div className="relative z-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#BED7F8] bg-white/75 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#176BFF]"><Sparkles className="h-3.5 w-3.5 text-[#18A990]" /> AI-powered expert network</span>
              <h1 className="mt-4 text-[27px] font-extrabold tracking-[-0.02em] sm:text-[34px]">Find the right expert for every team</h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5F7290]">Discover verified corporate trainers, compare expertise, and shortlist your strongest matches in one place.</p>
            </div>
            <div className="flex gap-6 rounded-[16px] border border-[#CFE0F4] bg-white/75 px-5 py-4 shadow-sm backdrop-blur-sm">
              <div><div className="text-xl font-black text-[#176BFF]">{trainers.length * 20}+</div><div className="mt-0.5 text-[10px] text-[#657693]">Verified experts</div></div>
              <div className="w-px bg-[#D8E3F0]" />
              <div><div className="text-xl font-black text-[#18A990]">4.8</div><div className="mt-0.5 text-[10px] text-[#657693]">Average rating</div></div>
              <div className="w-px bg-[#D8E3F0]" />
              <div><div className="text-xl font-black text-[#176BFF]">92%</div><div className="mt-0.5 text-[10px] text-[#657693]">Successful matches</div></div>
            </div>
          </div>
        </section>

        {/* Matching-for-brief banner intentionally hidden.
        {activeRequirement && (
          <div className="flex flex-col justify-between gap-3 rounded-[14px] border border-[#CDEDE7] bg-[#EFFAF8] px-4 py-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#19AD98] text-white"><Sparkles className="h-4 w-4" /></span><div><p className="text-[10px] font-black uppercase tracking-wider text-[#078A76]">Matching for your brief</p><p className="mt-0.5 text-xs font-bold text-[#17443E]">{activeRequirement.title}</p></div></div>
            <span className="text-xs font-black text-[#078A76]">{filteredTrainers.length} strong matches found</span>
          </div>
        )}
        */}

        <section className="rounded-[17px] border border-[#DCE5EE] bg-white p-3 shadow-[0_8px_25px_rgba(42,74,112,0.04)]">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#67809D]" />
              <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search by expert, skill, topic, or industry..." className="h-12 w-full rounded-[12px] border border-[#E1E8F0] bg-[#F8FAFC] pl-11 pr-4 text-xs font-medium outline-none transition placeholder:text-[#8A99AC] focus:border-[#8CB7F7] focus:bg-white focus:ring-4 focus:ring-[#176BFF]/5" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => setShowFilters(!showFilters)} className={`inline-flex h-12 items-center gap-2 rounded-[12px] border px-4 text-xs font-black transition ${showFilters || activeFilterCount ? 'border-[#B8D4FF] bg-[#EDF4FF] text-[#176BFF]' : 'border-[#E1E8F0] text-[#425574] hover:bg-[#F8FAFC]'}`}><SlidersHorizontal className="h-4 w-4" /> Filters{activeFilterCount > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#176BFF] px-1 text-[9px] text-white">{activeFilterCount}</span>}</button>
              <label className="relative"><select value={sortBy} onChange={(event) => setSortBy(event.target.value as typeof sortBy)} className="h-12 appearance-none rounded-[12px] border border-[#E1E8F0] bg-white pl-4 pr-10 text-xs font-bold text-[#425574] outline-none"><option value="match">Best match</option><option value="rating">Highest rated</option><option value="experience">Most experienced</option><option value="rate">Lowest day rate</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#718096]" /></label>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="mt-3 border-t border-[#E7EDF3] px-1 pb-1 pt-4">
                  <div className="mb-3 flex items-center justify-between"><span className="text-xs font-black text-[#263A58]">Refine your results</span><button onClick={() => setShowFilters(false)} className="rounded-lg p-1.5 text-[#718096] hover:bg-[#F1F5F9]"><X className="h-4 w-4" /></button></div>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                    <FilterSelect label="Specialty" value={selectedDomain} onChange={setSelectedDomain} options={['All', ...domains]} />
                    <FilterSelect label="Delivery" value={selectedDelivery} onChange={(value) => setSelectedDelivery(value as DeliveryMode | 'All')} options={['All', 'In-Person', 'Virtual', 'Hybrid']} />
                    <FilterSelect label="Experience" value={String(minExp)} onChange={(value) => setMinExp(Number(value))} options={['0', '5', '10', '15']} labels={['Any experience', '5+ years', '10+ years', '15+ years']} />
                    <FilterSelect label="Location" value={selectedLocation} onChange={setSelectedLocation} options={['All', ...locations]} />
                    <div className="rounded-[11px] border border-[#E2E9F0] bg-[#F9FBFD] px-3 py-2"><div className="flex justify-between text-[10px] font-bold text-[#657693]"><span>Minimum match</span><span className="text-[#176BFF]">{minMatch}%</span></div><input type="range" min="60" max="98" value={minMatch} onChange={(event) => setMinMatch(Number(event.target.value))} className="mt-2 w-full cursor-pointer accent-[#176BFF]" /></div>
                  </div>
                  <div className="mt-3 flex justify-end"><button onClick={resetFilters} className="text-[11px] font-bold text-[#657693] hover:text-[#176BFF]">Reset all filters</button></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <div className="flex items-center justify-between gap-3"><div><h2 className="text-lg font-black text-[#071638]">Recommended experts</h2><p className="mt-0.5 text-[11px] text-[#718096]">{filteredTrainers.length} experts match your current criteria</p></div><div className="hidden items-center gap-2 text-[11px] font-bold text-[#078A76] sm:flex"><span className="h-2 w-2 rounded-full bg-[#18BFA5]" /> Profiles updated this week</div></div>

        {filteredTrainers.length ? (
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {filteredTrainers.map((trainer, index) => (
              <motion.article key={trainer.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.035 }} whileHover={{ y: -4 }} onClick={() => onSelectTrainer(trainer)} className="group cursor-pointer overflow-hidden rounded-[19px] border border-[#DCE5EE] bg-white shadow-[0_8px_24px_rgba(42,74,112,0.045)] transition hover:border-[#BBD2F0] hover:shadow-[0_16px_38px_rgba(32,83,145,0.10)]">
                <div className="h-1.5 bg-[linear-gradient(90deg,#176BFF,#18BFA5)]" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3.5">
                      <div className="relative shrink-0"><img src={trainer.avatarUrl} alt={trainer.name} className="h-[68px] w-[68px] rounded-[16px] object-cover ring-1 ring-[#DFE7EF]" />{trainer.verified && <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#18BFA5] text-white ring-2 ring-white"><Check className="h-3 w-3" strokeWidth={3} /></span>}</div>
                      <div className="min-w-0"><h3 className="truncate text-[16px] font-black text-[#0A1838] transition group-hover:text-[#176BFF]">{trainer.name}</h3><p className="mt-1 truncate text-xs font-medium text-[#667792]">{trainer.title}</p><div className="mt-2 flex items-center gap-1 text-[11px]"><Star className="h-3.5 w-3.5 fill-[#F4B000] text-[#F4B000]" /><span className="font-black text-[#223653]">{trainer.rating}</span><span className="text-[#8A98AA]">({trainer.reviewCount} reviews)</span></div></div>
                    </div>
                    <button onClick={(event) => { event.stopPropagation(); onToggleShortlist(trainer.id); }} className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border transition ${trainer.shortlisted ? 'border-[#B8D4FF] bg-[#176BFF] text-white' : 'border-[#DFE7EF] text-[#64758D] hover:border-[#B8D4FF] hover:bg-[#EDF4FF] hover:text-[#176BFF]'}`} title="Shortlist expert"><Bookmark className={`h-4 w-4 ${trainer.shortlisted ? 'fill-current' : ''}`} /></button>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-[12px] bg-[#F5F9FF] px-3.5 py-3"><div><p className="text-[9px] font-black uppercase tracking-wider text-[#718096]">AI match</p><p className="mt-0.5 text-xl font-black text-[#176BFF]">{trainer.matchScore}%</p></div><div className="h-8 w-px bg-[#DCE6F2]" /><div><p className="text-[9px] font-black uppercase tracking-wider text-[#718096]">Experience</p><p className="mt-1 text-xs font-black text-[#243754]">{trainer.yearsExperience} years</p></div><div className="h-8 w-px bg-[#DCE6F2]" /><div><p className="text-[9px] font-black uppercase tracking-wider text-[#718096]">Day rate</p><p className="mt-1 text-xs font-black text-[#243754]">${trainer.dayRate}</p></div></div>

                  <p className="mt-4 line-clamp-2 min-h-10 text-xs leading-relaxed text-[#657693]">{trainer.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">{trainer.skills.slice(0, 3).map((skill, skillIndex) => <span key={skill} className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${domainStyles[skillIndex % domainStyles.length]}`}>{skill}</span>)}</div>
                  <div className="mt-4 flex items-center justify-between border-t border-[#E9EEF4] pt-4"><div className="flex min-w-0 items-center gap-1.5 text-[10px] font-medium text-[#718096]"><MapPin className="h-3.5 w-3.5 shrink-0" /><span className="truncate">{trainer.location}</span></div><button onClick={() => onSelectTrainer(trainer)} className="inline-flex items-center gap-1.5 text-[11px] font-black text-[#176BFF]">View profile <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></button></div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="rounded-[20px] border border-dashed border-[#C8D7E7] bg-white px-6 py-16 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#EDF4FF] text-[#176BFF]"><Search className="h-5 w-5" /></span><h3 className="mt-4 text-base font-black">No experts found</h3><p className="mt-1 text-xs text-[#718096]">Try a broader search or reset your filters.</p><button onClick={resetFilters} className="mt-4 rounded-[10px] bg-[#176BFF] px-4 py-2.5 text-xs font-black text-white">Reset filters</button></div>
        )}

        <div className="flex flex-col items-center justify-between gap-4 rounded-[15px] border border-[#DCE5EE] bg-white px-4 py-3 sm:flex-row">
          <p className="text-[11px] font-medium text-[#718096]">Showing <span className="font-black text-[#263A58]">{filteredTrainers.length}</span> recommended experts</p>
          <div className="flex items-center gap-1"><PageButton disabled={currentPage === 1} onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}><ChevronLeft className="h-4 w-4" /></PageButton>{[1, 2, 3].map((page) => <PageButton key={page} active={currentPage === page} onClick={() => setCurrentPage(page)}>{page}</PageButton>)}<PageButton onClick={() => setCurrentPage(currentPage + 1)}><ChevronRight className="h-4 w-4" /></PageButton></div>
        </div>
      </div>
    </div>
  );
};

function FilterSelect({ label, value, options, labels, onChange }: { label: string; value: string; options: string[]; labels?: string[]; onChange: (value: string) => void }) {
  return <label className="rounded-[11px] border border-[#E2E9F0] bg-[#F9FBFD] px-3 py-2"><span className="block text-[9px] font-black uppercase tracking-wider text-[#8492A6]">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full bg-transparent text-[11px] font-bold text-[#314361] outline-none">{options.map((option, index) => <option key={option} value={option}>{labels?.[index] || (option === 'All' ? `All ${label.toLowerCase()}` : option)}</option>)}</select></label>;
}

function PageButton({ children, active, disabled, onClick }: { children: React.ReactNode; active?: boolean; disabled?: boolean; onClick: () => void }) {
  return <button disabled={disabled} onClick={onClick} className={`flex h-8 min-w-8 items-center justify-center rounded-[8px] px-2 text-[11px] font-black transition disabled:opacity-35 ${active ? 'bg-[#176BFF] text-white' : 'border border-[#E1E8F0] text-[#60718A] hover:bg-[#F1F6FC]'}`}>{children}</button>;
}
