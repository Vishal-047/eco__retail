import './globals.css';
import '../styles/App.css';
import '../styles/index.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Providers from '../components/Providers';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

// [N1] Premium typography — Inter is used by Vercel, Linear, Notion
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EcoRetail — Shop Smart, Save the Planet',
  description: 'Track carbon emissions, discover eco-friendly products, and make sustainable shopping decisions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
