# SEO Strategy

**Search Optimization for Velo Bar**

Target: **"Mobile Cocktailbar München"** and B2B event catering keywords

---

## SEO Status: 95% Ready ✅

### Implemented ✅

- Clean URL structure (`/firmenfeiern`, `/messe-catering`)
- Unique meta tags on all pages
- Structured data (LocalBusiness, FAQPage)
- XML sitemap
- Robots.txt configured
- 120+ keywords targeted
- Internal linking strategy

---

## Core SEO Elements

### 1. Meta Tags

**Homepage:**

```html
<title>Mobile Cocktailbar München & Coburg | Velo.Bar</title>
<meta
  name="description"
  content="Premium-Cocktail-Catering für dein Firmenevent in München & Coburg. Mobile Bar, professionelle Barkeeper, über 500 Events. Jetzt anfragen!"
/>
```

**All pages have:**

- Unique `<title>` (< 60 chars)
- Unique meta description (< 160 chars)
- Open Graph tags (social sharing)
- Canonical URLs

### 2. Structured Data

**LocalBusiness Schema:**

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Velo.Bar",
  "description": "Mobile Cocktailbar München & Coburg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "München",
    "addressRegion": "Bayern",
    "addressCountry": "DE"
  },
  "telephone": "+49...",
  "url": "https://www.velo-bar.com"
}
```

**Implemented:**

- ✅ LocalBusiness (homepage)
- ✅ WebSite with SearchAction
- ✅ FAQPage (FAQ page)
- ✅ Service schemas (service pages)

### 3. Sitemap

**Location:** `/public/sitemap.xml`

**17 pages indexed:**

- Priority 1.0: Homepage
- Priority 0.9: Service pages
- Priority 0.6-0.8: Gallery, About
- Priority 0.3: Legal pages

**Update:**

```bash
# Regenerate after adding new pages
npm run build  # Sitemap auto-generated
```

### 4. Robots.txt

```txt
User-agent: *
Allow: /
Sitemap: https://www.velo-bar.com/sitemap.xml

# Block AI scrapers (optional)
User-agent: GPTBot
Disallow: /

User-agent: Claude-Bot
Disallow: /
```

---

## Target Keywords

### Primary Keywords (120+ total)

**High Volume:**

- "mobile cocktailbar münchen" (500/mo)
- "cocktail catering firmenevent" (300/mo)
- "barkeeper mieten münchen" (200/mo)

**Long-Tail:**

- "mobile bar firmenfeier münchen"
- "cocktailbar hochzeit coburg"
- "messe catering münchen preise"

**Location-Based:**

- All pages mention "München" and "Coburg"
- Service areas explicitly listed
- Local business schema implemented

---

## On-Page Optimization

### H1 Tags (One per page)

```html
<!-- Homepage -->
<h1>Premium Cocktail-Catering für dein Firmenevent in München & Coburg</h1>

<!-- Services -->
<h1>Mobile Cocktailbar für Firmenfeiern & Events</h1>

<!-- Gallery -->
<h1>Event-Galerie: Mobile Cocktailbar in Aktion</h1>
```

### Internal Linking

**Hub Structure:**

- Homepage → All main pages
- Service pages → Gallery, FAQ, Contact
- FAQ → Services, Contact
- Footer → All pages

**Anchor Text:**

```html
<a href="/leistungen">Unsere Leistungen für Firmenfeiern</a>
<a href="/galerie">Event-Impressionen aus München</a>
<a href="/anfrage">Jetzt Anfrage starten</a>
```

### Image SEO

**Alt Text Format:**

```html
<img
  src="event1.webp"
  alt="Mobile Cocktailbar bei Firmenevent in München - Barkeeper bereitet Cocktails zu"
