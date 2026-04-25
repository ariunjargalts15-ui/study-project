import { Link } from 'react-router-dom'
import { Sparkles, Twitter, Github, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="container-site py-14 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-lg">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 grid place-items-center text-white shadow-soft">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="gradient-text">AI Tools Hub</span>
          </Link>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
            Your daily stop for the best AI tools, practical guides, news, and free utilities
            that help you learn, build, and earn online.
          </p>
          <div className="mt-5 flex gap-2">
            {[Twitter, Github, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="w-9 h-9 rounded-full grid place-items-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-100 hover:text-brand-700 transition">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link to="/tools" className="hover:text-brand-600">AI Tools</Link></li>
            <li><Link to="/blog" className="hover:text-brand-600">Blog</Link></li>
            <li><Link to="/free-tools" className="hover:text-brand-600">Free Tools</Link></li>
            <li><Link to="/news" className="hover:text-brand-600">AI News</Link></li>
            <li><Link to="/about" className="hover:text-brand-600">About</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white">Legal</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link to="/privacy" className="hover:text-brand-600">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-brand-600">Terms of Service</Link></li>
            <li><Link to="/contact" className="hover:text-brand-600">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="container-site py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <p>© {year} AI Tools Hub. All rights reserved.</p>
          <p>Built with ♥ — made for curious builders.</p>
        </div>
      </div>
    </footer>
  )
}
