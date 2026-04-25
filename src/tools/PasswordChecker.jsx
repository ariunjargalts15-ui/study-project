import { useState } from 'react'
import { Eye, EyeOff, Shield, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react'

function check(pwd) {
  if (!pwd) return { score: 0, label: '', color: '', tips: [] }

  const tests = [
    { test: pwd.length >= 8,   tip: 'At least 8 characters' },
    { test: pwd.length >= 12,  tip: 'At least 12 characters (better)' },
    { test: /[A-Z]/.test(pwd), tip: 'One uppercase letter' },
    { test: /[a-z]/.test(pwd), tip: 'One lowercase letter' },
    { test: /\d/.test(pwd),    tip: 'One number' },
    { test: /[^A-Za-z0-9]/.test(pwd), tip: 'One special character (!@#$…)' },
    { test: !/(.)\1{2,}/.test(pwd),   tip: 'No repeated characters (aaa…)' },
    { test: !commonPasswords.includes(pwd.toLowerCase()), tip: 'Not a common password' },
  ]

  const passed = tests.filter((t) => t.test).length
  const tips   = tests.filter((t) => !t.test).map((t) => t.tip)
  const score  = Math.round((passed / tests.length) * 100)

  const label = score < 30 ? 'Very weak' : score < 50 ? 'Weak' : score < 70 ? 'Fair' : score < 90 ? 'Strong' : 'Very strong'
  const color = score < 30 ? 'red' : score < 50 ? 'orange' : score < 70 ? 'yellow' : score < 90 ? 'teal' : 'green'

  return { score, label, color, tips }
}

const colorMap = {
  red:    { bar: 'bg-red-500',    text: 'text-red-600',    icon: ShieldX },
  orange: { bar: 'bg-orange-500', text: 'text-orange-600', icon: ShieldAlert },
  yellow: { bar: 'bg-yellow-400', text: 'text-yellow-600', icon: Shield },
  teal:   { bar: 'bg-teal-500',   text: 'text-teal-600',   icon: Shield },
  green:  { bar: 'bg-green-500',  text: 'text-green-600',  icon: ShieldCheck },
}

const commonPasswords = ['password', '123456', '123456789', 'qwerty', 'abc123', 'letmein', 'monkey', 'iloveyou', 'admin', 'welcome', 'password1', '12345678']

export default function PasswordChecker() {
  const [pwd,     setPwd]     = useState('')
  const [visible, setVisible] = useState(false)
  const result = check(pwd)
  const C = result.color ? colorMap[result.color] : null
  const Icon = C?.icon ?? Shield

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="relative">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Enter a password to check
        </label>
        <div className="relative">
          <input
            type={visible ? 'text' : 'password'}
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Type or paste a password…"
            className="w-full px-4 py-3 pr-11 rounded-xl bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-brand-400 font-mono"
            autoComplete="new-password"
          />
          <button
            onClick={() => setVisible((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            aria-label="Toggle password visibility"
          >
            {visible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <p className="mt-1.5 text-xs text-slate-400">Your password never leaves your browser.</p>
      </div>

      {pwd && C && (
        <>
          {/* Strength bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className={`flex items-center gap-1.5 font-semibold ${C.text}`}>
                <Icon className="w-4 h-4" /> {result.label}
              </div>
              <span className="text-sm text-slate-500">{result.score}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${C.bar}`}
                style={{ width: `${result.score}%` }}
              />
            </div>
          </div>

          {/* Checklist */}
          {result.tips.length > 0 && (
            <div className="card p-4">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">To strengthen it:</p>
              <ul className="space-y-1.5">
                {result.tips.map((tip) => (
                  <li key={tip} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.tips.length === 0 && (
            <div className="card p-4 flex items-center gap-3 text-green-700 dark:text-green-400">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">Excellent password — all checks passed!</span>
            </div>
          )}

          {/* Tips */}
          <div className="card p-4 text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <p className="font-semibold text-slate-700 dark:text-slate-300">Good password hygiene</p>
            <p>• Use a unique password for every site</p>
            <p>• Consider a password manager like Bitwarden or 1Password</p>
            <p>• Enable two-factor authentication wherever possible</p>
          </div>
        </>
      )}

      {!pwd && (
        <div className="card p-8 text-center text-slate-400">
          <Shield className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">Enter a password above to see how strong it is.</p>
        </div>
      )}
    </div>
  )
}
