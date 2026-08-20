'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useApp } from '../context/AppContext';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { shortlistedTrainers, openAiAssistant } = useApp();

  // Marketing, auth, and onboarding wizard pages own their full-screen layouts.
  const isFullScreen = 
    pathname === '/' || 
    pathname === '/login' || 
    pathname === '/register' || 
    pathname === '/create-requirement' || 
    pathname === '/onboarding' ||
    pathname === '/trainer-registration' ||
    pathname === '/join-as-trainer' ||
    pathname === '/trainer-onboarding';

  if (isFullScreen) {
    return <div className="min-h-screen bg-white font-sans text-[#111111]">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#F7F9FC] font-sans text-[#111111]">
      <Sidebar shortlistCount={shortlistedTrainers.length} />
      <div className="flex min-w-0 flex-1 flex-col">
        {pathname !== '/dashboard' && (
          <Header shortlistCount={shortlistedTrainers.length} onOpenAiAssistant={openAiAssistant} />
        )}
        <main className="flex min-w-0 flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
};
