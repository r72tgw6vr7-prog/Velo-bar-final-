# Static Site Generation (SSG) Setup for Velo Bar

## Plugin Used

- **vite-plugin-ssg**: Enables static pre-rendering of React Router routes at build time while preserving client-side hydration and interactivity.

## How Route Discovery Works

- All routes you want pre-rendered must be listed in the `export const routes = [...]` array in `src/ssg.routes.ts` (see below).
- Each entry should match the path as defined in your React Router setup (e.g., `/`, `/leistungen`, `/impressum`, etc.).
- Dynamic routes (e.g., `/firmenfeiern/:district`) can be pre-rendered by providing concrete paths for each variant.

## How to Add New Pre-rendered Routes

1. Edit `src/ssg.routes.ts`.
2. Add the new route path (string) to the exported `routes` array.
3. Re-run `npm run build` to generate the new static HTML.

## Key Files

- `vite.config.ts`: SSG plugin integration and config.
- `src/ssg.routes.ts`: List of all pre-rendered routes.
- `vercel.json`: Ensures Vercel serves static HTML and sets caching headers.

## References

- [vite-plugin-ssg docs](https://github.com/antfu/vite-plugin-ssg)

---

**This setup preserves all client-side React behavior and does not change any route URLs or visual design.**
