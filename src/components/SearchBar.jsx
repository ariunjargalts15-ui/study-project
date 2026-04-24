import { Search } from 'lucide-react'

/** Large search input used on Tools page + hero. */
export default function SearchBar({ value, onChange, placeholder = 'Search…', onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.(value)
      }}
      className="relative w-full"
    >
      <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-14 pr-32 py-4 rounded-full text-base
                   bg-white dark:bg-slate-900
                   ring-1 ring-slate-200 dark:ring-slate-700
                   shadow-soft focus:shadow-glow focus:ring-brand-400
                   outline-none transition"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary !py-2 !px-5"
      >
        Search
      </button>
    </form>
  )
}
