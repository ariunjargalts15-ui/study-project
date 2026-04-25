import { useState } from 'react'
import { Copy, Check, RefreshCw, Shuffle } from 'lucide-react'

function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) { h = s = 0 }
  else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      default: h = ((r - g) / d + 4) / 6
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslToHex(h, s, l) {
  h /= 360; s /= 100; l /= 100
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1; if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  let r, g, b
  if (s === 0) { r = g = b = l }
  else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  const toHex = (x) => Math.round(x * 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function generatePalette(hex, type) {
  const [h, s, l] = hexToHsl(hex)
  switch (type) {
    case 'monochromatic':
      return [10, 25, 40, 55, 70, 85].map((lightness) => hslToHex(h, s, lightness))
    case 'complementary':
      return [
        hslToHex(h, s, 30), hslToHex(h, s, 50), hslToHex(h, s, 70),
        hslToHex((h + 180) % 360, s, 30), hslToHex((h + 180) % 360, s, 50), hslToHex((h + 180) % 360, s, 70),
      ]
    case 'triadic':
      return [0, 120, 240].flatMap((offset) => [
        hslToHex((h + offset) % 360, s, 40),
        hslToHex((h + offset) % 360, s, 65),
      ])
    case 'analogous':
      return [-40, -20, 0, 20, 40, 60].map((offset) => hslToHex((h + offset + 360) % 360, s, l))
    default:
      return []
  }
}

const TYPES = ['monochromatic', 'complementary', 'triadic', 'analogous']
const PRESETS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#ef4444']

export default function ColorPalette() {
  const [baseColor, setBaseColor] = useState('#6366f1')
  const [type, setType]           = useState('monochromatic')
  const [copied, setCopied]       = useState('')

  const palette = generatePalette(baseColor, type)

  const copy = async (hex) => {
    await navigator.clipboard.writeText(hex)
    setCopied(hex)
    setTimeout(() => setCopied(''), 1200)
  }

  const randomBase = () => {
    const r = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    setBaseColor(`#${r()}${r()}${r()}`)
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Base color</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-12 h-12 rounded-xl cursor-pointer border-0 p-0.5 bg-transparent"
            />
            <input
              type="text"
              value={baseColor}
              onChange={(e) => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setBaseColor(e.target.value) }}
              className="flex-1 px-4 py-3 rounded-xl font-mono text-sm bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-brand-400"
            />
            <button onClick={randomBase} className="btn-secondary !px-3" title="Random color">
              <Shuffle className="w-4 h-4" />
            </button>
          </div>
          {/* Presets */}
          <div className="flex gap-1.5 mt-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setBaseColor(p)}
                title={p}
                className="w-7 h-7 rounded-lg border-2 transition hover:scale-110"
                style={{ backgroundColor: p, borderColor: baseColor === p ? '#fff' : 'transparent' }}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Palette type</label>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`btn text-xs ${type === t ? 'bg-brand-600 text-white' : 'btn-secondary'}`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Palette */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-900 dark:text-white">Generated palette</h3>
          <button
            onClick={() => navigator.clipboard.writeText(palette.join(', '))}
            className="btn-ghost text-xs !py-1.5"
          >
            <Copy className="w-3 h-3" /> Copy all
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {palette.map((hex) => (
            <div key={hex} className="group">
              <button
                onClick={() => copy(hex)}
                className="w-full h-24 rounded-2xl transition hover:scale-105 hover:shadow-lg relative overflow-hidden"
                style={{ backgroundColor: hex }}
                title={`Copy ${hex}`}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition flex items-center justify-center">
                  {copied === hex
                    ? <Check className="w-5 h-5 text-white drop-shadow" />
                    : <Copy className="w-4 h-4 text-white/0 group-hover:text-white/80 drop-shadow transition" />
                  }
                </div>
              </button>
              <p className="mt-1.5 text-xs text-center font-mono text-slate-600 dark:text-slate-400">{hex}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-400 text-center">Click any swatch to copy its hex code</p>
      </div>
    </div>
  )
}
