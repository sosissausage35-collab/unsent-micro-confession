// Unsent: The Micro-Confession Sprint — make.fun bounty entry.
// Writes one two-part micro-confession (a To: line and the unsent message
// itself, one line) to /output/entry.txt, or to $MAKEFUN_OUTPUT_DIR when set.
// Deterministic on every run: no network, no randomness, no input, no clock.
//
// Why this confession: it was typed to someone the writer can never reach
// again — a nurse whose name was never learned, in a waiting room, in the
// minutes before being called in. The reason it stayed in drafts is felt
// in the words, not stated: the moment to say thank you closed the second
// the door opened, and there is no address to send it to now. The message
// only makes sense to that one addressee; swap her out and "they called
// me in" and "I never learned your name" stop meaning anything.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TO_LINE =
  "To: the nurse who held my hand in the waiting room";
const MESSAGE =
  "I never learned your name but I still remember you said 'breathe with me' and I wish I'd said thank you before they called me in.";

const ENTRY = `${TO_LINE}\n${MESSAGE}\n`;

// Gate: the sealed scorer accepts UTF-8 text of 1-260 characters, not only
// whitespace, and the message line itself is at most 200 characters.
const totalChars = [...ENTRY].length;
const messageChars = [...MESSAGE].length;
if (totalChars < 1 || totalChars > 260 || ENTRY.trim().length === 0) {
  throw new Error(`entry must be 1-260 characters, got ${totalChars}`);
}
if (messageChars > 200) {
  throw new Error(`message line must be at most 200 characters, got ${messageChars}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
