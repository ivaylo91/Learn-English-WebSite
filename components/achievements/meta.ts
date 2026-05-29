import { BookMarked, Zap, PenLine, Headphones, BookOpen, Flame, Star, Trophy, Target } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface AchievementMeta {
  icon: LucideIcon;
  color: string;
  bg: string;
}

export const ACHIEVEMENT_META: Record<string, AchievementMeta> = {
  first_word:      { icon: BookMarked, color: 'var(--coral-ink)',  bg: 'var(--coral-soft)' },
  first_study:     { icon: Zap,        color: 'var(--coral-ink)',  bg: 'var(--coral-soft)' },
  first_grammar:   { icon: PenLine,    color: 'var(--lav-ink)',    bg: 'var(--lavender)'   },
  first_listening: { icon: Headphones, color: 'var(--sky-ink)',    bg: 'var(--sky)'        },
  first_reading:   { icon: BookOpen,   color: 'var(--sage-ink)',   bg: 'var(--sage)'       },
  streak_3:        { icon: Flame,      color: 'var(--coral-ink)',  bg: 'var(--peach)'      },
  streak_7:        { icon: Flame,      color: 'var(--coral-ink)',  bg: 'var(--peach)'      },
  streak_30:       { icon: Flame,      color: 'var(--coral-ink)',  bg: 'var(--peach)'      },
  words_10:        { icon: Star,       color: 'var(--butter-ink)', bg: 'var(--butter)'     },
  words_50:        { icon: Star,       color: 'var(--butter-ink)', bg: 'var(--butter)'     },
  words_100:       { icon: Star,       color: 'var(--butter-ink)', bg: 'var(--butter)'     },
  xp_100:          { icon: Trophy,     color: 'var(--butter-ink)', bg: 'var(--butter)'     },
  xp_500:          { icon: Trophy,     color: 'var(--butter-ink)', bg: 'var(--butter)'     },
  xp_1000:         { icon: Trophy,     color: 'var(--butter-ink)', bg: 'var(--butter)'     },
  grammar_5:       { icon: Target,     color: 'var(--lav-ink)',    bg: 'var(--lavender)'   },
  grammar_10:      { icon: Target,     color: 'var(--lav-ink)',    bg: 'var(--lavender)'   },
};

export const DEFAULT_META: AchievementMeta = {
  icon: Star,
  color: 'var(--muted)',
  bg:    'var(--bg-2)',
};
