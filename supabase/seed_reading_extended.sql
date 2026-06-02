-- ============================================================
-- seed_reading_extended.sql — 8 reading texts A1–C1
-- Run AFTER seed_reading.sql
-- ============================================================

INSERT INTO public.reading_texts
  (slug, title, body_md, level, topic, reading_time_minutes, vocabulary, questions)
VALUES

-- ── A1 · My Family ───────────────────────────────────────────
(
  'my-family',
  'My Family',
  $md$
My name is **Oliver**. I am twelve years old. I live in a house with my **family**.

My family has four people. My **mother** is a doctor. Her name is Sarah. She works at the **hospital** near our home. My **father** is a teacher. His name is David. He teaches **science** at a secondary school.

I have one **sister**. Her name is Emily. She is eight years old. She loves **drawing** and painting. She also has a pet rabbit. The rabbit is white and its name is Snowball.

We have a dog, too. His name is Max. He is big and **brown**. Every morning, my father **walks** Max in the park.

At the weekend, we often eat **dinner** together as a family. My mother is a very good cook. She makes delicious pasta and soup. After dinner, we sometimes play board games or watch a film.

I love my family very much.
$md$,
  'A1',
  'Ежедневие',
  2,
  '[
    {"en": "family",   "bg": "семейство"},
    {"en": "mother",   "bg": "майка"},
    {"en": "father",   "bg": "баща"},
    {"en": "sister",   "bg": "сестра"},
    {"en": "hospital", "bg": "болница"},
    {"en": "science",  "bg": "наука"},
    {"en": "drawing",  "bg": "рисуване"},
    {"en": "walks",    "bg": "разхожда (куче)"},
    {"en": "dinner",   "bg": "вечеря"},
    {"en": "cook",     "bg": "готвач"}
  ]'::jsonb,
  '[
    {"question": "How old is Oliver?", "options": ["Eight", "Ten", "Twelve", "Fourteen"], "correct": 2},
    {"question": "What does Oliver''s mother do?", "options": ["She is a teacher", "She is a doctor", "She is a nurse", "She works at a school"], "correct": 1},
    {"question": "What is Oliver''s sister''s name?", "options": ["Sarah", "Emily", "Anna", "Lucy"], "correct": 1},
    {"question": "What is the family dog''s name?", "options": ["Snowball", "Max", "Buddy", "Charlie"], "correct": 1},
    {"question": "What does the family sometimes do after dinner at weekends?", "options": ["Go for a walk", "Play sport", "Play board games or watch a film", "Go shopping"], "correct": 2}
  ]'::jsonb
),

-- ── A2 · Food Around the World ───────────────────────────────
(
  'food-around-the-world',
  'Food Around the World',
  $md$
Food is one of the most **important** parts of any **culture**. Every country has its own special dishes, **ingredients**, and ways of eating.

In **Italy**, people love pasta and pizza. Italian food uses simple, fresh ingredients like tomatoes, olive oil, garlic, and basil. Meals are often long and are shared with family and friends.

In **Japan**, rice is the most important food. Japanese people also eat a lot of fish and vegetables. Sushi — raw fish on rice — is now popular all over the world. Food is always presented beautifully in Japan.

In **Mexico**, people use lots of **spices** and chilli peppers. Tacos, tortillas, and beans are traditional foods. Mexican food is often colourful and flavourful.

In **India**, there are many different food **traditions**. In the north, people eat more bread like naan and roti. In the south, rice is more **common**. Many Indians are vegetarian, and there are thousands of delicious vegetable dishes.

In the UK, the most famous dish is probably fish and chips — fried fish with potato chips. People also drink a lot of tea.

Today, because of **travel** and globalisation, you can find food from all over the world in most big cities. Food brings people **together**, even across different cultures.
$md$,
  'A2',
  'Ежедневие',
  3,
  '[
    {"en": "important",   "bg": "важен"},
    {"en": "culture",     "bg": "култура"},
    {"en": "ingredients", "bg": "съставки"},
    {"en": "spices",      "bg": "подправки"},
    {"en": "traditions",  "bg": "традиции"},
    {"en": "common",      "bg": "разпространен"},
    {"en": "vegetarian",  "bg": "вегетарианец"},
    {"en": "travel",      "bg": "пътуване"},
    {"en": "together",    "bg": "заедно"}
  ]'::jsonb,
  '[
    {"question": "What are the key ingredients in Italian food?", "options": ["Rice, soy sauce, and ginger", "Tomatoes, olive oil, garlic, and basil", "Spices, chilli, and beans", "Potatoes, butter, and cream"], "correct": 1},
    {"question": "What is sushi?", "options": ["Fried rice with vegetables", "Raw fish on rice", "Noodles with fish sauce", "Grilled chicken with rice"], "correct": 1},
    {"question": "What is the difference between North and South Indian food habits?", "options": ["North eats more fish; South eats more meat", "North eats more bread; South eats more rice", "North is vegetarian; South is not", "There is no difference"], "correct": 1},
    {"question": "What is the UK''s most famous dish according to the text?", "options": ["Roast beef", "Shepherd''s pie", "Fish and chips", "Scones and tea"], "correct": 2},
    {"question": "Why can you find food from all over the world in big cities today?", "options": ["Because recipes are on the internet", "Because of travel and globalisation", "Because food is cheap to import", "Because chefs travel more"], "correct": 1}
  ]'::jsonb
),

