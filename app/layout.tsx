import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jazz Chronicle - A Modern Jazz Music Blog',
  description: 'Explore the world of jazz music through expert articles, artist spotlights, album reviews, and historical insights.',
  keywords: 'jazz, music, blog, artists, albums, reviews, history',
  authors: [{ name: 'Jazz Chronicle Team' }],
  creator: 'Jazz Chronicle',
  publisher: 'Jazz Chronicle',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jazzchronicle.com',
    title: 'Jazz Chronicle - A Modern Jazz Music Blog',
    description: 'Explore the world of jazz music through expert articles, artist spotlights, album reviews, and historical insights.',
    siteName: 'Jazz Chronicle',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jazz Chronicle - A Modern Jazz Music Blog',
    description: 'Explore the world of jazz music through expert articles, artist spotlights, album reviews, and historical insights.',
    creator: '@jazzchronicle',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}