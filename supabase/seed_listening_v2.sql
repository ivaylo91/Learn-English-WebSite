-- ============================================================
-- seed_listening_v2.sql — 6 more listening clips B2–C1
-- Run AFTER seed_listening_extended.sql
-- Replace audio_url values with real Supabase Storage URLs
-- or run scripts/audio/generate_v2.js to produce MP3 files
-- ============================================================

INSERT INTO public.listening_clips
  (title, audio_url, transcript, level, topic, duration_seconds, questions)
VALUES

-- ── B2 · The Social Media Regulation Debate ──────────────────────────────────
(
  'The Social Media Regulation Debate',
  '',
  $tr$
[A podcast discussion between two guests]

Host: Welcome back. Today we're discussing one of the most contentious policy debates of our time: should governments regulate social media platforms more strictly? I have two guests with opposing views. Let's start with the case for regulation.

Policy Expert: Thank you. The case for regulation rests on a simple premise: social media platforms have become critical public infrastructure, yet they operate almost entirely without accountability. When a newspaper publishes false information, it faces legal consequences. When a social media platform amplifies that same information to millions of people through its algorithm, it faces almost none. That asymmetry is not just unfair — it's dangerous.

Tech Advocate: But who decides what counts as harmful? The history of government censorship is not encouraging. Every time authorities have been given the power to restrict speech, that power has been used against minorities, dissidents, and journalists. The cure could be worse than the disease.

Policy Expert: I'm not talking about censorship. I'm talking about transparency and accountability. Require platforms to disclose how their algorithms work. Require them to do independent audits of their impact on mental health. Give users meaningful control over their data. None of that requires governments to decide what speech is acceptable.

Tech Advocate: Those are reasonable proposals, but they come with costs. Compliance burdens favour large incumbents and crush small competitors. The result could be a more concentrated market, which is the opposite of what we want.

Policy Expert: There's something to that concern, but it can be addressed through proportional regulation — stricter requirements for the largest platforms. The status quo, in which a handful of companies shape the information environment of billions without any meaningful oversight, is not acceptable.

Host: A debate we'll be returning to many times, I'm sure. Thank you both.
$tr$,
  'B2',
  'Медии',
  182,
  '[
    {"question": "What asymmetry does the policy expert highlight?", "options": ["Social media is more popular than newspapers", "Newspapers face legal consequences for misinformation but platforms largely do not", "Governments regulate newspapers but not technology companies", "Social media reaches fewer people than traditional media"], "correct": 1},
    {"question": "What is the tech advocate''s main concern about government regulation?", "options": ["It would make social media platforms bankrupt", "It would eliminate all social media platforms", "Government power to restrict speech has historically been misused", "Regulation would increase advertising revenue"], "correct": 2},
    {"question": "What does the policy expert say she is actually advocating for?", "options": ["Government control of content", "Censorship of harmful opinions", "Transparency, accountability, and user control of data", "Shutting down the largest platforms"], "correct": 2},
    {"question": "What risk does the tech advocate identify with compliance requirements?", "options": ["They would make platforms too popular", "They would favour large incumbents and harm small competitors", "They would reduce internet speeds", "They would increase user privacy"], "correct": 1},
    {"question": "What solution does the policy expert propose to address the tech advocate''s concern?", "options": ["Removing all regulations", "Making all platforms the same size", "Proportional regulation — stricter requirements only for the largest platforms", "International regulation by the United Nations"], "correct": 2}
  ]'::jsonb
),

