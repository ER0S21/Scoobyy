const questions = [
  {
    kicker: "THE BEGINNING",
    title: "Hey, you.",
    subtitle: "I made a little something for you.",
    text: "Got a minute for me?",
    no: [
      "Wow. Rejected before the opening credits even finished. 😭",
      "Not even one minute? Cold. Absolutely cinematic villain behaviour. 🙄",
      "Okay, I'll just stand here dramatically in the rain. ☔"
    ]
  },
  {
    kicker: "THE EFFORT",
    title: "Be honest.",
    subtitle: "A very important question.",
    text: "Do you appreciate the effort I put into this?",
    no: [
      "Noted. I'll be sending you the invoice for emotional damages. 💀",
      "The production team is devastated. (The production team is just me.)",
      "Wow. My imaginary award speech was all for nothing. 🥲"
    ]
  },
  {
    kicker: "THE OBSESSIONS",
    title: "We need to talk.",
    subtitle: "About something very serious.",
    text: "Can we talk about your coffee ice cream obsession?",
    no: [
      "Girl, Baskin-Robbins should put you on their payroll at this point. 🍦",
      "You can't hide from the coffee flavour allegations. I have evidence. 😭",
      "This conversation has been reviewed by the International Ice Cream Committee."
    ]
  },
  {
    kicker: "THE LITTLE THINGS",
    title: "One tiny thing.",
    subtitle: "And I'm being very sincere right now.",
    text: "Can I show you something I genuinely like about you?",
    no: [
      "Too late, I've already prepared my very professional presentation. 📊",
      "It's a slideshow. There may or may not be transitions. Respect the craft. 😭",
      "The compliments are queued up and everything. Let me cook. 🍳"
    ]
  },
  {
    kicker: "THE LAST QUESTION",
    title: "Okay, one last thing.",
    subtitle: "No jokes for this one. Well… maybe one.",
    text: "Can I be a little honest with you?",
    no: [
      "I've been building suspense for five scenes. Don't abandon the plot now. 😭",
      "The director says we need one more take. 🎬",
      "I'll be over here holding this dramatic pause until you're ready. 🥀"
    ]
  }
];

let currentQuestion = 0;
let noCount = 0;
let isTransitioning = false;

const questionScreen = document.getElementById("question-screen");
const revealScreen = document.getElementById("reveal-screen");
const kicker = document.getElementById("scene-kicker");
const title = document.getElementById("question-title");
const subtitle = document.getElementById("question-subtitle");
const questionText = document.getElementById("question-text");
const reaction = document.getElementById("reaction");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const progressFill = document.getElementById("progress-fill");
const progressLabel = document.getElementById("progress-label");

function renderQuestion() {
  const q = questions[currentQuestion];
  kicker.textContent = q.kicker;
  title.textContent = q.title;
  subtitle.textContent = q.subtitle;
  questionText.textContent = q.text;
  reaction.textContent = "No pressure — just a tiny surprise if you're curious.";
  progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  progressLabel.textContent = `SCENE ${String(currentQuestion + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
  noCount = 0;
}

noButton.addEventListener("click", () => {
  if (isTransitioning) return;
  const q = questions[currentQuestion];
  reaction.textContent = q.no[noCount % q.no.length];
  noCount += 1;
  noButton.classList.remove("shake");
  // Restart the CSS animation so it can replay on every click.
  void noButton.offsetWidth;
  noButton.classList.add("shake");
});

yesButton.addEventListener("click", () => {
  if (isTransitioning) return;
  isTransitioning = true;
  questionScreen.classList.add("fade-out");

  window.setTimeout(() => {
    questionScreen.classList.remove("fade-out");
    if (currentQuestion < questions.length - 1) {
      currentQuestion += 1;
      renderQuestion();
      questionScreen.classList.add("fade-in");
      window.setTimeout(() => questionScreen.classList.remove("fade-in"), 500);
    } else {
      questionScreen.hidden = true;
      revealScreen.hidden = false;
      revealScreen.classList.add("fade-in");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    isTransitioning = false;
  }, 220);
});

document.getElementById("replay-button").addEventListener("click", () => {
  currentQuestion = 0;
  renderQuestion();
  revealScreen.hidden = true;
  questionScreen.hidden = false;
  questionScreen.classList.add("fade-in");
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.setTimeout(() => questionScreen.classList.remove("fade-in"), 500);
});

// Keep optional media placeholders readable when the matching file is missing.
document.querySelectorAll(".media-box img").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.display = "none";
    img.parentElement.classList.add("media-placeholder");
  });
});
