import { Link } from 'react-router-dom'
import { Sparkles, Heart, BookOpen, Users } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import Newsletter from '../components/Newsletter.jsx'

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="AI Tools Hub curates the best AI tools and teaches real-world ways to learn, build and earn with AI."
      />
      <section className="hero-mesh">
        <div className="container-site py-14 text-center max-w-3xl mx-auto">
          <span className="chip bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 text-brand-700 dark:text-brand-300">
            <Sparkles className="w-3.5 h-3.5" /> Our story
          </span>
          <h1 className="mt-4 font-display font-extrabold text-3xl md:text-5xl tracking-tight text-slate-900 dark:text-white">
            We help people use AI to <span className="gradient-text">build & earn</span>.
          </h1>
          <p className="mt-5 text-slate-600 dark:text-slate-300 text-lg">
            AI Tools Hub is a curated directory, short-form blog, and free-tools playground.
            No hype, no fluff — just the stuff that helps real people get real work done.
          </p>
        </div>
      </section>

      <section className="container-site mt-14 grid md:grid-cols-3 gap-5">
        {[
          { Icon: BookOpen, t: 'Honest guides',  d: 'Short, practical tutorials written by people who\'ve shipped real projects.' },
          { Icon: Sparkles, t: 'Curated tools',  d: 'Every listing is hand-picked and reviewed before it goes live.' },
          { Icon: Users,    t: 'Built for you',  d: 'Students, founders, creators, side-hustlers — if you like building, you belong here.' },
        ].map((x, i) => (
          <div key={i} className="card p-6">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 grid place-items-center">
              <x.Icon className="w-5 h-5" />
            </div>
            <h3 className="mt-4 font-display font-bold text-lg text-slate-900 dark:text-white">{x.t}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{x.d}</p>
          </div>
        ))}
      </section>

      <section className="container-site mt-16">
        <div className="card p-8 md:p-12">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">Our mission</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
            The AI wave is loud. It&rsquo;s easy to get lost in thinkpieces and never actually try anything.
            We believe the best way to learn AI is to use it every day on small, real problems.
            So we build the directory, the guides and the free tools — and we try to make everything fast,
            clean, and free.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/tools" className="btn-primary">Explore tools</Link>
            <Link to="/contact" className="btn-secondary">Say hi</Link>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