-- ── B2 · Climate Change: The Economics ───────────────────────────────────────
(
  'Climate Change: The Economics',
  '',
  $tr$
[A university lecture excerpt]

Today I want to step back from the science of climate change — which I'll take as established — and look at the economic dimension, because it's at the heart of why progress has been so slow.

The fundamental economic problem with climate change is what economists call an externality. When a factory burns fossil fuels, it produces carbon dioxide. The factory owner pays for the fuel, pays the workers, and sells the product at a price that reflects those costs. But the carbon dioxide released into the atmosphere imposes costs on everyone — higher temperatures, more extreme weather events, rising sea levels — and those costs are not reflected in the price of the product. The factory owner has no financial incentive to reduce emissions, because the damage is paid by society as a whole, not by the producer.

The standard economic solution is to price the externality — to make polluters pay for the damage they cause. This can be done through a carbon tax, which directly sets a price on emissions, or through a cap-and-trade system, which limits total emissions and lets companies buy and sell permits to pollute.

The challenge is political, not technical. Carbon taxes are deeply unpopular because they raise the price of energy, at least in the short term. Voters feel the costs immediately but the benefits — slower climate change — are diffuse, long-term, and globally distributed.

There's also a competitiveness problem. If one country introduces a carbon price and others don't, industries in the regulated country face higher costs than competitors elsewhere. This creates pressure to exempt energy-intensive industries from the carbon price — which, of course, defeats the purpose.

The good news is that the costs of renewable energy have fallen so dramatically in the past decade that the economics of the transition have fundamentally changed. Solar power is now the cheapest source of electricity in history. The question is whether policy can move fast enough to take advantage of that.
$tr$,
  'B2',
  'Екология',
  198,
  '[
    {"question": "What is an externality in the context of climate change?", "options": ["A cost that the producer pays but not the consumer", "A cost imposed on society that is not reflected in the product price", "An international trade agreement on emissions", "A type of renewable energy subsidy"], "correct": 1},
    {"question": "What two policy mechanisms does the lecturer describe for pricing carbon?", "options": ["Solar panels and wind turbines", "Carbon tax and cap-and-trade", "Regulation and subsidies", "Tariffs and quotas"], "correct": 1},
    {"question": "Why are carbon taxes politically unpopular?", "options": ["They are complicated to understand", "They only affect large corporations", "They raise energy prices in the short term while benefits are long-term and diffuse", "They require international agreement"], "correct": 2},
    {"question": "What is the competitiveness problem with carbon pricing?", "options": ["Renewable energy becomes too cheap", "Countries with carbon prices face higher industry costs than those without", "Carbon prices reduce innovation", "Voters don''t understand the economics"], "correct": 1},
    {"question": "What positive development does the lecturer mention?", "options": ["Governments have agreed to a global carbon tax", "Solar power is now the cheapest electricity source in history", "Carbon emissions have stopped rising", "All major economies have introduced carbon prices"], "correct": 1}
  ]'::jsonb
),

-- ── B2 · An Interview on Artificial Intelligence ─────────────────────────────
(
  'An Interview on Artificial Intelligence',
  '',
  $tr$
[A radio interview]

Interviewer: You've been working in AI research for over a decade. What do you think most people misunderstand about AI today?

Researcher: The biggest misunderstanding, I think, is treating AI as a monolithic thing — as if there's one technology called "artificial intelligence" that's either going to save us or destroy us. In reality, AI is a collection of quite different tools and techniques, each suited to different problems, with different strengths and weaknesses.

Interviewer: What are the current limits?

Researcher: Current AI systems are extraordinarily good at pattern recognition — identifying faces, translating languages, generating text that sounds plausible. But they don't understand what they're doing in any meaningful sense. They can produce a convincing essay about a topic they have no actual knowledge of. They can confidently assert things that are completely false. They can't reliably reason about novel situations that fall outside their training data.

Interviewer: What about job displacement? There's a lot of anxiety about automation.

Researcher: There's genuine cause for concern, but the story is more nuanced than "AI will take all the jobs." What we're seeing is that AI excels at automating specific, well-defined tasks within jobs, rather than entire jobs. Radiologists, for example, are not being replaced — but the task of scanning images for specific anomalies is being automated. The job changes, even if it doesn't disappear.

Interviewer: What should ordinary people know about AI?

Researcher: That they're already interacting with it constantly — in the recommendations they receive, the content they see, the decisions made about their credit or insurance. AI literacy — understanding roughly how these systems work, what their biases are, and what they can and can't do — is becoming as important as basic numeracy. We need to invest in it as a society.
$tr$,
  'B2',
  'Технологии',
  192,
  '[
    {"question": "What does the researcher say is the biggest misunderstanding about AI?", "options": ["That it is too expensive to develop", "That it treats AI as one monolithic technology rather than a collection of different tools", "That it will only benefit wealthy countries", "That humans will never understand how it works"], "correct": 1},
    {"question": "What is AI currently very good at?", "options": ["Genuine reasoning about novel situations", "Understanding context and meaning deeply", "Pattern recognition — identifying faces, translating, generating text", "Making ethical decisions"], "correct": 2},
    {"question": "How does the researcher describe AI''s impact on jobs?", "options": ["AI will replace entire professions completely", "AI automates specific tasks within jobs rather than entire jobs", "AI will create more jobs than it destroys", "Only unskilled jobs are at risk"], "correct": 1},
    {"question": "What example does the researcher use to illustrate job change?", "options": ["Truck drivers being replaced by self-driving vehicles", "Radiologists — image scanning tasks being automated but the role remaining", "Teachers being replaced by AI tutors", "Lawyers being replaced by legal AI"], "correct": 1},
    {"question": "What does the researcher compare AI literacy to?", "options": ["Computer programming", "Foreign language skills", "Basic numeracy", "Reading and writing"], "correct": 2}
  ]'::jsonb
),

