import React, { useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { getQuestionMetadata } from "./questionMetadata.js";
import { getMomentMetadata, getWildCardMetadata } from "./momentMetadata.js";

function cardsFromText(category, text) {
  return text.trim().split("\n").map(q => ({ category, q: q.trim() }));
}

const VOLUME_ONE_CARDS = [
  {
    "category": "Playful",
    "q": "What do you think I was like in high school? Explain."
  },
  {
    "category": "Playful",
    "q": "What’s been your favourite age so far?"
  },
  {
    "category": "Playful",
    "q": "What meal feels like home?"
  },
  {
    "category": "Playful",
    "q": "Have you ever ghosted someone? Why?"
  },
  {
    "category": "Playful",
    "q": "What’s the worst love language to date?"
  },
  {
    "category": "Playful",
    "q": "Would you rather always be chased or always be the one pursuing?"
  },
  {
    "category": "Playful",
    "q": "Who do you think falls in love easier, you or me? Why?"
  },
  {
    "category": "Getting to Know You",
    "q": "When do your friends usually come to you for advice?"
  },
  {
    "category": "Getting to Know You",
    "q": "What three qualities do you admire most in a person?"
  },
  {
    "category": "Getting to Know You",
    "q": "What do all of your best friends have in common?"
  },
  {
    "category": "Getting to Know You",
    "q": "What childhood traditions still matter to you?"
  },
  {
    "category": "Getting to Know You",
    "q": "What’s something you believe strongly about, even if you’ve never really had to explain why?"
  },
  {
    "category": "Getting to Know You",
    "q": "What’s a random thing you could talk about for hours?"
  },
  {
    "category": "Deeper",
    "q": "How far are you from who you thought you would be right now?"
  },
  {
    "category": "Deeper",
    "q": "What would your 5-year-old self say if they saw you now?"
  },
  {
    "category": "Deeper",
    "q": "What’s the biggest blessing in disguise you’ve experienced?"
  },
  {
    "category": "Deeper",
    "q": "What’s a moment recently where you felt genuinely glad to be alive?"
  },
  {
    "category": "Deeper",
    "q": "What’s one of the best decisions you’ve made? And one of the worst?"
  },
  {
    "category": "Deeper",
    "q": "What are you still trying to prove to yourself?"
  },
  {
    "category": "Deeper",
    "q": "What do you crave more of?"
  },
  {
    "category": "Deeper",
    "q": "What’s been taking up the most space in your mind lately?"
  },
  {
    "category": "Relationships",
    "q": "What do you want to do differently in your next relationship?"
  },
  {
    "category": "Relationships",
    "q": "What do you think makes a relationship last?"
  },
  {
    "category": "Relationships",
    "q": "What’s something you sometimes do when you’re hurt that you wish you handled differently?"
  },
  {
    "category": "Relationships",
    "q": "What’s the most important thing you learned from your last heartbreak?"
  },
  {
    "category": "Relationships",
    "q": "What do all of your exes or previous romantic interests have in common?"
  },
  {
    "category": "Relationships",
    "q": "What did your last relationship or talking stage teach you about yourself?"
  },
  {
    "category": "Relationships",
    "q": "What makes you feel genuinely cared for by someone?"
  },
  {
    "category": "Relationships",
    "q": "What makes you start trusting someone?"
  },
  {
    "category": "Relationships",
    "q": "What makes you lose trust in someone?"
  },
  {
    "category": "Relationships",
    "q": "What’s something you need in a relationship that you didn’t always know you needed?"
  },
  {
    "category": "Relationships",
    "q": "What does being pursued properly look like to you?"
  },
  {
    "category": "Relationships",
    "q": "What’s something people often misunderstand about the way you love?"
  },
  {
    "category": "Relationships",
    "q": "What scares you most about getting close to someone?"
  },
  {
    "category": "How You See Me",
    "q": "What do you think I fear the most?"
  },
  {
    "category": "How You See Me",
    "q": "Do you think people who only know me from social media would be surprised by the real me? How?"
  },
  {
    "category": "How You See Me",
    "q": "What do you admire most about me?"
  },
  {
    "category": "How You See Me",
    "q": "What do you think my weakness is?"
  },
  {
    "category": "How You See Me",
    "q": "What about me is hardest for you to understand?"
  },
  {
    "category": "How You See Me",
    "q": "What do you think is my gift?"
  }
];

const VOLUME_TWO_CARDS = [
  {
    "category": "Playful",
    "q": "What is one tiny thing I do that you secretly find ridiculously cute?"
  },
  {
    "category": "Playful",
    "q": "If our relationship had a movie title right now, what would it be?"
  },
  {
    "category": "Playful",
    "q": "What is one date you think we would still laugh about when we are old?"
  },
  {
    "category": "Playful",
    "q": "Which one of us would survive a reality show longer, and why?"
  },
  {
    "category": "Playful",
    "q": "What is something you want us to try together purely because it would be fun?"
  },
  {
    "category": "Playful",
    "q": "What is the most unserious thing that can instantly improve your mood?"
  },
  {
    "category": "Playful",
    "q": "If you could replay one moment we have had together just for the feeling of it, which one?"
  },
  {
    "category": "Story & Identity",
    "q": "What do I need to understand about the home you grew up in to understand who you are now?"
  },
  {
    "category": "Story & Identity",
    "q": "Which values from your childhood do you want to keep, and which ones do you want to rewrite?"
  },
  {
    "category": "Story & Identity",
    "q": "Who are you becoming that the younger version of you would not have expected?"
  },
  {
    "category": "Story & Identity",
    "q": "What part of your personality took you the longest to accept?"
  },
  {
    "category": "Story & Identity",
    "q": "When in your life have you felt most like yourself?"
  },
  {
    "category": "Story & Identity",
    "q": "What are three things you want your life to stand for, even if nobody applauds you for them?"
  },
  {
    "category": "Story & Identity",
    "q": "What is something you are still unlearning about love, success, family or yourself?"
  },
  {
    "category": "Deeper",
    "q": "What are you currently afraid to admit you really want?"
  },
  {
    "category": "Deeper",
    "q": "What part of your life feels unresolved right now?"
  },
  {
    "category": "Deeper",
    "q": "When you feel rejected or unwanted, what version of you usually shows up?"
  },
  {
    "category": "Deeper",
    "q": "What do you do when you are hurting but do not know how to explain it?"
  },
  {
    "category": "Deeper",
    "q": "What is one hard thing you know you need to face instead of avoiding?"
  },
  {
    "category": "Deeper",
    "q": "What do you wish people understood about you without you having to explain it?"
  },
  {
    "category": "Deeper",
    "q": "What are you most proud of becoming, not achieving?"
  },
  {
    "category": "Deeper",
    "q": "What is one belief about yourself that you hope is not true?"
  },
  {
    "category": "Relationships",
    "q": "What makes you feel chosen in a relationship, not just liked?"
  },
  {
    "category": "Relationships",
    "q": "What expectation of a partner do you have that you have never clearly said out loud?"
  },
  {
    "category": "Relationships",
    "q": "How do you define a successful relationship?"
  },
  {
    "category": "Relationships",
    "q": "When you need space, what does healthy space look like without making the other person feel shut out?"
  },
  {
    "category": "Relationships",
    "q": "When we feel disconnected, what helps you find your way back to me?"
  },
  {
    "category": "Relationships",
    "q": "What is one small way I reach for connection that you notice, and one I might be missing from you?"
  },
  {
    "category": "Relationships",
    "q": "What does consistency mean to you in actual behaviour?"
  },
  {
    "category": "Relationships",
    "q": "What would make love start to feel like pressure to you?"
  },
  {
    "category": "Relationships",
    "q": "What does a good apology need to include before you genuinely feel repaired with someone?"
  },
  {
    "category": "Relationships",
    "q": "What is something you need more of from me, and something you need less of?"
  },
  {
    "category": "Relationships",
    "q": "What makes what we have more than just chemistry?"
  },
  {
    "category": "Relationships",
    "q": "Is there anything important you have been afraid to ask me because the answer might change how you see us?"
  },
  {
    "category": "Relationships",
    "q": "Do you feel seen, accepted and chosen by me? Where do you feel that most, and where could I do better?"
  },
  {
    "category": "Relationships",
    "q": "What makes time together genuinely feel like quality time to you?"
  },
  {
    "category": "Relationships",
    "q": "How do we love each other deeply without either of us losing ourselves?"
  },
  {
    "category": "Relationships",
    "q": "What side of yourself does this relationship bring out, and do you like that version of yourself?"
  },
  {
    "category": "Relationships",
    "q": "When a problem is partly your fault, what helps you take responsibility without becoming defensive?"
  },
  {
    "category": "Relationships",
    "q": "What do I bring into your life that you would genuinely miss?"
  },
  {
    "category": "Relationships",
    "q": "What’s something I do for you that you don’t think I realise matters to you?"
  },
  {
    "category": "Relationships",
    "q": "What’s something you do for me that you wish I noticed more?"
  },
  {
    "category": "Relationships",
    "q": "Do you feel appreciated by me, or have some of your contributions become expected?"
  },
  {
    "category": "Relationships",
    "q": "Are there things you give in this relationship that don’t come naturally to you?"
  },
  {
    "category": "Relationships",
    "q": "What makes you feel like we’re actually a team?"
  },
  {
    "category": "Relationships",
    "q": "What would you notice first if I stopped showing up for you in the way I normally do?"
  },
  {
    "category": "Faith & Purpose",
    "q": "How would you describe your relationship with God when nobody else is watching?"
  },
  {
    "category": "Faith & Purpose",
    "q": "Since we have been together, do you think this relationship has moved you closer to Christ, distracted you from Him, or neither? Why?"
  },
  {
    "category": "Faith & Purpose",
    "q": "What does being spiritually aligned look like to you in everyday life, beyond simply both being Christian?"
  },
  {
    "category": "Faith & Purpose",
    "q": "Where do you think our spiritual convictions are strongly aligned, and where might we see things differently?"
  },
  {
    "category": "Faith & Purpose",
    "q": "What do you believe God has placed on your life to do or become in this season?"
  },
  {
    "category": "Faith & Purpose",
    "q": "If our individual callings ever pull us in different directions, how should we decide what faithfulness looks like?"
  },
  {
    "category": "Faith & Purpose",
    "q": "What would it look like for us to pray, serve and grow spiritually together without performing Christianity for each other?"
  },
  {
    "category": "Faith & Purpose",
    "q": "What boundaries do you think would help protect our trust and our relationship with God?"
  },
  {
    "category": "Faith & Purpose",
    "q": "If we ever married, what would you want the purpose of our marriage to be besides making each other happy?"
  },
  {
    "category": "Faith & Purpose",
    "q": "What's one everyday moment recently where your faith actually showed up in how you acted?"
  },
  {
    "category": "Faith & Purpose",
    "q": "What parts of my character and walk with God have you actually observed, rather than simply assumed about me?"
  },
  {
    "category": "Faith & Purpose",
    "q": "Who outside our relationship has permission to challenge us or tell us something we may not want to hear?"
  },
  {
    "category": "Faith & Purpose",
    "q": "In what ways do we help each other grow spiritually, and are there ways we could do that more intentionally?"
  },
  {
    "category": "Faith & Purpose",
    "q": "Is the pace of our relationship being driven more by character and clarity, or by chemistry and emotion?"
  },
  {
    "category": "Faith & Purpose",
    "q": "If this relationship never became marriage, what would you still want it to have produced in your walk with God?"
  },
  {
    "category": "Future & Compatibility",
    "q": "If nothing about our relationship changed for the next year, what would make you happy and what would eventually frustrate you?"
  },
  {
    "category": "Future & Compatibility",
    "q": "What kind of life are you actually trying to build over the next five to ten years?"
  },
  {
    "category": "Future & Compatibility",
    "q": "Which dreams of yours would you need a partner to actively protect and support?"
  },
  {
    "category": "Future & Compatibility",
    "q": "What does a normal, ordinary happy week with your future partner look like?"
  },
  {
    "category": "Future & Compatibility",
    "q": "How important are marriage, children, career, ministry, family and location to the future you imagine?"
  },
  {
    "category": "Future & Compatibility",
    "q": "What differences between two people can stay differences, and which ones eventually become incompatibilities?"
  },
  {
    "category": "Future & Compatibility",
    "q": "What would it mean for both of us to take ownership of this relationship instead of treating it casually?"
  },
  {
    "category": "Future & Compatibility",
    "q": "Which difference between us do you think we would need to learn to live with rather than trying to fix?"
  },
  {
    "category": "Future & Compatibility",
    "q": "Which core beliefs about God, church, marriage and family would we need to agree on to build a life together?"
  },
  {
    "category": "Future & Compatibility",
    "q": "What would you still need clarity about before you could honestly say moving toward marriage would be wise?"
  },
  {
    "category": "Future & Compatibility",
    "q": "If we had children one day, what would you want them to learn about God from the way we lived at home?"
  },
  {
    "category": "Future & Compatibility",
    "q": "What do you think would be hardest about building a life with me?"
  },
  {
    "category": "How You See Me",
    "q": "What do you think I need most from love, even when I do not ask for it directly?"
  },
  {
    "category": "How You See Me",
    "q": "What do you think I am most afraid could happen between us?"
  },
  {
    "category": "How You See Me",
    "q": "Where do you think I overthink our relationship, and where do you think my concerns are fair?"
  },
  {
    "category": "How You See Me",
    "q": "What do you think I am trying to become in this season of my life?"
  },
  {
    "category": "How You See Me",
    "q": "What is one way you think I love you really well?"
  },
  {
    "category": "How You See Me",
    "q": "What is one way you think I still need to learn how to love you better?"
  },
  {
    "category": "How You See Me",
    "q": "What do you think we bring out in each other, both good and difficult?"
  },
  {
    "category": "How You See Me",
    "q": "What do you think I value most about you?"
  },
  {
    "category": "How You See Me",
    "q": "What do you actually value most about your partner?"
  }
];

const VOLUME_THREE_CARDS = [
  ...cardsFromText("Love", `
What's a moment when you felt truly loved by someone — what made it land?
What does it mean to love someone beyond just having feelings for them?
What do you think are the foundations of a healthy relationship?
What does loyalty mean to you in a relationship?
What does it mean to be teachable in a relationship?
Do you believe love requires change? If so, what kind of change?
How do you know when someone truly loves you?
Do you think loving someone means accepting them as they are, or also challenging each other to grow?
What does commitment look like to you when things aren't going well?
What makes love feel personal to you?
  `),
  ...cardsFromText("Knowing Each Other", `
What does it mean to truly know your partner?
Do you feel like you know me deeply? Why or why not?
What are some things about me you still want to learn?
What parts of yourself do you feel I don't fully understand yet?
What are your goals for yourself over the next year?
What do you want your partner to understand about the person you're becoming?
What makes you feel genuinely seen and understood by your partner?
What makes you feel emotionally connected to your partner?
  `),
  ...cardsFromText("Needs & Expectations", `
What do you need from your partner to feel loved?
What do you need from me specifically?
What do you think your responsibility is toward my needs?
What needs do you believe are your own responsibility and shouldn't be placed entirely on your partner?
How should two people handle it when their needs are different?
What does meeting each other halfway actually look like to you?
Are there needs you have that you haven't communicated to me?
Are there needs I've expressed that you feel you struggle to meet?
How should we tell each other when we're not feeling loved or considered?
What does reassurance look like for you?
  `),
  ...cardsFromText("Our Relationship", `
What do you think makes our relationship special?
What do you think we're doing well?
Where do you think we're struggling?
Do you feel like we're growing together or becoming stagnant? Why?
How do you honestly feel about our communication right now?
Do you feel emotionally connected to me right now?
Do you feel like we're intentional about spending time with each other?
What do you think we need more of in our relationship?
What do you think we need less of?
Is there anything you've been feeling in our relationship that you haven't known how to bring up?
What is one thing you think I could improve as your partner?
What is one thing you think you could improve as my partner?
What would make you feel more loved by me?
What would make me feel more loved by you?
Where do you think we contribute differently rather than equally?
Is there something you give me that you feel you don't receive back?
Is there something you receive from me that you don't think you give back?
Have you ever felt like your partner benefits from you more than you benefit from them?
Is there something you currently do for me that you wouldn't want to keep doing forever?
Have you ever taken something I do for you for granted?
  `),
  ...cardsFromText("Deeper", `
Do you think loving someone is enough to make a relationship work? Why or why not?
What does choosing someone look like to you beyond saying “I love you”?
If you know your partner has a need you struggle with, what do you think your responsibility is?
When you realise you're hurting your partner unintentionally, what do you think love requires you to do?
What does it mean to be a safe person for your partner?
How do you want us to handle conflict when one of us feels hurt?
What does healthy communication look like when you're overwhelmed?
What do you think your partner should never have to beg for?
What does being intentional with someone you love look like?
What do you think we owe each other in a relationship?
What would make you look back a year from now and say, “Our relationship has genuinely grown”?
What are you willing to change about yourself for the sake of our relationship?
What are you unwilling to compromise on in a relationship?
What does being loved by me look like to you?
Do you feel like I am loving you in the way you need to be loved? And if not, what would you want me to understand?
  `)
];

const VOLUME_ONE_MOMENTS = [
  { title: "Lock Eyes", instruction: "Look into each other’s eyes without talking.", seconds: 40, momentType: "synchrony" },
  { title: "Hold Hands", instruction: "Hold hands and keep playing like this for the rest of the game. Either person can stop whenever they want.", ongoing: true, momentType: "touch" },
  { title: "Eyes Closed", instruction: "Close your eyes, hold hands, and stay quiet together.", seconds: 30, momentType: "synchrony" },
  { title: "Long Hug", instruction: "Give each other a proper hug. No rushing it.", seconds: 30, momentType: "touch", optional: true },
  { title: "Cuddle Break", instruction: "Get comfortable and cuddle up. Keep playing the game like this for the rest of the game.", ongoing: true, momentType: "romantic", optional: true },
  { title: "Forehead Touch", instruction: "Rest your foreheads together and stay there while continuing the game. Either person can stop when they want.", ongoing: true, momentType: "touch" },
  { title: "Compliment Close-Up", instruction: "Hold hands and tell each other one thing you genuinely admire about the other person.", seconds: 45, momentType: "appreciation" },
  { title: "Silent Appreciation", instruction: "Look at each other and think of one thing you’re grateful for about this moment. Share it when the timer ends.", seconds: 30, momentType: "appreciation" },
  { title: "Lean On Me", instruction: "Lean against each other or rest your head on your partner while you keep playing. Either person can stop whenever they want.", ongoing: true, momentType: "touch" },
  { title: "Kiss", instruction: "If you both want to, share a kiss. No timer pressure, just enjoy the moment.", momentType: "romantic", optional: true },
  { title: "Hand Trace", instruction: "Hold hands and slowly trace the lines of each other’s palm.", seconds: 30, momentType: "touch" },
  { title: "Close & Breathe", instruction: "Sit close, hold hands, and take a few slow breaths together.", seconds: 30, momentType: "synchrony" },
  { title: "Follow My Breath", instruction: "Sit facing each other and hold hands. Breathe slowly together without trying too hard to match each other. Just notice the rhythm.", seconds: 45, momentType: "synchrony" },
  { title: "No Words", instruction: "Look into each other’s eyes without speaking. Smiling and laughing are allowed. Just stay present.", seconds: 45, momentType: "synchrony" },
  { title: "Three Things", instruction: "Take turns telling each other three things you genuinely like or appreciate about the other person. No interrupting and no rejecting the compliment.", momentType: "appreciation" },
  { title: "Tell Me More", instruction: "One person shares something that's been on their mind lately. The other person listens without fixing it. Ask 'Tell me more' and give them your full attention. Afterwards, switch roles.", seconds: 60, momentType: "vulnerability" },
  { title: "Your Turn To Be Held", instruction: "One person relaxes into a hug while the other simply holds them. Switch halfway.", seconds: 40, momentType: "touch", optional: true },
  { title: "Face Touch", instruction: "If you're both comfortable, gently hold or stroke each other's cheek while looking at one another.", seconds: 20, momentType: "touch", optional: true },
  { title: "Favourite Detail", instruction: "Look at each other closely. Tell the other person one small physical or personality detail you've noticed about them that you really like.", momentType: "appreciation" },
  { title: "Our Song Moment", instruction: "Choose a song. Hold each other, sway together, or just sit close. Don't talk until the timer ends.", seconds: 60, momentType: "synchrony", optional: true },
  { title: "Safe With You", instruction: "Take turns finishing this sentence: 'Something that would make me feel safer opening up to you is...' The other person just listens.", momentType: "vulnerability" },
  { title: "What Do You Need?", instruction: "Ask each other: 'Right now, would you rather have a hug, a kiss, hold hands, cuddle, sit close, or have some space?' Respect whatever they choose.", momentType: "appreciation" },
  { title: "Kiss Me Slowly", instruction: "If you both want to, share a slow kiss. There's nothing to complete and no timer. Stop whenever either of you wants.", seconds: 30, momentType: "romantic", optional: true },
  { title: "Closer", instruction: "Sit as close as feels comfortable, hold each other, and play the game while staying there. Either person can stop whenever they want.", ongoing: true, momentType: "touch", optional: true },
  { title: "Kiss, Your Way", instruction: "If you both want to kiss, kiss however feels natural to both of you. You decide what kind of kiss and when to stop.", momentType: "romantic", optional: true },
  { title: "Your Choice", instruction: "Choose one together: hold hands, forehead kiss, cheek kiss, hug, cuddle, kiss, sit close, or skip.", momentType: "playful" },
  { title: "Listen To Me", instruction: "One person talks for one minute about something important to them. The other person doesn't interrupt, advise, or solve anything. Just listen.", seconds: 60, momentType: "vulnerability" },
  { title: "Heartbeat", instruction: "If you're both comfortable, rest your head against your partner's chest and listen to their heartbeat. Switch halfway.", seconds: 40, momentType: "touch", optional: true },
  { title: "One Thing I See In You", instruction: "Finish the sentence: 'One thing I see in you that I don't think you always see in yourself is...' ", momentType: "appreciation" },
  { title: "Thank You For...", instruction: "Look at each other and finish the sentence: 'Something I want to thank you for is...'", momentType: "appreciation" },
  { title: "Hands, No Words", instruction: "Hold both of each other's hands. Don't talk. Keep playing as you stay there together.", ongoing: true, momentType: "synchrony" },
  { title: "Make Me Smile", instruction: "You have 30 seconds to make the other person smile without touching your phone.", seconds: 30, momentType: "playful" },
  { title: "Remember This", instruction: "Take a quiet moment and look around. Notice where you are, what the other person looks like, and how this moment feels. Then tell each other one thing you want to remember about today.", seconds: 30, momentType: "vulnerability" },
  { title: "One Question", instruction: "You may ask the other person one question you've genuinely wanted to ask them but haven't yet.", momentType: "vulnerability" },
  { title: "I Feel Closest To You When...", instruction: "Take turns finishing the sentence: 'I feel closest to you when...'", momentType: "vulnerability" }
];

const VOLUME_TWO_MOMENTS = [
  { title: "Come Here", instruction: "One long hug. No talking.", momentType: "touch" },
  { title: "Hold Hands", instruction: "Hold hands for the next card.", momentType: "touch" },
  { title: "Forehead Kiss", instruction: "Give them a forehead kiss.", momentType: "romantic" },
  { title: "Choose One", instruction: "Choose one: a kiss, a hug, or a hand squeeze.", momentType: "romantic" },
  { title: "A Little Closer", instruction: "Sit a little closer for the next three cards.", momentType: "touch" },
  { title: "Look At Me", instruction: "Look at each other for 20 seconds. No jokes, no looking away.", seconds: 20, momentType: "synchrony" },
  { title: "Who You're Becoming", instruction: "Hold their hand and tell them one thing you admire about who they're becoming.", momentType: "appreciation" },
  { title: "I Felt Loved", instruction: "Tell them one small thing they did recently that made you feel loved.", momentType: "appreciation" },
  { title: "Proud Of You", instruction: "Tell them something you're genuinely proud of them for.", momentType: "appreciation" },
  { title: "I Noticed", instruction: "Tell them one detail about them you've noticed that they probably didn't realise you noticed.", momentType: "appreciation" },
  { title: "Closest To You", instruction: "Finish this sentence: 'I feel closest to you when...'", momentType: "vulnerability" },
  { title: "Safe With You", instruction: "Finish this sentence: 'Something about you that makes me feel safe is...'", momentType: "vulnerability" },
  { title: "Never Doubt", instruction: "Tell them one thing you never want them to doubt about how you feel about them.", momentType: "vulnerability" },
  { title: "Whisper It", instruction: "Whisper one thing you appreciate about them that you don't say enough.", momentType: "appreciation" },
  { title: "Phones Away", instruction: "No phones for the next five cards.", momentType: "synchrony" },
  { title: "Our Song", instruction: "Choose a song that reminds you of them and play it.", momentType: "romantic" },
  { title: "Slow Dance", instruction: "One-song slow dance.", momentType: "romantic" },
  { title: "Keep This One", instruction: "Take one picture together that doesn't need to be posted.", momentType: "playful" },
  { title: "Candid", instruction: "Take a candid picture of each other.", momentType: "playful" },
  { title: "One Bite", instruction: "Feed them one bite from the picnic.", momentType: "playful" },
  { title: "Make Them Laugh", instruction: "Make them laugh. You have 30 seconds.", seconds: 30, momentType: "playful" },
  { title: "Same Memory", instruction: "Each choose your favourite memory together and say it at the same time on three.", momentType: "playful" },
  { title: "Favourite Memory", instruction: "Tell them your favourite memory of the two of you so far.", momentType: "appreciation" },
  { title: "Before Year End", instruction: "Each name one thing you want to experience together before the end of the year.", momentType: "vulnerability" },
  { title: "Read It Later", instruction: "Write them one sentence on paper. They can only read it after the date.", momentType: "vulnerability" },
  { title: "Picnic Nickname", instruction: "Give each other a nickname based on today's picnic.", momentType: "playful" },
  { title: "Never Change", instruction: "Tell them something about their character you hope never changes.", momentType: "appreciation" },
  { title: "Quiet Together", instruction: "Hold hands and sit quietly together for one minute.", seconds: 60, momentType: "synchrony" },
  { title: "Remember This", instruction: "Pick one thing about this exact moment you want to remember years from now.", momentType: "vulnerability" },
  { title: "Your Choice", instruction: "Create a small moment for them right now.", momentType: "playful" },
  { title: "Somewhere New", instruction: "Kiss them somewhere you don't normally kiss them: forehead, cheek, hand, or temple.", momentType: "romantic" },
  { title: "First Attraction", instruction: "Pull them closer and tell them what first attracted you to them.", momentType: "romantic" },
  { title: "Hold Me", instruction: "Let them choose how they want to be held for the next 30 seconds.", seconds: 30, momentType: "touch" },
  { title: "Trace Their Hand", instruction: "Trace their hand with your finger while you answer the next card.", momentType: "touch" },
  { title: "Most Beautiful", instruction: "Tell them what you find most beautiful about them that has nothing to do with appearance.", momentType: "appreciation" },
  { title: "Three Compliments", instruction: "Give them three compliments: one physical, one about their character, one about their mind.", momentType: "appreciation" },
  { title: "Just Watch", instruction: "Put your phones away and just watch the sunset or scenery together for two minutes.", seconds: 120, momentType: "synchrony" },
  { title: "Ask First", instruction: "Ask, 'Can I kiss you?' Even if you normally don't ask.", momentType: "romantic" },
  { title: "Recreate It", instruction: "Recreate your first hug, first picture, or first proper moment together.", momentType: "romantic" },
  { title: "Let Them Choose", instruction: "Let them choose the next moment: kiss, cuddle, compliment, song, or memory.", momentType: "playful" }
];

const VOLUME_THREE_WILD_CARDS = [
  { category: "Wild Card", type: "wild", instruction: "Ask and answer the next question in a different accent." },
  { category: "Wild Card", type: "wild", instruction: "Write down the three most important things to you in a relationship. Compare.", seconds: 30 },
  { category: "Wild Card", type: "wild", instruction: "Create your own question." },
  { category: "Wild Card", type: "wild", instruction: "Based on what you learned, rewrite each other's dating app bios." },
  { category: "Wild Card", type: "wild", instruction: "Write down your number one goal for the next month. Compare." },
  { category: "Wild Card", type: "wild", instruction: "Write down a dating pet peeve. Compare.", seconds: 30 },
  { category: "Wild Card", type: "wild", instruction: "Show each other pictures of when you were kids." },
  { category: "Wild Card", type: "wild", instruction: "Draw your current mood. Compare." },
  { category: "Wild Card", type: "wild", instruction: "Draw your favorite memory together. Compare." },
  { category: "Wild Card", type: "wild", instruction: "Give your partner a compliment you don't think they hear enough." },
  { category: "Wild Card", type: "wild", instruction: "Ask a question you'd be too afraid to ask. Something you wouldn't normally dare to ask." },
  { category: "Wild Card", type: "wild", instruction: "Make an assumption about me." },
  { category: "Wild Card", type: "wild", instruction: "Write a message to each other on small pieces of paper. Open it after you've left." }
];

// This one is guaranteed to show up in every volume's deck, exactly once.
const MUST_INCLUDE_MOMENT = VOLUME_THREE_WILD_CARDS.find(
  c => c.instruction === "Write a message to each other on small pieces of paper. Open it after you've left."
);

const VOLUMES = {
  1: { label: "Volume 1", note: "Original", cards: VOLUME_ONE_CARDS },
  2: {
    label: "Volume 2",
    note: "New questions",
    cards: VOLUME_TWO_CARDS,
    momentRule: "Both comfortable, or skip. No explanation needed."
  },
  3: { label: "Volume 3", note: "Three levels", cards: VOLUME_THREE_CARDS }
};

// Appreciation and listening/vulnerability moments show up more often than the rest.
const MOMENT_WEIGHTS = { appreciation: 2, vulnerability: 2 };

function weightedMomentPool(moments) {
  const pool = [];
  moments.forEach(m => {
    const copies = MOMENT_WEIGHTS[m.momentType] || 1;
    for (let i = 0; i < copies; i++) pool.push(m);
  });
  return pool;
}

// Phase 3D: Moments and Wild Cards are kept as two separate candidate
// pools, not one merged list — a Moment should primarily respond to
// conversational context, a Wild Card should primarily interrupt
// regardless of it. The must-include Wild Card is excluded here since
// it's guaranteed separately, unconditionally, after the main loop below.
const MOMENT_POOL = weightedMomentPool([...VOLUME_ONE_MOMENTS, ...VOLUME_TWO_MOMENTS]);
const WILD_POOL = VOLUME_THREE_WILD_CARDS.filter(w => w !== MUST_INCLUDE_MOMENT);

// How many of the most recently placed Moments/Wild Cards (tracked
// per-kind — a Wild Card in between doesn't reset this) to avoid repeating
// the momentType/wildType of. Phase 3 tuning pass: this was 3 (anywhere in
// the last 3), which fought the 2x MOMENT_WEIGHTS boost on
// appreciation/vulnerability — those types get picked disproportionately
// often *by design*, so they were also disproportionately likely to
// already be "recent" and get excluded by this rule, measurably
// suppressing exactly the types meant to be favoured (simulation: 0.73x
// and 0.84x their pool share). Narrowed to 1 (blocks only an immediate
// repeat, i.e. the exact same type back to back) to preserve variety
// without fighting the weighting. Test independently before touching
// MOMENT_WEIGHTS itself, per the tuning plan.
const RECENT_TYPE_WINDOW = 1;

// Structural eligibility only — boolean, never a score. `constraint` is a
// compatibleWith/avoidWhen object like { disclosureDemand: ["high"] };
// true when every field it names matches the corresponding value on
// lastQuestion. No lastQuestion (shouldn't happen with full metadata
// coverage, but handled defensively) never counts as a match either way.
function constraintMatches(constraint, lastQuestion) {
  if (!lastQuestion) return false;
  return Object.entries(constraint).every(([field, values]) => values.includes(lastQuestion[field]));
}

// eligible / excluded, never a score. No compatibleWith or avoidWhen at
// all means broadly eligible on purpose — most Moments (a synchrony
// palate cleanser, most appreciation prompts) and almost all Wild Cards
// don't need to be contextual to do their job.
function isContextEligible(meta, context) {
  if (!meta) return true;
  if (meta.avoidWhen && constraintMatches(meta.avoidWhen, context.lastQuestion)) return false;
  if (meta.compatibleWith && !constraintMatches(meta.compatibleWith, context.lastQuestion)) return false;
  return true;
}

// Candidate pool → avoidWhen/compatibleWith → recent-type check → eligible
// pool, exactly the pipeline stages agreed on. Falls back in stages
// (drop the recent-type check, then drop context entirely) rather than
// ever returning nothing while unused candidates still exist — context
// narrows the pool, it never blocks insertion on its own.
function eligibleCandidates(pool, getMeta, used, recentTypes, typeField, context) {
  const unused = pool
    .filter(c => !used.has(c.instruction))
    .map(c => ({ card: c, meta: getMeta(c.instruction) }));
  const pass = (list, checkType) =>
    list.filter(({ meta }) => {
      if (checkType && meta && recentTypes.includes(meta[typeField])) return false;
      return isContextEligible(meta, context);
    });
  const strict = pass(unused, true);
  if (strict.length) return strict;
  const relaxed = pass(unused, false);
  if (relaxed.length) return relaxed;
  return unused;
}

// Phase 3 tuning pass: eligibility alone made a compatibleWith match no
// more likely to be picked than any unconstrained candidate, so the two
// Moments that actually declare one ("Tell Me More"/"Listen To Me") were
// getting drowned out by the ~73 other always-eligible Moments (simulation:
// 0.8% of picks). A candidate whose compatibleWith is genuinely satisfied
// right now gets extra selection weight — still fully probabilistic, never
// guaranteed (Picnic can still do nothing). Everything without a satisfied
// compatibleWith (the large majority) keeps the same baseline weight as
// before; nothing changes for them.
const CONTEXTUAL_MATCH_WEIGHT = 4;

function candidateWeight(meta, context) {
  if (meta?.compatibleWith && constraintMatches(meta.compatibleWith, context.lastQuestion)) {
    return CONTEXTUAL_MATCH_WEIGHT;
  }
  return 1;
}

function weightedPick(list, context) {
  const weights = list.map(x => candidateWeight(x.meta, context));
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < list.length; i++) {
    r -= weights[i];
    if (r <= 0) return list[i];
  }
  return list[list.length - 1];
}