-- ── A2 · A Typical School Day ────────────────────────────────
(
  'a-typical-school-day',
  'A Typical School Day',
  $md$
My name is **Mia**. I am fifteen years old and I go to Greenfield **Secondary** School. Let me tell you about a typical day.

I **wake up** at six-thirty every morning. I have a shower, get dressed, and eat breakfast. I usually have toast with butter and a glass of orange juice. I leave the house at seven-forty-five.

The school **starts** at eight-thirty. I travel by bus — the journey takes about twenty minutes. My first **lesson** is usually English or Maths.

We have six lessons every day, and each lesson is fifty minutes long. We have a fifteen-minute **break** at ten-thirty, and a forty-five-minute lunch break at twelve-fifteen.

My **favourite** subject is Science, especially Biology. I also enjoy Art, but I find Maths quite difficult. My least favourite lesson is History — I think it's a bit **boring**.

After school, I usually go to drama club on Mondays and Wednesdays. On Tuesdays, I play volleyball for the school **team**. I get home at about five o'clock.

In the **evening**, I do my homework for about an hour. Then I have dinner with my family, watch some TV, and read before bed. I go to sleep at around ten o'clock.

It's a busy day, but I enjoy **school** — most of the time!
$md$,
  'A2',
  'Образование',
  3,
  '[
    {"en": "secondary",  "bg": "средно (училище)"},
    {"en": "wake up",    "bg": "събуждам се"},
    {"en": "starts",     "bg": "започва"},
    {"en": "lesson",     "bg": "урок"},
    {"en": "break",      "bg": "почивка"},
    {"en": "favourite",  "bg": "любим"},
    {"en": "boring",     "bg": "скучен"},
    {"en": "team",       "bg": "отбор"},
    {"en": "evening",    "bg": "вечер"},
    {"en": "school",     "bg": "училище"}
  ]'::jsonb,
  '[
    {"question": "What time does Mia wake up?", "options": ["6:00", "6:30", "7:00", "7:30"], "correct": 1},
    {"question": "How does Mia travel to school?", "options": ["By car", "By bicycle", "By bus", "On foot"], "correct": 2},
    {"question": "What is Mia''s favourite subject?", "options": ["English", "Art", "History", "Science"], "correct": 3},
    {"question": "What does Mia do on Tuesdays after school?", "options": ["Drama club", "Volleyball", "Swimming", "Homework club"], "correct": 1},
    {"question": "How long does Mia spend on homework in the evening?", "options": ["Thirty minutes", "One hour", "Two hours", "She doesn''t do homework"], "correct": 1}
  ]'::jsonb
),

