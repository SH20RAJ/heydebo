'use client';

import { motion } from 'framer-motion';

interface RingData {
  name: string;
  value: number; // 0-100
  color: string;
  radius: number;
  strokeWidth: number;
}

interface ProgressRingsProps {
  focusProgress?: number;       // 85%
  dsaProgress?: number;         // 70%
  workoutProgress?: number;     // 60%
  hydrationProgress?: number;   // 90%
  sleepScore?: number;          // 88%
}

export function ProgressRings({
  focusProgress = 85,
  dsaProgress = 72,
  workoutProgress = 60,
  hydrationProgress = 90,
  sleepScore = 88
}: ProgressRingsProps) {
  const size = 220;
  const center = size / 2;

  const rings: RingData[] = [
    { name: 'Focus Hours', value: focusProgress, color: '#30D158', radius: 95, strokeWidth: 12 },
    { name: 'Google DSA', value: dsaProgress, color: '#00F0FF', radius: 78, strokeWidth: 12 },
    { name: 'Calisthenics', value: workoutProgress, color: '#FF2D55', radius: 61, strokeWidth: 12 },
    { name: 'Hydration', value: hydrationProgress, color: '#64D2FF', radius: 44, strokeWidth: 12 },
    { name: 'Sleep Score', value: sleepScore, color: '#BF5AF2', radius: 27, strokeWidth: 12 },
  ];

  return (
    <div className="relative flex items-center justify-center p-2">
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {rings.map((ring, i) => {
          const circumference = 2 * Math.PI * ring.radius;
          const strokeDashoffset = circumference - (ring.value / 100) * circumference;

          return (
            <g key={i}>
              {/* Background Ring Track */}
              <circle
                cx={center}
                cy={center}
                r={ring.radius}
                stroke={ring.color}
                strokeWidth={ring.strokeWidth}
                strokeOpacity={0.15}
                fill="none"
              />
              {/* Animated Progress Arc */}
              <motion.circle
                cx={center}
                cy={center}
                r={ring.radius}
                stroke={ring.color}
                strokeWidth={ring.strokeWidth}
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: i * 0.15 }}
                strokeLinecap="round"
                fill="none"
                style={{ filter: `drop-shadow(0px 0px 6px ${ring.color}80)` }}
              />
            </g>
          );
        })}
      </svg>

      {/* Center Apple-style Stat Badge */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="text-2xl font-black tracking-tight text-white font-mono">
          {Math.round((focusProgress + dsaProgress + workoutProgress + hydrationProgress) / 4)}%
        </span>
        <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
          DAILY OS
        </span>
      </div>
    </div>
  );
}
