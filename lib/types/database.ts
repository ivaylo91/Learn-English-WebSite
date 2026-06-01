export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type Module = 'vocabulary' | 'grammar' | 'listening' | 'reading' | 'writing';
export type WordStatus = 'new' | 'learning' | 'known';

// ── Content types ─────────────────────────────────────────────

export interface VocabularyWord {
  id: string;
  word_en: string;
  word_bg: string;
  phonetic: string | null;
  level: Level;
  category: string;
  example_en: string | null;
  example_bg: string | null;
  created_at: string;
}

export interface GrammarLesson {
  id: string;
  slug: string;
  title: string;
  content_md: string;
  level: Level;
  category: string;
  order_index: number;
  questions: QuizQuestion[];
  created_at: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface ListeningClip {
  id: string;
  title: string;
  audio_url: string;
  transcript: string;
  level: Level;
  topic: string;
  duration_seconds: number;
  questions: QuizQuestion[];
  created_at: string;
}

export interface ReadingText {
  id: string;
  slug: string;
  title: string;
  body_md: string;
  level: Level;
  topic: string;
  reading_time_minutes: number;
  questions: QuizQuestion[];
  vocabulary: { en: string; bg: string }[];
  created_at: string;
}

export interface UserContentProgress {
  id: string;
  user_id: string;
  content_type: 'listening' | 'reading';
  content_id: string;
  score: number;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
}

// ── User types ────────────────────────────────────────────────

export interface Profile {
  id: string;
  name: string;
  level: Level;
  xp: number;
  streak: number;
  last_active_at: string;
  created_at: string;
}

export interface UserWordProgress {
  id: string;
  user_id: string;
  word_id: string;
  status: WordStatus;
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  next_review_at: string;
  last_reviewed_at: string | null;
  created_at: string;
  // joined
  vocabulary_words?: VocabularyWord;
}

export interface UserLessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  score: number;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
  // joined
  grammar_lessons?: GrammarLesson;
}

export interface WritingPrompt {
  prompt:  string;
  answers: string[];
  hint?:   string | null;
}

export interface WritingExercise {
  id:         string;
  slug:       string;
  title:      string;
  level:      Level;
  topic:      string;
  prompts:    WritingPrompt[];
  created_at: string;
}

export interface UserWritingProgress {
  id:           string;
  user_id:      string;
  exercise_id:  string;
  score:        number;
  completed:    boolean;
  completed_at: string | null;
  created_at:   string;
}

export interface UserActivity {
  id: string;
  user_id: string;
  module: Module;
  action: string;
  xp_gained: number;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Achievement {
  key: string;
  title_bg: string;
  description_bg: string;
  xp_reward: number;
  sort_order: number;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_key: string;
  unlocked_at: string;
}

// ── Supabase Database type map ────────────────────────────────

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Profile>;
      };
      vocabulary_words: {
        Row: VocabularyWord;
        Insert: Omit<VocabularyWord, 'id' | 'created_at'>;
        Update: Partial<Omit<VocabularyWord, 'id' | 'created_at'>>;
      };
      grammar_lessons: {
        Row: GrammarLesson;
        Insert: Omit<GrammarLesson, 'id' | 'created_at'> & { questions?: QuizQuestion[] };
        Update: Partial<Omit<GrammarLesson, 'id' | 'created_at'>>;
      };
      listening_clips: {
        Row: ListeningClip;
        Insert: Omit<ListeningClip, 'id' | 'created_at'>;
        Update: Partial<Omit<ListeningClip, 'id' | 'created_at'>>;
      };
      reading_texts: {
        Row: ReadingText;
        Insert: Omit<ReadingText, 'id' | 'created_at'>;
        Update: Partial<Omit<ReadingText, 'id' | 'created_at'>>;
      };
      user_word_progress: {
        Row: UserWordProgress;
        Insert: Omit<UserWordProgress, 'id' | 'created_at' | 'vocabulary_words'>;
        Update: Partial<Omit<UserWordProgress, 'id' | 'created_at' | 'vocabulary_words'>>;
      };
      user_lesson_progress: {
        Row: UserLessonProgress;
        Insert: Omit<UserLessonProgress, 'id' | 'created_at' | 'grammar_lessons'>;
        Update: Partial<Omit<UserLessonProgress, 'id' | 'created_at' | 'grammar_lessons'>>;
      };
      user_activity: {
        Row: UserActivity;
        Insert: Omit<UserActivity, 'id' | 'created_at'>;
        Update: never;
      };
      writing_exercises: {
        Row: WritingExercise;
        Insert: Omit<WritingExercise, 'id' | 'created_at'>;
        Update: Partial<Omit<WritingExercise, 'id' | 'created_at'>>;
      };
      user_writing_progress: {
        Row: UserWritingProgress;
        Insert: Omit<UserWritingProgress, 'id' | 'created_at'>;
        Update: Partial<Omit<UserWritingProgress, 'id' | 'created_at'>>;
      };
    };
    Functions: {
      record_activity: {
        Args: {
          p_user_id: string;
          p_module: Module;
          p_action: string;
          p_xp?: number;
          p_meta?: Record<string, unknown>;
        };
        Returns: void;
      };
    };
  };
};
