# Repository Guidelines

## Project Structure & Module Organization

### Core Architecture
- `src/server.ts`: TypeScript Express server with professional error handling
- `index.js`: Legacy Express server (kept for backwards compatibility)
- `views/`: EJS templates with layout at `views/layouts/main.ejs`
- `public/`: Static assets served by Express and Vite
  - `public/css/`: Stylesheets
  - `public/js/`: Client-side JavaScript/TypeScript entry points
  - `public/images/`, `public/videos/`, `public/pdf/`: Media assets

### Modern Development Structure
- `src/`: TypeScript source code
  - `src/components/`: Web Components with TypeScript
  - `src/utils/`: Shared utility functions
  - `src/server.ts`: Professional Express server implementation
- `dist/`: Vite build output (optimized for production)
- `scripts/`: Build and deployment scripts
- `.github/workflows/`: CI/CD automation

### Configuration Files
- `tsconfig.json`: TypeScript compiler configuration
- `vite.config.ts`: Vite build system configuration
- `eslint.config.js`: Code quality rules
- `.prettierrc`: Code formatting standards
- `vercel.json`: Vercel deployment configuration (legacy)

## Build, Test, and Development Commands

### Modern Development Workflow
- `npm run dev`: Concurrent TypeScript server + Vite dev server with hot reload
- `npm run dev:server`: TypeScript server only (`ts-node`)
- `npm run dev:client`: Vite development server only
- `npm run dev:legacy`: Legacy JavaScript server (`nodemon index.js`)

### Production & Deployment
- `npm run build`: Vite production build with optimization
- `npm run build:static`: Build + generate static pages for GitHub Pages
- `npm run preview`: Preview production build locally
- `npm run deploy`: Deploy to GitHub Pages

### Code Quality & Type Safety
- `npm run type-check`: TypeScript compilation verification
- `npm run lint`: ESLint code quality check
- `npm run lint:fix`: Auto-fix ESLint issues
- `npm run format`: Prettier code formatting

### Environment Requirements
- Node `>=14` (see `package.json`)
- TypeScript `^5.9.2`
- PORT via `process.env.PORT` (defaults to `3000`)

## Coding Style & Naming Conventions

### TypeScript Standards
- **Strict mode enabled**: All code must pass TypeScript strict type checking
- **Interfaces**: Use `PascalCase` for interfaces (e.g., `RouteData`, `MetricElement`)
- **Classes**: Use `PascalCase` for class names (e.g., `SafeGuardianApp`, `BaseComponent`)
- **Variables/Functions**: Use `camelCase` for variables and functions
- **Constants**: Use `SCREAMING_SNAKE_CASE` for constants
- **File naming**: Use `kebab-case` for files (e.g., `metric-card.ts`, `base-component.ts`)

### Code Formatting
- **Indentation**: 2 spaces (enforced by Prettier)
- **Quotes**: Single quotes for strings
- **Semicolons**: Required (enforced by ESLint)
- **Line length**: 100 characters max
- **Trailing commas**: ES5 compatible

### Component Architecture
- **Web Components**: Extend `BaseComponent` class for consistency
- **Shadow DOM**: Use encapsulated styling with Shadow DOM
- **Event handling**: Use type-safe event handlers
- **State management**: Use `setState()` method for reactive updates

### Templates & Static Assets
- **EJS templates**: Keep layout at `layouts/main.ejs`, pages as `home.ejs`, `team.ejs`
- **Static assets**: Use lowercase and hyphens (e.g., `hero-bg.jpg`, `main.ts`)
- **Images**: Optimize for web, include alt text for accessibility

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

