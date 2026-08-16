import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/src/context/AppContext';
import { AppShell } from '@/src/components/AppShell';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Corporate | Trainer — The One Gate',
  description: 'Connect corporate learning teams with verified trainers, manage training requirements, and grow professional training careers through one trusted platform.',
  openGraph: {
    title: 'Corporate | Trainer — The One Gate',
    description: 'One trusted platform for corporate teams to find verified trainers and for training professionals to grow their careers.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporate | Trainer — The One Gate',
    description: 'Find verified corporate trainers, manage learning requirements, and grow your professional training career.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
