# Quotes Listing

A small React + TypeScript + Vite application that fetches and displays quotes from an external quotes API.

## Features

- Search quotes by text
- Change the number of quotes shown per page
- Page through results using previous / next buttons
- Uses Axios for data fetching with request cancellation support
- Type-safe React components with TypeScript

## Project structure

- `src/App.tsx` — main application logic and controls
- `src/components/Quote.tsx` — quote display component
- `src/services/api.ts` — Axios instance using environment-based API base URL
- `src/services/quotesService.ts` — quote fetching service
- `src/types/type.ts` — shared TypeScript types

## Prerequisites

- Node.js 18+ recommended
- npm, pnpm, or yarn available

## Setup

1. Install dependencies

```bash
pnpm install
```

2. Create a `.env` file at the project root and add the API base URL:

```env
VITE_QUOTE_URL=https://your-quotes-api.example.com
```

3. Run the development server

```bash
pnpm dev
```

4. Open the local URL shown in the terminal (usually `http://localhost:5173`)

## Available scripts

- `pnpm dev` — start the Vite development server
- `pnpm build` — build the production bundle
- `pnpm preview` — locally preview the production build
- `pnpm lint` — run ESLint across the project

## Notes

- The app uses a query parameter API contract: `?page=1&query=&limit=5`
- If the `VITE_QUOTE_URL` environment variable is missing, the app will fail to connect to the API
- Adjust the search and limit inputs to filter results and control pagination
