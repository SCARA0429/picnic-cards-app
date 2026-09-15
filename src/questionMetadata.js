// Phase 2B question metadata. Describes what a card structurally asks the
// couple to do -- never a prediction of how the conversation will feel.
// The questions themselves stay in main.jsx's VOLUME_ONE_CARDS /
// VOLUME_TWO_CARDS / VOLUME_THREE_CARDS and are untouched by this file.
// Metadata entries are matched to content by volume + category + exact
// question text (see validateMetadata / getQuestionMetadata), not by
// array position.
//
// Fully populated: V1 = 40, V2 = 82, V3 = 63 (185 total), validated with
// zero problems against the live content. First consumer: main.jsx's
// Respond mechanic, via getQuestionMetadata() below.

// The primary conversational action the card is designed around -- not an
// exhaustive list of everything the card touches. A card can be reflective,
// about the relationship, and opinion-shaped all at once; pick the one
// that best describes what answering it actually asks someone to do.
export const CONVERSATION_TYPES = [
  "story",
  "self_reflection",
  "opinion",
  "perspective",
  "relationship_reflection",
  "needs",
  "future",
  "values",
  "faith_reflection",
  "playful",
  "appreciation"
];

// Who is structurally expected to answer.
export const ANSWER_MODES = [
  "individual",
  "both",
  "partner_about_you",
  "guess_then_confirm"
];

// What should happen after the answer -- feeds the Respond mechanic.
// "none" means no response instruction is appropriate for this card.
export const RESPONSE_BEHAVIOURS = [
  "none",
  "share",
  "reflect_back",
  "tell_more",
  "affirm",
  "ask_follow_up",
  "guess_then_confirm"
];

// How much personal exposure the wording of the prompt asks for -- not a
// prediction of how emotionally intense the resulting conversation will be.
// "What are your goals for yourself?" is a disclosure, not necessarily a
// vulnerability. "What part of yourself do you feel I don't fully
// understand yet?" asks for more.
export const DISCLOSURE_DEMANDS = ["low", "moderate", "high"];

// Living, expandable vocabulary of thematic tags -- deliberately not a
// fixed enum. Population adds to this list as real clusters are found
// (e.g. the "becoming" motif that turned up across three categories)
// rather than guessing the full set upfront. A theme used on an entry
// must already exist here; validateMetadata checks this.
export const THEMES = [
  "accountability", "appreciation", "attraction", "boundaries", "career",
  "childhood", "children", "commitment", "communication", "compatibility",
  "compromise", "conflict", "connection", "daily_life", "differences",
  "faith", "family", "fear", "future", "goals", "growth", "heartbreak",
  "honesty", "identity", "independence", "love_languages", "marriage",
  "memory", "needs", "past_relationships", "perception", "playfulness",
  "pressure", "purpose", "quality_time", "reassurance", "repair",
  "sacrifice", "safety", "social_media", "support", "trust", "values",
  "vulnerability", "reciprocity"
];

/**
 * One entry per approved question. Empty until the population pass.
 *
 * @typedef {Object} QuestionMetadata
 * @property {string} id - e.g. "v1-playful-1", see makeQuestionId.
 * @property {1|2|3} volume
 * @property {string} category - must match the question's category exactly.
 * @property {string} q - must match the question text in VOLUME_*_CARDS exactly.
 * @property {string} conversationType - one of CONVERSATION_TYPES.
 * @property {string} answerMode - one of ANSWER_MODES.
 * @property {string} responseBehaviour - one of RESPONSE_BEHAVIOURS.
 * @property {string} disclosureDemand - one of DISCLOSURE_DEMANDS.
 * @property {boolean} faithSpecific
 * @property {string[]} themes - each must exist in THEMES.
 *
 * @type {QuestionMetadata[]}
 */
