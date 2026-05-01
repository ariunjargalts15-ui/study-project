import { X, Lock, CheckCircle2, Zap, Star } from 'lucide-react'
import { usePro } from '../context/ProContext.jsx'

export default function PremiumModal({ tool, onClose, onUpgrade }) {
  const { unlock } = usePro()

  if (!tool) return null

  const handleSimulate = () => {
    unlock()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
        {/* Gradient header */}
        <div className={`h-36 bg-gradient-to-br ${tool.color} relative flex items-center justify-center`}>
          <div className="text-6xl drop-shadow-lg">{tool.emoji}</div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/25 grid place-items-center text-white hover:bg-black/45 transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          {/* Pro badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/25 backdrop-blur text-white text-xs font-bold">
            <Lock className="w-3 h-3" /> PRO
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-3 mb-1">
            <div>
              <h2 className="font-display font-bold text-xl text-white">{tool.name}</h2>
              <p className="text-sm text-slate-400 mt-1">{tool.description}</p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-5 space-y-2.5">
            {tool.benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0" />
                {b}
              </div>
            ))}
          </div>

          {/* Pricing highlight */}
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-brand-900/60 to-violet-900/40 border border-brand-700/40 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-brand-300 uppercase tracking-wider font-medium">All Tools Lifetime</div>
                <div className="text-3xl font-display font-extrabold text-white mt-0.5">
                  $19.99
                  <span className="text-sm font-normal text-slate-400 ml-1">one-time</span>
                </div>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold">
                <Star className="w-3 h-3 fill-current" /> Best Value
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">Unlock all 11 premium tools — one payment, lifetime access.</p>
          </div>

          {/* CTA */}
          <button
            onClick={() => { onClose(); onUpgrade?.('lifetime') }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold py-3 text-sm transition-all shadow-lg shadow-brand-900/50 hover:shadow-brand-700/50"
          >
            <Zap className="w-4 h-4" /> Upgrade to Pro — $19.99
          </button>

          {/* Simulate purchase for testing */}
          <button
            onClick={handleSimulate}
            className="mt-3 w-full text-center text-xs text-slate-600 hover:text-slate-400 transition py-1.5"
          >
            Simulate Purchase / Unlock Pro (testing only)
          </button>
        </div>
      </div>
    </div>
  )
}
