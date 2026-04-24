import { useState } from 'react'
import { RefreshCw, Heart, Check, Copy } from 'lucide-react'

const prefixes = ['Nova', 'Lumen', 'Vivid', 'Spark', 'Pixel', 'Quanta', 'Nimbus', 'Zenith', 'Atlas', 'Orbit', 'Verve', 'Craft']
const suffixes = ['ly', 'ify', 'io', 'lab', 'hub', 'works', 'forge', 'base', 'loop', 'wave', 'spring']
const descriptors = ['Studio', 'Labs', 'Works', 'Factory', 'Foundry', 'Collective', 'Club', 'House', 'Co.']
const vibes = ['Modern', 'Playful', 'Premium', 'Minimal', 'Bold', 'Friendly', 'Tech', 'Indie']

export default function BusinessNameGenerator() {
  const [keyword, setKeyword] = useState('')
  const [vibe, setVibe] = useState(vibes[0])
  const [names, setNames] = useState([])
  const [favs, setFavs] = useState([])
  const [copied, setCopied] = useState('')

  const generate = () => {
    const k = keyword.trim() || 'Venture'
    const out = new Set()
    while (out.size < 8) {
      const variants = [
        `${cap(pick(prefixes))}${pick(suffixes)}`,
        `${cap(k)}${pick(suffixes)}`,
        `${cap(pick(prefixes))} ${pick(descriptors)}`,
        `${cap(k)} ${pick(descriptors)}`,
        `${cap(k)}${cap(pick(prefixes))}`,
        `${cap(pick(prefixes))}${cap(k)}`,
      ]
      out.add(pick(variants))
    }
    setNames([...out])
  }

  const toggleFav = (n) => setFavs((f) => f.includes(n) ? f.filter((x) => x !== n) : [...f, n])
  const copy = async (n) => {
    await navigator.clipboard.writeText(n)
    setCopied(n)
    setTimeout(() => setCopied(''), 1200)
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-[1fr_200px_auto] gap-3">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Keyword (e.g. coffee, fitness, ai)"
          className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-brand-400"
        />
        <select value={vibe} onChange={(e) => setVibe(e.target.value)} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700">
          {vibes.map((v) => <option key={v}>{v}</option>)}
        </select>
        <button onClick={generate} className="btn-primary">
          <RefreshCw className="w-4 h-4" /> Generate
        </button>
      </div>

      {names.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {names.map((n) => (
            <div key={n} className="card p-4 flex items-center justify-between gap-2">
              <span className="font-display font-bold text-slate-900 dark:text-white truncate">{n}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => copy(n)} className="w-8 h-8 rounded-full grid place-items-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                  {copied === n ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
                <button onClick={() => toggleFav(n)} className={`w-8 h-8 rounded-full grid place-items-center ${favs.includes(n) ? 'bg-rose-500 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                  <Heart className="w-4 h-4" fill={favs.includes(n) ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {favs.length > 0 && (
        <div className="card p-5">
          <h4 className="font-semibold text-slate-900 dark:text-white">Your shortlist</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {favs.map((f) => <span key={f} className="chip bg-rose-100 text-rose-700">{f}</span>)}
          </div>
        </div>
      )}
    </div>
  )
}

const pick = (a) => a[Math.floor(Math.random() * a.length)]
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
