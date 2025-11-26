# Task Manager (React + Vite)

This repository is a small Task Manager app built with React and Vite — intended as a learning project for a MERN-stack front-end assignment. It includes a local task manager component and a sample API integration (JSONPlaceholder) with pagination and search.

## Features
- Task management with persistence (localStorage)
- Theme support (light/dark) via a theme context
- API integration: fetch posts from JSONPlaceholder with pagination & search
- Simple responsive layout with Tailwind-compatible classes

## Prerequisites
- Node.js 18+ and npm (or yarn)

## Setup
1. Install dependencies

```powershell
npm install
```

2. Start the development server

```powershell
npm run dev
```

## Project Structure

```
src/
├── api/             # API wrapper (JSONPlaceholder client)
├── components/      # Reusable UI components (Navbar, Button, TaskManager)
├── context/         # React context providers (Theme)
├── hooks/           # Custom hooks (useLocalStorage, useInfiniteScroll)
├── pages/           # Page components (Posts)
├── utils/           # Utility functions
└── App.jsx          # Main application component
```

## Key Files
- `src/components/TaskManager.jsx` — Task management UI using `useState`, `useEffect`, and `useContext`; persists tasks with `useLocalStorage`.
- `src/api/jsonPlaceholder.js` — Small API wrapper used by `src/pages/Posts.jsx`.
- `src/pages/Posts.jsx` — Lists posts with pagination and search, includes loading and error states.
- `src/context/ThemeContext.jsx` — Provides theme (light/dark) and persists selection to `localStorage`.

## Running & Development Notes
- The app uses Vite; start with `npm run dev`.
- The theme provider toggles a `dark` class on `document.documentElement` so CSS can react to dark mode (Tailwind's `dark:` utilities will work if Tailwind is configured).
- If you add Tailwind, create `tailwind.config.js` and include `darkMode: 'class'`.

## API & Pagination
- The app fetches posts from `https://jsonplaceholder.typicode.com/posts` using `_page` and `_limit` query params for server-side pagination. The `x-total-count` response header is used to calculate total pages.
- Searching uses the `title_like` parameter to filter by post title (debounced on input).

## Troubleshooting
- If the dev server fails to start, ensure you have Node 18+ and run `npm install` again.
- If API requests fail due to CORS or network issues, check your network and try again; JSONPlaceholder is a public test API and may be rate-limited.

## Testing & Linting
- Run ESLint: `npm run lint` (project includes basic ESLint config).

## Next steps / Suggestions
- Add Tailwind CSS properly and re-introduce responsive/dark styles via `tailwind.config.js`.
- Add unit tests (Jest + React Testing Library) for `TaskManager` and `Posts`.
- Allow page-size selection and improved pagination UI (ellipsis for many pages).

---

If you want, I can:
- (A) Run the dev server now and share the terminal output,
- (B) Add Tailwind properly and re-style the app,
- (C) Add tests for `TaskManager`.

Replace this README content with more project-specific instructions if you'd like.