export const QUESTION_METADATA = [
  // ---------------------------------------------------------------------
  // Volume 1 (40)
  // ---------------------------------------------------------------------
  // Playful (7)
  { id: "v1-playful-1", volume: 1, category: "Playful", q: "What do you think I was like in high school? Explain.", conversationType: "perspective", answerMode: "partner_about_you", responseBehaviour: "none", disclosureDemand: "low", faithSpecific: false, themes: ["playfulness", "perception"] },
  { id: "v1-playful-2", volume: 1, category: "Playful", q: "What’s been your favourite age so far?", conversationType: "story", answerMode: "both", responseBehaviour: "none", disclosureDemand: "low", faithSpecific: false, themes: ["memory", "playfulness"] },
  { id: "v1-playful-3", volume: 1, category: "Playful", q: "What meal feels like home?", conversationType: "story", answerMode: "both", responseBehaviour: "none", disclosureDemand: "low", faithSpecific: false, themes: ["memory", "childhood"] },
  { id: "v1-playful-4", volume: 1, category: "Playful", q: "Have you ever ghosted someone? Why?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "share", disclosureDemand: "low", faithSpecific: false, themes: ["past_relationships", "playfulness"] },
  { id: "v1-playful-5", volume: 1, category: "Playful", q: "What’s the worst love language to date?", conversationType: "opinion", answerMode: "both", responseBehaviour: "none", disclosureDemand: "low", faithSpecific: false, themes: ["love_languages", "playfulness"] },
  { id: "v1-playful-6", volume: 1, category: "Playful", q: "Would you rather always be chased or always be the one pursuing?", conversationType: "opinion", answerMode: "both", responseBehaviour: "none", disclosureDemand: "low", faithSpecific: false, themes: ["attraction", "playfulness"] },
  { id: "v1-playful-7", volume: 1, category: "Playful", q: "Who do you think falls in love easier, you or me? Why?", conversationType: "opinion", answerMode: "both", responseBehaviour: "none", disclosureDemand: "low", faithSpecific: false, themes: ["attraction", "compatibility"] },

  // Getting to Know You (6)
  { id: "v1-getting_to_know_you-1", volume: 1, category: "Getting to Know You", q: "When do your friends usually come to you for advice?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "none", disclosureDemand: "low", faithSpecific: false, themes: ["identity", "support"] },
  { id: "v1-getting_to_know_you-2", volume: 1, category: "Getting to Know You", q: "What three qualities do you admire most in a person?", conversationType: "values", answerMode: "both", responseBehaviour: "none", disclosureDemand: "low", faithSpecific: false, themes: ["values"] },
  { id: "v1-getting_to_know_you-3", volume: 1, category: "Getting to Know You", q: "What do all of your best friends have in common?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "low", faithSpecific: false, themes: ["identity", "values"] },
  { id: "v1-getting_to_know_you-4", volume: 1, category: "Getting to Know You", q: "What childhood traditions still matter to you?", conversationType: "story", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "low", faithSpecific: false, themes: ["childhood", "family"] },
  { id: "v1-getting_to_know_you-5", volume: 1, category: "Getting to Know You", q: "What’s something you believe strongly about, even if you’ve never really had to explain why?", conversationType: "values", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["values"] },
  { id: "v1-getting_to_know_you-6", volume: 1, category: "Getting to Know You", q: "What’s a random thing you could talk about for hours?", conversationType: "story", answerMode: "both", responseBehaviour: "tell_more", disclosureDemand: "low", faithSpecific: false, themes: ["identity", "playfulness"] },

  // Deeper (8)
  { id: "v1-deeper-1", volume: 1, category: "Deeper", q: "How far are you from who you thought you would be right now?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["growth", "identity"] },
  { id: "v1-deeper-2", volume: 1, category: "Deeper", q: "What would your 5-year-old self say if they saw you now?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["childhood", "growth"] },
  { id: "v1-deeper-3", volume: 1, category: "Deeper", q: "What’s the biggest blessing in disguise you’ve experienced?", conversationType: "story", answerMode: "both", responseBehaviour: "affirm", disclosureDemand: "moderate", faithSpecific: false, themes: ["growth", "memory"] },
  { id: "v1-deeper-4", volume: 1, category: "Deeper", q: "What’s a moment recently where you felt genuinely glad to be alive?", conversationType: "story", answerMode: "both", responseBehaviour: "affirm", disclosureDemand: "low", faithSpecific: false, themes: ["memory", "appreciation"] },
  { id: "v1-deeper-5", volume: 1, category: "Deeper", q: "What’s one of the best decisions you’ve made? And one of the worst?", conversationType: "story", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["growth", "memory"] },
  { id: "v1-deeper-6", volume: 1, category: "Deeper", q: "What are you still trying to prove to yourself?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["identity", "vulnerability"] },
  { id: "v1-deeper-7", volume: 1, category: "Deeper", q: "What do you crave more of?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs"] },
  { id: "v1-deeper-8", volume: 1, category: "Deeper", q: "What’s been taking up the most space in your mind lately?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["vulnerability"] },

  // Relationships (13)
  { id: "v1-relationships-1", volume: 1, category: "Relationships", q: "What do you want to do differently in your next relationship?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["growth", "past_relationships"] },
  { id: "v1-relationships-2", volume: 1, category: "Relationships", q: "What do you think makes a relationship last?", conversationType: "opinion", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "low", faithSpecific: false, themes: ["compatibility", "commitment"] },
  { id: "v1-relationships-3", volume: 1, category: "Relationships", q: "What’s something you sometimes do when you’re hurt that you wish you handled differently?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["accountability", "vulnerability", "conflict"] },
  { id: "v1-relationships-4", volume: 1, category: "Relationships", q: "What’s the most important thing you learned from your last heartbreak?", conversationType: "story", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["heartbreak", "growth", "past_relationships"] },
  { id: "v1-relationships-5", volume: 1, category: "Relationships", q: "What do all of your exes or previous romantic interests have in common?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["past_relationships", "identity"] },
  { id: "v1-relationships-6", volume: 1, category: "Relationships", q: "What did your last relationship or talking stage teach you about yourself?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["past_relationships", "growth"] },
  { id: "v1-relationships-7", volume: 1, category: "Relationships", q: "What makes you feel genuinely cared for by someone?", conversationType: "needs", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs", "connection"] },
  { id: "v1-relationships-8", volume: 1, category: "Relationships", q: "What makes you start trusting someone?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["trust"] },
  { id: "v1-relationships-9", volume: 1, category: "Relationships", q: "What makes you lose trust in someone?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["trust"] },
  { id: "v1-relationships-10", volume: 1, category: "Relationships", q: "What’s something you need in a relationship that you didn’t always know you needed?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs", "growth"] },
  { id: "v1-relationships-11", volume: 1, category: "Relationships", q: "What does being pursued properly look like to you?", conversationType: "opinion", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "low", faithSpecific: false, themes: ["attraction", "needs"] },
  { id: "v1-relationships-12", volume: 1, category: "Relationships", q: "What’s something people often misunderstand about the way you love?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["identity", "love_languages"] },
  { id: "v1-relationships-13", volume: 1, category: "Relationships", q: "What scares you most about getting close to someone?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["fear", "vulnerability"] },

  // How You See Me (6)
  { id: "v1-how_you_see_me-1", volume: 1, category: "How You See Me", q: "What do you think I fear the most?", conversationType: "perspective", answerMode: "guess_then_confirm", responseBehaviour: "guess_then_confirm", disclosureDemand: "moderate", faithSpecific: false, themes: ["fear", "perception"] },
  { id: "v1-how_you_see_me-2", volume: 1, category: "How You See Me", q: "Do you think people who only know me from social media would be surprised by the real me? How?", conversationType: "perspective", answerMode: "partner_about_you", responseBehaviour: "ask_follow_up", disclosureDemand: "low", faithSpecific: false, themes: ["identity", "social_media", "perception"] },
  { id: "v1-how_you_see_me-3", volume: 1, category: "How You See Me", q: "What do you admire most about me?", conversationType: "appreciation", answerMode: "partner_about_you", responseBehaviour: "affirm", disclosureDemand: "low", faithSpecific: false, themes: ["appreciation"] },
  { id: "v1-how_you_see_me-4", volume: 1, category: "How You See Me", q: "What do you think my weakness is?", conversationType: "perspective", answerMode: "guess_then_confirm", responseBehaviour: "guess_then_confirm", disclosureDemand: "moderate", faithSpecific: false, themes: ["perception", "vulnerability"] },
  { id: "v1-how_you_see_me-5", volume: 1, category: "How You See Me", q: "What about me is hardest for you to understand?", conversationType: "perspective", answerMode: "partner_about_you", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["perception", "honesty"] },
  { id: "v1-how_you_see_me-6", volume: 1, category: "How You See Me", q: "What do you think is my gift?", conversationType: "perspective", answerMode: "guess_then_confirm", responseBehaviour: "guess_then_confirm", disclosureDemand: "low", faithSpecific: false, themes: ["appreciation", "perception"] },

  // ---------------------------------------------------------------------
  // Volume 2 (73)
  // ---------------------------------------------------------------------
  // Playful (7)
  { id: "v2-playful-1", volume: 2, category: "Playful", q: "What is one tiny thing I do that you secretly find ridiculously cute?", conversationType: "appreciation", answerMode: "partner_about_you", responseBehaviour: "affirm", disclosureDemand: "low", faithSpecific: false, themes: ["appreciation", "playfulness"] },
  { id: "v2-playful-2", volume: 2, category: "Playful", q: "If our relationship had a movie title right now, what would it be?", conversationType: "playful", answerMode: "both", responseBehaviour: "none", disclosureDemand: "low", faithSpecific: false, themes: ["playfulness", "identity"] },
  { id: "v2-playful-3", volume: 2, category: "Playful", q: "What is one date you think we would still laugh about when we are old?", conversationType: "story", answerMode: "both", responseBehaviour: "none", disclosureDemand: "low", faithSpecific: false, themes: ["memory", "playfulness"] },
  { id: "v2-playful-4", volume: 2, category: "Playful", q: "Which one of us would survive a reality show longer, and why?", conversationType: "playful", answerMode: "both", responseBehaviour: "none", disclosureDemand: "low", faithSpecific: false, themes: ["playfulness"] },
  { id: "v2-playful-5", volume: 2, category: "Playful", q: "What is something you want us to try together purely because it would be fun?", conversationType: "future", answerMode: "both", responseBehaviour: "share", disclosureDemand: "low", faithSpecific: false, themes: ["playfulness", "future"] },
  { id: "v2-playful-6", volume: 2, category: "Playful", q: "What is the most unserious thing that can instantly improve your mood?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "none", disclosureDemand: "low", faithSpecific: false, themes: ["playfulness", "identity"] },
  { id: "v2-playful-7", volume: 2, category: "Playful", q: "If you could replay one moment we have had together just for the feeling of it, which one?", conversationType: "story", answerMode: "both", responseBehaviour: "affirm", disclosureDemand: "low", faithSpecific: false, themes: ["memory", "connection"] },

  // Story & Identity (7)
  { id: "v2-story_identity-1", volume: 2, category: "Story & Identity", q: "What do I need to understand about the home you grew up in to understand who you are now?", conversationType: "story", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["childhood", "family", "identity"] },
  { id: "v2-story_identity-2", volume: 2, category: "Story & Identity", q: "Which values from your childhood do you want to keep, and which ones do you want to rewrite?", conversationType: "values", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["childhood", "values", "growth"] },
  { id: "v2-story_identity-3", volume: 2, category: "Story & Identity", q: "Who are you becoming that the younger version of you would not have expected?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["growth", "identity"] },
  { id: "v2-story_identity-4", volume: 2, category: "Story & Identity", q: "What part of your personality took you the longest to accept?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "high", faithSpecific: false, themes: ["identity", "vulnerability", "growth"] },
  { id: "v2-story_identity-5", volume: 2, category: "Story & Identity", q: "When in your life have you felt most like yourself?", conversationType: "story", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["identity", "memory"] },
  { id: "v2-story_identity-6", volume: 2, category: "Story & Identity", q: "What are three things you want your life to stand for, even if nobody applauds you for them?", conversationType: "values", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["values", "purpose"] },
  { id: "v2-story_identity-7", volume: 2, category: "Story & Identity", q: "What is something you are still unlearning about love, success, family or yourself?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "high", faithSpecific: false, themes: ["growth", "vulnerability", "identity"] },

  // Deeper (8)
  { id: "v2-deeper-1", volume: 2, category: "Deeper", q: "What are you currently afraid to admit you really want?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["vulnerability", "fear"] },
  { id: "v2-deeper-2", volume: 2, category: "Deeper", q: "What part of your life feels unresolved right now?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["vulnerability"] },
  { id: "v2-deeper-3", volume: 2, category: "Deeper", q: "When you feel rejected or unwanted, what version of you usually shows up?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["fear", "vulnerability", "identity"] },
  { id: "v2-deeper-4", volume: 2, category: "Deeper", q: "What do you do when you are hurting but do not know how to explain it?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["vulnerability", "communication"] },
  { id: "v2-deeper-5", volume: 2, category: "Deeper", q: "What is one hard thing you know you need to face instead of avoiding?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["accountability", "growth"] },
  { id: "v2-deeper-6", volume: 2, category: "Deeper", q: "What do you wish people understood about you without you having to explain it?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["identity", "honesty"] },
  { id: "v2-deeper-7", volume: 2, category: "Deeper", q: "What are you most proud of becoming, not achieving?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "affirm", disclosureDemand: "moderate", faithSpecific: false, themes: ["growth", "identity"] },
  { id: "v2-deeper-8", volume: 2, category: "Deeper", q: "What is one belief about yourself that you hope is not true?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["vulnerability", "identity"] },

  // Relationships (24)
  { id: "v2-relationships-1", volume: 2, category: "Relationships", q: "What makes you feel chosen in a relationship, not just liked?", conversationType: "needs", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs", "connection"] },
  { id: "v2-relationships-2", volume: 2, category: "Relationships", q: "What expectation of a partner do you have that you have never clearly said out loud?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["needs", "honesty", "vulnerability"] },
  { id: "v2-relationships-3", volume: 2, category: "Relationships", q: "How do you define a successful relationship?", conversationType: "values", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "low", faithSpecific: false, themes: ["compatibility", "commitment"] },
  { id: "v2-relationships-4", volume: 2, category: "Relationships", q: "When you need space, what does healthy space look like without making the other person feel shut out?", conversationType: "needs", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["boundaries", "needs", "independence"] },
  { id: "v2-relationships-5", volume: 2, category: "Relationships", q: "When we feel disconnected, what helps you find your way back to me?", conversationType: "relationship_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["connection", "repair"] },
  { id: "v2-relationships-6", volume: 2, category: "Relationships", q: "What is one small way I reach for connection that you notice, and one I might be missing from you?", conversationType: "appreciation", answerMode: "partner_about_you", responseBehaviour: "affirm", disclosureDemand: "moderate", faithSpecific: false, themes: ["connection", "appreciation", "needs"] },
  { id: "v2-relationships-7", volume: 2, category: "Relationships", q: "What does consistency mean to you in actual behaviour?", conversationType: "values", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "low", faithSpecific: false, themes: ["trust", "commitment"] },
  { id: "v2-relationships-8", volume: 2, category: "Relationships", q: "What would make love start to feel like pressure to you?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["boundaries", "pressure"] },
  { id: "v2-relationships-9", volume: 2, category: "Relationships", q: "What does a good apology need to include before you genuinely feel repaired with someone?", conversationType: "needs", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["repair", "conflict"] },
  { id: "v2-relationships-10", volume: 2, category: "Relationships", q: "What is something you need more of from me, and something you need less of?", conversationType: "needs", answerMode: "partner_about_you", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs", "honesty"] },
  { id: "v2-relationships-11", volume: 2, category: "Relationships", q: "What makes what we have more than just chemistry?", conversationType: "relationship_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["compatibility", "connection"] },
  { id: "v2-relationships-12", volume: 2, category: "Relationships", q: "Is there anything important you have been afraid to ask me because the answer might change how you see us?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["fear", "honesty", "vulnerability"] },
  { id: "v2-relationships-13", volume: 2, category: "Relationships", q: "Do you feel seen, accepted and chosen by me? Where do you feel that most, and where could I do better?", conversationType: "relationship_reflection", answerMode: "partner_about_you", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["connection", "accountability"] },
  { id: "v2-relationships-14", volume: 2, category: "Relationships", q: "What makes time together genuinely feel like quality time to you?", conversationType: "needs", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["quality_time", "needs"] },
  { id: "v2-relationships-15", volume: 2, category: "Relationships", q: "How do we love each other deeply without either of us losing ourselves?", conversationType: "relationship_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["independence", "connection"] },
  { id: "v2-relationships-16", volume: 2, category: "Relationships", q: "What side of yourself does this relationship bring out, and do you like that version of yourself?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["identity", "growth"] },
  { id: "v2-relationships-17", volume: 2, category: "Relationships", q: "When a problem is partly your fault, what helps you take responsibility without becoming defensive?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["accountability", "conflict"] },
  { id: "v2-relationships-18", volume: 2, category: "Relationships", q: "What do I bring into your life that you would genuinely miss?", conversationType: "appreciation", answerMode: "partner_about_you", responseBehaviour: "affirm", disclosureDemand: "low", faithSpecific: false, themes: ["appreciation", "connection"] },
  { id: "v2-relationships-19", volume: 2, category: "Relationships", q: "What’s something I do for you that you don’t think I realise matters to you?", conversationType: "appreciation", answerMode: "partner_about_you", responseBehaviour: "affirm", disclosureDemand: "moderate", faithSpecific: false, themes: ["appreciation", "connection"] },
  { id: "v2-relationships-20", volume: 2, category: "Relationships", q: "What’s something you do for me that you wish I noticed more?", conversationType: "needs", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs", "appreciation"] },
  { id: "v2-relationships-21", volume: 2, category: "Relationships", q: "Do you feel appreciated by me, or have some of your contributions become expected?", conversationType: "relationship_reflection", answerMode: "partner_about_you", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["appreciation", "honesty"] },
  { id: "v2-relationships-22", volume: 2, category: "Relationships", q: "Are there things you give in this relationship that don’t come naturally to you?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["sacrifice", "needs"] },
  { id: "v2-relationships-23", volume: 2, category: "Relationships", q: "What makes you feel like we’re actually a team?", conversationType: "relationship_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["connection", "compatibility"] },
  { id: "v2-relationships-24", volume: 2, category: "Relationships", q: "What would you notice first if I stopped showing up for you in the way I normally do?", conversationType: "needs", answerMode: "partner_about_you", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs", "appreciation"] },

  // Faith & Purpose (15)
  { id: "v2-faith_purpose-1", volume: 2, category: "Faith & Purpose", q: "How would you describe your relationship with God when nobody else is watching?", conversationType: "faith_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: true, themes: ["faith", "honesty"] },
  { id: "v2-faith_purpose-2", volume: 2, category: "Faith & Purpose", q: "Since we have been together, do you think this relationship has moved you closer to Christ, distracted you from Him, or neither? Why?", conversationType: "faith_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: true, themes: ["faith", "growth"] },
  { id: "v2-faith_purpose-3", volume: 2, category: "Faith & Purpose", q: "What does being spiritually aligned look like to you in everyday life, beyond simply both being Christian?", conversationType: "faith_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: true, themes: ["faith", "compatibility", "daily_life"] },
  { id: "v2-faith_purpose-4", volume: 2, category: "Faith & Purpose", q: "Where do you think our spiritual convictions are strongly aligned, and where might we see things differently?", conversationType: "faith_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: true, themes: ["faith", "compatibility", "differences"] },
  { id: "v2-faith_purpose-5", volume: 2, category: "Faith & Purpose", q: "What do you believe God has placed on your life to do or become in this season?", conversationType: "faith_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: true, themes: ["faith", "purpose"] },
  { id: "v2-faith_purpose-6", volume: 2, category: "Faith & Purpose", q: "If our individual callings ever pull us in different directions, how should we decide what faithfulness looks like?", conversationType: "future", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: true, themes: ["faith", "purpose", "future"] },
  { id: "v2-faith_purpose-7", volume: 2, category: "Faith & Purpose", q: "What would it look like for us to pray, serve and grow spiritually together without performing Christianity for each other?", conversationType: "future", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: true, themes: ["faith", "honesty", "growth"] },
  { id: "v2-faith_purpose-8", volume: 2, category: "Faith & Purpose", q: "What boundaries do you think would help protect our trust and our relationship with God?", conversationType: "values", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: true, themes: ["faith", "boundaries", "trust"] },
  { id: "v2-faith_purpose-9", volume: 2, category: "Faith & Purpose", q: "If we ever married, what would you want the purpose of our marriage to be besides making each other happy?", conversationType: "future", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: true, themes: ["faith", "marriage", "purpose"] },
  { id: "v2-faith_purpose-10", volume: 2, category: "Faith & Purpose", q: "What's one everyday moment recently where your faith actually showed up in how you acted?", conversationType: "story", answerMode: "both", responseBehaviour: "share", disclosureDemand: "low", faithSpecific: true, themes: ["faith", "daily_life"] },
  { id: "v2-faith_purpose-11", volume: 2, category: "Faith & Purpose", q: "What parts of my character and walk with God have you actually observed, rather than simply assumed about me?", conversationType: "perspective", answerMode: "partner_about_you", responseBehaviour: "affirm", disclosureDemand: "low", faithSpecific: true, themes: ["faith", "appreciation", "perception"] },
  { id: "v2-faith_purpose-12", volume: 2, category: "Faith & Purpose", q: "Who outside our relationship has permission to challenge us or tell us something we may not want to hear?", conversationType: "future", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["accountability", "support"] },
  { id: "v2-faith_purpose-13", volume: 2, category: "Faith & Purpose", q: "In what ways do we help each other grow spiritually, and are there ways we could do that more intentionally?", conversationType: "relationship_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: true, themes: ["faith", "growth", "support"] },
  { id: "v2-faith_purpose-14", volume: 2, category: "Faith & Purpose", q: "Is the pace of our relationship being driven more by character and clarity, or by chemistry and emotion?", conversationType: "relationship_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["compatibility", "attraction"] },
  { id: "v2-faith_purpose-15", volume: 2, category: "Faith & Purpose", q: "If this relationship never became marriage, what would you still want it to have produced in your walk with God?", conversationType: "faith_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: true, themes: ["faith", "growth", "marriage"] },

  // Future & Compatibility (12)
  { id: "v2-future_compatibility-1", volume: 2, category: "Future & Compatibility", q: "If nothing about our relationship changed for the next year, what would make you happy and what would eventually frustrate you?", conversationType: "future", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["future", "compatibility"] },
  { id: "v2-future_compatibility-2", volume: 2, category: "Future & Compatibility", q: "What kind of life are you actually trying to build over the next five to ten years?", conversationType: "future", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["future", "goals"] },
  { id: "v2-future_compatibility-3", volume: 2, category: "Future & Compatibility", q: "Which dreams of yours would you need a partner to actively protect and support?", conversationType: "future", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["future", "goals", "support"] },
  { id: "v2-future_compatibility-4", volume: 2, category: "Future & Compatibility", q: "What does a normal, ordinary happy week with your future partner look like?", conversationType: "future", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "low", faithSpecific: false, themes: ["future", "daily_life"] },
  { id: "v2-future_compatibility-5", volume: 2, category: "Future & Compatibility", q: "How important are marriage, children, career, ministry, family and location to the future you imagine?", conversationType: "future", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["future", "marriage", "children", "career", "family"] },
  { id: "v2-future_compatibility-6", volume: 2, category: "Future & Compatibility", q: "What differences between two people can stay differences, and which ones eventually become incompatibilities?", conversationType: "opinion", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "low", faithSpecific: false, themes: ["compatibility", "differences"] },
  { id: "v2-future_compatibility-7", volume: 2, category: "Future & Compatibility", q: "What would it mean for both of us to take ownership of this relationship instead of treating it casually?", conversationType: "relationship_reflection", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["commitment", "accountability"] },
  { id: "v2-future_compatibility-8", volume: 2, category: "Future & Compatibility", q: "Which difference between us do you think we would need to learn to live with rather than trying to fix?", conversationType: "relationship_reflection", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["differences", "compatibility"] },
  { id: "v2-future_compatibility-9", volume: 2, category: "Future & Compatibility", q: "Which core beliefs about God, church, marriage and family would we need to agree on to build a life together?", conversationType: "faith_reflection", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: true, themes: ["faith", "compatibility", "marriage", "family"] },
  { id: "v2-future_compatibility-10", volume: 2, category: "Future & Compatibility", q: "What would you still need clarity about before you could honestly say moving toward marriage would be wise?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["marriage", "future"] },
  { id: "v2-future_compatibility-11", volume: 2, category: "Future & Compatibility", q: "If we had children one day, what would you want them to learn about God from the way we lived at home?", conversationType: "faith_reflection", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: true, themes: ["faith", "children", "family"] },
  { id: "v2-future_compatibility-12", volume: 2, category: "Future & Compatibility", q: "What do you think would be hardest about building a life with me?", conversationType: "self_reflection", answerMode: "partner_about_you", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["future", "honesty", "compatibility"] },

  // How You See Me (9)
  { id: "v2-how_you_see_me-1", volume: 2, category: "How You See Me", q: "What do you think I need most from love, even when I do not ask for it directly?", conversationType: "perspective", answerMode: "partner_about_you", responseBehaviour: "affirm", disclosureDemand: "moderate", faithSpecific: false, themes: ["perception", "needs"] },
  { id: "v2-how_you_see_me-2", volume: 2, category: "How You See Me", q: "What do you think I am most afraid could happen between us?", conversationType: "perspective", answerMode: "guess_then_confirm", responseBehaviour: "guess_then_confirm", disclosureDemand: "high", faithSpecific: false, themes: ["perception", "fear"] },
  { id: "v2-how_you_see_me-3", volume: 2, category: "How You See Me", q: "Where do you think I overthink our relationship, and where do you think my concerns are fair?", conversationType: "perspective", answerMode: "partner_about_you", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["perception", "honesty"] },
  { id: "v2-how_you_see_me-4", volume: 2, category: "How You See Me", q: "What do you think I am trying to become in this season of my life?", conversationType: "perspective", answerMode: "partner_about_you", responseBehaviour: "affirm", disclosureDemand: "moderate", faithSpecific: false, themes: ["perception", "growth"] },
  { id: "v2-how_you_see_me-5", volume: 2, category: "How You See Me", q: "What is one way you think I love you really well?", conversationType: "appreciation", answerMode: "partner_about_you", responseBehaviour: "affirm", disclosureDemand: "low", faithSpecific: false, themes: ["appreciation", "love_languages"] },
  { id: "v2-how_you_see_me-6", volume: 2, category: "How You See Me", q: "What is one way you think I still need to learn how to love you better?", conversationType: "perspective", answerMode: "partner_about_you", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["love_languages", "growth", "honesty"] },
  { id: "v2-how_you_see_me-7", volume: 2, category: "How You See Me", q: "What do you think we bring out in each other, both good and difficult?", conversationType: "relationship_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["connection", "identity"] },
  { id: "v2-how_you_see_me-8", volume: 2, category: "How You See Me", q: "What do you think I value most about you?", conversationType: "perspective", answerMode: "guess_then_confirm", responseBehaviour: "guess_then_confirm", disclosureDemand: "low", faithSpecific: false, themes: ["appreciation", "perception"] },
  { id: "v2-how_you_see_me-9", volume: 2, category: "How You See Me", q: "What do you actually value most about your partner?", conversationType: "appreciation", answerMode: "partner_about_you", responseBehaviour: "affirm", disclosureDemand: "low", faithSpecific: false, themes: ["appreciation"] },

  // ---------------------------------------------------------------------
  // Volume 3 (63)
  // ---------------------------------------------------------------------
  // Love (10)
  { id: "v3-love-1", volume: 3, category: "Love", q: "What's a moment when you felt truly loved by someone — what made it land?", conversationType: "story", answerMode: "both", responseBehaviour: "affirm", disclosureDemand: "low", faithSpecific: false, themes: ["memory", "love_languages"] },
  { id: "v3-love-2", volume: 3, category: "Love", q: "What does it mean to love someone beyond just having feelings for them?", conversationType: "values", answerMode: "both", responseBehaviour: "affirm", disclosureDemand: "low", faithSpecific: false, themes: ["values", "commitment"] },
  { id: "v3-love-3", volume: 3, category: "Love", q: "What do you think are the foundations of a healthy relationship?", conversationType: "opinion", answerMode: "both", responseBehaviour: "affirm", disclosureDemand: "low", faithSpecific: false, themes: ["compatibility", "values"] },
  { id: "v3-love-4", volume: 3, category: "Love", q: "What does loyalty mean to you in a relationship?", conversationType: "values", answerMode: "both", responseBehaviour: "affirm", disclosureDemand: "low", faithSpecific: false, themes: ["trust", "commitment", "values"] },
  { id: "v3-love-5", volume: 3, category: "Love", q: "What does it mean to be teachable in a relationship?", conversationType: "values", answerMode: "both", responseBehaviour: "affirm", disclosureDemand: "low", faithSpecific: false, themes: ["growth", "values"] },
  { id: "v3-love-6", volume: 3, category: "Love", q: "Do you believe love requires change? If so, what kind of change?", conversationType: "opinion", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["growth", "values"] },
  { id: "v3-love-7", volume: 3, category: "Love", q: "How do you know when someone truly loves you?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "affirm", disclosureDemand: "low", faithSpecific: false, themes: ["love_languages", "needs"] },
  { id: "v3-love-8", volume: 3, category: "Love", q: "Do you think loving someone means accepting them as they are, or also challenging each other to grow?", conversationType: "opinion", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["growth", "values"] },
  { id: "v3-love-9", volume: 3, category: "Love", q: "What does commitment look like to you when things aren't going well?", conversationType: "values", answerMode: "both", responseBehaviour: "affirm", disclosureDemand: "moderate", faithSpecific: false, themes: ["commitment", "conflict"] },
  { id: "v3-love-10", volume: 3, category: "Love", q: "What makes love feel personal to you?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "affirm", disclosureDemand: "low", faithSpecific: false, themes: ["love_languages"] },

  // Knowing Each Other (8)
  { id: "v3-knowing_each_other-1", volume: 3, category: "Knowing Each Other", q: "What does it mean to truly know your partner?", conversationType: "values", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "low", faithSpecific: false, themes: ["connection", "values"] },
  { id: "v3-knowing_each_other-2", volume: 3, category: "Knowing Each Other", q: "Do you feel like you know me deeply? Why or why not?", conversationType: "relationship_reflection", answerMode: "partner_about_you", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["connection", "honesty"] },
  { id: "v3-knowing_each_other-3", volume: 3, category: "Knowing Each Other", q: "What are some things about me you still want to learn?", conversationType: "perspective", answerMode: "partner_about_you", responseBehaviour: "ask_follow_up", disclosureDemand: "low", faithSpecific: false, themes: ["connection", "appreciation"] },
  { id: "v3-knowing_each_other-4", volume: 3, category: "Knowing Each Other", q: "What parts of yourself do you feel I don't fully understand yet?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "high", faithSpecific: false, themes: ["identity", "vulnerability", "honesty"] },
  { id: "v3-knowing_each_other-5", volume: 3, category: "Knowing Each Other", q: "What are your goals for yourself over the next year?", conversationType: "future", answerMode: "both", responseBehaviour: "share", disclosureDemand: "moderate", faithSpecific: false, themes: ["goals", "future", "growth"] },
  { id: "v3-knowing_each_other-6", volume: 3, category: "Knowing Each Other", q: "What do you want your partner to understand about the person you're becoming?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["growth", "identity"] },
  { id: "v3-knowing_each_other-7", volume: 3, category: "Knowing Each Other", q: "What makes you feel genuinely seen and understood by your partner?", conversationType: "needs", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs", "connection"] },
  { id: "v3-knowing_each_other-8", volume: 3, category: "Knowing Each Other", q: "What makes you feel emotionally connected to your partner?", conversationType: "needs", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "moderate", faithSpecific: false, themes: ["connection", "needs"] },

  // Needs & Expectations (10)
  { id: "v3-needs_expectations-1", volume: 3, category: "Needs & Expectations", q: "What do you need from your partner to feel loved?", conversationType: "needs", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs", "love_languages"] },
  { id: "v3-needs_expectations-2", volume: 3, category: "Needs & Expectations", q: "What do you need from me specifically?", conversationType: "needs", answerMode: "partner_about_you", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs"] },
  { id: "v3-needs_expectations-3", volume: 3, category: "Needs & Expectations", q: "What do you think your responsibility is toward my needs?", conversationType: "relationship_reflection", answerMode: "partner_about_you", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs", "accountability"] },
  { id: "v3-needs_expectations-4", volume: 3, category: "Needs & Expectations", q: "What needs do you believe are your own responsibility and shouldn't be placed entirely on your partner?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs", "independence", "accountability"] },
  { id: "v3-needs_expectations-5", volume: 3, category: "Needs & Expectations", q: "How should two people handle it when their needs are different?", conversationType: "future", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "low", faithSpecific: false, themes: ["needs", "differences"] },
  { id: "v3-needs_expectations-6", volume: 3, category: "Needs & Expectations", q: "What does meeting each other halfway actually look like to you?", conversationType: "values", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "low", faithSpecific: false, themes: ["compromise", "needs"] },
  { id: "v3-needs_expectations-7", volume: 3, category: "Needs & Expectations", q: "Are there needs you have that you haven't communicated to me?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["needs", "honesty", "vulnerability"] },
  { id: "v3-needs_expectations-8", volume: 3, category: "Needs & Expectations", q: "Are there needs I've expressed that you feel you struggle to meet?", conversationType: "self_reflection", answerMode: "partner_about_you", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["needs", "honesty", "vulnerability"] },
  { id: "v3-needs_expectations-9", volume: 3, category: "Needs & Expectations", q: "How should we tell each other when we're not feeling loved or considered?", conversationType: "future", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["communication", "needs"] },
  { id: "v3-needs_expectations-10", volume: 3, category: "Needs & Expectations", q: "What does reassurance look like for you?", conversationType: "needs", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["reassurance", "needs"] },

  // Our Relationship (20)
  { id: "v3-our_relationship-1", volume: 3, category: "Our Relationship", q: "What do you think makes our relationship special?", conversationType: "appreciation", answerMode: "both", responseBehaviour: "affirm", disclosureDemand: "low", faithSpecific: false, themes: ["appreciation", "compatibility"] },
  { id: "v3-our_relationship-2", volume: 3, category: "Our Relationship", q: "What do you think we're doing well?", conversationType: "appreciation", answerMode: "both", responseBehaviour: "affirm", disclosureDemand: "low", faithSpecific: false, themes: ["appreciation"] },
  { id: "v3-our_relationship-3", volume: 3, category: "Our Relationship", q: "Where do you think we're struggling?", conversationType: "relationship_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["honesty", "conflict"] },
  { id: "v3-our_relationship-4", volume: 3, category: "Our Relationship", q: "Do you feel like we're growing together or becoming stagnant? Why?", conversationType: "relationship_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["growth", "compatibility"] },
  { id: "v3-our_relationship-5", volume: 3, category: "Our Relationship", q: "How do you honestly feel about our communication right now?", conversationType: "relationship_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["communication"] },
  { id: "v3-our_relationship-6", volume: 3, category: "Our Relationship", q: "Do you feel emotionally connected to me right now?", conversationType: "relationship_reflection", answerMode: "partner_about_you", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["connection"] },
  { id: "v3-our_relationship-7", volume: 3, category: "Our Relationship", q: "Do you feel like we're intentional about spending time with each other?", conversationType: "relationship_reflection", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "low", faithSpecific: false, themes: ["quality_time"] },
  { id: "v3-our_relationship-8", volume: 3, category: "Our Relationship", q: "What do you think we need more of in our relationship?", conversationType: "needs", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs", "growth"] },
  { id: "v3-our_relationship-9", volume: 3, category: "Our Relationship", q: "What do you think we need less of?", conversationType: "needs", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs", "growth"] },
  { id: "v3-our_relationship-10", volume: 3, category: "Our Relationship", q: "Is there anything you've been feeling in our relationship that you haven't known how to bring up?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["honesty", "vulnerability"] },
  { id: "v3-our_relationship-11", volume: 3, category: "Our Relationship", q: "What is one thing you think I could improve as your partner?", conversationType: "perspective", answerMode: "partner_about_you", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["accountability", "growth"] },
  { id: "v3-our_relationship-12", volume: 3, category: "Our Relationship", q: "What is one thing you think you could improve as my partner?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["accountability", "growth"] },
  { id: "v3-our_relationship-13", volume: 3, category: "Our Relationship", q: "What would make you feel more loved by me?", conversationType: "needs", answerMode: "partner_about_you", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs", "love_languages"] },
  { id: "v3-our_relationship-14", volume: 3, category: "Our Relationship", q: "What would make me feel more loved by you?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs", "love_languages"] },
  { id: "v3-our_relationship-15", volume: 3, category: "Our Relationship", q: "Where do you think we contribute differently rather than equally?", conversationType: "relationship_reflection", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "low", faithSpecific: false, themes: ["differences", "compatibility"] },
  { id: "v3-our_relationship-16", volume: 3, category: "Our Relationship", q: "Is there something you give me that you feel you don't receive back?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["needs", "honesty", "reciprocity"] },
  { id: "v3-our_relationship-17", volume: 3, category: "Our Relationship", q: "Is there something you receive from me that you don't think you give back?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["needs", "honesty", "reciprocity"] },
  { id: "v3-our_relationship-18", volume: 3, category: "Our Relationship", q: "Have you ever felt like your partner benefits from you more than you benefit from them?", conversationType: "relationship_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["needs", "honesty", "reciprocity"] },
  { id: "v3-our_relationship-19", volume: 3, category: "Our Relationship", q: "Is there something you currently do for me that you wouldn't want to keep doing forever?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["boundaries", "sacrifice"] },
  { id: "v3-our_relationship-20", volume: 3, category: "Our Relationship", q: "Have you ever taken something I do for you for granted?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "share", disclosureDemand: "moderate", faithSpecific: false, themes: ["appreciation", "honesty"] },

  // Deeper (15)
  { id: "v3-deeper-1", volume: 3, category: "Deeper", q: "Do you think loving someone is enough to make a relationship work? Why or why not?", conversationType: "opinion", answerMode: "both", responseBehaviour: "share", disclosureDemand: "low", faithSpecific: false, themes: ["values", "compatibility"] },
  { id: "v3-deeper-2", volume: 3, category: "Deeper", q: "What does choosing someone look like to you beyond saying “I love you”?", conversationType: "values", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["commitment", "values"] },
  { id: "v3-deeper-3", volume: 3, category: "Deeper", q: "If you know your partner has a need you struggle with, what do you think your responsibility is?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs", "accountability"] },
  { id: "v3-deeper-4", volume: 3, category: "Deeper", q: "When you realise you're hurting your partner unintentionally, what do you think love requires you to do?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["accountability", "repair"] },
  { id: "v3-deeper-5", volume: 3, category: "Deeper", q: "What does it mean to be a safe person for your partner?", conversationType: "values", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["safety", "trust"] },
  { id: "v3-deeper-6", volume: 3, category: "Deeper", q: "How do you want us to handle conflict when one of us feels hurt?", conversationType: "future", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["conflict", "repair"] },
  { id: "v3-deeper-7", volume: 3, category: "Deeper", q: "What does healthy communication look like when you're overwhelmed?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["communication", "needs"] },
  { id: "v3-deeper-8", volume: 3, category: "Deeper", q: "What do you think your partner should never have to beg for?", conversationType: "values", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["needs", "values"] },
  { id: "v3-deeper-9", volume: 3, category: "Deeper", q: "What does being intentional with someone you love look like?", conversationType: "values", answerMode: "both", responseBehaviour: "ask_follow_up", disclosureDemand: "low", faithSpecific: false, themes: ["commitment", "values"] },
  { id: "v3-deeper-10", volume: 3, category: "Deeper", q: "What do you think we owe each other in a relationship?", conversationType: "opinion", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["commitment", "accountability"] },
  { id: "v3-deeper-11", volume: 3, category: "Deeper", q: "What would make you look back a year from now and say, “Our relationship has genuinely grown”?", conversationType: "future", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["growth", "future"] },
  { id: "v3-deeper-12", volume: 3, category: "Deeper", q: "What are you willing to change about yourself for the sake of our relationship?", conversationType: "self_reflection", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["growth", "sacrifice"] },
  { id: "v3-deeper-13", volume: 3, category: "Deeper", q: "What are you unwilling to compromise on in a relationship?", conversationType: "values", answerMode: "both", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["boundaries", "values"] },
  { id: "v3-deeper-14", volume: 3, category: "Deeper", q: "What does being loved by me look like to you?", conversationType: "needs", answerMode: "partner_about_you", responseBehaviour: "reflect_back", disclosureDemand: "moderate", faithSpecific: false, themes: ["love_languages", "needs"] },
  { id: "v3-deeper-15", volume: 3, category: "Deeper", q: "Do you feel like I am loving you in the way you need to be loved? And if not, what would you want me to understand?", conversationType: "relationship_reflection", answerMode: "partner_about_you", responseBehaviour: "reflect_back", disclosureDemand: "high", faithSpecific: false, themes: ["love_languages", "honesty", "vulnerability"] }
];

let metadataIndex = null;
function getMetadataIndex() {
  if (!metadataIndex) {
    metadataIndex = new Map();
    for (const entry of QUESTION_METADATA) {
      metadataIndex.set(`${entry.volume}::${entry.category}::${entry.q}`, entry);
    }
  }
  return metadataIndex;
}

/**
 * Look up a question's metadata by volume + category + exact text -- the
 * same join key validateMetadata checks. Returns undefined on a miss
 * (e.g. a question with no metadata entry yet); callers must fall back
 * gracefully rather than assume a hit.
 *
 * @param {1|2|3} volume
 * @param {string} category
 * @param {string} q
 * @returns {QuestionMetadata|undefined}
 */
export function getQuestionMetadata(volume, category, q) {
  return getMetadataIndex().get(`${volume}::${category}::${q}`);
}

function categorySlug(category) {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

// Deterministic id for a question's position within its volume + category.
// Exported so the population pass generates ids the same way by hand
// instead of inventing its own format. Once assigned, an id is never
// reassigned, even if a category's order changes later.
export function makeQuestionId(volume, category, indexWithinCategory) {
  return `v${volume}-${categorySlug(category)}-${indexWithinCategory}`;
}

/**
 * Pure check: given the real content as a flat list of {volume, category, q}
 * (the caller flattens VOLUME_ONE_CARDS / VOLUME_TWO_CARDS / VOLUME_THREE_CARDS
 * with a volume number attached -- this file never imports main.jsx, to avoid
 * a circular import), returns a list of human-readable problem strings.
 * Never throws -- see checkMetadataIntegrity for the fail-loud/fail-safe split.
 *
 * @param {{volume: 1|2|3, category: string, q: string}[]} content
 * @returns {string[]}
 */
export function validateMetadata(content) {
  const problems = [];
  const keyOf = c => `${c.volume}::${c.category}::${c.q}`;
  const contentKeys = new Set(content.map(keyOf));
  const metadataKeys = new Set();
  const seenIds = new Set();

  for (const entry of QUESTION_METADATA) {
    if (seenIds.has(entry.id)) {
      problems.push(`Duplicate metadata id: "${entry.id}"`);
    }
    seenIds.add(entry.id);

    const key = keyOf(entry);
    metadataKeys.add(key);
    if (!contentKeys.has(key)) {
      problems.push(
        `Metadata entry "${entry.id}" doesn't match any question in the content ` +
        `(volume ${entry.volume}, category "${entry.category}").`
      );
    }

    if (!CONVERSATION_TYPES.includes(entry.conversationType)) {
      problems.push(`"${entry.id}" has an invalid conversationType: ${entry.conversationType}`);
    }
    if (!ANSWER_MODES.includes(entry.answerMode)) {
      problems.push(`"${entry.id}" has an invalid answerMode: ${entry.answerMode}`);
    }
    if (!RESPONSE_BEHAVIOURS.includes(entry.responseBehaviour)) {
      problems.push(`"${entry.id}" has an invalid responseBehaviour: ${entry.responseBehaviour}`);
    }
    if (!DISCLOSURE_DEMANDS.includes(entry.disclosureDemand)) {
      problems.push(`"${entry.id}" has an invalid disclosureDemand: ${entry.disclosureDemand}`);
    }
    if (typeof entry.faithSpecific !== "boolean") {
      problems.push(`"${entry.id}" has a non-boolean faithSpecific: ${entry.faithSpecific}`);
    }
    for (const theme of entry.themes || []) {
      if (!THEMES.includes(theme)) {
        problems.push(`"${entry.id}" uses theme "${theme}", which isn't in THEMES yet.`);
      }
    }
  }

  for (const key of contentKeys) {
    if (!metadataKeys.has(key)) {
      const [volume, category, q] = key.split("::");
      problems.push(`No metadata entry for question (volume ${volume}, category "${category}"): "${q}"`);
    }
  }

  return problems;
}

/**
 * Dev vs. production split, per sign-off: a metadata mistake should never
 * be able to take down the app for a couple mid-date. In dev, fail loudly
 * (throw) so a mismatch is impossible to miss while populating/editing. In
 * production (or anywhere import.meta.env isn't available, e.g. a plain
 * Node script), log and continue -- the app runs on whatever metadata is
 * actually valid rather than crashing. Not wired into main.jsx yet.
 *
 * @param {{volume: 1|2|3, category: string, q: string}[]} content
 * @returns {string[]} the same problems validateMetadata found
 */
export function checkMetadataIntegrity(content) {
  const problems = validateMetadata(content);
  if (problems.length === 0) return problems;

  const message =
    `Question metadata integrity check found ${problems.length} issue(s):\n` +
    problems.map(p => `  - ${p}`).join("\n");

  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.DEV) {
    throw new Error(message);
  }
  console.error(message);
  return problems;
}
