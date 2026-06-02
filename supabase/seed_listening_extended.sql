-- ============================================================
-- seed_listening_extended.sql — 8 more listening clips A1–B2
-- Run AFTER seed_listening.sql
-- Replace audio_url values with real Supabase Storage URLs
-- ============================================================

INSERT INTO public.listening_clips
  (title, audio_url, transcript, level, topic, duration_seconds, questions)
VALUES

-- ── A1 · At the Doctor's ─────────────────────────────────────
(
  'At the Doctor''s',
  '',
  $tr$
[At a medical clinic]

Receptionist: Good morning. How can I help you?

Patient: Good morning. I have an appointment with Dr. Brown at ten o'clock. My name is Mark Taylor.

Receptionist: Let me check... yes, Mr. Taylor. Please take a seat. The doctor will be with you in about five minutes.

Patient: Thank you.

[Five minutes later]

Doctor: Mr. Taylor? Please come in. What seems to be the problem?

Patient: I have a bad headache. It started two days ago. And I feel very tired.

Doctor: I see. Do you have a temperature?

Patient: I'm not sure. I don't think so.

Doctor: Let me check. No, your temperature is normal. Is the pain only in your head?

Patient: Mostly, yes. But my throat is also a little sore.

Doctor: It sounds like a cold. I'll prescribe some medicine. Take two tablets three times a day, with food. And drink lots of water.

Patient: Should I stay in bed?

Doctor: It would help. Try to rest for two or three days. If you don't feel better in a week, come back and see me.

Patient: Thank you, Doctor.

Doctor: You're welcome. Get well soon!
$tr$,
  'A1',
  'Здраве',
  142,
  '[
    {"question": "Why is Mark at the clinic?", "options": ["He wants a check-up", "He has a headache and feels tired", "He broke his arm", "He needs a prescription"], "correct": 1},
    {"question": "How long has Mark had the headache?", "options": ["One day", "Two days", "Three days", "One week"], "correct": 1},
    {"question": "What does the doctor say about Mark''s temperature?", "options": ["It is very high", "It is slightly high", "It is normal", "It is low"], "correct": 2},
    {"question": "How often should Mark take the tablets?", "options": ["Once a day", "Twice a day", "Three times a day", "Four times a day"], "correct": 2},
    {"question": "When should Mark return if he doesn''t improve?", "options": ["In two days", "In three days", "In five days", "In one week"], "correct": 3}
  ]'::jsonb
),

-- ── A1 · Shopping for Clothes ────────────────────────────────
(
  'Shopping for Clothes',
  '',
  $tr$
[In a clothes shop]

Shop assistant: Hi there! Can I help you?

Customer: Yes, please. I'm looking for a jacket. For the winter.

Shop assistant: Of course. What colour are you looking for?

Customer: I like blue or dark grey.

Shop assistant: We have some nice ones over here. This navy blue jacket is very popular.

Customer: Can I try it on?

Shop assistant: Yes, of course. What size are you?

Customer: Medium, I think.

Shop assistant: Here you are. The changing rooms are over there on the left.

Customer: Thank you.

[A few minutes later]

Customer: Hmm, I like the colour, but it's a little small. Do you have a large?

Shop assistant: Let me check... yes, here's the same jacket in large.

Customer: Oh, that's much better. How much is it?

Shop assistant: It's sixty-five pounds. It's made of very good quality wool.

Customer: It's a bit expensive. Do you have any sales at the moment?

Shop assistant: Actually, yes! If you buy two items, you get twenty percent off. We have some great scarves that would go well with it.

Customer: That sounds good. I'll take the jacket and a scarf, please.

Shop assistant: Excellent choice! I'll take those to the till for you.
$tr$,
  'A1',
  'Ежедневие',
  128,
  '[
    {"question": "What is the customer looking for?", "options": ["A shirt", "A jacket", "A coat", "A jumper"], "correct": 1},
    {"question": "What colours does the customer prefer?", "options": ["Red or black", "Blue or dark grey", "Green or brown", "White or beige"], "correct": 1},
    {"question": "What size does the customer first try?", "options": ["Small", "Medium", "Large", "Extra large"], "correct": 1},
    {"question": "How much does the jacket cost?", "options": ["£45", "£55", "£65", "£75"], "correct": 2},
    {"question": "What discount is available?", "options": ["10% off everything", "Buy one get one free", "20% off when you buy two items", "Half price sale"], "correct": 2}
  ]'::jsonb
),

