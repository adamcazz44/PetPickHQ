/* Pet Pick HQ — product data + interactions */

const RETAILERS = {
  amazon:   { name: "Amazon",         dot: "#F19E38" },
  chewy:    { name: "Chewy",          dot: "#1A6BB5" },
  petsmart: { name: "PetSmart",       dot: "#E0533D" },
  petco:    { name: "Petco",          dot: "#2C6FA6" },
  hollywood:{ name: "Hollywood Feed", dot: "#4E8A5F" },
};

// Each product: prices keyed by retailer (some products aren't at every store).
const PRODUCTS = [
  {
    id: "ortho-bed", cat: "beds", name: "OrthoCloud Memory-Foam Dog Bed",
    badge: "Best for seniors", why: "Joint-friendly foam that springs back — vet-approved for older or arthritic dogs.",
    rating: 4.8, reviews: 3120, ph: "dog bed",
    prices: { chewy: 89.99, amazon: 94.50, petsmart: 99.00, hollywood: 92.00 },
  },
  {
    id: "salmon-food", cat: "food", name: "WildCatch Grain-Free Salmon Recipe",
    badge: "Best overall food", why: "Single-source protein, no fillers. The bag our testers' dogs emptied fastest.",
    rating: 4.9, reviews: 5840, ph: "dry food bag",
    prices: { chewy: 54.99, amazon: 57.99, petco: 59.99, petsmart: 58.49 },
  },
  {
    id: "litter-robot", cat: "health", name: "AutoSift Self-Cleaning Litter Box",
    badge: "Editor's pick", why: "Scoops itself, app-tracks your cat's habits, and tames odor. Worth every penny.",
    rating: 4.7, reviews: 2110, ph: "litter box",
    prices: { amazon: 499.00, chewy: 519.00, petco: 529.99 },
  },
  {
    id: "treat-puzzle", cat: "toys", name: "BrainGames Treat Puzzle Feeder",
    badge: "Best boredom-buster", why: "Slows fast eaters and burns mental energy on rainy days. Dishwasher-safe.",
    rating: 4.6, reviews: 8730, ph: "treat puzzle",
    prices: { amazon: 21.99, chewy: 19.99, petsmart: 23.49, petco: 22.00 },
  },
  {
    id: "no-pull", cat: "walk", name: "EasyStride No-Pull Padded Harness",
    badge: "Best for walks", why: "Front-clip control without the choke. Padded chest panel won't rub on long hikes.",
    rating: 4.8, reviews: 6420, ph: "dog harness",
    prices: { chewy: 32.99, amazon: 29.99, petsmart: 34.99, hollywood: 33.50 },
  },
  {
    id: "slow-bowl", cat: "food", name: "SteadyEats Stainless Slow Feeder",
    badge: null, why: "Stops gulping and bloat, weighted base won't skate across the floor.",
    rating: 4.5, reviews: 4015, ph: "slow feeder bowl",
    prices: { amazon: 18.99, chewy: 17.49, petco: 19.99 },
  },
  {
    id: "catnip-kick", cat: "toys", name: "KickStar Catnip Kicker (3-pack)",
    badge: null, why: "Heavy-duty seams survive bunny-kicks. Stuffed with potent organic catnip.",
    rating: 4.7, reviews: 9210, ph: "catnip toys",
    prices: { chewy: 12.99, amazon: 11.49, petsmart: 13.99 },
  },
  {
    id: "dental-chew", cat: "health", name: "FreshBite Dental Chew Sticks",
    badge: "Vet favorite", why: "Ridged texture scrapes plaque while they gnaw. Genuinely fresher breath in two weeks.",
    rating: 4.6, reviews: 7330, ph: "dental chews",
    prices: { chewy: 24.99, amazon: 26.49, petco: 27.99, hollywood: 25.00 },
  },
  {
    id: "calm-hoodie", cat: "health", name: "CalmWrap Anxiety Comfort Vest",
    badge: "Best for storms", why: "Gentle constant pressure to ease thunder and fireworks panic. Breathable for all-day wear.",
    rating: 4.4, reviews: 3890, ph: "anxiety vest",
    prices: { amazon: 39.99, chewy: 42.99, petsmart: 44.99 },
  },
];

const CATEGORIES = [
  { id: "all",    label: "All picks" },
  { id: "food",   label: "Food & Treats" },
  { id: "toys",   label: "Toys" },
  { id: "beds",   label: "Beds & Furniture" },
  { id: "walk",   label: "Walking & Travel" },
  { id: "health", label: "Health & Wellness" },
];

const fmt = (n) => "$" + n.toFixed(2);
const wishlist = new Set(JSON.parse(localStorage.getItem("pph-wishlist") || "[]"));

function lowestRetailer(prices) {
  return Object.entries(prices).sort((a, b) => a[1] - b[1])[0][0];
}

function stars(rating) {
  const full = Math.round(rating);
  return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
}