// Follow-up fix: contextual weighting must only decide WHICH card wins
// within a pool, never silently shift how often a Moment vs. a Wild Card
// gets drawn in the first place. So the Moment-vs-Wild-Card pool is chosen
// first, by pool size alone — exactly reproducing the odds a plain
// uniform draw from the old combined list would have given each pool —
// and only THEN is contextual weight applied, strictly within whichever
// pool was chosen. A contextually-boosted Moment can now win more often
// against other Moments; it can never pull selection odds away from Wild
// Cards to do it.
function pickIntervention(context, used, recentMomentTypes, recentWildTypes) {
  const moments = eligibleCandidates(MOMENT_POOL, getMomentMetadata, used, recentMomentTypes, "momentType", context)
    .map(x => ({ ...x, kind: "moment" }));
  const wilds = eligibleCandidates(WILD_POOL, getWildCardMetadata, used, recentWildTypes, "wildType", context)
    .map(x => ({ ...x, kind: "wild" }));
  const totalEligible = moments.length + wilds.length;
  if (totalEligible === 0) return null;
  const pool = Math.random() < moments.length / totalEligible ? moments : wilds;
  return weightedPick(pool, context);
}

// Phase 3E found that pickIntervention (above) is sound, but WHEN it gets
// consulted has no awareness of what's accumulated -- the gate is a fixed
// random countdown, blind to conversationType/disclosureDemand. Phase 3F:
// two structural signals, chosen because the audit found direct evidence
// for exactly these two (44% of Volume 2 sessions had a 3+ consecutive
// high-disclosure run; 59-80% had a 3+ consecutive same-conversationType
// run) -- themes and family-pair adjacency were explicitly left out
// (theme prevalence alone explains most clustering without a null-model
// comparison; pair adjacency needs a product decision, not a statistical
// one). This never lowers the existing minimum gap -- see MIN_MOMENT_GAP
// at its only call site in weaveMoments -- it only adds a chance to fire
// *before* the existing ceiling once that floor has passed. Zero pressure
// means zero chance, i.e. byte-identical to pre-3F behaviour.
const TYPE_REPEAT_PRESSURE_THRESHOLD = 3;
const HIGH_DISCLOSURE_PRESSURE_THRESHOLD = 3;
const PRESSURE_SINGLE_SIGNAL = 0.25;
const PRESSURE_BOTH_SIGNALS = 0.5;

