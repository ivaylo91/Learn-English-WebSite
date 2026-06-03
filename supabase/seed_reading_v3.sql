-- ============================================================
-- seed_reading_v3.sql — 8 texts at B2 (4) and C1 (4)
-- Topics: urban architecture, memory, media literacy, future of work (B2)
--         philosophy of time, colonialism, moral philosophy,
--         neuroscience of creativity (C1)
-- Run AFTER seed_reading_extended.sql
-- ============================================================

INSERT INTO public.reading_texts
  (slug, title, body_md, level, topic, reading_time_minutes, vocabulary, questions)
VALUES

-- ── B2 · Urban Architecture and Human Behaviour ──────────────────────────────
(
  'urban-architecture-and-behaviour',
  'Urban Architecture and Human Behaviour',
  $md$
The city shapes us as much as we shape the city. A growing field of research known as **environmental psychology** examines how the built environment — the buildings, streets, parks, and open spaces that surround us — affects our mood, behaviour, and mental wellbeing.

## The Stress of the City

High-rise **residential** blocks, loud traffic, and a lack of green space have been linked to elevated levels of stress and anxiety. Studies conducted in dense urban environments show that city-dwellers have higher rates of certain mental health conditions than their rural counterparts. Researchers **attribute** this in part to the overstimulation that city life involves — too much noise, too much visual **complexity**, and too little privacy.

## The Power of Green Space

The antidote, many experts argue, lies in design. Cities that **incorporate** parks, trees, and natural water features into their **infrastructure** consistently show better public health outcomes. Even a ten-minute walk through a park has been shown to lower cortisol levels and improve mood. This principle has given rise to a design philosophy called **biophilic** design, which seeks to bring elements of nature into urban and interior spaces — living walls, roof gardens, natural materials, and plentiful natural light.

## Architecture and Social Behaviour

The physical layout of a neighbourhood also influences how people **interact**. Wide, walkable streets with shops at ground level encourage people to stop, linger, and talk. Gated communities and superblocks, on the other hand, reduce **spontaneous** social interaction and can increase loneliness. Jane Jacobs, the influential urban theorist, called this the difference between "eyes on the street" and **isolation**.

## The Future of Liveable Cities

Forward-thinking cities around the world are taking these lessons seriously. Urban planners are now designing **mixed-use** developments that combine housing, work, retail, and green space within walking distance of each other. The goal is not just efficiency, but **vitality** — cities where people genuinely want to spend time.
$md$,
  'B2', 'Ежедневие', 6,
  '[
    {"en": "environmental psychology", "bg": "екологична психология"},
    {"en": "residential",    "bg": "жилищен"},
    {"en": "attribute",      "bg": "приписвам / отдавам на"},
    {"en": "complexity",     "bg": "сложност"},
    {"en": "incorporate",    "bg": "включвам / интегрирам"},
    {"en": "infrastructure", "bg": "инфраструктура"},
    {"en": "biophilic",      "bg": "биофилен (обичащ природата)"},
    {"en": "interact",       "bg": "взаимодействам"},
    {"en": "spontaneous",    "bg": "спонтанен"},
    {"en": "isolation",      "bg": "изолация"},
    {"en": "mixed-use",      "bg": "смесено предназначение"},
    {"en": "vitality",       "bg": "жизненост / оживление"}
  ]'::jsonb,
  '[
    {"question": "What does environmental psychology study?", "options": ["How cities generate income", "How the built environment affects mood and wellbeing", "How people design buildings", "How plants grow in cities"], "correct": 1},
    {"question": "What do studies show about city-dwellers compared to rural populations?", "options": ["They are physically healthier", "They have lower stress levels", "They have higher rates of certain mental health conditions", "They earn more money"], "correct": 2},
    {"question": "What is biophilic design?", "options": ["Using only recycled materials", "Designing cities without cars", "Bringing elements of nature into built spaces", "Building taller, greener skyscrapers"], "correct": 2},
    {"question": "According to Jane Jacobs, what do wide walkable streets create?", "options": ["Higher property prices", "More traffic", "Spontaneous social interaction", "Better public transport"], "correct": 2},
    {"question": "What is the goal of mixed-use developments according to the text?", "options": ["Lower construction costs", "Greater efficiency and vitality", "Faster commuting times", "More commercial space"], "correct": 1}
  ]'::jsonb
),