function retailerRow(key, price, isLow) {
  const r = RETAILERS[key];
  return `
    <a class="buy ${isLow ? "buy--low" : ""}" href="#" data-affiliate="${key}" data-product="" onclick="return false;">
      <span class="buy__store"><span class="dot" style="background:${r.dot}"></span>${r.name}</span>
      <span class="buy__price">${fmt(price)}${isLow ? '<span class="buy__tag">lowest</span>' : ""}</span>
    </a>`;
}

function card(p) {
  const low = lowestRetailer(p.prices);
  const sorted = Object.entries(p.prices).sort((a, b) => a[1] - b[1]);
  const primary = sorted[0];
  const lowPrice = primary[1];
  const highPrice = sorted[sorted.length - 1][1];
  const liked = wishlist.has(p.id);

  return `
  <article class="card reveal" data-cat="${p.cat}" data-id="${p.id}">
    <div class="card__media ph" style="--ph-label:'${p.ph}'">
      <span class="ph__tag">${p.ph}</span>
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      <button class="heart ${liked ? "is-on" : ""}" aria-label="Save to wishlist" data-heart="${p.id}">♥</button>
    </div>
    <div class="card__body">
      <div class="card__rating"><span class="rating__stars">${stars(p.rating)}</span><span class="rating__num">${p.rating}</span><span class="rating__count">(${p.reviews.toLocaleString()})</span></div>
      <h3 class="card__name">${p.name}</h3>
      <p class="card__why">${p.why}</p>
      <div class="card__price">
        <span class="card__from">From</span>
        <span class="card__amt">${fmt(lowPrice)}</span>
        <span class="card__range">– ${fmt(highPrice)} across ${sorted.length} stores</span>
      </div>
      <div class="card__buy">
        ${retailerRow(low, lowPrice, true)}
      </div>
      <button class="compare" data-compare="${p.id}">Compare all ${sorted.length} prices ▾</button>
      <div class="card__all" data-all="${p.id}" hidden>
        ${sorted.map(([k, v]) => retailerRow(k, v, k === low)).join("")}
      </div>
    </div>
  </article>`;
}

function renderCats() {
  const wrap = document.getElementById("cat-pills");
  wrap.innerHTML = CATEGORIES.map((c, i) =>
    `<button class="pill ${i === 0 ? "is-active" : ""}" data-cat="${c.id}">${c.label}</button>`
  ).join("");
}

function renderProducts() {
  document.getElementById("grid").innerHTML = PRODUCTS.map(card).join("");
  observeReveals();
}

function updateWishCount() {
  const el = document.getElementById("wish-count");
  el.textContent = wishlist.size;
  el.classList.toggle("is-empty", wishlist.size === 0);
}

/* ---- interactions ---- */
function wire() {
  // category filter
  document.getElementById("cat-pills").addEventListener("click", (e) => {
    const btn = e.target.closest(".pill");
    if (!btn) return;
    document.querySelectorAll("#cat-pills .pill").forEach((p) => p.classList.remove("is-active"));
    btn.classList.add("is-active");
    const cat = btn.dataset.cat;
    document.querySelectorAll(".card").forEach((c) => {
      const show = cat === "all" || c.dataset.cat === cat;
      c.style.display = show ? "" : "none";
    });
  });

  // grid delegated clicks: compare + heart
  document.getElementById("grid").addEventListener("click", (e) => {
    const cmp = e.target.closest("[data-compare]");
    if (cmp) {
      const id = cmp.dataset.compare;
      const panel = document.querySelector(`[data-all="${id}"]`);
      const open = panel.hasAttribute("hidden");
      if (open) { panel.removeAttribute("hidden"); cmp.classList.add("is-open"); cmp.innerHTML = cmp.innerHTML.replace("▾", "▴"); }
      else { panel.setAttribute("hidden", ""); cmp.classList.remove("is-open"); cmp.innerHTML = cmp.innerHTML.replace("▴", "▾"); }
      return;
    }
    const heart = e.target.closest("[data-heart]");
    if (heart) {
      const id = heart.dataset.heart;
      if (wishlist.has(id)) { wishlist.delete(id); heart.classList.remove("is-on"); }
      else { wishlist.add(id); heart.classList.add("is-on"); heart.classList.add("pop"); setTimeout(() => heart.classList.remove("pop"), 300); }
      localStorage.setItem("pph-wishlist", JSON.stringify([...wishlist]));
      updateWishCount();
      return;
    }
  });

  // mobile nav toggle
  const navToggle = document.getElementById("nav-toggle");
  if (navToggle) navToggle.addEventListener("click", () => document.getElementById("nav-links").classList.toggle("is-open"));

  // newsletter
  const form = document.getElementById("news-form");
  if (form) form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    if (!input.value.includes("@")) { input.classList.add("err"); return; }
    form.innerHTML = '<p class="news__done">You\'re in! 🐾 Watch your inbox for this week\'s top picks.</p>';
  });
}

/* ---- scroll reveal ---- */
let io;
function observeReveals() {
  if (!io) {
    io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  renderCats();
  renderProducts();
  wire();
  updateWishCount();
  observeReveals();
});
