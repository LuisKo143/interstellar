// Scroll-to-top Button
const toTopBtn = document.getElementById("toTopBtn");

if (toTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      toTopBtn.style.display = "block";
    } else {
      toTopBtn.style.display = "none";
    }
  });

  toTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Burger-Menü
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

// Fade-in beim Scrollen
const fadeEls = document.querySelectorAll(".fade-in");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  fadeEls.forEach(el => observer.observe(el));
} else {
  // Fallback: alles direkt sichtbar
  fadeEls.forEach(el => el.classList.add("visible"));
}

// Zeitdilatations-Tool (nur auf science.html vorhanden)
const hoursInput = document.getElementById("hoursInput");
const hoursValue = document.getElementById("hoursValue");
const yearsResult = document.getElementById("yearsResult");

if (hoursInput && hoursValue && yearsResult) {
  const updateTime = () => {
    const hours = Number(hoursInput.value);
    const years = hours * 7; // vereinfachtes Modell
    hoursValue.textContent = hours.toString();
    yearsResult.textContent = years.toString();
  };

  hoursInput.addEventListener("input", updateTime);
  updateTime();
}

// Soundtrack: Klick auf Track spielt Audio ab
const audioPlayer = document.getElementById("audioPlayer");

if (audioPlayer) {
  const trackElements = document.querySelectorAll(".track");

  trackElements.forEach(track => {
    track.addEventListener("click", () => {
      const src = track.dataset.audio;
      if (!src) return;

      // Wenn schon dieses Lied läuft → Pause
      if (audioPlayer.src.includes(src) && !audioPlayer.paused) {
        audioPlayer.pause();
        track.classList.remove("playing");
        return;
      }

      // anderes Lied oder Player war aus → neues Lied laden & abspielen
      document.querySelectorAll(".track.playing")
        .forEach(t => t.classList.remove("playing"));

      audioPlayer.src = src;
      audioPlayer.play();
      track.classList.add("playing");
    });
  });
}
