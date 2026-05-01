import { useState } from 'react'
import {
  Wand2, Tag, BookOpen, DollarSign, FileText, Timer, Shield, Palette,
  Lock, Check, Search, Zap, RotateCcw, X,
} from 'lucide-react'
import SEO from '../components/SEO.jsx'
import AdSlot from '../components/AdSlot.jsx'
import PremiumModal from '../components/PremiumModal.jsx'
import PaymentModal from '../components/PaymentModal.jsx'
import PromptGenerator from '../tools/PromptGenerator.jsx'
import BusinessNameGenerator from '../tools/BusinessNameGenerator.jsx'
import StudyPlanner from '../tools/StudyPlanner.jsx'
import IncomeCalculator from '../tools/IncomeCalculator.jsx'
import WordCounter from '../tools/WordCounter.jsx'
import PomodoroTimer from '../tools/PomodoroTimer.jsx'
import PasswordChecker from '../tools/PasswordChecker.jsx'
import ColorPalette from '../tools/ColorPalette.jsx'
import { premiumTools } from '../data/premiumTools.js'
import { usePro } from '../context/ProContext.jsx'

/* ─── Free tool definitions ───────────────────────────────────── */
const FREE_TOOLS = [
  { id: 'prompt',   label: 'Prompt Generator',     icon: Wand2,      emoji: '🧠', color: 'from-violet-500 to-purple-600',  desc: 'Build perfect AI prompts in seconds',   category: 'free' },
  { id: 'name',     label: 'Business Name Gen.',   icon: Tag,        emoji: '🏷️', color: 'from-pink-500 to-rose-600',       desc: 'Generate creative business names',      category: 'free' },
  { id: 'study',    label: 'Study Planner',        icon: BookOpen,   emoji: '📚', color: 'from-blue-500 to-indigo-600',     desc: 'Create a structured study schedule',    category: 'study' },
  { id: 'income',   label: 'Income Calculator',    icon: DollarSign, emoji: '💰', color: 'from-emerald-500 to-teal-600',    desc: 'Project your online revenue streams',   category: 'business' },
  { id: 'word',     label: 'Word Counter',         icon: FileText,   emoji: '📝', color: 'from-amber-500 to-orange-600',    desc: 'Analyze words, chars, readability',     category: 'free' },
  { id: 'pomodoro', label: 'Pomodoro Timer',       icon: Timer,      emoji: '⏱️', color: 'from-red-500 to-rose-600',        desc: 'Focus in 25-min sessions with breaks',  category: 'study' },
  { id: 'password', label: 'Password Checker',     icon: Shield,     emoji: '🔐', color: 'from-slate-500 to-slate-700',     desc: 'Check password strength instantly',     category: 'free' },
  { id: 'color',    label: 'Color Palette',        icon: Palette,    emoji: '🎨', color: 'from-cyan-500 to-sky-600',        desc: 'Generate beautiful color palettes',     category: 'free' },
]

const CATEGORIES = [
  { id: 'all',      label: 'All Tools' },
  { id: 'free',     label: 'Free' },
  { id: 'study',    label: 'Study' },
  { id: 'business', label: 'Business' },
  { id: 'career',   label: 'Career' },
  { id: 'website',  label: 'Website' },
]

