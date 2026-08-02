import type { Metadata } from 'next';
import { TimelineViewWrapper } from '@/components/views/timeline-view-wrapper';

export const metadata: Metadata = {
  title: 'Timeline OS | heydebo OS',
  description: '2x enlarged active task focus timeline from 06:00 wake up to 23:00 sleep.',
};

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <TimelineViewWrapper />
      </div>
    </main>
  );
}
