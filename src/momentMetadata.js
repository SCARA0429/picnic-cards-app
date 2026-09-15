// Phase 2D: Moments and Wild Cards metadata scaffold. Same discipline as
// src/questionMetadata.js: describes what each intervention structurally
// asks the couple to do and when it's structurally eligible to appear --
// never a prediction of how it will feel, and never a score. The content
// itself (title/instruction/seconds/ongoing/optional/momentType for
// Moments; instruction/seconds for Wild Cards) stays in main.jsx's
// VOLUME_ONE_MOMENTS / VOLUME_TWO_MOMENTS / VOLUME_THREE_WILD_CARDS and is
// untouched by this file. Entries are matched to content by exact
// `instruction` text (verified unique across all 88 real entries), the
// same join-key discipline questionMetadata.js uses for `q`.
//
// MOMENT_METADATA and WILD_CARD_METADATA are intentionally empty --
// population is a separate, later pass, same as the question schema went
// through its own scaffold-then-populate split.
//
// compatibleWith / avoidWhen are eligibility constraints, not scoring:
// compatibleWith says "structurally suitable under these conditions",
// avoidWhen says "don't present this under these conditions" -- neither
// ranks one candidate above another. That's deliberately left for a later
// pacing-decision stage, not this file. Both reference the *question's*
// existing structural metadata (conversationType / answerMode /
// responseBehaviour / disclosureDemand) via QUESTION_FIELD_VOCABULARIES
// below, imported from questionMetadata.js so both files validate against
// one shared source of truth -- never a second, drifting copy of those
// vocabularies.

import {
  THEMES,
  CONVERSATION_TYPES,
  ANSWER_MODES,
  RESPONSE_BEHAVIOURS,
  DISCLOSURE_DEMANDS
} from "./questionMetadata.js";

// Existing, already-live vocabulary (drives MOMENT_WEIGHTS today) -- kept
// as-is, not reinvented.
export const MOMENT_TYPES = [
  "synchrony",
  "touch",
  "romantic",
  "appreciation",
  "vulnerability",
  "playful"
];

// From real inventory of all 13 Wild Cards, not assumed upfront. "delayed"
// documents that one card's payoff happens after the session ends -- real
// and worth knowing, but not modeled with a separate timing field until
// Phase 3 has an actual requirement for one.
export const WILD_TYPES = [
  "play",
  "memory",
  "appreciation",
  "vulnerability",
  "written_comparison",
  "generative",
  "delayed"
];

// Moments only. Describes the level of physical or emotional exposure the
// action ITSELF requires (Lock Eyes -> low, Hold Hands -> moderate, Kiss
// Your Way -> high) -- never a prediction of how intense the couple will
// find it. Same discipline as disclosureDemand.
export const INTENSITY_LEVELS = ["low", "moderate", "high"];

// Which question-metadata fields compatibleWith/avoidWhen may reference,
// and the vocabulary each one validates against. Deliberately not limited
// to conversationType/responseBehaviour/disclosureDemand -- answerMode is
// included because some perception/partner-focused Moments will likely
// need it. Add a field here only when there's an actual entry that needs
// it, the same "don't populate what you don't have evidence for" rule
// used for question metadata's THEMES list.
const QUESTION_FIELD_VOCABULARIES = {
  conversationType: CONVERSATION_TYPES,
  answerMode: ANSWER_MODES,
  responseBehaviour: RESPONSE_BEHAVIOURS,
  disclosureDemand: DISCLOSURE_DEMANDS
};