-- ── B2 · The Science of Memory ───────────────────────────────────────────────
(
  'the-science-of-memory',
  'The Science of Memory',
  $md$
Memory is not a video recording. It is a **reconstructive** process — an active, often imperfect reconstruction of the past that is shaped by our beliefs, emotions, and subsequent experiences. Understanding how memory actually works has important implications for education, law, and everyday life.

## How Memories Are Formed

When we experience something, information travels through the brain and, if it is **deemed** significant, is **encoded** into long-term memory. This process depends on the **hippocampus**, a small, seahorse-shaped structure deep in the brain that acts as a temporary relay station. During sleep, the brain **consolidates** memories — replaying and strengthening neural connections.

## The Forgetting Curve

The German psychologist Hermann Ebbinghaus demonstrated in the 1880s that we forget most new information within days unless we actively review it. He called this the **forgetting curve**. The good news is that reviewing material at **spaced intervals** — a technique now known as spaced repetition — dramatically slows forgetting. Each time we retrieve a memory, we make it stronger and more **durable**.

## False Memories

Perhaps the most unsettling finding in memory science is how easily **false memories** can be created. Research by psychologist Elizabeth Loftus showed that simply asking leading questions can cause people to remember events that never happened. Eyewitness **testimony**, once considered highly reliable in legal proceedings, has been **implicated** in hundreds of wrongful convictions.

## Practical Implications

These findings suggest that learning strategies matter enormously. Passive re-reading is far less effective than **active recall** — testing yourself on material you have studied. **Elaborative interrogation** (asking "why is this true?") and connecting new information to existing knowledge also improve long-term **retention** significantly.
$md$,
  'B2', 'Наука', 6,
  '[
    {"en": "reconstructive",  "bg": "реконструктивен"},
    {"en": "deemed",          "bg": "считан за / смятан"},
    {"en": "encoded",         "bg": "кодиран / запаметен"},
    {"en": "hippocampus",     "bg": "хипокампус"},
    {"en": "consolidates",    "bg": "консолидира / укрепва"},
    {"en": "forgetting curve","bg": "крива на забравянето"},
    {"en": "spaced intervals","bg": "разпределени интервали"},
    {"en": "durable",         "bg": "траен / устойчив"},
    {"en": "false memories",  "bg": "фалшиви спомени"},
    {"en": "testimony",       "bg": "свидетелски показания"},
    {"en": "implicated",      "bg": "замесен / свързан"},
    {"en": "active recall",   "bg": "активно припомняне"},
    {"en": "retention",       "bg": "запомняне / задържане в паметта"}
  ]'::jsonb,
  '[
    {"question": "How does the text describe memory?", "options": ["A perfect video recording of events", "A passive storage system", "A reconstructive, often imperfect process", "An automatic download of experiences"], "correct": 2},
    {"question": "What role does the hippocampus play?", "options": ["It creates emotions", "It controls movement", "It acts as a relay for encoding long-term memory", "It stores all long-term memories permanently"], "correct": 2},
    {"question": "What did Ebbinghaus''s forgetting curve demonstrate?", "options": ["That we forget everything instantly", "That most information is forgotten within days without review", "That sleep improves memory permanently", "That memories strengthen automatically over time"], "correct": 1},
    {"question": "What did Elizabeth Loftus''s research show?", "options": ["That eyewitness testimony is always reliable", "That sleep deprivation destroys memory", "That leading questions can create false memories", "That memory improves with age"], "correct": 2},
    {"question": "According to the text, which learning strategy is most effective?", "options": ["Re-reading material multiple times", "Listening to lectures repeatedly", "Active recall — testing yourself on material", "Highlighting key sentences"], "correct": 2}
  ]'::jsonb
),

