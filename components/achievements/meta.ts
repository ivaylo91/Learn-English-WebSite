import { BookMarked, Zap, PenLine, Headphones, BookOpen, Flame, Star, Trophy, Target, Pencil, TrendingUp, CheckCircle2, Medal } from 'lucide-react';
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
  grammar_5:       { icon: Target,       color: 'var(--lav-ink)',    bg: 'var(--lavender)'   },
  grammar_10:      { icon: Target,       color: 'var(--lav-ink)',    bg: 'var(--lavender)'   },
  // Phase 35 — new achievements
  first_writing:   { icon: Pencil,       color: 'var(--butter-ink)', bg: 'var(--butter)'     },
  writing_5:       { icon: Pencil,       color: 'var(--butter-ink)', bg: 'var(--butter)'     },
  writing_10:      { icon: Pencil,       color: 'var(--butter-ink)', bg: 'var(--butter)'     },
  placement_done:  { icon: Target,       color: 'var(--coral-ink)',  bg: 'var(--coral-soft)' },
  reached_b1:      { icon: TrendingUp,   color: 'var(--sky-ink)',    bg: 'var(--sky)'        },
  reached_b2:      { icon: TrendingUp,   color: 'var(--lav-ink)',    bg: 'var(--lavender)'   },
  reached_c1:      { icon: TrendingUp,   color: 'var(--coral-ink)',  bg: 'var(--peach)'      },
  goal_streak_7:   { icon: CheckCircle2, color: 'var(--sage-ink)',   bg: 'var(--sage)'       },
  top_10:          { icon: Medal,        color: 'var(--butter-ink)', bg: 'var(--butter)'     },
};

export const DEFAULT_META: AchievementMeta = {
  icon: Star,
  color: 'var(--muted)',
  bg:    'var(--bg-2)',
};