function interruptionPressure(consecutiveTypeRun, consecutiveHighDisclosureRun) {
  const typeNotable = consecutiveTypeRun >= TYPE_REPEAT_PRESSURE_THRESHOLD;
  const highNotable = consecutiveHighDisclosureRun >= HIGH_DISCLOSURE_PRESSURE_THRESHOLD;
  if (typeNotable && highNotable) return PRESSURE_BOTH_SIGNALS;
  if (typeNotable || highNotable) return PRESSURE_SINGLE_SIGNAL;
  return 0;
}

const RESPOND_CHANCE = 0.2;
const RESPOND_MIN_GAP = 5;
const MAX_RESPONDS = 4;

// Journal entries saved before this schema existed are treated as legacy:
// no volume/instruction/session to reason about, never recalled before.
// They stay eligible for the past-session callback tier -- we just don't
// pretend to know which session or card produced them.
function normalizeJournalEntry(e) {
  return { volume: null, instruction: null, sessionId: null, recalledCount: 0, lastRecalledAt: null, ...e };
}

// Picks which saved entry (if any) a Callback card should surface. Purely
// mechanical -- recency and recall-count bookkeeping only, never an
// interpretation of what was saved:
//   1. this session, never recalled -- most recent first
//   2. this session, already recalled -- least recently recalled first
//   3. a past session -- the most recently ACTIVE past session first, then
//      never-recalled before more-recency within that session, then recency
//   4. nothing eligible -- caller falls back to the empty-journal copy
// Called at the moment a Callback card is actually reached (not baked in
// when the deck is built) -- the journal changes live as the couple saves
// things while playing, and a callback needs to see saves made earlier in
// the very same play-through, not just what existed before it started.
// Each call reads the current, already-updated journal directly, so
// multiple callbacks reached in one sitting naturally see each other's
// recalledCount bumps with no virtual/simulated state needed.
function pickCallbackEntry(journal, sessionId) {
  const entries = journal.map(normalizeJournalEntry);

  const thisSession = entries.filter(e => e.sessionId === sessionId);
  const neverRecalled = thisSession.filter(e => e.recalledCount === 0).sort((a, b) => b.savedAt - a.savedAt);
  if (neverRecalled.length) return { entry: neverRecalled[0], tier: "session" };

  const alreadyRecalled = thisSession
    .filter(e => e.recalledCount > 0)
    .sort((a, b) => (a.lastRecalledAt ?? -Infinity) - (b.lastRecalledAt ?? -Infinity));
  if (alreadyRecalled.length) return { entry: alreadyRecalled[0], tier: "session" };

  const pastSessions = entries.filter(e => e.sessionId !== sessionId);
  if (pastSessions.length) {
    const groups = new Map();
    pastSessions.forEach(e => {
      if (!groups.has(e.sessionId)) groups.set(e.sessionId, []);
      groups.get(e.sessionId).push(e);
    });
    const mostRecentGroup = [...groups.values()].sort(
      (a, b) => Math.max(...b.map(e => e.savedAt)) - Math.max(...a.map(e => e.savedAt))
    )[0];
    const neverRecalledInGroup = mostRecentGroup.filter(e => e.recalledCount === 0).sort((a, b) => b.savedAt - a.savedAt);
    const pick = neverRecalledInGroup.length
      ? neverRecalledInGroup[0]
      : [...mostRecentGroup].sort((a, b) => b.savedAt - a.savedAt)[0];
    return { entry: pick, tier: "past" };
  }

  return null;
}

