import { ExternalLink, Heart, Star, Flame } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { getCategory } from '../data/categories.js'

export default function ToolCard({ tool }) {
  const { isFav, toggle } = useFavorites()
  const fav = isFav('tools', tool.id)
  const cat = getCategory(tool.category)
  // Prefer affiliate URL if provided — plug in your link in src/data/tools.js
  const visitUrl = tool.affiliateUrl || tool.url

  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      {/* Header with color block */}
      <div className={`h-24 bg-gradient-to-br ${tool.color} relative`}>
        <div className="absolute inset-0 grid place-items-center text-4xl">
          <span className="drop-shadow-sm">{tool.emoji}</span>
        </div>
        {tool.trending && (
          <span className="absolute top-3 left-3 chip bg-white/90 text-rose-600">
            <Flame className="w-3 h-3" /> Trending
          </span>
        )}
        <button
          onClick={() => toggle('tools', tool.id)}
          aria-label="Save"
          className={`absolute top-3 right-3 w-8 h-8 rounded-full grid place-items-center transition
            ${fav ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-600 hover:bg-white'}`}
        >
          <Heart className="w-4 h-4" fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          {cat && (
            <span className={`chip bg-gradient-to-r ${cat.color} text-white`}>
              {cat.name}
            </span>
          )}
          <span className="chip bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {tool.price}
          </span>
        </div>
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
          {tool.name}
        </h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
          {tool.tagline}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-500 text-sm">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-semibold">{tool.rating}</span>
          </div>
          <a
            href={visitUrl}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="btn-primary !py-2 !px-4 !text-xs"
          >
            Visit tool <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  )
}