/**
 * @typedef {Object} MomentMetadata
 * @property {string} id - e.g. "moment-v1-16" ("v1"/"v2" names the source
 *   list it was authored in, not which volume may use it -- all Moments
 *   are already shared across all 3 volumes).
 * @property {"moment"} type
 * @property {string} title - must match the live Moment's title exactly.
 * @property {string} instruction - must match the live Moment's instruction
 *   exactly; the join key.
 * @property {number} [seconds]
 * @property {boolean} [ongoing]
 * @property {boolean} [optional]
 * @property {string} momentType - one of MOMENT_TYPES.
 * @property {string} intensity - one of INTENSITY_LEVELS.
 * @property {string[]} themes - each must exist in THEMES (questionMetadata.js).
 * @property {Object.<string,string[]>} [compatibleWith] - keys from
 *   QUESTION_FIELD_VOCABULARIES, values from that field's vocabulary.
 * @property {Object.<string,string[]>} [avoidWhen] - same shape as compatibleWith.
 *
 * @type {MomentMetadata[]}
 */
export const MOMENT_METADATA = [
  // ---------------------------------------------------------------------
  // Source: VOLUME_ONE_MOMENTS (35)
  // ---------------------------------------------------------------------
  { id: "moment-v1-1", type: "moment", title: "Lock Eyes", instruction: "Look into each other’s eyes without talking.", seconds: 40, momentType: "synchrony", intensity: "low", themes: ["connection"] },
  { id: "moment-v1-2", type: "moment", title: "Hold Hands", instruction: "Hold hands and keep playing like this for the rest of the game. Either person can stop whenever they want.", ongoing: true, momentType: "touch", intensity: "moderate", themes: ["connection"] },
  { id: "moment-v1-3", type: "moment", title: "Eyes Closed", instruction: "Close your eyes, hold hands, and stay quiet together.", seconds: 30, momentType: "synchrony", intensity: "moderate", themes: ["connection", "safety"] },
  { id: "moment-v1-4", type: "moment", title: "Long Hug", instruction: "Give each other a proper hug. No rushing it.", seconds: 30, momentType: "touch", optional: true, intensity: "moderate", themes: ["connection"] },
  { id: "moment-v1-5", type: "moment", title: "Cuddle Break", instruction: "Get comfortable and cuddle up. Keep playing the game like this for the rest of the game.", ongoing: true, momentType: "romantic", optional: true, intensity: "high", themes: ["connection"] },
  { id: "moment-v1-6", type: "moment", title: "Forehead Touch", instruction: "Rest your foreheads together and stay there while continuing the game. Either person can stop when they want.", ongoing: true, momentType: "touch", intensity: "moderate", themes: ["connection"] },
  { id: "moment-v1-7", type: "moment", title: "Compliment Close-Up", instruction: "Hold hands and tell each other one thing you genuinely admire about the other person.", seconds: 45, momentType: "appreciation", intensity: "moderate", themes: ["appreciation"] },
  { id: "moment-v1-8", type: "moment", title: "Silent Appreciation", instruction: "Look at each other and think of one thing you’re grateful for about this moment. Share it when the timer ends.", seconds: 30, momentType: "appreciation", intensity: "low", themes: ["appreciation"] },
  { id: "moment-v1-9", type: "moment", title: "Lean On Me", instruction: "Lean against each other or rest your head on your partner while you keep playing. Either person can stop whenever they want.", ongoing: true, momentType: "touch", intensity: "moderate", themes: ["connection"] },
  { id: "moment-v1-10", type: "moment", title: "Kiss", instruction: "If you both want to, share a kiss. No timer pressure, just enjoy the moment.", momentType: "romantic", optional: true, intensity: "high", themes: ["connection"], avoidWhen: { disclosureDemand: ["high"] } },
  { id: "moment-v1-11", type: "moment", title: "Hand Trace", instruction: "Hold hands and slowly trace the lines of each other’s palm.", seconds: 30, momentType: "touch", intensity: "moderate", themes: ["connection"] },
  { id: "moment-v1-12", type: "moment", title: "Close & Breathe", instruction: "Sit close, hold hands, and take a few slow breaths together.", seconds: 30, momentType: "synchrony", intensity: "moderate", themes: ["connection", "safety"] },
  { id: "moment-v1-13", type: "moment", title: "Follow My Breath", instruction: "Sit facing each other and hold hands. Breathe slowly together without trying too hard to match each other. Just notice the rhythm.", seconds: 45, momentType: "synchrony", intensity: "moderate", themes: ["connection"] },
  { id: "moment-v1-14", type: "moment", title: "No Words", instruction: "Look into each other’s eyes without speaking. Smiling and laughing are allowed. Just stay present.", seconds: 45, momentType: "synchrony", intensity: "low", themes: ["connection", "playfulness"] },
  { id: "moment-v1-15", type: "moment", title: "Three Things", instruction: "Take turns telling each other three things you genuinely like or appreciate about the other person. No interrupting and no rejecting the compliment.", momentType: "appreciation", intensity: "low", themes: ["appreciation"] },
  { id: "moment-v1-16", type: "moment", title: "Tell Me More", instruction: "One person shares something that's been on their mind lately. The other person listens without fixing it. Ask 'Tell me more' and give them your full attention. Afterwards, switch roles.", seconds: 60, momentType: "vulnerability", intensity: "high", themes: ["vulnerability", "communication"], compatibleWith: { conversationType: ["self_reflection", "story"], disclosureDemand: ["moderate", "high"] } },
  { id: "moment-v1-17", type: "moment", title: "Your Turn To Be Held", instruction: "One person relaxes into a hug while the other simply holds them. Switch halfway.", seconds: 40, momentType: "touch", optional: true, intensity: "high", themes: ["connection", "safety"] },
  { id: "moment-v1-18", type: "moment", title: "Face Touch", instruction: "If you're both comfortable, gently hold or stroke each other's cheek while looking at one another.", seconds: 20, momentType: "touch", optional: true, intensity: "moderate", themes: ["connection"] },
  { id: "moment-v1-19", type: "moment", title: "Favourite Detail", instruction: "Look at each other closely. Tell the other person one small physical or personality detail you've noticed about them that you really like.", momentType: "appreciation", intensity: "low", themes: ["appreciation"] },
  { id: "moment-v1-20", type: "moment", title: "Our Song Moment", instruction: "Choose a song. Hold each other, sway together, or just sit close. Don't talk until the timer ends.", seconds: 60, momentType: "synchrony", optional: true, intensity: "moderate", themes: ["connection", "memory"] },
  { id: "moment-v1-21", type: "moment", title: "Safe With You", instruction: "Take turns finishing this sentence: 'Something that would make me feel safer opening up to you is...' The other person just listens.", momentType: "vulnerability", intensity: "high", themes: ["vulnerability", "safety", "trust"] },
  { id: "moment-v1-22", type: "moment", title: "What Do You Need?", instruction: "Ask each other: 'Right now, would you rather have a hug, a kiss, hold hands, cuddle, sit close, or have some space?' Respect whatever they choose.", momentType: "appreciation", intensity: "low", themes: ["needs", "connection"] },
  { id: "moment-v1-23", type: "moment", title: "Kiss Me Slowly", instruction: "If you both want to, share a slow kiss. There's nothing to complete and no timer. Stop whenever either of you wants.", seconds: 30, momentType: "romantic", optional: true, intensity: "high", themes: ["connection"], avoidWhen: { disclosureDemand: ["high"] } },
  { id: "moment-v1-24", type: "moment", title: "Closer", instruction: "Sit as close as feels comfortable, hold each other, and play the game while staying there. Either person can stop whenever they want.", ongoing: true, momentType: "touch", optional: true, intensity: "moderate", themes: ["connection"] },
  { id: "moment-v1-25", type: "moment", title: "Kiss, Your Way", instruction: "If you both want to kiss, kiss however feels natural to both of you. You decide what kind of kiss and when to stop.", momentType: "romantic", optional: true, intensity: "high", themes: ["connection"], avoidWhen: { disclosureDemand: ["high"] } },
  { id: "moment-v1-26", type: "moment", title: "Your Choice", instruction: "Choose one together: hold hands, forehead kiss, cheek kiss, hug, cuddle, kiss, sit close, or skip.", momentType: "playful", intensity: "moderate", themes: ["playfulness", "connection"] },
  { id: "moment-v1-27", type: "moment", title: "Listen To Me", instruction: "One person talks for one minute about something important to them. The other person doesn't interrupt, advise, or solve anything. Just listen.", seconds: 60, momentType: "vulnerability", intensity: "high", themes: ["vulnerability", "communication"], compatibleWith: { conversationType: ["self_reflection", "story"], disclosureDemand: ["moderate", "high"] } },
  { id: "moment-v1-28", type: "moment", title: "Heartbeat", instruction: "If you're both comfortable, rest your head against your partner's chest and listen to their heartbeat. Switch halfway.", seconds: 40, momentType: "touch", optional: true, intensity: "high", themes: ["connection", "safety"] },
  { id: "moment-v1-29", type: "moment", title: "One Thing I See In You", instruction: "Finish the sentence: 'One thing I see in you that I don't think you always see in yourself is...' ", momentType: "appreciation", intensity: "moderate", themes: ["appreciation"] },
  { id: "moment-v1-30", type: "moment", title: "Thank You For...", instruction: "Look at each other and finish the sentence: 'Something I want to thank you for is...'", momentType: "appreciation", intensity: "low", themes: ["appreciation"] },
  { id: "moment-v1-31", type: "moment", title: "Hands, No Words", instruction: "Hold both of each other's hands. Don't talk. Keep playing as you stay there together.", ongoing: true, momentType: "synchrony", intensity: "moderate", themes: ["connection"] },
  { id: "moment-v1-32", type: "moment", title: "Make Me Smile", instruction: "You have 30 seconds to make the other person smile without touching your phone.", seconds: 30, momentType: "playful", intensity: "low", themes: ["playfulness"] },
  { id: "moment-v1-33", type: "moment", title: "Remember This", instruction: "Take a quiet moment and look around. Notice where you are, what the other person looks like, and how this moment feels. Then tell each other one thing you want to remember about today.", seconds: 30, momentType: "vulnerability", intensity: "moderate", themes: ["memory", "connection"] },
  { id: "moment-v1-34", type: "moment", title: "One Question", instruction: "You may ask the other person one question you've genuinely wanted to ask them but haven't yet.", momentType: "vulnerability", intensity: "high", themes: ["vulnerability", "honesty"] },
  { id: "moment-v1-35", type: "moment", title: "I Feel Closest To You When...", instruction: "Take turns finishing the sentence: 'I feel closest to you when...'", momentType: "vulnerability", intensity: "moderate", themes: ["connection", "vulnerability"] },

  // ---------------------------------------------------------------------
  // Source: VOLUME_TWO_MOMENTS (40)
  // ---------------------------------------------------------------------
  { id: "moment-v2-1", type: "moment", title: "Come Here", instruction: "One long hug. No talking.", momentType: "touch", intensity: "moderate", themes: ["connection"] },
  { id: "moment-v2-2", type: "moment", title: "Hold Hands", instruction: "Hold hands for the next card.", momentType: "touch", intensity: "low", themes: ["connection"] },
  { id: "moment-v2-3", type: "moment", title: "Forehead Kiss", instruction: "Give them a forehead kiss.", momentType: "romantic", intensity: "moderate", themes: ["connection"] },
  { id: "moment-v2-4", type: "moment", title: "Choose One", instruction: "Choose one: a kiss, a hug, or a hand squeeze.", momentType: "romantic", intensity: "moderate", themes: ["connection"] },
  { id: "moment-v2-5", type: "moment", title: "A Little Closer", instruction: "Sit a little closer for the next three cards.", momentType: "touch", intensity: "low", themes: ["connection"] },
  { id: "moment-v2-6", type: "moment", title: "Look At Me", instruction: "Look at each other for 20 seconds. No jokes, no looking away.", seconds: 20, momentType: "synchrony", intensity: "low", themes: ["connection"] },
  { id: "moment-v2-7", type: "moment", title: "Who You're Becoming", instruction: "Hold their hand and tell them one thing you admire about who they're becoming.", momentType: "appreciation", intensity: "moderate", themes: ["appreciation", "growth"] },
  { id: "moment-v2-8", type: "moment", title: "I Felt Loved", instruction: "Tell them one small thing they did recently that made you feel loved.", momentType: "appreciation", intensity: "low", themes: ["appreciation", "love_languages"] },
  { id: "moment-v2-9", type: "moment", title: "Proud Of You", instruction: "Tell them something you're genuinely proud of them for.", momentType: "appreciation", intensity: "low", themes: ["appreciation"] },
  { id: "moment-v2-10", type: "moment", title: "I Noticed", instruction: "Tell them one detail about them you've noticed that they probably didn't realise you noticed.", momentType: "appreciation", intensity: "low", themes: ["appreciation"] },
  { id: "moment-v2-11", type: "moment", title: "Closest To You", instruction: "Finish this sentence: 'I feel closest to you when...'", momentType: "vulnerability", intensity: "moderate", themes: ["connection", "vulnerability"] },
  { id: "moment-v2-12", type: "moment", title: "Safe With You", instruction: "Finish this sentence: 'Something about you that makes me feel safe is...'", momentType: "vulnerability", intensity: "moderate", themes: ["safety", "trust"] },
  { id: "moment-v2-13", type: "moment", title: "Never Doubt", instruction: "Tell them one thing you never want them to doubt about how you feel about them.", momentType: "vulnerability", intensity: "moderate", themes: ["vulnerability", "reassurance"] },
  { id: "moment-v2-14", type: "moment", title: "Whisper It", instruction: "Whisper one thing you appreciate about them that you don't say enough.", momentType: "appreciation", intensity: "low", themes: ["appreciation"] },
  { id: "moment-v2-15", type: "moment", title: "Phones Away", instruction: "No phones for the next five cards.", momentType: "synchrony", intensity: "low", themes: ["connection"] },
  { id: "moment-v2-16", type: "moment", title: "Our Song", instruction: "Choose a song that reminds you of them and play it.", momentType: "romantic", intensity: "low", themes: ["memory", "connection"] },
  { id: "moment-v2-17", type: "moment", title: "Slow Dance", instruction: "One-song slow dance.", momentType: "romantic", intensity: "moderate", themes: ["connection", "playfulness"] },
  { id: "moment-v2-18", type: "moment", title: "Keep This One", instruction: "Take one picture together that doesn't need to be posted.", momentType: "playful", intensity: "low", themes: ["memory", "playfulness"] },
  { id: "moment-v2-19", type: "moment", title: "Candid", instruction: "Take a candid picture of each other.", momentType: "playful", intensity: "low", themes: ["playfulness"] },
  { id: "moment-v2-20", type: "moment", title: "One Bite", instruction: "Feed them one bite from the picnic.", momentType: "playful", intensity: "low", themes: ["playfulness", "connection"] },
  { id: "moment-v2-21", type: "moment", title: "Make Them Laugh", instruction: "Make them laugh. You have 30 seconds.", seconds: 30, momentType: "playful", intensity: "low", themes: ["playfulness"] },
  { id: "moment-v2-22", type: "moment", title: "Same Memory", instruction: "Each choose your favourite memory together and say it at the same time on three.", momentType: "playful", intensity: "low", themes: ["memory", "playfulness"] },
  { id: "moment-v2-23", type: "moment", title: "Favourite Memory", instruction: "Tell them your favourite memory of the two of you so far.", momentType: "appreciation", intensity: "low", themes: ["memory", "appreciation"] },
  { id: "moment-v2-24", type: "moment", title: "Before Year End", instruction: "Each name one thing you want to experience together before the end of the year.", momentType: "vulnerability", intensity: "low", themes: ["future"] },
  { id: "moment-v2-25", type: "moment", title: "Read It Later", instruction: "Write them one sentence on paper. They can only read it after the date.", momentType: "vulnerability", intensity: "moderate", themes: ["vulnerability", "honesty"] },
  { id: "moment-v2-26", type: "moment", title: "Picnic Nickname", instruction: "Give each other a nickname based on today's picnic.", momentType: "playful", intensity: "low", themes: ["playfulness", "memory"] },
  { id: "moment-v2-27", type: "moment", title: "Never Change", instruction: "Tell them something about their character you hope never changes.", momentType: "appreciation", intensity: "low", themes: ["appreciation"] },
  { id: "moment-v2-28", type: "moment", title: "Quiet Together", instruction: "Hold hands and sit quietly together for one minute.", seconds: 60, momentType: "synchrony", intensity: "moderate", themes: ["connection"] },
  { id: "moment-v2-29", type: "moment", title: "Remember This", instruction: "Pick one thing about this exact moment you want to remember years from now.", momentType: "vulnerability", intensity: "low", themes: ["memory"] },
  { id: "moment-v2-30", type: "moment", title: "Your Choice", instruction: "Create a small moment for them right now.", momentType: "playful", intensity: "moderate", themes: ["playfulness", "connection"] },
  { id: "moment-v2-31", type: "moment", title: "Somewhere New", instruction: "Kiss them somewhere you don't normally kiss them: forehead, cheek, hand, or temple.", momentType: "romantic", intensity: "moderate", themes: ["connection"] },
  { id: "moment-v2-32", type: "moment", title: "First Attraction", instruction: "Pull them closer and tell them what first attracted you to them.", momentType: "romantic", intensity: "moderate", themes: ["attraction", "memory"] },
  { id: "moment-v2-33", type: "moment", title: "Hold Me", instruction: "Let them choose how they want to be held for the next 30 seconds.", seconds: 30, momentType: "touch", intensity: "moderate", themes: ["connection"] },
  { id: "moment-v2-34", type: "moment", title: "Trace Their Hand", instruction: "Trace their hand with your finger while you answer the next card.", momentType: "touch", intensity: "low", themes: ["connection"] },
  { id: "moment-v2-35", type: "moment", title: "Most Beautiful", instruction: "Tell them what you find most beautiful about them that has nothing to do with appearance.", momentType: "appreciation", intensity: "moderate", themes: ["appreciation"] },
  { id: "moment-v2-36", type: "moment", title: "Three Compliments", instruction: "Give them three compliments: one physical, one about their character, one about their mind.", momentType: "appreciation", intensity: "low", themes: ["appreciation"] },
  { id: "moment-v2-37", type: "moment", title: "Just Watch", instruction: "Put your phones away and just watch the sunset or scenery together for two minutes.", seconds: 120, momentType: "synchrony", intensity: "low", themes: ["connection"] },
  { id: "moment-v2-38", type: "moment", title: "Ask First", instruction: "Ask, 'Can I kiss you?' Even if you normally don't ask.", momentType: "romantic", intensity: "high", themes: ["connection", "honesty"], avoidWhen: { disclosureDemand: ["high"] } },
  { id: "moment-v2-39", type: "moment", title: "Recreate It", instruction: "Recreate your first hug, first picture, or first proper moment together.", momentType: "romantic", intensity: "moderate", themes: ["memory", "connection"] },
  { id: "moment-v2-40", type: "moment", title: "Let Them Choose", instruction: "Let them choose the next moment: kiss, cuddle, compliment, song, or memory.", momentType: "playful", intensity: "moderate", themes: ["playfulness", "connection"] }
];

