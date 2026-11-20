// Entry program for make.fun bounty gta6-meme-x-01 ("Post a GTA 6 meme on X").
//
// The entry itself is a public post on X: a GTA 6 meme whose picture carries
// make.fun's ghost mascot, posted by the entrant from @Wilayyyy. This program
// does the one job the bounty asks of it: it hands the post's address in,
// copying POST.json from this repository to the output directory, where the
// house reads it, fetches the post from X and builds the judged dossier.
// Nothing written here is judged; the post is.
//
// Run locally the way the kit shows:
//   MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail loudly rather than hand in a broken pointer: POST.json must parse and
// its url must be the address of one X post.
const post = JSON.parse(readFileSync(join(here, 'POST.json'), 'utf8'));
if (typeof post.url !== 'string' || !/^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+$/.test(post.url)) {
  throw new Error(`POST.json does not name an X post: ${post.url}`);
}

mkdirSync(out, { recursive: true });
copyFileSync(join(here, 'POST.json'), join(out, 'POST.json'));
