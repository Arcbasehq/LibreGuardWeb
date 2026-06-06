import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: string;
};

const SITE = "https://libreguard.org";

const structured = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "${SITE}/#organization",
      "name": "LibreGuard",
      "url": "${SITE}",
      "logo": "${SITE}/icons/icon128.png",
      "description": "A fast, private ad and tracker blocker for Manifest V3 browsers — no telemetry, no account, no data ever leaves your device."
    },
    {
      "@type": "WebSite",
      "@id": "${SITE}/#website",
      "url": "${SITE}",
      "name": "LibreGuard",
      "description": "Block ads, trackers, and malware at the network level. Free and open source under GNU GPL v3.0.",
      "publisher": { "@id": "${SITE}/#organization" }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "${SITE}/#software",
      "name": "LibreGuard",
      "applicationCategory": "BrowserExtension",
      "operatingSystem": "Chrome, Brave, Edge, Firefox",
      "description": "Privacy-first ad blocker using declarativeNetRequest. Blocks 330K+ domains. No telemetry. Open source.",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "author": { "@id": "${SITE}/#organization" }
    }
  ]
}`;

export default function SEO({
  title,
  description,
  path,
  ogImage = "/og.png",
  ogType = "website",
}: SEOProps) {
  const url = `${SITE}${path}`;
  const fullTitle = `${title} — LibreGuard`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${SITE}${ogImage}`} />
      <meta property="og:site_name" content="LibreGuard" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE}${ogImage}`} />

      <script type="application/ld+json">{structured}</script>
    </Helmet>
  );
}
