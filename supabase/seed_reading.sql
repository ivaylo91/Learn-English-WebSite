-- ============================================================
-- seed_reading.sql — 4 reading texts with body_md, vocabulary, questions
-- Run AFTER 003_content_progress.sql
-- ============================================================

INSERT INTO public.reading_texts
  (slug, title, body_md, level, topic, reading_time_minutes, vocabulary, questions)
VALUES

-- ── Text 1: A2 ───────────────────────────────────────────────
(
  'a-day-in-edinburgh',
  'A Day in Edinburgh',
  $md$
Edinburgh is the **capital** of Scotland and one of the most **beautiful** cities in Europe. Every year, millions of tourists **visit** the city to see its famous landmarks.

The most popular attraction is **Edinburgh Castle**, which sits on top of a large rock in the centre of the city. The castle is very old — parts of it were built over 900 years ago. From the castle, you can see amazing views across the whole city.

Another famous place is the **Royal Mile** — a long street that connects the castle to the Palace of Holyroodhouse, where the British royal family sometimes stays. The street is full of small shops, **traditional** restaurants, and street performers.

Edinburgh is also famous for its **festivals**. Every August, the city hosts the Edinburgh Festival Fringe — the biggest arts festival in the world. Thousands of performers come from all over the world to put on shows.

The city is **compact** and easy to explore on foot. Most of the main **attractions** are within walking distance of each other. If you visit in summer, the days are very long — it stays light until almost midnight!
$md$,
  'A2',
  'Пътувания',
  3,
  '[
    {"en": "capital",      "bg": "столица"},
    {"en": "beautiful",    "bg": "красив"},
    {"en": "visit",        "bg": "посещавам"},
    {"en": "traditional",  "bg": "традиционен"},
    {"en": "festivals",    "bg": "фестивали"},
    {"en": "compact",      "bg": "компактен"},
    {"en": "attractions",  "bg": "забележителности"},
    {"en": "performers",   "bg": "изпълнители"}
  ]'::jsonb,
  '[
    {"question": "What is Edinburgh the capital of?", "options": ["England", "Wales", "Scotland", "Ireland"], "correct": 2},
    {"question": "Where is Edinburgh Castle located?", "options": ["By the river", "On a hill outside the city", "On top of a rock in the city centre", "Next to the Royal Mile"], "correct": 2},
    {"question": "What connects the castle to the Palace of Holyroodhouse?", "options": ["A bridge", "The Royal Mile", "A park", "A railway"], "correct": 1},
    {"question": "When is the Edinburgh Festival Fringe held?", "options": ["June", "July", "August", "September"], "correct": 2},
    {"question": "What is special about summer days in Edinburgh?", "options": ["It is very hot", "It rains a lot", "It stays light until almost midnight", "The city is empty"], "correct": 2}
  ]'::jsonb
),

