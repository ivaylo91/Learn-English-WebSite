'use client';

import { useState, useEffect } from 'react';
import type { UserWordProgress } from '@/lib/types/database';
import { reviewWord, getNextDueDate } from '@/lib/db/vocabulary';
import { recordActivity } from '@/lib/db/activity';
import { checkAndUnlockAchievements, type UnlockedAchievement } from '@/lib/actions/achievements';
import FlashCard from './FlashCard';
import AchievementToast from '@/components/achievements/AchievementToast';
import { Trophy, BookMarked, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';

interface StudySessionProps {
  userId: string;
  dueWords: UserWordProgress[];
}

function formatNextDue(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now();
  const mins = Math.round(diff / 60_000);
  if (mins < 60)  return `след ${mins} мин.`;
  const hrs = Math.round(diff / 3_600_000);
  if (hrs < 24)   return `след ${hrs} ч.`;
  const days = Math.round(diff / 86_400_000);
  if (days === 1) return 'утре';
  return `след ${days} дни`;
}

export default function StudySession({ userId, dueWords }: StudySessionProps) {
  const [index, setIndex]           = useState(0);
  const [results, setResults]       = useState<{ quality: number }[]>([]);
  const [submitting, setSubmitting]  = useState(false);
  const [finished, setFinished]     = useState(false);
  const [newAchievements, setNewAchievements] = useState<UnlockedAchievement[]>([]);
  const [nextDueAt, setNextDueAt]   = useState<string | null>(null);

  // Fetch next upcoming review date when queue is empty
  useEffect(() => {
    if (dueWords.length > 0) return;
    getNextDueDate(userId).then(setNextDueAt);
  }, [userId, dueWords.length]);

  const current = dueWords[index];

  const handleRate = async (quality: 0 | 3 | 5) => {
    if (!current || submitting) return;
    setSubmitting(true);

    await reviewWord(userId, current.word_id, quality);
    const newResults = [...results, { quality }];
    setResults(newResults);

    if (index + 1 >= dueWords.length) {
      const xp = newResults.filter(r => r.quality >= 3).length * 5;
      await recordActivity(userId, 'vocabulary', 'study_session', xp, {
        words_reviewed: dueWords.length,
        passed: newResults.filter(r => r.quality >= 3).length,
      });
      const unlocked = await checkAndUnlockAchievements(userId);
      if (unlocked.length > 0) setNewAchievements(unlocked);
      setFinished(true);
    } else {
      setIndex(i => i + 1);
    }

    setSubmitting(false);
  };

  if (dueWords.length === 0) {
    const nextLabel = nextDueAt ? formatNextDue(nextDueAt) : null;
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: 'var(--sage)' }}
        >
          <Trophy className="w-8 h-8" style={{ color: 'var(--sage-ink)' }} />
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--ink)' }}>Всичко прегледано!</h2>
        <p className="max-w-sm mb-4 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          Няма думи за повторение в момента. Добави нови от речника или изчакай следващата сесия.
        </p>
        {nextLabel && (
          <div
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm mb-8"
            style={{ background: 'var(--butter)', border: '1px solid #e8d8a8', color: 'var(--butter-ink)' }}
          >
            <Clock className="w-4 h-4 shrink-0" />
            Следваща дума: <strong>{nextLabel}</strong>
          </div>
        )}
        {!nextLabel && <div className="mb-8" />}
        <Link
          href="/rechnik"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white active:scale-[.98] transition-all"
          style={{ background: 'var(--coral)', boxShadow: '0 8px 16px -8px rgba(232,99,58,.5)' }}
        >
          <BookMarked className="w-4 h-4" />
          Разгледай речника
        </Link>
      </div>
    );
  }

  if (finished) {
    const passed = results.filter(r => r.quality >= 3).length;
    const xp = passed * 5;
    return (
      <>
      <AchievementToast achievements={newAchievements} />
      <div className="flex flex-col items-center justify-center py-16 text-center max-w-sm mx-auto">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
          style={{
            background: 'var(--coral-soft)',
            boxShadow: '0 8px 30px -8px rgba(232,99,58,0.25)',
          }}
        >
          <Trophy className="w-10 h-10" style={{ color: 'var(--coral)' }} />
        </div>
        <h2
          className="text-3xl font-bold mb-2 tracking-tight"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
        >
          Сесията завършена!
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--muted)' }}>Отлична работа — продължавай така.</p>

        <div className="w-full grid grid-cols-3 gap-3 mb-8">
          {[
            { value: dueWords.length, label: 'Прегледани', color: 'var(--coral)' },
            { value: passed,          label: 'Правилно',   color: 'var(--sage-ink)' },
            { value: `+${xp}`,        label: 'XP',         color: 'var(--butter-ink)' },
          ].map(({ value, label, color }) => (
            <div
              key={label}
              className="rounded-2xl p-4 text-center"
              style={{ background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}
            >
              <p className="text-3xl font-bold tabular-nums" style={{ color }}>{value}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{label}</p>
            </div>
          ))}
        </div>

        <Link
          href="/rechnik"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white active:scale-[.98] transition-all w-full"
          style={{ background: 'var(--coral)', boxShadow: '0 8px 16px -8px rgba(232,99,58,.5)' }}
        >
          Обратно към речника
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      </>
    );
  }

  if (!current?.vocabulary_words) return null;

  return (
    <>
    <AchievementToast achievements={newAchievements} />
    <FlashCard
      word={current.vocabulary_words}
      cardNumber={index + 1}
      total={dueWords.length}
      loading={submitting}
      srsState={{
        ease_factor:   current.ease_factor,
        interval_days: current.interval_days,
        repetitions:   current.repetitions,
      }}
      onRate={handleRate}
    />
    </>
  );
}