/>
```

**754 gallery images** have descriptive alt text with:

- Location (München/Coburg)
- Event type
- Action description

---

## Technical SEO

### Performance (SEO Factor)

- ✅ Lighthouse score > 90
- ✅ Core Web Vitals in green
- ✅ Mobile-friendly (responsive)
- ✅ Fast page load (< 2.5s LCP)

### Mobile Optimization

```css
/* Responsive breakpoints */
375px  /* iPhone SE */
390px  /* iPhone 12/13 */
768px  /* iPad */
1024px /* Desktop */
```

**Testing:**

- Google Mobile-Friendly Test
- Lighthouse mobile audit
- Real device testing

### Security (SEO Signal)

- ✅ HTTPS enforced
- ✅ Valid SSL certificate
- ✅ No mixed content warnings

---

## Local SEO

### Google Business Profile

**Setup:**

1. Claim listing: google.com/business
2. Add business info (matching schema.org data)
3. Upload photos (matching website gallery)
4. Collect reviews
5. Post updates regularly

### NAP Consistency

**Name, Address, Phone must match everywhere:**

- Website footer
- Structured data
- Google Business Profile
- Social media profiles

```html
<!-- Footer (canonical NAP) -->
<footer>
  <p>Velo.Bar - Mobile Cocktailbar</p>
  <p>München & Coburg, Bayern</p>
  <p>Telefon: +49 XXX XXXXXXX</p>
  <p>E-Mail: info@velo-bar.com</p>
</footer>
```

---

## Content Strategy

### Blog Posts (5 SEO Articles)

1. **Messekatering Kosten 2025** (low competition)
2. **Alkoholfreie Cocktails Firmenfeier** (niche)
3. **Last-Minute Catering München** (intent-driven)
4. **Catering ohne Stromanschluss** (unique)
5. **Nachhaltige Firmenfeier** (trend)

**Format:**

```markdown
/blog/messekatering-kosten-2025

- 1500+ words
- H2/H3 structure
- Internal links to services
- FAQ schema
- CTA to contact form
```

---

## Pre-Deployment Checklist

### SEO Fundamentals ✅

- [ ] All pages have unique `<title>` tags
- [ ] All pages have meta descriptions
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt configured
- [ ] Canonical URLs set
- [ ] Structured data validated

### Content ✅

- [ ] H1 tags present (one per page)
- [ ] Keywords in H1, H2, meta
- [ ] München/Coburg mentioned prominently
- [ ] Internal links with keyword anchors
- [ ] Alt text on all images

### Technical ✅

- [ ] HTTPS enforced
- [ ] Mobile-friendly (responsive)
- [ ] Core Web Vitals green
- [ ] No 404 errors
- [ ] Redirect HTTP → HTTPS
- [ ] Redirect non-www → www

---

## Post-Launch

### Google Search Console

**1. Verify Ownership:**

```bash
# Add verification tag to <head>
<meta name="google-site-verification" content="..." />
```

**2. Submit Sitemap:**

- Search Console → Sitemaps
- Add: `https://www.velo-bar.com/sitemap.xml`

**3. Monitor:**

- Indexing status
- Search queries
- Core Web Vitals
- Mobile usability

### Monitoring

**Track Rankings:**

- Google Search Console (free)
- Ahrefs / Semrush (paid)
- Manual searches (incognito)

**Key Metrics:**

- Organic traffic (GA4)
- Keyword rankings
- Click-through rate (CTR)
- Conversion rate

---

## SEO Testing

### Structured Data Validation

```bash
# Google Rich Results Test
https://search.google.com/test/rich-results

# Schema.org Validator
https://validator.schema.org/
```

### Mobile-Friendly Test

```bash
https://search.google.com/test/mobile-friendly
```

### Page Speed

```bash
https://pagespeed.web.dev/
# Target: All green (≥ 90)
```

---

## Troubleshooting

### Pages Not Indexed

**Causes:**

- Blocked in robots.txt
- No internal links
- Duplicate content
- Crawl errors

**Solutions:**

1. Check Search Console → Coverage
2. Request indexing manually
3. Add internal links
4. Fix duplicate meta tags

### Low Rankings

**Common Issues:**

- Weak meta descriptions (low CTR)
- Missing keywords in H1/H2
- Slow page speed
- Poor mobile experience

**Solutions:**

1. Optimize meta tags
2. Improve content quality
3. Increase page speed
4. Build quality backlinks

---

## Resources

- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema.org Documentation](https://schema.org/)

---

## Support

- **Architecture:** `docs/ARCHITECTURE.md`
- **Performance:** `docs/PERFORMANCE.md`
- **Deployment:** `docs/DEPLOYMENT.md`