-- ── C1 · What Can We Know? ────────────────────────────────────────────────────
(
  'What Can We Know?',
  '',
  $tr$
[A philosophy podcast]

Host: Welcome to another episode. Today we're exploring a question that might seem abstract but has surprisingly practical implications: what is knowledge? And how do we know when we have it?

Philosopher: It's a question that has occupied thinkers for millennia, and the answers have been more elusive than you might expect. The standard textbook definition — knowledge is justified true belief — sounds intuitive enough. For me to know something, the belief must be true, I must actually hold it, and I must have good reason to hold it.

Host: That seems reasonable. What's the problem?

Philosopher: In 1963, a philosopher named Edmund Gettier wrote a three-page paper that sent the entire field into turmoil. He showed that you can have a justified true belief that, intuitively, doesn't count as knowledge. The classic example: imagine you look at a clock on the wall that reads 3:15. You believe it is 3:15, and it happens to be exactly 3:15. But the clock stopped twelve hours ago. Your belief is justified — you looked at a clock — and it's true — it is 3:15. But you don't know it. You got lucky.

Host: So justification and truth aren't sufficient?

Philosopher: That's the Gettier problem, and fifty years of philosophy have failed to produce a universally accepted solution. Some philosophers argue we need a fourth condition — that the belief must be reliably connected to the fact that makes it true, not just accidentally.

Host: What are the practical implications of this?

Philosopher: I think they're profound. Consider expert testimony, eyewitness reports, scientific consensus. We rely on these as sources of knowledge constantly. But the conditions under which beliefs are formed matter enormously. A correct belief formed through a faulty process isn't knowledge — even if it happens to be true. That has real consequences for how we should evaluate the sources we trust.
$tr$,
  'C1',
  'Философия',
  196,
  '[
    {"question": "What is the standard textbook definition of knowledge mentioned?", "options": ["A belief supported by authority", "Justified true belief", "Any strongly held opinion", "A belief confirmed by experiment"], "correct": 1},
    {"question": "What did Edmund Gettier demonstrate in his 1963 paper?", "options": ["That knowledge is impossible", "That justified true belief is not always genuine knowledge", "That clocks are unreliable", "That beliefs cannot be justified"], "correct": 1},
    {"question": "In the stopped clock example, why does the person not truly know it is 3:15?", "options": ["Because they misread the clock", "Because the belief is false", "Because they got lucky — the process of forming the belief was faulty", "Because they didn''t check the clock carefully enough"], "correct": 2},
    {"question": "What proposed solution to the Gettier problem is mentioned?", "options": ["Requiring more than one source", "Adding a reliability condition — the belief must connect reliably to the fact", "Eliminating the concept of justification", "Only accepting scientific knowledge"], "correct": 1},
    {"question": "What practical implication does the philosopher draw?", "options": ["We should rely on clocks more carefully", "A correct belief formed through a faulty process is not knowledge — this affects how we evaluate trusted sources", "Scientific consensus is always reliable", "Eyewitness testimony should be banned from courts"], "correct": 1}
  ]'::jsonb
),

-- ── C1 · The Rise and Fall of Rome ───────────────────────────────────────────
(
  'The Rise and Fall of Rome',
  '',
  $tr$
[A documentary narration]

For nearly a thousand years, Rome stood as the dominant power of the Western world. At its height in the second century AD, the empire stretched from the coast of Scotland to the deserts of Mesopotamia, encompassing some seventy million people — roughly a quarter of the world's population. Its roads, aqueducts, legal systems, and written culture would shape Europe for a millennium after its fall.

The question of why Rome fell has never been fully settled. Edward Gibbon, writing in the eighteenth century, blamed Christianity for undermining the martial virtues that had made Rome great. Modern historians have proposed dozens of additional factors: economic disruption caused by reliance on slave labour; the debasement of the currency that triggered inflation; the growing expense of defending an impossibly long border; political instability at the centre, as emperors rose and fell with increasing rapidity.

What seems clear is that decline was gradual, not catastrophic. The traditional date of 476 AD, when the last Western emperor was deposed, has less significance than it once seemed. Power had already been fragmenting for over a century. Provincial governors accumulated more authority; the army became increasingly composed of non-Roman mercenaries whose loyalty was personal rather than institutional; the machinery of central administration began to contract.

The Eastern Empire — Byzantium — did not fall for nearly another thousand years, which tells us that the collapse of the West was not inevitable. It was the product of specific choices, specific pressures, and specific failures of leadership.

And the echoes reach us still. Roman law forms the basis of legal systems across Europe and Latin America. Roman engineering concepts persist in our infrastructure. And the question that haunted Rome — how a large, complex civilisation manages its internal contradictions while defending its peripheries — is one that every empire since has been forced to answer.
$tr$,
  'C1',
  'История',
  210,
  '[
    {"question": "How large was the Roman Empire at its height?", "options": ["About 10% of the world''s population", "Roughly a quarter of the world''s population — around 70 million people", "The entire European continent", "About half the known world''s population"], "correct": 1},
    {"question": "What did Edward Gibbon blame for Rome''s decline?", "options": ["Economic mismanagement", "Military overextension", "Christianity undermining martial virtues", "Barbarian invasions"], "correct": 2},
    {"question": "According to the text, how is Rome''s decline best described?", "options": ["A sudden catastrophic collapse in 476 AD", "A rapid military defeat", "A gradual fragmentation of power over more than a century", "A deliberate decision by Roman leaders to abandon the empire"], "correct": 2},
    {"question": "What does the survival of the Eastern Empire (Byzantium) suggest?", "options": ["That Rome was always destined to survive", "That the West''s collapse was not inevitable but resulted from specific choices and failures", "That Constantinople was a stronger city than Rome", "That Christianity was not a factor in the decline"], "correct": 1},
    {"question": "What does the narrator say still echoes from Rome today?", "options": ["The Latin language is still widely spoken", "Roman military strategy is still used", "Roman law underpins legal systems in Europe and Latin America, and engineering concepts persist", "Roman religious practices continue"], "correct": 2}
  ]'::jsonb
),

