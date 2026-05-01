import { Link } from 'react-router-dom'
import { Sparkles, Twitter, Github, Instagram, Youtube, Zap } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 border-t border-white/5 bg-slate-950">
      <div className="container-site py-16 grid gap-12 md:grid-cols-4">

        {/* Brand */}
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 group w-max">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-violet-500 grid place-items-center text-white shadow-lg shadow-brand-900/50">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="font-display font-extrabold text-lg gradient-text">StudyAI Tools</span>
          </Link>
          <p className="mt-4 text-sm text-slate-500 max-w-sm leading-relaxed">
            A premium AI utility platform for students, business owners, creators, and website builders.
            Free and pro tools to help you work smarter.
          </p>
          <div className="mt-5 flex gap-2">
            {[Twitter, Github, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="w-9 h-9 rounded-xl grid place-items-center bg-white/5 border border-white/10 text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/10 transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Pro CTA */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-900/50 to-violet-900/50 border border-brand-700/30 text-sm">
            <Zap className="w-4 h-4 text-brand-400" />
            <span className="text-slate-300">Unlock all premium tools for </span>
            <span className="font-bold text-white">$19.99</span>
          </div>
        </div>

        {/* Tools */}
        <div>
          <h4 className="font-semibold text-white text-sm mb-4">Tools</h4>
          <ul className="space-y-2.5 text-sm text-slate-500">
            <li><Link to="/free-tools"              className="hover:text-white transition">Free Tools Hub</Link></li>
            <li><Link to="/free-tools#prompt"       className="hover:text-white transition">Prompt Generator</Link></li>
            <li><Link to="/free-tools#study"        className="hover:text-white transition">Study Planner</Link></li>
            <li><Link to="/free-tools#income"       className="hover:text-white transition">Income Calculator</Link></li>
            <li><Link to="/tools"                   className="hover:text-white transition">AI Tools Directory</Link></li>
            <li><Link to="/blog"                    className="hover:text-white transition">Guides & Articles</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-white text-sm mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm text-slate-500">
            <li><Link to="/about"      className="hover:text-white transition">About</Link></li>
            <li><Link to="/contact"    className="hover:text-white transition">Contact</Link></li>
            <li><Link to="/privacy"    className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/terms"      className="hover:text-white transition">Terms of Service</Link></li>
            <li><Link to="/disclaimer" className="hover:text-white transition">Disclaimer</Link></li>
            <li><Link to="/news"       className="hover:text-white transition">AI News</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-site py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-600">
          <p>
            &copy; {year}{' '}
            <a href="https://studyaitools.biz" className="hover:text-slate-400 transition">StudyAI Tools</a>.
            All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy"    className="hover:text-slate-400 transition">Privacy</Link>
            <Link to="/terms"      className="hover:text-slate-400 transition">Terms</Link>
            <Link to="/disclaimer" className="hover:text-slate-400 transition">Disclaimer</Link>
            <Link to="/contact"    className="hover:text-slate-400 transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