-- ── B2 · Media Literacy in the Digital Age ───────────────────────────────────
(
  'media-literacy-digital-age',
  'Media Literacy in the Digital Age',
  $md$
In an era of **information overload**, the ability to evaluate sources critically has become one of the most important skills a person can develop. Yet research consistently shows that most people — including highly educated adults — struggle to distinguish **credible** information from **misinformation**.

## The Scale of the Problem

False stories spread faster on social media than true ones, according to a landmark study from MIT. The reason, researchers found, is that **misinformation** tends to be more **novel** and emotionally engaging than factual reporting. Our brains are wired to pay attention to the surprising and the threatening — a tendency that bad actors deliberately **exploit**.

Compounding the problem are **algorithms** that personalise our news feeds based on our past behaviour. Over time, these create what researchers call a **filter bubble** — a digital environment in which we are shown content that **reinforces** our existing beliefs while filtering out **contradictory** views.

## How to Evaluate Sources

Media literacy researchers recommend a set of practical techniques. **Lateral reading** — opening multiple browser tabs to check what others say about a source — is far more effective than reading deeply within a single source. Checking the **date**, the **author's credentials**, and the organisation that publishes the content are basic but essential steps.

The **SIFT** method — Stop, Investigate the source, Find better coverage, Trace claims — provides a structured approach to evaluating any piece of content. Studies show that people who use these techniques are significantly better at **detecting** misleading content.

## The Broader Challenge

Media literacy is not just a personal skill but a social **imperative**. Democracies function best when citizens can engage with accurate information. As synthetic media — including AI-generated text and images — becomes more sophisticated, the challenge of maintaining an informed public will only **intensify**.
$md$,
  'B2', 'Медии', 6,
  '[
    {"en": "information overload", "bg": "информационно претоварване"},
    {"en": "credible",      "bg": "достоверен / надежден"},
    {"en": "misinformation","bg": "дезинформация"},
    {"en": "novel",         "bg": "нов / необичаен"},
    {"en": "exploit",       "bg": "използвам / злоупотребявам с"},
    {"en": "algorithms",    "bg": "алгоритми"},
    {"en": "filter bubble", "bg": "информационен балон"},
    {"en": "reinforces",    "bg": "укрепва / потвърждава"},
    {"en": "contradictory", "bg": "противоречив"},
    {"en": "lateral reading","bg": "странично четене (проверка в други източници)"},
    {"en": "detecting",     "bg": "разкривам / установявам"},
    {"en": "imperative",    "bg": "задължителен / наложителен"},
    {"en": "intensify",     "bg": "засилвам се / задълбочавам се"}
  ]'::jsonb,
  '[
    {"question": "Why does misinformation spread faster than true stories, according to the MIT study?", "options": ["It is easier to understand", "It is more novel and emotionally engaging", "It comes from more reliable sources", "Social media algorithms prefer accurate content"], "correct": 1},
    {"question": "What is a filter bubble?", "options": ["A spam filter for email", "A tool for fact-checking", "A digital environment that reinforces existing beliefs", "A type of social media platform"], "correct": 2},
    {"question": "What does lateral reading involve?", "options": ["Reading the same article multiple times", "Checking multiple sources about the original source", "Reading between the lines for hidden meaning", "Following links within an article"], "correct": 1},
    {"question": "What does SIFT stand for?", "options": ["Search, Inquire, Find, Test", "Stop, Investigate, Find, Trace", "Share, Inform, Filter, Translate", "Sort, Identify, Follow, Tag"], "correct": 1},
    {"question": "According to the final paragraph, why is media literacy a social imperative?", "options": ["It helps people earn more money", "It reduces internet usage", "Democracies need citizens who can engage with accurate information", "It improves social media algorithms"], "correct": 2}
  ]'::jsonb
),

