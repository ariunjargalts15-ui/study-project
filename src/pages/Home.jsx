import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, ChevronDown, ChevronUp, Check, Lock, Star } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import AdSlot from '../components/AdSlot.jsx'
import PremiumModal from '../components/PremiumModal.jsx'
import PaymentModal from '../components/PaymentModal.jsx'
import { premiumTools } from '../data/premiumTools.js'
import { usePro } from '../context/ProContext.jsx'

/* ─── Free tools showcase ──────────────────────────────────────── */
const freeToolsShowcase = [
  { id: 'prompt',   label: 'Prompt Generator',   emoji: '🧠', color: 'from-violet-500 to-purple-600' },
  { id: 'name',     label: 'Business Names',      emoji: '🏷️', color: 'from-pink-500 to-rose-600' },
  { id: 'study',    label: 'Study Planner',       emoji: '📚', color: 'from-blue-500 to-indigo-600' },
  { id: 'income',   label: 'Income Calculator',   emoji: '💰', color: 'from-emerald-500 to-teal-600' },
  { id: 'word',     label: 'Word Counter',        emoji: '📝', color: 'from-amber-500 to-orange-600' },
  { id: 'pomodoro', label: 'Pomodoro Timer',      emoji: '⏱️', color: 'from-red-500 to-rose-600' },
  { id: 'password', label: 'Password Checker',    emoji: '🔐', color: 'from-slate-500 to-slate-700' },
  { id: 'color',    label: 'Color Palette',       emoji: '🎨', color: 'from-cyan-500 to-sky-600' },
]

/* ─── FAQ ──────────────────────────────────────────────────────── */
const faqs = [
  { q: 'What is StudyAI Tools?', a: 'StudyAI Tools is a curated AI utility platform with free and premium tools for students, creators, and independent builders. Use tools like Study Planner, AI Resume Builder, SEO Checker, and more — all in one place.' },
  { q: 'Are the free tools really free?', a: 'Yes — all 8 basic tools are 100% free with no account required. Word Counter, Pomodoro Timer, Password Checker, Color Palette, Prompt Generator, Business Name Generator, Study Planner, and Income Calculator are always free.' },
  { q: "What's included in Pro?", a: 'Pro unlocks 11 premium tools: AI Resume Builder, Cover Letter Generator, Business Email Writer, Product Description Generator, Essay Checker, SEO Website Checker, AdSense Approval Checker, Meta Tag Generator, Invoice Generator, Import Profit Calculator, and Flashcard Generator.' },
  { q: 'How does payment work?', a: 'The All Tools Lifetime plan is a one-time payment of $19.99 — no monthly fees, no subscriptions. You pay once and keep access forever. Single Tool access is $3.99 per tool.' },
  { q: 'Is my data private?', a: 'Yes. All free tools run entirely in your browser. No data is ever sent to our servers for free tools. Premium tools operate securely and we never sell or share your data.' },
  { q: 'Can I get a refund?', a: "Yes — we offer a 7-day money-back guarantee. If you're not satisfied, contact us at support@studyaitools.biz within 7 days of purchase for a full refund." },
]