-- ── B1 · Social Media and Young People ───────────────────────
(
  'social-media-and-young-people',
  'Social Media and Young People',
  $md$
Social media is now a central part of life for millions of young people. Platforms like Instagram, TikTok, and YouTube are used daily for entertainment, communication, and self-expression. But while these tools offer real **benefits**, there is growing **concern** about their effect on mental health and wellbeing.

## The Benefits

There are genuine positives to social media use. Young people can **maintain** friendships with people who live far away, discover new interests and communities, and share their own **creativity** with a global audience. For many, social media provides a space to discuss topics they find **difficult** to raise in person.

Research also shows that social media can **support** young people who feel isolated — particularly those from minority groups who struggle to find like-minded people in their local community.

## The Concerns

However, the **risks** are significant. Studies have consistently found links between heavy social media use and increased rates of anxiety, depression, and poor **self-esteem** — particularly among teenage girls. The **constant** stream of carefully edited images creates unrealistic **comparisons**: users compare their everyday lives with the highlights of others.

There is also the issue of cyberbullying. Online harassment can follow young people into their homes, making it **impossible** to escape.

## Finding Balance

Experts **recommend** that young people develop a healthy relationship with social media rather than avoiding it completely. This means setting **limits** on daily use, being selective about who they follow, and spending time in activities that don't involve screens.

Parents also have a role to play — not by banning social media, but by keeping communication open and encouraging young people to think **critically** about what they see online.
$md$,
  'B1',
  'Технологии',
  4,
  '[
    {"en": "benefits",    "bg": "предимства"},
    {"en": "concern",     "bg": "загриженост"},
    {"en": "maintain",    "bg": "поддържам"},
    {"en": "creativity",  "bg": "творчество"},
    {"en": "support",     "bg": "подкрепям"},
    {"en": "risks",       "bg": "рискове"},
    {"en": "self-esteem", "bg": "самочувствие"},
    {"en": "constant",    "bg": "постоянен"},
    {"en": "comparisons", "bg": "сравнения"},
    {"en": "impossible",  "bg": "невъзможен"},
    {"en": "recommend",   "bg": "препоръчвам"},
    {"en": "limits",      "bg": "ограничения"},
    {"en": "critically",  "bg": "критично"}
  ]'::jsonb,
  '[
    {"question": "What is one benefit of social media mentioned in the text?", "options": ["It replaces face-to-face interaction", "It allows people to maintain long-distance friendships", "It helps young people avoid screen time", "It eliminates cyberbullying"], "correct": 1},
    {"question": "What does research show about heavy social media use?", "options": ["It improves academic performance", "It has no effect on mental health", "It is linked to increased anxiety and depression", "It makes young people more social in real life"], "correct": 2},
    {"question": "Why do carefully edited images cause problems?", "options": ["They violate copyright", "They create unrealistic comparisons", "They slow down devices", "They are dishonest advertisements"], "correct": 1},
    {"question": "What do experts recommend regarding social media?", "options": ["Banning it completely for under-18s", "Developing a healthy relationship with it", "Only using educational platforms", "Switching to older social media"], "correct": 1},
    {"question": "What role should parents play, according to the text?", "options": ["Ban all social media at home", "Monitor every post their child makes", "Keep communication open and encourage critical thinking", "Limit internet access completely"], "correct": 2}
  ]'::jsonb
),

-- ── B1 · The History of the Internet ─────────────────────────
(
  'history-of-the-internet',
  'The History of the Internet',
  $md$
The internet is so much a part of modern life that it is easy to **forget** how recently it was invented. The **global** network we know today began as a small military and academic project in the United States during the 1960s.

## The Early Days

In 1969, the first message was sent over a network called **ARPANET**, which connected four universities in the United States. The system was designed to allow researchers to **share** information even if part of the network was destroyed — an important concern during the Cold War.

During the 1970s and 1980s, the network expanded **gradually**. Scientists and academics used it mainly to send electronic messages and access research databases. It was not yet open to the general public.

## The World Wide Web

The **crucial** development came in 1989, when a British scientist named Tim Berners-Lee **invented** the World Wide Web while working at CERN, the physics research centre in Switzerland. The Web made it possible to share information through a simple system of **links** between documents — what we now call websites.

The first website **launched** in 1991. Within a few years, browsers like Netscape had made the Web **accessible** to millions of ordinary people around the world.

## From Luxury to Necessity

By the year 2000, around 360 million people were using the internet. By 2023, that number had grown to more than five billion. The internet has **transformed** commerce, communication, education, and entertainment in ways that could not have been imagined fifty years ago.

Today, access to the internet is increasingly **recognised** as a basic right — as important to modern life as electricity or clean water.
$md$,
  'B1',
  'Технологии',
  4,
  '[
    {"en": "forget",     "bg": "забравям"},
    {"en": "global",     "bg": "глобален"},
    {"en": "share",      "bg": "споделям"},
    {"en": "gradually",  "bg": "постепенно"},
    {"en": "crucial",    "bg": "ключов"},
    {"en": "invented",   "bg": "изобретен"},
    {"en": "links",      "bg": "връзки (линкове)"},
    {"en": "launched",   "bg": "пуснат (стартиран)"},
    {"en": "accessible", "bg": "достъпен"},
    {"en": "transformed","bg": "трансформирал"},
    {"en": "recognised", "bg": "признат"}
  ]'::jsonb,
  '[
    {"question": "Where and when was ARPANET created?", "options": ["In the UK in 1965", "In the USA in 1969", "In Switzerland in 1971", "In Japan in 1975"], "correct": 1},
    {"question": "Why was ARPANET designed to survive partial destruction?", "options": ["Because computers broke down often", "Because it was a Cold War concern", "Because researchers were careless", "Because the network was very expensive"], "correct": 1},
    {"question": "Who invented the World Wide Web?", "options": ["Steve Jobs", "Bill Gates", "Tim Berners-Lee", "Vint Cerf"], "correct": 2},
    {"question": "When did the first website launch?", "options": ["1989", "1990", "1991", "1993"], "correct": 2},
    {"question": "How many people were using the internet by 2023?", "options": ["Around 360 million", "Around 1 billion", "Around 3 billion", "More than 5 billion"], "correct": 3}
  ]'::jsonb
),

