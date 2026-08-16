'use client';

import { Building2, GraduationCap } from 'lucide-react';

export type LandingPersona = 'corporate' | 'trainer';

interface PersonaSwitcherProps {
  persona: LandingPersona;
  isPending?: boolean;
  onChange: (persona: LandingPersona) => void;
}

const personas = [
  { id: 'corporate' as const, label: "I'm Corporate", detail: 'Find and manage trainers', icon: Building2 },
  { id: 'trainer' as const, label: "I'm a Trainer", detail: 'Grow your training career', icon: GraduationCap },
];

export function PersonaSwitcher({ persona, isPending = false, onChange }: PersonaSwitcherProps) {
  return (
    <section aria-label="Choose your Atlas experience" className="relative z-20 mx-auto w-full max-w-7xl px-4 pt-2 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[590px] flex-col items-center gap-3">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.16em] text-[#687791]">Choose your Atlas experience</p>
        <div className="grid w-full grid-cols-2 gap-1.5 rounded-[18px] border border-[#D8E5F2] bg-white/90 p-1.5 shadow-[0_14px_36px_rgba(32,73,112,0.10)] backdrop-blur-xl">
          {personas.map(({ id, label, detail, icon: Icon }) => {
            const active = persona === id;
            return (
              <button key={id} type="button" aria-pressed={active} onClick={() => onChange(id)} className={`relative flex min-w-0 items-center justify-center gap-2.5 overflow-hidden rounded-[13px] px-3 py-3 text-left transition ${active ? 'text-white' : 'text-[#425574] hover:bg-[#F2F7FC]'}`}>
                {active && <span className={`absolute inset-0 ${id === 'corporate' ? 'bg-[#176BFF]' : 'bg-[#18A990]'}`} />}
                <span className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${active ? 'bg-white/16' : id === 'corporate' ? 'bg-[#EAF3FF] text-[#176BFF]' : 'bg-[#F0EDFF] text-[#7057E8]'}`}><Icon className="h-4 w-4" /></span>
                <span className="relative min-w-0"><span className="block truncate text-xs font-black sm:text-sm">{label}</span><span className={`mt-0.5 hidden truncate text-[9px] font-semibold sm:block ${active ? 'text-white/72' : 'text-[#8794A7]'}`}>{detail}</span></span>
              </button>
            );
          })}
        </div>
        <span className={`h-1 text-[9px] font-bold text-[#718096] transition-opacity ${isPending ? 'opacity-100' : 'opacity-0'}`} aria-live="polite">Updating your experience…</span>
      </div>
    </section>
  );
}
