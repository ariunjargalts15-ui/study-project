import { useState } from 'react'
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO.jsx'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    // TODO: wire up to Formspree, Web3Forms, or your own backend.
    // Example: fetch('https://formspree.io/f/xxxx', { method: 'POST', body: new FormData(e.target) })
    setSent(true)
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <>
      <SEO
        title="Contact"
        description="Contact AI Tools Hub — partnerships, tool submissions, feedback and general questions."
      />
      <section className="hero-mesh">
        <div className="container-site py-14 text-center">
          <span className="chip bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 text-brand-700 dark:text-brand-300">
            <MessageSquare className="w-3.5 h-3.5" /> Get in touch
          </span>
          <h1 className="mt-4 font-display font-extrabold text-3xl md:text-5xl tracking-tight text-slate-900 dark:text-white">
            Let&rsquo;s <span className="gradient-text">talk</span>.
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Tool submissions, partnerships, typo hunts, or just a hello — we read everything.
          </p>
        </div>
      </section>

      <section className="container-site mt-10 grid md:grid-cols-[1fr_320px] gap-8">
        <div className="card p-6 md:p-8">
          {sent ? (
            <div className="text-center py-10">
              <CheckCircle2 className="w-14 h-14 mx-auto text-emerald-500" />
              <h3 className="mt-4 font-display font-bold text-xl text-slate-900 dark:text-white">Message sent!</h3>
              <p className="text-slate-500 text-sm mt-1">We&rsquo;ll reply within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Your name" value={form.name} onChange={set('name')} required />
                <Input label="Email" type="email" value={form.email} onChange={set('email')} required />
              </div>
              <Input label="Subject" value={form.subject} onChange={set('subject')} required />
              <Field label="Message">
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={set('message')}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-brand-400"
                />
              </Field>
              <button type="submit" className="btn-primary">
                <Send className="w-4 h-4" /> Send message
              </button>
            </form>
          )}
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <div className="flex items-center gap-2 text-brand-600">
              <Mail className="w-4 h-4" /> <span className="font-semibold">Email</span>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">hello@aitoolshub.example</p>
          </div>
          <div className="card p-5">
            <h4 className="font-semibold text-slate-900 dark:text-white">Submit a tool</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Built something useful? Use the form with &ldquo;Tool submission&rdquo; in the subject.
            </p>
          </div>
        </aside>
      </section>
    </>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  )
}

function Input({ label, type = 'text', value, onChange, required }) {
  return (
    <Field label={label}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-brand-400"
      />
    </Field>
  )
}
