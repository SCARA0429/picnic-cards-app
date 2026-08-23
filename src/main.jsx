import React, { useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

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
    "q": "What’s the worst love language to be friends with?"
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
    "q": "What’s one thing you definitely believe in?"
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
    "q": "What makes life worth living to you?"
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
    "q": "How are you, really?"
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
    "q": "Admit one of your toxic traits."
  },
  {
    "category": "Relationships",
    "q": "Would you rather be cheated on physically or emotionally?"
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
    "q": "Based on what you’ve learned about me, does my social media accurately reflect who I am? Why or why not?"
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
    "category": "Faith & Purpose",
    "q": "How would you describe your relationship with God when nobody else is watching?"
  },
  {
    "category": "Faith & Purpose",
    "q": "Since we have been together, do you think this relationship has moved you closer to Christ, distracted you from Him, or neither? Why?"
  },
  {
    "category": "Faith & Purpose",
    "q": "What does being equally yoked mean to you in real life, beyond simply both being Christian?"
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
    "q": "What boundaries do you believe would protect our purity, trust and relationship with God?"
  },
  {
    "category": "Faith & Purpose",
    "q": "If we ever married, what would you want the purpose of our marriage to be besides making each other happy?"
  },
  {
    "category": "Faith & Purpose",
    "q": "If someone watched your life for a month, what evidence would they see that following Jesus genuinely matters to you?"
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
    "q": "Are we helping each other use our gifts and serve God, or are we mostly just enjoying being together?"
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
  }
];

