# Random Users API App

A simple React application that fetches and displays random user data from the Random User API. Built with TypeScript, Vite, and React.

## Features

- Fetches random user data from the Random User API
- Displays user information in card format including name, email, location, phone, and gender
- Pagination support to navigate through multiple pages of users
- Responsive design with custom CSS styling
- Loading states during API calls
- Error handling for failed requests

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **ESLint** - Code linting
- **Random User API** - External API for user data

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd random-users-api
   ```

2. Install dependencies using pnpm:

   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory and add your API URL:

   ```
   VITE_USER_URL=https://randomuser.me/api/?results=10
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

- The app will load a list of random users on startup
- Use pagination controls to navigate between pages
- Each user card displays their profile picture, name, email, and contact information

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview production build

## Project Structure

```
src/
├── components/
│   ├── UserCard.tsx       # User card component
│   └── styles/
│       └── UserCard.css   # Styling for user cards
├── types/
│   └── user.ts            # TypeScript types for user data
├── App.tsx                # Main application component
├── App.css                # Main app styles
├── index.css              # Global styles
└── main.tsx               # Application entry point
```

## API Reference

This app uses the [Random User API](https://randomuser.me/) to fetch user data. The API provides realistic fake user information for testing and development purposes.
