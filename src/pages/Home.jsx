import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles, ArrowRight, Zap, ChevronDown, ChevronUp, Check,
  Lock, Star, Wand2, BookOpen, Briefcase, Globe, Palette, GraduationCap,
  FileText, Timer, Shield
} from 'lucide-react'
import SEO from '../components/SEO.jsx'
import AdSlot from '../components/AdSlot.jsx'
import PremiumModal from '../components/PremiumModal.jsx'
import PaymentModal from '../components/PaymentModal.jsx'
import { premiumTools } from '../data/premiumTools.js'
import { usePro } from '../context/ProContext.jsx'

/* ─── Tool categories ─────────────────────────────────────────── */
const toolCategories = [
  { slug: 'free',    label: 'Free Tools',     emoji: '🆓', color: 'from-emerald-500 to-teal-600',    desc: '8 tools, no signup' },
  { slug: 'study',   label: 'Study Tools',    emoji: '📚', color: 'from-indigo-500 to-violet-600',   desc: 'Study smarter' },
  { slug: 'business',label: 'Business Tools', emoji: '💼', color: 'from-sky-500 to-blue-600',        desc: 'Grow your business' },
  { slug: 'career',  label: 'Career Tools',   emoji: '🎯', color: 'from-rose-500 to-pink-600',       desc: 'Land your next job' },
  { slug: 'website', label: 'Website Tools',  emoji: '🌐', color: 'from-amber-500 to-orange-600',    desc: 'Optimize your site' },
  { slug: 'creator', label: 'Creator Tools',  emoji: '✨', color: 'from-purple-500 to-fuchsia-600',  desc: 'Create content fast' },
]

/* ─── Free tools showcase ─────────────────────────────────────── */
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

/* ─── FAQ data ────────────────────────────────────────────────── */
const faqs = [
  {
    q: 'What is StudyAI Tools?',
    a: 'StudyAI Tools is a premium AI utility platform with free and pro tools for students, business owners, creators, and website builders. Use tools like the Study Planner, Prompt Generator, AI Resume Builder, SEO Checker, and more — all in one place.',
  },
  {
    q: 'Are the free tools really free?',
    a: 'Yes! All 8 basic tools are 100% free with no account required. Word Counter, Pomodoro Timer, Password Checker, Color Palette, Prompt Generator, Business Name Generator, Study Planner, and Income Calculator — always free.',
  },
  {
    q: "What's included in Pro?",
    a: 'Pro unlocks 11 premium tools: AI Resume Builder, Cover Letter Generator, Business Email Writer, Product Description Generator, Essay Checker, SEO Website Checker, AdSense Approval Checker, Meta Tag Generator, Invoice Generator, Import Profit Calculator, and Flashcard Generator.',
  },
  {
    q: 'How does the payment work?',
    a: 'The All Tools Lifetime plan is a one-time payment of $19.99 — no monthly fees, no subscriptions. You pay once and keep access forever. Single Tool access is $3.99 per tool.',
  },
  {
    q: 'Is my data private?',
    a: 'Yes. All free tools run entirely in your browser. No data is ever sent to our servers for free tools. Premium tools operate securely and we never sell or share your data.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Yes. We offer a 7-day money-back guarantee. If you\'re not satisfied, contact us at support@studyaitools.biz within 7 days of purchase for a full refund.',
  },
]

/* ─── Dashboard preview tools ─────────────────────────────────── */
const previewTools = [
  { emoji: '🧠', label: 'Prompt Gen', pro: false },
  { emoji: '📄', label: 'Resume AI', pro: true },
  { emoji: '⏱️', label: 'Pomodoro', pro: false },
  { emoji: '✉️', label: 'Email Writer', pro: true },
  { emoji: '📝', label: 'Word Counter', pro: false },
  { emoji: '🔍', label: 'SEO Checker', pro: true },
  { emoji: '🎨', label: 'Color Palette', pro: false },
  { emoji: '🧾', label: 'Invoice Gen', pro: true },
]

