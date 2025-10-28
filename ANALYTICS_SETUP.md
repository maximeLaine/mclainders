# Analytics Setup Guide

This guide explains how to add analytics to the McLainders wedding website.

## Option 1: Netlify Analytics (Recommended)

Netlify Analytics is server-side, privacy-friendly, and requires no code changes.

### Setup:
1. Go to your Netlify dashboard
2. Navigate to your site → Analytics
3. Click "Enable Analytics" ($9/month per site)

### Benefits:
- ✅ No JavaScript needed (server-side tracking)
- ✅ GDPR compliant (no cookies)
- ✅ Ad blocker proof
- ✅ No impact on page performance
- ✅ Tracks unique visitors, page views, top pages, referrers

### Metrics Available:
- Page views per route
- Unique visitors
- Top referrers
- Bandwidth usage
- Form submissions (via Netlify Forms)

**No code changes required!**

---

## Option 2: Plausible Analytics (Privacy-Friendly Alternative)

Plausible is a lightweight, open-source, privacy-first alternative to Google Analytics.

### Setup:
1. Sign up at [plausible.io](https://plausible.io) ($9/month for 10k pageviews)
2. Add your domain: `mclainders.netlify.app` or your custom domain
3. Add tracking script to `index.html`:

```html
<!-- /index.html -->
<head>
  <!-- ... existing head content ... -->

  <!-- Plausible Analytics -->
  <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
</head>
```

### Benefits:
- ✅ Only 1KB script (vs 45KB for Google Analytics)
- ✅ GDPR, CCPA, PECR compliant
- ✅ No cookies, no personal data collection
- ✅ Simple, beautiful dashboard
- ✅ Tracks custom events

### Track Custom Events (Optional):
```javascript
// Track RSVP submissions
window.plausible('RSVP Submitted', { props: { attendance: 'yes' } });

// Track DJ spot reservations
window.plausible('DJ Spot Reserved', { props: { time: '20:30' } });
```

---

## Option 3: Google Analytics 4 (Most Features)

GA4 provides the most comprehensive analytics but is heavier and less privacy-friendly.

### Setup:
1. Create account at [analytics.google.com](https://analytics.google.com)
2. Create a new GA4 property
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)
4. Add to `index.html`:

```html
<!-- /index.html -->
<head>
  <!-- ... existing head content ... -->

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

### Track Custom Events:
```javascript
// Track RSVP submissions
gtag('event', 'rsvp_submit', {
  attendance: 'yes',
  event_category: 'engagement'
});

// Track DJ spot reservations
gtag('event', 'dj_spot_reserved', {
  time_slot: '20:30',
  event_category: 'engagement'
});
```

**Note:** Requires cookie consent banner for GDPR compliance.

---

## Option 4: Simple Event Tracking (DIY)

For minimal tracking, send custom events to Netlify Functions or Supabase:

### Create Analytics Function:
```javascript
// netlify/functions/track-event.js
const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const { eventName, properties } = JSON.parse(event.body);
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_KEY
  );

  await supabase.from('analytics_events').insert([{
    event_name: eventName,
    properties,
    timestamp: new Date().toISOString(),
    user_agent: event.headers['user-agent'],
    referrer: event.headers.referer
  }]);

  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
```

### Track Events in Components:
```javascript
// src/utils/analytics.js
export const trackEvent = async (eventName, properties = {}) => {
  try {
    await fetch('/.netlify/functions/track-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventName, properties })
    });
  } catch (error) {
    // Fail silently
  }
};

// Usage in components
import { trackEvent } from '../utils/analytics';

// In RSVPPage.jsx
const handleSubmit = async (data) => {
  // ... existing submit logic ...
  trackEvent('rsvp_submitted', { attendance: data.attendance });
};
```

### Create Supabase Table:
```sql
CREATE TABLE analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  properties JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT
);

CREATE INDEX idx_analytics_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_timestamp ON analytics_events(timestamp);
```

---

## Recommended Events to Track

### Page Views:
- Home page visits
- RSVP page visits
- Accommodation page visits
- Beaujolais attractions visits
- Our Story page visits
- We Need You page visits

### Engagement Events:
- **RSVP Submitted** (with attendance: yes/no)
- **DJ Spot Reserved** (with time slot)
- **Brunch Cooking Slot Reserved** (with time slot)
- **Proposal Submitted**
- **Accommodation Link Clicked**
- **Attraction Link Clicked**
- **Map Link Clicked**

### Conversion Funnel:
1. Visit site → 2. Visit RSVP page → 3. Submit RSVP → 4. Visit participation page → 5. Reserve DJ/cooking slot

---

## Comparison Table

| Feature | Netlify Analytics | Plausible | Google Analytics 4 | DIY |
|---------|-------------------|-----------|-------------------|-----|
| **Cost** | $9/month | $9/month | Free | Free |
| **Setup Time** | 2 minutes | 5 minutes | 15 minutes | 2 hours |
| **Page Weight** | 0KB | 1KB | ~45KB | 1KB |
| **Privacy** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **GDPR Compliant** | Yes | Yes | Requires consent | Yes |
| **Custom Events** | Limited | Yes | Yes | Full control |
| **Ad Blocker Proof** | Yes | No | No | Yes |
| **Real-time** | No | Yes | Yes | Depends |
| **Dashboard** | Basic | Beautiful | Complex | Build your own |

---

## Recommendation

**For this wedding website:** Use **Netlify Analytics** + **DIY event tracking** for custom events

**Reasoning:**
1. Netlify Analytics covers basic page views with zero setup
2. DIY event tracking gives you full control over RSVP/DJ/cooking data
3. 100% privacy-friendly, no consent banners needed
4. No performance impact
5. All data stays in your Supabase database

**Implementation Priority:**
1. ✅ Enable Netlify Analytics (5 minutes)
2. Create `analytics_events` table in Supabase (5 minutes)
3. Implement `trackEvent` utility function (15 minutes)
4. Add event tracking to forms (30 minutes)

**Total setup time:** ~1 hour for full analytics implementation