-- ── B2 · The Future of Work ───────────────────────────────────────────────────
(
  'the-future-of-work',
  'The Future of Work',
  $md$
The world of work is undergoing its most significant **transformation** since the Industrial Revolution. Advances in artificial intelligence, robotics, and **automation** are reshaping which tasks humans perform and which are delegated to machines. Understanding this shift is essential for anyone planning a career in the decades ahead.

## What Automation Is Doing

Contrary to early fears, automation has not simply **eliminated** jobs en masse. Instead, it has transformed them. Roles that involve **repetitive**, rule-based tasks — data entry, basic analysis, routine customer service — are being automated or reduced. Meanwhile, jobs that require **creativity**, **empathy**, complex problem-solving, or physical **dexterity** in unpredictable environments remain stubbornly difficult to automate.

The pattern economists describe is one of **polarisation**: automation eliminates many middle-skill jobs while demand grows at both the top (highly skilled professionals) and the bottom (personal service workers) of the labour market.

## The Rise of New Work Patterns

Beyond automation, two further trends are reshaping work. The first is the rise of **remote and hybrid work** — accelerated by the COVID-19 pandemic — which has decoupled employment from geography for many **knowledge workers**. The second is the growth of the **gig economy**, in which workers take on short-term contracts rather than permanent positions, trading job security for flexibility.

## Skills That Will Matter

Researchers consistently highlight a cluster of skills that are likely to **retain** their value in an automated world: **critical thinking**, communication, **adaptability**, and the ability to work alongside — and understand the limitations of — AI systems. **Lifelong learning** is no longer just a phrase but a practical necessity.
$md$,
  'B2', 'Бизнес', 6,
  '[
    {"en": "transformation",  "bg": "трансформация / преобразуване"},
    {"en": "automation",      "bg": "автоматизация"},
    {"en": "eliminated",      "bg": "елиминиран / унищожен"},
    {"en": "repetitive",      "bg": "повтарящ се"},
    {"en": "empathy",         "bg": "емпатия"},
    {"en": "dexterity",       "bg": "сръчност / умение"},
    {"en": "polarisation",    "bg": "поляризация"},
    {"en": "remote and hybrid work", "bg": "дистанционна и хибридна работа"},
    {"en": "knowledge workers","bg": "работници на знанието"},
    {"en": "gig economy",     "bg": "икономика на краткосрочните договори"},
    {"en": "critical thinking","bg": "критично мислене"},
    {"en": "adaptability",    "bg": "адаптивност"},
    {"en": "lifelong learning","bg": "учене през целия живот"}
  ]'::jsonb,
  '[
    {"question": "What is the main finding about automation and job elimination?", "options": ["It has eliminated all manual jobs", "It has mainly created new jobs", "It has transformed jobs rather than simply eliminating them en masse", "It has had no effect on employment"], "correct": 2},
    {"question": "Which types of tasks are most vulnerable to automation?", "options": ["Creative and empathy-based tasks", "Physical tasks in unpredictable environments", "Repetitive, rule-based tasks", "Complex problem-solving tasks"], "correct": 2},
    {"question": "What does ''polarisation'' of the labour market mean?", "options": ["Workers moving to different countries", "Growth at the top and bottom but decline in middle-skill jobs", "Equal distribution of wages across all sectors", "Conflict between employers and employees"], "correct": 1},
    {"question": "What is the gig economy?", "options": ["An economy focused on music concerts", "Permanent employment with flexible hours", "Short-term contract work rather than permanent positions", "Government employment programmes"], "correct": 2},
    {"question": "What do researchers say about skills in an automated world?", "options": ["Only technical skills will matter", "Critical thinking and adaptability will retain their value", "Physical skills will become most important", "Academic qualifications will be irrelevant"], "correct": 1}
  ]'::jsonb
),