-- ── Text 2: B1 ───────────────────────────────────────────────
(
  'the-benefits-of-exercise',
  'The Benefits of Regular Exercise',
  $md$
Most doctors agree that regular physical activity is one of the most important things you can do for your health. Yet despite this well-known advice, a significant portion of the population **remains** physically inactive.

## Physical Benefits

Exercise **strengthens** the heart and improves circulation, which reduces the risk of cardiovascular disease. It also helps maintain a healthy weight, builds **muscle** and bone density, and **improves** flexibility and balance — all of which become increasingly important as we get older.

Regular exercise also **boosts** the immune system. People who exercise **consistently** tend to get sick less often and recover more quickly when they do fall ill.

## Mental Health Benefits

Perhaps less obvious, but equally important, are the mental health benefits of exercise. Physical activity **triggers** the release of endorphins — chemicals in the brain that act as natural mood-boosters. Studies have consistently shown that regular exercise can **reduce** symptoms of anxiety and depression.

Exercise also improves **cognitive** function. Even a 20-minute walk has been shown to improve concentration, memory, and **creativity**.

## How Much Is Enough?

Health guidelines generally recommend at least 150 minutes of **moderate** exercise per week — that's just over 20 minutes per day. This can be broken into shorter sessions throughout the day, making it easier to fit into a busy lifestyle.

The message is clear: even small amounts of regular activity can make a significant **difference** to your long-term health.
$md$,
  'B1',
  'Ежедневие',
  4,
  '[
    {"en": "remains",      "bg": "остава"},
    {"en": "strengthens",  "bg": "укрепва"},
    {"en": "muscle",       "bg": "мускул"},
    {"en": "improves",     "bg": "подобрява"},
    {"en": "boosts",       "bg": "засилва"},
    {"en": "consistently", "bg": "постоянно"},
    {"en": "triggers",     "bg": "предизвиква"},
    {"en": "reduce",       "bg": "намалявам"},
    {"en": "cognitive",    "bg": "когнитивен"},
    {"en": "creativity",   "bg": "креативност"},
    {"en": "moderate",     "bg": "умерен"},
    {"en": "difference",   "bg": "разлика"}
  ]'::jsonb,
  '[
    {"question": "According to the article, what is one of the most important things for health?", "options": ["Eating less", "Regular physical activity", "Sleeping more", "Taking vitamins"], "correct": 1},
    {"question": "What chemicals does exercise trigger in the brain?", "options": ["Adrenaline", "Dopamine", "Endorphins", "Serotonin only"], "correct": 2},
    {"question": "What cognitive benefit is mentioned for a 20-minute walk?", "options": ["Better sleep", "Improved concentration, memory, and creativity", "Stronger muscles", "Better eyesight"], "correct": 1},
    {"question": "How many minutes of moderate exercise per week do health guidelines recommend?", "options": ["100 minutes", "120 minutes", "150 minutes", "200 minutes"], "correct": 2},
    {"question": "What does the article say about people who exercise consistently?", "options": ["They live twice as long", "They never get sick", "They tend to get sick less often", "They don''t need sleep"], "correct": 2}
  ]'::jsonb
),

-- ── Text 3: B2 ───────────────────────────────────────────────
(
  'rise-of-artificial-intelligence',
  'The Rise of Artificial Intelligence',
  $md$
Artificial intelligence has moved from the realm of science fiction into **everyday** reality with remarkable speed. In just a few decades, what was once considered **futuristic** technology has become **embedded** in the tools billions of people use daily — from search engines and recommendation **algorithms** to voice assistants and medical diagnostics.

## How AI Works

At its core, modern AI is powered by **machine learning** — a process by which computer systems learn from vast amounts of data rather than being explicitly programmed with rules. The more data these systems process, the more **sophisticated** their outputs become. This is why the explosion of digital data over the past two decades has been so critical to AI's **advancement**.

## Transforming Industries

The **implications** for virtually every industry are profound. In healthcare, AI systems can now detect certain cancers from medical images with **accuracy** that rivals — and sometimes exceeds — that of human specialists. In finance, algorithms analyse market patterns and manage risk at speeds no human could match. In education, adaptive learning platforms can **tailor** content to individual students in real time.

## Risks and Concerns

Yet the rise of AI also brings significant **challenges**. One of the most pressing concerns is employment — as automation becomes more capable, many **routine** jobs face the risk of being displaced. There are also serious questions about **bias**: AI systems trained on historical data can perpetuate and even amplify existing inequalities.

Privacy is another major concern. The vast amounts of **personal data** required to train effective AI systems raise fundamental questions about who owns this information and how it is used.

## Looking Ahead

The question is no longer whether AI will **transform** society, but how we choose to manage that transformation. Policymakers, technologists, and citizens alike will need to engage with these questions — because the decisions made today will shape the world of tomorrow.
$md$,
  'B2',
  'Технологии',
  6,
  '[
    {"en": "everyday",      "bg": "ежедневен"},
    {"en": "futuristic",    "bg": "футуристичен"},
    {"en": "embedded",      "bg": "вграден"},
    {"en": "algorithms",    "bg": "алгоритми"},
    {"en": "sophisticated", "bg": "усъвършенстван"},
    {"en": "advancement",   "bg": "напредък"},
    {"en": "implications",  "bg": "последствия"},
    {"en": "accuracy",      "bg": "точност"},
    {"en": "tailor",        "bg": "адаптирам"},
    {"en": "challenges",    "bg": "предизвикателства"},
    {"en": "routine",       "bg": "рутинен"},
    {"en": "bias",          "bg": "пристрастие"},
    {"en": "transform",     "bg": "трансформирам"}
  ]'::jsonb,
  '[
    {"question": "What is described as the core technology behind modern AI?", "options": ["Programming with rules", "Machine learning", "Quantum computing", "Neural chips"], "correct": 1},
    {"question": "In healthcare, what can AI detect from medical images?", "options": ["Blood pressure", "Certain cancers", "Broken bones only", "Mental illness"], "correct": 1},
    {"question": "What employment concern does the article mention?", "options": ["AI creating too many jobs", "Routine jobs being displaced by automation", "Workers not knowing how to use AI", "AI taking over creative jobs only"], "correct": 1},
    {"question": "What does the article say about AI trained on historical data?", "options": ["It is always fair", "It can perpetuate existing inequalities", "It ignores historical patterns", "It is always more accurate"], "correct": 1},
    {"question": "What does the article say is the key question about AI?", "options": ["Whether AI will replace all jobs", "Whether AI is smarter than humans", "How we manage the transformation of society", "Whether AI is safe to use"], "correct": 2}
  ]'::jsonb
),

