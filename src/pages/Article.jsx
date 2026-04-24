import { useParams, Link, Navigate } from 'react-router-dom'
import { Clock, Calendar, User, ArrowLeft, Share2, Heart } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import ArticleCard from '../components/ArticleCard.jsx'
import AdSlot from '../components/AdSlot.jsx'
import Newsletter from '../components/Newsletter.jsx'
import { getArticle, getRelated } from '../data/articles.js'
import { getCategory } from '../data/categories.js'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function Article() {
  const { id } = useParams()
  const article = getArticle(id)
  const { isFav, toggle } = useFavorites()

  if (!article) return <Navigate to="/blog" replace />

  const related = getRelated(article, 3)
  const cat = getCategory(article.category)
  const fav = isFav('articles', article.id)

  // Schema.org JSON-LD for this article (Google loves this)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    author: { '@type': 'Person', name: article.author },
    datePublished: article.date,
    articleSection: cat?.name || '',
    keywords: article.tags.join(', '),
  }

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        type="article"
        schema={schema}
      />

      <article className="container-site py-10">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600">
          <ArrowLeft className="w-4 h-4" /> Back to blog
        </Link>

        {/* Cover / header */}
        <div className={`mt-6 rounded-3xl overflow-hidden bg-gradient-to-br ${article.cover} p-10 md:p-16 text-white relative`}>
          <div className="absolute inset-0 grid place-items-center text-[10rem] opacity-20">{article.emoji}</div>
          <div className="relative max-w-3xl">
            {cat && <span className="chip bg-white/20 backdrop-blur text-white">{cat.name}</span>}
            <h1 className="mt-4 font-display font-extrabold text-3xl md:text-5xl tracking-tight">
              {article.title}
            </h1>
            <p className="mt-4 text-white/85 text-lg max-w-2xl">{article.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/80">
              <span className="inline-flex items-center gap-1.5"><User className="w-4 h-4" />{article.author}</span>
              <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(article.date).toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' })}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readTime} min read</span>
            </div>
          </div>
        </div>

        {/* Reading layout: content + sidebar */}
        <div className="mt-10 grid lg:grid-cols-[1fr_300px] gap-10">
          <div>
            {/* Top of body */}
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => toggle('articles', article.id)}
                className={`btn !py-2 !px-4 text-sm ${fav ? 'bg-rose-500 text-white' : 'btn-secondary'}`}
              >
                <Heart className="w-4 h-4" fill={fav ? 'currentColor' : 'none'} />
                {fav ? 'Saved' : 'Save article'}
              </button>
              <button
                onClick={() => navigator.share ? navigator.share({ title: article.title, url: window.location.href }) : navigator.clipboard.writeText(window.location.href)}
                className="btn-secondary !py-2 !px-4 text-sm"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>

            {/* Article body blocks */}
            <div className="prose-article max-w-none">
              {article.content.map((block, i) => {
                if (block.type === 'h2') return <h2 key={i} className="font-display font-bold text-2xl mt-10 mb-3 text-slate-900 dark:text-white">{block.text}</h2>
                if (block.type === 'list') return (
                  <ul key={i} className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 my-4">
                    {block.items.map((it, j) => <li key={j}>{it}</li>)}
                  </ul>
                )
                // Insert an in-article ad in the middle of the body
                const mid = Math.floor(article.content.length / 2)
                return (
                  <div key={i}>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed my-4">{block.text}</p>
                    {i === mid && <AdSlot variant="in-article" className="my-8" />}
                  </div>
                )
              })}
            </div>

            {/* Tag row */}
            <div className="mt-10 flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <span key={t} className="chip bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#{t}</span>
              ))}
            </div>

            <AdSlot variant="bottom" className="mt-10" />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <AdSlot variant="sidebar" />
            <div className="card p-5">
              <h4 className="font-display font-bold text-slate-900 dark:text-white">About the author</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {article.author} writes about AI, business and creator economy.
              </p>
            </div>
            <AdSlot variant="sidebar" />
          </aside>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="container-site mt-10">
          <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Related articles</h3>
          <div className="mt-5 grid md:grid-cols-3 gap-5">
            {related.map((a) => <ArticleCard key={a.id} article={a} />)}
          </div>
        </section>
      )}

      <Newsletter />
    </>
  )
}
