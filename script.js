
// 🔹 CHANGE THIS ONLY 🔹
const GENDER = "boy"; // "boy" or "girl"

// Set your reveal date/time (local time)
// const revealDate = new Date("2025-12-29T21:00:00").getTime();
const revealDate = new Date("2025-12-22T21:40:00").getTime();

const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const countdownEl = document.getElementById("countdown");
const countdownContainer = document.getElementById("countdown-container");
const revealContainer = document.getElementById("reveal-container");
const revealText = document.getElementById("reveal-text");
const music = document.getElementById("music");

let interval;

startButton.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  countdownContainer.classList.remove("hidden");

  music.volume = 0.4;
  music.play();

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

function reveal() {
  music.pause();
  music.currentTime = 0;

  countdownContainer.classList.add("hidden");
  revealContainer.classList.remove("hidden");

  document.body.classList.add(GENDER);
  revealText.textContent = GENDER.toUpperCase();

  confetti({
    particleCount: 250,
    spread: 100,
    origin: { y: 0.6 }
  });
}
