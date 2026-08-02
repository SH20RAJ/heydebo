import Dexie, { type Table } from 'dexie';
import type { 
  TimelineActivity, 
  Subject, 
  DSAProblem, 
  DSAMistakeLog,
  CalisthenicsExercise, 
  SupplementItem, 
  SmartNotification 
} from './types';

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  category: string;
  updatedAt: string;
}

export interface FlashcardItem {
  id: string;
  subjectCode: string;
  front: string;
  back: string;
  intervalDays: number;
  nextReviewDate: string;
}

export class DeboOSDatabase extends Dexie {
  timeline!: Table<TimelineActivity, string>;
  subjects!: Table<Subject, string>;
  dsaProblems!: Table<DSAProblem, string>;
  dsaMistakes!: Table<DSAMistakeLog, string>;
  calisthenics!: Table<CalisthenicsExercise, string>;
  supplements!: Table<SupplementItem, string>;
  notifications!: Table<SmartNotification, string>;
  notes!: Table<NoteItem, string>;
  flashcards!: Table<FlashcardItem, string>;

  constructor() {
    super('DeboOSDatabase');
    this.version(2).stores({
      timeline: 'id, startTime, status, category, dayOfWeek',
      subjects: 'id, code, name',
      dsaProblems: 'id, pattern, difficulty, solved',
      dsaMistakes: 'id, date, pattern',
      calisthenics: 'id, day, completedToday',
      supplements: 'id, category, completedToday',
      notifications: 'id, timestamp, read',
      notes: 'id, category, updatedAt',
      flashcards: 'id, subjectCode, nextReviewDate'
    });
  }
}

export const db = new DeboOSDatabase();

