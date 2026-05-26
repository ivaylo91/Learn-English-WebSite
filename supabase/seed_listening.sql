-- ============================================================
-- seed_listening.sql — 4 listening clips with transcripts + questions
-- Run AFTER 001_initial_schema.sql
-- Note: Replace audio_url values with real Supabase Storage URLs
-- ============================================================

INSERT INTO public.listening_clips
  (title, audio_url, transcript, level, topic, duration_seconds, questions)
VALUES

-- ── Clip 1: A1 ───────────────────────────────────────────────
(
  'A Cup of Coffee',
  '',
  $tr$
[At a café counter]

Barista: Good morning! What can I get for you today?

Customer: Hi, good morning! Can I have a coffee, please?

Barista: Of course. Would you like a small, medium, or large?

Customer: Medium, please. And can I have some milk in it?

Barista: Sure. Anything else? We have fresh muffins today.

Customer: Oh, yes please! One blueberry muffin. How much is that?

Barista: That's four pounds fifty, please.

Customer: Here you go. Thank you!

Barista: Thank you! Your coffee will be ready in a moment. Have a great day!

Customer: You too, bye!
$tr$,
  'A1',
  'Ежедневие',
  78,
  '[
    {"question": "Where does this conversation take place?", "options": ["At a restaurant", "At a café", "At a supermarket", "At a hotel"], "correct": 1},
    {"question": "What size coffee does the customer order?", "options": ["Small", "Large", "Medium", "Extra large"], "correct": 2},
    {"question": "What does the customer add to the coffee?", "options": ["Sugar", "Cream", "Milk", "Nothing"], "correct": 2},
    {"question": "What food does the customer order?", "options": ["A chocolate muffin", "A blueberry muffin", "A sandwich", "A croissant"], "correct": 1},
    {"question": "How much does the customer pay?", "options": ["£3.50", "£4.00", "£4.50", "£5.00"], "correct": 2}
  ]'::jsonb
),

-- ── Clip 2: A2 ───────────────────────────────────────────────
(
  'Weekend Plans',
  '',
  $tr$
[Two friends talking]

Anna: Hey, do you have any plans for this weekend?

Tom: Not really. Maybe I'll just stay home and watch some films. What about you?

Anna: I'm thinking of going to the new exhibition at the city museum. It's about ancient Egypt. Do you want to come?

Tom: That sounds interesting! What day are you going?

Anna: Saturday afternoon. We could meet at the museum entrance at two o'clock.

Tom: Perfect. Is it expensive?

Anna: Students pay half price — it's only five euros. And there's a café inside if we want to have lunch after.

Tom: Great, I love the museum café! Okay, I'm in. See you Saturday!

Anna: Brilliant! I'll send you the address. See you then!
$tr$,
  'A2',
  'Ежедневие',
  112,
  '[
    {"question": "What was Tom planning to do at the weekend?", "options": ["Go to the cinema", "Stay home and watch films", "Visit friends", "Play sport"], "correct": 1},
    {"question": "What is the museum exhibition about?", "options": ["Modern art", "Ancient Rome", "Ancient Egypt", "Space exploration"], "correct": 2},
    {"question": "What time do they agree to meet?", "options": ["12:00", "13:00", "14:00", "15:00"], "correct": 2},
    {"question": "How much does a student ticket cost?", "options": ["€3", "€5", "€7", "€10"], "correct": 1},
    {"question": "What does Anna offer to send Tom?", "options": ["A ticket", "The address", "A photo", "A map"], "correct": 1}
  ]'::jsonb
),

-- ── Clip 3: B1 ───────────────────────────────────────────────
(
  'Remote Work: Pros and Cons',
  '',
  $tr$
[A podcast-style monologue]

Over the past few years, remote work has become increasingly common. For many people, working from home has changed their daily lives significantly — and not always in the ways they expected.

On the positive side, employees who work from home often report greater flexibility. They can organise their schedule around personal commitments, avoid long commutes, and work in a comfortable environment. Studies have shown that many remote workers actually feel more productive when they work from home.

However, remote work also comes with challenges. One of the biggest issues is isolation. Without regular face-to-face interaction with colleagues, some workers feel disconnected and miss the social aspect of office life. Communication can also be more difficult, as quick questions or spontaneous conversations don't happen as naturally online.

Another concern is the difficulty of separating work from personal life. When your home becomes your office, it can be hard to switch off at the end of the day.

Overall, whether remote work is a benefit or a challenge depends greatly on the individual. What works perfectly for one person may not suit another at all.
$tr$,
  'B1',
  'Бизнес',
  148,
  '[
    {"question": "What is one positive aspect of working from home mentioned?", "options": ["Higher salary", "Better equipment", "Greater flexibility", "More holidays"], "correct": 2},
    {"question": "What do studies show about remote workers?", "options": ["They earn more", "They feel more productive", "They work shorter hours", "They take more breaks"], "correct": 1},
    {"question": "What is described as one of the biggest challenges of remote work?", "options": ["Noisy environment", "Isolation", "Slow internet", "Expensive equipment"], "correct": 1},
    {"question": "What happens to spontaneous conversations in remote work?", "options": ["They happen more often", "They are replaced by emails", "They don''t happen as naturally", "They are forbidden"], "correct": 2},
    {"question": "According to the speaker, who does remote work suit best?", "options": ["Everyone equally", "Only managers", "It depends on the individual", "Only young people"], "correct": 2}
  ]'::jsonb
),

-- ── Clip 4: B2 ───────────────────────────────────────────────
(
  'The Science of Sleep',
  '',
  $tr$
[Educational documentary narration]

Sleep is one of the most fundamental biological processes, yet it remains one of the least understood. For decades, scientists believed sleep was simply a passive state — a period of rest when the brain and body did very little. We now know this is far from the truth.

During sleep, the brain is remarkably active. In the stage known as REM sleep — Rapid Eye Movement — neural activity surges to levels almost as high as when we are awake. This is when most dreaming occurs, and researchers believe it plays a crucial role in emotional regulation and memory consolidation.

Meanwhile, during the deeper stages of non-REM sleep, the body undergoes essential repair processes. Cells regenerate, the immune system strengthens, and growth hormones are released. Without adequate deep sleep, these critical functions are compromised.

Chronic sleep deprivation has been linked to a wide range of health problems — from increased risk of cardiovascular disease to impaired cognitive function and weakened immunity. Yet in many modern societies, insufficient sleep has become almost normalised, with people routinely sacrificing rest in favour of work or entertainment.

Scientists are increasingly calling for a cultural shift in how we value sleep — not as a luxury, but as a biological necessity as fundamental as food and water.
$tr$,
  'B2',
  'Природа',
  198,
  '[
    {"question": "What did scientists previously believe about sleep?", "options": ["It was very active", "It was a passive state", "It was dangerous", "It was unnecessary"], "correct": 1},
    {"question": "What does REM stand for?", "options": ["Regular Energy Movement", "Rapid Eye Movement", "Repeated Electrical Monitoring", "Rest and Energy Management"], "correct": 1},
    {"question": "What happens during deep non-REM sleep?", "options": ["Dreaming occurs", "Neural activity surges", "Cells regenerate and repair", "Body temperature rises"], "correct": 2},
    {"question": "What health issues are linked to chronic sleep deprivation?", "options": ["Only mental issues", "Only physical issues", "Cardiovascular disease and cognitive impairment", "Just tiredness"], "correct": 2},
    {"question": "What do scientists want society to change?", "options": ["How we exercise", "How we value sleep as a necessity", "How we eat before bed", "How we measure sleep"], "correct": 1}
  ]'::jsonb
);
