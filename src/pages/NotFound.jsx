import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import SEO from '../components/SEO.jsx'

export default function NotFound() {
  return (
    <>
      <SEO title="404 — Not Found" description="Oops — that page doesn't exist." />
      <div className="container-site py-24 text-center">
        <div className="text-7xl">🤖</div>
        <h1 className="mt-4 font-display font-extrabold text-4xl text-slate-900 dark:text-white">404 — nothing here</h1>
        <p className="mt-3 text-slate-500 max-w-md mx-auto">
          The page you&rsquo;re looking for packed up and left. Let&rsquo;s get you back on track.
        </p>
        <Link to="/" className="btn-primary mt-6">
          <Home className="w-4 h-4" /> Back home
        </Link>
      </div>
    </>
  )
}
