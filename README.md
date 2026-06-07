# 🐾 Pet Pick HQ

An independent, reader-supported landing page that **handpicks and price-checks the best pet products**, then links each one out to whichever retailer has the best price — Amazon, Chewy, PetSmart, or Petco. Every product link is an **affiliate link**.

It's a marketing/curation site, not a store: we don't hold inventory or process checkout. Each product card surfaces multiple "Buy at [retailer]" buttons with prices and flags the lowest one.

![Pet Pick HQ](.thumbnail)

---

## ✨ Features

- **Multi-retailer price comparison** — every product card shows prices across stores, auto-flags the lowest, and expands a full comparison.
- **Affiliate-ready buy buttons** — swap in your real affiliate URLs (see below).
- **Category filtering** — Food & Treats, Toys, Beds & Furniture, Walking & Travel, Health & Wellness.
- **Wishlist** — heart any product; saved to `localStorage`.
- **Newsletter signup** with inline validation.
- **Scroll-reveal animations**, sticky header, responsive mobile nav.
- **Live Tweaks panel** — change palette, heading font, hero layout, corner roundness, and badges (toggle via the toolbar).
- **Drag-and-drop hero image slot** + labeled placeholders for product photos.
- **Affiliate disclosure** in the footer and top strip.

---

## 📁 Project structure

| File | Purpose |
|------|---------|
| `index.html` | Page markup + all CSS. Entry point. |
| `app.js` | Product data, retailer config, and all interactions (filtering, wishlist, compare, newsletter, reveals). |
| `tweaks-app.jsx` | Tweaks panel app — maps controls to CSS variables. |
| `tweaks-panel.jsx` | Tweaks panel shell + form controls (host protocol). |
| `image-slot.js` | `<image-slot>` web component for drag-and-drop images. |

---

## 🚀 Run locally

It's static — no build step. Serve the folder with any static server:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then open <http://localhost:8000>. (Open `index.html` directly via `file://` mostly works, but a server avoids browser restrictions on fonts/components.)

---

## 🔧 Customize

### 1. Products & prices
Edit the `PRODUCTS` array in **`app.js`**. Each entry:

```js
{
  id: "ortho-bed",
  cat: "beds",                  // must match a CATEGORIES id
  name: "OrthoCloud Memory-Foam Dog Bed",
  badge: "Best for seniors",    // or null
  why: "Short reason this pick made the cut.",
  rating: 4.8, reviews: 3120,
  ph: "dog bed",                // placeholder label
  prices: { chewy: 89.99, amazon: 94.50, petsmart: 99.00 },
}
```

### 2. Affiliate links
The buy buttons are rendered in `retailerRow()` in **`app.js`** with `href="#"`. Replace that with your real affiliate URL per product/retailer (e.g. store a `links: { amazon: "https://...", chewy: "https://..." }` map on each product and read from it). Add `rel="nofollow sponsored"` and `target="_blank"` for compliance.

### 3. Images
- **Hero:** drag a photo onto the hero slot in the preview, or set the `<image-slot>`'s source.
- **Products:** the striped `.ph` blocks are placeholders — replace with real `<img>` photos in `card()`.

### 4. Theme
Defaults live in `:root` in **`index.html`** and in `TWEAK_DEFAULTS` in **`tweaks-app.jsx`**. Edit CSS variables (`--primary`, `--secondary`, `--ink`, `--bg`, `--radius`, `--head-font`).

---

## ⚖️ Affiliate disclosure

This template includes a sample affiliate disclosure in the header strip and footer. **Replace it with your own** that meets FTC guidelines and each affiliate program's terms (Amazon Associates, Chewy, etc.). Prices shown are illustrative placeholders.

---

## 📦 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Pet Pick HQ landing page"
git branch -M main
git remote add origin https://github.com/<you>/pet-pick-hq.git
git push -u origin main
```

To host free via **GitHub Pages**: repo → Settings → Pages → deploy from `main` / root.

---

## 📄 License

MIT — see `LICENSE`. Fonts (Bricolage Grotesque, Hanken Grotesk, Space Grotesk, Fraunces) are loaded from Google Fonts under the SIL Open Font License.