/**
 * @typedef {Object} WildCardMetadata
 * @property {string} id - e.g. "wild-1".."wild-13".
 * @property {"wild"} type
 * @property {string} instruction - must match the live Wild Card's
 *   instruction exactly; the join key.
 * @property {number} [seconds]
 * @property {string} wildType - one of WILD_TYPES.
 * @property {string[]} themes - each must exist in THEMES.
 * @property {Object.<string,string[]>} [compatibleWith]
 * @property {Object.<string,string[]>} [avoidWhen]
 *
 * @type {WildCardMetadata[]}
 */
export const WILD_CARD_METADATA = [
  { id: "wild-1", type: "wild", instruction: "Ask and answer the next question in a different accent.", wildType: "play", themes: ["playfulness"] },
  { id: "wild-2", type: "wild", instruction: "Write down the three most important things to you in a relationship. Compare.", seconds: 30, wildType: "written_comparison", themes: ["values", "compatibility"] },
  { id: "wild-3", type: "wild", instruction: "Create your own question.", wildType: "generative", themes: [] },
  { id: "wild-4", type: "wild", instruction: "Based on what you learned, rewrite each other's dating app bios.", wildType: "play", themes: ["identity", "playfulness"] },
  { id: "wild-5", type: "wild", instruction: "Write down your number one goal for the next month. Compare.", wildType: "written_comparison", themes: ["goals", "future"] },
  { id: "wild-6", type: "wild", instruction: "Write down a dating pet peeve. Compare.", seconds: 30, wildType: "written_comparison", themes: ["playfulness"] },
  { id: "wild-7", type: "wild", instruction: "Show each other pictures of when you were kids.", wildType: "memory", themes: ["childhood", "memory"] },
  { id: "wild-8", type: "wild", instruction: "Draw your current mood. Compare.", wildType: "play", themes: ["playfulness", "identity"] },
  { id: "wild-9", type: "wild", instruction: "Draw your favorite memory together. Compare.", wildType: "memory", themes: ["memory", "playfulness"] },
  { id: "wild-10", type: "wild", instruction: "Give your partner a compliment you don't think they hear enough.", wildType: "appreciation", themes: ["appreciation"] },
  { id: "wild-11", type: "wild", instruction: "Ask a question you'd be too afraid to ask. Something you wouldn't normally dare to ask.", wildType: "vulnerability", themes: ["vulnerability", "honesty"], avoidWhen: { disclosureDemand: ["high"] } },
  { id: "wild-12", type: "wild", instruction: "Make an assumption about me.", wildType: "play", themes: ["playfulness", "perception"] },
  { id: "wild-13", type: "wild", instruction: "Write a message to each other on small pieces of paper. Open it after you've left.", wildType: "delayed", themes: ["vulnerability", "memory"] }
];

