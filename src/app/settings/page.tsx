import type { Metadata } from 'next';
import { SettingsViewWrapper } from '@/components/views/settings-view-wrapper';

export const metadata: Metadata = {
  title: 'Settings & Academic Targets | heydebo OS',
  description: 'BIT Mesra Ranchi B.Tech CSE 9+ CGPA targets & system preferences.',
};

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SettingsViewWrapper />
      </div>
    </main>
  );
}
