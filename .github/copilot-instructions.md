## Repo quick-orientation for AI coding agents

This file contains focused, actionable notes to help an AI agent be productive in this codebase immediately.

- Primary tech: Vite + React + TypeScript + Tailwind. Run and build with npm scripts in `package.json` (see `dev`, `build`, `preview`).
- Entry points: `src/index.tsx` -> renders `App` (in `src/App.tsx`). Routing and pages are declared in `src/App.tsx`.

Key structure and conventions
- Pages live in `src/pages/*`. Add a new route by creating a page (default export) and adding a route in `src/App.tsx` (nested under `MainLayout`). Example routes: `/scanner` -> `src/pages/Scanner.tsx`, `/product/:id` -> `src/pages/ProductDetail.tsx`.
- Reusable UI lives under `src/components/` and is organised by feature (e.g. `layout/`, `scanner/`, `products/`, `auth/`, `chat/`). Most components use default exports and function components.
- Layout: `src/components/layout/MainLayout.tsx` uses React Router `Outlet` and composes `Navbar` + `Footer`. Prefer adding global UI here.
- Styling: Tailwind classes in JSX. `src/index.css` loads Tailwind utilities (project generated from a Magic Patterns template).

Routing and router notes
- The main routing tree is in `src/App.tsx` (BrowserRouter + nested Routes). There is an `AppRouter.tsx` file that wraps `App` again — routing logic to modify is primarily in `src/App.tsx`.

Scanner & integrations (important examples)
- Barcode scanner: `src/components/scanner/BarcodeScanner.tsx` uses the `html5-qrcode` package and renders into a DOM node with id `qr-reader`. It currently simulates fetching product data via a `setTimeout` and a hard-coded product object — replace the simulated API call with a real fetch when integrating back-end services.
- Image OCR: `src/components/scanner/ImageUploader.tsx` (exists in codebase) is toggled by `src/pages/Scanner.tsx` via a tab UI.
- Example product shape (used in mock data): { id, name, image, price, origin, brand, rating, positivePercent, sentiment } — keep this shape when wiring real APIs or add a mapper in the page/component.

Developer workflows & commands
- Install deps: `npm install`
- Run dev server: `npm run dev` (starts Vite)
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Lint: `npm run lint` (ESLint configured in package.json)

When modifying code
- Adding routes: create page under `src/pages/`, then import and register route in `src/App.tsx` under the `<Route path="/" element={<MainLayout/>}>` node.
- Adding a shared component: place it under `src/components/<feature>/` and use default export. Follow existing naming and styling (Tailwind utility classes). Prefer small, focused components.
- Replacing mocks: several components (notably scanner) simulate API calls. Search for `setTimeout` in `src/components` when replacing with real fetch/axios calls.

Files to inspect for patterns (examples)
- `src/App.tsx` — routing tree
- `src/index.tsx` — app bootstrap
- `src/components/layout/MainLayout.tsx`, `Navbar.tsx`, `Footer.tsx` — layout pattern and navigation
- `src/pages/Scanner.tsx`, `src/components/scanner/BarcodeScanner.tsx` — scanner integration, html5-qrcode usage, product mock
- `package.json` — scripts and deps

Practical tips for code changes
- Keep Tailwind classes inline (current style). Avoid introducing separate CSS files unless necessary.
- Components favor default-exported function components with local state; use existing patterns for hooks and cleanup (see `useEffect` cleanup in `BarcodeScanner.tsx`).
- For routes that show detailed items (e.g. `ProductDetail`), follow the `product` mock shape or add a mapping layer.

If anything in these notes is unclear or you want the agent to expand sections (examples, suggested tests, or wiring to an API), tell me which area to expand and I will iterate.
