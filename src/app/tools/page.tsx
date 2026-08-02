import type { Metadata } from 'next';
import { ToolsViewWrapper } from '@/components/views/tools-view-wrapper';

export const metadata: Metadata = {
  title: 'Productivity Tools & Pomodoro | heydebo OS',
  description: 'Interactive Pomodoro focus timer, Master Routine todo.md viewer, Break advisor & Library decision solver.',
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary font-sans py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <ToolsViewWrapper />
    </main>
  );
}
