# The Crypto Masters Website — Full Build Spec

## Overview
Complete rebuild of thecryptomasters.com. Modernize from Vue 2 + Vuetify to Next.js 15.

## Brand
- **Name:** The Crypto Masters (always "The" — always plural "are")
- **Colors:** Primary teal #274653, accent gold #e9c269
- **Logo files:** In project root (migrated from old site) — tcmLogo_capNoBg.png, crypto_masters_logo_withText_rounded.svg
- **Vibe:** Modern, clean dark mode. Rich dark backgrounds using the teal as base. Gold for accents, CTAs, highlights. No dated textures or busy backgrounds.
- **Font:** Inter (Google Fonts)

## Tech Stack
- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS 4 + shadcn/ui components
- **Charts:** Recharts (lightweight)
- **Animations:** Framer Motion (subtle, tasteful)
- **Crypto API:** CoinCap (primary, free, WebSocket for live prices) + CoinGecko as fallback for coin detail pages
- **CMS:** Sanity (set up schema but use placeholder/mock content for now — we'll connect later)
- **Newsletter:** Beehiiv embed (subscribe URL: https://the-crypto-masters.beehiiv.com/)
- **Analytics:** Vercel Analytics (add the package)
- **Hosting:** Vercel (will deploy after build)

## Pages & Routes

### 1. Home `/`
- Hero section with gradient background (teal → darker teal), headline "Helping You Master an Understanding of Crypto Assets", subtitle, two CTAs: "Listen Now" → /podcast, "Crypto Prices" → /crypto
- Logo prominently displayed
- Live crypto ticker bar (BTC, ETH, top coins — CoinCap WebSocket)
- Latest podcast episode card (placeholder for now)
- Newsletter signup section (Beehiiv embed/form — prominent, gold CTA)
- Crypto tools preview cards linking to /tools/hindsight and /tools/market-cap
- Footer

### 2. About `/about`
- Team section with modernized cards for Brian McCoy and Ross Eaton
- Use the headshot images from project root (ross_headshot.png, brian_headshot.png)
- Brian bio: "Hey I'm Brian. I am a current practicing lawyer. I co-managed a frontier markets hedge fund for almost 20 years. So my background in investing is in equities. I have been investing in crypto currency since 2018 and am focused on bitcoin and altcoins as a long term investment."
- Ross bio: "Hello I'm Ross. I have a degree in Computer Science with 6 years of experience in software development and data analysis. I have been in the world of cryptocurrency since 2017. I see crypto as the tech of the future with potential of replacing traditional banking systems."
- Social links: Brian twitter https://twitter.com/cryptolerable, Ross twitter https://twitter.com/RosstheCryptoB1
- Mission/values cards: Goal, Focus, Helping You (from old site)
- Email: brian@thecryptomasters.com, ross@thecryptomasters.com

### 3. Podcast `/podcast`
- Episode grid with search/filter
- Skeleton loaders while loading
- Individual episode pages at `/podcast/[slug]` (use placeholder data for now)
- Links to listen: Spotify, Apple Podcasts, YouTube, Podbean

### 4. Blog `/blog`
- Card grid with search
- Individual posts at `/blog/[slug]` (placeholder data)
- Clean reading experience

### 5. Crypto Prices `/crypto`
- Live price table with columns: Rank, Coin (logo + name + symbol), Price, 24h%, 7d%, 30d%, Market Cap, 7-day sparkline
- Pagination (100 per page)
- Coin search
- Market stats toggle (total coins, total market cap, BTC dominance)
- Use CoinCap API for list, CoinGecko fallback
- "Powered by CoinCap" attribution
- Click row → coin detail page

### 6. Coin Detail `/crypto/[coinId]`
- Coin header: logo, name, symbol, rank badge
- Price, 24h change, market cap, total supply, max supply
- Price chart with date range selector (24H, 1W, 1M, 3M, 6M, YTD, MAX) — use Recharts
- Coin description (expandable)
- Links to website, source code
- Breadcrumb navigation
- Use CoinGecko API for detail data + historical chart

### 7. Professor Hindsight `/tools/hindsight`
- Profit calculator: select coin, start date, end date, amount invested → shows profit/loss
- Sparkline of price over period
- Investment details: starting price, ending price, new amount
- Professor Hindsight character image (professor_hindsight.png)
- Use CoinGecko historical data API

### 8. Price at Market Cap `/tools/market-cap`
- Select base coin, select comparison coin → shows what base coin price would be at comparison coin's market cap
- Market cap multiplier display
- Stablecoin detection
- Tool image (priceAtMarketCap.png)
- Use CoinGecko API

### 9. 404 Page
- Fun, branded 404 with link back to home

## Layout Components

### Navbar
- Logo + "THE CRYPTO MASTERS" text
- Nav items: Home, About, Podcast, Blog, Crypto Tools (dropdown: Prices, Hindsight, Market Cap)
- Mobile: hamburger menu with slide-out drawer
- Sticky, dark, elevated on scroll

### Footer
- Social links: Facebook (https://www.facebook.com/TheCryptocurrencyMasters), Twitter/X (https://twitter.com/theCryptoMS1), Instagram (https://www.instagram.com/the_crypto_masters/), YouTube (https://www.youtube.com/channel/UCyrKtJ25wtlemNHk5MG-9tQ)
- Email: thecryptomasters19@gmail.com
- Legal disclaimer: "Nothing in our podcast, website, or social media should be considered investment advice. We are not financial advisors..."
- Copyright with dynamic year
- Newsletter subscribe link
- Use X icon instead of old Twitter bird

## Design Guidelines
- Dark mode throughout — base background: #1a1a2e or similar deep dark, cards slightly lighter
- Teal #274653 for primary surfaces, navbar, footer
- Gold #e9c269 for CTAs, accents, highlights, hover states
- Subtle gradient hero sections
- Glass-morphism on cards (subtle, not overdone)
- Smooth page transitions and scroll animations (Framer Motion)
- Mobile-first responsive
- Clean typography with Inter font
- Green for positive price changes, red for negative (standard crypto convention)

## API Setup

### CoinCap (Primary — crypto list + live prices)
- Base URL: https://api.coincap.io/v2
- Endpoints: /assets (list), /assets/{id} (detail), /assets/{id}/history
- WebSocket: wss://ws.coincap.io/prices?assets=bitcoin,ethereum,...
- No API key needed for basic usage
- Rate limit: 200 req/min (generous)

### CoinGecko (Fallback — detail pages + historical data)  
- Base URL: https://api.coingecko.com/api/v3
- Endpoints: /coins/{id}, /coins/{id}/market_chart/range, /coins/markets, /search, /global
- Free tier: 30 calls/min with API key
- Use for: coin detail pages, historical charts, profit calculator, market cap tool

## Important Notes
- All images/assets from old site are in project root — move them to public/ or src/assets/ as appropriate
- DO NOT use Prismic — that's the old CMS
- Set up Sanity schema files but use hardcoded placeholder data for now (blog posts, podcast episodes)
- Ensure all meta tags (OG, Twitter cards) are set up per page
- Add Beehiiv newsletter signup prominently on homepage
- Make the site FAST — optimize images, use Next.js Image component, lazy load below-fold content
- TypeScript throughout
- Set up proper error boundaries and loading states
- Do NOT set up any API keys or environment variables — just use the free endpoints directly for now

## File Structure (suggested)
```
src/
  app/
    layout.tsx
    page.tsx (home)
    about/page.tsx
    podcast/page.tsx
    podcast/[slug]/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    crypto/page.tsx
    crypto/[coinId]/page.tsx
    tools/
      hindsight/page.tsx
      market-cap/page.tsx
    not-found.tsx
  components/
    layout/Navbar.tsx, Footer.tsx
    home/Hero.tsx, CryptoTicker.tsx, NewsletterSignup.tsx, ToolsPreview.tsx
    crypto/PriceTable.tsx, CoinDetail.tsx, PriceChart.tsx, CoinSearch.tsx
    tools/HindsightCalculator.tsx, MarketCapCalculator.tsx
    podcast/EpisodeCard.tsx, EpisodeGrid.tsx
    blog/BlogCard.tsx, BlogGrid.tsx
    ui/ (shadcn components)
  lib/
    api/coincap.ts, coingecko.ts
    utils.ts
  types/
    index.ts
```

When completely finished, run this command to notify me:
openclaw system event --text "Done: TCM website full build complete — Next.js 15, all pages, crypto tools, newsletter signup, dark mode design" --mode now