/* ─── Free tool card ──────────────────────────────────────────── */
function FreeToolCard({ tool, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group w-full rounded-2xl overflow-hidden border text-left transition-all duration-200
        ${isActive
          ? 'border-brand-500/60 shadow-lg shadow-brand-900/30 -translate-y-0.5'
          : 'border-white/8 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30'}`}
    >
      <div className={`h-16 bg-gradient-to-br ${tool.color} flex items-center justify-center relative`}>
        <span className="text-3xl drop-shadow">{tool.emoji}</span>
        {isActive && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="text-xs font-semibold text-white/90 bg-black/30 px-2 py-0.5 rounded-full">Active</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-slate-900/80">
        <div className={`font-semibold text-xs leading-tight transition-colors ${isActive ? 'text-brand-300' : 'text-white group-hover:text-brand-300'}`}>
          {tool.label}
        </div>
        <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{tool.desc}</div>
        <div className="mt-2 text-[10px] text-emerald-400 font-medium flex items-center gap-1">
          <Check className="w-2.5 h-2.5" /> Free
        </div>
      </div>
    </button>
  )
}

/* ─── Premium tool card ───────────────────────────────────────── */
function PremiumToolCard({ tool, isPro, onOpenModal }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden border border-white/8 hover:border-brand-500/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 transition-all duration-200 cursor-pointer"
      onClick={() => !isPro && onOpenModal(tool)}
    >
      <div className={`h-16 bg-gradient-to-br ${tool.color} flex items-center justify-center relative`}>
        <span className="text-3xl drop-shadow">{tool.emoji}</span>
        {!isPro && (
          <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/40 grid place-items-center">
            <Lock className="w-3 h-3 text-white" />
          </div>
        )}
        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-black/30 text-white text-[9px] font-bold">
          PRO
        </div>
      </div>
      <div className="p-3 bg-slate-900/80">
        <div className="font-semibold text-xs text-white leading-tight group-hover:text-brand-300 transition-colors">
          {tool.name}
        </div>
        <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{tool.tagline}</div>
        {isPro ? (
          <div className="mt-2 text-[10px] text-emerald-400 font-medium flex items-center gap-1">
            <Check className="w-2.5 h-2.5" /> Unlocked
          </div>
        ) : (
          <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1 group-hover:text-brand-400 transition-colors">
            <Lock className="w-2.5 h-2.5" /> Unlock Pro
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Active tool renderer ────────────────────────────────────── */
function ActiveTool({ toolId, wordText, onWordChange }) {
  switch (toolId) {
    case 'prompt':   return <PromptGenerator />
    case 'name':     return <BusinessNameGenerator />
    case 'study':    return <StudyPlanner />
    case 'income':   return <IncomeCalculator />
    case 'word':     return <WordCounter text={wordText} onChange={onWordChange} />
    case 'pomodoro': return <PomodoroTimer />
    case 'password': return <PasswordChecker />
    case 'color':    return <ColorPalette />
    default:         return null
  }
}

/* ─── Main component ──────────────────────────────────────────── */
export default function FreeTools() {
  const [activeTool, setActiveTool]   = useState(FREE_TOOLS[0].id)
  const [wordText, setWordText]       = useState('')
  const [category, setCategory]       = useState('all')
  const [search, setSearch]           = useState('')
  const [modalTool, setModalTool]     = useState(null)
  const [paymentPlan, setPaymentPlan] = useState(null)
  const { isPro, reset: resetPro }    = usePro()

  const currentTool = FREE_TOOLS.find((t) => t.id === activeTool)

  const filteredFree = FREE_TOOLS.filter((t) => {
    const matchCat = category === 'all' || t.category === category
    const matchSearch = !search || t.label.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const filteredPremium = premiumTools.filter((t) => {
    const matchCat = category === 'all' || t.category === category
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.tagline.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const showFree    = filteredFree.length > 0
  const showPremium = filteredPremium.length > 0

  return (
    <>
      <SEO
        title="AI Tools Hub — Free & Premium Tools for Work, Study & Business"
        description="Access 8 free tools and 11 premium AI tools. Prompt Generator, Word Counter, Pomodoro Timer, AI Resume Builder, SEO Checker, and more. No signup required for free tools."
        url="/free-tools"
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
      <section className="hero-premium relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-brand-600/15 rounded-full blur-3xl" />
        <div className="container-site relative pt-14 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs mb-5">
            <Zap className="w-3.5 h-3.5 text-brand-400" />
            {isPro ? 'Pro Access Active — All tools unlocked' : '8 free tools + 11 premium tools'}
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight">
            AI Tools Hub
          </h1>
          <p className="mt-3 text-slate-400 max-w-lg mx-auto">
            Free tools run instantly in your browser. Premium tools unlock advanced AI capabilities.
          </p>

          {/* Search */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools…"
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-brand-500/50 text-sm transition"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category filter */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all
                  ${category === c.id
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/40'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TOP AD ═══════════════ */}
      {/*
        ====================================================================
        GOOGLE ADSENSE — TOP BANNER
        Replace AdSlot with your live <ins> ad tag once approved.
        ====================================================================
      */}
      <div className="container-site mt-4">
        <AdSlot variant="banner" />
      </div>

      {/* ═══════════════ FREE TOOLS GRID ═══════════════ */}
      {showFree && (
        <section className="container-site mt-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-700/30 text-emerald-400 text-xs font-medium">
              <Check className="w-3 h-3" /> Free Tools
            </div>
            <span className="text-slate-600 text-xs">{filteredFree.length} tools</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {filteredFree.map((tool) => (
              <FreeToolCard
                key={tool.id}
                tool={tool}
                isActive={activeTool === tool.id}
                onClick={() => {
                  setActiveTool(tool.id)
                  setTimeout(() => {
                    document.getElementById('tool-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }, 50)
                }}
              />
            ))}
          </div>

          {/* Active Tool Panel */}
          {currentTool && filteredFree.some((t) => t.id === activeTool) && (
            <div id="tool-panel" className="mt-6">
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur overflow-hidden">
                {/* Tool header */}
                <div className={`px-6 py-4 bg-gradient-to-r ${currentTool.color} flex items-center gap-3`}>
                  <span className="text-3xl">{currentTool.emoji}</span>
                  <div>
                    <h2 className="font-display font-bold text-lg text-white">{currentTool.label}</h2>
                    <p className="text-white/70 text-xs">{currentTool.desc}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 text-white text-xs font-medium">
                    <Check className="w-3 h-3" /> Free Tool
                  </div>
                </div>

                {/* Tool content */}
                <div className="p-6 md:p-8">
                  <ActiveTool
                    toolId={activeTool}
                    wordText={wordText}
                    onWordChange={setWordText}
                  />
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ═══════════════ MID AD ═══════════════ */}
      {/*
        ====================================================================
        GOOGLE ADSENSE — MID-CONTENT AD
        ====================================================================
      */}
      <div className="container-site mt-10">
        <AdSlot variant="in-article" />
      </div>

      {/* ═══════════════ PREMIUM TOOLS ═══════════════ */}
      {showPremium && (
        <section className="container-site mt-12">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/40 border border-brand-700/30 text-brand-300 text-xs font-medium">
                <Lock className="w-3 h-3" /> Premium Tools
              </div>
              <span className="text-slate-600 text-xs">{filteredPremium.length} tools</span>
            </div>
            {!isPro && (
              <a
                href="/#pricing"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 text-white text-xs font-semibold transition hover:from-brand-500 hover:to-violet-500 shadow-lg shadow-brand-900/30"
              >
                <Zap className="w-3.5 h-3.5" /> Unlock All — $19.99
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredPremium.map((tool) => (
              <PremiumToolCard
                key={tool.id}
                tool={tool}
                isPro={isPro}
                onOpenModal={setModalTool}
              />
            ))}
          </div>

          {!isPro && (
            <div className="mt-6 rounded-2xl border border-brand-700/25 bg-gradient-to-br from-brand-900/25 to-violet-900/15 p-6 flex flex-col sm:flex-row items-center gap-4">
              <div className="text-3xl">🔓</div>
              <div className="flex-1 text-center sm:text-left">
                <div className="font-semibold text-white text-sm">Unlock all {filteredPremium.length > 5 ? 11 : filteredPremium.length} premium tools for $19.99</div>
                <div className="text-xs text-slate-500 mt-1">One-time payment · Lifetime access · 7-day money-back guarantee</div>
              </div>
              <a
                href="/#pricing"
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white text-sm font-semibold transition shadow-lg"
              >
                <Zap className="w-4 h-4" /> Get Pro
              </a>
            </div>
          )}
        </section>
      )}

      {/* No results */}
      {!showFree && !showPremium && (
        <div className="container-site mt-16 text-center py-12">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="font-semibold text-white text-lg">No tools found for "{search}"</h3>
          <p className="text-slate-500 text-sm mt-2">Try a different keyword or clear the search.</p>
          <button onClick={() => { setSearch(''); setCategory('all') }} className="mt-4 btn-secondary text-sm">
            Clear filters
          </button>
        </div>
      )}

      {/* ═══════════════ TESTING / PRO CONTROLS ═══════════════ */}
      <section className="container-site mt-16 mb-4">
        <div className="rounded-2xl border border-dashed border-white/10 p-5 text-center">
          <div className="text-xs text-slate-600 mb-3 uppercase tracking-wider">Testing Controls</div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${isPro ? 'bg-emerald-900/30 border-emerald-700/30 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
              Status: {isPro ? '✓ Pro Access Active' : 'Free Plan'}
            </div>
            {isPro && (
              <button
                onClick={resetPro}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-red-900/30 border border-red-700/30 text-red-400 hover:bg-red-900/50 transition"
              >
                <RotateCcw className="w-3 h-3" /> Reset Pro Access
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════ BOTTOM AD ═══════════════ */}
      {/*
        ====================================================================
        GOOGLE ADSENSE — BOTTOM BANNER
        ====================================================================
      */}
      <div className="container-site mb-4">
        <AdSlot variant="bottom" />
      </div>
    </>
  )
}
