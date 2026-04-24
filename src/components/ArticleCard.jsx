import { Link } from 'react-router-dom'
import { Clock, Heart, Flame } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { getCategory } from '../data/categories.js'

export default function ArticleCard({ article, compact = false }) {
  const { isFav, toggle } = useFavorites()
  const fav = isFav('articles', article.id)
  const cat = getCategory(article.category)

  return (
    <article className="card card-hover group overflow-hidden flex flex-col">
      <Link to={`/blog/${article.id}`} className="block">
        <div className={`${compact ? 'h-32' : 'h-44'} bg-gradient-to-br ${article.cover} relative flex items-end`}>
          <div className="absolute inset-0 grid place-items-center text-5xl opacity-90">
            <span>{article.emoji}</span>
          </div>
          {article.trending && (
            <span className="absolute top-3 left-3 chip bg-white/90 text-rose-600">
              <Flame className="w-3 h-3" /> Trending
            </span>
          )}
        </div>
      </Link>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          {cat && (
            <span className={`chip bg-gradient-to-r ${cat.color} text-white`}>
              {cat.name}
            </span>
          )}
          <span className="chip bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <Clock className="w-3 h-3" /> {article.readTime} min
          </span>
        </div>

        <Link to={`/blog/${article.id}`}>
          <h3 className="font-display font-bold text-lg leading-snug text-slate-900 dark:text-white group-hover:text-brand-600">
            {article.title}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
          {article.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            By <span className="font-medium text-slate-700 dark:text-slate-200">{article.author}</span>
          </span>
          <button
            onClick={() => toggle('articles', article.id)}
            aria-label="Save article"
            className={`w-8 h-8 rounded-full grid place-items-center transition
              ${fav ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'}`}
          >
            <Heart className="w-4 h-4" fill={fav ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </article>
  )
}
