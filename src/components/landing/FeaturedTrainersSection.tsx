'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, BadgeCheck, Bookmark, CalendarCheck2, ChevronLeft, ChevronRight, MapPin, Star, Users } from 'lucide-react';
import { Trainer } from '../../types';
import { SectionHeading } from './SectionHeading';

interface FeaturedTrainersSectionProps {
  featuredTrainers: Trainer[];
  onExploreExperts: () => void;
  onSelectTrainer: (trainer: Trainer) => void;
  onToggleShortlist: (trainerId: string) => void;
}

export function FeaturedTrainersSection({ featuredTrainers, onExploreExperts, onSelectTrainer, onToggleShortlist }: FeaturedTrainersSectionProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setCanScrollLeft(rail.scrollLeft > 4);
    setCanScrollRight(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [featuredTrainers.length, updateScrollState]);

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>('article');
    const distance = (card?.offsetWidth ?? 330) + 16;
    rail.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Expert directory"
        title="Featured corporate instructors"
        description="Meet experienced facilitators selected for enterprise delivery, proven expertise, and measurable impact."
      />

      <div className="rounded-[24px] bg-[#F7FBFF] p-4 shadow-[0_14px_36px_rgba(42,92,132,0.06)] sm:p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8FFFB] text-[#11BFA5]"><Users className="h-4 w-4" /></span>
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-[#122044]">
                Available experts
                <span className="flex items-center gap-1 rounded-full bg-[#E7FAF3] px-2 py-0.5 text-[9px] text-[#11956E]"><span className="h-1.5 w-1.5 rounded-full bg-[#20C997]" />Live</span>
              </div>
              <p className="mt-0.5 text-[10px] font-semibold text-[#748198]">Curated for enterprise learning teams</p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => scrollRail(-1)}
              disabled={!canScrollLeft}
              aria-label="View previous instructors"
              className="atlas-focus flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#28425F] shadow-[0_8px_20px_rgba(42,92,132,0.08)] transition hover:-translate-y-0.5 hover:text-[#176BFF] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollRail(1)}
              disabled={!canScrollRight}
              aria-label="View next instructors"
              className="atlas-focus flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#28425F] shadow-[0_8px_20px_rgba(42,92,132,0.08)] transition hover:-translate-y-0.5 hover:text-[#176BFF] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onExploreExperts()}
              className="atlas-focus inline-flex h-9 items-center gap-2 rounded-xl bg-white px-3.5 text-xs font-black text-[#176BFF] shadow-[0_8px_20px_rgba(42,92,132,0.08)] transition hover:-translate-y-0.5 hover:text-[#0957D8]"
            >
              View all experts
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div ref={railRef} onScroll={updateScrollState} className="flex touch-pan-x snap-x snap-proximity gap-4 overflow-x-auto overscroll-x-contain px-1 pb-3 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featuredTrainers.slice(0, 6).map((trainer) => (
            <article
              key={trainer.id}
              onClick={() => onSelectTrainer(trainer)}
              className="group relative flex min-w-[310px] max-w-[350px] flex-1 cursor-pointer snap-start flex-col overflow-hidden rounded-[18px] border border-[#DFEAF4] bg-white text-left shadow-[0_6px_18px_rgba(42,92,132,0.06)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-[#B8D8FF] hover:shadow-[0_12px_26px_rgba(42,92,132,0.10)] sm:min-w-[330px]"
            >
              <div className="h-1 w-full bg-[linear-gradient(90deg,#31E6B1,#43B5FF)]" />

              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={trainer.avatarUrl}
                        alt={trainer.name}
                        loading="lazy"
                        decoding="async"
                        className="h-14 w-14 rounded-[15px] object-cover shadow-[0_6px_16px_rgba(9,21,54,0.16)] transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      {trainer.verified && <BadgeCheck className="absolute -bottom-1 -right-1 h-5 w-5 fill-[#18C996] text-white drop-shadow-sm" aria-label="Verified expert" />}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-black text-[#091536] transition-colors group-hover:text-[#176BFF]">{trainer.name}</h3>
                      <p className="mt-0.5 line-clamp-1 text-[10px] font-semibold text-[#5E6D85]">{trainer.title}</p>
                      <p className="mt-1 flex items-center gap-1 truncate text-[9px] font-semibold text-[#8290A5]"><MapPin className="h-3 w-3 shrink-0" />{trainer.location}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={trainer.shortlisted ? `Remove ${trainer.name} from shortlist` : `Add ${trainer.name} to shortlist`}
                    onClick={(event) => {
                      event.stopPropagation();
                      onToggleShortlist(trainer.id);
                    }}
                    className={`atlas-focus flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition ${trainer.shortlisted ? 'bg-[#E8FFFB] text-[#11A981]' : 'bg-[#F3F7FB] text-[#718096] hover:bg-[#EAF4FF] hover:text-[#176BFF]'}`}
                  >
                    <Bookmark className={`h-3.5 w-3.5 ${trainer.shortlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-3 divide-x divide-[#E5EDF5] rounded-xl bg-[#F8FBFE] py-2.5">
                  <div className="px-2 text-center">
                    <div className="flex items-center justify-center gap-1 text-xs font-black text-[#122044]"><Star className="h-3 w-3 fill-[#FFB000] text-[#FFB000]" />{trainer.rating}</div>
                    <div className="mt-0.5 text-[8px] font-bold uppercase tracking-wide text-[#8A96A8]">{trainer.reviewCount} reviews</div>
                  </div>
                  <div className="px-2 text-center">
                    <div className="text-xs font-black text-[#122044]">{trainer.yearsExperience}+ yrs</div>
                    <div className="mt-0.5 text-[8px] font-bold uppercase tracking-wide text-[#8A96A8]">Experience</div>
                  </div>
                  <div className="px-2 text-center">
                    <div className="text-xs font-black text-[#122044]">${trainer.dayRate.toLocaleString()}</div>
                    <div className="mt-0.5 text-[8px] font-bold uppercase tracking-wide text-[#8A96A8]">Per day</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#E8FBF4] px-2.5 py-1 text-[9px] font-black text-[#11956E]"><CalendarCheck2 className="h-3 w-3" />Available {trainer.availableFrom.toLowerCase()}</span>
                  <span className="truncate text-[9px] font-bold text-[#6E7D92]">{trainer.deliveryModes.slice(0, 2).join(' · ')}</span>
                </div>

                <p className="mt-3 line-clamp-2 min-h-8 text-[10px] font-medium leading-4 text-[#68768C]">{trainer.bio}</p>

                <div className="mt-3 flex min-h-6 flex-wrap content-start gap-1.5">
                  {trainer.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="max-w-[110px] truncate rounded-full bg-[#EEF5FC] px-2 py-1 text-[9px] font-bold text-[#526179]">{skill}</span>
                  ))}
                  {trainer.skills.length > 3 && <span className="rounded-full bg-[#F3F0FF] px-2 py-1 text-[9px] font-bold text-[#7658C7]">+{trainer.skills.length - 3}</span>}
                </div>
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-2 border-t border-[#E7EEF6] bg-[#FBFDFF] p-3">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelectTrainer(trainer);
                  }}
                  className="atlas-focus flex h-9 items-center justify-center gap-2 rounded-xl bg-[#0D3270] px-4 text-[10px] font-black text-white shadow-[0_8px_18px_rgba(13,50,112,0.18)] transition hover:bg-[#176BFF]"
                >
                  View profile <ArrowRight className="h-3 w-3" />
                </button>
                <button
                  aria-label={trainer.shortlisted ? 'Saved to shortlist' : 'Add to shortlist'}
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleShortlist(trainer.id);
                  }}
                  className={`atlas-focus flex h-9 w-10 items-center justify-center rounded-xl transition ${trainer.shortlisted ? 'bg-[#DFF8EF] text-[#11956E]' : 'bg-[#EEF3F8] text-[#526179] hover:bg-[#E2EDFA] hover:text-[#176BFF]'}`}
                >
                  <Bookmark className={`h-3.5 w-3.5 ${trainer.shortlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