function weaveMoments(cards, momentRule, volume) {
  const shuffledCards = shuffle(cards);
  const out = [];
  let callbackCount = 0;
  const MAX_CALLBACKS = 3;
  let respondCount = 0;
  let sinceRespond = RESPOND_MIN_GAP;
  const usedInstructions = new Set();
  let sinceMomentCount = 0;
  let sinceWildCardCount = 0;
  const recentMomentTypes = [];
  const recentWildTypes = [];

  // Phase 3F structural state -- tracks what's accumulated since the last
  // actual Moment/Wild Card insertion, for interruptionPressure(). Resets
  // only on a real insertion (not just a gate check), since an attempt
  // that finds no eligible candidate hasn't actually changed what the
  // couple is experiencing.
  let sinceInterruptionCheck = 0;
  let consecutiveTypeRun = 0;
  let consecutiveHighDisclosureRun = 0;
  let prevConversationType = null;

  // Usually around 6 questions, but intentionally unpredictable.
  // Possible gaps: 4–9 questions, weighted toward 5–7 — kept wide enough that a
  // good conversation has room to breathe between interruptions. Shared as a
  // named array (not just inline in nextGap) so Phase 3F's floor is derived
  // from it, never a second hand-typed "4" that could drift out of sync.
  const MOMENT_GAPS = [4, 5, 5, 6, 6, 6, 7, 7, 8, 9];
  const nextGap = () => MOMENT_GAPS[Math.floor(Math.random() * MOMENT_GAPS.length)];
  const MIN_MOMENT_GAP = Math.min(...MOMENT_GAPS);

  // Callbacks are rarer than moments so there's time to save something first.
  const nextCallbackGap = () => {
    const gaps = [6, 7, 7, 8, 8, 9];
    return gaps[Math.floor(Math.random() * gaps.length)];
  };

  let untilMoment = nextGap();
  let untilCallback = nextCallbackGap();

  shuffledCards.forEach((card, i) => {
    // Kept as a reference (not an index lookup) so a response instruction can be
    // attached directly onto this question, regardless of what gets pushed after it.
    const questionEntry = { ...card, type: "question" };
    out.push(questionEntry);
    untilMoment--;
    untilCallback--;
    sinceRespond++;
    sinceMomentCount++;
    sinceWildCardCount++;

    // The question's own metadata (not its category) decides both the rule
    // line's phrasing (answerMode, read at render time) and whether it
    // occasionally gets a short "how to respond" instruction attached
    // instead of interrupting with a separate card — still no mode picker
    // for the couple to deal with, just a more precise, per-question signal.
    const meta = getQuestionMetadata(volume, card.category, card.q);
    if (meta) questionEntry.answerMode = meta.answerMode;

    // Phase 3F: update accumulated structural state before the gate below
    // reads it -- "what has happened recently," not a guess at how it felt.
    sinceInterruptionCheck++;
    if (meta) {
      consecutiveTypeRun = meta.conversationType === prevConversationType ? consecutiveTypeRun + 1 : 1;
      prevConversationType = meta.conversationType;
      consecutiveHighDisclosureRun = meta.disclosureDemand === "high" ? consecutiveHighDisclosureRun + 1 : 0;
    } else {
      consecutiveTypeRun = 0;
      consecutiveHighDisclosureRun = 0;
      prevConversationType = null;
    }

    const respondLine = meta && RESPOND_BEHAVIOUR_COPY[meta.responseBehaviour];
    if (
      respondLine &&
      sinceRespond >= RESPOND_MIN_GAP &&
      respondCount < MAX_RESPONDS &&
      Math.random() < RESPOND_CHANCE
    ) {
      questionEntry.respondPrompt = respondLine;
      respondCount++;
      sinceRespond = 0;
    }

    // Phase 3E/3F: WHICH candidate gets chosen was already context-aware
    // (Context describes recent structure, never a guess at how the couple
    // feels) -- this is what makes WHETHER/WHEN it happens context-aware
    // too. untilMoment<=0 is still the guaranteed ceiling, completely
    // unchanged. adaptiveFire only ever adds an EARLIER chance, never
    // removes the floor: it can't even be evaluated until
    // sinceInterruptionCheck has already passed MIN_MOMENT_GAP, the same
    // minimum the ceiling itself always respected. Zero accumulated
    // pressure means zero chance, so a session with no repetition behaves
    // exactly as it did before this phase.
    const pressure = interruptionPressure(consecutiveTypeRun, consecutiveHighDisclosureRun);
    const adaptiveFire = sinceInterruptionCheck >= MIN_MOMENT_GAP && pressure > 0 && Math.random() < pressure;

    if ((untilMoment <= 0 || adaptiveFire) && i < shuffledCards.length - 1) {
      const context = {
        lastQuestion: meta
          ? {
              conversationType: meta.conversationType,
              answerMode: meta.answerMode,
              responseBehaviour: meta.responseBehaviour,
              disclosureDemand: meta.disclosureDemand,
              faithSpecific: meta.faithSpecific,
              themes: meta.themes
            }
          : null,
        sinceMoment: sinceMomentCount,
        sinceRespond,
        sinceWildCard: sinceWildCardCount,
        recentlyUsedMomentTypes: recentMomentTypes,
        recentlyUsedWildTypes: recentWildTypes
      };
      const picked = pickIntervention(context, usedInstructions, recentMomentTypes, recentWildTypes);
      if (picked) {
        const m = picked.card;
        out.push({
          ...m,
          category: m.category || "Moment",
          type: m.type || "moment",
          comfortRule: momentRule
        });
        usedInstructions.add(m.instruction);
        if (picked.kind === "moment") {
          sinceMomentCount = 0;
          if (picked.meta) {
            recentMomentTypes.push(picked.meta.momentType);
            if (recentMomentTypes.length > RECENT_TYPE_WINDOW) recentMomentTypes.shift();
          }
        } else {
          sinceWildCardCount = 0;
          if (picked.meta) {
            recentWildTypes.push(picked.meta.wildType);
            if (recentWildTypes.length > RECENT_TYPE_WINDOW) recentWildTypes.shift();
          }
        }
        // Only an actual insertion changes what the couple experiences --
        // a gate check that found no eligible candidate hasn't broken
        // anything, so the accumulated pressure signals stay as they were.
        consecutiveTypeRun = 0;
        consecutiveHighDisclosureRun = 0;
      }
      // untilMoment resets on every gate firing regardless of whether a
      // candidate was found, exactly as before Phase 3F -- sinceInterruptionCheck
      // mirrors that same unconditional reset, keeping the floor's meaning
      // (time since the gate last fired) identical to pre-3F semantics.
      untilMoment = nextGap();
      sinceInterruptionCheck = 0;
    }

    if (untilCallback <= 0 && i > 3 && i < shuffledCards.length - 1 && callbackCount < MAX_CALLBACKS) {
      // Deliberately just a placeholder -- unlike Moments/Wild Cards, a
      // Callback's actual content depends on the journal as it stands at
      // the moment this card is reached, not at deck-build time. If it
      // were picked here, a save made mid-playthrough (the normal case --
      // no reshuffle in between) could never be reflected by a Callback
      // later in this same deck. See pickCallbackEntry, called from the
      // component's per-card effect instead.
      out.push({ category: "Callback", type: "callback" });
      callbackCount++;
      untilCallback = nextCallbackGap();
      // A Callback is still a different-mode card from the couple's POV,
      // same "real adjacency" definition the Phase 3E audit used (any
      // non-question card breaks a run) -- but it's on its own separate
      // gap/counter and gets no adaptive trigger of its own, per scope.
      consecutiveTypeRun = 0;
      consecutiveHighDisclosureRun = 0;
    }
  });

  if (MUST_INCLUDE_MOMENT) {
    const guaranteed = {
      ...MUST_INCLUDE_MOMENT,
      category: MUST_INCLUDE_MOMENT.category || "Moment",
      type: MUST_INCLUDE_MOMENT.type || "moment",
      comfortRule: momentRule
    };
    out.splice(Math.floor(Math.random() * (out.length + 1)), 0, guaranteed);
  }

  out.push({ category: "Closing", type: "closing" });

  return out;
}