-- ── A2 · A Phone Call ────────────────────────────────────────
(
  'Making Plans by Phone',
  '',
  $tr$
[A phone conversation between two friends]

Sophie: Hello?

James: Hi, Sophie! It's James. How are you?

Sophie: James! I'm good, thanks. And you?

James: Not bad. Listen, I'm calling because a few of us are going bowling on Saturday evening. Would you like to come?

Sophie: Bowling! That sounds fun. What time?

James: We're meeting at seven. At the Kingpin Bowling Alley on Market Street. Do you know it?

Sophie: I think so. Is it near the cinema?

James: Yes, exactly — just opposite the cinema.

Sophie: Great. Who else is coming?

James: Tom, Lily, and maybe David if he's free. About five or six of us.

Sophie: Sounds good. Should I book online, or do we pay at the door?

James: I've already booked — it was cheaper online. I'll pay for everyone now and you can pay me back later. It's twelve pounds per person.

Sophie: Oh, that's kind of you! Shall I bring anything?

James: No, just yourself. We're going for pizza afterwards, so maybe bring a bit of extra money for that.

Sophie: Perfect. I'm looking forward to it!

James: Great, see you Saturday. I'll send you the address just in case.

Sophie: Thank you! See you then. Bye!
$tr$,
  'A2',
  'Ежедневие',
  118,
  '[
    {"question": "Why is James calling Sophie?", "options": ["To cancel plans", "To invite her bowling", "To ask for help", "To discuss work"], "correct": 1},
    {"question": "Where is the bowling alley?", "options": ["On High Street", "On Market Street", "Next to the park", "Behind the cinema"], "correct": 1},
    {"question": "How much does bowling cost per person?", "options": ["£8", "£10", "£12", "£15"], "correct": 2},
    {"question": "Who has already booked and paid?", "options": ["Sophie", "Tom", "James", "David"], "correct": 2},
    {"question": "What are the friends planning to do after bowling?", "options": ["Go to the cinema", "Have pizza", "Go home", "Go to a bar"], "correct": 1}
  ]'::jsonb
),

-- ── A2 · Describing Your Neighbourhood ──────────────────────
(
  'My Neighbourhood',
  '',
  $tr$
[A short monologue]

Hello! My name is Clara, and I want to tell you about the neighbourhood where I live.

I live in a small town called Ashford. It's about forty kilometres from London, so it's easy to go to the city by train. The train journey takes about forty minutes.

My neighbourhood is very quiet. There are lots of green parks and the streets are clean. I love walking to work in the morning because there's a beautiful river nearby.

There are two supermarkets, several small shops, and a very good bakery. The bread there is amazing! There is also a library, a post office, and a swimming pool.

For restaurants, we have a few Italian places, a Chinese restaurant, and a Thai takeaway that I love. The food is always fresh and affordable.

The people here are very friendly. I moved here three years ago, and I quickly made good friends with my neighbours. Everyone says hello in the street.

One thing I miss is a cinema. The nearest one is in the next town, so we have to drive there. But overall, I really love my neighbourhood. It's peaceful, it's safe, and it feels like home.
$tr$,
  'A2',
  'Ежедневие',
  105,
  '[
    {"question": "How far is Ashford from London?", "options": ["20 kilometres", "40 kilometres", "60 kilometres", "100 kilometres"], "correct": 1},
    {"question": "How long is the train journey to London?", "options": ["20 minutes", "30 minutes", "40 minutes", "1 hour"], "correct": 2},
    {"question": "What food place does Clara particularly love?", "options": ["The Italian restaurant", "The Chinese restaurant", "The Thai takeaway", "The bakery"], "correct": 2},
    {"question": "How long has Clara lived in Ashford?", "options": ["One year", "Two years", "Three years", "Five years"], "correct": 2},
    {"question": "What facility does Clara say is missing from her neighbourhood?", "options": ["A swimming pool", "A library", "A cinema", "A supermarket"], "correct": 2}
  ]'::jsonb
),

