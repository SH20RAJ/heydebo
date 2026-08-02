import type { Metadata } from 'next';
import { MasterPlanViewWrapper } from '@/components/views/master-plan-view-wrapper';

export const metadata: Metadata = {
  title: 'Master Routine (todo.md) | heydebo OS',
  description: 'BIT Mesra master weekly routine, daily framework, break protocols & YouTube revision cycle.',
};

export default function MasterPlanPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary font-sans py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <MasterPlanViewWrapper />
    </main>
  );
}
