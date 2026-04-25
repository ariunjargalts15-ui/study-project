import { Link } from 'react-router-dom'
import { GraduationCap, Twitter, Github, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="container-site py-14 grid gap-10 md:grid-cols-4">

        {/* Brand */}
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-lg">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 grid place-items-center text-white shadow-soft">
              <GraduationCap className="w-4 h-4" />
            </span>
            <span className="gradient-text">StudyAI Tools</span>
          </Link>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
            The best free AI tools hub for students, learners, and productivity users.
            Curated, honest reviews updated weekly at{' '}
            <a href="https://studyaitools.biz" className="hover:text-brand-600">studyaitools.biz</a>.
          </p>
          <div className="mt-5 flex gap-2">
            {[Twitter, Github, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="w-9 h-9 rounded-full grid place-items-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-100 hover:text-brand-700 transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link to="/tools"              className="hover:text-brand-600">AI Tools Directory</Link></li>
            <li><Link to="/tools?cat=homework"  className="hover:text-brand-600">Homework Help AI</Link></li>
            <li><Link to="/tools?cat=writing"   className="hover:text-brand-600">Writing Tools</Link></li>
            <li><Link to="/tools?cat=language"  className="hover:text-brand-600">Language Learning</Link></li>
            <li><Link to="/blog"               className="hover:text-brand-600">Guides</Link></li>
            <li><Link to="/free-tools"          className="hover:text-brand-600">Free Tools</Link></li>
            <li><Link to="/news"               className="hover:text-brand-600">AI News</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link to="/about"      className="hover:text-brand-600">About Us</Link></li>
            <li><Link to="/contact"    className="hover:text-brand-600">Contact</Link></li>
            <li><Link to="/privacy"    className="hover:text-brand-600">Privacy Policy</Link></li>
            <li><Link to="/terms"      className="hover:text-brand-600">Terms of Service</Link></li>
            <li><Link to="/disclaimer" className="hover:text-brand-600">Disclaimer</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="container-site py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <p>
            &copy; {year}{' '}
            <a href="https://studyaitools.biz" className="hover:text-brand-600">StudyAI Tools</a>.
            All rights reserved.
          </p>
          <p className="flex flex-wrap gap-3">
            <Link to="/privacy"    className="hover:text-brand-600">Privacy</Link>
            <Link to="/terms"      className="hover:text-brand-600">Terms</Link>
            <Link to="/disclaimer" className="hover:text-brand-600">Disclaimer</Link>
            <Link to="/contact"    className="hover:text-brand-600">Contact</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