/* ─── FAQ Accordion ───────────────────────────────────────────── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white/8 rounded-2xl overflow-hidden glass-card">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
      >
        <span className="font-semibold text-white text-sm md:text-base group-hover:text-brand-300 transition-colors">
          {q}
        </span>
        {open
          ? <ChevronUp className="w-5 h-5 text-brand-400 flex-shrink-0" />
          : <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0 group-hover:text-slate-300 transition-colors" />
        }
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
          {a}
        </div>
      )}
    </div>
  )
}

/* ─── Premium Tool Card ───────────────────────────────────────── */
function PremiumCard({ tool, isPro, onOpenModal }) {
  return (
    <div
      className={`relative group rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer
        ${isPro
          ? 'border-white/10 hover:border-brand-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/30'
          : 'border-white/8 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40'}`}
      onClick={() => !isPro && onOpenModal(tool)}
    >
      {/* Gradient top */}
      <div className={`h-20 bg-gradient-to-br ${tool.color} relative`}>
        <div className="absolute inset-0 grid place-items-center text-3xl">{tool.emoji}</div>
        {!isPro && (
          <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 grid place-items-center">
            <Lock className="w-3.5 h-3.5 text-white" />
          </div>
        )}
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/30 backdrop-blur text-white text-[10px] font-bold">
          PRO
        </div>
      </div>
      {/* Body */}
      <div className="p-4 bg-slate-900/80">
        <h3 className="font-semibold text-white text-sm leading-snug">{tool.name}</h3>
        <p className="mt-1 text-xs text-slate-500 line-clamp-2">{tool.tagline}</p>
        {isPro ? (
          <span className="mt-3 inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
            <Check className="w-3 h-3" /> Unlocked
          </span>
        ) : (
          <span className="mt-3 inline-flex items-center gap-1 text-xs text-slate-500">
            <Lock className="w-3 h-3" /> Unlock with Pro
          </span>
        )}
      </div>
      {/* Locked overlay for non-pro */}
      {!isPro && (
        <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="px-3 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-semibold shadow-lg">
            View Pro Plan →
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Pricing Card ────────────────────────────────────────────── */
function PricingCard({ plan, featured, isPro, onPay }) {
  const alreadyPro = isPro && plan.planKey

  return (
    <div
      className={`relative rounded-3xl overflow-hidden transition-all
        ${featured
          ? 'border-2 border-brand-500/60 shadow-2xl shadow-brand-900/40 scale-[1.02]'
          : 'border border-white/10 hover:border-white/20'}`}
    >
      {featured && (
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/30 to-transparent pointer-events-none" />
      )}
      {featured && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-b-xl bg-gradient-to-r from-brand-600 to-violet-600 text-white text-xs font-bold shadow-lg">
            <Star className="w-3 h-3 fill-current" /> Most Popular
          </div>
        </div>
      )}
      <div className={`p-7 ${featured ? 'bg-slate-900' : 'bg-slate-900/60 glass-card'}`}>
        <div className="mb-6">
          <div className="text-sm font-medium text-slate-400 mb-1">{plan.name}</div>
          <div className="flex items-end gap-1">
            <span className="text-4xl font-display font-extrabold text-white">{plan.price}</span>
            {plan.period && <span className="text-slate-400 text-sm mb-1.5">{plan.period}</span>}
          </div>
          <p className="mt-2 text-sm text-slate-400">{plan.desc}</p>
        </div>

        <ul className="space-y-3 mb-7">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${featured ? 'text-brand-400' : 'text-slate-400'}`} />
              <span className="text-slate-300">{f}</span>
            </li>
          ))}
          {plan.missing?.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm opacity-40">
              <span className="w-4 h-4 flex-shrink-0 mt-0.5 text-center leading-4">✕</span>
              <span className="text-slate-500">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {plan.planKey ? (
          alreadyPro ? (
            <div className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-semibold text-emerald-400 border border-emerald-700/30 bg-emerald-900/20">
              <Check className="w-4 h-4" /> Already unlocked
            </div>
          ) : (
            <button
              onClick={() => onPay(plan.planKey)}
              className={`w-full py-3 rounded-2xl text-sm font-semibold transition-all
                ${featured
                  ? 'bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white shadow-lg shadow-brand-900/50'
                  : 'bg-white/8 hover:bg-white/12 text-white border border-white/10 hover:border-white/20'}`}
            >
              {plan.cta}
            </button>
          )
        ) : (
          <a
            href={plan.ctaHref}
            className="block w-full py-3 rounded-2xl text-sm font-semibold text-center bg-white/8 hover:bg-white/12 text-white border border-white/10 hover:border-white/20 transition-all"
          >
            {plan.cta}
          </a>
        )}
      </div>
    </div>
  )
}

/* ─── Main Component ──────────────────────────────────────────── */
export default function Home() {
  const [modalTool, setModalTool]     = useState(null)
  const [paymentPlan, setPaymentPlan] = useState(null) // 'lifetime' | 'single'
  const { isPro } = usePro()

  const plans = [
    {
      name: 'Free Plan',
      price: '$0',
      period: '/forever',
      desc: 'All basic tools, no signup needed.',
      planKey: null,
      cta: 'Get Started Free',
      ctaHref: '/free-tools',
      features: [
        'All 8 basic tools',
        'Prompt Generator',
        'Word Counter & Pomodoro',
        'Color Palette & Password Checker',
        'No account required',
      ],
      missing: ['Premium tools', 'Ad-free experience'],
    },
    {
      name: 'All Tools Lifetime',
      price: '$19.99',
      period: 'one-time',
      desc: 'Every tool, forever. Best value.',
      planKey: 'lifetime',
      cta: 'Unlock Everything →',
      features: [
        'All 8 free tools included',
        'AI Resume Builder',
        'Cover Letter Generator',
        'Business Email Writer',
        'SEO Website Checker',
        'Essay Checker & 6 more tools',
        'Lifetime access — no renewals',
        'Priority support',
      ],
    },
    {
      name: 'Single Pro Tool',
      price: '$3.99',
      period: '/tool',
      desc: 'Try any one premium tool.',
      planKey: 'single',
      cta: 'Choose a Tool',
      features: [
        'Unlock any ONE premium tool',
        'Lifetime access to that tool',
        'Priority support',
      ],
      missing: ['Other premium tools locked'],
    },
  ]

  return (
    <>
      <SEO
        title="StudyAI Tools — One place for smart AI tools"
        description="Create resumes, study plans, business emails, SEO reports, prompts, and more in seconds. Free and premium AI tools for work, study, and business."
        url="/"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'StudyAI Tools',
          url: 'https://studyaitools.biz',
          description: 'Premium AI tools platform for students, business owners, and creators.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://studyaitools.biz/tools?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }}
      />

      {/* Premium feature modal */}
      {modalTool && (
        <PremiumModal tool={modalTool} onClose={() => setModalTool(null)} onUpgrade={setPaymentPlan} />
      )}

      {/* PayPal payment modal */}
      {paymentPlan && (
        <PaymentModal planKey={paymentPlan} onClose={() => setPaymentPlan(null)} />
      )}

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden hero-premium">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl" />

        <div className="container-site relative pt-20 pb-16 md:pt-28 md:pb-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/30 bg-brand-900/30 text-brand-300 text-xs font-medium mb-8 backdrop-blur">
            <Sparkles className="w-3.5 h-3.5" />
            8 free tools + 11 premium tools · no signup needed
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.05]">
            One place for<br />
            <span className="gradient-text">smart AI tools</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            Create resumes, study plans, business emails, SEO reports, prompts, and more in seconds.
            Free tools for everyone. Pro tools for those who want more.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/free-tools"
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold text-base transition-all shadow-xl shadow-brand-900/50 hover:shadow-brand-700/50 hover:-translate-y-0.5"
            >
              <Zap className="w-5 h-5" /> Start Free
            </Link>
            <button
              onClick={() => document.getElementById('premium-tools')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition-all backdrop-blur hover:-translate-y-0.5"
            >
              View Premium Tools <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Stats bar */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { n: '8+', l: 'Free Tools' },
              { n: '11+', l: 'Premium Tools' },
              { n: '200k+', l: 'Monthly Users' },
            ].map((s) => (
              <div key={s.l} className="py-4 px-3 rounded-2xl glass-card border border-white/8 text-center">
                <div className="font-display font-extrabold text-2xl text-white">{s.n}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Dashboard preview */}
          <div className="relative max-w-4xl mx-auto mt-16">
            <div className="absolute -inset-4 bg-brand-600/10 blur-3xl rounded-3xl" />
            <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/60">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-white/8">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="flex-1 mx-4 h-6 rounded-full bg-slate-700/80 flex items-center px-3 gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-500/60" />
                  <span className="text-xs text-slate-400">studyaitools.biz/tools</span>
                </div>
              </div>
              {/* Content */}
              <div className="p-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {previewTools.map((t, i) => (
                    <div
                      key={i}
                      className={`rounded-xl p-3.5 flex flex-col gap-2 border transition
                        ${t.pro
                          ? 'bg-gradient-to-br from-brand-900/40 to-violet-900/30 border-brand-700/30'
                          : 'bg-slate-800/80 border-white/8'}`}
                    >
                      <div className="text-2xl">{t.emoji}</div>
                      <div className="text-xs font-medium text-slate-300 leading-tight">{t.label}</div>
                      {t.pro
                        ? <span className="text-[10px] font-bold text-brand-400 flex items-center gap-1"><Lock className="w-2.5 h-2.5" /> PRO</span>
                        : <span className="text-[10px] text-emerald-400 flex items-center gap-1"><Check className="w-2.5 h-2.5" /> FREE</span>
                      }
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TOP BANNER AD ═══════════════ */}
      {/*
        ====================================================================
        GOOGLE ADSENSE — TOP BANNER
        Replace the AdSlot component with your live <ins> tag once approved.
        Your publisher ID (ca-pub-7554165066835044) is already in index.html.
        Paste your ad unit slot code here:
        ====================================================================
      */}
      <div className="container-site mt-8">
        <AdSlot variant="banner" />
      </div>

      {/* ═══════════════ CATEGORIES ═══════════════ */}
      <section className="container-site mt-20">
        <div className="text-center mb-10">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white">
            Tools for every goal
          </h2>
          <p className="mt-3 text-slate-400">Pick a category and start building, studying, or growing.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {toolCategories.map((c) => (
            <Link
              key={c.slug}
              to="/free-tools"
              className={`group relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br ${c.color} border border-white/10 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300`}
            >
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
              <div className="text-2xl mb-3">{c.emoji}</div>
              <div className="font-display font-bold text-sm text-white leading-tight">{c.label}</div>
              <div className="text-white/60 text-xs mt-1">{c.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════ FREE TOOLS ═══════════════ */}
      <section className="container-site mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/30 border border-emerald-700/30 text-emerald-400 text-xs font-medium mb-3">
              <Check className="w-3.5 h-3.5" /> 100% Free · No Signup
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white">
              Free tools you can use right now
            </h2>
            <p className="mt-2 text-slate-400">Eight free browser tools. No account. No credit card. Just use them.</p>
          </div>
          <Link
            to="/free-tools"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 text-white text-sm font-medium transition whitespace-nowrap"
          >
            Open All Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {freeToolsShowcase.map((t) => (
            <Link
              key={t.id}
              to="/free-tools"
              className="group relative rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 transition-all duration-300"
            >
              <div className={`h-24 bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                <span className="text-4xl drop-shadow">{t.emoji}</span>
              </div>
              <div className="p-4 bg-slate-900/80">
                <div className="font-semibold text-sm text-white group-hover:text-brand-300 transition-colors">{t.label}</div>
                <div className="text-xs text-emerald-400 mt-1 font-medium">Free →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════ MIDDLE AD ═══════════════ */}
      {/*
        ====================================================================
        GOOGLE ADSENSE — MID-CONTENT AD
        Replace the AdSlot component below with your live <ins> ad unit.
        ====================================================================
      */}
      <div className="container-site mt-16">
        <AdSlot variant="in-article" />
      </div>

      {/* ═══════════════ PREMIUM TOOLS ═══════════════ */}
      <section id="premium-tools" className="container-site mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-900/40 border border-brand-700/30 text-brand-300 text-xs font-medium mb-3">
              <Lock className="w-3.5 h-3.5" /> Pro Exclusive
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white">
              Premium tools — unlock more power
            </h2>
            <p className="mt-2 text-slate-400">11 advanced tools for serious work. Unlock once, use forever.</p>
          </div>
          <button
            onClick={() => setPaymentPlan('lifetime')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white text-sm font-semibold transition whitespace-nowrap shadow-lg shadow-brand-900/40"
          >
            <Zap className="w-4 h-4" /> Unlock All — $19.99
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {premiumTools.map((tool) => (
            <PremiumCard
              key={tool.id}
              tool={tool}
              isPro={isPro}
              onOpenModal={setModalTool}
            />
          ))}
        </div>

        {!isPro && (
          <div className="mt-8 rounded-3xl border border-brand-700/30 bg-gradient-to-br from-brand-900/30 to-violet-900/20 p-8 text-center">
            <div className="text-3xl mb-3">🔓</div>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              Unlock all 11 premium tools for just $19.99
            </h3>
            <p className="text-slate-400 text-sm mb-5 max-w-md mx-auto">
              One-time payment. Lifetime access. No subscriptions, no hidden fees.
            </p>
            <button
              onClick={() => setPaymentPlan('lifetime')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold transition-all shadow-lg shadow-brand-900/50"
            >
              <Zap className="w-5 h-5" /> Unlock Now — $19.99
            </button>
          </div>
        )}
      </section>

      {/* ═══════════════ PRICING ═══════════════ */}
      <section id="pricing" className="container-site mt-28">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs font-medium mb-4 backdrop-blur">
            Simple, transparent pricing
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white">
            Start free. Upgrade when ready.
          </h2>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto">
            No subscriptions. No tricks. Pay once for lifetime access to all premium tools.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-center">
          <PricingCard plan={plans[0]} featured={false} isPro={isPro} onPay={setPaymentPlan} />
          <PricingCard plan={plans[1]} featured={true}  isPro={isPro} onPay={setPaymentPlan} />
          <PricingCard plan={plans[2]} featured={false} isPro={isPro} onPay={setPaymentPlan} />
        </div>

        <p className="text-center mt-8 text-xs text-slate-600">
          7-day money-back guarantee · Secure payment · Instant access
        </p>
      </section>

      {/* ═══════════════ WHY US ═══════════════ */}
      <section className="container-site mt-24">
        <div className="rounded-3xl border border-white/8 glass-card p-8 md:p-14">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white text-center mb-10">
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
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/3 transition group">
                <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{x.e}</span>
                <div>
                  <div className="font-semibold text-white text-sm mb-1">{x.t}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{x.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section id="faq" className="container-site mt-24">
        <div className="text-center mb-10">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-slate-400">Everything you need to know about StudyAI Tools.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* ═══════════════ BOTTOM CTA ═══════════════ */}
      <section className="container-site mt-24">
        <div className="relative overflow-hidden rounded-3xl border border-brand-700/30 p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 via-violet-900/30 to-slate-900/60" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
              Ready to work smarter?
            </h2>
            <p className="text-slate-300 max-w-md mx-auto mb-8 text-lg">
              Join 200,000+ users who use StudyAI Tools every month.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/free-tools"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold text-base transition-all shadow-xl shadow-brand-900/50 hover:-translate-y-0.5"
              >
                <Zap className="w-5 h-5" /> Start Free Now
              </Link>
              <button
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition-all hover:-translate-y-0.5"
              >
                View Pro Plans
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ BOTTOM BANNER AD ═══════════════ */}
      {/*
        ====================================================================
        GOOGLE ADSENSE — BOTTOM BANNER
        Replace the AdSlot component with your live <ins> ad unit code.
        ====================================================================
      */}
      <div className="container-site mt-16 mb-4">
        <AdSlot variant="bottom" />
      </div>
    </>
  )
}
