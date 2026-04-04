# EcoRetail Development Workflow

This document outlines the professional standards and processes for maintaining and extending the EcoRetail platform.

---

## 🛠️ Development Setup

1. **Environment Initialization**:
   - Ensure you have a `.env.local` file with valid `MONGODB_URI` and `JWT_SECRET`.
   - Run `npm install` to synchronize dependencies (including MUI and TanStack Query).

2. **Local Dev Server**:
   ```bash
   npm run dev
   ```
   - Standard port: `3000`
   - Build Tool: Next.js Turbopack (enabled via `--turbopack`)

---

## 🎨 Design System & UI Standards

EcoRetail uses a hybrid styling approach for maximum performance and visual precision:

### 1. Global Tokens (`src/app/globals.css`)
All recurring values (colors, spacing, shadows) MUST use CSS variables:
- **Primary Color**: `var(--color-primary)` (#16a34a)
- **Secondary Color**: `var(--color-primary-light)`
- **Radius**: `var(--radius-md)` (8px), `var(--radius-xl)` (12px)
- **Shadows**: `var(--shadow-sm)`, `var(--shadow-green)`

### 3. Server/Client Boundaries (Next.js 16)
- **Functions as Props**: NEVER pass a component (like `Link`) as a prop from a Server Component to a Client Component.
- **MUI Buttons**: In Server Components (like `not-found.tsx`), wrap the `Button` with `<Link href="..." style={{ textDecoration: 'none' }}>`.
- **Hydration Sync**: Use a `mounted` state with `useEffect` for top-level Client Components (like `Navbar`) to prevent UI flickers or hydration mismatches.

---

## 🔐 Authentication & Security

### 1. Identity & Session Management
- **Primary Identity**: Use **Email address** as the sole unique identifier. Avoid mandatory phone number fields.
- **No Local Storage**: NEVER store user data or session flags in `localStorage`.
- **HttpOnly Cookies**: All authentication is handled via **HttpOnly JWT Cookies**.
- **Session Check**: To verify session on the client, call `GET /api/auth/me`.

### 2. Protecting Routes
- Use the `<AuthRequired />` component in pages that require a logged-in user.
- Verify roles (`user.isAdmin`) server-side in API routes.

---

## 📡 Data Fetching (TanStack Query)

All API interactions should utilize `useQuery` or `useMutation` to ensure:
- Loading states (use `CircularProgress` or `Skeleton`).
- Error handling (use `Alert` components).
- Automatic caching and revalidation.

Example:
```tsx
const { data, isLoading } = useQuery({
  queryKey: ['my-key'],
  queryFn: () => fetch('/api/data').then(res => res.json())
});
```

---

## 🚀 Deployment Pipeline

1. **Linting**: Run `npm run lint` before every commit.
2. **Type Checking**: Run `npx tsc --noEmit` to verify type safety.
3. **Build Validation**: Always run `npm run build` locally before pushing to production to catch hydration or SSR errors.

---

## 📦 Submission Guidelines
- **Commit Messages**: Use semantic prefixing (e.g., `feat:`, `fix:`, `refactor:`, `docs:`).
- **Component Size**: If a component exceeds 300 lines, extract sub-components into the same folder or `src/components/`.
- **Naming**: Use PascalCase for React components and camelCase for hooks and utility functions.
