'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Coffee, 
  Dumbbell, 
  Video, 
  MapPin, 
  BookOpen, 
  Sparkles,
  ArrowLeft,
  Flame
} from 'lucide-react';
import { BottomDock } from '@/components/navigation/bottom-dock';
import { CommandPalette } from '@/components/command/command-palette';
import { RecoveryModal } from '@/components/modals/recovery-modal';

export default function MasterPlanPage() {
  const [activeTab, setActiveTab] = useState<'framework' | 'weekly' | 'breaks' | 'supplements' | 'youtube' | 'targets'>('framework');
  const [commandOpen, setCommandOpen] = useState(false);
  const [recoveryOpen, setRecoveryOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-primary font-bold uppercase mb-1">
            <FileText className="w-4 h-4" />
            <span>Master Routine & Todo Protocol (todo.md)</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">BIT Mesra Master Routine</h1>
          <p className="text-xs text-muted-foreground mt-1">
            9+ CGPA, Google DSA, Calisthenics & YouTube Revision Framework.
          </p>
        </div>

        <Link
          href="/tools"
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-secondary border border-border text-xs font-bold text-foreground hover:bg-card transition w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Tools</span>
        </Link>
      </div>

      {/* Tab Selector */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {[
          { id: 'framework', label: '🌅 Daily Framework' },
          { id: 'weekly', label: '📅 Mon-Sun Schedule' },
          { id: 'breaks', label: '⏱️ Break Protocol' },
          { id: 'supplements', label: '☕ Supplements' },
          { id: 'youtube', label: '🎥 YouTube Revision' },
          { id: 'targets', label: '📊 Weekly Targets' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 rounded-xl border font-bold transition ${
              activeTab === t.id
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: DAILY FRAMEWORK */}
      {activeTab === 'framework' && (
        <div className="bg-card border border-border p-6 rounded-3xl space-y-4 text-xs">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> Daily Framework Overview
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground uppercase text-[10px] font-mono">
                  <th className="py-2.5 px-3">Time</th>
                  <th className="py-2.5 px-3">Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground font-medium">
                <tr><td className="py-2.5 px-3 font-mono text-primary font-bold">06:15 AM</td><td className="py-2.5 px-3">Wake up, water, freshen up</td></tr>
                <tr><td className="py-2.5 px-3 font-mono text-primary font-bold">06:20 – 06:35 AM</td><td className="py-2.5 px-3">Walk + sunlight + hydration (500ml)</td></tr>
                <tr><td className="py-2.5 px-3 font-mono text-primary font-bold">06:35 – 06:45 AM</td><td className="py-2.5 px-3">Stretching & planning the day</td></tr>
                <tr><td className="py-2.5 px-3 font-mono text-primary font-bold">06:45 – 07:00 AM</td><td className="py-2.5 px-3">Breakfast + 5g Creatine</td></tr>
                <tr><td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">07:00 – 08:00 AM</td><td className="py-2.5 px-3">🧠 Google DSA Deep Work</td></tr>
                <tr><td className="py-2.5 px-3 font-mono text-primary font-bold">08:00 AM Onwards</td><td className="py-2.5 px-3">BIT Mesra Official Class Schedule</td></tr>
                <tr><td className="py-2.5 px-3 font-mono text-primary font-bold">After Classes</td><td className="py-2.5 px-3">Review lecture notes (20-30 min)</td></tr>
                <tr><td className="py-2.5 px-3 font-mono text-rose-400 font-bold">06:00 – 07:15 PM</td><td className="py-2.5 px-3">💪 5-Day Calisthenics Workout Split</td></tr>
                <tr><td className="py-2.5 px-3 font-mono text-primary font-bold">07:15 – 07:45 PM</td><td className="py-2.5 px-3">Bath + High-Protein Dinner</td></tr>
                <tr><td className="py-2.5 px-3 font-mono text-primary font-bold">08:00 – 10:00 PM</td><td className="py-2.5 px-3">📚 DSA / College Study in Library</td></tr>
                <tr><td className="py-2.5 px-3 font-mono text-rose-500 font-bold">10:00 – 11:00 PM</td><td className="py-2.5 px-3">🎥 Record YouTube Feynman Revision Video</td></tr>
                <tr><td className="py-2.5 px-3 font-mono text-purple-400 font-bold">11:15 PM</td><td className="py-2.5 px-3">Sleep preparation & Magnesium Glycinate</td></tr>
                <tr><td className="py-2.5 px-3 font-mono text-purple-400 font-bold">11:30 PM</td><td className="py-2.5 px-3">Deep REM Sleep Recovery</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 2: WEEKLY DAY-BY-DAY SCHEDULE */}
      {activeTab === 'weekly' && (
        <div className="space-y-4 text-xs">
          {[
            { day: 'Monday', tasks: [
              { time: '07:00 – 08:00', task: 'DSA (Trees / Graphs)' },
              { time: '08:00 – 12:30', task: 'Self Study / Pending Assignments' },
              { time: '13:30 – 17:20', task: 'Classes: NLP (G3) → AI (G3) → DMCT (G3) → DCCN (G3)' },
              { time: '18:30 – 19:45', task: 'Calisthenics (Chest & Front Lever)' },
              { time: '20:00 – 22:00', task: 'Revise today’s lectures' },
              { time: '22:00 – 23:00', task: 'Record DCCN/AI revision video' },
            ]},
            { day: 'Tuesday', tasks: [
              { time: '09:00 – 12:50', task: 'Classes: AI (220) → DMCT (220) → CD (220) → SE (220)' },
              { time: '12:50 – 14:00', task: 'Lunch + Library Quick Revision' },
              { time: '14:00 – 15:20', task: 'DSA (Library)' },
              { time: '14:30 – 17:20', task: 'AI Lab (Lab 4)' },
              { time: '17:45 – 19:00', task: 'Calisthenics (Arms & Handstand)' },
              { time: '20:00 – 22:00', task: 'AI Lab Record + DSA' },
              { time: '22:00 – 23:00', task: 'Record AI topic video' },
            ]},
            { day: 'Wednesday', tasks: [
              { time: '07:00 – 09:00', task: 'DSA Deep Work' },
              { time: '10:00 – 12:50', task: 'Classes: DCCN (220) → DMCT (220) → CD (220)' },
              { time: '14:00 – 16:00', task: 'Library (Assignments / Revision)' },
              { time: '16:00 – 17:00', task: 'Record video' },
              { time: '18:00 – 19:15', task: 'Calisthenics (Legs)' },
              { time: '20:00 – 22:00', task: 'College Revision' },
            ]},
            { day: 'Thursday', tasks: [
              { time: '07:00 – 09:30', task: 'Hard DSA (Monotonic Stack / DP)' },
              { time: '10:00 – 11:50', task: 'Compiler Design Lab (Lab 1)' },
              { time: '13:30 – 17:20', task: 'Classes: CD (214) → AI (214) → NLP (214) → DCCN (220)' },
              { time: '18:00 – 19:15', task: 'Calisthenics (Back & Muscle-Up)' },
              { time: '20:00 – 22:00', task: 'Compiler Design Revision' },
              { time: '22:00 – 23:00', task: 'Record Compiler lecture' },
            ]},
            { day: 'Friday', tasks: [
              { time: '09:00 – 09:50', task: 'NLP Class (220)' },
              { time: '10:00 – 11:50', task: 'DCCN Lab (Lab 4)' },
              { time: '14:00 – 16:00', task: 'Library (Complete all pending work)' },
              { time: '18:00 – 19:15', task: 'Calisthenics (Abs + Core Skills)' },
              { time: '20:00 – 22:00', task: 'Weekly Subject Revision' },
              { time: '22:00 – 23:00', task: 'Weekly YouTube Batch Recording' },
            ]},
            { day: 'Saturday', tasks: [
              { time: '07:00 – 10:00', task: 'Codeforces / LeetCode Weekly Contest' },
              { time: '10:30 – 12:30', task: 'Batch Record 3–5 Videos' },
              { time: '14:00 – 17:00', task: 'Edit & Schedule Videos' },
              { time: '18:00 – 19:00', task: 'Mobility & Stretching' },
            ]},
            { day: 'Sunday', tasks: [
              { time: '07:00 – 10:00', task: 'Weekly Revision (All Subjects)' },
              { time: '10:00 – 12:00', task: 'PYQs + Weak Topics' },
              { time: '14:00 – 16:00', task: 'Plan Next Week' },
              { time: '19:00 – 21:00', task: 'Mock Test (DSA or Subject)' },
            ]}
          ].map(d => (
            <div key={d.day} className="bg-card border border-border p-4 rounded-2xl space-y-2">
              <h3 className="font-bold text-sm text-primary font-mono">📅 {d.day}</h3>
              <div className="space-y-1">
                {d.tasks.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-secondary/50 font-medium">
                    <span className="font-mono text-muted-foreground font-bold text-[11px]">{t.time}</span>
                    <span className="text-foreground text-right">{t.task}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 3: BREAK PROTOCOL */}
      {activeTab === 'breaks' && (
        <div className="bg-card border border-border p-6 rounded-3xl space-y-4 text-xs">
          <h2 className="text-lg font-bold text-foreground">⏱️ What to Do During Breaks</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-secondary rounded-2xl border border-border space-y-2">
              <span className="font-mono font-bold text-primary text-sm">5 – 10 min</span>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                <li>Drink water</li>
                <li>Stretch body</li>
                <li>Walk</li>
                <li>Check next room</li>
                <li>Review flashcards</li>
              </ul>
            </div>

            <div className="p-4 bg-secondary rounded-2xl border border-border space-y-2">
              <span className="font-mono font-bold text-emerald-400 text-sm">20 – 30 min</span>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                <li>Revise prev lecture</li>
                <li>Solve 1 Easy DSA</li>
                <li>Organize notes</li>
                <li>Hydrate</li>
              </ul>
            </div>

            <div className="p-4 bg-secondary rounded-2xl border border-border space-y-2">
              <span className="font-mono font-bold text-cyan-400 text-sm">45 – 90 min</span>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                <li>Go to Library</li>
                <li>Solve 2 Medium DSA</li>
                <li>Finish assignments</li>
                <li>Record short video</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: SUPPLEMENTS */}
      {activeTab === 'supplements' && (
        <div className="bg-card border border-border p-6 rounded-3xl space-y-4 text-xs">
          <h2 className="text-lg font-bold text-foreground">☕ Biohacking Supplement Matrix</h2>

          <div className="space-y-2 font-medium">
            <div className="p-3 bg-secondary rounded-xl border border-border flex justify-between">
              <span>💧 Water Intake</span>
              <span className="font-mono text-primary font-bold">500ml after waking (3.5L total/day)</span>
            </div>
            <div className="p-3 bg-secondary rounded-xl border border-border flex justify-between">
              <span>☕ Black Coffee</span>
              <span className="font-mono text-amber-400 font-bold">30 min before DSA / workout (Cutoff 2 PM)</span>
            </div>
            <div className="p-3 bg-secondary rounded-xl border border-border flex justify-between">
              <span>💊 Creatine Monohydrate</span>
              <span className="font-mono text-emerald-400 font-bold">5g daily after workout or with lunch</span>
            </div>
            <div className="p-3 bg-secondary rounded-xl border border-border flex justify-between">
              <span>🥤 Protein Shake</span>
              <span className="font-mono text-rose-400 font-bold">30g Whey within 1 hour after workout</span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: YOUTUBE REVISION */}
      {activeTab === 'youtube' && (
        <div className="bg-card border border-border p-6 rounded-3xl space-y-4 text-xs">
          <h2 className="text-lg font-bold text-foreground">🎥 YouTube as Revision Cycle (Feynman Technique)</h2>

          <div className="p-4 bg-secondary rounded-2xl border border-border text-center font-mono space-y-2">
            <div className="font-bold text-sm text-foreground">Attend Class &rarr; Review Notes (20 min) &rarr; Solve PYQs &rarr; Record 10-15 min Video &rarr; Upload / Revision Complete</div>
          </div>

          <ul className="space-y-1.5 text-muted-foreground list-disc list-inside">
            <li><strong>Monday–Friday:</strong> 1 short educational video/day (10–20 min recording).</li>
            <li><strong>Saturday:</strong> Batch record and schedule multiple videos.</li>
            <li><strong>Sunday:</strong> Plan next week&apos;s video content syllabus.</li>
          </ul>
        </div>
      )}

      {/* SECTION 6: WEEKLY TARGETS */}
      {activeTab === 'targets' && (
        <div className="bg-card border border-border p-6 rounded-3xl space-y-3 text-xs">
          <h2 className="text-lg font-bold text-foreground">📊 Weekly Non-Negotiable Targets</h2>

          <div className="space-y-2">
            {[
              'Attend all lectures (>85% attendance)',
              'Revise every lecture within 24 hours',
              '20–25 LeetCode problems solved',
              '1 Codeforces contest completed',
              '5 Calisthenics sessions executed',
              '5 YouTube educational videos uploaded',
              'Finish all assignments before Sunday'
            ].map((t, idx) => (
              <div key={idx} className="flex items-center space-x-2 p-2.5 rounded-xl bg-secondary/50 border border-border font-medium text-foreground">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Dock */}
      <BottomDock
        activeTab="master-plan"
        onNavigateTab={(tab) => {
          if (tab === 'home') window.location.href = '/';
          else if (tab === 'today') window.location.href = '/today';
          else if (tab === 'subjects') window.location.href = '/subjects';
          else if (tab === 'dsa') window.location.href = '/dsa';
          else if (tab === 'tools') window.location.href = '/tools';
        }}
        onOpenCommandPalette={() => setCommandOpen(true)}
      />

      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onNavigateTab={(tab) => {
          if (tab === 'home') window.location.href = '/';
          else if (tab === 'today') window.location.href = '/today';
          else if (tab === 'subjects') window.location.href = '/subjects';
          else if (tab === 'dsa') window.location.href = '/dsa';
          else if (tab === 'tools') window.location.href = '/tools';
        }}
        onOpenRecovery={() => setRecoveryOpen(true)}
        onLogWater={() => {}}
      />

      <RecoveryModal
        isOpen={recoveryOpen}
        onClose={() => setRecoveryOpen(false)}
        onConfirmRecovery={() => {}}
      />
    </main>
  );
}
