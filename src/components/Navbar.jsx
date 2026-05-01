import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Moon, Sun, Search, Zap, Sparkles } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'
import { usePro } from '../context/ProContext.jsx'

const navItems = [
  { to: '/free-tools', label: 'Tools' },
  { to: '/tools',      label: 'AI Directory' },
  { to: '/blog',       label: 'Guides' },
]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [q, setQ]               = useState('')
  const { theme, toggle }       = useTheme()
  const { isPro }               = usePro()
  const nav                     = useNavigate()
  const location                = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  const onSearch = (e) => {
    e.preventDefault()
    if (!q.trim()) return
    nav(`/tools?q=${encodeURIComponent(q.trim())}`)
    setQ('')
  }

  const scrollToSection = (id) => {
    setOpen(false)
    if (location.pathname !== '/') {
      nav('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 150)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300
        ${scrolled
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-slate-950/70 backdrop-blur-lg border-b border-transparent'}`}
    >
      <div className="container-site flex items-center gap-3 py-3.5">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-violet-500 grid place-items-center text-white shadow-lg shadow-brand-900/50 group-hover:shadow-brand-700/50 transition-shadow">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="font-display font-extrabold text-lg gradient-text hidden sm:block">
            StudyAI Tools
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5 ml-3">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-xl text-sm font-medium transition-colors
                 ${isActive
                    ? 'text-white bg-white/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                 }`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <button
            onClick={() => scrollToSection('pricing')}
            className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            FAQ
          </button>
        </nav>

        {/* Search (desktop) */}
        <form onSubmit={onSearch} className="hidden md:flex ml-auto items-center">
          <label className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="search"
              placeholder="Search tools…"
              className="pl-9 pr-4 py-2 rounded-xl text-sm w-44 lg:w-52
                         bg-white/5 border border-white/10 text-slate-300 placeholder-slate-500
                         focus:bg-white/8 focus:border-brand-500/50 outline-none transition"
            />
          </label>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-2 md:ml-0">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-xl grid place-items-center text-slate-400 hover:text-white hover:bg-white/5 transition"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Login (placeholder) */}
          <button className="hidden sm:block px-4 py-2 rounded-xl text-sm font-medium text-slate-400 border border-white/10 hover:border-white/20 hover:text-white transition">
            Login
          </button>

          {/* Upgrade / Pro badge */}
          {isPro ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Zap className="w-3.5 h-3.5 fill-current" /> PRO
            </div>
          ) : (
            <button
              onClick={() => scrollToSection('pricing')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 transition shadow-lg shadow-brand-900/30 hover:shadow-brand-700/40"
            >
              <Zap className="w-3.5 h-3.5" /> Upgrade Pro
            </button>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="lg:hidden w-9 h-9 rounded-xl grid place-items-center text-slate-400 hover:text-white hover:bg-white/5 transition"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-xl">
          <div className="container-site py-4 flex flex-col gap-1">
            <form onSubmit={onSearch} className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                type="search"
                placeholder="Search tools…"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 text-slate-300 placeholder-slate-500 outline-none focus:border-brand-500/50"
              />
            </form>

            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium
                   ${isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`
                }
              >
                {n.label}
              </NavLink>
            ))}

            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition"
            >
              FAQ
            </button>

            <div className="mt-2 pt-3 border-t border-white/5 flex gap-2">
              <button className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-400 border border-white/10 hover:border-white/20 hover:text-white transition">
                Login
              </button>
              {!isPro && (
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-violet-600"
                >
                  <Zap className="w-3.5 h-3.5" /> Upgrade Pro
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
