const CARDS = [
  "baby-essentials-card.jpg",
  "babyproofing-supplies-card.jpg",
  "career-certification-card.jpg",
  "developmental-play-kit-card.jpg",
  "emergency-child-care-card.jpg",
  "family-hygiene-kit-card.jpg",
  "family-outing-card.jpg",
  "family-survival-kit-card.jpg",
  "fresh-produce-card.jpg",
  "holiday-meal-card.jpg",
  "home-starter-kit-card.jpg",
  "infant-car-seat-card.jpg",
  "infant-formula-card.jpg",
  "interview-outfit-card.jpg",
  "job-training-card.jpg",
  "month-of-diapers-card.jpg",
  "new-toy-card.jpg",
  "personal-documents-card.jpg",
  "sleep-essentials-card.jpg",
  "snacks-for-kids-card.jpg",
  "tank-of-gas-card.jpg",
  "three-bus-passes-card.jpg",
  "toddler-pajamas-card.jpg",
  "week-of-groceries-card.jpg",
  "work-boots-card.jpg",
  "vegetable-seeds-and-tools-card.jpg",
  "goat-card.jpg",
  "100-polio-vaccines-card.jpg",
  "2-baby-resuscitation-kits-card.jpg",
  "school-commuter-bicycle-card.jpg",
  "2-chickens-card.jpg",
  "refugee-support-card.jpg",
  "5-educational-feeding-sets-card.jpg",
  "125-therapeutic-food-packets-card.jpg",
];

const CYCLE_MS = 4200;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const grid = document.getElementById("grid");
const screen = document.getElementById("screen");
const tray = document.getElementById("tray");
const kiosk = document.getElementById("kiosk");
const payCard = document.getElementById("payCard");
const reader = document.getElementById("reader");
const overlay = document.getElementById("overlay");
const overlayImg = document.getElementById("overlayImg");
const overlayTitle = document.getElementById("overlayTitle");
const overlayClose = document.getElementById("overlayClose");

let lastIndex = -1;
let paused = false;
let busy = false;
let timer = null;

function titleFromFile(file) {
  return file
    .replace(/-card\.jpg$/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function buildGrid() {
  const frag = document.createDocumentFragment();
  CARDS.forEach((file, index) => {
    const slot = document.createElement("button");
    slot.type = "button";
    slot.className = "slot";
    slot.dataset.index = String(index);
    slot.setAttribute("role", "listitem");
    slot.setAttribute("aria-label", `View ${titleFromFile(file)}`);

    const img = document.createElement("img");
    img.src = `cards/${file}`;
    img.alt = titleFromFile(file);
    img.draggable = false;
    slot.appendChild(img);

    slot.addEventListener("click", () => openCard(index));
    frag.appendChild(slot);
  });
  grid.appendChild(frag);
}

function openCard(index) {
  const file = CARDS[index];
  overlayImg.src = `cards/${file}`;
  overlayImg.alt = titleFromFile(file);
  overlayTitle.textContent = titleFromFile(file);
  overlay.hidden = false;
  paused = true;
}

function closeOverlay() {
  overlay.hidden = true;
  overlayImg.src = "";
  paused = false;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pickIndex() {
  if (CARDS.length === 1) return 0;
  let next = lastIndex;
  while (next === lastIndex) {
    next = Math.floor(Math.random() * CARDS.length);
  }
  return next;
}

async function playCycle() {
  if (paused || busy || reduceMotion || !overlay.hidden) return;
  busy = true;

  const index = pickIndex();
  lastIndex = index;
  const slot = grid.children[index];
  const img = slot.querySelector("img");

  payCard.classList.remove("tap");
  void payCard.offsetWidth;
  payCard.classList.add("tap");
  reader.classList.add("paid");
  reader.querySelector(".reader-ready").textContent = "PAID";
  await wait(700);

  slot.classList.add("chosen");
  await wait(280);

  const slotBox = slot.getBoundingClientRect();
  const screenBox = screen.getBoundingClientRect();
  const trayBox = tray.getBoundingClientRect();

  const clone = img.cloneNode(true);
  clone.className = "falling-card";
  clone.style.left = `${slotBox.left - screenBox.left}px`;
  clone.style.top = `${slotBox.top - screenBox.top}px`;
  clone.style.width = `${slotBox.width}px`;
  clone.style.height = `${slotBox.height}px`;
  screen.appendChild(clone);

  slot.classList.add("empty");
  slot.classList.remove("chosen");

  const dropY = trayBox.top - slotBox.top + 8;
  requestAnimationFrame(() => {
    clone.style.transform = `translateY(${dropY}px) rotate(-10deg) scale(0.92)`;
    clone.style.opacity = "0.15";
  });

  await wait(900);
  clone.remove();

  slot.classList.remove("empty");
  slot.classList.add("restock");
  await wait(450);
  slot.classList.remove("restock");

  reader.classList.remove("paid");
  reader.querySelector(".reader-ready").textContent = "READY";
  payCard.classList.remove("tap");
  busy = false;
}

function startLoop() {
  if (reduceMotion) return;
  timer = setInterval(playCycle, CYCLE_MS);
  setTimeout(playCycle, 1200);
}

kiosk.addEventListener("mouseenter", () => { paused = true; });
kiosk.addEventListener("mouseleave", () => {
  if (overlay.hidden) paused = false;
});

overlay.addEventListener("click", (event) => {
  if (event.target === overlay) closeOverlay();
});
overlayClose.addEventListener("click", closeOverlay);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !overlay.hidden) closeOverlay();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) paused = true;
  else if (overlay.hidden) paused = false;
});

buildGrid();
startLoop();