-- ── Text 4: C1 ───────────────────────────────────────────────
(
  'language-and-thought',
  'Language and Thought: Are They Inseparable?',
  $md$
The relationship between language and thought is one of the oldest and most **contentious** questions in cognitive science. Does the language we speak shape how we think? Or does thought exist **independently** of language — with words merely serving as labels for ideas that would exist regardless?

## The Sapir-Whorf Hypothesis

The most **influential** — and controversial — position on this question is the Sapir-Whorf hypothesis, also known as **linguistic relativity**. In its strong form, it argues that language *determines* thought: that speakers of different languages quite literally **perceive** the world differently, constrained by the categories their language provides.

The weaker version — **linguistic influence** — is more widely accepted today. It suggests that while language does not imprison thought, it does **subtly** shape **cognition**: the language you speak may make certain distinctions easier to notice, certain concepts easier to express, and certain patterns of reasoning more **habitual**.

## Evidence from Research

Some of the most compelling evidence comes from the study of **spatial reasoning**. Speakers of languages that use absolute directions (north, south, east, west) rather than relative ones (left, right) have been shown to have **superior** spatial awareness — always knowing which direction they are facing, even indoors or underground.

Similarly, languages vary significantly in how they **categorise** colour. Speakers of languages with more words for different shades of a colour can distinguish between those shades more quickly in **perception** experiments.

## Implications

These findings have **profound** implications for how we think about **multilingualism**. Each additional language a person learns may offer not just a new communication tool, but a genuinely new way of organising and interpreting **experience**.

As the linguist Ludwig Wittgenstein famously observed: *"The limits of my language mean the limits of my world."*
$md$,
  'C1',
  'Ежедневие',
  7,
  '[
    {"en": "contentious",   "bg": "спорен"},
    {"en": "independently", "bg": "независимо"},
    {"en": "influential",   "bg": "влиятелен"},
    {"en": "linguistic",    "bg": "езиков"},
    {"en": "perceive",      "bg": "възприемам"},
    {"en": "subtly",        "bg": "фино"},
    {"en": "cognition",     "bg": "познание"},
    {"en": "habitual",      "bg": "навичен"},
    {"en": "spatial",       "bg": "пространствен"},
    {"en": "superior",      "bg": "превъзходен"},
    {"en": "categorise",    "bg": "категоризирам"},
    {"en": "profound",      "bg": "дълбок"},
    {"en": "multilingualism","bg": "многоезичие"},
    {"en": "experience",    "bg": "опит, преживяване"}
  ]'::jsonb,
  '[
    {"question": "What does the strong form of the Sapir-Whorf hypothesis argue?", "options": ["Language helps us communicate", "Language determines thought", "Thought is independent of language", "Language and thought are unrelated"], "correct": 1},
    {"question": "Which version of the hypothesis is more widely accepted today?", "options": ["Strong: language determines thought", "Weak: language subtly influences thought", "Neither is accepted", "Both equally"], "correct": 1},
    {"question": "What do speakers of languages with absolute directions show?", "options": ["Better mathematical ability", "Superior spatial awareness", "Better memory", "Stronger linguistic skills"], "correct": 1},
    {"question": "What does the evidence about colour suggest?", "options": ["All languages have the same colour words", "Colour words don''t affect perception", "More colour words help distinguish shades faster", "Colour perception is purely visual"], "correct": 2},
    {"question": "What does the article suggest each new language offers?", "options": ["Just new vocabulary", "A way to get a better job", "A genuinely new way of organising experience", "Faster thinking"], "correct": 2}
  ]'::jsonb
);
