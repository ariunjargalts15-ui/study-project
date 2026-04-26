import { Link } from 'react-router-dom'
import { Sparkles, BookOpen, Users, Target, GraduationCap, Heart } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import Newsletter from '../components/Newsletter.jsx'

export default function About() {
  return (
    <>
      <SEO
        title="About Us — StudyAI Tools"
        description="StudyAI Tools is the best free AI tools hub for students, learners, and productivity users. Discover our mission, values, and what makes us different."
        url="/about"
      />

      {/* Hero */}
      <section className="hero-mesh">
        <div className="container-site py-14 text-center max-w-3xl mx-auto">
          <span className="chip bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 text-brand-700 dark:text-brand-300">
            <Sparkles className="w-3.5 h-3.5" /> About StudyAI Tools
          </span>
          <h1 className="mt-4 font-display font-extrabold text-3xl md:text-5xl tracking-tight text-slate-900 dark:text-white">
            We help students learn smarter with <span className="gradient-text">AI tools</span>.
          </h1>
          <p className="mt-5 text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
            StudyAI Tools is a curated directory of the best AI tools for studying, homework,
            writing, language learning, and productivity — tested by real students, explained
            in plain language, and updated weekly.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="container-site mt-14 grid md:grid-cols-3 gap-5">
        {[
          {
            Icon: BookOpen,
            color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
            t: 'Student-first curation',
            d: 'Every tool is evaluated for how useful it actually is to students and learners — not just by feature lists.',
          },
          {
            Icon: Target,
            color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
            t: 'Honest reviews',
            d: 'We include pros, cons, and real pricing. No vague praise, no hidden upsells. If a free tool does the job, we say so.',
          },
          {
            Icon: GraduationCap,
            color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
            t: 'Education first',
            d: 'We promote responsible AI use. Our guides teach students to use AI as a learning tool — not a shortcut that replaces understanding.',
          },
        ].map((x, i) => (
          <div key={i} className="card p-6">
            <div className={`w-10 h-10 rounded-xl grid place-items-center ${x.color}`}>
              <x.Icon className="w-5 h-5" />
            </div>
            <h3 className="mt-4 font-display font-bold text-lg text-slate-900 dark:text-white">{x.t}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{x.d}</p>
          </div>
        ))}
      </section>

      {/* Mission */}
      <section className="container-site mt-16">
        <div className="card p-8 md:p-12">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">
            Our mission
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
            AI has changed how students study, write, and learn — forever. But finding the right tool,
            understanding its limitations, and using it responsibly is harder than it looks.
            StudyAI Tools exists to make that discovery simple.
          </p>
          <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
            We review and curate AI tools specifically for students: from free homework assistants to
            professional-grade research tools, coding aids to language learning apps. We explain
            what each tool is genuinely best for, what it costs (and what's really free), and when
            to use alternatives.
          </p>
          <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
            Our goal: every student who visits StudyAI Tools leaves knowing exactly which AI tools
            to use for their situation — and how to use them responsibly.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/tools" className="btn-primary">Explore AI tools</Link>
            <Link to="/blog" className="btn-secondary">Read guides</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-site mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { n: '35+',   l: 'AI tools reviewed' },
          { n: '9',     l: 'Tool categories' },
          { n: '14+',   l: 'Study guides' },
          { n: '100%',  l: 'Free to use' },
        ].map((s, i) => (
          <div key={i} className="card p-6 text-center">
            <div className="font-display font-extrabold text-3xl gradient-text">{s.n}</div>
            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.l}</div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="container-site mt-14">
        <div className="card p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gradient-to-br from-brand-500/20 to-accent-500/20 blur-3xl" />
          <div className="relative">
            <Heart className="w-8 h-8 text-rose-500 mx-auto mb-3" />
            <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              Built for students, by people who care about learning
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
              Have a tool to suggest? Found an error? Want to collaborate?
              We'd love to hear from you.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 justify-center">
              <Link to="/contact" className="btn-primary">
                <Users className="w-4 h-4" /> Get in touch
              </Link>
              <Link to="/tools" className="btn-secondary">
                Explore tools →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
