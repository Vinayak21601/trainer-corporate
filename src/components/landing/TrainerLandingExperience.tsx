'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowRight, BadgeCheck, BarChart3, BriefcaseBusiness, CalendarDays, Check, CheckCircle2,
  ChevronDown, ChevronLeft, ChevronRight, Clock3, IndianRupee, MapPin, MessageSquareQuote, Plus,
  Sparkles, Star, TrendingUp, UserRoundCheck, Users, Video,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Trainer } from '../../types';
import { LandingButton } from './LandingButton';
import { SectionHeading } from './SectionHeading';

interface TrainerLandingExperienceProps {
  featuredTrainers: Trainer[];
  onSelectTrainer: (trainer: Trainer) => void;
}

const benefits = [
  { icon: UserRoundCheck, title: 'A profile that sells your expertise', text: 'Showcase programs, credentials, client outcomes, videos, and reviews in one trusted profile.', tone: 'bg-[#DDD5FF] text-[#6547DB]', surface: 'border-[#D7CDFD] bg-[#F3EFFF]' },
  { icon: BriefcaseBusiness, title: 'Relevant corporate opportunities', text: 'Get matched to briefs aligned with your domains, location, delivery style, dates, and rates.', tone: 'bg-[#CFF6EC] text-[#078872]', surface: 'border-[#BDEBDD] bg-[#ECFAF5]' },
  { icon: CalendarDays, title: 'You control your availability', text: 'Block unavailable days, manage confirmed workshops, and avoid scheduling conflicts.', tone: 'bg-[#FFE2BE] text-[#D56507]', surface: 'border-[#FFD5A4] bg-[#FFF4E4]' },
  { icon: BarChart3, title: 'Build a stronger reputation', text: 'Collect verified feedback and use performance insights to grow your corporate practice.', tone: 'bg-[#CFE4FF] text-[#176BFF]', surface: 'border-[#BEDAFF] bg-[#EDF5FF]' },
];

const trainerStories = [
  { quote: 'Atlas brings me briefs that actually fit my leadership practice. I spend less time prospecting and more time delivering meaningful programs.', name: 'Vikram Malhotra', role: 'Leadership & Strategy Expert', initials: 'VM', color: 'bg-[#176BFF]' },
  { quote: 'My profile finally communicates the depth of my work. Corporate teams arrive informed, and every discovery call is far more productive.', name: 'Anjali Mehta', role: 'Leadership Development Expert', initials: 'AM', color: 'bg-[#7057E8]' },
  { quote: 'The availability tools and clear briefs make planning simple. I can evaluate an opportunity before committing to a conversation.', name: 'Rahul Kapoor', role: 'Organizational Leadership Coach', initials: 'RK', color: 'bg-[#13A58F]' },
];

