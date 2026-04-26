import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import SearchBar from '../components/SearchBar.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import ToolCard from '../components/ToolCard.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { tools } from '../data/tools.js'

export default function Tools() {
  const [params, setParams] = useSearchParams()
  const initialQ = params.get('q') || ''
  const initialCat = params.get('cat') || 'all'
  const [q, setQ] = useState(initialQ)
  const [cat, setCat] = useState(initialCat)

  // Keep the URL in sync so users can share/bookmark filtered views.
  useEffect(() => {
    const next = {}
    if (q) next.q = q
    if (cat && cat !== 'all') next.cat = cat
    setParams(next, { replace: true })
  }, [q, cat, setParams])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return tools.filter((t) => {
      const matchCat = cat === 'all' || t.category === cat
      const matchQ =
        !needle ||
        t.name.toLowerCase().includes(needle) ||
        t.tagline.toLowerCase().includes(needle) ||
        t.tags.some((tag) => tag.toLowerCase().includes(needle))
      return matchCat && matchQ
    })
  }, [q, cat])

  return (
    <>
      <SEO
        title="Best AI Tools for Students — Full Directory"
        description="Browse 35+ hand-picked AI tools for students by category: homework help, writing, research, productivity, image, video, language learning, note taking, and coding."
        url="/tools"
      />

      {/* Header */}
      <section className="hero-mesh">
        <div className="container-site py-14 text-center">
          <span className="chip bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 text-brand-700 dark:text-brand-300 mb-4">
            35+ tools reviewed
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-slate-900 dark:text-white">
            AI Tools <span className="gradient-text">for Students</span>
          </h1>
          <p className="mt-3 max-w-xl mx-auto text-slate-600 dark:text-slate-300">
            Hand-picked AI tools for homework, writing, research, coding, language learning, and more.
            Filter by category and save your favorites.
          </p>
          <div className="mt-6 max-w-xl mx-auto">
            <SearchBar value={q} onChange={setQ} placeholder="Search tools… try &quot;free&quot;, &quot;math&quot;, &quot;IELTS&quot;" />
          </div>
        </div>
      </section>

      <div className="container-site mt-4">
        <AdSlot variant="banner" />
      </div>

      <section className="container-site mt-10">
        <CategoryFilter active={cat} onChange={setCat} />

        <div className="mt-6 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>{filtered.length} tool{filtered.length === 1 ? '' : 's'} found</span>
          {(q || cat !== 'all') && (
            <button
              onClick={() => { setQ(''); setCat('all') }}
              className="text-brand-600 font-medium hover:underline"
            >Clear filters</button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="card p-10 text-center mt-6">
            <div className="text-5xl">🔎</div>
            <p className="mt-3 font-semibold text-slate-900 dark:text-white">No tools match your search.</p>
            <p className="text-slate-500 text-sm">Try a different keyword or clear filters.</p>
          </div>
        ) : (
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((t) => <ToolCard key={t.id} tool={t} />)}
          </div>
        )}
      </section>

      <div className="container-site mt-12">
        <AdSlot variant="bottom" />
      </div>
    </>
  )
}