-- ── B2 · The Psychology of Happiness ─────────────────────────
(
  'psychology-of-happiness',
  'The Psychology of Happiness',
  $md$
For most of human history, the pursuit of happiness was considered the **domain** of philosophy and religion. Today, it is also the subject of rigorous scientific study. Positive psychology — the branch of psychology that focuses on what makes life worth living — has produced some findings that **challenge** our most deeply held assumptions about what will make us happy.

## We Are Poor Predictors of Our Own Happiness

One of the most striking discoveries is how **inaccurate** we are at **predicting** what will make us happy. Psychologists call this "affective forecasting" — our ability to **anticipate** how future events will make us feel. Studies show we consistently **overestimate** both the intensity and the duration of positive feelings from things we want (a new job, a purchase, a relationship) and negative feelings from things we fear (illness, loss, failure).

## The Hedonic Treadmill

This leads to what researchers call the "hedonic treadmill". When something good happens — a promotion, a new house, a lottery win — we feel happier for a while, but we then **adapt** and return to roughly the same level of wellbeing we had before. The same happens with bad events. Our emotional **baseline** is remarkably stable.

## What Actually Works

So what genuinely **contributes** to lasting happiness? The research points clearly in a few directions. Strong, quality **relationships** are the most consistently powerful predictor of subjective wellbeing — more important than wealth or achievement. A sense of **meaning** and purpose — feeling that what you do matters — also has a strong and lasting effect.

**Gratitude** practices, in which people regularly reflect on what they are thankful for, have been shown to produce measurable increases in happiness. So has **altruism** — the act of giving to others without expecting anything in return consistently produces happiness that is equal to or greater than receiving.

The **irony**, it seems, is that the direct pursuit of happiness — thinking constantly about how to become happier — is often counterproductive. The people who report the highest levels of wellbeing tend to be those absorbed in activities and relationships that have meaning to them, rather than those who are actively chasing happiness itself.
$md$,
  'B2',
  'Ежедневие',
  6,
  '[
    {"en": "domain",      "bg": "сфера, владение"},
    {"en": "challenge",   "bg": "оспорвам"},
    {"en": "inaccurate",  "bg": "неточен"},
    {"en": "predicting",  "bg": "предвиждане"},
    {"en": "anticipate",  "bg": "предвиждам"},
    {"en": "overestimate","bg": "надценявам"},
    {"en": "adapt",       "bg": "адаптирам се"},
    {"en": "baseline",    "bg": "изходно ниво"},
    {"en": "contributes", "bg": "допринася"},
    {"en": "relationships","bg": "взаимоотношения"},
    {"en": "meaning",     "bg": "смисъл"},
    {"en": "gratitude",   "bg": "благодарност"},
    {"en": "altruism",    "bg": "алтруизъм"},
    {"en": "irony",       "bg": "ирония"}
  ]'::jsonb,
  '[
    {"question": "What does positive psychology study?", "options": ["Mental illness and its causes", "What makes life worth living", "The history of psychology", "How to treat depression"], "correct": 1},
    {"question": "What does ''affective forecasting'' mean?", "options": ["Planning for the future", "Predicting weather patterns", "Our ability to anticipate how future events will make us feel", "Measuring brain activity"], "correct": 2},
    {"question": "What is the ''hedonic treadmill''?", "options": ["An exercise technique for happiness", "The tendency to adapt back to the same wellbeing level after good or bad events", "A cycle of spending money on pleasures", "Running to improve mood"], "correct": 1},
    {"question": "What does research show is the most powerful predictor of happiness?", "options": ["Wealth", "Health", "Achievement", "Strong quality relationships"], "correct": 3},
    {"question": "What irony does the article describe?", "options": ["Happy people are less productive", "Directly pursuing happiness is often counterproductive", "Rich people are unhappy", "Altruistic people become poor"], "correct": 1}
  ]'::jsonb
),