-- ── B1 · Planning a Holiday ─────────────────────────────────
(
  'Planning a Trip to Portugal',
  '',
  $tr$
[Two colleagues having lunch]

Rachel: I'm so ready for a holiday. I haven't been abroad since last year.

Marcus: Me too. Actually, I've been looking at Portugal. Have you ever been?

Rachel: No, but I've heard it's beautiful. Whereabouts are you thinking?

Marcus: I was looking at Lisbon and then maybe the Algarve coast for a few days. A mix of city and beach.

Rachel: That sounds perfect! When are you thinking of going?

Marcus: Late September or early October. It's still warm but much less crowded than summer. And flights are cheaper.

Rachel: How would you get around? Rent a car?

Marcus: Probably yes for the Algarve — the villages are spread out. But Lisbon is easy on public transport. They have a great tram system.

Rachel: What's the accommodation like? Have you looked?

Marcus: I've found a really nice guesthouse in Lisbon — very central, and breakfast is included. About seventy euros a night.

Rachel: That's not bad for a central location. What about the Algarve?

Marcus: There are loads of options. I'm thinking maybe a self-catering apartment so we can cook some meals rather than eating out every night.

Rachel: Smart idea. How long were you thinking?

Marcus: Ten days total. Three nights in Lisbon and seven at the coast.

Rachel: I'd love to join if you're looking for travel companions. It sounds amazing.

Marcus: Actually, yes! I was hoping to find someone to go with. The more the merrier!
$tr$,
  'B1',
  'Пътувания',
  162,
  '[
    {"question": "What combination of places is Marcus planning to visit?", "options": ["Porto and Lisbon", "Lisbon and the Algarve coast", "The Algarve and Madeira", "Lisbon and the Douro Valley"], "correct": 1},
    {"question": "Why is late September or October recommended?", "options": ["It is the cheapest month", "It is warm but less crowded", "There are festivals then", "Hotels are all fully refundable"], "correct": 1},
    {"question": "Why does Marcus want to rent a car in the Algarve?", "options": ["Public transport is unreliable", "The villages are spread out", "It is cheaper than trains", "He doesn''t like buses"], "correct": 1},
    {"question": "What is included in the Lisbon guesthouse price?", "options": ["Lunch", "Dinner", "Breakfast", "All meals"], "correct": 2},
    {"question": "Why does Marcus prefer self-catering in the Algarve?", "options": ["He likes cooking", "To save money by not eating out every night", "There are no good restaurants", "He has food allergies"], "correct": 1}
  ]'::jsonb
),