function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const JOURNAL_KEY = "picnic-cards-journal-v1";

// Response-instruction copy, keyed by each question's own responseBehaviour
// metadata (src/questionMetadata.js) instead of its category -- a question
// decides its response instruction on its own merits now, not by which
// category it happens to sit in. Behaviours with no entry here show no
// extra line on purpose: "guess_then_confirm" is already carried by the
// rule line itself (see ruleFor), and "none"/"share" mean no response
// ritual is appropriate for that card.
const RESPOND_BEHAVIOUR_COPY = {
  reflect_back: "Tell each other what you heard.",
  ask_follow_up: "Ask each other one thing you'd like to understand better.",
  affirm: "Tell each other what you appreciated in what you heard.",
  tell_more: "Ask them to tell you more about it."
};

// Phase 4C: "Our Story" journal redesign. Pure, presentation-only helpers --
// they read the existing (additive) entry schema, never change it.
const JOURNAL_KIND_LABELS = { question: "QUESTION", moment: "MOMENT", wild: "WILD CARD" };

// Groups entries by calendar day (local time), most recent day first, most
// recent entry first within a day -- same direction the flat list always
// sorted in, just partitioned now.
function groupJournalByDay(journal) {
  const sorted = [...journal].sort((a, b) => b.savedAt - a.savedAt);
  const groups = [];
  let currentKey = null;
  for (const entry of sorted) {
    const d = new Date(entry.savedAt);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (key !== currentKey) {
      groups.push({ key, date: d, entries: [] });
      currentKey = key;
    }
    groups[groups.length - 1].entries.push(entry);
  }
  return groups;
}

