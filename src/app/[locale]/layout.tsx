import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Playfair_Display } from 'next/font/google';
import '../globals.css';
import { BottomNav } from '@/components/BottomNav';
import { AppShell } from '@/components/AppShell';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'MaaltijdMate',
  description: 'Jouw persoonlijke maaltijdplanner',
  manifest: '/manifest.json',
  themeColor: '#16a34a',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} ${playfair.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <AppShell>
            {children}
          </AppShell>
          <BottomNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
