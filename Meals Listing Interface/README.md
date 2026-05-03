# Meals Listing Interface

A React + TypeScript + Vite application that displays meal information fetched from an external API. Users can search for meals, browse paginated results, and view detailed recipe information.

## Features

- **Meal Search**: Search for meals by name with debounced queries
- **Pagination**: Navigate through multiple pages of meal results
- **Meal Cards**: Display meal information including:
  - Meal image
  - Meal name
  - Category and cuisine area
  - Cooking instructions
  - List of ingredients
  - Links to recipe source and YouTube tutorial
- **Image Fallback**: Graceful handling of missing meal images with placeholder images
- **Type-Safe**: Built with TypeScript for reliable development

## Project Structure

```
src/
  ├── App.tsx              # Main application component with search and pagination
  ├── App.css              # Styling for the main app
  ├── main.tsx             # Application entry point
  ├── index.css            # Global styles
  ├── components/
  │   └── MealCard.tsx     # Reusable meal card component
  ├── MealCard.css         # Meal card styling
  └── types/
      └── meal.ts          # TypeScript types for meal data
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)

### Installation

```bash
pnpm install
```

### Environment Setup

Create a `.env` file with the following variable:

```
VITE_MEAL_URL=<your-meal-api-url>
```

### Development

Run the development server with HMR:

```bash
pnpm run dev
```

### Build

Build for production:

```bash
pnpm run build
```

### Preview

Preview the production build locally:

```bash
pnpm run preview
```

### Linting

Run ESLint to check code quality:

```bash
pnpm run lint
```

## Technologies Used

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool with HMR
- **ESLint** - Code quality and consistency