-- ── C1 · The Philosophy of Time ──────────────────────────────────────────────
(
  'the-philosophy-of-time',
  'The Philosophy of Time',
  $md$
Of all the **metaphysical** puzzles that philosophy has grappled with, time may be the most **elusive**. We experience it constantly — the relentless **passage** from past to future through the paper-thin sliver we call the present — yet its fundamental nature remains deeply contested. Is time a feature of the universe itself, or merely a product of **perception**?

## The Two Great Theories

Western philosophy has long been divided between two broad views. **Presentism** holds that only the present moment is real; the past no longer exists and the future does not yet exist. Against this, **eternalism** (sometimes called the "block universe" theory) holds that all moments of time are equally real — past, present, and future — and that our sense of time "flowing" is a kind of **illusion** created by consciousness.

Einstein's theory of relativity lends some support to eternalism: since the **simultaneity** of two events depends on the observer's **velocity**, there is no single, objective "now" shared by all observers. This leads some physicists to conclude that time as we experience it — moving, directed, with a clear before and after — is a **subjective** construction.

## The Perception of Time

Regardless of its ultimate nature, **subjective** time is undeniably **malleable**. Fear slows it; boredom stretches it; intense focus **compresses** it. Neuroscientists have identified several brain mechanisms involved in time perception, including the basal ganglia and the cerebellum. Interestingly, time is estimated more accurately when we are paying **deliberate** attention to it.

## The Arrow of Time

Perhaps the deepest puzzle is why time has a **direction** at all. The fundamental laws of physics are **symmetric** with respect to time — they work equally well forwards and backwards. Yet we experience a clear **asymmetry**: we remember the past and not the future; causes precede effects; a broken cup never spontaneously reassembles. Physicists **attribute** this arrow of time to the **entropy** of the universe — its **relentless** tendency to move from ordered to disordered states.
$md$,
  'C1', 'Философия', 7,
  '[
    {"en": "metaphysical",  "bg": "метафизичен"},
    {"en": "elusive",       "bg": "неуловим / трудно разбираем"},
    {"en": "passage",       "bg": "преминаване / течение"},
    {"en": "perception",    "bg": "възприятие"},
    {"en": "presentism",    "bg": "презентизъм (само сегашното е реално)"},
    {"en": "eternalism",    "bg": "вечностна теория (всички моменти са реални)"},
    {"en": "illusion",      "bg": "илюзия"},
    {"en": "simultaneity",  "bg": "едновременност"},
    {"en": "velocity",      "bg": "скорост"},
    {"en": "subjective",    "bg": "субективен"},
    {"en": "malleable",     "bg": "пластичен / гъвкав / изменяем"},
    {"en": "compresses",    "bg": "свива / компресира"},
    {"en": "deliberate",    "bg": "съзнателен / умишлен"},
    {"en": "asymmetry",     "bg": "асиметрия"},
    {"en": "entropy",       "bg": "ентропия"},
    {"en": "relentless",    "bg": "неспирен / неумолим"}
  ]'::jsonb,
  '[
    {"question": "What is the key difference between presentism and eternalism?", "options": ["Presentism says only the future is real; eternalism says only the past is", "Presentism says only the present is real; eternalism says all moments are equally real", "Presentism and eternalism are the same theory", "Presentism focuses on physics; eternalism on psychology"], "correct": 1},
    {"question": "How does Einstein''s relativity relate to the philosophy of time?", "options": ["It proves presentism is correct", "It shows simultaneity depends on the observer, supporting eternalism", "It demonstrates that time does not exist", "It shows all moments are in the past"], "correct": 1},
    {"question": "What does the text say about subjective time perception?", "options": ["It is completely accurate", "It is always slower than objective time", "It is malleable — affected by emotion and attention", "It is controlled by the hippocampus"], "correct": 2},
    {"question": "Why do the fundamental laws of physics not explain the arrow of time?", "options": ["They are too complex to understand", "They are symmetric with respect to time — they work forwards and backwards equally", "They only apply to large objects", "They predict that time will stop"], "correct": 1},
    {"question": "To what do physicists attribute the arrow of time?", "options": ["Human consciousness", "The speed of light", "The entropy of the universe", "The rotation of the Earth"], "correct": 2}
  ]'::jsonb
),

