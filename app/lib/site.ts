// Canonical origin for metadata, sitemap.xml, robots.txt and JSON-LD.
//
// NEXT_PUBLIC_* is inlined at build time and these routes are statically
// generated, so this value is frozen when `npm run build` runs. In Docker it
// must arrive as a build arg (see Dockerfile / docker-compose.yml) — setting it
// only at runtime has no effect on already-generated pages.
const configured = process.env.NEXT_PUBLIC_SITE_URL;

if (!configured && process.env.NODE_ENV === 'production') {
  // Better a loud localhost than silently publishing canonical URLs that point
  // at a domain we do not own.
  console.warn(
    '[site] NEXT_PUBLIC_SITE_URL was not set at build time; canonical URLs, ' +
    'robots.txt and sitemap.xml will point at localhost.'
  );
}

export const SITE_URL = (configured || 'http://localhost:3000').replace(/\/$/, '');
