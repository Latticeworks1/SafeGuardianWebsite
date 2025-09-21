# Repository Guidelines

## Project Structure & Module Organization
- `index.js`: Express server, routes for `/`, `/technology`, `/investors`, `/contact`, `/team`.
- `views/`: EJS templates. Layout at `views/layouts/main.ejs`; pages at `views/*.ejs`.
- `public/`: Static assets served by Express.
  - `public/css/`, `public/js/`, `public/images/`, `public/videos/`, `public/pdf/`.
- `vercel.json`: Vercel config routing all requests to `index.js`.

## Build, Test, and Development Commands
- `npm run dev`: Start in watch mode with `nodemon` (local development).
- `npm start`: Start production server (`node index.js`).
- `npm run build`: Alias to `node index.js` (kept for platform parity).
- Environment: Node `>=14` (see `package.json`), PORT via `process.env.PORT` (defaults to `3000`).

## Coding Style & Naming Conventions
- JavaScript: 2‑space indent, semicolons, single quotes for strings.
- Templates: Use EJS with a single layout (`layouts/main`). Keep page files lowercase (`home.ejs`, `team.ejs`).
- Files: Use lowercase and hyphens for static assets (e.g., `hero-bg.jpg`, `main.js`).
- Imports/vars: `camelCase` for variables/functions; `SCREAMING_SNAKE_CASE` for constants.
- Lint/format: If adding tooling, prefer ESLint + Prettier with the above conventions.

## Testing Guidelines
- Current repo has no tests. Recommended stack: Jest + Supertest for route testing.
- Place tests in `tests/` with `*.test.js` (e.g., `tests/routes.test.js`).
- Aim to cover route status codes, template render calls, and static file serving.
- Run with `npm test` (add a script when tests are introduced).

## Commit & Pull Request Guidelines
- Commit messages: Prefer Conventional Commits (e.g., `feat(routes): add /team view`, `fix(views): correct layout title`).
- Pull requests should include: clear description, linked issue (if any), before/after screenshots for UI changes, and notes on testing locally (`npm run dev`).
- Keep PRs focused and small; update relevant docs when changing routes, views, or assets.

## Security & Configuration Tips
- Never commit secrets. Use `.env` for local config; `.gitignore` excludes it.
- Validate external links and user input before rendering.
- For Vercel: configuration is in `vercel.json`; ensure `engines.node` remains compatible with the deployed runtime.

