import { categories } from '../data/categories.js'

/**
 * Shared category filter chips. Pass `active` (slug or 'all') and onChange handler.
 * Used on both Tools and Blog pages.
 */
export default function CategoryFilter({ active, onChange, size = 'md' }) {
  const sizeCls = size === 'sm'
    ? 'text-xs px-3 py-1.5'
    : 'text-sm px-4 py-2'

  const btn = (isActive) =>
    `rounded-full font-medium transition-all whitespace-nowrap ${sizeCls}
     ${isActive
        ? 'bg-brand-600 text-white shadow-soft'
        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 ring-1 ring-slate-200 dark:ring-slate-700 hover:ring-brand-300 hover:text-brand-700'}`

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
      <button onClick={() => onChange('all')} className={`${btn(active === 'all')} snap-start`}>
        All
      </button>
      {categories.map((c) => (
        <button
          key={c.slug}
          onClick={() => onChange(c.slug)}
          className={`${btn(active === c.slug)} snap-start`}
        >
          {c.name}
        </button>
      ))}
    </div>
  )
}