// "SEPTEMBER 15" for the current year, "SEPTEMBER 15, 2025" otherwise --
// a journal meant to span years needs the year once it's no longer implied.
// Built explicitly (not toLocaleDateString(undefined, ...)) because locale
// ordering isn't guaranteed to put the month first -- the exact wording
// here was part of the sign-off, not something to leave to the device's
// locale settings.
const JOURNAL_MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function journalGroupHeader(date) {
  const month = JOURNAL_MONTH_NAMES[date.getMonth()].toUpperCase();
  const yearSuffix = date.getFullYear() !== new Date().getFullYear() ? `, ${date.getFullYear()}` : "";
  return `${month} ${date.getDate()}${yearSuffix}`;
}

// The secondary "what was actually asked/offered" line. Questions always
// have their own text; Moments prefer the short title Phase 4C started
// storing separately, falling back to the older combined "title —
// instruction" string for legacy entries saved before that field existed
// (never reconstructed, per the sign-off -- if the title wasn't captured,
// the full original string is the honest fallback). Wild Cards have no
// title at all, so they always fall through to entry.text too.
function journalContextLine(entry) {
  if (entry.type === "question") return entry.text;
  return entry.title || entry.text;
}

function journalFramingLine(entry) {
  return entry.type === "question" ? "You said" : "You captured this";
}

