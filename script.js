
// 🔹 CHANGE THIS ONLY 🔹
const GENDER = "girl"; // "boy" or "girl"

// Set your reveal date/time (local time)
const revealDate = new Date("2025-12-29T21:00:00").getTime();
// const revealDate = new Date("2025-12-22T22:15:00").getTime();

const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const countdownEl = document.getElementById("countdown");
const countdownContainer = document.getElementById("countdown-container");
const revealContainer = document.getElementById("reveal-container");
const revealText = document.getElementById("reveal-text");
const music = document.getElementById("music");

let interval;

/* 🎨 Gender-based confetti colors */
const confettiColors = GENDER === "boy"
  ? ["#9ad0ff", "#6bbcff", "#ffffff"]
  : ["#ffb6c1", "#ff8fa3", "#ffffff"];

startButton.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  countdownContainer.classList.remove("hidden");

  fadeInMusic();
  startCountdown();
});

function startCountdown() {
  interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = revealDate - now;

    if (distance <= 0) {
      clearInterval(interval);
      reveal();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}

/* 🎵 Music fade-in */
function fadeInMusic() {
  music.volume = 0;
  music.play();

  let volume = 0;
  const fade = setInterval(() => {
    volume += 0.02;
    if (volume >= 0.4) {
      music.volume = 0.4;
      clearInterval(fade);
    } else {
      music.volume = volume;
    }
  }, 100);
}

/* 🎵 Music fade-out */
function fadeOutMusic() {
  let volume = music.volume;
  const fade = setInterval(() => {
    volume -= 0.02;
    if (volume <= 0) {
      music.pause();
      music.currentTime = 0;
      clearInterval(fade);
    } else {
      music.volume = volume;
    }
  }, 100);
}

function reveal() {
  fadeOutMusic();

  countdownContainer.classList.add("hidden");
  revealContainer.classList.remove("hidden");

  /* 🎨 Full-screen color reveal */
  document.body.classList.add(GENDER);

  /* 🍼 Reveal text */
  revealText.textContent = GENDER.toUpperCase();

  /* 🎊 Gender-matching confetti */
  confetti({
    particleCount: 300,
    spread: 120,
    colors: confettiColors,
    origin: { y: 0.6 }
  });
}

