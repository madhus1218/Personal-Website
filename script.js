document.documentElement.classList.add("js");

const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll("nav a");
const cursorGlow = document.querySelector(".cursor-glow");
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector("#themeIcon");
const revealItems = document.querySelectorAll(".reveal");
const heroBadges = document.querySelectorAll(".hero-badges span");

function setActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    if (window.scrollY >= sectionTop - 180) {
      currentSection = section.getAttribute("id");
    }

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
      currentSection = sections[sections.length - 1].getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  if (themeIcon) {
    themeIcon.textContent = theme === "dark" ? "🔆" : "🌙";
  }
}

const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

window.addEventListener("mousemove", (event) => {
  if (cursorGlow) {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }

  heroBadges.forEach((badge, index) => {
    const speed = (index + 1) * 0.008;
    const x = (window.innerWidth / 2 - event.clientX) * speed;
    const y = (window.innerHeight / 2 - event.clientY) * speed;

    badge.style.transform = `translate(${x}px, ${y}px)`;
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealItems.forEach((item) => observer.observe(item));