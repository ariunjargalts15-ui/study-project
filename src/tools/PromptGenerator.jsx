import { useState } from 'react'
import { Copy, Check, Wand2, RefreshCw } from 'lucide-react'

const roles = ['expert copywriter', 'senior software engineer', 'creative marketer', 'startup founder', 'teacher', 'data analyst', 'career coach', 'screenwriter']
const tones = ['friendly and casual', 'professional and concise', 'witty and playful', 'authoritative and expert', 'empathetic and supportive']
const formats = ['a numbered list', 'a short essay', 'step-by-step instructions', 'a table', 'bullet points with explanations', 'a dialogue between two characters']

export default function PromptGenerator() {
  const [task, setTask] = useState('')
  const [audience, setAudience] = useState('')
  const [role, setRole] = useState(roles[0])
  const [tone, setTone] = useState(tones[0])
  const [format, setFormat] = useState(formats[0])
  const [copied, setCopied] = useState(false)

  const prompt = task
    ? `Act as ${startsWithVowel(role) ? 'an' : 'a'} ${role}. ${
        audience ? `Your audience is ${audience}. ` : ''
      }Your task: ${task}.\n\nRespond in a ${tone} tone. Format your answer as ${format}. Before answering, briefly think step-by-step about the best approach, then give the final answer clearly.`
    : ''

  const copy = async () => {
    if (!prompt) return
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const randomize = () => {
    setRole(pick(roles))
    setTone(pick(tones))
    setFormat(pick(formats))
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <Field label="What do you want the AI to do?">
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            rows={3}
            placeholder="e.g. Write a 5-email launch sequence for my new yoga app"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-brand-400"
          />
        </Field>

        <Field label="Who is the audience? (optional)">
          <input
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g. busy working mothers in their 30s"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-brand-400"
          />
        </Field>

        <Field label="Role for the AI">
          <Select value={role} onChange={setRole} options={roles} />
        </Field>
        <Field label="Tone">
          <Select value={tone} onChange={setTone} options={tones} />
        </Field>
        <Field label="Answer format">
          <Select value={format} onChange={setFormat} options={formats} />
        </Field>

        <button onClick={randomize} className="btn-secondary text-sm">
          <RefreshCw className="w-4 h-4" /> Randomize
        </button>
      </div>

      <div className="relative card p-5 min-h-[240px] flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Wand2 className="w-4 h-4 text-brand-600" />
          <span className="font-semibold text-slate-900 dark:text-white">Your prompt</span>
          <button onClick={copy} disabled={!prompt} className="ml-auto btn-ghost !py-1.5 !px-3 text-xs">
            {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
          </button>
        </div>
        {prompt ? (
          <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300 flex-1">{prompt}</pre>
        ) : (
          <div className="flex-1 grid place-items-center text-center text-sm text-slate-400">
            Fill in the task to generate your prompt.
          </div>
        )}
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  )
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-brand-400"
    >
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

const pick = (a) => a[Math.floor(Math.random() * a.length)]
const startsWithVowel = (s) => /^[aeiou]/i.test(s)
