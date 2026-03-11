# CLAUDE.md — McLainders Wedding Website

This file provides guidance for AI assistants working on this codebase.

## Project Overview

A bilingual (French UI) wedding website for the "McLainders" couple, built with React + Vite + Tailwind CSS and deployed on Netlify. The site covers wedding information, RSVP collection, accommodation listings, transport/carpool coordination, and guest volunteer sign-ups. Backend logic runs as Netlify serverless functions backed by Supabase.

**Wedding details:** Samedi 7 novembre 2026 at Bastide des Hirondelles, Val d'Oingt (69620), France.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v7 |
| Styling | Tailwind CSS v3 |
| Build | Vite 5 |
| Backend (serverless) | Netlify Functions (Node.js, CommonJS) |
| Database | Supabase (PostgreSQL) |
| Notifications | Nodemailer (Gmail SMTP), Whapi (WhatsApp) |
| Deployment | Netlify (auto-deploy from `master` via GitHub Actions) |

## Project Structure

```
mclainders/
├── public/                    # Static assets served as-is
│   └── gallery/               # Wedding photos and banner images
│       └── gites/             # Accommodation photos
├── src/
│   ├── components/            # Reusable React components
│   │   ├── common/            # Generic UI: Modal, ErrorMessage, LoadingSpinner
│   │   ├── Header.jsx         # Responsive nav (desktop + mobile burger)
│   │   ├── Footer.jsx
│   │   ├── ErrorBoundary.jsx  # Top-level error catch
│   │   ├── OptimizedImage.jsx # Lazy-loading image wrapper
│   │   ├── DJSpotForm.jsx     # DJ slot reservation form
│   │   ├── BrunchCookingForm.jsx
│   │   ├── ProposalForm.jsx   # Guest talent/proposal form
│   │   └── VolunteerSlotForm.jsx
│   ├── pages/                 # Route-level page components (all lazy-loaded)
│   │   ├── HomePage.jsx
│   │   ├── AgendaPage.jsx      → /deroule
│   │   ├── AccommodationPage.jsx → /hebergements
│   │   ├── TransportPage.jsx   → /transport
│   │   ├── RSVPPage.jsx        → /confirmez-votre-venue
│   │   ├── WeNeedYouPage.jsx   → /participez
│   │   ├── WeddingListPage.jsx → /liste-de-mariage
│   │   └── ChildrenPage.jsx    → /enfants
│   ├── hooks/
│   │   ├── useSupabaseData.js  # Generic Supabase SELECT hook
│   │   └── useFormSubmit.js    # Generic form submit state hook
│   ├── constants/
│   │   └── wedding.js          # WEDDING_INFO, ROUTES, time slots, schedule
│   ├── data/
│   │   ├── accommodations.json
│   │   └── beaujolais_attractions.json
│   ├── utils/
│   │   └── supabase.js         # Supabase client (frontend, ESM)
│   ├── polyfills/
│   │   └── WebSocket.js        # WS polyfill for Supabase realtime (disabled)
│   ├── App.jsx                 # Router + layout shell
│   ├── main.jsx                # React mount point
│   └── index.css               # Global styles
├── netlify/
│   └── functions/             # Netlify serverless functions (CommonJS)
│       ├── submitRSVP.js
│       ├── reserveDJSpot.js
│       ├── reserveBrunchCookingSlot.js
│       ├── reserveVolunteerSlot.js
│       ├── submitCarpool.js
│       ├── contactCarpool.js
│       ├── submitProposal.js
│       ├── rsvpWebhook.js
│       └── rsvpBiweeklySummary.js  # Scheduled: 1st & 15th at 09:00 UTC
├── docs/                       # SQL setup scripts and docs
│   ├── rsvp-setup.sql
│   ├── volunteer-slots-setup.sql
│   ├── carpool-setup.sql
│   ├── accommodations_rows.sql
│   └── ...
├── scripts/
│   └── download-assets.js      # Asset download helper (currently no-op)
├── .github/workflows/
│   └── deploy-with-images.yml  # CI: build + deploy to Netlify on push to master
├── netlify.toml                # Netlify build config, headers, redirects, schedule
├── vite.config.js
├── tailwind.config.js
└── .env.example
```