function App() {
  const [volume, setVolume] = useState("1");
  const activeVolume = VOLUMES[volume];
  const activeCards = activeVolume.cards;
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(activeCards.map(c => c.category)))],
    [activeCards]
  );

  const [category, setCategory] = useState("All");

  // Stable for the lifetime of this app instance -- never reset by
  // resetDeck (unlike the old sessionStart bug this replaces for callback
  // purposes; see below). This is what "saved this session" actually means.
  const [sessionId] = useState(() => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
  // Fixed: this used to be reset inside resetDeck, so it silently meant
  // "since the last shuffle" instead of "since the app opened" -- kept
  // (now genuinely fixed) in case other code comes to depend on it, but
  // the callback system itself keys off sessionId, not this.
  const [sessionStart] = useState(() => Date.now());
  const [journal, setJournal] = useState(() => {
    try {
      const raw = localStorage.getItem(JOURNAL_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [deck, setDeck] = useState(() => weaveMoments(VOLUME_ONE_CARDS, undefined, 1));
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerComplete, setTimerComplete] = useState(false);
  const timerRef = useRef(null);
  const startX = useRef(null);

  const [journalOpen, setJournalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [savedThisCard, setSavedThisCard] = useState(false);
  const [savedEntryId, setSavedEntryId] = useState(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [callbackDisplay, setCallbackDisplay] = useState(null); // { text, note, tier } | null
  // Phase 4C: editing an existing journal entry's note (separate from
  // noteDraft above, which is only for the card currently on screen) and
  // confirming a delete. One active entry at a time for each -- a couple
  // isn't going to be mid-edit on two memories simultaneously.
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [editDraft, setEditDraft] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const current = deck[index];

  React.useEffect(() => {
    try {
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(journal));
    } catch {}
  }, [journal]);

  // Runs once per arrival at a card (including revisits via Back/Next).
  // The Callback pick happens here, not at deck-build time, specifically
  // so it can see saves made earlier in this same play-through -- see
  // pickCallbackEntry and the placeholder comment in weaveMoments.
  React.useEffect(() => {
    setSavedThisCard(false);
    setSavedEntryId(null);
    setNoteDraft("");

    if (current?.type === "callback") {
      const picked = pickCallbackEntry(journal, sessionId);
      if (picked) {
        setCallbackDisplay({ text: picked.entry.text, note: picked.entry.note || null, tier: picked.tier });
        setJournal(j => j.map(e => e.id === picked.entry.id
          ? { ...e, recalledCount: (e.recalledCount || 0) + 1, lastRecalledAt: Date.now() }
          : e));
      } else {
        setCallbackDisplay(null);
      }
    } else {
      setCallbackDisplay(null);
    }
    // Intentionally keyed on [index, deck] only, not journal -- this should
    // fire once per arrival at a card, not every time the journal changes
    // for an unrelated reason (e.g. a note being edited elsewhere).
  }, [index, deck]);

  function saveCurrentCard() {
    if (savedThisCard || !current) return;
    const text = current.type === "question"
      ? current.q
      : current.title
        ? `${current.title} — ${current.instruction}`
        : current.instruction;
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      category: current.category,
      type: current.type,
      text,
      title: current.title ?? null,
      note: "",
      savedAt: Date.now(),
      volume: Number(volume),
      instruction: current.instruction ?? null,
      sessionId,
      recalledCount: 0,
      lastRecalledAt: null
    };
    setJournal(j => [...j, entry]);
    setSavedEntryId(entry.id);
    setSavedThisCard(true);
    setNoteDraft("");
  }

  function updateNote(value) {
    setNoteDraft(value);
    setJournal(j => j.map(e => (e.id === savedEntryId ? { ...e, note: value } : e)));
  }

  // Closing the sheet always clears any in-progress edit/delete-confirm --
  // reopening it later shouldn't drop the couple back into a stale state
  // for an entry they may not even remember opening.
  React.useEffect(() => {
    if (!journalOpen) {
      setEditingEntryId(null);
      setEditDraft("");
      setConfirmDeleteId(null);
    }
  }, [journalOpen]);

  function startEditingNote(entry) {
    setConfirmDeleteId(null);
    setEditingEntryId(entry.id);
    setEditDraft(entry.note || "");
  }

  function saveEditedNote(id) {
    setJournal(j => j.map(e => (e.id === id ? { ...e, note: editDraft } : e)));
    setEditingEntryId(null);
    setEditDraft("");
  }

  function deleteEntry(id) {
    setJournal(j => j.filter(e => e.id !== id));
  }

  function resetDeck(source, nextCategory, volumeNumber, momentRule = activeVolume.momentRule) {
    const cards = nextCategory === "All"
      ? source
      : source.filter(c => c.category === nextCategory);
    const nextDeck = nextCategory === "All"
      ? weaveMoments(cards, momentRule, volumeNumber)
      : [
          ...shuffle(cards.map(c => ({
            ...c,
            type: "question",
            answerMode: getQuestionMetadata(volumeNumber, c.category, c.q)?.answerMode
          }))),
          { category: "Closing", type: "closing" }
        ];
    setDeck(nextDeck);
    setIndex(0);
    setRevealed(false);
    setDragX(0);
  }

  function rebuild(nextCategory = category) {
    resetDeck(activeCards, nextCategory, Number(volume));
  }

  function selectCategory(cat) {
    setCategory(cat);
    resetDeck(activeCards, cat, Number(volume));
  }

  function selectVolume(nextVolume) {
    if (nextVolume === volume) return;
    const next = VOLUMES[nextVolume];
    setVolume(nextVolume);
    setCategory("All");
    resetDeck(next.cards, "All", Number(nextVolume), next.momentRule);
  }

  function next() {
    setIndex(i => (i + 1) % deck.length);
    setRevealed(false);
    setDragX(0);
    setTimerComplete(false);
    setTimeLeft(0);
  }

  function prev() {
    setIndex(i => (i - 1 + deck.length) % deck.length);
    setRevealed(false);
    setDragX(0);
    setTimerComplete(false);
    setTimeLeft(0);
  }

  function onPointerDown(e) {
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e) {
    if (startX.current == null) return;
    setDragX(e.clientX - startX.current);
  }

  function onPointerUp() {
    if (startX.current == null) return;
    if (Math.abs(dragX) > 70) {
      dragX < 0 ? next() : prev();
    } else {
      setDragX(0);
      setRevealed(v => !v);
    }
    startX.current = null;
  }

  // Driven by the question's own answerMode metadata now, not its category
  // string -- this is what lets "How You See Me" split cleanly between
  // cards with a real guessable answer (guess_then_confirm) and cards that
  // are just an open, no-right-answer read on a partner (partner_about_you),
  // instead of every card in the category getting identical rule text.
  function ruleFor(answerMode) {
    if (answerMode === "guess_then_confirm") {
      return "The other person answers first. Then say whether they read you correctly.";
    }
    if (answerMode === "partner_about_you") {
      return "The other person answers first. There's no right answer — just what they see.";
    }
    return "Both answer. If the conversation gets good, stay there.";
  }

  function startTimer(seconds) {
    clearInterval(timerRef.current);
    setTimeLeft(seconds);
    setTimerRunning(true);
    setTimerComplete(false);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setTimerRunning(false);
          setTimerComplete(true);
          if (navigator.vibrate) navigator.vibrate([180, 100, 180]);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerRef.current);
    setTimerRunning(false);
    setTimerComplete(false);
    setTimeLeft(0);
  }

  React.useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <main className="app">
      <header className="topbar">
        <div>
          <div className="eyebrow">PICNIC EDITION · {VOLUMES[volume].label.toUpperCase()}</div>
          <h1>Picnic Cards</h1>
        </div>
        <div className="topbar-right">
          <div className="counter">{index + 1} / {deck.length}</div>
          <button className="journal-toggle" onClick={() => setJournalOpen(true)}>
            ♥ Our Story · {journal.length}
          </button>
        </div>
      </header>

      <div className="volume-switcher" aria-label="Choose a card volume">
        {Object.entries(VOLUMES).map(([id, item]) => (
          <button
            key={id}
            className={volume === id ? "active" : ""}
            aria-pressed={volume === id}
            onClick={() => selectVolume(id)}
          >
            <span>{item.label}</span>
            <small>{item.note}</small>
          </button>
        ))}
      </div>

      <button className="filter-toggle" onClick={() => setFilterOpen(true)}>
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 4h15M5.5 10h9M8.5 16h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span>{category === "All" ? "All categories" : category}</span>
      </button>

      <section className="stage">
        <article
          className={"card " + (current.type === "moment" || current.type === "callback" || current.type === "closing" ? "moment " : current.type === "wild" ? "wild " : "")}
          style={{ transform: `translateX(${dragX}px) rotate(${dragX / 28}deg)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => { startX.current = null; setDragX(0); }}
        >
          <div key={index} className={"card-inner " + (revealed ? "revealed" : "")}>
          <div className="card-face card-face-back">
            <div className="face-content">
              <div className="category">{current.category}</div>
              <div className="tap">
                {current.type === "moment" ? "A little pause between questions"
                  : current.type === "wild" ? "Something different"
                  : current.type === "callback" ? "A quick look back"
                  : current.type === "closing" ? "One last thing"
                  : "Tap to reveal"}
              </div>
            </div>
            <div className="brandmark">PICNIC CARDS</div>
          </div>
          <div className="card-face card-face-front">
          {current.type === "callback" ? (
            <div className="face-content">
              <div className="moment-label">CALLBACK</div>
              {callbackDisplay ? (
                <>
                  <div className="moment-instruction">
                    {callbackDisplay.tier === "past" ? "Last time you played, you saved this:" : "You saved this earlier:"}
                  </div>
                  <div className="callback-quote">“{callbackDisplay.text}”</div>
                  {callbackDisplay.note && (
                    <div className="callback-note">Your note: “{callbackDisplay.note}”</div>
                  )}
                  <div className="moment-instruction">Has anything changed since then, or does it still feel true?</div>
                </>
              ) : (
                <div className="moment-instruction">Nothing saved yet. Is there something already asked that you'd want to sit with a little longer?</div>
              )}
              <button
                className="moment-skip"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => { e.stopPropagation(); next(); }}
              >
                Continue
              </button>
            </div>
          ) : current.type === "closing" ? (
            <div className="face-content">
              <div className="moment-label">BEFORE YOU GO</div>
              <div className="moment-instruction">One thing that made you feel closer tonight?</div>
              <button
                className="moment-skip"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => { e.stopPropagation(); rebuild(); }}
              >
                Shuffle & play again
              </button>
            </div>
          ) : current.type === "moment" || current.type === "wild" ? (
            <div className="face-content">
              <div className="moment-label">{current.type === "wild" ? "WILD CARD" : "MOMENT"}</div>
              {current.title && <div className="moment-title">{current.title}</div>}
              <div className="moment-instruction">{current.instruction}</div>
              {current.seconds > 0 && !current.ongoing && (
                <button
                  className="timer-start"
                  onPointerDown={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); startTimer(current.seconds); }}
                >
                  Start {current.seconds}s timer
                </button>
              )}
              {current.ongoing && (
                <div className="moment-ongoing">For the rest of the game. Either person can stop whenever they want.</div>
              )}
              <button
                className="moment-skip"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => { e.stopPropagation(); next(); }}
              >
                Skip {current.type === "wild" ? "wild card" : "moment"}
              </button>
              {current.optional && (
                <div className="moment-note">Only if you're both comfortable.</div>
              )}
              {current.comfortRule && (
                <div className="moment-note moment-rule">{current.comfortRule}</div>
              )}
              <div className="save-row" onPointerDown={e => e.stopPropagation()}>
                <button
                  className={"save-btn " + (savedThisCard ? "saved" : "")}
                  onClick={e => { e.stopPropagation(); saveCurrentCard(); }}
                >
                  {savedThisCard ? "♥ Saved" : "♡ Save this"}
                </button>
                {savedThisCard && (
                  <input
                    className="save-note"
                    placeholder="Add a one-line note (optional)"
                    value={noteDraft}
                    onChange={e => updateNote(e.target.value)}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="face-content">
              <div className="question">{current.q}</div>
              <div className="rule">{ruleFor(current.answerMode)}</div>
              {current.respondPrompt && (
                <div className="respond-line">{current.respondPrompt}</div>
              )}
              <div className="save-row" onPointerDown={e => e.stopPropagation()}>
                <button
                  className={"save-btn " + (savedThisCard ? "saved" : "")}
                  onClick={e => { e.stopPropagation(); saveCurrentCard(); }}
                >
                  {savedThisCard ? "♥ Saved" : "♡ Save this"}
                </button>
                {savedThisCard && (
                  <input
                    className="save-note"
                    placeholder="Add a one-line note (optional)"
                    value={noteDraft}
                    onChange={e => updateNote(e.target.value)}
                  />
                )}
              </div>
            </div>
          )}
            <div className="brandmark">PICNIC CARDS</div>
          </div>
          </div>
        </article>
      </section>

      <section className="controls">
        <button onClick={prev} className="secondary">← Back</button>
        <button onClick={() => setRevealed(v => !v)} className="primary">
          {revealed ? "Hide" : "Reveal"}
        </button>
        <button onClick={next} className="secondary">Next →</button>
      </section>

      <button className="shuffle" onClick={() => rebuild(category)}>Shuffle deck</button>
      <div className="hint">Tap to reveal • Swipe left/right • Moment cards appear between questions</div>

      {(timerRunning || timerComplete) && (
        <div className="timer-overlay">
          <div className="timer-sheet">
            <div className="timer-caption">Stay in the moment</div>
            <div className="timer-number">{timerComplete ? "Time ❤️" : timeLeft}</div>
            {!timerComplete && <div className="timer-unit">seconds</div>}
            <button onClick={stopTimer} className="timer-stop">
              {timerComplete ? "Continue" : "End timer"}
            </button>
          </div>
        </div>
      )}

      {journalOpen && (
        <div className="journal-overlay" onClick={() => setJournalOpen(false)}>
          <div className="journal-sheet" onClick={e => e.stopPropagation()}>
            <div className="journal-header">
              <div className="journal-title">Our Story</div>
              <button className="journal-close" onClick={() => setJournalOpen(false)}>Close</button>
            </div>
            {journal.length === 0 ? (
              <div className="journal-empty">Nothing here yet. Save something and it becomes part of your story.</div>
            ) : (
              <div className="journal-list">
                {groupJournalByDay(journal).map(group => (
                  <div key={group.key} className="journal-day-group">
                    <div className="journal-group-header">{journalGroupHeader(group.date)}</div>
                    {group.entries.map(entry => {
                      const hasNote = !!entry.note;
                      const wasRecalled = (entry.recalledCount || 0) > 0;
                      const isEditing = editingEntryId === entry.id;
                      const isConfirmingDelete = confirmDeleteId === entry.id;
                      return (
                        <div key={entry.id} className="journal-entry">
                          {isConfirmingDelete ? (
                            <div className="journal-delete-confirm">
                              <div className="journal-delete-confirm-text">Delete this memory? This can't be undone.</div>
                              <div className="journal-delete-confirm-actions">
                                <button className="journal-confirm-cancel" onClick={() => setConfirmDeleteId(null)}>Cancel</button>
                                <button className="journal-confirm-delete" onClick={() => { deleteEntry(entry.id); setConfirmDeleteId(null); }}>Delete</button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="journal-entry-top">
                                <span className="journal-entry-kind">{JOURNAL_KIND_LABELS[entry.type] || entry.type}</span>
                                <button className="journal-entry-delete" onClick={() => { setConfirmDeleteId(entry.id); setEditingEntryId(null); }}>×</button>
                              </div>

                              {hasNote && <div className="journal-entry-framing">{journalFramingLine(entry)}</div>}
                              {hasNote && <div className="journal-entry-note">“{entry.note}”</div>}
                              <div className={hasNote ? "journal-entry-context" : "journal-entry-context journal-entry-context-primary"}>
                                {journalContextLine(entry)}
                              </div>

                              {isEditing ? (
                                <div className="journal-note-edit" onClick={e => e.stopPropagation()}>
                                  <input
                                    className="journal-note-input"
                                    value={editDraft}
                                    onChange={e => setEditDraft(e.target.value)}
                                    placeholder="Write what you want to remember..."
                                  />
                                  <div className="journal-note-edit-actions">
                                    <button className="journal-note-cancel" onClick={() => setEditingEntryId(null)}>Cancel</button>
                                    <button className="journal-note-save" onClick={() => saveEditedNote(entry.id)}>Save</button>
                                  </div>
                                </div>
                              ) : (
                                <button className="journal-entry-edit-note" onClick={() => startEditingNote(entry)}>
                                  {hasNote ? "Edit note" : "Add a note"}
                                </button>
                              )}

                              {wasRecalled && <div className="journal-entry-revisit">You saved this earlier</div>}
                              <div className="journal-entry-date">
                                {new Date(entry.savedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {filterOpen && (
        <div className="journal-overlay" onClick={() => setFilterOpen(false)}>
          <div className="journal-sheet" onClick={e => e.stopPropagation()}>
            <div className="journal-header">
              <div className="journal-title">Categories</div>
              <button className="journal-close" onClick={() => setFilterOpen(false)}>Close</button>
            </div>
            <div className="filter-grid">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { selectCategory(cat); setFilterOpen(false); }}
                  className={"chip " + (category === cat ? "active" : "")}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
