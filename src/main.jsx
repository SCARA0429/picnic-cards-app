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
  { title: "Lock Eyes", instruction: "Look into each other’s eyes without talking.", seconds: 40 },
  { title: "Hold Hands", instruction: "Hold hands and just sit together for a moment.", seconds: 30 },
  { title: "Eyes Closed", instruction: "Close your eyes, hold hands, and stay quiet together.", seconds: 30 },
  { title: "Long Hug", instruction: "Give each other a proper hug. No rushing it.", seconds: 30 },
  { title: "Cuddle Break", instruction: "Get comfortable and cuddle for a little while.", seconds: 60 },
  { title: "Forehead Touch", instruction: "Rest your foreheads together and stay there.", seconds: 20 },
  { title: "Compliment Close-Up", instruction: "Hold hands and tell each other one thing you genuinely admire about the other person.", seconds: 45 },
  { title: "Silent Appreciation", instruction: "Look at each other and think of one thing you’re grateful for about this moment. Share it when the timer ends.", seconds: 30 },
  { title: "Lean On Me", instruction: "One person rests their head on the other’s shoulder. Switch halfway.", seconds: 40 },
  { title: "Kiss", instruction: "If you both want to, share a kiss. No timer pressure, just enjoy the moment.", seconds: 15 },
  { title: "Hand Trace", instruction: "Hold hands and slowly trace the lines of each other’s palm.", seconds: 30 },
  { title: "Close & Breathe", instruction: "Sit close, hold hands, and take a few slow breaths together.", seconds: 30 }
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
  }

  function prev() {
    setIndex(i => (i - 1 + deck.length) % deck.length);
    setRevealed(false);
    setDragX(0);
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
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setTimerRunning(false);
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
  }

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
          className={"card " + (revealed ? "front" : "back")}
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
              <button
                className="timer-start"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => { e.stopPropagation(); startTimer(current.seconds); }}
              >
                Start {current.seconds}s timer
              </button>
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

      {(timerRunning || timeLeft === 0) && timerRunning && (
        <div className="timer-overlay">
          <div className="timer-sheet">
            <div className="timer-caption">Stay in the moment</div>
            <div className="timer-number">{timeLeft}</div>
            <div className="timer-unit">seconds</div>
            <button onClick={stopTimer} className="timer-stop">End timer</button>
          </div>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
