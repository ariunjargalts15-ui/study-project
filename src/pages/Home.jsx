import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Sparkles, ArrowRight, Wand2, BookOpen, Rocket, TrendingUp,
  Newspaper, ExternalLink, GraduationCap,
  CheckCircle2,
} from 'lucide-react'
import SEO from '../components/SEO.jsx'
import SearchBar from '../components/SearchBar.jsx'
import ToolCard from '../components/ToolCard.jsx'
import ArticleCard from '../components/ArticleCard.jsx'
import AdSlot from '../components/AdSlot.jsx'
import Newsletter from '../components/Newsletter.jsx'
import { getTrendingTools } from '../data/tools.js'
import { articles, getPopular, getFeatured } from '../data/articles.js'
import { categories } from '../data/categories.js'
import { getTrendingNews } from '../data/news.js'

export default function Home() {
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const trending     = getTrendingTools().slice(0, 6)
  const popular      = getPopular().slice(0, 3)
  const featured     = getFeatured()[0]
  const trendingNews = getTrendingNews().slice(0, 3)

  const onSearch = (value) => {
    if (!value.trim()) return
    nav(`/tools?q=${encodeURIComponent(value.trim())}`)
  }

  return (
    <>
      <SEO
        title="Best Free AI Tools for Students & Productivity"
        description="Discover the top AI tools for homework, writing, studying, language learning, note-taking, research, and productivity. Curated for students and learners."
        url="/"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'StudyAI Tools',
          url: 'https://studyaitools.biz',
          description: 'Best free AI tools for students, studying, homework, writing, and language learning.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://studyaitools.biz/tools?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }}
      />

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden hero-mesh">
        <div className="container-site pt-16 pb-24 md:pt-24 md:pb-32 text-center">
          <span className="inline-flex items-center gap-2 chip bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 text-brand-700 dark:text-brand-300">
            <Sparkles className="w-3.5 h-3.5" /> 35+ AI tools reviewed · free & paid
          </span>

          <h1 className="mt-6 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-slate-900 dark:text-white">
            Best Free AI Tools for<br className="hidden sm:block" />
            <span className="gradient-text"> Students &amp; Productivity</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Discover the top AI tools for <strong>homework</strong>, <strong>writing</strong>,{' '}
            <strong>studying</strong>, <strong>language learning</strong>, note‑taking,{' '}
            <strong>research</strong>, and productivity — curated for students and learners.
          </p>

          <div className="mt-8 max-w-2xl mx-auto">
            <SearchBar
              value={q}
              onChange={setQ}
              onSubmit={onSearch}
              placeholder="Find AI tools… try &quot;homework&quot;, &quot;IELTS&quot;, &quot;math&quot;"
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/tools" className="btn-primary">
              <Rocket className="w-4 h-4" /> Explore Tools
            </Link>
            <Link to="/tools?cat=homework" className="btn-secondary">
              <GraduationCap className="w-4 h-4" /> Top AI for Homework
            </Link>
            <Link to="/blog" className="btn-secondary">
              <BookOpen className="w-4 h-4" /> Latest Guides
            </Link>
          </div>

          {/* Trust bar */}
          <div className="mt-12 grid grid-cols-3 gap-3 max-w-2xl mx-auto text-center">
            {[
              { emoji: '👥', n: '200k+', l: 'Monthly readers' },
              { emoji: '⭐', n: '35+',   l: 'AI tools reviewed' },
              { emoji: '🎓', n: '9',     l: 'Tool categories' },
            ].map((s, i) => (
              <div key={i} className="card p-4">
                <div className="text-xl">{s.emoji}</div>
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

      {/* ==================== CATEGORIES ==================== */}
      <section className="container-site mt-16">
        <header className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">
              Browse by category
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Find the right tool for your subject.</p>
          </div>
          <Link to="/tools" className="hidden sm:inline-flex items-center gap-1 text-brand-600 font-semibold text-sm hover:text-brand-700">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </header>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.filter((c) => c.slug !== 'ai').slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              to={`/tools?cat=${c.slug}`}
              className={`group relative overflow-hidden rounded-2xl p-5 text-white bg-gradient-to-br ${c.color} shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all`}
            >
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
              <div className="text-2xl mb-2">{c.emoji}</div>
              <div className="font-display font-bold text-sm leading-tight">{c.name}</div>
              <div className="text-white/70 text-xs mt-0.5">Browse →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================== TRENDING TOOLS ==================== */}
      <section className="container-site mt-20">
        <header className="flex items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-2 chip bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
              <TrendingUp className="w-3.5 h-3.5" /> Trending this week
            </div>
            <h2 className="mt-2 font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">
              AI tools students are using right now
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

      {/* ==================== WHY TRUST US ==================== */}
      <section className="container-site mt-20">
        <div className="card p-8 md:p-12 bg-gradient-to-br from-brand-50 to-accent-50 dark:from-slate-900 dark:to-slate-800 border-brand-100 dark:border-slate-700">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white text-center mb-8">
            Why students trust StudyAI Tools
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { e: '✅', t: 'Verified free tiers',       d: 'We confirm which tools are genuinely free — not just "free trial."' },
              { e: '📊', t: 'Honest pros & cons',        d: 'Every review includes real drawbacks. We don\'t hide limitations.' },
              { e: '🎓', t: 'Student-focused',           d: 'Tested for academic use: essays, math, research, and language exams.' },
              { e: '🔄', t: 'Updated regularly',         d: 'AI tools change fast. We update pricing and features as they evolve.' },
              { e: '🔐', t: 'Privacy-conscious',         d: 'We note which tools process your data, so you can make informed choices.' },
              { e: '🚫', t: 'No paid placements',        d: 'Ratings and recommendations are editorial — never sold to tools.' },
            ].map((x, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{x.e}</span>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm">{x.t}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{x.d}</div>
                </div>
              </div>
            ))}
          </div>
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
            Guides for students
          </h2>
          <Link to="/blog" className="hidden sm:inline-flex items-center gap-1 text-brand-600 font-semibold text-sm">
            Browse all guides <ArrowRight className="w-4 h-4" />
          </Link>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.filter((a) => a.popular).slice(0, 6).map((a) => <ArticleCard key={a.id} article={a} />)}
        </div>
      </section>

      {/* ==================== NEWS STRIP ==================== */}
      {trendingNews.length > 0 && (
        <section className="container-site mt-20">
          <header className="flex items-end justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-2 chip bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <Newspaper className="w-3.5 h-3.5" /> Latest AI news
              </div>
              <h2 className="mt-2 font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">
                What&rsquo;s happening in AI
              </h2>
            </div>
            <Link to="/news" className="hidden sm:inline-flex items-center gap-1 text-brand-600 font-semibold text-sm hover:text-brand-700">
              All news <ArrowRight className="w-4 h-4" />
            </Link>
          </header>
          <div className="grid sm:grid-cols-3 gap-4">
            {trendingNews.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-5 group hover:-translate-y-1 hover:shadow-glow transition block"
              >
                <div className={`h-1 w-full rounded-full bg-gradient-to-r ${item.color} mb-4`} />
                <div className="text-2xl mb-2">{item.emoji}</div>
                <h3 className="font-semibold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{item.summary}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>{item.source}</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ==================== FREE TOOLS PROMO ==================== */}
      <section className="container-site mt-20">
        <div className="relative overflow-hidden rounded-3xl p-8 md:p-14 card">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gradient-to-br from-brand-500/30 to-accent-500/30 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">8 free tools · no signup</span>
              <h2 className="mt-3 font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white">
                Free study tools you&rsquo;ll actually use.
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-md">
                Word counter, Pomodoro timer, password checker, color palette, prompt generator,
                business name generator, study planner, and income calculator — all free.
              </p>
              <Link to="/free-tools" className="btn-primary mt-5">
                <Wand2 className="w-4 h-4" /> Try a free tool
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { e: '🧠', t: 'Prompt' },
                { e: '📝', t: 'Word Count' },
                { e: '⏱️', t: 'Pomodoro' },
                { e: '🔐', t: 'Password' },
                { e: '🎨', t: 'Colors' },
                { e: '🏷️', t: 'Business Name' },
                { e: '📚', t: 'Study Plan' },
                { e: '💰', t: 'Income Calc' },
              ].map((x, i) => (
                <div key={i} className="card p-3 text-center">
                  <div className="text-2xl">{x.e}</div>
                  <div className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-300">{x.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Newsletter />

      <div className="container-site">
        <AdSlot variant="bottom" />
      </div>
    </>
  )
}
