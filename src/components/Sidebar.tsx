'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { BarChart3, Bookmark, CalendarDays, FileText, Layers3, Search, Settings, Users } from 'lucide-react';

interface SidebarProps { shortlistCount: number; }

export const Sidebar: React.FC<SidebarProps> = ({ shortlistCount }) => {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = [
    { label: 'Overview', icon: Layers3, path: '/dashboard' },
    { label: 'Trainers', icon: Users, path: '/experts' },
    { label: 'Workshops', icon: CalendarDays, path: '/engagements' },
    { label: 'Bookings', icon: Bookmark, path: '/shortlist', badge: shortlistCount },
    { label: 'Analytics', icon: BarChart3, path: '/requirements' },
    { label: 'Reports', icon: BarChart3, path: '/reports' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-[194px] shrink-0 flex-col border-r border-[#D4DEE9] bg-white px-4 py-7 lg:flex">
      <button onClick={() => router.push('/')} className="flex items-center gap-2.5 px-2 text-left">
        <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#1BAE9A] text-base font-black text-white">A</span>
        <span className="text-[23px] font-black tracking-tight text-[#071638]">Atlas</span>
      </button>
      <nav className="mt-8 space-y-2" aria-label="Dashboard navigation">
        {navItems.map(({ label, icon: Icon, path, badge }) => {
          const active = pathname === path || (path === '/requirements' && pathname === '/create-requirement');
          return <button key={label} onClick={() => router.push(path)} className={`flex w-full items-center justify-between rounded-[11px] px-3 py-3 text-[13px] font-bold transition ${active ? 'bg-[#E6F0FF] text-[#176BFF]' : 'text-[#425574] hover:bg-[#F1F5FA] hover:text-[#24324A]'}`}><span className="flex items-center gap-3"><Icon className="h-[18px] w-[18px]" />{label}</span>{!!badge && <span className="rounded-full bg-[#176BFF] px-1.5 py-0.5 text-[9px] text-white">{badge}</span>}</button>;
        })}
      </nav>
    </aside>
  );
};
