const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll("nav a");

function setActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop - 180) {
      currentSection = section.getAttribute("id");
    }

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 5
    ) {
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

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);