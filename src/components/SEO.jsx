import { Helmet } from 'react-helmet-async'

/**
 * Drop this at the top of every page to set title, description, Open Graph tags
 * and (optionally) schema.org JSON-LD. Pass `schema` for per-page structured data.
 */
export default function SEO({
  title,
  description,
  image = '/og-cover.png',
  url,
  type = 'website',
  schema,
}) {
  const fullTitle = title ? `${title} — AI Tools Hub` : 'AI Tools Hub'
  const canonical = url || (typeof window !== 'undefined' ? window.location.href : '')

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Optional JSON-LD schema markup */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  )
}