// id helpers, mirroring makeQuestionId's role -- population uses these
// instead of hand-typing ids, so the format can't drift entry to entry.
export function makeMomentId(sourceVolume, indexInSource) {
  return `moment-v${sourceVolume}-${indexInSource}`;
}
export function makeWildCardId(index) {
  return `wild-${index}`;
}

let momentIndex = null;
function getMomentIndex() {
  if (!momentIndex) {
    momentIndex = new Map();
    for (const entry of MOMENT_METADATA) momentIndex.set(entry.instruction, entry);
  }
  return momentIndex;
}
/** Look up a Moment's metadata by its exact instruction text. */
export function getMomentMetadata(instruction) {
  return getMomentIndex().get(instruction);
}

let wildCardIndex = null;
function getWildCardIndex() {
  if (!wildCardIndex) {
    wildCardIndex = new Map();
    for (const entry of WILD_CARD_METADATA) wildCardIndex.set(entry.instruction, entry);
  }
  return wildCardIndex;
}
/** Look up a Wild Card's metadata by its exact instruction text. */
export function getWildCardMetadata(instruction) {
  return getWildCardIndex().get(instruction);
}

function validateConstraintField(obj, label, entryId, problems) {
  if (obj == null) return;
  for (const key of Object.keys(obj)) {
    const vocab = QUESTION_FIELD_VOCABULARIES[key];
    if (!vocab) {
      problems.push(`"${entryId}" ${label} references unknown field "${key}"`);
      continue;
    }
    const values = obj[key];
    if (!Array.isArray(values)) {
      problems.push(`"${entryId}" ${label}.${key} must be an array of strings`);
      continue;
    }
    for (const v of values) {
      if (!vocab.includes(v)) {
        problems.push(`"${entryId}" ${label}.${key} has invalid value "${v}"`);
      }
    }
  }
}

