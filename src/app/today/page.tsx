import type { Metadata } from 'next';
import { TodayViewWrapper } from '@/components/views/today-view-wrapper';

export const metadata: Metadata = {
  title: 'Today Stream | heydebo OS',
  description: 'Single unified daily schedule stream for BIT Mesra CSE 5th Semester.',
};

export default function TodayPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <TodayViewWrapper />
      </div>
    </main>
  );
}