/* ─── FAQ Accordion ────────────────────────────────────────────── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden', background: 'rgba(8,22,38,0.5)' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
      >
        <span className="font-serif text-white text-base" style={{ letterSpacing: '-0.01em' }}>{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-white/40 flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0" />
        }
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'var(--muted)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
          {a}
        </div>
      )}
    </div>
  )
}

/* ─── Premium Tool Card ─────────────────────────────────────────── */
function PremiumCard({ tool, isPro, onOpenModal }) {
  return (
    <div
      className="relative group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(8,22,38,0.7)' }}
      onClick={() => !isPro && onOpenModal(tool)}
    >
      <div className={`h-20 bg-gradient-to-br ${tool.color} relative flex items-center justify-center`}>
        <span className="text-3xl drop-shadow">{tool.emoji}</span>
        {!isPro && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 grid place-items-center">
            <Lock className="w-3 h-3 text-white" />
          </div>
        )}
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/30 text-white text-[10px] font-medium tracking-wide">
          PRO
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-serif text-white text-sm leading-snug" style={{ letterSpacing: '-0.01em' }}>{tool.name}</h3>
        <p className="mt-1 text-xs" style={{ color: 'var(--muted)' }}>{tool.tagline}</p>
        {isPro ? (
          <span className="mt-3 inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
            <Check className="w-3 h-3" /> Unlocked
          </span>
        ) : (
          <span className="mt-3 inline-flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            <Lock className="w-3 h-3" /> Unlock with Pro
          </span>
        )}
      </div>
      {!isPro && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          style={{ background: 'rgba(0,26,46,0.6)' }}>
          <div className="px-3 py-1.5 rounded-xl text-white text-xs font-medium"
            style={{ background: 'rgba(99,102,241,0.9)' }}>
            View Pro Plan →
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Pricing Card ──────────────────────────────────────────────── */
function PricingCard({ plan, featured, isPro, onPay }) {
  const alreadyPro = isPro && plan.planKey
  return (
    <div
      className="relative rounded-3xl overflow-hidden transition-all"
      style={{
        border: featured ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.08)',
        background: featured ? 'rgba(8,22,38,0.9)' : 'rgba(8,22,38,0.6)',
        transform: featured ? 'scale(1.02)' : 'none',
      }}
    >
      {featured && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-b-xl bg-gradient-to-r from-brand-600 to-violet-600 text-white text-xs font-bold">
            <Star className="w-3 h-3 fill-current" /> Most Popular
          </div>
        </div>
      )}
      <div className="p-7 pt-10">
        <div className="mb-6">
          <div className="text-sm font-medium mb-1" style={{ color: 'var(--muted)' }}>{plan.name}</div>
          <div className="flex items-end gap-1">
            <span className="font-serif text-4xl text-white" style={{ letterSpacing: '-0.03em' }}>{plan.price}</span>
            {plan.period && <span className="text-sm mb-1.5" style={{ color: 'var(--muted)' }}>{plan.period}</span>}
          </div>
          <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>{plan.desc}</p>
        </div>

        <ul className="space-y-3 mb-7">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-white/40" />
              <span className="text-white/80">{f}</span>
            </li>
          ))}
          {plan.missing?.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm opacity-30">
              <span className="w-4 h-4 flex-shrink-0 mt-0.5 text-center leading-4">✕</span>
              <span style={{ color: 'var(--muted)' }}>{f}</span>
            </li>
          ))}
        </ul>

        {plan.planKey ? (
          alreadyPro ? (
            <div className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-semibold text-emerald-400"
              style={{ border: '1px solid rgba(52,211,153,0.2)', background: 'rgba(52,211,153,0.08)' }}>
              <Check className="w-4 h-4" /> Already unlocked
            </div>
          ) : (
            <button
              onClick={() => onPay(plan.planKey)}
              className="w-full py-3 rounded-2xl text-sm font-semibold transition-all text-white"
              style={featured
                ? { background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 8px 32px rgba(99,102,241,0.3)' }
                : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {plan.cta}
            </button>
          )
        ) : (
          <a
            href={plan.ctaHref}
            className="block w-full py-3 rounded-2xl text-sm font-semibold text-center text-white transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {plan.cta}
          </a>
        )}
      </div>
    </div>
  )
}