const VOLUME_THREE_CARDS = [
  ...cardsFromText("Perception", `
What is the first thing you noticed about me?
What do you think is the hardest part of what I do for a living?
What reality show do you think I'm most likely to watch?
Between the two of us, who seems like the better texter? Explain.
What was your first impression of me?
Finish the sentence: Just by looking at you, I'd think __________.
Do I seem like someone who would get a name tattooed on myself? Why or why not?
If you were to buy me a present, knowing nothing about me other than what I look like, what would it be?
What about me intrigues you?
What does my Instagram tell you about me?
Do I seem like more of a creative or analytical type?
What do my shoes tell you about me?
What subject do you think I thrived at in school, and did I fail any?
Do you think I fall in love easily? Why or why not?
What do you think I'm most likely to splurge on?
How many speeding tickets do you think I've gotten in my life?
How would you describe what you think my type is in three words?
Do you think I've ever been fired from a job? If so, what for?
What did you think about my first message?
What's one thing you'll never say no to?
As a child, what do you think I wanted to be?
Do I seem like a morning person or a night owl?
Am I someone you typically connect with?
Do you think I was popular in school? Explain.
What compliment do you think I hear the most?
What's one piece of advice that really stuck with you?
What movie or book do you think I'm most like, and why?
Do you think I'm usually early, on time, or late to events? Explain.
Do I intimidate you? Why or why not?
What does my phone wallpaper tell you about me?
Do you think I ever checked an ex's phone for evidence?
Do I remind you of anyone you know?
What do you think my type was before you?
Something that brought a smile to my face this week was ______.
What favorite song lyrics come to mind off the top of your head?
  `),
  ...cardsFromText("Connection", `
Are you lying to yourself about anything?
What questions are you trying to answer most in your life right now?
What's been your happiest memory this past year?
Have you changed your mind about anything recently?
When was the last time you surprised yourself?
How would you describe the feeling of being in love in one word?
Has a stranger ever changed your life?
What insecurity of yours holds you back the most?
How could you become a better person?
What title would you give this chapter in your life?
What's the worst pain you have ever been in that wasn't physical?
What is something you wouldn't want to change about yourself?
What's your first love's name, and why did you fall in love with them?
What would your younger self not believe about your life today?
What's your mom's name, and what is the most beautiful thing about her?
What is a dream you let go of?
If you could get to know someone in your life on a deeper level, who would it be and why?
What part of your life works, and what part of your life hurts?
Does the image you have of yourself match the image other people see?
What's the nicest thing a friend or partner has ever done for you?
What's the most embarrassing thing that happened to you on a date?
What could you have done better in previous relationships?
Do you think I intimidate others? Why or why not?
When you are asked how you are, how often do you answer truthfully?
How are you, really?
What's your least favorite question to be asked on a date? What do you wish you were asked more?
What's the most unexplainable thing that has happened to you?
Describe your perfect day.
What dating advice would you give your younger self?
What did the people who raised you teach you about love?
How old do you feel emotionally?
Is there an image of yourself you project on a first date that you wish you could let go of?
What are you passionate about?
Who's your comfort person?
If you could have it your way, who would you be with, where would you be, and what would you be doing?
If you had to choose a song that represents me, what would it be and why?
What are you feeling a lot of today?
What are you not currently giving enough time to?
When was the last time you felt truly understood by somebody? Who was it, and what did they understand?
When was the last time you cried?
  `),
  ...cardsFromText("Reflection", `
What do you think my superpower is?
Admit something.
What about me surprised you?
How would you describe me to a stranger?
What do you think our most important similarities are?
Based on what you learned about me, what would you recommend I read?
What is one thing I could do that would drastically improve my life?
I want to give myself permission to feel ___________.
What can I help you with?
What do you think comes easily to me that's hard for others?
What parts of yourself do you see in me?
Where am I most qualified to give advice?
What would be the perfect gift for me?
What do I need to hear right now?
What answer of mine made you light up?
What question were you most afraid to answer?
How does someone earn your vulnerability?
Based on what you've learned about me, does my social media portray me accurately?
What would you remember about me if we ever cut contact?
When this game is over, what will you remember about me?
What do you think my weakness is?
What do you admire most about me?
What's the most attractive quality about me that isn't physical?
What can we create together?
Dare your partner to do something outside their comfort zone next week.
What is a lesson you will take away from our conversation?
What do you think I fear the most?
How can someone show you they love you without saying the word?
What do you recommend I should let go of?
What about me is the hardest for you to understand?
If we were a band, what would our name be?
What has this conversation taught you about yourself?
What do you think my defining characteristic is?
Why do you think we met?
How do our personalities complement each other?
What are you still trying to prove to yourself?
What do you think I should know about myself that perhaps I'm unaware of?
What would make you feel closer to me?
How do you think our lives would be different if we didn't meet?
If you could pick one word to describe our connection, what would it be?
What's something that reminds you of me?
Do you think our connection has influenced your personal growth?
Am I like you expected me to be?
What do you think is the biggest obstacle in my life right now?
In one word, describe how you feel now.
Do you believe everyone has a calling? If so, do you think I've found mine?
What have you witnessed recently that has given you hope for humanity, in any big or small way?
What do you think is the biggest lesson I've taught you?
What's a challenge you think we overcame together as a team?
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

const VOLUMES = {
  1: { label: "Volume 1", note: "Original", cards: VOLUME_ONE_CARDS, moments: VOLUME_ONE_MOMENTS },
  2: {
    label: "Volume 2",
    note: "New questions",
    cards: VOLUME_TWO_CARDS,
    moments: VOLUME_TWO_MOMENTS,
    momentRule: "Both comfortable, or skip. No explanation needed."
  },
  3: { label: "Volume 3", note: "Three levels", cards: VOLUME_THREE_CARDS, moments: VOLUME_THREE_WILD_CARDS }
};

function weaveMoments(cards, moments, momentRule) {
  const shuffledCards = shuffle(cards);
  const shuffledMoments = shuffle(moments);
  const out = [];
  let momentIndex = 0;

  // Usually around 5 questions, but intentionally unpredictable.
  // Possible gaps: 3–8 questions, weighted toward 4–6.
  const nextGap = () => {
    const gaps = [3, 4, 4, 5, 5, 5, 6, 6, 7, 8];
    return gaps[Math.floor(Math.random() * gaps.length)];
  };

  let untilMoment = nextGap();

  shuffledCards.forEach((card, i) => {
    out.push({ ...card, type: "question" });
    untilMoment--;

    if (untilMoment <= 0 && i < shuffledCards.length - 1 && momentIndex < shuffledMoments.length) {
      const m = shuffledMoments[momentIndex % shuffledMoments.length];
      out.push({
        ...m,
        category: m.category || "Moment",
        type: m.type || "moment",
        comfortRule: momentRule
      });
      momentIndex++;
      untilMoment = nextGap();
    }
  });

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

function App() {
  const [volume, setVolume] = useState("1");
  const activeVolume = VOLUMES[volume];
  const activeCards = activeVolume.cards;
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(activeCards.map(c => c.category)))],
    [activeCards]
  );

  const [category, setCategory] = useState("All");
  const [deck, setDeck] = useState(() => weaveMoments(VOLUME_ONE_CARDS, VOLUME_ONE_MOMENTS));
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerComplete, setTimerComplete] = useState(false);
  const timerRef = useRef(null);
  const startX = useRef(null);

  const current = deck[index];

  function resetDeck(source, nextCategory, moments = activeVolume.moments, momentRule = activeVolume.momentRule) {
    const cards = nextCategory === "All"
      ? source
      : source.filter(c => c.category === nextCategory);
    setDeck(nextCategory === "All" ? weaveMoments(cards, moments, momentRule) : shuffle(cards.map(c => ({...c, type:"question"}))));
    setIndex(0);
    setRevealed(false);
    setDragX(0);
  }

  function rebuild(nextCategory = category) {
    resetDeck(activeCards, nextCategory);
  }

  function selectCategory(cat) {
    setCategory(cat);
    resetDeck(activeCards, cat);
  }

  function selectVolume(nextVolume) {
    if (nextVolume === volume) return;
    const next = VOLUMES[nextVolume];
    setVolume(nextVolume);
    setCategory("All");
    resetDeck(next.cards, "All", next.moments, next.momentRule);
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
    if (Math.abs(dragX) > 70) {
      dragX < 0 ? next() : prev();
    } else {
      setDragX(0);
      setRevealed(v => !v);
    }
    startX.current = null;
  }

  function ruleFor(cat) {
    if (cat === "How You See Me" || cat === "Perception") {
      return "The other person answers first. Then say whether they read you correctly.";
    }
    return cat === "Reflection"
      ? "The other person answers first. Take your time with what follows."
      : "Both answer. If the conversation gets good, stay there.";
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
        <div className="counter">{index + 1} / {deck.length}</div>
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

      <nav className="filters">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => selectCategory(cat)}
            className={"chip " + (category === cat ? "active" : "")}
          >
            {cat}
          </button>
        ))}
      </nav>

      <section className="stage">
        <div className="stack stack-1" />
        <div className="stack stack-2" />
        <article
          className={"card " + (current.type === "moment" ? "moment " : current.type === "wild" ? "wild " : "") + (revealed ? "front" : "back")}
          style={{ transform: `translateX(${dragX}px) rotate(${dragX / 28}deg)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => { startX.current = null; setDragX(0); }}
        >
          {!revealed ? (
            <div className="face-content">
              <div className="category">{current.category}</div>
              <div className="tap">{current.type === "moment" ? "A little pause between questions" : current.type === "wild" ? "Something different" : "Tap to reveal"}</div>
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
            </div>
          ) : (
            <div className="face-content">
              <div className="question">{current.q}</div>
              <div className="rule">{ruleFor(current.category)}</div>
            </div>
          )}
          <div className="brandmark">PICNIC CARDS</div>
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
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