function BenefitPreview({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="rounded-[15px] border border-[#D8E5F2] bg-white p-4 shadow-[0_10px_24px_rgba(37,65,102,0.06)]">
        <div className="flex items-center justify-between"><div className="flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EAF3FF] text-xs font-black text-[#176BFF]">YS</span><div><div className="text-[10px] font-black text-[#172A48]">Your expert profile</div><div className="mt-0.5 flex items-center gap-1 text-[8px] font-bold text-[#15977E]"><BadgeCheck className="h-3 w-3" /> Identity verified</div></div></div><span className="text-lg font-black text-[#176BFF]">78%</span></div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E8EEF5]"><motion.div initial={{ width: 0 }} whileInView={{ width: '78%' }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-[#176BFF]" /></div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">{[['12', 'Programs'], ['8', 'Clients'], ['4.9', 'Rating']].map(([value, label]) => <div key={label} className="rounded-[9px] bg-[#F4F7FB] py-2"><div className="text-[11px] font-black text-[#132644]">{value}</div><div className="mt-0.5 text-[7px] font-bold text-[#8794A7]">{label}</div></div>)}</div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="rounded-[15px] border border-[#CBE9E2] bg-white p-4 shadow-[0_10px_24px_rgba(37,65,102,0.06)]">
        <div className="flex items-start justify-between gap-3"><div><div className="text-[8px] font-black uppercase tracking-wider text-[#15977E]">New opportunity</div><div className="mt-1.5 text-[11px] font-black text-[#172A48]">Leadership for New Managers</div><div className="mt-1 flex items-center gap-1 text-[8px] text-[#718096]"><MapPin className="h-3 w-3" /> Mumbai · In-person</div></div><span className="rounded-full bg-[#E8FAF5] px-2.5 py-1 text-[9px] font-black text-[#0E8D76]">96% match</span></div>
        <div className="mt-3 flex flex-wrap gap-1.5">{['Leadership', 'BFSI', '2 days'].map((tag) => <span key={tag} className="rounded-full border border-[#DCE6EF] bg-[#F7FAFC] px-2 py-1 text-[7px] font-bold text-[#60718A]">{tag}</span>)}</div>
        <div className="mt-3 flex items-center justify-between border-t border-[#E8EEF3] pt-3"><span className="flex items-center gap-1 text-[8px] font-bold text-[#60718A]"><IndianRupee className="h-3 w-3" /> Rate aligned</span><button className="rounded-[7px] bg-[#18A990] px-3 py-1.5 text-[8px] font-black text-white">Review brief</button></div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="rounded-[15px] border border-[#F1D9B9] bg-white p-4 shadow-[0_10px_24px_rgba(37,65,102,0.06)]">
        <div className="flex items-center justify-between"><div><div className="text-[10px] font-black text-[#172A48]">September availability</div><div className="mt-0.5 text-[8px] text-[#8794A7]">Tap dates to update</div></div><CalendarDays className="h-4 w-4 text-[#E97912]" /></div>
        <div className="mt-3 grid grid-cols-7 gap-1">{Array.from({ length: 21 }, (_, day) => day + 8).map((day) => { const booked = [10, 11, 18].includes(day); const unavailable = [14, 15, 22].includes(day); return <span key={day} className={`flex aspect-square items-center justify-center rounded-[6px] text-[7px] font-bold ${booked ? 'bg-[#176BFF] text-white' : unavailable ? 'bg-[#FFE7D1] text-[#C45D09]' : 'bg-[#F4F7FA] text-[#667792]'}`}>{day}</span>; })}</div>
        <div className="mt-3 flex gap-3 text-[7px] font-bold text-[#718096]"><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-sm bg-[#176BFF]" />Booked</span><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-sm bg-[#FFE0C4]" />Unavailable</span></div>
      </div>
    );
  }

  return (
    <div className="rounded-[15px] border border-[#CFE0F5] bg-white p-4 shadow-[0_10px_24px_rgba(37,65,102,0.06)]">
      <div className="flex items-center justify-between"><div><div className="text-[8px] font-black uppercase tracking-wider text-[#176BFF]">Workshop performance</div><div className="mt-1 text-[11px] font-black text-[#172A48]">Participant satisfaction</div></div><div className="flex items-center gap-1 text-lg font-black text-[#172A48]"><Star className="h-4 w-4 fill-[#FFB000] text-[#FFB000]" />4.9</div></div>
      <div className="mt-4 flex h-16 items-end gap-2">{[42, 58, 48, 72, 64, 84, 94].map((height, barIndex) => <motion.span key={barIndex} initial={{ height: 0 }} whileInView={{ height: `${height}%` }} viewport={{ once: true }} transition={{ duration: 0.45, delay: barIndex * 0.05 }} className={`flex-1 rounded-t-[4px] ${barIndex > 4 ? 'bg-[#176BFF]' : 'bg-[#A9D0FF]'}`} />)}</div>
      <div className="mt-3 flex items-center gap-2 rounded-[9px] bg-[#F2F7FF] px-3 py-2"><MessageSquareQuote className="h-4 w-4 shrink-0 text-[#176BFF]" /><p className="line-clamp-1 text-[8px] font-bold text-[#52647F]">“Practical, engaging, and immediately useful.”</p></div>
    </div>
  );
}

