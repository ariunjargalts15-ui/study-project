import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'StudyAI Tools'
const SITE_URL  = 'https://studyaitools.biz'

export default function SEO({
  title,
  description,
  image = `${SITE_URL}/og-cover.png`,
  url,
  type = 'website',
  schema,
}) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} | Best Free AI Tools for Students`
  const canonical = url ? `${SITE_URL}${url}` : (typeof window !== 'undefined' ? window.location.href : SITE_URL)

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:type"        content={type} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:url"         content={canonical} />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content="@studyaitools" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* Keywords */}
      <meta name="keywords" content="ai tools for students, free ai tools, best homework ai, study ai tools, productivity ai tools, language learning ai, ai homework help" />

      {/* Optional JSON-LD schema markup */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  )
}