-- ── C1 · Behavioural Economics and Decision-Making ───────────────────────────
(
  'Behavioural Economics and Decision-Making',
  '',
  $tr$
[An academic lecture]

Good morning. Today's lecture concerns behavioural economics — a field that emerged from the uncomfortable realisation that the standard economic model of human behaviour is, in important respects, wrong.

Classical economics assumed what it called the rational agent — a person who accurately processes available information and makes decisions that maximise their own wellbeing. This is a useful simplification for many purposes. The problem is that decades of experimental research by psychologists Daniel Kahneman and Amos Tversky, among others, demonstrated that humans systematically deviate from this model in predictable ways.

Kahneman's most influential contribution is his distinction between what he calls System 1 and System 2 thinking. System 1 is fast, intuitive, and largely unconscious. It's how you drive a familiar route home without thinking, how you recognise a face, how you catch a ball. System 2 is slow, deliberate, and effortful. It's what you use when doing a difficult mathematical calculation or learning a new skill. The crucial insight is that we use System 1 far more than we think — even in contexts where careful reasoning would lead to better outcomes.

This explains a wide range of cognitive biases. The anchoring effect: if I show you a number before asking you to estimate something, your estimate will be systematically influenced by that number, even if it's completely irrelevant. Loss aversion: people feel the pain of losing something roughly twice as intensely as the pleasure of gaining something equivalent. Present bias: we consistently overvalue immediate rewards relative to future ones.

The policy applications have been significant. The concept of nudge theory — associated with Thaler and Sunstein — suggests that rather than compelling behaviour through regulation, governments can design choice environments that gently guide people towards better decisions. Automatically enrolling employees in pension schemes rather than requiring them to opt in dramatically increases participation — without removing anyone's freedom to opt out.

The critique, of course, is that nudge theory is paternalistic — that it assumes governments know better than individuals what choices are in their interest. It's a fair challenge, and one that behavioural economists continue to wrestle with.
$tr$,
  'C1',
  'Бизнес',
  228,
  '[
    {"question": "What was the standard economic model''s assumption about human behaviour?", "options": ["People make random decisions", "People maximise social wellbeing rather than personal wellbeing", "People are rational agents who accurately process information to maximise their wellbeing", "People are primarily influenced by emotions"], "correct": 2},
    {"question": "What is System 1 thinking, according to Kahneman?", "options": ["Slow, deliberate, and effortful thinking", "Mathematical and analytical reasoning", "Fast, intuitive, and largely unconscious thinking", "Thinking used only in emergencies"], "correct": 2},
    {"question": "What does loss aversion mean?", "options": ["People avoid all financial risk", "People feel losses approximately twice as intensely as equivalent gains", "People prefer to keep money rather than spend it", "People are afraid of making decisions"], "correct": 1},
    {"question": "What is the key principle of nudge theory?", "options": ["Forcing people to make better decisions through strict laws", "Designing choice environments that guide people towards better decisions without removing freedom", "Educating people about cognitive biases", "Reducing the number of choices available"], "correct": 1},
    {"question": "What is the main criticism of nudge theory mentioned?", "options": ["It is too expensive to implement", "It doesn''t actually change behaviour", "It is paternalistic — it assumes governments know better than individuals", "It only works for financial decisions"], "correct": 2}
  ]'::jsonb
);