/**
 * Pure check against the real, live Moments (pass VOLUME_ONE_MOMENTS
 * concat VOLUME_TWO_MOMENTS, or any array of objects carrying
 * `instruction`). Never throws -- see checkMomentMetadataIntegrity.
 * @param {{instruction: string}[]} content
 * @returns {string[]}
 */
export function validateMomentMetadata(content) {
  const problems = [];
  const contentInstructions = new Set(content.map(c => c.instruction));
  const metaInstructions = new Set();
  const seenIds = new Set();

  for (const e of MOMENT_METADATA) {
    if (e.type !== "moment") problems.push(`"${e.id}" has type "${e.type}", expected "moment"`);
    if (seenIds.has(e.id)) problems.push(`Duplicate moment id: "${e.id}"`);
    seenIds.add(e.id);

    metaInstructions.add(e.instruction);
    if (!contentInstructions.has(e.instruction)) {
      problems.push(`Moment entry "${e.id}" doesn't match any real Moment instruction.`);
    }
    if (!MOMENT_TYPES.includes(e.momentType)) {
      problems.push(`"${e.id}" has an invalid momentType: ${e.momentType}`);
    }
    if (!INTENSITY_LEVELS.includes(e.intensity)) {
      problems.push(`"${e.id}" has an invalid intensity: ${e.intensity}`);
    }
    for (const theme of e.themes || []) {
      if (!THEMES.includes(theme)) problems.push(`"${e.id}" uses theme "${theme}", which isn't in THEMES yet.`);
    }
    validateConstraintField(e.compatibleWith, "compatibleWith", e.id, problems);
    validateConstraintField(e.avoidWhen, "avoidWhen", e.id, problems);
  }

  for (const instr of contentInstructions) {
    if (!metaInstructions.has(instr)) {
      problems.push(`No moment metadata entry for instruction: "${instr}"`);
    }
  }
  return problems;
}

