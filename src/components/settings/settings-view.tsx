'use client';

import { useState } from 'react';
import { Settings as SettingsIcon, Award, Shield, RotateCcw, Save } from 'lucide-react';
import { semesterFixture } from '@/fixtures';

export function SettingsView() {
  const [cgpa, setCgpa] = useState(semesterFixture.targetCGPA);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 pb-24 pt-16 max-w-2xl mx-auto text-xs">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-black text-foreground">Settings & Preferences</h1>
        <p className="text-muted-foreground mt-1">BIT Mesra CSE 5th Semester academic goals & operational limits.</p>
      </div>

      <div className="bg-card border border-border p-6 rounded-3xl space-y-5">
        <div className="space-y-1">
          <label className="block text-muted-foreground font-bold uppercase text-[10px]">Academic CGPA Target</label>
          <input
            type="number"
            step="0.01"
            value={cgpa}
            onChange={(e) => setCgpa(parseFloat(e.target.value))}
            className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-foreground font-mono font-bold focus:outline-none focus:border-primary text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-muted-foreground font-bold uppercase text-[10px]">Minimum Attendance Threshold</label>
          <div className="p-3 bg-secondary rounded-xl border border-border font-mono text-foreground font-bold">
            75% Safeguard (Goal: 85%)
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-muted-foreground font-bold uppercase text-[10px]">Institution & Department</label>
          <div className="p-3 bg-secondary rounded-xl border border-border text-foreground font-semibold">
            {semesterFixture.institution} • {semesterFixture.department} ({semesterFixture.semester})
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>{saved ? 'Settings Saved' : 'Save Preferences'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
