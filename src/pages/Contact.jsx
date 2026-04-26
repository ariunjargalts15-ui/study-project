import { useState } from 'react'
import { Mail, MessageSquare, Send, CheckCircle2, BookOpen, Wrench } from 'lucide-react'
import SEO from '../components/SEO.jsx'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    // Wire to Formspree, Web3Forms, or your backend:
    // fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: new FormData(e.target) })
    setSent(true)
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <>
      <SEO
        title="Contact Us"
        description="Contact StudyAI Tools — suggest a tool, report an error, ask a question, or explore partnership opportunities."
        url="/contact"
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
            Tool suggestions, partnership inquiries, corrections, or just a hello — we read and reply to everything.
          </p>
        </div>
      </section>

      <section className="container-site mt-10 grid md:grid-cols-[1fr_300px] gap-8 mb-16">
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
                <Input label="Email address" type="email" value={form.email} onChange={set('email')} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Subject
                </label>
                <select
                  value={form.subject}
                  onChange={set('subject')}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-brand-400"
                >
                  <option value="">Select a topic…</option>
                  <option>Tool suggestion</option>
                  <option>Partnership or collaboration</option>
                  <option>Report an error</option>
                  <option>Advertising inquiry</option>
                  <option>General question</option>
                  <option>Other</option>
                </select>
              </div>
              <Field label="Message">
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={set('message')}
                  required
                  placeholder="Tell us what you're thinking…"
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
            <div className="flex items-center gap-2 text-brand-600 mb-2">
              <Mail className="w-4 h-4" />
              <span className="font-semibold">Email</span>
            </div>
            <a
              href="mailto:hello@studyaitools.biz"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600"
            >
              hello@studyaitools.biz
            </a>
            <p className="mt-1 text-xs text-slate-400">Response within 48 hours</p>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-2 text-brand-600 mb-2">
              <Wrench className="w-4 h-4" />
              <span className="font-semibold">Suggest a tool</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Know a great AI tool for students we haven&rsquo;t covered? Use the form with &ldquo;Tool suggestion&rdquo; as the subject.
            </p>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-2 text-brand-600 mb-2">
              <BookOpen className="w-4 h-4" />
              <span className="font-semibold">Write for us</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              We welcome guest articles from educators, students, and AI enthusiasts. Reach out with your idea.
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

function Input({ label, type = 'text', value, onChange, required, placeholder }) {
  return (
    <Field label={label}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-brand-400"
      />
    </Field>
  )
}
