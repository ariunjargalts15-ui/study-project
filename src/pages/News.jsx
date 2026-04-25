import { useState } from 'react'
import { Newspaper, TrendingUp, ExternalLink, Calendar, Filter } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { news, getNewsByCategory, newsCategories } from '../data/news.js'

const categoryLabels = { all: 'All', tools: 'Tools', research: 'Research', business: 'Business', policy: 'Policy' }

export default function News() {
  const [cat, setCat] = useState('all')
  const items = getNewsByCategory(cat)
  const trending = news.filter((n) => n.trending)

  return (
    <>
      <SEO
        title="AI News & Updates — AI Tools Hub"
        description="The latest AI industry news: model releases, research breakthroughs, business funding, and policy updates — curated for builders and creators."
      />

      {/* Hero */}
      <section className="hero-mesh">
        <div className="container-site py-14 text-center">
          <span className="chip bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 text-brand-700 dark:text-brand-300">
            <Newspaper className="w-3.5 h-3.5 inline-block mr-1" /> Updated weekly
          </span>
          <h1 className="mt-4 font-display font-extrabold text-3xl md:text-5xl tracking-tight text-slate-900 dark:text-white">
            AI <span className="gradient-text">News & Updates</span>
          </h1>
          <p className="mt-3 max-w-xl mx-auto text-slate-600 dark:text-slate-300">
            The most important AI stories from research labs, startups, and regulators — cut through the hype.
          </p>
        </div>
      </section>

      <div className="container-site">
        <AdSlot variant="banner" />
      </div>

      {/* Trending strip */}
      {trending.length > 0 && (
        <section className="container-site mt-10">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-rose-500" />
            <h2 className="font-semibold text-slate-900 dark:text-white">Trending now</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trending.map((item) => (
              <NewsCard key={item.id} item={item} featured />
            ))}
          </div>
        </section>
      )}

      {/* Filter + all news */}
      <section className="container-site mt-12 mb-16">
        <div className="flex items-center gap-3 flex-wrap mb-6">
          <Filter className="w-4 h-4 text-slate-400" />
          {newsCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`btn text-sm ${cat === c ? 'bg-brand-600 text-white' : 'btn-secondary'}`}
            >
              {categoryLabels[c] || c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="card p-16 text-center text-slate-400">
            No news in this category yet.
          </div>
        )}
      </section>

      <div className="container-site">
        <AdSlot variant="bottom" />
      </div>
    </>
  )
}

function NewsCard({ item, featured }) {
  const dateStr = new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <article className={`card group overflow-hidden transition hover:-translate-y-1 hover:shadow-glow ${featured ? 'ring-2 ring-brand-200 dark:ring-brand-900' : ''}`}>
      {/* Colored top bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${item.color}`} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-2xl flex-shrink-0">{item.emoji}</span>
            <div className="min-w-0">
              <span className={`inline-block chip text-xs mb-2 capitalize
                ${item.category === 'tools'    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : item.category === 'research' ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300'
                : item.category === 'business' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}
              >
                {item.category}
              </span>
            </div>
          </div>
          {item.trending && (
            <span className="chip bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 text-xs flex-shrink-0">
              🔥 Trending
            </span>
          )}
        </div>

        <h3 className="font-display font-bold text-slate-900 dark:text-white leading-snug mt-1">
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
          {item.summary}
        </p>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{dateStr}</span>
            <span className="mx-1">·</span>
            <span>{item.source}</span>
          </div>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            Read <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </article>
  )
}
