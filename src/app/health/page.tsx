import type { Metadata } from 'next';
import { HealthViewWrapper } from '@/components/views/health-view-wrapper';

export const metadata: Metadata = {
  title: 'Unified Health & Calisthenics | heydebo OS',
  description: 'Water tracker, Sleep REM score, Creatine, Coffee cutoff timer, Protein & 5-Day Calisthenics split.',
};

export default function HealthPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <HealthViewWrapper />
      </div>
    </main>
  );
}
