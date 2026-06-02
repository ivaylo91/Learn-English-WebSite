// Pure goal utilities — no 'use server', safe to import from both client and server

export type DailyGoal = 'light' | 'standard' | 'intensive';

export interface GoalTarget {
  label: string;
  words: number;
  items: number;
  desc:  string;
}

export const GOAL_TARGETS: Record<DailyGoal, GoalTarget> = {
  light:     { label: 'Леко',       words: 5,  items: 1, desc: '5 думи · 1 активност'   },
  standard:  { label: 'Стандарт',   words: 10, items: 2, desc: '10 думи · 2 активности' },
  intensive: { label: 'Интензивно', words: 20, items: 3, desc: '20 думи · 3 активности' },
};

export interface TodayProgress {
  words: number;
  items: number;
}

/** Pure function — sums up today's word reviews and module completions. */
export function computeTodayProgress(
  rows: { module: string; action: string; metadata: Record<string, unknown> }[]
): TodayProgress {
  let words = 0;
  let items = 0;

  for (const row of rows) {
    if (row.module === 'vocabulary' && row.action === 'study_session') {
      words += (row.metadata?.words_reviewed as number) ?? 0;
    }
    if (
      row.action === 'lesson_complete'   ||
      row.action === 'exercise_complete' ||
      row.action === 'quiz_complete'
    ) {
      items++;
    }
  }

  return { words, items };
}
