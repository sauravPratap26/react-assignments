# Jokes Viewer

A React + TypeScript + Vite application that fetches jokes from an API and displays them in a responsive card layout.

## Features

- Search jokes with debounce for better performance
- Pagination controls for browsing results
- Axios-based API service with `AbortController` cancelation support
- Responsive dark-themed UI
- Clean React hooks architecture with TypeScript support

## Project structure

- `src/App.tsx` — main app layout, search state, fetch logic, and pagination
- `src/components/Joke.tsx` — individual joke card component
- `src/services/jokeService.ts` — API service wrapper using Axios
- `src/services/api.ts` — Axios instance configuration
- `src/App.css` — component-specific styling
- `src/index.css` — global base styles

## Setup

Install dependencies:

```bash
pnpm install
```

Create a `.env` file with your jokes API base URL:

```env
VITE_JOKES_URL=https://your-joke-api.example.com
```

## Run

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Preview

```bash
pnpm preview
```

## Lint

```bash
pnpm lint
```

## Notes

- The search input is debounced by 500ms so the app does not send a request on every keystroke.
- If a new search request begins before the previous one finishes, the previous Axios request is cancelled using `AbortController`.
- When no jokes match the query, the app displays a centered empty state message.
- Pagination buttons update the current page and fetch the next or previous results.

## License

This project is available for learning and experimentation.
