import { useState } from 'react'
import { Mail, CheckCircle2 } from 'lucide-react'

/**
 * Newsletter signup.
 * TODO: wire up to ConvertKit / Mailchimp / Buttondown etc. For now, this just
 * fake-submits and shows a success state. Replace `handleSubmit` with a fetch()
 * to your provider's API.
 */
export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    // TODO: POST to your newsletter provider here
    setDone(true)
  }

  return (
    <section className="container-site my-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-violet-600 to-accent-500 px-6 py-12 md:p-14 shadow-glow">
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/10 rounded-full blur-2xl"></div>
        <div className="relative max-w-2xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2 chip bg-white/15 text-white backdrop-blur">
            <Mail className="w-3.5 h-3.5" /> Weekly newsletter
          </div>
          <h2 className="mt-4 font-display font-extrabold text-3xl md:text-4xl">
            One email. Five fresh AI tools. Every Friday.
          </h2>
          <p className="mt-3 text-white/80">
            Join <strong>20,000+</strong> builders and creators getting the best new AI tools,
            income ideas and productivity hacks — curated, never spammy.
          </p>

          {done ? (
            <div className="mt-6 flex items-center justify-center gap-2 text-white font-medium">
              <CheckCircle2 className="w-5 h-5" /> Thanks — we&rsquo;ll be in your inbox Friday.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@studyaitools.biz"
                className="flex-1 px-5 py-3 rounded-full text-slate-900 outline-none ring-2 ring-white/40 focus:ring-white"
              />
              <button type="submit" className="btn bg-white text-brand-700 hover:bg-slate-100 !px-6 !py-3">
                Subscribe
              </button>
            </form>
          )}

          <p className="mt-3 text-xs text-white/60">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  )
}
