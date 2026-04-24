import { useState } from 'react'
import { Calendar, Download } from 'lucide-react'

export default function StudyPlanner() {
  const [subject, setSubject] = useState('')
  const [days, setDays] = useState(7)
  const [hours, setHours] = useState(2)
  const [plan, setPlan] = useState(null)

  const generate = () => {
    if (!subject.trim()) return
    const totalHours = days * hours

    // Simple phase allocation: 30% foundation, 40% practice, 20% advanced, 10% review
    const phases = [
      { name: 'Foundation', pct: 0.30, focus: 'Learn core concepts and vocabulary' },
      { name: 'Practice',   pct: 0.40, focus: 'Active practice, exercises, flashcards' },
      { name: 'Advanced',   pct: 0.20, focus: 'Harder problems, real-world application' },
      { name: 'Review',     pct: 0.10, focus: 'Recap, quiz yourself, teach it back' },
    ]

    const schedule = []
    let dayCounter = 1
    let hoursLeft = totalHours
    for (const p of phases) {
      const phaseHours = Math.max(1, Math.round(totalHours * p.pct))
      const phaseDays = Math.max(1, Math.round(phaseHours / hours))
      schedule.push({ ...p, days: phaseDays, hours: phaseHours, start: dayCounter })
      dayCounter += phaseDays
      hoursLeft -= phaseHours
    }

    setPlan({ subject, days, hours, totalHours, schedule })
  }

  const download = () => {
    if (!plan) return
    const lines = [
      `Study plan: ${plan.subject}`,
      `Duration: ${plan.days} days · ${plan.hours} h/day · ${plan.totalHours} h total`,
      '',
      ...plan.schedule.map((p) => `[${p.name}] Days ${p.start}–${p.start + p.days - 1} (${p.hours}h): ${p.focus}`),
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `study-plan-${plan.subject.toLowerCase().replace(/\s+/g, '-')}.txt`
    a.click()
  }

  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-3 gap-3">
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject (e.g. Spanish, SAT Math, React)"
          className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-brand-400"
        />
        <NumField label="Days" value={days} onChange={setDays} min={3} max={90} />
        <NumField label="Hours / day" value={hours} onChange={setHours} min={1} max={10} />
      </div>
      <button onClick={generate} className="btn-primary">
        <Calendar className="w-4 h-4" /> Generate plan
      </button>

      {plan && (
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">{plan.subject} — {plan.days} day plan</h3>
              <p className="text-sm text-slate-500">{plan.hours} h/day · {plan.totalHours} h total</p>
            </div>
            <button onClick={download} className="btn-secondary text-sm">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
          <ol className="mt-4 space-y-3">
            {plan.schedule.map((p, i) => (
              <li key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                <div className="flex items-center gap-2">
                  <span className="chip bg-brand-600 text-white">Phase {i + 1}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{p.name}</span>
                  <span className="ml-auto text-sm text-slate-500">Days {p.start}–{p.start + p.days - 1} · {p.hours}h</span>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{p.focus}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

function NumField({ label, value, onChange, min, max }) {
  return (
    <label className="block">
      <span className="text-xs text-slate-500">{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-brand-400"
      />
    </label>
  )
}
