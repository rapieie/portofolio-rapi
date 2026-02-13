const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const year = document.getElementById("year");
const heroCard = document.getElementById("heroCard");
const themeToggle = document.getElementById("themeToggle");
const projectButtons = document.querySelectorAll(".project-btn");

year.textContent = new Date().getFullYear();

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

const savedTheme = localStorage.getItem("theme");
const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap");
}

applyTheme(savedTheme || (preferredDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const current = document.body.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  document.body.classList.add("theme-animate");
  applyTheme(next);
  localStorage.setItem("theme", next);
  window.setTimeout(() => {
    document.body.classList.remove("theme-animate");
  }, 500);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

heroCard.addEventListener("mousemove", (event) => {
  const rect = heroCard.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const rotateX = (y / rect.height - 0.5) * -6;
  const rotateY = (x / rect.width - 0.5) * 6;

  heroCard.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
});

heroCard.addEventListener("mouseleave", () => {
  heroCard.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
});

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    projectButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});
