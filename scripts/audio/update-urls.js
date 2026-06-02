#!/usr/bin/env node
/**
 * update-urls.js — update audio_url in the database after uploading to Supabase Storage
 *
 * Usage:
 *   node scripts/audio/update-urls.js
 *
 * The script expects:
 *   - NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   - Files uploaded to the 'audio' bucket in Supabase Storage
 *
 * The public URL pattern is:
 *   <supabase-url>/storage/v1/object/public/audio/<slug>.mp3
 */

const { readFileSync } = require('fs');
const path = require('path');
const https = require('https');

// ── Load env vars ─────────────────────────────────────────────────────────────
function loadEnv() {
  const envFile = path.join(__dirname, '../../.env.local');
  try {
    const text = readFileSync(envFile, 'utf8');
    const env  = {};
    for (const line of text.split('\n')) {
      const m = line.match(/^([A-Z_]+)=(.+)$/);
      if (m) env[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, '');
    }
    return env;
  } catch {
    console.error('Could not read .env.local — make sure it exists.');
    process.exit(1);
  }
}

const env       = loadEnv();
const SUPABASE  = env['NEXT_PUBLIC_SUPABASE_URL'];
const KEY       = env['SUPABASE_SERVICE_ROLE_KEY'];

if (!SUPABASE || !KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

// ── Slug → title mapping (matches the seed SQL) ────────────────────────────
const SLUGS = [
  'a-cup-of-coffee',
  'weekend-plans',
  'remote-work-pros-cons',
  'the-science-of-sleep',
  'at-the-doctors',
  'shopping-for-clothes',
  'making-plans-by-phone',
  'my-neighbourhood',
  'planning-a-trip-to-portugal',
  'a-job-interview',
  'the-future-of-cities',
  'mindfulness-and-mental-health',
];

function supabaseRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const url  = new URL(SUPABASE + path);
    const data = body ? JSON.stringify(body) : null;

    const opts = {
      hostname: url.hostname,
      port:     443,
      path:     url.pathname + url.search,
      method,
      headers: {
        'apikey':         KEY,
        'Authorization':  `Bearer ${KEY}`,
        'Content-Type':   'application/json',
        'Prefer':         'return=representation',
      },
    };

    const req = https.request(opts, res => {
      const chunks = [];
      res.on('data', d => chunks.push(d));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString();
        try { resolve(JSON.parse(text)); }
        catch { resolve(text); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  console.log('🔗 Updating audio_url for all listening clips\n');

  // Fetch all clips so we can match by title slug
  const clips = await supabaseRequest('GET', '/rest/v1/listening_clips?select=id,title&order=created_at');
  if (!Array.isArray(clips)) {
    console.error('Failed to fetch clips:', clips);
    process.exit(1);
  }

  // Build title → id map (slugified title matching)
  const titleToSlug = {
    'A Cup of Coffee':               'a-cup-of-coffee',
    'Weekend Plans':                 'weekend-plans',
    'Remote Work: Pros and Cons':    'remote-work-pros-cons',
    'The Science of Sleep':          'the-science-of-sleep',
    "At the Doctor's":               'at-the-doctors',
    'Shopping for Clothes':          'shopping-for-clothes',
    'Making Plans by Phone':         'making-plans-by-phone',
    'My Neighbourhood':              'my-neighbourhood',
    'Planning a Trip to Portugal':   'planning-a-trip-to-portugal',
    'A Job Interview':               'a-job-interview',
    'The Future of Cities':          'the-future-of-cities',
    'Mindfulness and Mental Health': 'mindfulness-and-mental-health',
  };

  const BASE = `${SUPABASE}/storage/v1/object/public/audio`;

  let updated = 0;
  for (const clip of clips) {
    const slug = titleToSlug[clip.title];
    if (!slug) {
      console.log(`  ⚠ No slug mapping for "${clip.title}" — skipping`);
      continue;
    }

    const audioUrl = `${BASE}/${slug}.mp3`;
    const result = await supabaseRequest('PATCH', `/rest/v1/listening_clips?id=eq.${clip.id}`, {
      audio_url: audioUrl,
    });

    console.log(`  ✓ ${clip.title} → ${audioUrl}`);
    updated++;
  }

  console.log(`\n✅  Updated ${updated} clips.`);
}

main().catch(err => { console.error(err); process.exit(1); });
