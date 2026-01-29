# Dimension Festival Planner 2026

A mobile-first web app for planning your schedule at the Dimension Festival 2026 (10th Anniversary Edition), held January 30 - February 2, 2026 at Nukutawhiti, Northland, Aotearoa NZ.

## Features

- **Schedule Browser**: Browse music, workshops, performers, and VJs by day and location
- **Event Selection**: Mark events as "Must See" or "Interested" to build your personal schedule
- **Reminders**: Set date/time reminders for events you don't want to miss
- **Festival Map**: Interactive map showing all venues and amenities
- **Key Times**: Important festival times (gates, transport, etc.)
- **Offline Support**: Selections and reminders are saved to localStorage

## Festival Venues

- **Astral Arena** - Main stage for music and performances
- **Nova Grove** - Secondary music stage
- **Cosmic Cove** - Workshops and wellness
- **Teepee** - Ceremonies and sharing circles
- **Fire & Flow** - Flow arts workshops

## Data Structure

All festival data is in `src/data/festivalData.ts`:

- `music` - Music acts organized by stage (Astral Arena, Nova Grove)
- `workshops` - Workshops organized by location (Cosmic Cove, Teepee, Fire & Flow)
- `performers` - Fire/flow performers with location info
- `vjs` - Visual artists
- `key_times` - Festival and transport times

## Tech Stack

- React 19 + TypeScript
- Vite for build tooling
- CSS for styling (no UI framework - mobile optimized)
- localStorage for persistence
- GitHub Pages for hosting

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navigation.tsx    # Bottom tab bar
│   ├── EventCard.tsx     # Event list item with selection toggle
│   ├── Modal.tsx         # Bottom sheet modal (scroll-safe)
│   └── DayFilter.tsx     # Day filter pills
├── context/
│   └── SelectionContext.tsx  # Global state for selections & reminders
├── data/
│   └── festivalData.ts   # All festival JSON data
├── pages/            # Page components for each tab
│   ├── MusicPage.tsx
│   ├── WorkshopsPage.tsx
│   ├── PerformersPage.tsx
│   ├── VJsPage.tsx
│   ├── KeyTimesPage.tsx
│   ├── RemindersPage.tsx
│   └── MapPage.tsx
└── App.tsx           # Main app with tab routing
```

## Development

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
```

Deployed automatically to GitHub Pages via `.github/workflows/deploy.yml` on push.

## Key Implementation Details

- **Modal scroll fix**: When modal opens, body gets `position: fixed` to prevent background scroll, then restores scroll position on close
- **Selection persistence**: Uses React Context + localStorage so selections work across all tabs
- **Reminder system**: Reminders stored with event ID, reminder datetime, and notification status
- **Mobile-first**: Designed for 320px+ screens with bottom navigation

## License

MIT
