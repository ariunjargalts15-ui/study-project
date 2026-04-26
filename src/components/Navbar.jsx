import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Moon, Sun, Search, GraduationCap } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

const navItems = [
  { to: '/',           label: 'Home' },
  { to: '/tools',      label: 'AI Tools' },
  { to: '/blog',       label: 'Guides' },
  { to: '/free-tools', label: 'Free Tools' },
  { to: '/news',       label: 'News' },
  { to: '/about',      label: 'About' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [q, setQ]             = useState('')
  const { theme, toggle }     = useTheme()
  const nav                   = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onSearch = (e) => {
    e.preventDefault()
    if (!q.trim()) return
    nav(`/tools?q=${encodeURIComponent(q.trim())}`)
    setOpen(false)
    setQ('')
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300
        ${scrolled
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg shadow-sm'
          : 'bg-white/60 dark:bg-slate-950/60 backdrop-blur-md'}`}
    >
      <div className="container-site flex items-center gap-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-lg flex-shrink-0">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 grid place-items-center text-white shadow-soft">
            <GraduationCap className="w-4 h-4" />
          </span>
          <span className="gradient-text hidden sm:block">StudyAI Tools</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-1 ml-4">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) =>
                `px-3 py-2 rounded-full text-sm font-medium transition-colors
                 ${isActive
                    ? 'text-brand-700 bg-brand-50 dark:text-brand-300 dark:bg-slate-800'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
                 }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        {/* Search (desktop) */}
        <form onSubmit={onSearch} className="hidden md:flex ml-auto items-center">
          <label className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="search"
              placeholder="Find AI tools for students…"
              className="pl-9 pr-4 py-2 rounded-full text-sm w-52 lg:w-64
                         bg-slate-100 dark:bg-slate-800 ring-1 ring-transparent
                         focus:bg-white dark:focus:bg-slate-900 focus:ring-brand-400 outline-none transition"
            />
          </label>
        </form>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          aria-label="Toggle dark mode"
          className="ml-auto md:ml-2 w-10 h-10 rounded-full grid place-items-center
                     text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          className="xl:hidden w-10 h-10 rounded-full grid place-items-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="container-site py-4 flex flex-col gap-1">
            <form onSubmit={onSearch} className="relative mb-2">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                type="search"
                placeholder="Find AI tools…"
                className="w-full pl-9 pr-4 py-2.5 rounded-full text-sm bg-slate-100 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-brand-400"
              />
            </form>
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium
                   ${isActive ? 'bg-brand-50 dark:bg-slate-800 text-brand-700 dark:text-brand-300' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
