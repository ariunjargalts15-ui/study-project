import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import SearchBar from '../components/SearchBar.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import ArticleCard from '../components/ArticleCard.jsx'
import AdSlot from '../components/AdSlot.jsx'
import Newsletter from '../components/Newsletter.jsx'
import { articles, getFeatured } from '../data/articles.js'

export default function Blog() {
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  const [cat, setCat] = useState(params.get('cat') || 'all')
  const featured = getFeatured()

  useEffect(() => {
    const next = {}
    if (q) next.q = q
    if (cat && cat !== 'all') next.cat = cat
    setParams(next, { replace: true })
  }, [q, cat, setParams])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return articles.filter((a) => {
      const matchCat = cat === 'all' || a.category === cat
      const matchQ = !needle ||
        a.title.toLowerCase().includes(needle) ||
        a.excerpt.toLowerCase().includes(needle) ||
        a.tags.some((t) => t.toLowerCase().includes(needle))
      return matchCat && matchQ
    })
  }, [q, cat])

  return (
    <>
      <SEO
        title="AI Guides for Students — Homework, Studying, IELTS & Productivity"
        description="Short, practical guides on using AI for homework, studying smarter, IELTS prep, language learning, coding, and productivity. Updated weekly for students."
        url="/blog"
      />

      <section className="hero-mesh">
        <div className="container-site py-14 text-center">
          <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-slate-900 dark:text-white">
            Guides that <span className="gradient-text">actually help</span>.
          </h1>
          <p className="mt-3 max-w-xl mx-auto text-slate-600 dark:text-slate-300">
            Short reads on AI, business ideas, making money online, language learning, and productivity.
          </p>
          <div className="mt-6 max-w-xl mx-auto">
            <SearchBar value={q} onChange={setQ} placeholder="Search articles…" />
          </div>
        </div>
      </section>

      <div className="container-site mt-4">
        <AdSlot variant="banner" />
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="container-site mt-12">
          <div className="flex items-end justify-between mb-5">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">Featured articles</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {featured.map((a) => <ArticleCard key={a.id} article={a} />)}
          </div>
        </section>
      )}

      <section className="container-site mt-14">
        <CategoryFilter active={cat} onChange={setCat} />
        <div className="mt-6 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>{filtered.length} article{filtered.length === 1 ? '' : 's'}</span>
          {(q || cat !== 'all') && (
            <button onClick={() => { setQ(''); setCat('all') }} className="text-brand-600 font-medium hover:underline">Clear filters</button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="card p-10 text-center mt-6">
            <div className="text-5xl">📝</div>
            <p className="mt-3 font-semibold text-slate-900 dark:text-white">No articles yet in this filter.</p>
            <Link to="/blog" className="inline-flex items-center gap-1 mt-2 text-brand-600 font-medium">
              Back to all posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((a) => <ArticleCard key={a.id} article={a} />)}
          </div>
        )}
      </section>

      <Newsletter />
    </>
  )
}
