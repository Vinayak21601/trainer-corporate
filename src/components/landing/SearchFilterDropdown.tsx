'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
}

interface SearchFilterDropdownProps {
  label: string;
  value: string;
  options: DropdownOption[];
  icon: ReactNode;
  onChange: (value: string) => void;
}

export function SearchFilterDropdown({ label, value, options, icon, onChange }: SearchFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-w-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className={`atlas-focus flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left ring-1 transition ${isOpen ? 'bg-white ring-[#176BFF] shadow-[0_8px_22px_rgba(23,107,255,0.10)]' : 'bg-[#F8FBFE] ring-[#E4ECF4] hover:bg-white hover:ring-[#C7DAEC]'}`}
      >
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${isOpen ? 'bg-[#E6F2FF] text-[#176BFF]' : 'bg-white text-[#6D829C] shadow-sm'}`}>{icon}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-[8px] font-black uppercase tracking-[0.1em] text-[#8390A4]">{label}</span>
          <span className="mt-0.5 block truncate text-[10px] font-black text-[#263650]">{selectedOption.label}</span>
        </span>
        <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-[#718096] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#176BFF]' : ''}`} />
      </button>

      {isOpen && (
        <div role="listbox" aria-label={label} className="absolute left-0 top-[calc(100%+6px)] z-50 w-full min-w-[190px] overflow-hidden rounded-xl border border-[#D9E7F4] bg-white p-1.5 shadow-[0_18px_45px_rgba(30,65,105,0.18)]">
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <button
                key={option.value || 'all'}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-[10px] font-bold transition ${selected ? 'bg-[#EAF4FF] text-[#176BFF]' : 'text-[#44546C] hover:bg-[#F3F7FB] hover:text-[#122044]'}`}
              >
                <span>{option.label}</span>
                {selected && <Check className="h-3.5 w-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
