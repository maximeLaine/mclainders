# McLainders Wedding Website

A beautiful, responsive wedding website built with React, Vite, and Tailwind CSS.

## Overview

This website serves as a digital hub for wedding information, allowing guests to learn about the couple's story, access travel information, view the gift registry, and RSVP to the event.

## Features

- **Home Page**: Welcome page with essential wedding information
- **Our Story**: The couple's journey and story
- **Travel Information**: Details about the venue, accommodations, and travel tips
- **Gift Registry**: Wedding registry information
- **RSVP System**: Online response system for guests

## Technology Stack

- **Frontend**: React 18
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Backend Integration**: Supabase

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mclainders.git
cd mclainders

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
```

The site will be available at http://localhost:5173

### Building for Production

```bash
# Build for production
npm run build
# or
yarn build
```

### Preview Production Build

```bash
# Preview the production build
npm run preview
# or
yarn preview
```

## Project Structure

```
├── dist/               # Production build files
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── data/           # Static data files
│   ├── pages/          # Page components
│   ├── App.jsx         # Main application component
│   ├── index.css       # Global styles
│   └── main.jsx        # Application entry point
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── postcss.config.js   # PostCSS configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Architecture

### Frontend (React + Vite)
- Entry: `index.html` → `src/main.jsx` mounts `<App />`. On render failure, it falls back to `src/pages/FallbackPage.jsx`.
- App shell: `src/App.jsx` wraps routes with `src/components/ErrorBoundary.jsx`, `src/components/Header.jsx`, and `src/components/Footer.jsx`.
- Routing (React Router):
  - `/` → `src/pages/HomePage.jsx`
  - `/notre-clan` → `src/pages/OurStoryPage.jsx`
  - `/logement` → `src/pages/AccommodationPage.jsx`
  - `/beaujolais` → `src/pages/BeaujolaisPage.jsx`
  - `/rsvp` → `src/pages/RSVPPage.jsx`
  - `/nous-avons-besoin-de-vous` → `src/pages/WeNeedYouPage.jsx`

### Data Layer (Supabase)
- Client: `src/utils/supabase.js` initializes the Supabase client using `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY`.
- Generic fetching hook: `src/hooks/useSupabaseData.js` → `supabase.from(table).select(...)` with optional ordering and transform, exposing `{ data, loading, error, refetch }`.
- Usage:
  - `AccommodationPage` loads `accommodations` and filters by `type`.
  - `BeaujolaisPage` loads `attractions` and filters by `category`.
  - `WeNeedYouPage` loads `dj_spots` and `brunch_cooking_slots`; latter is grouped into `{ time, positions[] }` for the UI.

### Forms and Mutations
- `src/hooks/useFormSubmit.js` standardizes submitting state and messages.
- `RSVPPage` posts to a Netlify Function: `/.netlify/functions/submitRSVP`.
- `WeNeedYouPage` embeds:
  - `src/components/DJSpotForm.jsx` → POST `/.netlify/functions/reserveDJSpot`.
  - `src/components/BrunchCookingForm.jsx` → POST `/.netlify/functions/reserveBrunchCookingSlot`.
  - `src/components/ProposalForm.jsx` → POST `/.netlify/functions/submitProposal` (emails via Nodemailer).

### Serverless (Netlify Functions)
- Location: `netlify/functions/`
  - `submitRSVP.js` → insert into `rsvp` table
  - `reserveDJSpot.js` → check and reserve a `dj_spots` record
  - `reserveBrunchCookingSlot.js` → check and reserve a `brunch_cooking_slots` record
  - `submitProposal.js` → send proposal email via Gmail/Nodemailer (needs `EMAIL_USER`, `EMAIL_PASS`)
  - Redirects and build are configured in `netlify.toml` (`/*` → `/index.html`).

### Styling
- Tailwind CSS configured via `tailwind.config.js` and `postcss.config.js`.
- Global styles in `src/index.css`.

### Build and Assets
- Build: `npm run build` (downloads assets via `scripts/download-assets.js` then builds with Vite).
- Static assets in `public/` are served as-is.

## Environment Variables

Only two Supabase variables are required across app and functions:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_KEY`

These are read in both the frontend (via `import.meta.env`) and the Netlify Functions (via `process.env`).

Additional for emailing proposals:

- `EMAIL_USER`
- `EMAIL_PASS`

## Deployment

This site is configured for deployment on Netlify.

## License

This project is private and intended for personal use only.

## Contact

For any questions or issues, please contact [your contact information].