-- ── C1 · The Legacy of Colonialism ───────────────────────────────────────────
(
  'the-legacy-of-colonialism',
  'The Long Shadow of Colonialism',
  $md$
The age of European **colonialism** — which reached its peak in the late nineteenth century, when European powers controlled roughly 84% of the globe — officially ended in the mid-twentieth century through a wave of independence movements. Yet its **legacy** continues to shape politics, economics, culture, and **psychology** in ways that are deeply contested and often **underacknowledged**.

## Economic Structures

Many post-colonial states **inherited** economic structures designed not for their own development but for the **extraction** of raw materials to benefit colonial powers. Railroads, for example, were built not to connect cities within a territory but to carry resources from the interior to the coast for export. These **extractive** foundations left many newly independent nations with economies **ill-suited** to self-sufficiency.

The debate over **reparations** — financial compensation paid by former colonial powers to countries and communities they exploited — has intensified in recent years. Supporters argue that the wealth disparities between former colonial powers and their former colonies are **traceable** directly to this history. Opponents contend that **contemporary** governments cannot be held responsible for the actions of their predecessors.

## Cultural and Psychological Dimensions

The **psychiatrist** Frantz Fanon, writing in the 1950s and 60s, argued that colonialism caused deep **psychological** harm not only to the colonised but also to the colonisers. The systematic **devaluation** of indigenous cultures, languages, and knowledge systems created what scholars call **colonial trauma** — a damage to collective identity that **persists** across generations.

## Post-colonial Studies

The academic field of post-colonial studies — developed through the work of scholars such as Edward Said, Homi Bhabha, and Gayatri Chakravorty Spivak — seeks to examine how colonial **ideologies** continue to shape culture, literature, and global power relations today. Its central insight is that **decolonisation** must be not only political and economic but also **epistemological** — a rethinking of whose knowledge, values, and **narratives** count as valid.
$md$,
  'C1', 'История', 7,
  '[
    {"en": "colonialism",       "bg": "колониализъм"},
    {"en": "legacy",            "bg": "наследство / последици"},
    {"en": "underacknowledged", "bg": "недостатъчно признат"},
    {"en": "extraction",        "bg": "добив / извличане"},
    {"en": "extractive",        "bg": "извличащ / ориентиран към добив"},
    {"en": "ill-suited",        "bg": "неподходящ"},
    {"en": "reparations",       "bg": "репарации / обезщетения"},
    {"en": "traceable",         "bg": "проследим"},
    {"en": "contemporary",      "bg": "съвременен"},
    {"en": "psychiatrist",      "bg": "психиатър"},
    {"en": "devaluation",       "bg": "обезценяване"},
    {"en": "colonial trauma",   "bg": "колониална травма"},
    {"en": "persists",          "bg": "продължава / запазва се"},
    {"en": "ideologies",        "bg": "идеологии"},
    {"en": "decolonisation",    "bg": "деколонизация"},
    {"en": "epistemological",   "bg": "епистемологичен (свързан с теорията на познанието)"},
    {"en": "narratives",        "bg": "разкази / наративи"}
  ]'::jsonb,
  '[
    {"question": "What does the text say about the economic structures inherited by post-colonial states?", "options": ["They were designed to promote local development", "They were designed for extraction to benefit colonial powers", "They were entirely dismantled after independence", "They promoted self-sufficiency from the start"], "correct": 1},
    {"question": "What is the debate over reparations about?", "options": ["Whether former colonies should pay debts to colonial powers", "Whether financial compensation should be paid by former colonial powers", "Whether colonial borders should be redrawn", "Whether cultural exchanges should be increased"], "correct": 1},
    {"question": "What did Frantz Fanon argue about colonialism?", "options": ["That it only benefited colonial powers economically", "That it caused deep psychological harm to both the colonised and colonisers", "That it improved standards of living in colonised territories", "That its effects disappeared after independence"], "correct": 1},
    {"question": "What is colonial trauma?", "options": ["Physical injuries from colonial wars", "Damage to collective identity from systematic devaluation of indigenous cultures", "Economic harm from colonial trade policies", "Loss of colonial languages"], "correct": 1},
    {"question": "According to post-colonial studies, what must decolonisation include beyond the political and economic?", "options": ["Military disarmament", "Language unification", "Epistemological rethinking of whose knowledge counts as valid", "Complete isolation from former colonial powers"], "correct": 2}
  ]'::jsonb
),