## Routing

All routes are defined in `src/App.jsx`. Pages are lazy-loaded via `React.lazy()`.

| Path | Page component |
|---|---|
| `/` | HomePage |
| `/deroule` | AgendaPage |
| `/hebergements` | AccommodationPage |
| `/transport` | TransportPage |
| `/confirmez-votre-venue` | RSVPPage |
| `/participez` | WeNeedYouPage |
| `/liste-de-mariage` | WeddingListPage |
| `/enfants` | ChildrenPage |

The Netlify SPA redirect (`/* → /index.html`) handles deep-link refreshes.

> **Note:** `src/constants/wedding.js` exports a `ROUTES` object, but its values are stale (they reference old paths like `/rsvp`, `/logement`). The actual paths in `App.jsx` are the source of truth.

## Data Layer

### Frontend — `useSupabaseData` hook
```js
const { data, loading, error, refetch } = useSupabaseData('table_name', {
  select: '*',           // optional column selector
  orderBy: 'column',    // optional sort column
  orderDirection: 'asc',
  single: false,
  transform: (rows) => rows, // optional transform function
});
```
Use this hook for all read-only Supabase queries from React components.

### Supabase client
- Frontend (ESM): `src/utils/supabase.js` — uses `import.meta.env.VITE_SUPABASE_URL/KEY`
- Netlify functions (CJS): each function instantiates its own client via `process.env.VITE_SUPABASE_URL/KEY` (or `SUPABASE_URL/KEY` for the scheduled summary)

Realtime is **disabled** in the frontend client to avoid WebSocket issues in the Vite environment.

### Supabase tables

| Table | Used by |
|---|---|
| `rsvp` | submitRSVP, rsvpBiweeklySummary |
| `dj_spots` | WeNeedYouPage, reserveDJSpot |
| `brunch_cooking_slots` | WeNeedYouPage, reserveBrunchCookingSlot |
| `voiturier_slots` | VolunteerSlotForm, reserveVolunteerSlot |
| `accueil_slots` | VolunteerSlotForm, reserveVolunteerSlot |
| `cafe_slots` | VolunteerSlotForm, reserveVolunteerSlot |
| `rangement_slots` | VolunteerSlotForm, reserveVolunteerSlot |
| `carpool_offers` | TransportPage, submitCarpool |

SQL setup scripts are in `docs/`.

## Netlify Functions

All functions are CommonJS (`require`/`exports.handler`). Pattern:

1. Reject non-POST methods (405)
2. Parse `event.body` as JSON
3. Validate required fields (400)
4. Instantiate Supabase client from `process.env`
5. Perform DB operation
6. Return `{ success: bool, message: string }`

CORS headers (`Access-Control-Allow-*`) are set on all responses; OPTIONS preflight is handled explicitly.

### Scheduled function
`rsvpBiweeklySummary` runs on cron `0 9 1,15 * *`. It can also be triggered manually via HTTP POST with header `x-test-token: <WHAPI_TOKEN>`.

## Forms and Mutations

### `useFormSubmit` hook
```js
const { submitting, submitStatus, handleSubmit } = useFormSubmit(async (formData) => {
  const res = await fetch('/.netlify/functions/myFunction', { method: 'POST', body: JSON.stringify(formData) });
  const json = await res.json();
  return { success: res.ok, message: json.message };
});

// In JSX:
<form onSubmit={(e) => { e.preventDefault(); handleSubmit(formData, onSuccessCallback); }}>
```

`submitStatus` is `null | { success: boolean, message: string }`.

## Environment Variables

Copy `.env.example` to `.env` for local development.

