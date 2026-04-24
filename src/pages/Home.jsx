import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, Wand2, BookOpen, Rocket, TrendingUp, Star, Users, Zap } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import SearchBar from '../components/SearchBar.jsx'
import ToolCard from '../components/ToolCard.jsx'
import ArticleCard from '../components/ArticleCard.jsx'
import AdSlot from '../components/AdSlot.jsx'
import Newsletter from '../components/Newsletter.jsx'
import { getTrendingTools } from '../data/tools.js'
import { articles, getPopular, getFeatured } from '../data/articles.js'
import { categories } from '../data/categories.js'

export default function Home() {
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const trending = getTrendingTools().slice(0, 6)
  const popular = getPopular().slice(0, 3)
  const featured = getFeatured()[0]

  const onSearch = (value) => {
    if (!value.trim()) return
    nav(`/tools?q=${encodeURIComponent(value.trim())}`)
  }

  return (
    <>
      <SEO
        title="Discover AI Tools, Guides & Free Mini Tools"
        description="Your daily hub for the best AI tools, practical guides for making money online, language learning, productivity, plus free mini tools like prompt and business name generators."
      />

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden hero-mesh">
        <div className="container-site pt-16 pb-24 md:pt-24 md:pb-32 text-center">
          <span className="inline-flex items-center gap-2 chip bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 text-brand-700 dark:text-brand-300">
            <Sparkles className="w-3.5 h-3.5" /> 1,200+ AI tools · updated weekly
          </span>
          <h1 className="mt-6 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-slate-900 dark:text-white">
            Discover the best{' '}
            <span className="gradient-text">AI tools</span>
            <br className="hidden sm:block" /> to learn, build, and earn online.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Thousands of curated AI tools. Short, honest guides. Free mini tools you can
            use right now — prompt generator, business name generator, study planner and more.
          </p>

          <div className="mt-8 max-w-2xl mx-auto">
            <SearchBar
              value={q}
              onChange={setQ}
              onSubmit={onSearch}
              placeholder={`Try "image generator", "productivity", "writing"…`}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/tools" className="btn-primary">
              <Rocket className="w-4 h-4" /> Explore Tools
            </Link>
            <Link to="/blog" className="btn-secondary">
              <BookOpen className="w-4 h-4" /> Read Guides
            </Link>
            <Link to="/free-tools" className="btn-secondary">
              <Wand2 className="w-4 h-4" /> Generate Prompt
            </Link>
          </div>

          {/* Trust bar */}
          <div className="mt-12 grid grid-cols-3 gap-3 max-w-2xl mx-auto text-center">
            {[
              { icon: Users, n: '200k+', l: 'Monthly readers' },
              { icon: Star, n: '1,200+', l: 'Curated AI tools' },
              { icon: Zap, n: '4', l: 'Free mini tools' },
            ].map((s, i) => (
              <div key={i} className="card p-4">
                <s.icon className="w-5 h-5 text-brand-500 mx-auto" />
                <div className="mt-1 font-display font-bold text-xl text-slate-900 dark:text-white">{s.n}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TOP BANNER AD ==================== */}
      <div className="container-site">
        <AdSlot variant="banner" />
      </div>

      {/* ==================== POPULAR CATEGORIES ==================== */}
      <section className="container-site mt-16">
        <header className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">
              Popular categories
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Pick a topic and dive in.</p>
          </div>
          <Link to="/tools" className="hidden sm:inline-flex items-center gap-1 text-brand-600 font-semibold text-sm hover:text-brand-700">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((c) => (
            <Link
              key={c.slug}
              to={`/tools?cat=${c.slug}`}
              className={`group relative overflow-hidden rounded-2xl p-5 text-white bg-gradient-to-br ${c.color} shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all`}
            >
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
              <div className="font-display font-bold text-lg">{c.name}</div>
              <div className="text-white/80 text-xs mt-1">Browse {c.name} →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================== TRENDING TOOLS ==================== */}
      <section className="container-site mt-20">
        <header className="flex items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-2 chip bg-rose-100 text-rose-600">
              <TrendingUp className="w-3.5 h-3.5" /> Trending now
            </div>
            <h2 className="mt-2 font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">
              Tools everyone is using this week
            </h2>
          </div>
          <Link to="/tools" className="hidden sm:inline-flex items-center gap-1 text-brand-600 font-semibold text-sm">
            See all tools <ArrowRight className="w-4 h-4" />
          </Link>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trending.map((t) => <ToolCard key={t.id} tool={t} />)}
        </div>
      </section>

      {/* ==================== FEATURED GUIDE ==================== */}
      {featured && (
        <section className="container-site mt-20">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <Link
              to={`/blog/${featured.id}`}
              className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${featured.cover} p-8 md:p-12 text-white min-h-[340px] flex flex-col justify-end shadow-soft hover:shadow-glow transition`}
            >
              <div className="absolute inset-0 grid place-items-center text-8xl opacity-30">{featured.emoji}</div>
              <span className="relative chip bg-white/20 backdrop-blur text-white w-max">Featured guide</span>
              <h3 className="relative mt-3 font-display font-extrabold text-2xl md:text-3xl">
                {featured.title}
              </h3>
              <p className="relative mt-2 text-white/85 line-clamp-3">{featured.excerpt}</p>
              <div className="relative mt-4 inline-flex items-center gap-1 font-semibold">
                Read now <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <div className="grid grid-rows-2 gap-4">
              {popular.slice(0, 2).map((a) => (
                <ArticleCard key={a.id} article={a} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== IN-FEED AD ==================== */}
      <div className="container-site mt-16">
        <AdSlot variant="in-article" />
      </div>

      {/* ==================== POPULAR ARTICLES ==================== */}
      <section className="container-site mt-16">
        <header className="flex items-end justify-between mb-6">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">
            Popular guides
          </h2>
          <Link to="/blog" className="hidden sm:inline-flex items-center gap-1 text-brand-600 font-semibold text-sm">
            Browse blog <ArrowRight className="w-4 h-4" />
          </Link>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.slice(0, 6).map((a) => <ArticleCard key={a.id} article={a} />)}
        </div>
      </section>

      {/* ==================== FREE TOOLS PROMO ==================== */}
      <section className="container-site mt-20">
        <div className="relative overflow-hidden rounded-3xl p-8 md:p-14 card">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gradient-to-br from-brand-500/30 to-accent-500/30 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="chip bg-brand-100 text-brand-700">100% free · no signup</span>
              <h2 className="mt-3 font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white">
                Free mini tools you&rsquo;ll actually use.
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-md">
                Four fast tools, zero fluff: prompt generator, business name generator,
                study planner and an online income calculator.
              </p>
              <Link to="/free-tools" className="btn-primary mt-5">
                <Wand2 className="w-4 h-4" /> Try a free tool
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { e: '🧠', t: 'Prompt Generator', s: 'Write killer AI prompts' },
                { e: '🏷️', t: 'Business Name', s: 'Creative brand ideas' },
                { e: '📚', t: 'Study Planner', s: 'Ace your next exam' },
                { e: '💰', t: 'Income Calculator', s: 'Project your earnings' },
              ].map((x, i) => (
                <div key={i} className="card p-4">
                  <div className="text-2xl">{x.e}</div>
                  <div className="mt-1 font-semibold text-slate-900 dark:text-white text-sm">{x.t}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{x.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Newsletter />

      {/* Bottom ad */}
      <div className="container-site">
        <AdSlot variant="bottom" />
      </div>
    </>
  )
}
