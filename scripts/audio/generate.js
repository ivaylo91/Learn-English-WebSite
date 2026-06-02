#!/usr/bin/env node
/**
 * generate.js — synthesise MP3 audio for all 12 listening clips
 *
 * Uses Google Translate TTS (free, no key needed).
 * Requires: Node.js >= 18 (built-in fetch) + ffmpeg
 *
 * Usage:
 *   node scripts/audio/generate.js
 *
 * Output:
 *   public/audio/<slug>.mp3  for each clip
 *
 * After running, upload the files to Supabase Storage:
 *   Supabase Dashboard → Storage → audio bucket → upload all *.mp3
 *   Then run: node scripts/audio/update-urls.js  <your-supabase-url>
 */

const { execSync } = require('child_process');
const { writeFileSync, mkdirSync, existsSync, unlinkSync, readFileSync } = require('fs');
const https = require('https');
const path  = require('path');

const OUT_DIR   = path.join(__dirname, '../../public/audio');
const TMP_DIR   = '/tmp/tts_chunks';
const TTS_SPEED = '0.85'; // slightly slower — good for learners
const TTS_LANG  = 'en-GB';

mkdirSync(OUT_DIR,  { recursive: true });
mkdirSync(TMP_DIR,  { recursive: true });

// ── Clips ─────────────────────────────────────────────────────────────────────

