# YouTube Video Browser

A modern React TypeScript application for browsing and searching YouTube videos. Built with Vite for fast development and optimized performance.

## Features

- **Search Functionality**: Search for YouTube videos by keywords
- **Pagination**: Navigate through video results with previous/next buttons
- **Sorting Options**: Sort videos by latest, oldest, most viewed, or most liked
- **Customizable Limit**: Set the number of videos displayed per page
- **Responsive Design**: Clean, modern UI with video thumbnails, titles, channel names, view counts, and publish dates
- **Debounced Search**: Optimized search with 500ms debounce to reduce API calls
- **Abort Controller**: Handles request cancellation for better performance

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: CSS Modules
- **Development**: ESLint for code quality

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm or npm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd youtube-videos
   ```

2. Install dependencies:

   ```bash
   pnpm install
   # or
   npm install
   ```

3. Create a `.env` file in the root directory and add your YouTube API base URL:

   ```
   VITE_YOUTUBE_URL=your_api_base_url_here
   ```

4. Start the development server:

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the project for production
- `pnpm lint` - Run ESLint for code quality checks
- `pnpm preview` - Preview the production build locally

## Project Structure

```
src/
├── components/
│   └── Youtube.tsx          # Video card component
├── services/
│   ├── api.ts              # Axios configuration
│   └── youtubeService.ts   # YouTube API service
├── types/
│   └── type.ts             # TypeScript type definitions
├── App.tsx                 # Main application component
├── App.css                 # Application styles
├── index.css               # Global styles
└── main.tsx                # Application entry point
```

## API Integration

The application integrates with a YouTube API backend that provides:

- Video search with query parameters
- Pagination support
- Sorting by various criteria
- Configurable result limits

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `pnpm lint`
5. Test your changes
6. Submit a pull request

## License

This project is private and not licensed for public use.
