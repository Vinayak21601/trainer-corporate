'use client';

import { useState } from 'react';
import { ArrowRight, BadgeCheck, ChevronLeft, ChevronRight, Quote, Star, TrendingUp, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { landingTestimonials as testimonials } from './landingData';
import { SectionHeading } from './SectionHeading';

const storyOutcomes = [
  { metric: '10×', label: 'faster trainer sourcing' },
  { metric: '100s', label: 'of team hours saved' },
  { metric: '4.9/5', label: 'workshop satisfaction' }
];

export function TestimonialsSection() {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const activeStory = testimonials[activeTestimonialIdx];
  const activeOutcome = storyOutcomes[activeTestimonialIdx];

  const showPrevious = () => setActiveTestimonialIdx((current) => current === 0 ? testimonials.length - 1 : current - 1);
  const showNext = () => setActiveTestimonialIdx((current) => current === testimonials.length - 1 ? 0 : current + 1);

  return (
    <section id="testimonials" className="mx-auto w-full max-w-7xl space-y-5 px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Customer stories"
        title="Words of appreciation"
        description="See how learning teams use Atlas to simplify trainer discovery and deliver stronger programs."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#F3FAFF_0%,#F8FFFC_58%,#FFF9EA_100%)] p-4 shadow-[0_22px_60px_rgba(35,67,104,0.09)] sm:p-6"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#DFF3FF] opacity-60 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-52 w-72 rounded-full bg-[#DDF8E7] opacity-55 blur-2xl" />

        <div className="relative mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {testimonials.map((testimonial) => (
                <img key={testimonial.id} src={testimonial.avatar} alt="" loading="lazy" decoding="async" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black text-[#102044]"><Users className="h-3.5 w-3.5 text-[#176BFF]" />Trusted by 5,000+ learning leaders</div>
              <div className="mt-0.5 text-[10px] font-semibold text-[#728096]">Verified customer outcomes from enterprise teams</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-black text-[#263650] shadow-sm"><Star className="h-3.5 w-3.5 fill-[#FFB000] text-[#FFB000]" />5.0 average rating</span>
            <span className="hidden items-center gap-1.5 rounded-full bg-[#E8FBF4] px-3 py-1.5 text-[10px] font-black text-[#147A61] sm:flex"><BadgeCheck className="h-3.5 w-3.5" />Verified stories</span>
          </div>
        </div>

        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_330px]">
          <div className="relative min-h-[320px] overflow-hidden rounded-[20px] bg-white p-5 shadow-[0_16px_40px_rgba(35,67,104,0.08)] sm:p-7">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeStory.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.26, ease: 'easeOut' }}
                className="flex h-full flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8FBF4] text-[#12B98A]"><Quote className="h-5 w-5 fill-current" /></span>
                    <span className="rounded-full bg-[#F1F6FC] px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#718096]">Customer outcome</span>
                  </div>
                  <blockquote className="mt-5 max-w-3xl text-lg font-bold leading-7 text-[#102044] sm:text-[22px] sm:leading-8">
                    “{activeStory.comment}”
                  </blockquote>
                </div>

                <div className="mt-6 flex flex-col gap-4 border-t border-[#E7EEF5] pt-5 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex items-center gap-3">
                    <img src={activeStory.avatar} alt={activeStory.name} className="h-11 w-11 rounded-xl object-cover shadow-sm" />
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-black text-[#122044]">{activeStory.name}<BadgeCheck className="h-3.5 w-3.5 fill-[#18C996] text-white" /></div>
                      <p className="mt-0.5 text-[10px] font-semibold text-[#718096]">{activeStory.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-[#F4FAFF] px-3 py-2">
                    <TrendingUp className="h-4 w-4 text-[#176BFF]" />
                    <span className="text-lg font-black text-[#176BFF]">{activeOutcome.metric}</span>
                    <span className="max-w-[100px] text-[9px] font-bold leading-3 text-[#6E7C91]">{activeOutcome.label}</span>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <aside className="rounded-[20px] bg-[#0B214A] p-3.5 text-white shadow-[0_16px_40px_rgba(11,33,74,0.16)]">
            <div className="flex items-center justify-between px-1 pb-3">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.12em] text-[#79E5C9]">Customer voices</div>
                <div className="mt-1 text-xs font-bold text-white/70">Select a story to explore</div>
              </div>
              <span className="text-[10px] font-black text-white/55">{activeTestimonialIdx + 1} / {testimonials.length}</span>
            </div>

            <div className="space-y-2">
              {testimonials.map((testimonial, index) => {
                const selected = index === activeTestimonialIdx;
                return (
                  <button
                    key={testimonial.id}
                    onClick={() => setActiveTestimonialIdx(index)}
                    className={`atlas-focus group flex w-full items-center gap-3 rounded-[14px] p-2.5 text-left transition ${selected ? 'bg-white text-[#102044] shadow-[0_10px_24px_rgba(0,0,0,0.14)]' : 'bg-white/[0.06] text-white hover:bg-white/[0.11]'}`}
                  >
                    <img src={testimonial.avatar} alt="" loading="lazy" decoding="async" className="h-10 w-10 shrink-0 rounded-xl object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[11px] font-black">{testimonial.name}</span>
                      <span className={`mt-0.5 block truncate text-[9px] font-semibold ${selected ? 'text-[#718096]' : 'text-white/55'}`}>{testimonial.role}</span>
                    </span>
                    <ArrowRight className={`h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 ${selected ? 'text-[#176BFF]' : 'text-white/35'}`} />
                  </button>
                );
              })}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={showPrevious} aria-label="Previous testimonial" className="atlas-focus flex h-9 items-center justify-center rounded-xl bg-white/[0.08] text-white transition hover:bg-white/[0.14]"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={showNext} aria-label="Next testimonial" className="atlas-focus flex h-9 items-center justify-center rounded-xl bg-[#31E6B1] text-[#071B2F] transition hover:bg-[#55EFC1]"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </aside>
        </div>
      </motion.div>
    </section>
  );
}
