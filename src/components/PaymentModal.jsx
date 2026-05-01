import { useState } from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { X, CheckCircle2, Zap, Star, AlertCircle } from 'lucide-react'
import { usePro } from '../context/ProContext.jsx'

// Client ID only — secret key is server-side only and never belongs in frontend code
const PAYPAL_CLIENT_ID = 'AfEpCdbMCrQF8S9_TAil3PxH6yF8mq5YILKBISO4bWIKRGXsXa7c31lwF1qjy1ZGMMQYiKLpyB_bSUdP'

const PLANS = {
  lifetime: {
    label: 'All Tools Lifetime',
    price: '19.99',
    description: 'Unlock all 11 premium tools — one payment, lifetime access.',
    features: ['AI Resume Builder', 'Cover Letter Generator', 'Business Email Writer', 'SEO Website Checker', 'Essay Checker + 6 more'],
  },
  single: {
    label: 'Single Pro Tool',
    price: '3.99',
    description: 'Unlock any one premium tool of your choice.',
    features: ['Access to 1 premium tool', 'Lifetime access for that tool'],
  },
}

function SuccessScreen({ plan, onClose }) {
  return (
    <div className="p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 grid place-items-center mx-auto mb-5">
        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
      </div>
      <h2 className="font-display font-bold text-2xl text-white mb-2">Payment successful!</h2>
      <p className="text-slate-400 text-sm mb-1">
        You've unlocked <span className="text-white font-semibold">{plan.label}</span>.
      </p>
      <p className="text-slate-500 text-xs mb-7">A receipt has been sent to your PayPal email.</p>

      <div className="rounded-2xl bg-slate-800 border border-white/10 p-4 mb-6 text-left space-y-2">
        {plan.features.map((f, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            {f}
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold transition shadow-lg"
      >
        Start using Pro tools →
      </button>
    </div>
  )
}

export default function PaymentModal({ planKey = 'lifetime', onClose }) {
  const [step, setStep]     = useState('checkout') // 'checkout' | 'success' | 'error'
  const [errMsg, setErrMsg] = useState('')
  const { unlock }          = usePro()
  const plan                = PLANS[planKey] ?? PLANS.lifetime

  const handleApprove = async (data, actions) => {
    try {
      await actions.order.capture()
      unlock()
      setStep('success')
    } catch {
      setErrMsg('Payment capture failed. Please try again or contact support.')
      setStep('error')
    }
  }

  const handleError = (err) => {
    console.error('PayPal error:', err)
    setErrMsg('Something went wrong with PayPal. Please try again.')
    setStep('error')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-600 to-violet-600 grid place-items-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-white">Upgrade to Pro</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl grid place-items-center text-slate-500 hover:text-white hover:bg-white/5 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'success' ? (
          <SuccessScreen plan={plan} onClose={onClose} />
        ) : (
          <div className="p-6">
            {/* Plan summary */}
            <div className="rounded-2xl bg-gradient-to-br from-brand-900/40 to-violet-900/30 border border-brand-700/30 p-4 mb-5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-white">{plan.label}</span>
                {planKey === 'lifetime' && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold">
                    <Star className="w-3 h-3 fill-current" /> Best Value
                  </div>
                )}
              </div>
              <div className="text-3xl font-display font-extrabold text-white mb-1">
                ${plan.price}
                <span className="text-sm font-normal text-slate-400 ml-1">one-time</span>
              </div>
              <p className="text-xs text-slate-400">{plan.description}</p>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-5">
              {plan.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* PayPal buttons */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white p-3">
              <PayPalScriptProvider
                options={{
                  clientId: PAYPAL_CLIENT_ID,
                  currency: 'USD',
                  intent: 'capture',
                }}
              >
                <PayPalButtons
                  style={{ layout: 'vertical', shape: 'rect', color: 'gold', label: 'pay', height: 44 }}
                  createOrder={(data, actions) =>
                    actions.order.create({
                      purchase_units: [{
                        description: `StudyAI Tools — ${plan.label}`,
                        amount: { value: plan.price, currency_code: 'USD' },
                      }],
                    })
                  }
                  onApprove={handleApprove}
                  onError={handleError}
                  onCancel={() => {}} // user cancelled — do nothing
                />
              </PayPalScriptProvider>
            </div>

            {/* Error */}
            {step === 'error' && (
              <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-red-900/30 border border-red-700/30 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                {errMsg}
              </div>
            )}

            <p className="mt-3 text-center text-xs text-slate-600">
              7-day money-back guarantee · Secure payment via PayPal · No subscription
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
