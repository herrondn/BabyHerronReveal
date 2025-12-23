// 🔹 CHANGE THIS ONLY 🔹
const GENDER = "boy"; // "boy" or "girl"

// Set your reveal date/time (local time)
const revealDate = new Date("2025-12-29T23:00:00").getTime();

const countdownEl = document.getElementById("countdown");
const countdownContainer = document.getElementById("countdown-container");
const revealContainer = document.getElementById("reveal-container");
const revealText = document.getElementById("reveal-text");

const interval = setInterval(() => {
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

function reveal() {
  countdownContainer.classList.add("hidden");
  revealContainer.classList.remove("hidden");

  document.body.classList.add(GENDER);
  revealText.textContent = GENDER.toUpperCase();

  // Confetti explosion
  confetti({
    particleCount: 200,
    spread: 90,
    origin: { y: 0.6 }
  });
}

