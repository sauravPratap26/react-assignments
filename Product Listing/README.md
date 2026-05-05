# Product Listing App

A React + TypeScript + Vite application that fetches and displays paginated products from a remote API. The app includes:

- Search filtering
- Page size control
- Previous / next pagination
- Product cards with image carousel
- Loading and empty state handling

## Project structure

- `src/App.tsx` — main UI with search, pagination, and data fetching
- `src/components/Product.tsx` — product card UI and image navigation
- `src/service/productService.ts` — API wrapper for fetching product data
- `src/service/api.ts` — Axios instance using `VITE_PRODUCT_URL`
- `src/types/type.ts` — TypeScript types used across the app

## Requirements

- Node.js 18+ recommended
- `pnpm` or another package manager compatible with this repo

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env` file at the project root and add the API base URL:

```env
VITE_PRODUCT_URL=https://your-product-api.example.com
```

3. Start the development server:

```bash
pnpm dev
```

4. Open the app in your browser at `http://localhost:5173`

## Scripts

- `pnpm dev` — start the Vite development server
- `pnpm build` — build the app for production
- `pnpm preview` — preview the production build locally
- `pnpm lint` — run ESLint across the project

## Notes

- The app expects the API to support query parameters: `page`, `limit`, and `query`
- If the API response returns no products, the app displays `No Products Found`
- The product card includes image navigation buttons for cycling through available images

## Styling

- Global styles are in `src/index.css`
- App styles are in `src/App.css`
- Product card styles are in `src/Product.css`
