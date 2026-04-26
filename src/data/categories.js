// Categories used across the Tools directory and Blog page filters.
// To add a category: add an entry here — all filters update automatically.
export const categories = [
  { slug: 'homework',    name: 'Homework Help',       color: 'from-indigo-500 to-violet-600',  icon: 'BookOpen',   emoji: '🎓' },
  { slug: 'writing',     name: 'Writing Tools',       color: 'from-rose-500 to-pink-500',      icon: 'PenLine',    emoji: '✍️' },
  { slug: 'research',    name: 'Research Tools',      color: 'from-teal-500 to-cyan-500',      icon: 'Search',     emoji: '🔍' },
  { slug: 'productivity',name: 'Productivity',        color: 'from-fuchsia-500 to-purple-500', icon: 'Zap',        emoji: '⚡' },
  { slug: 'image',       name: 'Image Tools',         color: 'from-amber-500 to-orange-500',   icon: 'Image',      emoji: '🎨' },
  { slug: 'video',       name: 'Video Tools',         color: 'from-red-500 to-rose-500',       icon: 'Video',      emoji: '🎬' },
  { slug: 'language',    name: 'Language Learning',   color: 'from-sky-500 to-blue-500',       icon: 'Languages',  emoji: '🌍' },
  { slug: 'note-taking', name: 'Note Taking',         color: 'from-emerald-500 to-teal-500',   icon: 'StickyNote', emoji: '📚' },
  { slug: 'coding',      name: 'Coding Tools',        color: 'from-slate-600 to-slate-800',    icon: 'Code2',      emoji: '💻' },
  // Legacy slugs kept so old articles still match the filter
  { slug: 'ai',          name: 'AI General',          color: 'from-violet-500 to-indigo-500',  icon: 'Sparkles',   emoji: '🤖' },
]

export const getCategory = (slug) => categories.find((c) => c.slug === slug)