const CLIPS = [
  {
    slug: 'a-cup-of-coffee',
    transcript: `Good morning! What can I get for you today?
Can I have a coffee, please?
Of course. Would you like a small, medium, or large?
Medium, please. And can I have some milk in it?
Sure. Anything else? We have fresh muffins today.
Yes please! One blueberry muffin. How much is that?
That's four pounds fifty, please.
Here you go. Thank you!
Thank you! Your coffee will be ready in a moment. Have a great day!
You too, bye!`,
  },
  {
    slug: 'weekend-plans',
    transcript: `Hey, do you have any plans for this weekend?
Not really. Maybe I'll just stay home and watch some films. What about you?
I'm thinking of going to the new exhibition at the city museum. It's about ancient Egypt. Do you want to come?
That sounds interesting! What day are you going?
Saturday afternoon. We could meet at the museum entrance at two o'clock.
Perfect. Is it expensive?
Students pay half price — it's only five euros. And there's a café inside if we want to have lunch after.
Great, I love the museum café! Okay, I'm in. See you Saturday!
Brilliant! I'll send you the address. See you then!`,
  },
  {
    slug: 'remote-work-pros-cons',
    transcript: `Over the past few years, remote work has become increasingly common.
For many people, working from home has changed their daily lives significantly.
On the positive side, employees who work from home often report greater flexibility.
They can organise their schedule around personal commitments, avoid long commutes, and work in a comfortable environment.
Studies have shown that many remote workers actually feel more productive when they work from home.
However, remote work also comes with challenges.
One of the biggest issues is isolation.
Without regular face-to-face interaction with colleagues, some workers feel disconnected and miss the social aspect of office life.
Communication can also be more difficult, as quick questions or spontaneous conversations don't happen as naturally online.
Another concern is the difficulty of separating work from personal life.
When your home becomes your office, it can be hard to switch off at the end of the day.
Overall, whether remote work is a benefit or a challenge depends greatly on the individual.`,
  },
  {
    slug: 'the-science-of-sleep',
    transcript: `Sleep is one of the most fundamental biological processes, yet it remains one of the least understood.
For decades, scientists believed sleep was simply a passive state — a period of rest when the brain and body did very little.
We now know this is far from the truth.
During sleep, the brain is remarkably active.
In the stage known as REM sleep, neural activity surges to levels almost as high as when we are awake.
This is when most dreaming occurs, and researchers believe it plays a crucial role in emotional regulation and memory consolidation.
Meanwhile, during the deeper stages of non-REM sleep, the body undergoes essential repair processes.
Cells regenerate, the immune system strengthens, and growth hormones are released.
Chronic sleep deprivation has been linked to a wide range of health problems.
Scientists are increasingly calling for a cultural shift in how we value sleep — not as a luxury, but as a biological necessity.`,
  },
  {
    slug: 'at-the-doctors',
    transcript: `Good morning. How can I help you?
Good morning. I have an appointment with Dr. Brown at ten o'clock. My name is Mark Taylor.
Let me check. Yes, Mr. Taylor. Please take a seat. The doctor will be with you in about five minutes.
Thank you.
Mr. Taylor? Please come in. What seems to be the problem?
I have a bad headache. It started two days ago. And I feel very tired.
I see. Do you have a temperature?
I'm not sure. I don't think so.
Let me check. No, your temperature is normal. Is the pain only in your head?
Mostly, yes. But my throat is also a little sore.
It sounds like a cold. I'll prescribe some medicine. Take two tablets three times a day, with food. And drink lots of water.
Should I stay in bed?
It would help. Try to rest for two or three days. If you don't feel better in a week, come back and see me.
Thank you, Doctor.
You're welcome. Get well soon!`,
  },
  {
    slug: 'shopping-for-clothes',
    transcript: `Hi there! Can I help you?
Yes, please. I'm looking for a jacket. For the winter.
Of course. What colour are you looking for?
I like blue or dark grey.
We have some nice ones over here. This navy blue jacket is very popular.
Can I try it on?
Yes, of course. What size are you?
Medium, I think.
Here you are. The changing rooms are over there on the left.
Thank you.
Hmm, I like the colour, but it's a little small. Do you have a large?
Let me check. Yes, here's the same jacket in large.
Oh, that's much better. How much is it?
It's sixty-five pounds. It's made of very good quality wool.
It's a bit expensive. Do you have any sales at the moment?
Actually, yes! If you buy two items, you get twenty percent off. We have some great scarves that would go well with it.
That sounds good. I'll take the jacket and a scarf, please.
Excellent choice! I'll take those to the till for you.`,
  },
  {
    slug: 'making-plans-by-phone',
    transcript: `Hello?
Hi, Sophie! It's James. How are you?
James! I'm good, thanks. And you?
Not bad. Listen, I'm calling because a few of us are going bowling on Saturday evening. Would you like to come?
Bowling! That sounds fun. What time?
We're meeting at seven. At the Kingpin Bowling Alley on Market Street. Do you know it?
I think so. Is it near the cinema?
Yes, exactly — just opposite the cinema.
Great. Who else is coming?
Tom, Lily, and maybe David if he's free. About five or six of us.
Sounds good. Should I book online, or do we pay at the door?
I've already booked — it was cheaper online. I'll pay for everyone now and you can pay me back later. It's twelve pounds per person.
Oh, that's kind of you! Shall I bring anything?
No, just yourself. We're going for pizza afterwards, so maybe bring a bit of extra money for that.
Perfect. I'm looking forward to it!
Great, see you Saturday. I'll send you the address just in case.
Thank you! See you then. Bye!`,
  },
  {
    slug: 'my-neighbourhood',
    transcript: `Hello! My name is Clara, and I want to tell you about the neighbourhood where I live.
I live in a small town called Ashford. It's about forty kilometres from London, so it's easy to go to the city by train.
The train journey takes about forty minutes.
My neighbourhood is very quiet. There are lots of green parks and the streets are clean.
I love walking to work in the morning because there's a beautiful river nearby.
There are two supermarkets, several small shops, and a very good bakery.
The bread there is amazing!
There is also a library, a post office, and a swimming pool.
For restaurants, we have a few Italian places, a Chinese restaurant, and a Thai takeaway that I love.
The food is always fresh and affordable.
The people here are very friendly. I moved here three years ago, and I quickly made good friends with my neighbours.
One thing I miss is a cinema. The nearest one is in the next town.
But overall, I really love my neighbourhood. It's peaceful, it's safe, and it feels like home.`,
  },
  {
    slug: 'planning-a-trip-to-portugal',
    transcript: `I'm so ready for a holiday. I haven't been abroad since last year.
Me too. Actually, I've been looking at Portugal. Have you ever been?
No, but I've heard it's beautiful. Whereabouts are you thinking?
I was looking at Lisbon and then maybe the Algarve coast for a few days. A mix of city and beach.
That sounds perfect! When are you thinking of going?
Late September or early October. It's still warm but much less crowded than summer. And flights are cheaper.
How would you get around? Rent a car?
Probably yes for the Algarve — the villages are spread out. But Lisbon is easy on public transport. They have a great tram system.
What's the accommodation like? Have you looked?
I've found a really nice guesthouse in Lisbon — very central, and breakfast is included. About seventy euros a night.
That's not bad for a central location. What about the Algarve?
There are loads of options. I'm thinking maybe a self-catering apartment so we can cook some meals rather than eating out every night.
Smart idea. How long were you thinking?
Ten days total. Three nights in Lisbon and seven at the coast.
I'd love to join if you're looking for travel companions. It sounds amazing.
Actually, yes! I was hoping to find someone to go with. The more the merrier!`,
  },
  {
    slug: 'a-job-interview',
    transcript: `Good morning, Sofia. Thank you for coming in today.
Good morning. Thank you for the opportunity.
So, tell me a little about yourself and why you're interested in this role.
Of course. I recently graduated in Marketing and Communications. During my studies, I did a six-month internship at a digital agency, where I worked mainly on social media campaigns and content creation. This role seems like a great next step.
What did you find most challenging about your internship?
Probably managing multiple projects at the same time. At first, I found it difficult to prioritise when everything seemed urgent. I learned to use project management tools and break tasks into smaller steps. By the end, I was handling four campaigns simultaneously without feeling overwhelmed.
That's impressive. How would you describe your approach to working in a team?
I think communication is key. I like to make sure everyone knows what they're responsible for and that we check in regularly.
Where do you see yourself in three years?
I'd like to develop my skills in data analytics and strategy. I'm currently studying for a Google Analytics qualification in my own time. In three years, I'd hope to be in a more senior role, perhaps leading a small team.
Excellent. Do you have any questions for us?
Yes — could you tell me more about the team I'd be joining and how success is measured in this role?`,
  },
  {
    slug: 'the-future-of-cities',
    transcript: `Good evening. I want to ask you to imagine a city where the air is clean enough to breathe without concern.
Where public transport is so efficient, fast, and affordable that car ownership becomes unnecessary.
Where green spaces are woven into the fabric of every neighbourhood.
This is not a utopia. These are measurable, achievable goals. And several cities around the world are already making them happen.
The twenty-first century is, above all, an urban century. More than half the world's population now lives in cities.
That figure is projected to rise to two thirds by 2050.
How we design and manage cities over the next few decades will arguably do more to shape the future of our planet than any other single factor.
Let's look at transport. Private cars are extraordinarily inefficient.
A car sits parked roughly ninety-five percent of its life.
Cities that have invested heavily in rapid transit and walkable neighbourhoods consistently report lower emissions and better public health outcomes.
Then there is the question of green space. Research consistently shows that access to parks reduces mental health problems and increases community cohesion.
The cities that will thrive in the coming decades will be those that ask: what kind of life do we want people to live?`,
  },
  {
    slug: 'mindfulness-and-mental-health',
    transcript: `Welcome back to the podcast. Today I'm joined by Dr Amelia Chen, a clinical psychologist who has been researching mindfulness for the past decade. Dr Chen, thank you for being here.
Thank you for having me. It's a topic I'm very passionate about.
Let's start with the basics. What exactly do we mean when we talk about mindfulness?
At its simplest, mindfulness means deliberately paying attention to the present moment — what you're sensing, feeling, and thinking — without judging it.
It sounds straightforward, but our minds are remarkably poor at actually doing this.
We tend to spend most of our time either ruminating about the past or anxiously anticipating the future.
And why is that a problem?
This tendency is strongly associated with both anxiety and depression.
When we're caught in loops of negative thought, we're rarely present.
Mindfulness interrupts that cycle.
There's now substantial evidence that mindfulness-based cognitive therapy can be as effective as antidepressants for preventing relapse in people with recurrent depression.
What's the most common mistake people make when starting out?
Expecting it to feel relaxing immediately.
Mindfulness is actually a practice of noticing — and noticing can be uncomfortable at first.
Any advice for someone who wants to start?
Start small. Five minutes a day is genuinely enough to begin. And consistency matters far more than duration.`,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function splitIntoChunks(text, maxLen = 185) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const chunks = [];

  for (const line of lines) {
    if (line.length <= maxLen) {
      chunks.push(line);
    } else {
      // Further split long lines on '. ' or ', '
      const sentences = line.split(/(?<=\. )|(?<=\? )|(?<=\! )/);
      let current = '';
      for (const s of sentences) {
        if ((current + s).length > maxLen && current) {
          chunks.push(current.trim());
          current = s;
        } else {
          current += s;
        }
      }
      if (current.trim()) chunks.push(current.trim());
    }
  }

  return chunks.filter(c => c.length > 0);
}

function downloadChunk(text, outFile) {
  return new Promise((resolve, reject) => {
    const encoded = encodeURIComponent(text);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=${TTS_LANG}&client=gtx&ttsspeed=${TTS_SPEED}`;

    const opts = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer':    'https://translate.google.com/',
        'Accept':     'audio/mpeg, audio/*, */*',
      },
    };

    const req = https.get(url, opts, res => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        return https.get(res.headers.location, opts, res2 => {
          const chunks = [];
          res2.on('data', d => chunks.push(d));
          res2.on('end', () => { writeFileSync(outFile, Buffer.concat(chunks)); resolve(); });
          res2.on('error', reject);
        });
      }
      const chunks = [];
      res.on('data', d => chunks.push(d));
      res.on('end', () => { writeFileSync(outFile, Buffer.concat(chunks)); resolve(); });
      res.on('error', reject);
    });
    req.on('error', reject);
  });
}

async function generateClip(clip) {
  const outFile = path.join(OUT_DIR, `${clip.slug}.mp3`);

  if (existsSync(outFile)) {
    console.log(`  ✓ ${clip.slug}.mp3 already exists — skipping`);
    return;
  }

  console.log(`\n▶ ${clip.slug}`);
  const chunks = splitIntoChunks(clip.transcript);
  console.log(`  ${chunks.length} chunks`);

  const chunkFiles = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunkFile = path.join(TMP_DIR, `${clip.slug}_${String(i).padStart(3, '0')}.mp3`);
    process.stdout.write(`  [${i + 1}/${chunks.length}] "${chunks[i].slice(0, 50)}…"\r`);

    let attempts = 0;
    while (attempts < 3) {
      try {
        await downloadChunk(chunks[i], chunkFile);
        chunkFiles.push(chunkFile);
        break;
      } catch (err) {
        attempts++;
        if (attempts === 3) throw err;
        await sleep(2000 * attempts);
      }
    }

    // Polite delay between requests to avoid rate limiting
    await sleep(600);
  }

  // Concatenate with ffmpeg
  const listFile = path.join(TMP_DIR, `${clip.slug}_list.txt`);
  writeFileSync(listFile, chunkFiles.map(f => `file '${f}'`).join('\n'));

  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${listFile}" -acodec libmp3lame -b:a 64k -ar 44100 "${outFile}" 2>/dev/null`,
    { stdio: 'inherit' }
  );

  // Cleanup temp chunks
  chunkFiles.forEach(f => { try { unlinkSync(f); } catch {} });
  try { unlinkSync(listFile); } catch {}

  const size = (readFileSync(outFile).length / 1024).toFixed(0);
  console.log(`  ✓ ${outFile.split('/').pop()} (${size} KB)`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🎙  Generating audio for 12 listening clips');
  console.log(`   Output → ${OUT_DIR}\n`);

  for (const clip of CLIPS) {
    await generateClip(clip);
    await sleep(800); // extra pause between clips
  }

  console.log('\n✅  Done! All MP3 files are in public/audio/');
  console.log('\nNext steps:');
  console.log('  1. Upload each file to Supabase Storage → audio bucket');
  console.log('  2. Copy the public URL for each file');
  console.log('  3. Run:  node scripts/audio/update-urls.js');
  console.log('     (or update audio_url in the admin → Слушане)\n');
}

main().catch(err => { console.error(err); process.exit(1); });
