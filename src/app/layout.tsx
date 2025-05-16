import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import BackgroundEffect from '../components/BackgroundEffect';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Andrew Eroshenkov',
  description: 'Portfolio of Andrew Eroshenkov',
  authors: [{ name: 'Andrew Eroshenkov', url: 'https://github.com/ijustseen' }],
  keywords: ['portfolio', 'software engineer', 'web developer', 'developer', 'student'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <BackgroundEffect />
        {children}
      </body>
    </html>
  );
}
