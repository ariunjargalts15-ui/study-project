import { useState } from 'react'
import { Wand2, Tag, BookOpen, DollarSign, FileText, Timer, Shield, Palette } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import AdSlot from '../components/AdSlot.jsx'
import PromptGenerator from '../tools/PromptGenerator.jsx'
import BusinessNameGenerator from '../tools/BusinessNameGenerator.jsx'
import StudyPlanner from '../tools/StudyPlanner.jsx'
import IncomeCalculator from '../tools/IncomeCalculator.jsx'
import WordCounter from '../tools/WordCounter.jsx'
import PomodoroTimer from '../tools/PomodoroTimer.jsx'
import PasswordChecker from '../tools/PasswordChecker.jsx'
import ColorPalette from '../tools/ColorPalette.jsx'

const TABS = [
  { id: 'prompt',   label: 'Prompt Generator',        icon: Wand2,     component: PromptGenerator },
  { id: 'name',     label: 'Business Name',           icon: Tag,       component: BusinessNameGenerator },
  { id: 'study',    label: 'Study Planner',           icon: BookOpen,  component: StudyPlanner },
  { id: 'income',   label: 'Income Calculator',       icon: DollarSign,component: IncomeCalculator },
  { id: 'word',     label: 'Word Counter',            icon: FileText,  component: null },
  { id: 'pomodoro', label: 'Pomodoro Timer',          icon: Timer,     component: PomodoroTimer },
  { id: 'password', label: 'Password Checker',        icon: Shield,    component: PasswordChecker },
  { id: 'color',    label: 'Color Palette',           icon: Palette,   component: ColorPalette },
]

export default function FreeTools() {
  const [tab, setTab] = useState(TABS[0].id)
  const [wordText, setWordText] = useState('')
  const current = TABS.find((t) => t.id === tab)

  const renderActive = () => {
    if (tab === 'word') return <WordCounter text={wordText} onChange={setWordText} />
    const Active = current.component
    return <Active />
  }

  return (
    <>
      <SEO
        title="Free Mini Tools — Prompt Generator, Word Counter, Pomodoro Timer & More"
        description="Eight free browser tools: AI prompt generator, business name generator, word counter, Pomodoro timer, password checker, color palette generator, study planner and income calculator. No signup required."
      />

      <section className="hero-mesh">
        <div className="container-site py-14 text-center">
          <span className="chip bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 text-brand-700 dark:text-brand-300">8 free tools · no signup</span>
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
          {renderActive()}
        </div>
      </section>

      <div className="container-site mt-12">
        <AdSlot variant="bottom" />
      </div>
    </>
  )
}
