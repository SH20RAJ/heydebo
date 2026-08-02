import type { Metadata } from 'next';
import { SubjectsViewWrapper } from '@/components/views/subjects-view-wrapper';

export const metadata: Metadata = {
  title: 'CS Subjects Browser | heydebo OS',
  description: 'Apple Files style subject browser, syllabus tracker, PYQs & YouTube Feynman teaching module.',
};

export default function SubjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SubjectsViewWrapper />
      </div>
    </main>
  );
}