function WorkflowPreview({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="mt-5 rounded-[14px] border border-[#D8E4F0] bg-white p-3.5 shadow-sm">
        <div className="flex items-center justify-between"><span className="text-[9px] font-black text-[#233755]">Profile checklist</span><span className="text-[9px] font-black text-[#176BFF]">4 of 5</span></div>
        <div className="mt-3 space-y-2">{['Basic information', 'Expertise & programs', 'Client experience', 'Availability', 'Intro video'].map((item, itemIndex) => <div key={item} className="flex items-center justify-between rounded-[8px] bg-[#F6F8FB] px-2.5 py-2"><span className="text-[8px] font-bold text-[#52647F]">{item}</span><span className={`flex h-4 w-4 items-center justify-center rounded-full ${itemIndex < 4 ? 'bg-[#18A990] text-white' : 'border border-[#CBD6E2] text-[#A0ADBD]'}`}>{itemIndex < 4 ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : <span className="h-1 w-1 rounded-full bg-current" />}</span></div>)}</div>
        <button className="mt-3 w-full rounded-[8px] bg-[#176BFF] py-2 text-[8px] font-black text-white">Complete your profile</button>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="mt-5 space-y-2.5 rounded-[14px] border border-[#D8E4F0] bg-white p-3.5 shadow-sm">
        <div className="flex items-center justify-between"><div><div className="text-[8px] font-black uppercase tracking-wider text-[#176BFF]">Best-fit briefs</div><div className="mt-0.5 text-[9px] font-black text-[#233755]">3 new opportunities</div></div><Sparkles className="h-4 w-4 text-[#18A990]" /></div>
        {[{ title: 'Manager Excellence', score: '96%', tone: 'bg-[#E9F9F4] text-[#0F8B74]' }, { title: 'Leading Through Change', score: '91%', tone: 'bg-[#EAF3FF] text-[#176BFF]' }, { title: 'Executive Presence', score: '87%', tone: 'bg-[#FFF3DF] text-[#C86A09]' }].map((brief, briefIndex) => <div key={brief.title} className="flex items-center gap-2.5 rounded-[9px] border border-[#E4EAF1] p-2.5"><span className={`flex h-7 w-7 items-center justify-center rounded-[8px] text-[8px] font-black ${brief.tone}`}>{briefIndex + 1}</span><span className="min-w-0 flex-1 truncate text-[8px] font-black text-[#344862]">{brief.title}</span><span className="text-[9px] font-black text-[#176BFF]">{brief.score}</span></div>)}
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-[14px] border border-[#CBE8DF] bg-white p-3.5 shadow-sm">
      <div className="flex items-center gap-2.5 border-b border-[#E5ECEF] pb-3"><span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#E8F9F3] text-[#13947C]"><CheckCircle2 className="h-4 w-4" /></span><div><div className="text-[8px] font-black uppercase tracking-wider text-[#13947C]">Engagement confirmed</div><div className="mt-0.5 text-[10px] font-black text-[#213551]">Leadership Essentials</div></div></div>
      <div className="mt-3 grid grid-cols-2 gap-2">{[
        { icon: CalendarDays, label: 'Dates', value: '18–19 Sep' },
        { icon: Clock3, label: 'Duration', value: '2 full days' },
        { icon: MapPin, label: 'Location', value: 'Mumbai' },
        { icon: Users, label: 'Participants', value: '32 managers' },
      ].map(({ icon: Icon, label, value }) => <div key={label} className="rounded-[8px] bg-[#F5F8FA] p-2"><Icon className="h-3 w-3 text-[#18A990]" /><div className="mt-1.5 text-[7px] font-bold text-[#8A97A8]">{label}</div><div className="mt-0.5 text-[8px] font-black text-[#344862]">{value}</div></div>)}</div>
      <div className="mt-3 flex items-center justify-between rounded-[8px] bg-[#EAF3FF] px-2.5 py-2"><span className="text-[8px] font-bold text-[#52647F]">Next: client kickoff call</span><span className="text-[8px] font-black text-[#176BFF]">Tomorrow, 11:00</span></div>
    </div>
  );
}

const calendarDays = [
  { day: 30, muted: true }, { day: 31, muted: true },
  ...Array.from({ length: 30 }, (_, index) => ({ day: index + 1, muted: false })),
  { day: 1, muted: true }, { day: 2, muted: true }, { day: 3, muted: true },
];

const calendarEvents: Record<number, Array<{ label: string; tone: string; icon?: 'video' }>> = {
  3: [{ label: 'Available', tone: 'border-[#BDE9DD] bg-[#EAF9F4] text-[#12856F]' }],
  7: [{ label: 'Discovery call · 11:00', tone: 'border-[#C7DCFB] bg-[#EAF3FF] text-[#176BFF]', icon: 'video' }],
  9: [{ label: 'Leadership workshop', tone: 'border-[#176BFF] bg-[#176BFF] text-white' }],
  10: [{ label: 'Leadership workshop', tone: 'border-[#176BFF] bg-[#176BFF] text-white' }],
  14: [{ label: 'Unavailable', tone: 'border-[#F3C8C3] bg-[#FFF0EE] text-[#C85045]' }],
  15: [{ label: 'Unavailable', tone: 'border-[#F3C8C3] bg-[#FFF0EE] text-[#C85045]' }],
  18: [{ label: 'Client kickoff · 11:00', tone: 'border-[#BDE9DD] bg-[#EAF9F4] text-[#12856F]', icon: 'video' }],
  22: [{ label: 'Available', tone: 'border-[#BDE9DD] bg-[#EAF9F4] text-[#12856F]' }],
  24: [{ label: 'Sales enablement', tone: 'border-[#F5D09C] bg-[#FFF3DF] text-[#B86008]' }],
  25: [{ label: 'Sales enablement', tone: 'border-[#F5D09C] bg-[#FFF3DF] text-[#B86008]' }],
  29: [{ label: 'Virtual workshop', tone: 'border-[#D8CEF4] bg-[#F2EEFF] text-[#674BC6]', icon: 'video' }],
};

function TrainerCalendarWorkspace({ onJoin }: { onJoin: () => void }) {
  return (
    <section id="trainer-calendar" className="mx-auto max-w-7xl scroll-mt-28 px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#176BFF]">Your trainer workspace</span><h2 className="mt-2 text-[24px] font-extrabold leading-tight text-[#091536] sm:text-[32px]">Your profile and calendar, working together.</h2><p className="mt-2 max-w-2xl text-[13px] leading-6 text-[#64748B] sm:text-[14px]">Keep your availability accurate, protect preparation time, and manage confirmed workshops from one familiar calendar.</p></div>
        <LandingButton onClick={onJoin} endIcon={<ArrowRight className="h-4 w-4" />}>Build your trainer profile</LandingButton>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-[#D9E1E8] bg-white shadow-[0_18px_50px_rgba(38,68,105,0.09)]">
        <div className="flex min-h-16 flex-col gap-3 border-b border-[#E3E8ED] px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#176BFF] text-white"><CalendarDays className="h-5 w-5" /></span><span className="hidden text-[16px] font-semibold text-[#3C4043] sm:block">Calendar</span><button className="rounded-[6px] border border-[#DADCE0] px-3 py-2 text-[10px] font-bold text-[#3C4043] hover:bg-[#F8F9FA]">Today</button><div className="flex"><button className="rounded-full p-2 text-[#5F6368] hover:bg-[#F1F3F4]"><ChevronLeft className="h-4 w-4" /></button><button className="rounded-full p-2 text-[#5F6368] hover:bg-[#F1F3F4]"><ChevronRight className="h-4 w-4" /></button></div><h3 className="text-[14px] font-medium text-[#3C4043] sm:text-[17px]">September 2026</h3></div>
          <div className="flex items-center justify-between gap-2 sm:justify-end"><button className="flex items-center gap-2 rounded-[6px] border border-[#DADCE0] px-3 py-2 text-[10px] font-bold text-[#3C4043]"><span className="sm:hidden">Agenda</span><span className="hidden sm:inline">Month</span><ChevronDown className="h-3.5 w-3.5" /></button><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#18A990] text-[9px] font-black text-white">YS</span></div>
        </div>

        <div className="grid lg:grid-cols-[210px_minmax(0,1fr)]">
          <aside className="hidden border-r border-[#E3E8ED] p-4 lg:block">
            <button className="flex items-center gap-2 rounded-[14px] border border-[#DADCE0] bg-white px-4 py-3 text-[11px] font-semibold text-[#3C4043] shadow-[0_2px_7px_rgba(60,64,67,0.16)]"><Plus className="h-5 w-5 text-[#176BFF]" /> Create <ChevronDown className="ml-1 h-3 w-3" /></button>
            <div className="mt-6"><div className="flex items-center justify-between text-[10px] font-bold text-[#3C4043]"><span>September 2026</span><div className="flex"><ChevronLeft className="h-3.5 w-3.5" /><ChevronRight className="h-3.5 w-3.5" /></div></div><div className="mt-3 grid grid-cols-7 gap-y-1.5 text-center">{['S','M','T','W','T','F','S'].map((day, index) => <span key={`${day}-${index}`} className="text-[7px] font-bold text-[#70757A]">{day}</span>)}{Array.from({ length: 30 }, (_, index) => index + 1).map((day) => <span key={day} className={`mx-auto flex h-5 w-5 items-center justify-center rounded-full text-[7px] ${day === 18 ? 'bg-[#176BFF] font-bold text-white' : 'text-[#3C4043]'}`}>{day}</span>)}</div></div>
            <div className="mt-6 border-t border-[#E8EAED] pt-5"><div className="flex items-center justify-between"><span className="text-[10px] font-bold text-[#3C4043]">Profile strength</span><span className="text-[10px] font-black text-[#176BFF]">78%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E8EAED]"><div className="h-full w-[78%] rounded-full bg-[#176BFF]" /></div><button onClick={onJoin} className="mt-2 text-[8px] font-bold text-[#176BFF]">Complete your profile</button></div>
            <div className="mt-6 space-y-2.5"><p className="text-[9px] font-bold text-[#3C4043]">My calendars</p>{[['Confirmed workshops','#176BFF'],['Available','#18A990'],['Unavailable','#D85A50'],['Client calls','#7656D6']].map(([label, color]) => <label key={label} className="flex items-center gap-2 text-[8px] font-medium text-[#5F6368]"><span className="flex h-3.5 w-3.5 items-center justify-center rounded-[3px] text-white" style={{ backgroundColor: color }}><Check className="h-2.5 w-2.5" /></span>{label}</label>)}</div>
          </aside>

          <div>
            <div className="border-b border-[#E3E8ED] p-4 md:hidden">
              <div className="flex items-center justify-between"><div><div className="text-[10px] font-black text-[#3C4043]">Profile strength</div><div className="mt-0.5 text-[8px] text-[#70757A]">One step away from more matches</div></div><span className="text-sm font-black text-[#176BFF]">78%</span></div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E8EAED]"><div className="h-full w-[78%] rounded-full bg-[#176BFF]" /></div>
            </div>
            <div className="divide-y divide-[#E8EAED] md:hidden">
              {[
                { date: '07', day: 'MON', title: 'Discovery call', detail: '11:00 AM · Nexa Solutions', color: 'bg-[#176BFF]', icon: Video },
                { date: '09', day: 'WED', title: 'Leadership workshop', detail: 'Sep 9–10 · Mumbai', color: 'bg-[#176BFF]', icon: BriefcaseBusiness },
                { date: '14', day: 'MON', title: 'Unavailable', detail: 'Personal time blocked', color: 'bg-[#D85A50]', icon: Clock3 },
                { date: '18', day: 'FRI', title: 'Client kickoff', detail: '11:00 AM · Video call', color: 'bg-[#18A990]', icon: Video },
                { date: '24', day: 'THU', title: 'Sales enablement', detail: 'Sep 24–25 · Bengaluru', color: 'bg-[#E58A20]', icon: Users },
              ].map(({ date, day, title, detail, color, icon: Icon }) => <div key={`${date}-${title}`} className="flex items-center gap-3 px-4 py-3"><div className="w-9 text-center"><div className="text-[8px] font-black text-[#70757A]">{day}</div><div className="mt-0.5 text-lg font-medium text-[#3C4043]">{date}</div></div><span className={`h-10 w-1 rounded-full ${color}`} /><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white ${color}`}><Icon className="h-4 w-4" /></span><div className="min-w-0"><div className="truncate text-[10px] font-black text-[#3C4043]">{title}</div><div className="mt-0.5 truncate text-[8px] text-[#70757A]">{detail}</div></div></div>)}
            </div>
            <div className="hidden min-w-[760px] md:block">
              <div className="grid grid-cols-7 border-b border-[#DADCE0] bg-[#F8F9FA]">{['SUN','MON','TUE','WED','THU','FRI','SAT'].map((day) => <div key={day} className="border-r border-[#E3E8ED] py-2 text-center text-[8px] font-medium text-[#70757A] last:border-r-0">{day}</div>)}</div>
              <div className="grid grid-cols-7">{calendarDays.map(({ day, muted }, index) => { const events = muted ? [] : calendarEvents[day] || []; const isToday = !muted && day === 18; return <div key={`${day}-${index}`} className="min-h-[104px] border-b border-r border-[#E3E8ED] p-1.5 last:border-r-0"><span className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full text-[9px] ${isToday ? 'bg-[#176BFF] font-bold text-white' : muted ? 'text-[#B4BBC2]' : 'text-[#3C4043]'}`}>{day}</span><div className="mt-1 space-y-1">{events.map((event) => <div key={event.label} className={`flex items-center gap-1 rounded-[4px] border px-1.5 py-1 text-[7px] font-bold ${event.tone}`}>{event.icon === 'video' && <Video className="h-2.5 w-2.5 shrink-0" />}<span className="truncate">{event.label}</span></div>)}</div></div>; })}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrainerLandingExperience({ featuredTrainers, onSelectTrainer }: TrainerLandingExperienceProps) {
  const router = useRouter();
  const previewTrainer = featuredTrainers[0];
  const joinAsTrainer = () => router.push('/register?role=trainer');

  return (
    <main>
      <section id="hero-section" className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:pb-16">
        <div className="relative py-5 sm:py-7 lg:py-10">
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.03fr_0.97fr]">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FF] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#2584FF] shadow-sm"><Sparkles className="h-3.5 w-3.5" /> Built for independent trainers</span>
              <h1 className="mt-5 max-w-2xl text-[30px] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#081536] min-[380px]:text-[32px] sm:text-[38px] lg:text-[42px] xl:text-[44px]">Grow your corporate training career with <span className="box-decoration-clone rounded-xl bg-[#95F2D8] px-2 py-0.5 text-[#082733] sm:inline-block sm:rounded-full sm:px-4 sm:py-1">better-fit work.</span></h1>
              <p className="mt-5 max-w-xl text-[13px] font-medium leading-6 text-[#5A6680] sm:text-[15px] sm:leading-7">Build a trusted professional profile, receive relevant enterprise briefs, manage your availability, and turn excellent workshops into lasting credibility.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row"><LandingButton onClick={joinAsTrainer} className="w-full sm:w-auto" endIcon={<ArrowRight className="h-4 w-4" />}>Join as a Trainer</LandingButton><button onClick={() => document.getElementById('trainer-workflow')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-lg border border-[#C9D9EA] bg-white/92 px-5 py-3 text-xs font-black text-[#102044] shadow-[0_10px_24px_rgba(35,67,104,0.09)] transition hover:border-[#9DBBDB] hover:text-[#176BFF]">See how it works</button></div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold text-[#667792]">{['Free to create a profile', 'You set your rates', 'You control your calendar'].map((item) => <span key={item} className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#16A68E]" />{item}</span>)}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }} className="relative mx-auto w-full max-w-[500px]">
              <div className="rounded-[24px] border border-white bg-white/88 p-4 shadow-[0_28px_70px_rgba(40,50,100,0.15)] backdrop-blur-xl sm:p-5">
                <div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="relative"><img src={previewTrainer?.avatarUrl} alt={previewTrainer?.name || 'Trainer profile'} className="h-14 w-14 rounded-[15px] object-cover" /><span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#16B89A] text-white ring-2 ring-white"><Check className="h-3 w-3" /></span></div><div><div className="text-sm font-black text-[#0A1638]">{previewTrainer?.name || 'Your trainer profile'}</div><div className="mt-1 text-[10px] font-semibold text-[#718096]">{previewTrainer?.title || 'Corporate Learning Expert'}</div></div></div><span className="rounded-full bg-[#EAF9F5] px-2.5 py-1 text-[9px] font-black text-[#118B76]">Profile approved</span></div>
                <div className="mt-5 grid grid-cols-3 gap-2">{[{ label: 'Profile views', value: '428', icon: TrendingUp, color: 'text-[#176BFF]', surface: 'bg-[#EEF5FF]' }, { label: 'New matches', value: '12', icon: Sparkles, color: 'text-[#11BFA5]', surface: 'bg-[#E8FFFB]' }, { label: 'Rating', value: '4.9', icon: Star, color: 'text-[#FFB000]', surface: 'bg-[#FFF8DB]' }].map(({ label, value, icon: Icon, color, surface }) => <div key={label} className={`rounded-[13px] p-3 ${surface}`}><Icon className={`h-4 w-4 ${color}`} /><div className="mt-3 text-lg font-black text-[#0A1638]">{value}</div><div className="mt-0.5 text-[8px] font-bold text-[#8390A4]">{label}</div></div>)}</div>
                <div className="mt-4 rounded-[16px] border border-[#E5E9F2] p-4"><div className="flex items-center justify-between"><div><div className="text-[10px] font-black text-[#233755]">Executive Leadership Workshop</div><div className="mt-1 flex items-center gap-1 text-[9px] text-[#7A889C]"><MapPin className="h-3 w-3" /> Bengaluru · In-person</div></div><span className="rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[9px] font-black text-[#176BFF]">96% match</span></div><div className="mt-3 flex items-center justify-between border-t border-[#EDF0F5] pt-3 text-[9px] font-bold text-[#60718A]"><span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> 18–19 Sep</span><span className="flex items-center gap-1"><IndianRupee className="h-3 w-3" /> Within your rate</span></div></div>
              </div>
              <div className="absolute -bottom-5 -left-5 hidden rounded-[14px] border border-[#DDE7F2] bg-white p-3 shadow-xl sm:block"><div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#EAF9F5] text-[#12A68D]"><BriefcaseBusiness className="h-4 w-4" /></span><div><div className="text-[10px] font-black text-[#172A48]">New corporate brief</div><div className="mt-0.5 text-[8px] text-[#7A889C]">Matched 2 minutes ago</div></div></div></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="trainer-workflow" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="A platform for your practice" title="Everything you need to grow with confidence" description="Atlas helps you look professional, find the right opportunities, and keep every engagement organized." />
        <div className="mt-8 grid border-t border-[#DCE5EF] md:grid-cols-2">{benefits.map(({ icon: Icon, title, text, tone }, index) => <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} className={`relative grid min-h-[290px] border-b border-[#DCE5EF] py-7 md:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-6 ${index % 2 === 0 ? 'md:border-r' : ''}`}><div className="relative"><span className={`flex h-11 w-11 items-center justify-center rounded-[13px] ${tone}`}><Icon className="h-5 w-5" /></span><h3 className="mt-4 text-[17px] font-black leading-snug text-[#0A1638]">{title}</h3><p className="mt-2 max-w-[250px] text-xs leading-5 text-[#586B86]">{text}</p></div><div className="relative mt-5 lg:mt-0"><BenefitPreview index={index} /></div></motion.article>)}</div>
      </section>

      <section className="relative overflow-hidden bg-[#F2F6FC] py-14">
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#8C70F0]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#25C8A8]/12 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Simple from day one" title="From profile to confirmed workshop" description="A clear, professional workflow keeps you informed and in control at every step." />
          <div className="relative mt-8 grid overflow-hidden rounded-[22px] border border-[#D7E2ED] bg-white shadow-[0_18px_45px_rgba(44,72,112,0.07)] lg:grid-cols-3 lg:divide-x lg:divide-[#DCE5EF]">
            {[
            { number: '01', icon: UserRoundCheck, title: 'Create your expert profile', text: 'Add your experience, programs, credentials, rates, locations, and client references.' },
            { number: '02', icon: Sparkles, title: 'Receive relevant matches', text: 'Atlas compares corporate briefs with your expertise, dates, delivery mode, and preferences.' },
            { number: '03', icon: BriefcaseBusiness, title: 'Confirm and deliver', text: 'Review complete requirements, connect with the team, and manage the engagement.' },
          ].map(({ number, icon: Icon, title, text }, index) => <motion.article key={number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative border-b border-[#DCE5EF] p-5 last:border-b-0 lg:border-b-0"><div className={`absolute inset-x-0 top-0 h-1 ${index === 0 ? 'bg-[#176BFF]' : index === 1 ? 'bg-[#2584FF]' : 'bg-[#18A98F]'}`} /><div className="flex items-start gap-3"><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] text-white ${index === 0 ? 'bg-[#176BFF]' : index === 1 ? 'bg-[#2584FF]' : 'bg-[#18A98F]'}`}><Icon className="h-5 w-5" /></span><div><span className="text-[8px] font-black uppercase tracking-[0.14em] text-[#718096]">Step {number}</span><h3 className="mt-1 text-[16px] font-black text-[#0A1638]">{title}</h3></div></div><p className="mt-3 text-[11px] leading-5 text-[#5C6F89]">{text}</p><WorkflowPreview index={index} /></motion.article>)}</div>
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Trainer stories" title="Words of appreciation" description="Hear from independent experts building stronger corporate training practices with Atlas." />
        <div className="mt-8 grid border-y border-[#DCE5EF] lg:grid-cols-3">{trainerStories.map((story, index) => <motion.article key={story.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className={`flex min-h-[250px] flex-col justify-between border-b border-[#DCE5EF] py-7 lg:border-b-0 lg:px-7 ${index > 0 ? 'lg:border-l' : ''}`}><div><span className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${index === 0 ? 'bg-[#176BFF]' : index === 1 ? 'bg-[#2584FF]' : 'bg-[#16A58D]'}`}><MessageSquareQuote className="h-4 w-4" /></span><blockquote className="mt-5 text-[15px] font-bold leading-6 text-[#253754]">“{story.quote}”</blockquote></div><div className="mt-6 flex items-center gap-3"><span className={`flex h-10 w-10 items-center justify-center rounded-full ${story.color} text-[10px] font-black text-white`}>{story.initials}</span><div><div className="text-xs font-black text-[#0A1638]">{story.name}</div><div className="mt-0.5 text-[9px] font-semibold text-[#7A889C]">{story.role}</div></div></div></motion.article>)}</div>
      </section>

      <TrainerCalendarWorkspace onJoin={joinAsTrainer} />

      {/* Previous compact profile/calendar preview retained for reference.
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[26px] border border-[#303B70] bg-[#172759] shadow-[0_28px_70px_rgba(10,25,56,0.22)] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="p-6 text-white sm:p-9"><span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#77E2CD]">Your trainer workspace</span><h2 className="mt-4 text-3xl font-black leading-tight">Your profile and calendar, working together.</h2><p className="mt-3 text-sm leading-6 text-[#AEBBD2]">Keep your expertise current and your availability accurate. Atlas uses both to send better opportunities and prevent conflicts.</p><div className="mt-6 space-y-3">{['Profile completion guidance', 'Availability and travel buffers', 'Confirmed workshop schedule', 'Verified client feedback'].map((item) => <div key={item} className="flex items-center gap-2 text-xs font-bold text-[#DDE6F4]"><CheckCircle2 className="h-4 w-4 text-[#31D6B5]" />{item}</div>)}</div><LandingButton onClick={joinAsTrainer} className="mt-7" endIcon={<ArrowRight className="h-4 w-4" />}>Build your trainer profile</LandingButton></div>
          <div className="bg-[#F7F9FC] p-5 sm:p-7"><div className="grid gap-4 sm:grid-cols-[160px_1fr]"><div className="rounded-[17px] bg-white p-4 shadow-sm"><div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[conic-gradient(#7057E8_0_78%,#E8EAF2_78%_100%)]"><div className="flex h-[82px] w-[82px] flex-col items-center justify-center rounded-full bg-white"><span className="text-2xl font-black text-[#0A1638]">78%</span><span className="text-[8px] font-bold text-[#8390A4]">Complete</span></div></div><p className="mt-4 text-center text-[10px] font-black text-[#314361]">Profile strength</p></div><div className="rounded-[17px] bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><div><div className="text-xs font-black text-[#172A48]">September 2026</div><div className="mt-0.5 text-[8px] text-[#8390A4]">Your availability</div></div><CalendarDays className="h-5 w-5 text-[#7057E8]" /></div><div className="mt-4 grid grid-cols-7 gap-1 text-center">{['M','T','W','T','F','S','S'].map((day, i) => <span key={`${day}-${i}`} className="text-[8px] font-black text-[#99A4B4]">{day}</span>)}{Array.from({ length: 28 }, (_, i) => i + 1).map((day) => { const blocked = [5, 6, 13, 18, 19].includes(day); const booked = [9, 10, 24].includes(day); return <span key={day} className={`flex aspect-square items-center justify-center rounded-[6px] text-[8px] font-bold ${booked ? 'bg-[#7057E8] text-white' : blocked ? 'bg-[#FFEDEC] text-[#D45045]' : 'bg-[#F4F7FA] text-[#5D6E87]'}`}>{day}</span>; })}</div><div className="mt-3 flex flex-wrap gap-3 text-[8px] font-bold text-[#718096]"><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-sm bg-[#7057E8]" />Booked</span><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-sm bg-[#FFEDEC]" />Unavailable</span></div></div></div></div>
        </div>
      </section>
      */}

      {previewTrainer && <button className="sr-only" onClick={() => onSelectTrainer(previewTrainer)}>Preview trainer profile</button>}
    </main>
  );
}
