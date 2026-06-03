#!/usr/bin/env node
/**
 * generate_v2.js — synthesise MP3 audio for the 6 new B2/C1 listening clips
 *
 * Uses Google Translate TTS (free, no key needed).
 * Requires: Node.js >= 18 (built-in fetch) + ffmpeg
 *
 * Usage:
 *   node scripts/audio/generate_v2.js
 *
 * Output:
 *   public/audio/<slug>.mp3  for each clip
 */

const { execSync } = require('child_process');
const { writeFileSync, mkdirSync, existsSync, unlinkSync } = require('fs');
const https  = require('https');
const path   = require('path');

const OUT_DIR   = path.join(__dirname, '../../public/audio');
const TMP_DIR   = '/tmp/tts_chunks_v2';
const TTS_SPEED = '0.85';
const TTS_LANG  = 'en-GB';

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(TMP_DIR, { recursive: true });

const CLIPS = [
  {
    slug: 'social-media-regulation-debate',
    transcript: `Good morning. Today we're discussing whether governments should regulate social media platforms more strictly.
The case for regulation rests on a simple premise: social media platforms have become critical public infrastructure, yet they operate almost entirely without accountability.
When a newspaper publishes false information, it faces legal consequences.
When a social media platform amplifies that information to millions through its algorithm, it faces almost none.
But who decides what counts as harmful? The history of government censorship is not encouraging.
Every time authorities have been given the power to restrict speech, that power has been used against minorities, dissidents, and journalists.
I'm not talking about censorship. I'm talking about transparency and accountability.
Require platforms to disclose how their algorithms work.
Require them to do independent audits of their impact on mental health.
Give users meaningful control over their data.
Those proposals come with costs. Compliance burdens favour large incumbents and crush small competitors.
There's something to that concern, but it can be addressed through proportional regulation.
The status quo, in which a handful of companies shape the information environment of billions without oversight, is not acceptable.`,
  },
  {
    slug: 'climate-change-economics',
    transcript: `Today I want to look at the economic dimension of climate change, because it's at the heart of why progress has been so slow.
The fundamental economic problem is what economists call an externality.
When a factory burns fossil fuels, it produces carbon dioxide.
The factory owner pays for the fuel, pays the workers, and sells the product at a price that reflects those costs.
But the carbon dioxide released into the atmosphere imposes costs on everyone, and those costs are not reflected in the price of the product.
The standard economic solution is to price the externality — to make polluters pay for the damage they cause.
This can be done through a carbon tax, which directly sets a price on emissions, or through a cap-and-trade system, which limits total emissions and lets companies buy and sell permits to pollute.
The challenge is political, not technical.
Carbon taxes are deeply unpopular because they raise the price of energy, at least in the short term.
Voters feel the costs immediately but the benefits — slower climate change — are diffuse, long-term, and globally distributed.
There's also a competitiveness problem. If one country introduces a carbon price and others don't, industries in the regulated country face higher costs.
The good news is that the costs of renewable energy have fallen so dramatically that solar power is now the cheapest source of electricity in history.`,
  },
  {
    slug: 'interview-on-artificial-intelligence',
    transcript: `The biggest misunderstanding about AI is treating it as a monolithic thing — as if there's one technology called artificial intelligence that's either going to save us or destroy us.
In reality, AI is a collection of quite different tools and techniques, each suited to different problems, with different strengths and weaknesses.
Current AI systems are extraordinarily good at pattern recognition — identifying faces, translating languages, generating text that sounds plausible.
But they don't understand what they're doing in any meaningful sense.
They can produce a convincing essay about a topic they have no actual knowledge of.
They can confidently assert things that are completely false.
They can't reliably reason about novel situations that fall outside their training data.
What we're seeing is that AI excels at automating specific, well-defined tasks within jobs, rather than entire jobs.
Radiologists, for example, are not being replaced — but the task of scanning images for specific anomalies is being automated.
The job changes, even if it doesn't disappear.
AI literacy — understanding roughly how these systems work, what their biases are, and what they can and can't do — is becoming as important as basic numeracy.
We need to invest in it as a society.`,
  },
  {
    slug: 'what-can-we-know',
    transcript: `Today we're exploring a question that might seem abstract but has surprisingly practical implications: what is knowledge? And how do we know when we have it?
The standard textbook definition — knowledge is justified true belief — sounds intuitive enough.
For me to know something, the belief must be true, I must actually hold it, and I must have good reason to hold it.
In 1963, a philosopher named Edmund Gettier wrote a three-page paper that sent the entire field into turmoil.
He showed that you can have a justified true belief that, intuitively, doesn't count as knowledge.
The classic example: imagine you look at a clock on the wall that reads three fifteen. You believe it is three fifteen, and it happens to be exactly three fifteen.
But the clock stopped twelve hours ago.
Your belief is justified — you looked at a clock — and it's true — it is three fifteen. But you don't know it. You got lucky.
So justification and truth aren't sufficient?
That's the Gettier problem, and fifty years of philosophy have failed to produce a universally accepted solution.
A correct belief formed through a faulty process isn't knowledge — even if it happens to be true.
That has real consequences for how we should evaluate the sources we trust.`,
  },
  {
    slug: 'rise-and-fall-of-rome',
    transcript: `For nearly a thousand years, Rome stood as the dominant power of the Western world.
At its height in the second century AD, the empire stretched from the coast of Scotland to the deserts of Mesopotamia, encompassing some seventy million people — roughly a quarter of the world's population.
The question of why Rome fell has never been fully settled.
Edward Gibbon, writing in the eighteenth century, blamed Christianity for undermining the martial virtues that had made Rome great.
Modern historians have proposed dozens of additional factors: economic disruption caused by reliance on slave labour, the debasement of the currency that triggered inflation, the growing expense of defending an impossibly long border, political instability at the centre.
What seems clear is that decline was gradual, not catastrophic.
The traditional date of four seventy-six AD, when the last Western emperor was deposed, has less significance than it once seemed.
Power had already been fragmenting for over a century.
The Eastern Empire — Byzantium — did not fall for nearly another thousand years, which tells us that the collapse of the West was not inevitable.
It was the product of specific choices, specific pressures, and specific failures of leadership.
And the echoes reach us still. Roman law forms the basis of legal systems across Europe and Latin America.
The question that haunted Rome — how a large, complex civilisation manages its internal contradictions while defending its peripheries — is one that every empire since has been forced to answer.`,
  },
  {
    slug: 'behavioural-economics',
    transcript: `Today's lecture concerns behavioural economics — a field that emerged from the uncomfortable realisation that the standard economic model of human behaviour is, in important respects, wrong.
Classical economics assumed what it called the rational agent — a person who accurately processes available information and makes decisions that maximise their own wellbeing.
The problem is that decades of experimental research demonstrated that humans systematically deviate from this model in predictable ways.
Kahneman's most influential contribution is his distinction between System One and System Two thinking.
System One is fast, intuitive, and largely unconscious. It's how you drive a familiar route home without thinking, how you recognise a face, how you catch a ball.
System Two is slow, deliberate, and effortful. It's what you use when doing a difficult mathematical calculation or learning a new skill.
The crucial insight is that we use System One far more than we think — even in contexts where careful reasoning would lead to better outcomes.
Loss aversion: people feel the pain of losing something roughly twice as intensely as the pleasure of gaining something equivalent.
Present bias: we consistently overvalue immediate rewards relative to future ones.
Nudge theory suggests that rather than compelling behaviour through regulation, governments can design choice environments that gently guide people towards better decisions.
Automatically enrolling employees in pension schemes dramatically increases participation — without removing anyone's freedom to opt out.
The critique is that nudge theory is paternalistic — that it assumes governments know better than individuals what choices are in their interest.`,
  },
];

