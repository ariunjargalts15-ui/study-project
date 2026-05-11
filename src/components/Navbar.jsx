import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Search, Zap, LogOut, LogIn } from 'lucide-react'
import { usePro } from '../context/ProContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const navItems = [
  { to: '/free-tools', label: 'Free Tools' },
  { to: '/tools',      label: 'AI Directory' },
  { to: '/blog',       label: 'Guides' },
]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [q, setQ]               = useState('')
  const { isPro }               = usePro()
  const { user, signIn, logOut } = useAuth()
  const nav                     = useNavigate()
  const location                = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
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
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        transition: 'background 0.4s ease, box-shadow 0.4s ease',
        background: scrolled ? 'rgba(0, 26, 46, 0.85)' : 'transparent',
        WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(130%)' : 'none',
        backdropFilter: scrolled ? 'blur(18px) saturate(130%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="container-site flex items-center gap-4 py-5">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <span className="font-serif text-2xl text-white" style={{ letterSpacing: '-0.02em', lineHeight: 1 }}>
            StudyAI<sup style={{ fontSize: 10, fontFamily: 'Inter, sans-serif', opacity: 0.7, verticalAlign: 'super', marginLeft: 2 }}>®</sup>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9 ml-6">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) =>
                `text-sm transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/50 hover:text-white'}`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <button
            onClick={() => scrollToSection('pricing')}
            className="text-sm text-white/50 hover:text-white transition-colors duration-200"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-sm text-white/50 hover:text-white transition-colors duration-200"
          >
            FAQ
          </button>
        </nav>

        {/* Search */}
        <form onSubmit={onSearch} className="hidden md:flex ml-auto items-center">
          <label className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="search"
              placeholder="Search tools…"
              className="pl-9 pr-4 py-2 rounded-full text-sm w-44 lg:w-52 text-white/80 placeholder-white/25 outline-none transition"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </label>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-3 ml-2 md:ml-0">

          {/* Auth */}
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <img
                src={user.photoURL}
                alt={user.displayName}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full ring-1 ring-white/20"
              />
              <button
                onClick={logOut}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={signIn}
              className="hidden sm:flex items-center gap-1.5 text-sm text-white/40 hover:text-white/80 transition"
            >
              <LogIn className="w-3.5 h-3.5" /> Login
            </button>
          )}

          {/* Upgrade / Pro badge */}
          {isPro ? (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-amber-400 text-xs font-bold"
              style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.25)' }}
            >
              <Zap className="w-3 h-3 fill-current" /> PRO
            </div>
          ) : (
            <button
              onClick={() => scrollToSection('pricing')}
              className="liquid-glass hidden sm:flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium text-white"
            >
              Explore Pro
            </button>
          )}

          {/* Mobile menu */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="lg:hidden text-white/50 hover:text-white transition"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(0,26,46,0.95)',
            WebkitBackdropFilter: 'blur(20px)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="container-site py-5 flex flex-col gap-1">
            <form onSubmit={onSearch} className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                type="search"
                placeholder="Search tools…"
                className="w-full pl-9 pr-4 py-2.5 rounded-full text-sm text-white/80 placeholder-white/25 outline-none"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </form>

            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm transition
                   ${isActive ? 'text-white bg-white/8' : 'text-white/50 hover:text-white hover:bg-white/5'}`
                }
              >
                {n.label}
              </NavLink>
            ))}

            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left px-4 py-3 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition"
            >
              Pricing
            </button>

            <div className="mt-3 pt-3 flex gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {user ? (
                <button
                  onClick={logOut}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-white/50 hover:text-white transition"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign out ({user.displayName?.split(' ')[0]})
                </button>
              ) : (
                <button
                  onClick={signIn}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-white/50 hover:text-white transition"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <LogIn className="w-3.5 h-3.5" /> Login with Google
                </button>
              )}
              {!isPro && (
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="liquid-glass flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white"
                >
                  Explore Pro
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
