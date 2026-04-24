# AI Tools Hub

A modern, AdSense-ready website for discovering AI tools, reading short guides, and using free mini tools. Built with **React + Vite + Tailwind CSS**, fully responsive, SEO-friendly, dark-mode ready, and structured so you can swap mock data for a real database later.

---

## ✨ Features

- Home, AI Tools directory, Blog, Article detail, Free Tools, About, Contact, Privacy, Terms, 404
- **4 free mini tools:** Prompt Generator, Business Name Generator, Study Planner, Online Income Calculator
- **Search & filter** by category on Tools and Blog pages (state reflected in URL)
- **Save favorites** (tools + articles), persisted in `localStorage`
- **Dark mode** with system-preference detection + manual toggle
- **AdSense-ready ad slots** (banner, sidebar, in-article, bottom) — clearly marked placeholders
- **SEO**: per-page meta + OpenGraph tags via `react-helmet-async`, Schema.org JSON-LD on articles, clean URLs, sitemap.xml, robots.txt, ads.txt
- **Newsletter CTA** (ready to wire up to your provider)
- Sticky nav, back-to-top button, trending badges, smooth animations

---

## 🚀 Quick start

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# → open http://localhost:5173

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview
```

### Requirements
- Node.js 18+ (Node 20 recommended)
- npm (or use pnpm / yarn if you prefer)

---

## 📁 Project structure

```
Website/
├── index.html                 # HTML shell + AdSense script tag (commented)
├── package.json
├── vite.config.js             # Vite + code-splitting
├── tailwind.config.js         # Design tokens, color palette, animations
├── postcss.config.js
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── ads.txt                # AdSense verification file
└── src/
    ├── main.jsx               # Providers (Theme, Favorites, Helmet, Router)
    ├── App.jsx                # Routes
    ├── index.css              # Tailwind layers + global styles
    ├── context/
    │   ├── ThemeContext.jsx
    │   └── FavoritesContext.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── SEO.jsx            # Helmet wrapper — per-page meta
    │   ├── AdSlot.jsx         # ← REPLACE WITH YOUR ADSENSE UNITS
    │   ├── ToolCard.jsx
    │   ├── ArticleCard.jsx
    │   ├── SearchBar.jsx
    │   ├── CategoryFilter.jsx
    │   ├── Newsletter.jsx
    │   ├── BackToTop.jsx
    │   └── ScrollToTop.jsx
    ├── data/                  # Mock data — swap for API/CMS later
    │   ├── categories.js
    │   ├── tools.js
    │   └── articles.js
    ├── pages/
    │   ├── Home.jsx
    │   ├── Tools.jsx
    │   ├── Blog.jsx
    │   ├── Article.jsx
    │   ├── FreeTools.jsx
    │   ├── About.jsx
    │   ├── Contact.jsx
    │   ├── Privacy.jsx
    │   ├── Terms.jsx
    │   └── NotFound.jsx
    └── tools/                 # The 4 free mini-tools
        ├── PromptGenerator.jsx
        ├── BusinessNameGenerator.jsx
        ├── StudyPlanner.jsx
        └── IncomeCalculator.jsx
```

---

## 💰 Hooking up Google AdSense

Everything is already in place — you only need to drop in your publisher ID.

### Step 1 — add the AdSense script

Open `index.html` and uncomment the AdSense `<script>` tag in the `<head>`. Replace `ca-pub-XXXXXXXXXXXXXXXX` with your real publisher ID (from your AdSense account).

```html
<script async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossorigin="anonymous"></script>
```

### Step 2 — add `ads.txt`

Open `public/ads.txt` and replace the placeholder publisher ID. This file is served at `/ads.txt` and required by AdSense.

### Step 3 — replace placeholders with real ad units

Open `src/components/AdSlot.jsx`. It has four pre-sized variants:
- `banner` — top of page, horizontal
- `sidebar` — desktop sidebar rectangle
- `in-article` — inside long content
- `bottom` — footer / end-of-article

Each one currently renders a dashed placeholder box labeled &ldquo;Google AdSense Ad Slot&rdquo;. Replace with the live `<ins className="adsbygoogle">` snippet AdSense gives you when you create each ad unit:

```jsx
import { useEffect } from 'react'