export async function initializeSeedData() {
  // Clear old seed data if updating schema
  const versionKey = 'debo_seed_version_v3';
  const seeded = localStorage.getItem(versionKey);
  if (!seeded) {
    await db.timeline.clear();
    await db.subjects.clear();
    await db.dsaProblems.clear();
    await db.calisthenics.clear();
    await db.supplements.clear();
    localStorage.setItem(versionKey, 'true');
  } else {
    const count = await db.timeline.count();
    if (count > 0) return;
  }

  // BIT MESRA MONSOON 2026 TIMETABLE SEEDING
  const seedTimeline: TimelineActivity[] = [
    // --- DAILY MORNING ROUTINE ---
    {
      id: 't-morning-1',
      title: 'Wake Up & Cold Hydration + 5g Creatine',
      startTime: '06:00',
      endTime: '06:30',
      category: 'supplement',
      location: 'Hostel Room 304',
      status: 'completed',
      checklist: [
        { id: 'c1', text: '500ml Water + 5g Creatine Monohydrate', completed: true },
        { id: 'c2', text: '10 Min Outdoor Sunlight Cortisol Spike', completed: true }
      ],
      requiredItems: ['Water Bottle', 'Creatine Tub'],
      purpose: 'Cortisol spike activation & ATP cell hydration for CS focus',
      energyReq: 'Low',
      walkingTimeMins: 0,
      priority: 'High'
    },
    {
      id: 't-morning-2',
      title: 'Google L4 DSA Deep Work: Monotonic Stack & DP',
      startTime: '06:30',
      endTime: '08:30',
      category: 'dsa',
      location: 'Central Library (Quiet Zone)',
      status: 'completed',
      checklist: [
        { id: 'c3', text: 'Solve LC 84: Largest Rectangle in Histogram', completed: true },
        { id: 'c4', text: 'Solve LC 42: Trapping Rain Water', completed: true },
        { id: 'c5', text: 'Log edge case off-by-one errors', completed: true }
      ],
      requiredItems: ['MacBook Pro', 'Noise-Cancelling Headphones', 'Notebook'],
      purpose: 'Google Level 4 DSA problem patterns mastery',
      energyReq: 'Peak',
      walkingTimeMins: 5,
      priority: 'Critical',
      dsaTopic: 'Monotonic Stack'
    },
    {
      id: 't-morning-3',
      title: 'Anabolic Breakfast & Espresso Boost',
      startTime: '08:30',
      endTime: '09:00',
      category: 'meal',
      location: 'Campus Mess',
      status: 'completed',
      checklist: [
        { id: 'c6', text: '4 Boiled Eggs + Oats', completed: true },
        { id: 'c7', text: 'Single Shot Espresso (100mg Caffeine)', completed: true }
      ],
      requiredItems: ['Mess Pass'],
      purpose: 'Protein synthesis & caffeine window optimization',
      energyReq: 'Medium',
      walkingTimeMins: 4,
      priority: 'High'
    },

    // --- MONDAY CLASSES ---
    {
      id: 't-mon-1',
      title: 'NLP / SE Lecture (PE I)',
      startTime: '13:30',
      endTime: '14:20',
      category: 'lecture',
      location: 'Room G3, Main Building',
      status: 'active',
      checklist: [
        { id: 'c8', text: 'Dr. Aditi Panda (NLP G3) / Dr. S. P. Singh (SE G2)', completed: false }
      ],
      requiredItems: ['MacBook Pro', 'Notebook'],
      purpose: 'CS24351 / CS24353 PE I Lecture',
      energyReq: 'High',
      walkingTimeMins: 6,
      priority: 'High',
      subjectCode: 'CS24351',
      roomNo: 'Room G3 / G2',
      dayOfWeek: 'Monday'
    },
    {
      id: 't-mon-2',
      title: 'AI Lecture: Artificial Intelligence',
      startTime: '14:30',
      endTime: '15:20',
      category: 'lecture',
      location: 'Room G3, Main Building',
      status: 'upcoming',
      checklist: [
        { id: 'c9', text: 'Dr. Amrita Sarkar - A* Search & Minimax Trees', completed: false }
      ],
      requiredItems: ['MacBook Pro'],
      purpose: 'CS24307 AI Theory Lecture',
      energyReq: 'High',
      walkingTimeMins: 2,
      priority: 'Critical',
      subjectCode: 'CS24307',
      roomNo: 'Room G3',
      dayOfWeek: 'Monday'
    },
    {
      id: 't-mon-3',
      title: 'DMCT Lecture: Data Mining & Discrete Math',
      startTime: '15:30',
      endTime: '16:20',
      category: 'lecture',
      location: 'Room G3, Main Building',
      status: 'upcoming',
      checklist: [
        { id: 'c10', text: 'Dr. Debjani Mustafi - Graph Theory & Mining', completed: false }
      ],
      requiredItems: ['Notebook'],
      purpose: 'CS24303 DMCT Theory Lecture',
      energyReq: 'High',
      walkingTimeMins: 0,
      priority: 'High',
      subjectCode: 'CS24303',
      roomNo: 'Room G3',
      dayOfWeek: 'Monday'
    },
    {
      id: 't-mon-4',
      title: 'DCCN Lecture: Data Communication & Networks',
      startTime: '16:30',
      endTime: '17:20',
      category: 'lecture',
      location: 'Room G3, Main Building',
      status: 'upcoming',
      checklist: [
        { id: 'c11', text: 'Dr. Prashant Pranav - TCP Congestion Control & Sliding Window', completed: false }
      ],
      requiredItems: ['MacBook Pro'],
      purpose: 'CS24305 DCCN Theory Lecture',
      energyReq: 'High',
      walkingTimeMins: 0,
      priority: 'Critical',
      subjectCode: 'CS24305',
      roomNo: 'Room G3',
      dayOfWeek: 'Monday'
    },

    // --- EVENING CALISTHENICS & WIND-DOWN ---
    {
      id: 't-eve-1',
      title: '5-Day Calisthenics Split: Chest & Front Lever',
      startTime: '17:30',
      endTime: '19:00',
      category: 'workout',
      location: 'Outdoor Calisthenics Park',
      status: 'upcoming',
      checklist: [
        { id: 'c12', text: 'Weighted Dips: 4 sets x 10 (+20kg)', completed: false },
        { id: 'c13', text: 'Tuck Front Lever Hold: 5 sets x 15s', completed: false },
        { id: 'c14', text: 'Pseudo Planche Push-ups: 4 sets x 12', completed: false },
        { id: 'c15', text: '30g Whey Protein Shake', completed: false }
      ],
      requiredItems: ['Chalk', 'Resistance Bands', 'Water Bottle'],
      purpose: 'Build aesthetic V-taper physique & leverage strength',
      energyReq: 'Peak',
      walkingTimeMins: 6,
      priority: 'High'
    },
    {
      id: 't-eve-2',
      title: 'Dinner & Campus Relaxation Walk',
      startTime: '19:30',
      endTime: '20:30',
      category: 'meal',
      location: 'Campus Lake Walkway',
      status: 'upcoming',
      checklist: [
        { id: 'c16', text: 'Clean High-Protein Dinner at Mess', completed: false },
        { id: 'c17', text: '20 Min Walk without screens', completed: false }
      ],
      requiredItems: [],
      purpose: 'Parasympathetic recovery & glycogen replenishment',
      energyReq: 'Low',
      walkingTimeMins: 8,
      priority: 'Medium'
    },
    {
      id: 't-eve-3',
      title: 'Spaced Revision & Anki Flashcard Review',
      startTime: '20:45',
      endTime: '22:15',
      category: 'subject',
      location: 'Hostel Room 304',
      status: 'upcoming',
      checklist: [
        { id: 'c18', text: 'Review 20 DCCN & CD Anki Flashcards', completed: false },
        { id: 'c19', text: 'Review DMCT Proof Formulas', completed: false }
      ],
      requiredItems: ['MacBook Pro'],
      purpose: 'Long-term retention & End-Sem prep',
      energyReq: 'Medium',
      walkingTimeMins: 0,
      priority: 'High'
    },
    {
      id: 't-eve-4',
      title: 'Sleep Recovery Protocol & Magnesium',
      startTime: '22:30',
      endTime: '23:00',
      category: 'sleep',
      location: 'Hostel Room 304',
      status: 'upcoming',
      checklist: [
        { id: 'c20', text: '400mg Magnesium Glycinate', completed: false },
        { id: 'c21', text: 'Blue Light Glasses & Journaling', completed: false },
        { id: 'c22', text: 'Alarm set for 06:00 AM', completed: false }
      ],
      requiredItems: [],
      purpose: '7.5 hours Deep REM & slow-wave sleep recovery',
      energyReq: 'Low',
      walkingTimeMins: 0,
      priority: 'Critical'
    }
  ];

  await db.timeline.bulkAdd(seedTimeline);

  // BIT MESRA 5TH SEMESTER CSE SUBJECTS
  const seedSubjects: Subject[] = [
    {
      id: 'subj-dccn',
      code: 'CS24305',
      name: 'Data Communication & Computer Networks (DCCN)',
      credits: 3.0,
      professor: 'Dr. Prashant Pranav',
      roomNo: 'Room G3 / Room 220',
      color: '#00F0FF',
      attendance: 88,
      attendedLectures: 22,
      totalLectures: 25,
      targetGrade: 'A+',
      examDate: '2026-09-15',
      labCourseCode: 'CS24306',
      labName: 'DCCN Lab',
      labCredits: 1.5,
      labRoomNo: 'Lab 4',
      labProfessor: 'Dr. Prashant Pranav, Dr. Sumit Srivastava',
      modules: [
        {
          id: 'm1',
          moduleNumber: 1,
          title: 'Physical & Data Link Layer',
          topics: [
            { id: 't1', title: 'OSI vs TCP/IP Reference Models', completed: true },
            { id: 't2', title: 'Framing, Error Detection & CRC-32', completed: true },
            { id: 't3', title: 'Sliding Window: Go-Back-N & Selective Repeat', completed: false, isWeakTopic: true }
          ]
        },
        {
          id: 'm2',
          moduleNumber: 2,
          title: 'Network Layer & Routing',
          topics: [
            { id: 't4', title: 'IPv4 & IPv6 Subnetting & CIDR', completed: true },
            { id: 't5', title: 'Dijkstra & Distance Vector Routing (RIP vs OSPF)', completed: false }
          ]
        },
        {
          id: 'm3',
          moduleNumber: 3,
          title: 'Transport Layer & TCP Congestion Control',
          topics: [
            { id: 't6', title: 'TCP 3-Way Handshake & Connection Teardown', completed: true },
            { id: 't7', title: 'TCP Slow Start, Fast Retransmit, Fast Recovery', completed: false, isWeakTopic: true }
          ]
        }
      ],
      pyqs: [
        { id: 'p1', year: '2025', question: 'Derive efficiency formula for Selective Repeat ARQ with window size N.', difficulty: 'Hard', marks: 10, solved: false },
        { id: 'p2', year: '2024', question: 'Differentiate between Leaky Bucket and Token Bucket traffic shaping algorithms.', difficulty: 'Medium', marks: 5, solved: true }
      ]
    },
    {
      id: 'subj-cd',
      code: 'CS24301',
      name: 'Compiler Design (CD)',
      credits: 3.0,
      professor: 'Dr. I. Mukherjee',
      roomNo: 'Room 220 / Room 214',
      color: '#FF2D55',
      attendance: 92,
      attendedLectures: 23,
      totalLectures: 25,
      targetGrade: 'A+',
      examDate: '2026-09-18',
      labCourseCode: 'CS24302',
      labName: 'Compiler Design Lab',
      labCredits: 1.5,
      labRoomNo: 'Lab 1',
      labProfessor: 'Dr. I. Mukherjee',
      modules: [
        {
          id: 'm4',
          moduleNumber: 1,
          title: 'Lexical Analysis & Parsing',
          topics: [
            { id: 't8', title: 'Regular Expressions to NFA / DFA conversion', completed: true },
            { id: 't9', title: 'LL(1) Parsing Table Construction & First/Follow', completed: true },
            { id: 't10', title: 'LR(0), SLR(1), LALR(1) Parsing Algorithms', completed: false, isWeakTopic: true }
          ]
        }
      ],
      pyqs: [
        { id: 'p3', year: '2025', question: 'Construct SLR(1) parsing table for grammar S -> L = R | R.', difficulty: 'Hard', marks: 12, solved: true }
      ]
    },
    {
      id: 'subj-dmct',
      code: 'CS24303',
      name: 'Data Mining Concepts & Techniques (DMCT)',
      credits: 3.0,
      professor: 'Dr. Debjani Mustafi',
      roomNo: 'Room G3 / Room 220',
      color: '#BF5AF2',
      attendance: 90,
      attendedLectures: 18,
      totalLectures: 20,
      targetGrade: 'A+',
      examDate: '2026-09-25',
      modules: [
        {
          id: 'm6',
          moduleNumber: 1,
          title: 'Data Preprocessing & Association Rules',
          topics: [
            { id: 't13', title: 'Apriori Algorithm & FP-Growth Trees', completed: true },
            { id: 't14', title: 'Clustering: K-Means & DBSCAN', completed: false }
          ]
        }
      ],
      pyqs: []
    },
    {
      id: 'subj-ai',
      code: 'CS24307',
      name: 'Artificial Intelligence (AI)',
      credits: 3.0,
      professor: 'Dr. Amrita Sarkar',
      roomNo: 'Room G3 / Room 220 / Room 214',
      color: '#30D158',
      attendance: 85,
      attendedLectures: 17,
      totalLectures: 20,
      targetGrade: 'A+',
      examDate: '2026-09-22',
      labCourseCode: 'CS24308',
      labName: 'Artificial Intelligence Lab',
      labCredits: 1.5,
      labRoomNo: 'Lab 4',
      labProfessor: 'Dr. Amrita Sarkar',
      modules: [
        {
          id: 'm5',
          moduleNumber: 1,
          title: 'Search Strategies & Optimization',
          topics: [
            { id: 't11', title: 'A* Search & Admissible Heuristics', completed: true },
            { id: 't12', title: 'Alpha-Beta Pruning in Minimax Trees', completed: true }
          ]
        }
      ],
      pyqs: [
        { id: 'p4', year: '2025', question: 'Prove A* search optimality when heuristic h(n) is consistent.', difficulty: 'Medium', marks: 8, solved: true }
      ]
    },
    {
      id: 'subj-nlp',
      code: 'CS24351',
      name: 'Natural Language Processing (NLP) [PE I]',
      credits: 3.0,
      professor: 'Dr. Aditi Panda',
      roomNo: 'Room G3 / Room 214 / Room 220',
      color: '#FFD60A',
      attendance: 84,
      attendedLectures: 16,
      totalLectures: 19,
      targetGrade: 'A+',
      examDate: '2026-09-28',
      modules: [],
      pyqs: []
    },
    {
      id: 'subj-se',
      code: 'CS24353',
      name: 'Software Engineering (SE) [PE I]',
      credits: 3.0,
      professor: 'Dr. S. P. Singh',
      roomNo: 'Room G2 / Room 220',
      color: '#64D2FF',
      attendance: 95,
      attendedLectures: 19,
      totalLectures: 20,
      targetGrade: 'A+',
      examDate: '2026-10-02',
      modules: [],
      pyqs: []
    }
  ];

  await db.subjects.bulkAdd(seedSubjects);

  // Seed DSA Problems
  const seedDSA: DSAProblem[] = [
    { id: 'dsa-1', title: 'Largest Rectangle in Histogram', difficulty: 'Hard', pattern: 'Monotonic Stack', solved: true, solvedDate: '2026-08-03', googleFrequency: 'Top Interview Question', notes: 'Maintain non-decreasing stack of indices. On smaller element, pop and calculate area.' },
    { id: 'dsa-2', title: 'Trapping Rain Water', difficulty: 'Hard', pattern: 'Two Pointers', solved: true, solvedDate: '2026-08-03', googleFrequency: 'Top Interview Question', notes: 'Left and right pointers maintaining maxLeft and maxRight.' },
    { id: 'dsa-3', title: 'Sliding Window Maximum', difficulty: 'Hard', pattern: 'Monotonic Stack', solved: false, googleFrequency: 'Very High', mistakeType: 'Time Limit Exceeded' },
    { id: 'dsa-4', title: 'Minimum Window Substring', difficulty: 'Hard', pattern: 'Sliding Window', solved: true, solvedDate: '2026-08-02', googleFrequency: 'Top Interview Question' },
    { id: 'dsa-5', title: 'Word Break II', difficulty: 'Hard', pattern: 'Dynamic Programming', solved: false, googleFrequency: 'High' },
    { id: 'dsa-6', title: 'Course Schedule II (Topsort)', difficulty: 'Medium', pattern: 'Graph BFS/DFS', solved: true, solvedDate: '2026-08-01', googleFrequency: 'Very High' },
    { id: 'dsa-7', title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', pattern: 'Trie', solved: true, solvedDate: '2026-07-31', googleFrequency: 'Very High' },
    { id: 'dsa-8', title: 'Longest Palindromic Substring', difficulty: 'Medium', pattern: 'Dynamic Programming', solved: true, solvedDate: '2026-07-30', googleFrequency: 'High' },
    { id: 'dsa-9', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', pattern: 'Binary Search', solved: false, googleFrequency: 'Top Interview Question' }
  ];

  await db.dsaProblems.bulkAdd(seedDSA);

  // Seed Calisthenics Exercises
  const seedCalisthenics: CalisthenicsExercise[] = [
    { id: 'cal-1', name: 'Weighted Dips (+20kg)', day: 'Monday', targetArea: 'Lower Chest & Triceps', sets: 4, reps: '8-10', restSeconds: 120, notes: 'Full depth, lockout at top', visualCue: 'dips', completedToday: false },
    { id: 'cal-2', name: 'Tuck Front Lever Hold', day: 'Monday', targetArea: 'Lats & Core Stability', sets: 5, reps: '15s Hold', restSeconds: 90, notes: 'Depressed scapula, straight arms', visualCue: 'lever', completedToday: false },
    { id: 'cal-3', name: 'Pseudo Planche Push-ups', day: 'Monday', targetArea: 'Upper Chest & Shoulders', sets: 4, reps: '10-12', restSeconds: 90, notes: 'Maximum forward lean', visualCue: 'pushup', completedToday: false },
    { id: 'cal-4', name: 'Wall Handstand Push-ups', day: 'Tuesday', targetArea: 'Deltoids & Upper Triceps', sets: 4, reps: '6-8', restSeconds: 120, notes: 'Hollow body posture', visualCue: 'handstand', completedToday: false },
    { id: 'cal-5', name: 'Chin-ups with Pause', day: 'Tuesday', targetArea: 'Biceps & Upper Back', sets: 4, reps: '10', restSeconds: 90, notes: '2s chin over bar hold', visualCue: 'chinup', completedToday: false },
    { id: 'cal-6', name: 'Pistol Squats (Single Leg)', day: 'Wednesday', targetArea: 'Quads & Glutes', sets: 4, reps: '8 each leg', restSeconds: 90, notes: 'Full depth knee tracking', visualCue: 'squat', completedToday: false },
    { id: 'cal-7', name: 'Explosive Jump Squats', day: 'Wednesday', targetArea: 'Explosive Fast-Twitch Fibers', sets: 4, reps: '15', restSeconds: 60, notes: 'Maximum vertical height', visualCue: 'jumpsquat', completedToday: false },
    { id: 'cal-8', name: 'Explosive High Pull-ups', day: 'Thursday', targetArea: 'Lats & Muscle-Up Transition', sets: 5, reps: '5 reps (Bar to Chest)', restSeconds: 120, notes: 'Fast pull to sternum', visualCue: 'pullup', completedToday: false },
    { id: 'cal-9', name: 'Clean Muscle-Ups', day: 'Thursday', targetArea: 'Explosive Upper Body', sets: 4, reps: '3-5', restSeconds: 150, notes: 'No kip, smooth transition', visualCue: 'muscleup', completedToday: false },
    { id: 'cal-10', name: 'Hanging Leg Raises', day: 'Friday', targetArea: 'Rectus Abdominis', sets: 4, reps: '12-15', restSeconds: 60, notes: 'Toes to bar, zero momentum', visualCue: 'legraise', completedToday: false },
    { id: 'cal-11', name: 'Dragon Flags', day: 'Friday', targetArea: 'Entire Core & Lat Compression', sets: 4, reps: '6-8', restSeconds: 90, notes: 'Straight body line descent', visualCue: 'dragonflag', completedToday: false }
  ];

  await db.calisthenics.bulkAdd(seedCalisthenics);

  // Seed Supplements
  const seedSupplements: SupplementItem[] = [
    { id: 'sup-1', name: 'Morning Filtered Water', timing: '06:00 AM', dose: '500ml', category: 'hydration', completedToday: true, purpose: 'Rehydrate after 7.5h sleep' },
    { id: 'sup-2', name: 'Creatine Monohydrate', timing: '06:15 AM', dose: '5g', category: 'creatine', completedToday: true, purpose: 'Brain & Muscle ATP saturation' },
    { id: 'sup-3', name: 'Pre-Study Espresso', timing: '08:30 AM', dose: '100mg Caffeine', category: 'caffeine', completedToday: true, purpose: 'Adenosine receptor blockade' },
    { id: 'sup-4', name: 'Post-Workout Whey Protein', timing: '18:00 PM', dose: '30g Protein', category: 'protein', completedToday: false, purpose: 'Muscle protein synthesis' },
    { id: 'sup-5', name: 'Daily Water Goal Target', timing: 'All Day', dose: '3,500ml Total', category: 'hydration', completedToday: false, purpose: 'Optimal cognitive performance' }
  ];

  await db.supplements.bulkAdd(seedSupplements);
}
