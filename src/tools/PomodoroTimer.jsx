import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react'

const MODES = [
  { id: 'work',       label: 'Focus',       minutes: 25, color: 'text-rose-500',  bg: 'bg-rose-500',  icon: Brain },
  { id: 'short',      label: 'Short break', minutes: 5,  color: 'text-teal-500',  bg: 'bg-teal-500',  icon: Coffee },
  { id: 'long',       label: 'Long break',  minutes: 15, color: 'text-blue-500',  bg: 'bg-blue-500',  icon: Coffee },
]

function pad(n) { return String(n).padStart(2, '0') }

export default function PomodoroTimer() {
  const [modeId, setModeId]     = useState('work')
  const [seconds, setSeconds]   = useState(25 * 60)
  const [running, setRunning]   = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef(null)

  const mode = MODES.find((m) => m.id === modeId)

  const reset = useCallback((m = mode) => {
    clearInterval(intervalRef.current)
    setRunning(false)
    setSeconds(m.minutes * 60)
  }, [mode])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            if (modeId === 'work') setSessions((n) => n + 1)
            return 0
          }
          return s - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, modeId])

  const switchMode = (m) => {
    setModeId(m.id)
    reset(m)
    setSeconds(m.minutes * 60)
    setRunning(false)
  }

  const total = mode.minutes * 60
  const progress = ((total - seconds) / total) * 100
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  const radius = 80
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Mode tabs */}
      <div className="flex gap-2 flex-wrap justify-center">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => switchMode(m)}
            className={`btn text-sm ${modeId === m.id ? `${m.bg} text-white` : 'btn-secondary'}`}
          >
            <m.icon className="w-4 h-4" /> {m.label}
          </button>
        ))}
      </div>

      {/* Circle timer */}
      <div className="relative">
        <svg width="200" height="200" className="-rotate-90">
          <circle
            cx="100" cy="100" r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-200 dark:text-slate-700"
          />
          <circle
            cx="100" cy="100" r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className={mode.color}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-bold text-4xl text-slate-900 dark:text-white tabular-nums">
            {pad(mins)}:{pad(secs)}
          </span>
          <span className={`text-sm font-medium ${mode.color}`}>{mode.label}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          className="btn-primary px-8"
        >
          {running ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> {seconds === mode.minutes * 60 ? 'Start' : 'Resume'}</>}
        </button>
        <button onClick={() => reset()} className="btn-secondary">
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>

      {/* Session counter */}
      <div className="text-center">
        <div className="flex gap-1.5 justify-center mb-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${i < (sessions % 4) ? 'bg-rose-500' : 'bg-slate-200 dark:bg-slate-700'}`}
            />
          ))}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {sessions} session{sessions !== 1 ? 's' : ''} completed
          {sessions > 0 && sessions % 4 === 0 ? ' — take a long break!' : ''}
        </p>
      </div>

      <p className="text-xs text-slate-400 max-w-xs text-center">
        Work for 25 minutes, then take a 5-minute break. After 4 sessions, take a 15-minute break.
      </p>
    </div>
  )
}
