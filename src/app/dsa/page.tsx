import type { Metadata } from 'next';
import { DSAViewWrapper } from '@/components/views/dsa-view-wrapper';

export const metadata: Metadata = {
  title: 'Google DSA Interview OS | heydebo OS',
  description: '12-week Google roadmap, Monotonic Stack & DP patterns, 3 daily problems, mistakes notebook.',
};

export default function DSAPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <DSAViewWrapper />
      </div>
    </main>
  );
}
