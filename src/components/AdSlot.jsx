/**
 * ============================================================================
 * GOOGLE ADSENSE SLOT
 * ============================================================================
 * This is the component where your live AdSense <ins> block will live.
 *
 * HOW TO GO LIVE:
 *   1. Get approved for AdSense and copy your publisher ID (ca-pub-XXXX...).
 *   2. Uncomment the <script async> tag in index.html and paste your ID.
 *   3. In the JSX below, replace the "placeholder" block with the commented-out
 *      <ins className="adsbygoogle"> snippet, and paste your ad unit slot ID.
 *   4. Add the useEffect hook to push (adsbygoogle = window.adsbygoogle || []).push({})
 *      so each slot actually loads an ad.
 *
 * Variants:
 *   variant="banner"    - top-of-page horizontal ad
 *   variant="sidebar"   - desktop sidebar rectangle
 *   variant="in-article"- inside article body
 *   variant="bottom"    - footer / end-of-content
 * ============================================================================
 */
export default function AdSlot({ variant = 'banner', className = '' }) {
  const dims = {
    banner:     { h: 'h-24 md:h-28', label: 'Top Banner' },
    sidebar:    { h: 'h-64',          label: 'Sidebar' },
    'in-article': { h: 'h-28 md:h-36', label: 'In-Article' },
    bottom:     { h: 'h-24 md:h-28', label: 'Bottom' },
  }[variant] || { h: 'h-24', label: 'Ad' }

  return (
    <aside
      aria-label={`${dims.label} advertisement placeholder`}
      className={`
        relative overflow-hidden rounded-2xl border border-dashed
        border-slate-300 dark:border-slate-700
        bg-gradient-to-br from-slate-50 to-slate-100
        dark:from-slate-900 dark:to-slate-800
        flex items-center justify-center
        ${dims.h} ${className}
      `}
    >
      {/*
        ====== REPLACE EVERYTHING BELOW WITH YOUR LIVE ADSENSE <ins> TAG =======
        Example (responsive ad unit):

          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="auto"
               data-full-width-responsive="true" />

          // and in a useEffect:
          useEffect(() => {
            try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch {}
          }, [])
        ========================================================================
      */}
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Advertisement
        </div>
        <div className="mt-1 font-semibold text-slate-500 dark:text-slate-400 text-sm">
          Google AdSense Ad Slot · <span className="text-brand-500">{dims.label}</span>
        </div>
      </div>
    </aside>
  )
}
