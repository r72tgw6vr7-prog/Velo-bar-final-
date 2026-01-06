# API Directory — Express vs Serverless Guidance

This file documents the intent and usage of the small Express-style handlers in the `api/` folder (for example `express-quote.js`), explains how they are run today, and recommends patterns for consistent server and serverless usage.

Summary

- The file `api/express-quote.js` is a minimal HTTP handler that expects `(req, res)` and is written in an Express-compatible style (but exported as a default function). It performs schema validation with `zod`, optional sanitization via `validator`, and uses internal middleware helpers like `checkRateLimit` and `applyCors`.
- Because the handler reads and writes `req`/`res` directly, it can be used in three modes:
  1. As a serverless-style function (Vercel/Netlify/AWS Lambda adapters) — the default shape here is compatible with serverless platforms that map HTTP requests to `(req,res)` handlers.
  2. Mounted into an Express app by calling `app.post('/api/express-quote', handler)` in a small server wrapper.
  3. Called internally by a higher-level service layer (recommended) that centralizes validation, sanitization and delivery logic.

Recommendations & Best Practices

1. Prefer a thin HTTP handler + service layer

- Keep `api/*` handlers minimal and move business logic to `src/services/*`.
- We added `src/services/contactService.ts` and `src/server/validation.ts` — use these from handlers to ensure shared validation and consistent sanitization.

2. Express vs Serverless usage

- To mount the handler in an Express app (local dev or custom server):

```js
import express from 'express';
import expressQuoteHandler from './api/express-quote.js';

const app = express();
app.use(express.json());
app.post('/api/express-quote', expressQuoteHandler);
app.listen(3000);
```

- To use as a serverless function on Vercel/Netlify, leave the exported default function as-is — these platforms automatically wire the exported handler to the runtime.

3. Middleware & portability

- `applyCors` and `checkRateLimit` are used inside the handler. Keep these middleware helpers framework-agnostic where possible (they currently accept `(req,res)` and return booleans or promises).
- For AWS Lambda or other runtimes, use a small adapter that maps the platform event/context to a `(req,res)` shape and forwards to the handler.

4. Validation & security

- Use the shared Zod schema in `src/server/validation.ts` (or `src/services/*`) to keep client and server validation consistent.
- Sanitize inputs before logging or forwarding (the handler currently normalizes email with `validator`).
- Ensure rate limiting is enforced and reviewed for production thresholds — `express-quote.js` uses a stricter limit.

5. Observability & delivery

- In production, replace the `console.log` with a proper logging/telemetry sink (Sentry/Datadog) and integrate with an email/CRM provider.
- The handler currently logs the event and returns a 200; consider adding a background job or retry-capable delivery path.

6. Tests & Local Dev

- Add unit tests for the handler to assert validation behavior and rate-limit responses. Prefer testing the service layer (`src/services/*`) where logic is richer.

7. Next steps recommended for this repo

- Replace any duplicate local validation with imports from `src/server/validation.ts`.
- Move delivery logic into `src/services/contactService.ts` (already scaffolded). Have the handler call `submitContact()` and surface errors/HTTP codes accordingly.
- Add an `api/README.md` note in deployment docs describing how platform adapters should map to `(req,res)` handlers.

Quick migration example (handler delegating to service):

```js
import { submitContact } from '@/services/contactService';
import { validateContact } from '@/server/validation';

export default async function handler(req, res) {
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const validated = validateContact(body);
    await submitContact(validated);
    res.status(200).json({ success: true });
  } catch (err) {
    // map errors to HTTP codes (validation, delivery, server)
  }
}
```

Contact

- If you want, I can: (A) refactor `api/express-quote.js` to delegate to `submitContact()` and use the shared schema, (B) add unit tests for the handler, or (C) add an adapter snippet for AWS Lambda. Which should I do next?
