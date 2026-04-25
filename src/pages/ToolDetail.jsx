import { useParams, Link } from 'react-router-dom'
import { ExternalLink, CheckCircle2, XCircle, Star, ArrowLeft, Heart, Flame, ChevronRight } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import ToolCard from '../components/ToolCard.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { getTool, getTrendingTools } from '../data/tools.js'
import { getCategory } from '../data/categories.js'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function ToolDetail() {
  const { id } = useParams()
  const tool = getTool(id)
  const { isFav, toggle } = useFavorites()

  if (!tool) {
    return (
      <div className="container-site py-24 text-center">
        <div className="text-6xl mb-4">🔎</div>
        <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white">Tool not found</h1>
        <Link to="/tools" className="btn-primary mt-6 inline-flex">
          <ArrowLeft className="w-4 h-4" /> Back to all tools
        </Link>
      </div>
    )
  }

  const cat        = getCategory(tool.category)
  const fav        = isFav('tools', tool.id)
  const visitUrl   = tool.affiliateUrl || tool.url
  const altTools   = (tool.alternatives || []).map(getTool).filter(Boolean)
  const trending   = getTrendingTools().filter((t) => t.id !== tool.id).slice(0, 3)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.longDescription || tool.description,
    applicationCategory: cat?.name,
    aggregateRating: { '@type': 'AggregateRating', ratingValue: tool.rating, bestRating: 5 },
    offers: { '@type': 'Offer', price: tool.price === 'Free' ? '0' : undefined, priceCurrency: 'USD' },
    url: tool.url,
  }

  return (
    <>
      <SEO
        title={`${tool.name} Review — Is It Worth It for Students?`}
        description={tool.tagline + ' ' + (tool.longDescription || tool.description).slice(0, 100)}
        url={`/tools/${tool.id}`}
        schema={schema}
      />

      {/* Breadcrumb */}
      <div className="container-site pt-6 pb-0">
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/tools" className="hover:text-brand-600">AI Tools</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          {cat && <Link to={`/tools?cat=${cat.slug}`} className="hover:text-brand-600">{cat.name}</Link>}
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-white font-medium">{tool.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className={`mt-4 bg-gradient-to-br ${tool.color} text-white`}>
        <div className="container-site py-14">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur grid place-items-center text-5xl shadow-soft flex-shrink-0">
              {tool.emoji}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {cat && <span className="chip bg-white/20 text-white backdrop-blur">{cat.name}</span>}
                <span className="chip bg-white/20 text-white backdrop-blur">{tool.price}</span>
                {tool.trending && (
                  <span className="chip bg-white/30 text-white backdrop-blur">
                    <Flame className="w-3 h-3" /> Trending
                  </span>
                )}
              </div>
              <h1 className="font-display font-extrabold text-3xl md:text-4xl">{tool.name}</h1>
              <p className="mt-2 text-white/85 max-w-2xl">{tool.tagline}</p>
              <div className="mt-3 flex items-center gap-1 text-white/90">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(tool.rating) ? 'fill-current' : 'fill-white/30'}`} />
                ))}
                <span className="ml-1 font-bold">{tool.rating}</span>
                <span className="text-white/70 text-sm">/ 5</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              <a
                href={visitUrl}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="btn bg-white text-slate-900 hover:bg-slate-100 font-bold shadow-lg"
              >
                Visit {tool.name} <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => toggle('tools', tool.id)}
                className={`btn !py-2 text-sm font-medium gap-2
                  ${fav ? 'bg-rose-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
              >
                <Heart className="w-4 h-4" fill={fav ? 'currentColor' : 'none'} />
                {fav ? 'Saved' : 'Save tool'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container-site mt-8">
        <AdSlot variant="banner" />
      </div>

      {/* Main content grid */}
      <section className="container-site mt-10 grid lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-8">

          {/* About */}
          <div className="card p-6 md:p-8">
            <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-3">About {tool.name}</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {tool.longDescription || tool.description}
            </p>
          </div>

          {/* Best for */}
          {tool.bestFor && (
            <div className="card p-6">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">Best for</h2>
              <p className="text-slate-600 dark:text-slate-300">{tool.bestFor}</p>
            </div>
          )}

          {/* Pros & Cons */}
          {(tool.pros || tool.cons) && (
            <div className="grid sm:grid-cols-2 gap-4">
              {tool.pros && (
                <div className="card p-6">
                  <h3 className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5" /> Pros
                  </h3>
                  <ul className="space-y-2">
                    {tool.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {tool.cons && (
                <div className="card p-6">
                  <h3 className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2 mb-4">
                    <XCircle className="w-5 h-5" /> Cons
                  </h3>
                  <ul className="space-y-2">
                    {tool.cons.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Pricing */}
          {tool.pricingDetails && (
            <div className="card p-6">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-3">Pricing</h2>
              <p className="text-slate-600 dark:text-slate-300">{tool.pricingDetails}</p>
              <a
                href={visitUrl}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="btn-primary mt-4 inline-flex"
              >
                Get started with {tool.name} <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Alternatives */}
          {altTools.length > 0 && (
            <div>
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-4">
                Alternatives to {tool.name}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {altTools.map((t) => <ToolCard key={t.id} tool={t} />)}
              </div>
            </div>
          )}

        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Quick info */}
          <div className="card p-5">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Quick facts</h3>
            <dl className="space-y-3 text-sm">
              {[
                { label: 'Category', value: cat?.name || tool.category },
                { label: 'Pricing', value: tool.price },
                { label: 'Rating', value: `${tool.rating} / 5` },
                { label: 'Pricing details', value: tool.pricingDetails },
              ].filter((r) => r.value).map((r) => (
                <div key={r.label} className="flex justify-between gap-2">
                  <dt className="text-slate-500 dark:text-slate-400">{r.label}</dt>
                  <dd className="font-medium text-slate-900 dark:text-white text-right">{r.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href={visitUrl}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="btn-primary w-full mt-5 justify-center"
            >
              Visit {tool.name} <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Tags */}
          {tool.tags?.length > 0 && (
            <div className="card p-5">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/tools?q=${tag}`}
                    className="chip bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-100 hover:text-brand-700 text-xs"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* AdSlot */}
          <AdSlot variant="sidebar" />

          {/* Trending */}
          <div className="card p-5">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Trending tools</h3>
            <div className="space-y-3">
              {trending.map((t) => (
                <Link
                  key={t.id}
                  to={`/tools/${t.id}`}
                  className="flex items-center gap-3 group"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} grid place-items-center text-xl flex-shrink-0`}>
                    {t.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm text-slate-900 dark:text-white group-hover:text-brand-600 truncate">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{t.tagline}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </aside>
      </section>

      <div className="container-site mt-12 mb-8">
        <AdSlot variant="bottom" />
      </div>
    </>
  )
}
