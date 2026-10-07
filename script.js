
// Always start the website from the top when refreshed
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

window.addEventListener("pageshow", () => {
  window.scrollTo(0, 0);
});// ===============================
// LOADER
// ===============================

const loader = document.getElementById("loader");

if (loader) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 700);
  });
}


// ===============================
// START BUTTON
// ===============================

const startBtn = document.getElementById("startBtn");
const story = document.getElementById("story");

if (startBtn && story) {
  startBtn.addEventListener("click", () => {
    story.scrollIntoView({
      behavior: "smooth"
    });
  });
}


// ===============================
// SCROLL REVEAL
// ===============================

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});


// ===============================
// FLOATING HEARTS
// ===============================

const hearts = document.querySelector(".hearts");

function createHeart() {
  if (!hearts) return;

  const heart = document.createElement("span");

  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 8 + Math.random() * 18 + "px";
  heart.style.animationDuration = 6 + Math.random() * 6 + "s";
  heart.style.animationDelay = Math.random() * 2 + "s";

  hearts.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 14000);
}

if (hearts) {
  setInterval(createHeart, 950);
}


// ===============================
// MUSIC
// ===============================

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

if (musicBtn && music) {
  musicBtn.addEventListener("click", async () => {

    if (music.paused) {

      try {
        await music.play();
        musicBtn.textContent = "❚❚";

      } catch (error) {
        alert("Add your music file to assets/music/birthday.mp3");
      }

    } else {

      music.pause();
      musicBtn.textContent = "♫";

    }

  });
}


// ===============================
// 🎂 BIRTHDAY CAKE
// ===============================

const cakeBtn = document.getElementById("cakeBtn");
const birthdayMessage = document.getElementById("birthdayMessage");

let candleBlown = false;

function blowCandle() {

  // Prevent double clicking
  if (candleBlown) return;

  candleBlown = true;

  // Blow candle
  if (cakeBtn) {
    cakeBtn.classList.add("blown");
  }

  // Show birthday message
  if (birthdayMessage) {
    birthdayMessage.classList.add("show");
  }

  // Confetti ❤️
  createConfetti();
}


// IMPORTANT:
// Only use ONE event.
// This works with mouse AND phone touch.
if (cakeBtn) {

  cakeBtn.addEventListener("click", blowCandle);

}


// ===============================
// 🎉 CONFETTI
// ===============================

function createConfetti() {

  const symbols = [
    "❤️",
    "💕",
    "✨",
    "🎉",
    "🥹",
    "🌷",
    "💗"
  ];

  for (let i = 0; i < 55; i++) {

    const piece = document.createElement("span");

    piece.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.position = "fixed";
    piece.style.left = 40 + Math.random() * 20 + "vw";
    piece.style.top = "45vh";

    piece.style.zIndex = "9999";
    piece.style.fontSize = 12 + Math.random() * 20 + "px";

    piece.style.pointerEvents = "none";

    document.body.appendChild(piece);

    const x = (Math.random() - 0.5) * 800;
    const y = 500 + Math.random() * 500;
    const r = (Math.random() - 0.5) * 900;

    const animation = piece.animate(
      [
        {
          transform: "translate(0,0) scale(1)",
          opacity: 1
        },
        {
          transform:
            `translate(${x}px,${y}px) rotate(${r}deg) scale(.5)`,
          opacity: 0
        }
      ],
      {
        duration: 2200 + Math.random() * 900,
        easing: "cubic-bezier(.2,.8,.2,1)"
      }
    );

    animation.onfinish = () => {
      piece.remove();
    };

  }
}