import type { TimelineActivity, DecisionState } from './types';

export function calculateCurrentDecision(
  timeline: TimelineActivity[],
  currentTime: Date = new Date(),
  userEnergy: number = 85 // 1-100%
): DecisionState {
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentTotalMins = currentHours * 60 + currentMinutes;

  // Find active task or task spanning current time
  let activeTask: TimelineActivity | null = null;
  let nextTask: TimelineActivity | null = null;

  for (let i = 0; i < timeline.length; i++) {
    const item = timeline[i];
    const [startH, startM] = item.startTime.split(':').map(Number);
    const [endH, endM] = item.endTime.split(':').map(Number);
    const startMins = startH * 60 + startM;
    const endMins = endH * 60 + endM;

    if (currentTotalMins >= startMins && currentTotalMins < endMins) {
      activeTask = item;
      nextTask = timeline[i + 1] || null;
      break;
    } else if (currentTotalMins < startMins && !nextTask) {
      nextTask = item;
    }
  }

  // Fallback to active status if timeline time logic doesn't match mock date exact
  if (!activeTask && timeline.length > 0) {
    activeTask = timeline.find(t => t.status === 'active') || timeline[0];
    const idx = timeline.findIndex(t => t.id === activeTask?.id);
    nextTask = timeline[idx + 1] || null;
  }

  const isBehindSchedule = timeline.some(t => t.status === 'missed');
  
  // Caffeine cutoff rule: No coffee after 14:00 (2 PM)
  const caffeineAllowed = currentHours < 14;

  // Calculate location recommendation
  let locationRecommendation: 'Hostel' | 'Library' | 'Gym' | 'Mess' | 'Lecture Hall' = 'Library';
  let primaryAction = 'Focus on current activity';
  let secondaryAction = 'Prepare materials for next block';
  let reasoning = 'Optimal environment match for your current CS & fitness goals.';

  if (activeTask) {
    if (activeTask.category === 'dsa' || activeTask.category === 'subject' || activeTask.category === 'library') {
      locationRecommendation = 'Library';
      primaryAction = `Execute ${activeTask.title}`;
      secondaryAction = `Target: ${activeTask.dsaTopic || activeTask.purpose}`;
      reasoning = 'Zero distraction zone. High cognitive load requires library quiet atmosphere.';
    } else if (activeTask.category === 'lecture') {
      locationRecommendation = 'Lecture Hall';
      primaryAction = `Attend ${activeTask.title} at ${activeTask.location}`;
      secondaryAction = `Review lecture slides & take Markdown notes`;
      reasoning = 'Target 9+ CGPA requires 90%+ attendance & active lecture engagement.';
    } else if (activeTask.category === 'workout') {
      locationRecommendation = 'Gym';
      primaryAction = `Head to ${activeTask.location}`;
      secondaryAction = `Execute 5-Day Calisthenics Routine`;
      reasoning = 'Anabolic stimulus time. Maximize mechanical tension & skill holds.';
    } else if (activeTask.category === 'meal') {
      locationRecommendation = 'Mess';
      primaryAction = `Eat High-Protein Meal at ${activeTask.location}`;
      secondaryAction = `Hydrate 500ml Water`;
      reasoning = 'Replenish muscle glycogen & amino acid pool for recovery.';
    } else {
      locationRecommendation = 'Hostel';
      primaryAction = `Wind down in Hostel Room`;
      secondaryAction = `Sleep recovery protocol`;
      reasoning = 'Hostel room optimized for deep rest, blue-light block & sleep preparation.';
    }
  }

  // Fatigue assessment
  let fatigueLevel: 'Fresh' | 'Moderate' | 'High Fatigue' = 'Fresh';
  if (userEnergy < 40) fatigueLevel = 'High Fatigue';
  else if (userEnergy < 70) fatigueLevel = 'Moderate';

  return {
    currentActivity: activeTask,
    nextActivity: nextTask,
    primaryAction,
    secondaryAction,
    locationRecommendation,
    reasoning,
    isBehindSchedule,
    caffeineAllowed,
    walkingTimeText: activeTask ? `${activeTask.walkingTimeMins} mins walk to ${activeTask.location}` : '0 mins',
    fatigueLevel
  };
}
