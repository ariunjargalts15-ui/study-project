import { createContext, useContext, useState } from 'react'

const ProContext = createContext(null)
const KEY = 'sat_pro_access'

export function ProProvider({ children }) {
  const [isPro, setIsPro] = useState(() => {
    try { return localStorage.getItem(KEY) === 'true' } catch { return false }
  })

  const unlock = () => {
    try { localStorage.setItem(KEY, 'true') } catch {}
    setIsPro(true)
  }

  const reset = () => {
    try { localStorage.removeItem(KEY) } catch {}
    setIsPro(false)
  }

  return (
    <ProContext.Provider value={{ isPro, unlock, reset }}>
      {children}
    </ProContext.Provider>
  )
}

export const usePro = () => useContext(ProContext)