/**
 * Same as validateMomentMetadata, for Wild Cards.
 * @param {{instruction: string}[]} content
 * @returns {string[]}
 */
export function validateWildCardMetadata(content) {
  const problems = [];
  const contentInstructions = new Set(content.map(c => c.instruction));
  const metaInstructions = new Set();
  const seenIds = new Set();

  for (const e of WILD_CARD_METADATA) {
    if (e.type !== "wild") problems.push(`"${e.id}" has type "${e.type}", expected "wild"`);
    if (seenIds.has(e.id)) problems.push(`Duplicate wild card id: "${e.id}"`);
    seenIds.add(e.id);

    metaInstructions.add(e.instruction);
    if (!contentInstructions.has(e.instruction)) {
      problems.push(`Wild Card entry "${e.id}" doesn't match any real Wild Card instruction.`);
    }
    if (!WILD_TYPES.includes(e.wildType)) {
      problems.push(`"${e.id}" has an invalid wildType: ${e.wildType}`);
    }
    for (const theme of e.themes || []) {
      if (!THEMES.includes(theme)) problems.push(`"${e.id}" uses theme "${theme}", which isn't in THEMES yet.`);
    }
    validateConstraintField(e.compatibleWith, "compatibleWith", e.id, problems);
    validateConstraintField(e.avoidWhen, "avoidWhen", e.id, problems);
  }

  for (const instr of contentInstructions) {
    if (!metaInstructions.has(instr)) {
      problems.push(`No wild card metadata entry for instruction: "${instr}"`);
    }
  }
  return problems;
}

function reportOrThrow(problems, label) {
  if (problems.length === 0) return problems;
  const message = `${label} integrity check found ${problems.length} issue(s):\n` +
    problems.map(p => `  - ${p}`).join("\n");
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.DEV) {
    throw new Error(message);
  }
  console.error(message);
  return problems;
}

/** Dev throws, production logs and continues -- same split as questionMetadata.js. */
export function checkMomentMetadataIntegrity(content) {
  return reportOrThrow(validateMomentMetadata(content), "Moment metadata");
}
/** Dev throws, production logs and continues -- same split as questionMetadata.js. */
export function checkWildCardMetadataIntegrity(content) {
  return reportOrThrow(validateWildCardMetadata(content), "Wild card metadata");
}