-- ── C1 · The Trolley Problem and Modern Ethics ───────────────────────────────
(
  'trolley-problem-modern-ethics',
  'The Trolley Problem and Modern Ethics',
  $md$
Imagine a runaway trolley hurtling towards five people tied to the track. You are standing next to a lever. If you pull it, the trolley will be diverted to a side track — but there is one person tied there too. Do you pull the lever, sacrificing one to save five?

This thought experiment — the **trolley problem**, devised by philosopher Philippa Foot and elaborated by Judith Jarvis Thomson — has become one of the most widely discussed dilemmas in **moral philosophy**. Its power lies not in any practical application but in what it **reveals** about the deep structure of our ethical intuitions.

## Two Competing Frameworks

The trolley problem exposes a fundamental conflict between two major ethical frameworks. **Utilitarian** ethics holds that the morally right action is the one that **maximises** overall wellbeing — by this logic, pulling the lever is obviously correct: one death is preferable to five. **Deontological** ethics, associated with Immanuel Kant, holds that certain actions are wrong **intrinsically** — regardless of their consequences. Using a person as a means to an end, even to save others, **violates** their fundamental dignity.

## The Footbridge Variant

Thomson introduced a variant that sharpens the **dilemma**. In the footbridge problem, you are on a bridge above the trolley track. The only way to stop the trolley is to push a large man off the bridge onto the track, using his body to halt it. Most people who would pull the lever refuse to push the man — even though the logic is identical. Psychologists suggest this reflects a deep **aversion** to causing harm through direct physical contact, **regardless** of the outcome.

## Real-World Applications

The trolley problem is no longer purely **hypothetical**. As self-driving cars become widespread, their designers must program ethical decisions into them: if a crash is **inevitable**, should the car prioritise its passengers or pedestrians? As medical triage systems become more automated, who decides which patients **receive** treatment when resources are limited? These are the trolley problems of the twenty-first century, and they demand not just technical but deeply philosophical answers.
$md$,
  'C1', 'Философия', 7,
  '[
    {"en": "trolley problem",   "bg": "проблемът с трамвая (морална дилема)"},
    {"en": "moral philosophy",  "bg": "морална философия / етика"},
    {"en": "reveals",           "bg": "разкрива"},
    {"en": "utilitarian",       "bg": "утилитарен"},
    {"en": "maximises",         "bg": "максимизира"},
    {"en": "deontological",     "bg": "деонтологичен (основан на дълг и правила)"},
    {"en": "intrinsically",     "bg": "по своята същност / вътрешно"},
    {"en": "violates",          "bg": "нарушава / накърнява"},
    {"en": "dilemma",           "bg": "дилема"},
    {"en": "aversion",          "bg": "отвращение / нежелание"},
    {"en": "regardless",        "bg": "независимо от"},
    {"en": "hypothetical",      "bg": "хипотетичен"},
    {"en": "inevitable",        "bg": "неизбежен"},
    {"en": "triage",            "bg": "триаж (медицинска сортировка)"}
  ]'::jsonb,
  '[
    {"question": "What does the trolley problem reveal, according to the text?", "options": ["How to design safer transport systems", "The deep structure of our ethical intuitions", "That mathematics can solve moral problems", "How people behave in emergencies"], "correct": 1},
    {"question": "According to utilitarian ethics, what should you do in the trolley problem?", "options": ["Do nothing to avoid responsibility", "Pull the lever to save five people", "Refuse to make a decision", "Always protect the nearest person"], "correct": 1},
    {"question": "What does deontological ethics say about pulling the lever?", "options": ["It is always the right choice", "It violates the dignity of the person on the side track", "It depends on who the people are", "It is irrelevant whether you pull the lever"], "correct": 1},
    {"question": "Why do most people refuse to push the man off the footbridge even though the logic is the same as pulling the lever?", "options": ["They fear legal consequences", "They have a deep aversion to causing harm through direct physical contact", "They do not understand the mathematical outcome", "They are too far away to act"], "correct": 1},
    {"question": "How does the text connect the trolley problem to real-world issues?", "options": ["It argues that trolleys should be banned", "It links it to programming ethical decisions into self-driving cars and medical triage", "It suggests that philosophers should design transport systems", "It claims that the problem has already been solved"], "correct": 1}
  ]'::jsonb
),