-- ── B1 · Job Interview ───────────────────────────────────────
(
  'A Job Interview',
  '',
  $tr$
[Interview for a marketing assistant position]

Interviewer: Good morning, Sofia. Thank you for coming in today.

Sofia: Good morning. Thank you for the opportunity.

Interviewer: So, tell me a little about yourself and why you're interested in this role.

Sofia: Of course. I recently graduated in Marketing and Communications. During my studies, I did a six-month internship at a digital agency, where I worked mainly on social media campaigns and content creation. I really enjoyed the practical side of marketing, and this role seems like a great next step.

Interviewer: What did you find most challenging about your internship?

Sofia: Probably managing multiple projects at the same time. At first, I found it difficult to prioritise when everything seemed urgent. I learned to use project management tools and break tasks into smaller steps. By the end of the internship, I was handling four campaigns simultaneously without feeling overwhelmed.

Interviewer: That's impressive. How would you describe your approach to working in a team?

Sofia: I think communication is key. I like to make sure everyone knows what they're responsible for and that we check in regularly. I'm also happy to take the initiative when it's needed, but I believe good results usually come from collaboration.

Interviewer: Where do you see yourself in three years?

Sofia: I'd like to develop my skills in data analytics and strategy. I'm currently studying for a Google Analytics qualification in my own time. In three years, I'd hope to be in a more senior role, perhaps leading a small team.

Interviewer: Excellent. Do you have any questions for us?

Sofia: Yes — could you tell me more about the team I'd be joining and how success is measured in this role?
$tr$,
  'B1',
  'Бизнес',
  174,
  '[
    {"question": "What did Sofia study at university?", "options": ["Business and Finance", "Marketing and Communications", "Journalism and Media", "Design and Technology"], "correct": 1},
    {"question": "What was Sofia''s main work during her internship?", "options": ["Graphic design and printing", "Social media campaigns and content creation", "Market research and data analysis", "Customer service and sales"], "correct": 1},
    {"question": "What challenge did Sofia mention and how did she solve it?", "options": ["Managing time by working longer hours", "Managing multiple projects using project management tools", "Managing difficult clients by escalating issues", "Managing budgets by cutting costs"], "correct": 1},
    {"question": "What qualification is Sofia studying for in her own time?", "options": ["Facebook Blueprint", "HubSpot Content Marketing", "Google Analytics", "CIM Diploma"], "correct": 2},
    {"question": "What does Sofia ask the interviewer at the end?", "options": ["What the salary is", "About the team and how success is measured", "How many holidays she will get", "When the decision will be made"], "correct": 1}
  ]'::jsonb
),

-- ── B2 · The Future of Cities ────────────────────────────────
(
  'The Future of Cities',
  '',
  $tr$
[A TED-style lecture]

Good evening. I want to ask you to imagine a city where the air is clean enough to breathe without concern — where public transport is so efficient, fast, and affordable that car ownership becomes unnecessary — and where green spaces are woven into the fabric of every neighbourhood. This is not a utopia. These are measurable, achievable goals. And several cities around the world are already making them happen.

The 21st century is, above all, an urban century. More than half the world's population now lives in cities — a figure projected to rise to two thirds by 2050. How we design and manage cities over the next few decades will arguably do more to shape the future of our planet than any other single factor.

Let's look at transport. Private cars are extraordinarily inefficient. A car sits parked roughly 95% of its life. When it does move, it moves one or two people through space that could accommodate many more. Cities that have invested heavily in rapid transit, cycling infrastructure, and walkable neighbourhoods consistently report lower emissions, better public health outcomes, and — often surprisingly — higher economic productivity.

Then there is the question of green space. Research consistently shows that access to parks and natural environments reduces mental health problems, lowers crime, and increases community cohesion. Yet in many rapidly growing cities in the developing world, green space is the first casualty of development.

And of course, there is the critical challenge of housing affordability. A city may be brilliantly designed in every other respect, but if ordinary working people cannot afford to live there, it has failed its most basic social purpose.

The cities that will thrive in the coming decades will be those that treat these challenges not as separate technical problems, but as deeply interconnected aspects of a single question: what kind of life do we want people to live?
$tr$,
  'B2',
  'Ежедневие',
  218,
  '[
    {"question": "What percentage of the world''s population is projected to live in cities by 2050?", "options": ["Half", "Two thirds", "Three quarters", "90%"], "correct": 1},
    {"question": "What statistic does the speaker give about private cars?", "options": ["They cause 50% of pollution", "They sit parked roughly 95% of their life", "They cost more than public transport", "They carry on average three people"], "correct": 1},
    {"question": "What consistent findings does research show about green spaces?", "options": ["They increase property prices", "They reduce mental health problems and lower crime", "They attract more tourists", "They reduce traffic congestion"], "correct": 1},
    {"question": "According to the speaker, what is described as ''the first casualty of development''?", "options": ["Public transport", "Affordable housing", "Green space", "Schools"], "correct": 2},
    {"question": "What does the speaker argue the best cities will do?", "options": ["Solve each technical problem separately", "Focus only on transport", "Treat challenges as interconnected aspects of quality of life", "Prioritise economic growth above all"], "correct": 2}
  ]'::jsonb
),

