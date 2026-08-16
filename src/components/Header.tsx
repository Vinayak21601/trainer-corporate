'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, ChevronDown, CircleHelp, Menu, Search } from 'lucide-react';

interface HeaderProps { shortlistCount: number; onOpenAiAssistant: () => void; }

export const Header: React.FC<HeaderProps> = () => {
  const pathname = usePathname();
  const router = useRouter();
  const pageName = pathname === '/dashboard' ? 'Overview' : pathname.split('/').filter(Boolean)[0]?.replaceAll('-', ' ') || 'Overview';
  return (
    <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-[#E3EAF2] bg-white/95 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-[#E1E9F2] text-[#53617A] lg:hidden"><Menu className="h-4 w-4" /></button>
        <button onClick={() => router.push('/')} className="flex items-center gap-2 lg:hidden"><span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#18BFA5] text-xs font-black text-white">A</span><span className="font-black text-[#091536]">Atlas</span></button>
        <span className="hidden text-sm font-black capitalize text-[#142344] lg:block">{pageName}</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-3">
        <button onClick={() => router.push('/experts')} className="hidden h-9 w-48 items-center gap-2 rounded-[9px] border border-[#E1E9F2] bg-[#F9FBFD] px-3 text-left text-[11px] text-[#8793A6] md:flex"><Search className="h-3.5 w-3.5" /> Search platform</button>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-[9px] text-[#59677E] hover:bg-[#F2F6FA]"><Bell className="h-[18px] w-[18px]" /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#176BFF] ring-2 ring-white" /></button>
        <button className="hidden h-9 w-9 items-center justify-center rounded-[9px] text-[#59677E] hover:bg-[#F2F6FA] sm:flex"><CircleHelp className="h-[18px] w-[18px]" /></button>
        <div className="ml-1 flex items-center gap-2.5 border-l border-[#E3EAF2] pl-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1746C8] text-[11px] font-black text-white">RM</span><div className="hidden leading-tight sm:block"><div className="text-xs font-black text-[#142344]">Ritika Mehra</div><div className="mt-0.5 text-[10px] text-[#7A889C]">L&amp;D Manager</div></div><ChevronDown className="hidden h-3.5 w-3.5 text-[#8793A6] sm:block" /></div>
      </div>
    </header>
  );
};
