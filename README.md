# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**
BazarDor is a Bangla-first web app that shows today's market prices of everyday essentials — rice, lentils, oil, vegetables, fish, meat, eggs & dairy and spices — together with the price change since yesterday and a market-by-market breakdown.

- 🔗 **Live site:** _add your deployed link here_
- 💻 **Repository:** _add your GitHub link here_

---

## ✨ Key features

1. **Live price ticker** — an infinite scrolling strip under the navbar with emoji, product name, price per unit and a ▲ / ▼ change badge (pauses on hover).
2. **Daily movers** — the home page highlights the **top 6 price risers (▲ আজ দাম বেড়েছে)** and **top 6 fallers (▼ আজ দাম কমেছে)**, followed by the full **সব পণ্য** grid; the hero button smooth-scrolls to it with a same-page anchor.
3. **Category pages with sorting** — every category has its own page and a **সাজান** dropdown (ডিফল্ট / দাম: কম থেকে বেশি / দাম: বেশি থেকে কম). Sorting uses the *numeric* value, so Bengali numerals like `৯৯` and `১৪৮` are ordered correctly.
4. **Market-wise price details** — a protected product page with minimum, maximum and average price plus a table of 12 real market names across divisions.
5. **Authentication with BetterAuth** — email + password, **Google** and **GitHub** login, toast messages for every success / error, and protected routes that redirect guests to sign in.
6. **Profile & update information** — view your account, sign out, and change your name on a separate route using BetterAuth's `updateUser`.
7. **Skeleton loaders, 404 page and fully responsive layout** — mobile, tablet and desktop; unknown categories / products show a friendly 404 with a **হোম পেজে ফিরে যান** button.

## 🧰 Technologies used

| Purpose | Technology |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org/) (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 + [DaisyUI 5](https://daisyui.com/) |
| Auth | [BetterAuth](https://better-auth.com/) (email/password, Google, GitHub) |
| Database | SQLite (local) · PostgreSQL (production, e.g. Neon) |
| Notifications | react-hot-toast |
| Font | Hind Siliguri (Bangla + Latin) |
| Deployment | Vercel |

## 🗂️ Project structure

```
app/                 routes: / · /category/[slug] · /product/[slug] · /signin · /signup · /profile · /profile/update
  api/auth/[...all]  BetterAuth handler
  api/products       JSON API used by the Home and Category pages
components/          Header, Ticker, ProductCard, SortDropdown, skeletons, auth forms …
lib/                 auth config, Bengali number/date helpers, sorting, categories
data/products.json   33 products × 12 markets (sample data)
middleware.ts        protects /product/** and /profile/**
```

## 🚀 Run it locally

```bash
# 1. install
npm install

# 2. environment variables
cp .env.example .env        # then edit .env (see below)

# 3. create the auth tables (SQLite file ./sqlite.db)
npm run auth:migrate

# 4. start
npm run dev                  # http://localhost:3000
```

### Environment variables

| Name | What it is |
| --- | --- |
| `BETTER_AUTH_SECRET` | any long random string (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` locally, your site URL in production |
| `DATABASE_URL` | leave empty locally; a Postgres URL in production |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth client (callback `…/api/auth/callback/google`) |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth app (callback `…/api/auth/callback/github`) |

Email/password works without any OAuth keys; the Google / GitHub buttons need their keys.

## ☁️ Deploy on Vercel

1. Create a free Postgres database (for example on [Neon](https://neon.tech)) and copy its connection string.
2. Create the tables once: put `DATABASE_URL=<your string>` in `.env` and run `npm run auth:migrate`.
3. Import the repository in Vercel and add the environment variables above (`BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` = your Vercel URL).
4. Add your Vercel URL to the Google / GitHub OAuth callback settings.

Dynamic routes (`/category/[slug]`, `/product/[slug]`) are rendered by Next.js on the server, so refreshing any page works without a 404.

## 📝 Notes

- Prices are **sample data** generated for the assignment (`npm run data:generate`) — they are not live market prices.
- Colour convention follows the design: a price **increase** is red, a **decrease** is green, no change is gray.

---

Made with 💚 for the BazarDor assignment.
