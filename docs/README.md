# Velo Bar Documentation

**Mobile Cocktailbar München & Coburg**  
Essential documentation for running, deploying, and maintaining the site.

---

## 📚 Core Documentation

### Essential Guides (Read These First)

| Guide                                  | Purpose                                       | When to Use                         |
| -------------------------------------- | --------------------------------------------- | ----------------------------------- |
| [**ARCHITECTURE.md**](ARCHITECTURE.md) | System overview, folder structure, tech stack | Understanding how the site works    |
| [**DEPLOYMENT.md**](DEPLOYMENT.md)     | Deploy to production, environment variables   | Launching to Vercel                 |
| [**QA.md**](QA.md)                     | Testing commands, quality checklist           | Before deployment, debugging        |
| [**SECURITY.md**](SECURITY.md)         | Rate limiting, CSRF, security testing         | Security audits, production testing |
| [**PERFORMANCE.md**](PERFORMANCE.md)   | Web Vitals, monitoring, optimization          | Performance issues, GA4 setup       |
| [**SEO.md**](SEO.md)                   | SEO strategy, keywords, structured data       | Search rankings, adding pages       |

---

## 🚀 Quick Start

**New Developer?** Start here:

1. **[Quick Start Guide](../QUICK_START.md)** (5 minutes) - Get running locally
2. **[ARCHITECTURE.md](ARCHITECTURE.md)** (15 minutes) - Understand the system
3. **[QA.md](QA.md)** - Run tests to verify everything works

**Ready to Deploy?**

1. **[DEPLOYMENT.md](DEPLOYMENT.md)** - Follow deployment checklist
2. **[SEO.md](SEO.md)** - Verify SEO before launch
3. **[SECURITY.md](SECURITY.md)** - Test security in production

---

## 🎯 Common Tasks

### I need to...

**...deploy to production**

1. Run pre-deployment checks: `npm run typecheck && npm run lint && npm run test`
2. Follow [DEPLOYMENT.md](DEPLOYMENT.md) checklist
3. Test security: [SECURITY.md](SECURITY.md)

**...fix a performance issue**

1. Run Lighthouse: `npx lighthouse http://localhost:4173 --view`
2. Check [PERFORMANCE.md](PERFORMANCE.md) for optimization tips
3. Verify Core Web Vitals targets

**...add a new page**

1. Check [ARCHITECTURE.md](ARCHITECTURE.md) for component structure
2. Update sitemap (auto-generated on build)
3. Follow [SEO.md](SEO.md) for meta tags

**...debug a failing test**

1. See [QA.md](QA.md) for test commands and debugging
2. Run single test: `npm run test Button.test.tsx`
3. Use watch mode: `npm run test:watch`

**...understand the codebase**

1. Read [ARCHITECTURE.md](ARCHITECTURE.md) - folder structure, tech stack
2. Check component docs in `src/components/README.md`
3. Review design tokens: `src/styles/design-tokens.css`

---

## 📦 Archive

Historical documentation and completed work moved to `archive/`:

- Old implementation reports
- Completed audits
- Phase completion summaries
- Previous documentation versions

**Note:** Archive contains useful historical context but is not needed for day-to-day operations.

---

## 🔗 External Resources

- **Production Site:** https://www.velo-bar.com
- **Design System:** `/src/styles/design-tokens.css`
- **Component Library:** `/src/components/`
- **API Documentation:** `/api/`

---

**Last Updated:** January 4, 2026  
**Documentation Status:** ✅ Consolidated (8 core docs)  
**Questions?** Check the relevant guide above or review git history for context.