/* ─── Main ──────────────────────────────────────────────────────── */
export default function Home() {
  const [modalTool, setModalTool]     = useState(null)
  const [paymentPlan, setPaymentPlan] = useState(null)
  const { isPro } = usePro()

  const plans = [
    {
      name: 'Free Plan', price: '$0', period: '/forever',
      desc: 'All basic tools, no signup needed.',
      planKey: null, cta: 'Get Started Free', ctaHref: '/free-tools',
      features: ['All 8 basic tools', 'Prompt Generator', 'Word Counter & Pomodoro', 'Color Palette & Password Checker', 'No account required'],
      missing: ['Premium tools', 'Ad-free experience'],
    },
    {
      name: 'All Tools Lifetime', price: '$19.99', period: 'one-time',
      desc: 'Every tool, forever. Best value.',
      planKey: 'lifetime', cta: 'Unlock Everything →',
      features: ['All 8 free tools included', 'AI Resume Builder', 'Cover Letter Generator', 'Business Email Writer', 'SEO Website Checker', 'Essay Checker & 6 more tools', 'Lifetime access — no renewals', 'Priority support'],
    },
    {
      name: 'Single Pro Tool', price: '$3.99', period: '/tool',
      desc: 'Try any one premium tool.',
      planKey: 'single', cta: 'Choose a Tool',
      features: ['Unlock any ONE premium tool', 'Lifetime access to that tool', 'Priority support'],
      missing: ['Other premium tools locked'],
    },
  ]

  /* Background overlay styles */
  const bgOverlay = {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,15,30,0.55) 0%, rgba(0,15,30,0.15) 35%, rgba(0,15,30,0.55) 70%, hsl(201deg 100% 8%) 100%)',
    zIndex: 1,
  }
  const bgRadial = {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(120% 60% at 20% 30%, rgba(0,15,30,0.25) 0%, transparent 50%), radial-gradient(80% 50% at 80% 70%, rgba(0,0,0,0.35) 0%, transparent 60%)',
    zIndex: 2,
    pointerEvents: 'none',
  }

  return (
    <>
      <SEO
        title="StudyAI Tools — Where focus meets intelligence"
        description="A curated platform of AI tools for students, creators, and independent builders. Free tools and pro upgrades for serious work."
        url="/"
      />

      {/* Modals */}
      {modalTool && <PremiumModal tool={modalTool} onClose={() => setModalTool(null)} onUpgrade={setPaymentPlan} />}
      {paymentPlan && <PaymentModal planKey={paymentPlan} onClose={() => setPaymentPlan(null)} />}

      {/* ═══ FIXED BACKGROUND (Home only) ═══ */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <img
          src="/hero-bg.png"
          alt=""
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 30%',
            animation: 'kenburns 28s ease-in-out infinite alternate',
          }}
        />
        <div style={bgOverlay} />
        <div style={bgRadial} />
      </div>

      {/* Film grain */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 3, opacity: 0.06,
          mixBlendMode: 'overlay', pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>")`,
        }}
      />

      {/* ═══ PAGE CONTENT ═══ */}
      <div style={{ position: 'relative', zIndex: 10 }}>

        {/* Top meta strip */}
        <div className="animate-fade-rise" style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', gap: 16 }}>
          <span>StudyAI Tools</span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)', minWidth: 40, margin: '0 24px' }} />
          <span>35+ curated tools</span>
        </div>

        {/* ═══ HERO ═══ */}
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '80px 24px 120px', maxWidth: 1280, margin: '0 auto', width: '100%' }}>

          {/* Eyebrow */}
          <div className="liquid-glass animate-fade-rise-delay" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 16px 7px 12px', borderRadius: 999, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 36 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: '#7be0a4', boxShadow: '0 0 8px rgba(123,224,164,0.7)', flexShrink: 0 }} />
            35+ AI tools, verified free tiers
          </div>

          {/* Hero title */}
          <h1
            className="animate-fade-rise"
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontWeight: 400,
              fontSize: 'clamp(52px, 9vw, 120px)',
              lineHeight: 0.95,
              letterSpacing: '-0.035em',
              maxWidth: 1100,
              color: 'rgba(234, 227, 255, 1)',
              textWrap: 'balance',
            }}
          >
            Think Beyond <em style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.35)' }}>Tomorrow</em>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-rise-delay" style={{ color: 'var(--muted)', fontSize: 18, maxWidth: 580, marginTop: 32, lineHeight: 1.55, fontWeight: 400 }}>
            A curated space for AI tools that actually work. No noise — just sharp tools
            for students, creators, and independent builders.
          </p>

          {/* CTA */}
          <a
            href="/free-tools"
            className="liquid-glass animate-fade-rise-delay-2"
            style={{ marginTop: 48, display: 'inline-flex', alignItems: 'center', gap: 12, padding: '18px 52px', borderRadius: 999, fontSize: 15, color: '#fff', textDecoration: 'none' }}
          >
            Begin your study
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease' }}>
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>

          {/* Trust strip */}
          <div
            className="animate-fade-rise-delay-3"
            style={{
              marginTop: 72, maxWidth: 960, width: 'calc(100% - 48px)',
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1, borderRadius: 999,
              background: 'rgba(255,255,255,0.06)', overflow: 'hidden',
            }}
          >
            {[
              { n: '8+',   l: 'Free Tools' },
              { n: '11+',  l: 'Premium Tools' },
              { n: '200k', l: 'Monthly Users' },
              { n: '100%', l: 'Browser-based' },
            ].map((s) => (
              <div key={s.l} style={{ background: 'rgba(8,22,38,0.55)', WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)', padding: '18px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 26, lineHeight: 1, letterSpacing: '-0.02em', color: '#fff' }}>{s.n}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section id="about" style={{ padding: '0 24px 100px' }}>
          <div
            className="animate-fade-rise-delay-4"
            style={{
              maxWidth: 1180, margin: '0 auto', borderRadius: 28,
              padding: 'clamp(40px, 6vw, 80px) clamp(24px, 6vw, 64px)',
              background: 'linear-gradient(180deg, rgba(8,22,38,0.55) 0%, rgba(4,12,22,0.78) 100%)',
              WebkitBackdropFilter: 'blur(18px) saturate(130%)',
              backdropFilter: 'blur(18px) saturate(130%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 28 }}>
              <span style={{ width: 36, height: 1, background: 'rgba(255,255,255,0.35)' }} />
              About — StudyAI Tools
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 56, alignItems: 'start', marginBottom: 48 }}>
              <div>
                <h2 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontWeight: 400, fontSize: 'clamp(32px, 4vw, 58px)', lineHeight: 1.0, letterSpacing: '-0.025em', color: '#fff', maxWidth: 420 }}>
                  A quiet library for <em style={{ fontStyle: 'normal', color: 'var(--muted)' }}>loud minds.</em>
                </h2>
              </div>
              <div>
                <p style={{ color: '#fff', fontSize: 18, lineHeight: 1.55, marginBottom: 20, maxWidth: 520 }}>
                  StudyAI Tools is a hand-picked collection of AI tools for students, writers, and independent thinkers — a calm room in a noisy internet.
                </p>
                <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 520 }}>
                  We test every tool ourselves, confirm which free tiers are genuinely free — not a one-week trial dressed up in marketing — and build honest utilities that respect your time, attention, and budget.
                </p>
              </div>
            </div>

            {/* Principles */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 18, overflow: 'hidden' }}>
              {[
                { n: '01', t: 'Honest by default', d: 'Real reviews, real limits, real prices. We name the trade-offs before we name the wins.' },
                { n: '02', t: 'Built for focus', d: 'The tools load fast and ask nothing of you. No doom-scroll, no dark patterns.' },
                { n: '03', t: 'Made for learners', d: 'Students, self-taught builders, and quiet rebels. Tools that respect your budget.' },
              ].map((p) => (
                <div key={p.n} style={{ background: 'rgba(6,18,32,0.7)', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 13, color: 'var(--muted)', letterSpacing: '0.1em' }}>{p.n}</span>
                  <h3 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontWeight: 400, fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#fff' }}>{p.t}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Everything below sits on the navy body background ─── */}

        {/* ═══ TOP AD ═══ */}
        <div className="container-site mt-4">
          <AdSlot variant="banner" />
        </div>

        {/* ═══ FREE TOOLS ═══ */}
        <section id="free-tools" className="container-site mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-emerald-400 text-xs font-medium mb-3" style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}>
                <Check className="w-3.5 h-3.5" /> 100% Free · No Signup
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-white" style={{ letterSpacing: '-0.025em', fontWeight: 400 }}>
                Free tools you can use right now
              </h2>
              <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>Eight browser tools. No account. No credit card. Just use them.</p>
            </div>
            <Link
              to="/free-tools"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition whitespace-nowrap"
              style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}
            >
              Open All Tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {freeToolsShowcase.map((t) => (
              <Link
                key={t.id}
                to="/free-tools"
                className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className={`h-24 bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                  <span className="text-4xl drop-shadow">{t.emoji}</span>
                </div>
                <div className="p-4" style={{ background: 'rgba(8,22,38,0.8)' }}>
                  <div className="font-serif text-sm text-white group-hover:text-white/80 transition-colors">{t.label}</div>
                  <div className="text-xs text-emerald-400 mt-1">Free →</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ MID AD ═══ */}
        <div className="container-site mt-16">
          <AdSlot variant="in-article" />
        </div>

        {/* ═══ PREMIUM TOOLS ═══ */}
        <section id="premium-tools" className="container-site mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-3" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: 'rgba(165,180,252,1)' }}>
                <Lock className="w-3.5 h-3.5" /> Pro Exclusive
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-white" style={{ letterSpacing: '-0.025em', fontWeight: 400 }}>
                Premium tools — unlock more power
              </h2>
              <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>11 advanced tools. Unlock once, use forever.</p>
            </div>
            <button
              onClick={() => setPaymentPlan('lifetime')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 4px 24px rgba(99,102,241,0.25)' }}
            >
              <Zap className="w-4 h-4" /> Unlock All — $19.99
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {premiumTools.map((tool) => (
              <PremiumCard key={tool.id} tool={tool} isPro={isPro} onOpenModal={setModalTool} />
            ))}
          </div>

          {!isPro && (
            <div className="mt-8 rounded-3xl p-8 text-center" style={{ border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(8,22,38,0.6)' }}>
              <div className="text-3xl mb-3">🔓</div>
              <h3 className="font-serif text-xl text-white mb-2" style={{ letterSpacing: '-0.02em', fontWeight: 400 }}>
                Unlock all 11 premium tools for just $19.99
              </h3>
              <p className="text-sm mb-5 max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
                One-time payment. Lifetime access. No subscriptions, no hidden fees.
              </p>
              <button
                onClick={() => setPaymentPlan('lifetime')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white font-semibold transition-all"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 8px 32px rgba(99,102,241,0.3)' }}
              >
                <Zap className="w-5 h-5" /> Unlock Now — $19.99
              </button>
            </div>
          )}
        </section>

        {/* ═══ PRICING ═══ */}
        <section id="pricing" className="container-site mt-28">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-4" style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'var(--muted)' }}>
              Simple, transparent pricing
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white" style={{ letterSpacing: '-0.03em', fontWeight: 400 }}>
              Start free. Upgrade when ready.
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-sm" style={{ color: 'var(--muted)' }}>
              No subscriptions. No tricks. Pay once for lifetime access to all premium tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-center">
            <PricingCard plan={plans[0]} featured={false} isPro={isPro} onPay={setPaymentPlan} />
            <PricingCard plan={plans[1]} featured={true}  isPro={isPro} onPay={setPaymentPlan} />
            <PricingCard plan={plans[2]} featured={false} isPro={isPro} onPay={setPaymentPlan} />
          </div>

          <p className="text-center mt-8 text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            7-day money-back guarantee · Secure payment via PayPal · Instant access
          </p>
        </section>

        {/* ═══ WHY US ═══ */}
        <section className="container-site mt-24">
          <div className="rounded-3xl p-8 md:p-14" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(8,22,38,0.6)' }}>
            <h2 className="font-serif text-2xl md:text-3xl text-white text-center mb-10" style={{ letterSpacing: '-0.025em', fontWeight: 400 }}>
              Why choose StudyAI Tools?
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { e: '⚡', t: 'Instant results', d: 'All tools work in seconds. No waiting, no loading screens — just results.' },
                { e: '🔒', t: 'Privacy-first', d: 'Free tools run 100% in your browser. Your data never leaves your device.' },
                { e: '📱', t: 'Works everywhere', d: 'Fully responsive design. Use on desktop, tablet, or mobile seamlessly.' },
                { e: '🚫', t: 'No signup required', d: 'All free tools work immediately — no account, no email, no friction.' },
                { e: '💯', t: 'Always improving', d: 'We add new tools and improvements every month based on user feedback.' },
                { e: '🎯', t: 'Built for results', d: 'Every tool is designed around real tasks — not just demos or showcases.' },
              ].map((x, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl group" style={{ transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <span className="text-2xl flex-shrink-0">{x.e}</span>
                  <div>
                    <div className="font-medium text-white text-sm mb-1">{x.t}</div>
                    <div className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{x.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section id="faq" className="container-site mt-24">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-white" style={{ letterSpacing: '-0.025em', fontWeight: 400 }}>
              Frequently asked questions
            </h2>
            <p className="mt-3 text-sm" style={{ color: 'var(--muted)' }}>Everything you need to know about StudyAI Tools.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </section>

        {/* ═══ BOTTOM CTA ═══ */}
        <section className="container-site mt-24">
          <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center" style={{ border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(8,22,38,0.7)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-4" style={{ letterSpacing: '-0.03em', fontWeight: 400 }}>
                Ready to work smarter?
              </h2>
              <p className="max-w-md mx-auto mb-8 text-lg" style={{ color: 'var(--muted)' }}>
                Join 200,000+ users who use StudyAI Tools every month.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/free-tools"
                  className="liquid-glass flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-base"
                >
                  <Zap className="w-5 h-5" /> Start Free Now
                </Link>
                <button
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-base transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
                >
                  View Pro Plans
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ BOTTOM AD ═══ */}
        <div className="container-site mt-16 mb-4">
          <AdSlot variant="bottom" />
        </div>

        {/* Bottom meta strip */}
        <div className="animate-fade-rise-delay-4" style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', gap: 16, flexWrap: 'wrap' }}>
          <span>● Live · Curated weekly</span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', minWidth: 40, margin: '0 24px' }} />
          <span>Scroll ↑ to explore</span>
        </div>

      </div>
    </>
  )
}
