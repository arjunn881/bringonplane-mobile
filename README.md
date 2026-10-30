# BringOnPlane Mobile App

A cross-platform mobile app for **iOS & Android** built with **React Native + Expo (TypeScript)**.

Companion app to [bringonplane.com](https://bringonplane.com) — instantly look up what you can bring on a plane.

## Features

- 🔍 **Instant Search** — Search 200+ items across all categories
- 📂 **Browse by Category** — Food, Electronics, Medicines, Liquids, Sports, and more
- 🧳 **Packing List** — Save items, check them off as you pack
- ✅ **TSA & International Rules** — Carry-on vs checked bag rules, airline exceptions
- 🌍 **Multi-region Support** — Rules for US, UK, Singapore, Japan, Korea, and more

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native 0.88 + Expo SDK 58 |
| Language | TypeScript |
| Navigation | Expo Router (file-based) |
| Storage | AsyncStorage (packing list persistence) |
| API | bringonplane.com REST endpoints |
| Styling | React Native StyleSheet |

## Project Structure

```
src/
├── app/
│   ├── _layout.tsx          # Root stack navigator
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Tab bar layout
│   │   ├── index.tsx        # Search screen
│   │   ├── categories.tsx   # Browse categories
│   │   └── packing-list.tsx # Packing list
│   └── item/
│       └── [slug].tsx       # Item detail screen
├── components/              # Shared UI components
├── constants/
│   └── colors.ts            # Brand color palette
├── hooks/
│   ├── use-search.ts        # Search state & logic
│   └── use-packing-list.ts  # Packing list CRUD + persistence
├── lib/
│   └── api.ts               # API calls to bringonplane.com
└── types/
    └── index.ts             # Shared TypeScript types
```

## Getting Started

```bash
# Install dependencies
npm install

# Start Expo dev server
npm start

# Run on Android emulator / device
npm run android

# Run on iOS simulator (macOS only)
npm run ios

# Run in browser
npm run web
```

## Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for Android (APK / AAB)
eas build --platform android

# Build for iOS (requires Apple Developer account)
eas build --platform ios
```

## App Config

- **Bundle ID (iOS):** `com.bringonplane.app`
- **Package (Android):** `com.bringonplane.app`
- **Scheme:** `bringonplane`
- **Primary Color:** `#208AEF`
