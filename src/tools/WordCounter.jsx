import { useMemo } from 'react'
import { FileText, Clock, AlignLeft, Hash } from 'lucide-react'

function analyze(text) {
  const trimmed = text.trim()
  if (!trimmed) return { words: 0, chars: 0, charsNoSpace: 0, sentences: 0, paragraphs: 0, readingTime: 0, grade: '' }

  const words = trimmed.split(/\s+/).filter(Boolean).length
  const chars = text.length
  const charsNoSpace = text.replace(/\s/g, '').length
  const sentences = (trimmed.match(/[.!?]+/g) || []).length || 1
  const paragraphs = trimmed.split(/\n{2,}/).filter(Boolean).length || 1
  const readingTime = Math.ceil(words / 200)

  // Flesch-Kincaid grade level (rough)
  const syllables = trimmed
    .toLowerCase()
    .replace(/[^a-z]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .reduce((sum, w) => sum + countSyllables(w), 0)

  const avgWordsPerSentence = words / sentences
  const avgSyllablesPerWord = syllables / words
  const fk = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59
  const grade = fk < 6 ? 'Very easy' : fk < 10 ? 'Easy' : fk < 14 ? 'Moderate' : 'Advanced'

  return { words, chars, charsNoSpace, sentences, paragraphs, readingTime, grade }
}

function countSyllables(word) {
  word = word.toLowerCase()
  if (word.length <= 3) return 1
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '')
  const m = word.match(/[aeiouy]{1,2}/g)
  return m ? m.length : 1
}

export default function WordCounter({ text, onChange }) {
  const stats = useMemo(() => analyze(text || ''), [text])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Paste or type your text
        </label>
        <textarea
          value={text || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={12}
          placeholder="Start typing or paste your text here…"
          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-brand-400 resize-none text-sm"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-brand-600" /> Text Analysis
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: AlignLeft, label: 'Words', value: stats.words.toLocaleString(), color: 'text-brand-600' },
            { icon: Hash, label: 'Characters', value: stats.chars.toLocaleString(), color: 'text-purple-600' },
            { icon: Hash, label: 'No spaces', value: stats.charsNoSpace.toLocaleString(), color: 'text-indigo-600' },
            { icon: AlignLeft, label: 'Sentences', value: stats.sentences.toLocaleString(), color: 'text-teal-600' },
            { icon: AlignLeft, label: 'Paragraphs', value: stats.paragraphs.toLocaleString(), color: 'text-cyan-600' },
            { icon: Clock, label: 'Read time', value: stats.readingTime ? `~${stats.readingTime} min` : '—', color: 'text-rose-600' },
          ].map((s) => (
            <div key={s.label} className="card p-4">
              <s.icon className={`w-4 h-4 ${s.color} mb-1`} />
              <div className="font-bold text-xl text-slate-900 dark:text-white">{s.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>

        {stats.words > 0 && (
          <div className="card p-4">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Readability</div>
            <div className="font-semibold text-slate-900 dark:text-white">{stats.grade}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Based on Flesch-Kincaid grade level formula
            </p>
          </div>
        )}

        {stats.words === 0 && (
          <div className="card p-6 text-center text-slate-400 text-sm">
            Stats will appear as you type.
          </div>
        )}
      </div>
    </div>
  )
}