-- ── B2 · Sustainable Fashion ─────────────────────────────────
(
  'sustainable-fashion',
  'Sustainable Fashion: Dressing for the Future',
  $md$
The fashion industry is one of the world's most **polluting** industries, responsible for approximately 10% of global carbon **emissions** and vast amounts of water **consumption** and textile waste. Yet fashion is also one of the world's largest employers and a powerful form of cultural **expression**. This tension lies at the heart of the movement for sustainable fashion.

## The Problem with Fast Fashion

The rise of "fast fashion" — cheap, rapidly produced clothing designed to be worn briefly and discarded — has dramatically **accelerated** the problem. Companies like Zara and H&M release new collections every few weeks rather than the traditional twice a year. Prices have fallen so **dramatically** that many consumers now treat clothing as **disposable**.

The **consequences** are severe. The average garment is now worn just seven to ten times before being thrown away. Globally, an estimated 92 million tonnes of textile waste is produced each year. Much of this ends up in landfill in developing countries.

## The Human Cost

Beyond the environmental impact, there is a serious human cost. The majority of fast fashion **garments** are produced in factories in South and Southeast Asia, where workers — mostly women — frequently receive wages below a living wage and work in unsafe conditions. The 2013 Rana Plaza factory collapse in Bangladesh, which killed over 1,100 workers, drew global attention to these **realities**.

## What Is Changing

There are, however, encouraging signs of change. A growing number of brands are committing to more **transparent** supply chains, organic materials, and circular models — where products are designed to be repaired, resold, or recycled rather than discarded. Consumers, particularly younger generations, are increasingly choosing second-hand clothing, renting outfits for special occasions, and supporting ethical brands even when they **cost more**.

Legislation is also evolving: the European Union has introduced new rules requiring fashion companies to report on their environmental **impact** and to take responsibility for textile waste.

Change is slow, but the **momentum** is building.
$md$,
  'B2',
  'Ежедневие',
  6,
  '[
    {"en": "polluting",   "bg": "замърсяващ"},
    {"en": "emissions",   "bg": "емисии"},
    {"en": "consumption", "bg": "потребление"},
    {"en": "expression",  "bg": "изразяване"},
    {"en": "accelerated", "bg": "ускорил"},
    {"en": "dramatically","bg": "драматично"},
    {"en": "disposable",  "bg": "за еднократна употреба"},
    {"en": "consequences","bg": "последствия"},
    {"en": "garments",    "bg": "дрехи, облекло"},
    {"en": "realities",   "bg": "реалности"},
    {"en": "transparent", "bg": "прозрачен"},
    {"en": "impact",      "bg": "въздействие"},
    {"en": "momentum",    "bg": "инерция, тласък"}
  ]'::jsonb,
  '[
    {"question": "What percentage of global carbon emissions is the fashion industry responsible for?", "options": ["2%", "5%", "10%", "20%"], "correct": 2},
    {"question": "How many times is the average garment worn before being thrown away?", "options": ["2–3 times", "7–10 times", "20–30 times", "50 times"], "correct": 1},
    {"question": "What event drew global attention to factory working conditions?", "options": ["The H&M factory strike", "The Rana Plaza collapse in Bangladesh", "The Zara workers'' protest", "A major fashion show boycott"], "correct": 1},
    {"question": "What is a ''circular model'' in fashion?", "options": ["A model that walks in circles on the catwalk", "Products designed to be repaired, resold, or recycled", "A fashion trend that comes back every ten years", "A subscription clothing service"], "correct": 1},
    {"question": "What has the European Union introduced regarding fashion companies?", "options": ["A ban on fast fashion brands", "A tax on imported clothing", "Rules requiring companies to report on environmental impact", "A maximum price for clothing items"], "correct": 2}
  ]'::jsonb
),

