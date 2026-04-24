import { useState } from 'react'
import { Wand2, Tag, BookOpen, DollarSign } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import AdSlot from '../components/AdSlot.jsx'
import PromptGenerator from '../tools/PromptGenerator.jsx'
import BusinessNameGenerator from '../tools/BusinessNameGenerator.jsx'
import StudyPlanner from '../tools/StudyPlanner.jsx'
import IncomeCalculator from '../tools/IncomeCalculator.jsx'

const TABS = [
  { id: 'prompt',   label: 'Prompt Generator',         icon: Wand2,      component: PromptGenerator },
  { id: 'name',     label: 'Business Name Generator',  icon: Tag,        component: BusinessNameGenerator },
  { id: 'study',    label: 'Study Planner',            icon: BookOpen,   component: StudyPlanner },
  { id: 'income',   label: 'Income Calculator',        icon: DollarSign, component: IncomeCalculator },
]

export default function FreeTools() {
  const [tab, setTab] = useState(TABS[0].id)
  const Active = TABS.find((t) => t.id === tab).component

  return (
    <>
      <SEO
        title="Free Mini Tools — Prompt Generator, Business Names & More"
        description="Four free tools: AI prompt generator, business name generator, study planner, and online income calculator. No signup required."
      />

      <section className="hero-mesh">
        <div className="container-site py-14 text-center">
          <span className="chip bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 text-brand-700 dark:text-brand-300">100% free · no signup</span>
          <h1 className="mt-4 font-display font-extrabold text-3xl md:text-5xl tracking-tight text-slate-900 dark:text-white">
            Free <span className="gradient-text">mini tools</span>
          </h1>
          <p className="mt-3 max-w-xl mx-auto text-slate-600 dark:text-slate-300">
            Small utilities that solve real problems in seconds. Bookmark this page.
          </p>
        </div>
      </section>

      <div className="container-site">
        <AdSlot variant="banner" />
      </div>

      <section className="container-site mt-8">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`btn ${tab === t.id ? 'bg-brand-600 text-white' : 'btn-secondary'} text-sm`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8 card p-6 md:p-8">
          <Active />
        </div>
      </section>

      <div className="container-site mt-12">
        <AdSlot variant="bottom" />
      </div>
    </>
  )
}
