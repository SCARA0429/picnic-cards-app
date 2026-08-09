import React, { useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const ALL_CARDS = [
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


const MOMENTS = [
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

function weaveMoments(cards) {
  const shuffledCards = shuffle(cards);
  const shuffledMoments = shuffle(MOMENTS);
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

    if (untilMoment <= 0 && i < shuffledCards.length - 1) {
      const m = shuffledMoments[momentIndex % shuffledMoments.length];
      out.push({ ...m, category: "Moment", type: "moment" });
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
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(ALL_CARDS.map(c => c.category)))],
    []
  );

  const [category, setCategory] = useState("All");
  const filtered = useMemo(
    () => category === "All" ? ALL_CARDS : ALL_CARDS.filter(c => c.category === category),
    [category]
  );
  const [deck, setDeck] = useState(() => weaveMoments(ALL_CARDS));
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerComplete, setTimerComplete] = useState(false);
  const timerRef = useRef(null);
  const startX = useRef(null);

  const current = deck[index];

  function rebuild(nextCategory = category) {
    const source = nextCategory === "All"
      ? ALL_CARDS
      : ALL_CARDS.filter(c => c.category === nextCategory);
    setDeck(nextCategory === "All" ? weaveMoments(source) : shuffle(source.map(c => ({...c, type:"question"}))));
    setIndex(0);
    setRevealed(false);
    setDragX(0);
  }

  function selectCategory(cat) {
    setCategory(cat);
    rebuild(cat);
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
    return cat === "How You See Me"
      ? "The other person answers first. Then say whether they read you correctly."
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
          <div className="eyebrow">PICNIC EDITION</div>
          <h1>Picnic Cards</h1>
        </div>
        <div className="counter">{index + 1} / {deck.length}</div>
      </header>

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
          className={"card " + (current.type === "moment" ? "moment " : "") + (revealed ? "front" : "back")}
          style={{ transform: `translateX(${dragX}px) rotate(${dragX / 28}deg)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => { startX.current = null; setDragX(0); }}
        >
          {!revealed ? (
            <div className="face-content">
              <div className="category">{current.category}</div>
              <div className="tap">{current.type === "moment" ? "A little pause between questions" : "Tap to reveal"}</div>
            </div>
          ) : current.type === "moment" ? (
            <div className="face-content">
              <div className="moment-label">MOMENT</div>
              <div className="moment-title">{current.title}</div>
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
                Skip moment
              </button>
              {current.optional && (
                <div className="moment-note">Only if you're both comfortable.</div>
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