// ── Helpers (same as generate.js) ────────────────────────────────────────────

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function splitIntoChunks(text, maxLen = 185) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const chunks = [];
  for (const line of lines) {
    if (line.length <= maxLen) { chunks.push(line); continue; }
    const sentences = line.split(/(?<=\. )|(?<=\? )|(?<=\! )/);
    let current = '';
    for (const s of sentences) {
      if ((current + s).length > maxLen && current) { chunks.push(current.trim()); current = s; }
      else { current += s; }
    }
    if (current.trim()) chunks.push(current.trim());
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
  if (existsSync(outFile)) { console.log(`  ✓ ${clip.slug}.mp3 already exists — skipping`); return; }

  console.log(`\n▶ ${clip.slug}`);
  const chunks = splitIntoChunks(clip.transcript);
  console.log(`  ${chunks.length} chunks`);

  const chunkFiles = [];
  for (let i = 0; i < chunks.length; i++) {
    const chunkFile = path.join(TMP_DIR, `${clip.slug}_${String(i).padStart(3,'0')}.mp3`);
    process.stdout.write(`  [${i+1}/${chunks.length}] "${chunks[i].slice(0,50)}…"\r`);
    let attempts = 0;
    while (attempts < 3) {
      try { await downloadChunk(chunks[i], chunkFile); chunkFiles.push(chunkFile); break; }
      catch (err) { attempts++; if (attempts === 3) throw err; await sleep(2000 * attempts); }
    }
    await sleep(600);
  }

  const listFile = path.join(TMP_DIR, `${clip.slug}_list.txt`);
  writeFileSync(listFile, chunkFiles.map(f => `file '${f}'`).join('\n'));
  execSync(`ffmpeg -y -f concat -safe 0 -i "${listFile}" -acodec libmp3lame -b:a 64k -ar 44100 "${outFile}" 2>/dev/null`);
  chunkFiles.forEach(f => { try { unlinkSync(f); } catch {} });
  try { unlinkSync(listFile); } catch {}
  console.log(`  ✓ ${clip.slug}.mp3`);
}

async function main() {
  console.log('🎙  Generating audio for 6 B2/C1 listening clips');
  console.log(`   Output → ${OUT_DIR}\n`);
  for (const clip of CLIPS) { await generateClip(clip); await sleep(800); }
  console.log('\n✅  Done!');
  console.log('\nNext: upload to Supabase Storage and run update-urls.js (or update audio_url in admin)');
}

main().catch(err => { console.error(err); process.exit(1); });
