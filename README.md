# 🎹 Aiden Clark - Website

Website for the music artist Aiden Clark (Montréal, CAN). Created to share all past and upcoming song releases.
Made with React + Vite, prerendered with react-snap.

(Requires Node >= 22.22.0)

- [x] ⛏ SSR support

Live at: https://aidenclarkmusic.com/

## Project setup
```
npm install
```

### Start project locally for development
```
npm run start
```

### Compiles, generate files and minifies for production
```
npm run build
```
`build` type-checks, bundles with Vite into `build/`, then prerenders every page with react-snap.

react-snap ships an old x86 Chromium that can't start on Apple Silicon. Point it to a local Chrome instead:
```
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run build
```

### Analytics
Google Analytics 4 is enabled in production builds when `VITE_GA_MEASUREMENT_ID` is set (e.g. in `.env.production.local`):
```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Preview the production build
```
npm run preview
```
