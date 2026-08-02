import type { Metadata } from 'next';
import { HomeView } from '@/components/views/home-view';

export const metadata: Metadata = {
  title: 'heydebo OS | Mission Control',
  description: 'Automated CS Student Life Operating System & Second Brain. Focus on the ONE thing you need right now.',
  openGraph: {
    title: 'heydebo OS | Mission Control',
    description: 'Automated CS Student Life Operating System & Second Brain.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary font-sans antialiased relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <HomeView />
      </div>
    </main>
  );
}
