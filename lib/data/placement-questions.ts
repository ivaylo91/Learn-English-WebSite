import type { Level } from '@/lib/types/database';

export interface PlacementQuestion {
  question: string;
  options: string[];
  correct: number;
  level: Exclude<Level, 'C2'>;
}

// 20 questions — 4 per band (A1 → C1)
// Scoring: highest band where the user answers ≥ 2/4 correctly
export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // ── A1 ──────────────────────────────────────────────────────
  {
    level: 'A1',
    question: 'Какво означава "happy" на български?',
    options: ['тъжен', 'щастлив', 'ядосан', 'уморен'],
    correct: 1,
  },
  {
    level: 'A1',
    question: 'Complete the sentence: "I ___ a student."',
    options: ['is', 'are', 'am', 'be'],
    correct: 2,
  },
  {
    level: 'A1',
    question: 'Какво означава "house" на български?',
    options: ['градина', 'улица', 'дърво', 'къща'],
    correct: 3,
  },
  {
    level: 'A1',
    question: 'Which sentence is correct?',
    options: [
      'She have a cat.',
      'She is have a cat.',
      'She has a cat.',
      'She having a cat.',
    ],
    correct: 2,
  },

  // ── A2 ──────────────────────────────────────────────────────
  {
    level: 'A2',
    question: 'What is the past tense of "go"?',
    options: ['goed', 'gone', 'go', 'went'],
    correct: 3,
  },
  {
    level: 'A2',
    question: 'Complete: "There ___ many students in the class."',
    options: ['am', 'is', 'are', 'be'],
    correct: 2,
  },
  {
    level: 'A2',
    question: 'Какво означава "nervous" на български?',
    options: ['нервен', 'щастлив', 'уморен', 'луд'],
    correct: 0,
  },
  {
    level: 'A2',
    question: 'Complete: "I have lived here ___ five years."',
    options: ['since', 'during', 'for', 'from'],
    correct: 2,
  },

  // ── B1 ──────────────────────────────────────────────────────
  {
    level: 'B1',
    question: 'Complete: "If I had more money, I ___ travel more."',
    options: ['will', 'should', 'must', 'would'],
    correct: 3,
  },
  {
    level: 'B1',
    question: 'Какво означава "to procrastinate" на български?',
    options: [
      'да побързам',
      'да се концентрирам',
      'да отлагам нещата',
      'да планирам',
    ],
    correct: 2,
  },
  {
    level: 'B1',
    question: 'Complete: "She\'s been working here ___ 2020."',
    options: ['for', 'from', 'since', 'during'],
    correct: 2,
  },
  {
    level: 'B1',
    question: 'Complete: "I wish I ___ speak Spanish."',
    options: ['can', 'will', 'would', 'could'],
    correct: 3,
  },

  // ── B2 ──────────────────────────────────────────────────────
  {
    level: 'B2',
    question: 'Complete: "By the time she arrived, he ___ already left."',
    options: ['has', 'have', 'will have', 'had'],
    correct: 3,
  },
  {
    level: 'B2',
    question: 'Which sentence is grammatically correct?',
    options: [
      'She suggested me to leave.',
      'She suggested me leaving.',
      'She suggested that I leave.',
      'She suggested me that leave.',
    ],
    correct: 2,
  },
  {
    level: 'B2',
    question: 'Какво означава "meticulous" на български?',
    options: ['безгрижен', 'педантичен, внимателен', 'смел', 'хаотичен'],
    correct: 1,
  },
  {
    level: 'B2',
    question: 'Complete: "I\'d rather you ___ tell anyone about this."',
    options: ['don\'t', 'didn\'t', 'won\'t', 'haven\'t'],
    correct: 1,
  },

  // ── C1 ──────────────────────────────────────────────────────
  {
    level: 'C1',
    question: 'Complete: "Had I known earlier, I ___ differently."',
    options: ['will act', 'act', 'would act', 'would have acted'],
    correct: 3,
  },
  {
    level: 'C1',
    question: 'Какво означава "to equivocate" на български?',
    options: [
      'да съм директен',
      'да говоря двусмислено',
      'да преувелича',
      'да се извиня',
    ],
    correct: 1,
  },
  {
    level: 'C1',
    question: 'Choose the correct participle clause:',
    options: [
      'Having finishing the report, he left.',
      'Finishing the report, it was submitted.',
      'Having finished the report, he left.',
      'Having been finishing the report, he left.',
    ],
    correct: 2,
  },
  {
    level: 'C1',
    question: 'Какво означава "sycophant" на български?',
    options: ['критик', 'лидер', 'мечтател', 'ласкател, подмазвач'],
    correct: 3,
  },
];

// ── Scoring ──────────────────────────────────────────────────────────────────
// For each level band, compute fraction correct.
// Assign the highest band where the user scored ≥ 50%.
// Fall back to A1 if no band passes.
export function assignLevel(answers: boolean[]): Level {
  const bands: Exclude<Level, 'C2'>[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

  const scores: Record<string, { correct: number; total: number }> = {};
  for (const b of bands) scores[b] = { correct: 0, total: 0 };

  PLACEMENT_QUESTIONS.forEach((q, i) => {
    scores[q.level].total++;
    if (answers[i]) scores[q.level].correct++;
  });

  // Walk from hardest to easiest; return first that passes 50%
  for (const band of [...bands].reverse()) {
    const s = scores[band];
    if (s.total > 0 && s.correct / s.total >= 0.5) {
      // Perfect C1 score → upgrade to C2
      if (band === 'C1' && s.correct === s.total) return 'C2';
      return band;
    }
  }
  return 'A1';
}
