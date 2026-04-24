// Categories used across Tools and Blog pages.
// To add a new category, just add an entry here — all filters update automatically.
export const categories = [
  { slug: 'ai',               name: 'AI',                color: 'from-indigo-500 to-violet-500', icon: 'Sparkles' },
  { slug: 'business',         name: 'Business Ideas',    color: 'from-emerald-500 to-teal-500',  icon: 'Briefcase' },
  { slug: 'online-income',    name: 'Online Income',     color: 'from-amber-500 to-orange-500',  icon: 'DollarSign' },
  { slug: 'app-ideas',        name: 'App Ideas',         color: 'from-pink-500 to-rose-500',     icon: 'Smartphone' },
  { slug: 'language',         name: 'Language Learning', color: 'from-sky-500 to-blue-500',      icon: 'Languages' },
  { slug: 'productivity',     name: 'Productivity',      color: 'from-fuchsia-500 to-purple-500',icon: 'Zap' },
  { slug: 'writing',          name: 'Writing',           color: 'from-red-500 to-pink-500',      icon: 'PenLine' },
  { slug: 'design',           name: 'Design',            color: 'from-cyan-500 to-blue-500',     icon: 'Palette' },
]

export const getCategory = (slug) => categories.find((c) => c.slug === slug)