| Variable | Used in | Purpose |
|---|---|---|
| `VITE_SUPABASE_URL` | Frontend + most functions | Supabase project URL |
| `VITE_SUPABASE_KEY` | Frontend + most functions | Supabase anon key |
| `SUPABASE_URL` | rsvpBiweeklySummary | Same URL (alternate name) |
| `SUPABASE_KEY` | rsvpBiweeklySummary | Same key (alternate name) |
| `EMAIL_USER` | submitProposal | Gmail sender address |
| `EMAIL_PASS` | submitProposal | Gmail app password |
| `PROPOSAL_EMAIL_TO` | submitProposal | Recipient email |
| `WHAPI_TOKEN` | rsvpWebhook, rsvpBiweeklySummary | Whapi API token |
| `WHAPI_PHONE_NUMBER` | rsvpWebhook, rsvpBiweeklySummary | Comma-separated phone numbers (international format, e.g. `33612345678`) |

In Netlify CI (`deploy-with-images.yml`), `SUPABASE_URL` and `SUPABASE_ANON_KEY` are used as GitHub secrets (note: key name differs from the runtime env var).

## Development Workflow

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production (downloads assets if needed, then Vite build)
npm run build

# Preview production build
npm run preview
```

For local Netlify function testing, use the Netlify CLI:
```bash
netlify dev   # runs at http://localhost:8888 (proxies Vite at 5173)
```

### Deployment
- **Production branch:** `master`
- GitHub Actions (`.github/workflows/deploy-with-images.yml`) auto-deploys to Netlify on push to `master`
- Netlify also rebuilds on direct pushes (configured in Netlify dashboard)

## Key Conventions

### Language
- UI text and French content is in French (the site targets French-speaking guests)
- Code, comments, and commit messages may be in English or French

### Component patterns
- Functional components only, no class components
- `useCallback` for event handlers passed as props
- Pages are not exported with props; they fetch their own data via hooks
- Shared UI primitives live in `src/components/common/`

### Constants
- Wedding-specific constants (dates, venue, time slots, schedule) belong in `src/constants/wedding.js`
- Do not hardcode wedding dates or venue details inside page components

### Styling
- Tailwind CSS utility classes only — no custom CSS files except `src/index.css` for global resets
- Color accent: `orange-500` (primary brand color used for spinners, highlights)
- Banner images use absolute positioning with `z-20` header overlaid on top

### Netlify functions
- Each function is a standalone file in `netlify/functions/`
- Use CommonJS (`require`, `module.exports`/`exports.handler`)
- Always validate table names against an allowlist before using them in queries (see `reserveVolunteerSlot.js`)
- Return `{ success: boolean, message: string }` in the JSON body

### Images
- Static gallery images live in `public/gallery/`
- Use `OptimizedImage` component (`src/components/OptimizedImage.jsx`) for lazy-loading
- Caching headers are set in `netlify.toml`: 1 year for `/assets/*`, 1 day for `/gallery/*`

### Adding a new page
1. Create `src/pages/MyPage.jsx`
2. Add a lazy import in `src/App.jsx`
3. Add a `<Route>` in the `<Routes>` block
4. Add nav links in `src/components/Header.jsx` (both desktop and mobile sections)

### Adding a new Netlify function
1. Create `netlify/functions/myFunction.js`
2. Export `exports.handler = async (event, context) => { ... }`
3. Handle OPTIONS preflight, validate method, set CORS headers
4. Call from the frontend via `fetch('/.netlify/functions/myFunction', ...)`

## Supabase Schema Notes

- `rsvp` table fields: `first_name`, `last_name`, `email`, `presence_saturday`, `presence_sunday`, `with_children`, `children_count`, `comments`, `created_at`
- Slot tables (`dj_spots`, `brunch_cooking_slots`, volunteer tables) use a `spot_index` column and are updated (not inserted) on reservation — rows are pre-seeded
- `carpool_offers` table uses insert on new offer submission

## Performance Notes

- All pages are code-split via `React.lazy()` — do not remove `Suspense`/lazy imports
- Supabase realtime is disabled (no WebSocket subscription overhead)
- HTTP caching is configured in `netlify.toml` for assets and gallery images