-- ── B2 · Mindfulness and Mental Health ──────────────────────
(
  'Mindfulness and Mental Health',
  '',
  $tr$
[A podcast interview with a psychologist]

Host: Welcome back to the podcast. Today I'm joined by Dr. Amelia Chen, a clinical psychologist who has been researching mindfulness-based interventions for the past decade. Dr. Chen, thank you for being here.

Dr. Chen: Thank you for having me. It's a topic I'm very passionate about.

Host: Let's start with the basics. What exactly do we mean when we talk about mindfulness?

Dr. Chen: At its simplest, mindfulness means deliberately paying attention to the present moment — what you're sensing, feeling, and thinking — without judging it. It sounds straightforward, but our minds are remarkably poor at actually doing this. We tend to spend most of our time either ruminating about the past or anxiously anticipating the future.

Host: And why is that a problem?

Dr. Chen: Well, this tendency is strongly associated with both anxiety and depression. When we're caught in loops of negative thought, we're rarely present. Mindfulness interrupts that cycle. There's now substantial evidence — from randomised controlled trials — that mindfulness-based cognitive therapy can be as effective as antidepressants for preventing relapse in people with recurrent depression.

Host: That's remarkable. Is mindfulness suitable for everyone?

Dr. Chen: It helps the vast majority of people. However, I do want to caution against seeing it as a universal cure. For people with certain trauma histories or psychotic disorders, some mindfulness practices can actually be destabilising. It's important to work with a qualified practitioner if there are underlying conditions.

Host: What's the most common mistake people make when starting out?

Dr. Chen: Expecting it to feel relaxing immediately. Mindfulness is actually a practice of noticing — and noticing can be uncomfortable at first. People often feel more anxious before they feel better because they're finally paying attention to thoughts they've been avoiding. That's completely normal, and with practice, it gets easier.

Host: Any advice for someone who wants to start?

Dr. Chen: Start small. Five minutes a day is genuinely enough to begin. And consistency matters far more than duration. Meditating for five minutes every day will do more than a two-hour session once a week.
$tr$,
  'B2',
  'Ежедневие',
  234,
  '[
    {"question": "How long has Dr. Chen been researching mindfulness?", "options": ["Five years", "Seven years", "Ten years", "Fifteen years"], "correct": 2},
    {"question": "According to Dr. Chen, how do minds tend to spend most of their time?", "options": ["Focused on the present moment", "Ruminating about the past or anticipating the future", "Problem-solving", "Being creative"], "correct": 1},
    {"question": "What does Dr. Chen say about mindfulness-based cognitive therapy?", "options": ["It is better than all other therapies", "It can be as effective as antidepressants for preventing relapse", "It works only for anxiety, not depression", "It requires daily sessions with a therapist"], "correct": 1},
    {"question": "Why might mindfulness be unsuitable for some people?", "options": ["It is too expensive", "It takes too long to learn", "Certain trauma histories or psychotic disorders may make it destabilising", "It requires special equipment"], "correct": 2},
    {"question": "What does Dr. Chen recommend for beginners?", "options": ["One hour sessions twice a week", "Long weekend retreats", "Five minutes daily, prioritising consistency", "Group meditation classes only"], "correct": 2}
  ]'::jsonb
);
