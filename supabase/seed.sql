-- ============================================================
-- seed.sql — Starter vocabulary words
-- Run AFTER 001_initial_schema.sql
-- ============================================================

INSERT INTO public.vocabulary_words (word_en, word_bg, phonetic, level, category, example_en, example_bg) VALUES

-- A1 — Ежедневие
('Hello',       'Здравей',       '/həˈloʊ/',      'A1', 'Ежедневие', 'Hello, how are you?',                'Здравей, как си?'),
('Goodbye',     'Довиждане',     '/ˌɡʊdˈbaɪ/',    'A1', 'Ежедневие', 'Goodbye, see you tomorrow.',         'Довиждане, до утре.'),
('Please',      'Моля',          '/pliːz/',        'A1', 'Ежедневие', 'Can I have water, please?',          'Може ли вода, моля?'),
('Thank you',   'Благодаря',     '/ˈθæŋk juː/',   'A1', 'Ежедневие', 'Thank you for your help.',           'Благодаря за помощта.'),
('Sorry',       'Съжалявам',     '/ˈsɒri/',        'A1', 'Ежедневие', 'Sorry, I am late.',                  'Съжалявам, закъснях.'),
('House',       'Къща',          '/haʊs/',         'A1', 'Ежедневие', 'I live in a big house.',             'Живея в голяма къща.'),
('Food',        'Храна',         '/fuːd/',         'A1', 'Ежедневие', 'The food is delicious.',             'Храната е вкусна.'),
('Water',       'Вода',          '/ˈwɔːtər/',      'A1', 'Ежедневие', 'I drink water every day.',           'Пия вода всеки ден.'),
('Family',      'Семейство',     '/ˈfæmɪli/',      'A1', 'Ежедневие', 'My family is very important.',       'Семейството ми е много важно.'),
('Friend',      'Приятел',       '/frend/',         'A1', 'Ежедневие', 'She is my best friend.',            'Тя е най-добрата ми приятелка.'),

-- A2 — Ежедневие / Пътувания
('Beautiful',   'Красив',        '/ˈbjuːtɪfəl/',  'A2', 'Ежедневие', 'The sunset is beautiful.',           'Залезът е красив.'),
('Important',   'Важен',         '/ɪmˈpɔːtənt/',  'A2', 'Ежедневие', 'Sleep is very important.',           'Сънят е много важен.'),
('Different',   'Различен',      '/ˈdɪfrənt/',     'A2', 'Ежедневие', 'We have different opinions.',        'Имаме различни мнения.'),
('Travel',      'Пътувам',       '/ˈtrævəl/',      'A2', 'Пътувания', 'I love to travel.',                  'Обичам да пътувам.'),
('Airport',     'Летище',        '/ˈeəpɔːt/',      'A2', 'Пътувания', 'The airport is very busy.',          'Летището е много натоварено.'),
('Ticket',      'Билет',         '/ˈtɪkɪt/',       'A2', 'Пътувания', 'I bought a train ticket.',           'Купих билет за влак.'),
('Hotel',       'Хотел',         '/həʊˈtel/',      'A2', 'Пътувания', 'We stayed at a nice hotel.',         'Останахме в хубав хотел.'),
('Weather',     'Време',         '/ˈweðər/',       'A2', 'Природа',   'The weather is sunny today.',        'Времето днес е слънчево.'),

-- B1 — Бизнес / Технологии
('Experience',  'Опит',          '/ɪkˈspɪərɪəns/','B1', 'Бизнес',    'She has a lot of experience.',       'Тя има много опит.'),
('Opportunity', 'Възможност',    '/ˌɒpəˈtjuːnɪti/','B1','Бизнес',   'This is a great opportunity.',       'Това е страхотна възможност.'),
('Consider',    'Обмислям',      '/kənˈsɪdər/',    'B1', 'Бизнес',    'Please consider my proposal.',       'Моля, обмислете предложението ми.'),
('Improve',     'Подобрявам',    '/ɪmˈpruːv/',     'B1', 'Бизнес',    'We need to improve our service.',    'Трябва да подобрим услугата си.'),
('Achieve',     'Постигам',      '/əˈtʃiːv/',      'B1', 'Бизнес',    'You can achieve your goals.',        'Можеш да постигнеш целите си.'),
('Software',    'Софтуер',       '/ˈsɒftweər/',    'B1', 'Технологии','The software needs an update.',      'Софтуерът се нуждае от актуализация.'),
('Device',      'Устройство',    '/dɪˈvaɪs/',      'B1', 'Технологии','This device is very fast.',          'Това устройство е много бързо.'),