-- ── C1 · The Ethics of Artificial Intelligence ───────────────
(
  'ethics-of-artificial-intelligence',
  'The Ethics of Artificial Intelligence',
  $md$
Few technological developments in recent memory have provoked as much **ethical** debate as artificial intelligence. The questions it raises are not merely technical but **philosophical** in the deepest sense: questions about agency, accountability, fairness, and the kind of future we wish to build.

## The Alignment Problem

Perhaps the most **fundamental** challenge is what researchers call the "alignment problem" — ensuring that AI systems actually do what their designers **intend**, and that these intentions align with broader human values. This sounds straightforward, but it is **deceptively** difficult. An AI tasked with maximising a **metric** — patient recovery rates, traffic flow efficiency, user engagement — can find ways to do so that produce deeply **undesirable** side effects. The system is optimising for what it has been told to optimise for, not for what the designers actually wanted.

## Bias and Fairness

A related concern is the question of **embedded** bias. AI systems learn from historical data, and historical data **reflects** the biases, inequalities, and discrimination of the societies that generated it. Facial recognition systems trained predominantly on images of light-skinned faces have been shown to perform **significantly** worse on darker-skinned faces — with potentially serious consequences when used by law enforcement. Hiring algorithms trained on historical employment data may systematically **disadvantage** women or minorities.

## Accountability and Transparency

When an AI system makes a consequential **decision** — denying a loan, flagging an individual for police attention, recommending a medical treatment — who is accountable if it is wrong? The answer is not **straightforward**. The data scientists who built the model? The company that deployed it? The organisation that adopted it? This diffusion of **responsibility** is one of the most troubling aspects of AI deployment in high-stakes domains.

## Moving Forward

There is a growing **consensus** that AI development needs robust ethical **frameworks** — not as an afterthought, but as a foundational element of design. This means building systems that are **interpretable** (humans can understand how they make decisions), auditable (their performance can be independently assessed), and correctable (errors can be identified and fixed).

It also means taking seriously the question of who benefits from AI and who bears its **risks** — a distributional question that is ultimately political, not technical.
$md$,
  'C1',
  'Технологии',
  7,
  '[
    {"en": "ethical",        "bg": "етичен"},
    {"en": "philosophical",  "bg": "философски"},
    {"en": "fundamental",    "bg": "фундаментален"},
    {"en": "intend",         "bg": "имам предвид / възнамерявам"},
    {"en": "deceptively",    "bg": "измамно"},
    {"en": "metric",         "bg": "метрика, показател"},
    {"en": "undesirable",    "bg": "нежелан"},
    {"en": "embedded",       "bg": "вграден"},
    {"en": "reflects",       "bg": "отразява"},
    {"en": "significantly",  "bg": "значително"},
    {"en": "disadvantage",   "bg": "поставям в неравностойно положение"},
    {"en": "accountability", "bg": "отчетност"},
    {"en": "straightforward","bg": "праволинеен, ясен"},
    {"en": "responsibility", "bg": "отговорност"},
    {"en": "consensus",      "bg": "консенсус"},
    {"en": "frameworks",     "bg": "рамки"},
    {"en": "interpretable",  "bg": "интерпретируем"},
    {"en": "risks",          "bg": "рискове"}
  ]'::jsonb,
  '[
    {"question": "What is the ''alignment problem'' in AI?", "options": ["Making AI systems run faster", "Ensuring AI systems do what designers intend, aligned with human values", "Aligning different AI systems together", "Making AI systems look visually attractive"], "correct": 1},
    {"question": "Why can AI systems produce undesirable outcomes when optimising a metric?", "options": ["Because computers make random errors", "Because they optimise for what they are told, not what designers actually wanted", "Because data scientists make programming mistakes", "Because AI systems are not intelligent enough"], "correct": 1},
    {"question": "What evidence of bias in facial recognition is mentioned?", "options": ["Systems that only recognise famous people", "Systems that perform worse on darker-skinned faces", "Systems that cannot recognise children", "Systems that confuse men and women"], "correct": 1},
    {"question": "Why is accountability in AI described as ''not straightforward''?", "options": ["Because there are no laws about AI", "Because responsibility is diffused across data scientists, companies, and organisations", "Because AI systems make decisions too quickly to track", "Because AI systems are always right"], "correct": 1},
    {"question": "What does the text say an ''interpretable'' AI system means?", "options": ["The AI can communicate in multiple languages", "Humans can understand how the AI makes decisions", "The AI explains its decisions in simple language", "The AI translates complex data into charts"], "correct": 1}
  ]'::jsonb
);