-- ── C1 · The Neuroscience of Creativity ──────────────────────────────────────
(
  'neuroscience-of-creativity',
  'The Neuroscience of Creativity',
  $md$
For centuries, creativity was thought to be a gift — a mysterious **divine** spark granted to a fortunate few. Today, neuroscience is revealing something far more **egalitarian**: creativity is a **capacity** of the human brain that can be understood, nurtured, and to some degree deliberately **cultivated**.

## The Default Mode Network

At the heart of the neuroscience of creativity is a brain network called the **default mode network** (DMN) — a set of interconnected brain regions that become active when we are not focused on an external task. Originally dismissed as "the brain doing nothing", the DMN is now understood to be essential for **imagination**, daydreaming, and the generation of novel ideas.

Crucially, creativity does not rely on the DMN alone. Researchers have found that highly creative people show unusually strong **co-activation** of three brain networks normally in **opposition**: the DMN, the **executive control network** (which manages focused attention), and the **salience network** (which detects what is relevant and worth attending to). Creative insight may depend on the brain's ability to simultaneously **generate** and **evaluate** new ideas.

## The Role of Incubation

One of the most practically useful findings is the role of **incubation** in creative problem-solving. When we encounter a difficult problem and then step away from it — going for a walk, sleeping, doing something routine — the brain continues to work on the problem **unconsciously**. The sudden insight that follows ("the Eureka moment") is not random; it reflects **background processing** that was occurring all along.

This has been confirmed in studies showing that **divergent thinking** — the ability to generate many different solutions to an open-ended problem — improves after a period of **unrelated** activity. The **counterintuitive** implication is that **unfocused** time is not wasted but may be essential to creative work.

## Fostering Creativity

The emerging picture suggests that creativity can be **enhanced** by several factors: exposure to **diverse** ideas and experiences; environments that support **psychological safety** (the freedom to suggest unusual ideas without **ridicule**); and the cultivation of habits of **curiosity** and **open-mindedness**. Conversely, excessive pressure and rigid **evaluation criteria** can **suppress** it.
$md$,
  'C1', 'Наука', 8,
  '[
    {"en": "divine",                "bg": "божествен"},
    {"en": "egalitarian",           "bg": "егалитарен (еднакъв за всички)"},
    {"en": "capacity",              "bg": "способност / капацитет"},
    {"en": "cultivated",            "bg": "развит / культивиран"},
    {"en": "default mode network",  "bg": "мрежа за пасивен режим (на мозъка)"},
    {"en": "imagination",           "bg": "въображение"},
    {"en": "co-activation",         "bg": "съвместна активация"},
    {"en": "opposition",            "bg": "противопоставяне / опозиция"},
    {"en": "salience network",      "bg": "мрежа за значимост"},
    {"en": "incubation",            "bg": "инкубация (скрито узряване)"},
    {"en": "unconsciously",         "bg": "несъзнателно"},
    {"en": "divergent thinking",    "bg": "дивергентно мислене (генериране на идеи)"},
    {"en": "counterintuitive",      "bg": "противоинтуитивен"},
    {"en": "psychological safety",  "bg": "психологическа безопасност"},
    {"en": "ridicule",              "bg": "присмех / подигравка"},
    {"en": "suppress",              "bg": "потискам / задушавам"},
    {"en": "evaluation criteria",   "bg": "критерии за оценка"}
  ]'::jsonb,
  '[
    {"question": "What does modern neuroscience suggest about creativity?", "options": ["It is a divine gift given to a few people", "It is a brain capacity that can be understood and developed", "It only exists in artistic people", "It decreases with education"], "correct": 1},
    {"question": "What was the default mode network originally thought to be?", "options": ["The centre of rational thinking", "The source of all emotions", "The brain doing nothing — later found to be essential for imagination", "The network controlling memory"], "correct": 2},
    {"question": "What distinguishes highly creative people''s brain activity?", "options": ["They use only the right hemisphere", "They show strong co-activation of three normally opposing networks", "Their brains work more slowly", "They have more grey matter"], "correct": 1},
    {"question": "What does incubation mean in the context of creativity?", "options": ["Keeping ideas secret until they are ready", "The brain continuing to work on a problem unconsciously during a break", "Memorising solutions to problems", "Deliberate brainstorming sessions"], "correct": 1},
    {"question": "According to the text, what suppresses creativity?", "options": ["Exposure to diverse ideas", "Psychological safety", "Excessive pressure and rigid evaluation criteria", "Open-mindedness and curiosity"], "correct": 2}
  ]'::jsonb
);