export default function AdSlot({ variant = 'banner', className = '' }) {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch {}
  }, [])

  const slotId = {
    banner: 'XXXXXXXXXX',
    sidebar: 'XXXXXXXXXX',
    'in-article': 'XXXXXXXXXX',
    bottom: 'XXXXXXXXXX',
  }[variant]

  return (
    <ins
      className="adsbygoogle block"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
```

> **Tip:** keep the current placeholder component during development and switch it live only after AdSense approval. That prevents &ldquo;invalid traffic&rdquo; flags.

### AdSense approval tips

- Your site needs 15+ pages of quality content before applying
- Privacy Policy, Terms and Contact pages are already included ✅
- Add a real domain, not localhost
- Submit your `sitemap.xml` to Google Search Console

---

## ✏️ Adding content

### New AI tool
Append to `src/data/tools.js`:

```js
{
  id: 'unique-slug',
  name: 'Tool name',
  tagline: 'One-line hook.',
  description: 'Longer description shown on cards / detail pages.',
  category: 'productivity',   // matches a slug in categories.js
  tags: ['ai', 'writing'],
  price: 'Freemium',          // Free / Freemium / Paid
  rating: 4.5,
  trending: true,
  emoji: '🤖',
  color: 'from-indigo-500 to-purple-500',
  url: 'https://example.com',
  affiliateUrl: '',           // your affiliate link (takes precedence if set)
}
```

### New blog post
Append to `src/data/articles.js`. Use the `content` array — each block is either
`{ type: 'p', text }`, `{ type: 'h2', text }`, or `{ type: 'list', items: [...] }`.

### New category
Edit `src/data/categories.js`. All filters on Tools and Blog pick it up automatically.

### Switching to a database later
The `tools.js` / `articles.js` files export arrays plus helper functions (`getTrendingTools`, `getFeatured`, `getArticle`, etc). Swap the array with a `fetch()` call or Supabase/Firestore query — keep the shape and the rest of the app keeps working.

---

## 🎨 Customizing the design

### Brand colors
Edit the `brand` and `accent` palettes in `tailwind.config.js`. Everything (buttons, chips, gradients) picks them up.

### Fonts
Change the Google Fonts link in `index.html` and the `fontFamily` entries in `tailwind.config.js`.

### Site name + metadata
Replace &ldquo;AI Tools Hub&rdquo; and `example.com` across:
- `index.html` (title, meta, OG tags)
- `src/components/SEO.jsx` (title template)
- `public/sitemap.xml`, `public/robots.txt`

---

## 🚢 Deploying

Any static host works. Easiest paths:

### Vercel
```bash
npm install -g vercel
vercel        # follow prompts
```

### Netlify
Drag and drop the `dist/` folder after `npm run build`, or connect the repo.

### Cloudflare Pages / GitHub Pages
Build command: `npm run build`. Output directory: `dist`.

### Important for SPAs
The site uses client-side routing. Configure your host to redirect unknown routes to `index.html`:

- **Netlify:** create `public/_redirects` with `/* /index.html 200`
- **Vercel:** handled automatically
- **Apache:** add `.htaccess` rewriting to `index.html`

---

## 🧩 Nice upgrades you can add later

- [ ] Swap mock data for Supabase / Contentful / Sanity CMS
- [ ] Server-side rendering with Next.js (better SEO for large catalogs)
- [ ] Full-text search with Algolia or MeiliSearch
- [ ] Comments section (Giscus, Disqus)
- [ ] Pagination on blog & tools when you cross ~50 items
- [ ] Install `@tailwindcss/typography` for richer article styling
- [ ] Hook `Newsletter.jsx` up to ConvertKit / Buttondown / Mailchimp
- [ ] Hook `Contact.jsx` up to Formspree / Web3Forms / your own API

---

## 📄 License

MIT — do whatever you want. If this site makes you money, that&rsquo;s awesome; no attribution required but very appreciated.
