-- Phase 25: Achievements system
-- Run in Supabase Dashboard → SQL Editor

CREATE TABLE achievements (
  key            TEXT PRIMARY KEY,
  title_bg       TEXT NOT NULL,
  description_bg TEXT NOT NULL,
  xp_reward      INTEGER NOT NULL DEFAULT 0,
  sort_order     INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE user_achievements (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_key TEXT NOT NULL REFERENCES achievements(key),
  unlocked_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, achievement_key)
);

ALTER TABLE achievements      ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public achievement read"
  ON achievements FOR SELECT USING (true);

CREATE POLICY "Own user_achievements all"
  ON user_achievements FOR ALL USING (auth.uid() = user_id);

-- Seed — 16 achievements
INSERT INTO achievements (key, title_bg, description_bg, xp_reward, sort_order) VALUES
('first_word',      'Първа дума',       'Добавена е първа дума в речника',             10,  1),
('first_study',     'Първа сесия',      'Завършена е първа учебна сесия',              10,  2),
('first_grammar',   'Първи урок',       'Завършен е първи урок по граматика',          10,  3),
('first_listening', 'Първо слушане',    'Завършено е първо упражнение по слушане',     10,  4),
('first_reading',   'Първо четене',     'Прочетен е първи текст',                      10,  5),
('streak_3',        '3 дни поред',      'Поддържана е серия от 3 дни',                 20,  6),
('streak_7',        'Седмица напред',   'Поддържана е серия от 7 дни',                 50,  7),
('streak_30',       'Месец напред',     'Поддържана е серия от 30 дни',               200,  8),
('words_10',        '10 думи',          'Научени са 10 думи от речника',               30,  9),
('words_50',        '50 думи',          'Научени са 50 думи от речника',              100, 10),
('words_100',       '100 думи',         'Научени са 100 думи от речника',             250, 11),
('xp_100',          '100 XP',           'Събрани са 100 точки опит',                    0, 12),
('xp_500',          '500 XP',           'Събрани са 500 точки опит',                    0, 13),
('xp_1000',         '1 000 XP',         'Събрани са 1 000 точки опит',                  0, 14),
('grammar_5',       '5 урока',          'Завършени са 5 урока по граматика',            50, 15),
('grammar_10',      '10 урока',         'Завършени са 10 урока по граматика',          100, 16);
