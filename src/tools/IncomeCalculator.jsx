import { useMemo, useState } from 'react'
import { DollarSign } from 'lucide-react'

/**
 * Simple online-income projection:
 *  - Pageviews x RPM  = Ad revenue
 *  - Pageviews x CVR x commission = Affiliate revenue
 *  - Products sold per month x price = Product revenue
 */
export default function IncomeCalculator() {
  const [views, setViews] = useState(10000)
  const [rpm, setRpm] = useState(6)         // $ per 1,000 views
  const [cvr, setCvr] = useState(0.8)       // %
  const [commission, setCommission] = useState(15) // $
  const [products, setProducts] = useState(5)
  const [price, setPrice] = useState(29)

  const ad = useMemo(() => (views / 1000) * rpm, [views, rpm])
  const aff = useMemo(() => views * (cvr / 100) * commission, [views, cvr, commission])
  const prod = useMemo(() => products * price, [products, price])
  const total = ad + aff + prod

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <Slider label="Monthly pageviews" value={views} onChange={setViews} min={500} max={500000} step={500} prefix="" suffix=" views" />
        <Slider label="Ad RPM (revenue per 1k views)" value={rpm} onChange={setRpm} min={1} max={40} step={0.5} prefix="$" />
        <Slider label="Affiliate conversion rate" value={cvr} onChange={setCvr} min={0.1} max={5} step={0.1} suffix="%" />
        <Slider label="Avg affiliate commission per sale" value={commission} onChange={setCommission} min={0} max={200} step={1} prefix="$" />
        <Slider label="Digital products sold / month" value={products} onChange={setProducts} min={0} max={200} step={1} />
        <Slider label="Product price" value={price} onChange={setPrice} min={0} max={500} step={1} prefix="$" />
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-2 text-brand-600">
          <DollarSign className="w-5 h-5" />
          <span className="font-semibold">Projected monthly revenue</span>
        </div>
        <div className="mt-2 font-display font-extrabold text-5xl text-slate-900 dark:text-white">
          ${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
        <p className="text-sm text-slate-500 mt-1">= ~${(total * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })} / year</p>

        <div className="mt-6 space-y-3">
          <Bar label="Ads" value={ad} total={total} color="bg-brand-500" />
          <Bar label="Affiliate" value={aff} total={total} color="bg-accent-500" />
          <Bar label="Products" value={prod} total={total} color="bg-emerald-500" />
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Rough estimate. Real RPM varies by niche, geography, device and season.
        </p>
      </div>
    </div>
  )
}

function Slider({ label, value, onChange, min, max, step = 1, prefix = '', suffix = '' }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-sm text-brand-600 font-semibold">{prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-600"
      />
    </label>
  )
}

function Bar({ label, value, total, color }) {
  const pct = total ? (value / total) * 100 : 0
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-slate-500">${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div className={`${color} h-full rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
