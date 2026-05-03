# Random Cat

A simple React + TypeScript + Vite app that fetches a random cat breed from a public API and displays its details in a card.

## Features

- Fetches a random cat breed on load
- Displays cat image, name, origin, lifespan, temperament, and traits
- Supports fetching a new cat on demand
- Uses Vite, React 19, and TypeScript

## Project structure

- `src/App.tsx` - main app logic and fetch flow
- `src/components/CatCard.tsx` - cat card UI component
- `src/types/cat.type.ts` - cat type definition
- `.env` - API endpoint configuration

## Setup

Install dependencies:

```bash
pnpm install
```

Start the dev server:

```bash
pnpm dev
```

Build the app:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

Run ESLint:

```bash
pnpm lint
```

## Environment

The app uses the `VITE_CAT_URL` environment variable from `.env`:

```env
VITE_CAT_URL=https://api.freeapi.app/api/v1/public/cats/cat/random
```

If you want to use another cat API endpoint, update `VITE_CAT_URL` and restart the dev server.

## Notes

- The app expects the API to return either an array with the cat object at index `0`, or an object with a `data` field.
- A placeholder image is shown if the fetched cat has no image or if the image fails to load.