-- B2 — Бизнес / Ежедневие
('Ambitious',   'Амбициозен',    '/æmˈbɪʃəs/',     'B2', 'Бизнес',    'She is a very ambitious person.',    'Тя е много амбициозен човек.'),
('Resilient',   'Устойчив',      '/rɪˈzɪliənt/',   'B2', 'Ежедневие', 'He is resilient under pressure.',    'Той е устойчив под натиск.'),
('Negotiate',   'Преговарям',    '/nɪˈɡəʊʃieɪt/', 'B2', 'Бизнес',    'We need to negotiate the price.',    'Трябва да преговаряме цената.'),
('Persuade',    'Убеждавам',     '/pəˈsweɪd/',     'B2', 'Бизнес',    'He persuaded me to stay.',           'Той ме убеди да остана.'),
('Challenge',   'Предизвикателство','/ˈtʃælɪndʒ/', 'B2', 'Бизнес',   'This is a big challenge.',           'Това е голямо предизвикателство.'),
('Grateful',    'Благодарен',    '/ˈɡreɪtfəl/',    'B2', 'Ежедневие', 'I am grateful for your support.',    'Благодарен съм за подкрепата ви.'),
('Sustainable', 'Устойчив',      '/səˈsteɪnəbəl/', 'B2', 'Природа',   'We need sustainable solutions.',     'Имаме нужда от устойчиви решения.'),

-- C1 — Различни теми
('Persevere',   'Упорствам',     '/ˌpɜːsɪˈvɪər/',  'C1', 'Ежедневие', 'You must persevere to succeed.',     'Трябва да упорстваш, за да успееш.'),
('Eloquent',    'Красноречив',   '/ˈeləkwənt/',    'C1', 'Бизнес',    'She gave an eloquent speech.',       'Тя произнесе красноречива реч.'),
('Inevitable',  'Неизбежен',     '/ɪnˈevɪtəbəl/',  'C1', 'Ежедневие', 'Change is inevitable.',              'Промяната е неизбежна.'),
('Meticulous',  'Педантичен',    '/məˈtɪkjʊləs/',  'C1', 'Бизнес',    'He is meticulous about details.',    'Той е педантичен към детайлите.'),
('Unprecedented',   'Безпрецедентен', '/ʌnˈpresɪdentɪd/', 'C1', 'Бизнес', 'This is an unprecedented event.', 'Това е безпрецедентно събитие.'),
('Comprehensive','Изчерпателен', '/ˌkɒmprɪˈhensɪv/', 'C1', 'Бизнес', 'We need a comprehensive plan.',      'Имаме нужда от изчерпателен план.');


-- ── Grammar lessons ──────────────────────────────────────────
INSERT INTO public.grammar_lessons (slug, title, level, category, order_index, content_md) VALUES
('present-simple-intro',       'Present Simple — Въведение',     'A1', 'Present Simple',     1, ''),
('present-simple-positive',    'Present Simple — Положителна форма','A1','Present Simple',   2, ''),
('present-simple-negative',    'Present Simple — Отрицателна форма','A1','Present Simple',   3, ''),
('present-simple-questions',   'Present Simple — Въпроси',        'A1', 'Present Simple',    4, ''),
('present-continuous-intro',   'Present Continuous — Въведение',  'A2', 'Present Continuous',1, ''),
('present-continuous-vs-simple','Present Continuous vs Simple',   'A2', 'Present Continuous',2, ''),
('past-simple-regular',        'Past Simple — Правилни глаголи',  'A2', 'Past Simple',       1, ''),
('past-simple-irregular',      'Past Simple — Неправилни глаголи','A2', 'Past Simple',       2, ''),
('future-will',                'Future — Will',                   'B1', 'Future Tenses',     1, ''),
('future-going-to',            'Future — Going to',               'B1', 'Future Tenses',     2, ''),
('conditionals-zero-first',    'Conditionals — Zero & First',     'B1', 'Conditionals',      1, ''),
('conditionals-second',        'Conditionals — Second',           'B2', 'Conditionals',      2, ''),
('passive-voice-intro',        'Passive Voice — Въведение',       'B2', 'Passive Voice',     1, ''),
('reported-speech',            'Reported Speech',                  'B2', 'Reported Speech',  1, '');
