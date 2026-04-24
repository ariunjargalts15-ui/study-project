import { createContext, useContext, useEffect, useState } from 'react'

// Store user favorites (tools + articles) in localStorage.
// Shape: { tools: string[], articles: string[] }
const FavoritesContext = createContext(null)
const STORAGE_KEY = 'aihub.favorites'

export function FavoritesProvider({ children }) {
  const [favs, setFavs] = useState({ tools: [], articles: [] })

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setFavs(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs))
  }, [favs])

  const toggle = (type, id) => {
    setFavs((prev) => {
      const list = prev[type] || []
      const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
      return { ...prev, [type]: next }
    })
  }

  const isFav = (type, id) => (favs[type] || []).includes(id)

  return (
    <FavoritesContext.Provider value={{ favs, toggle, isFav }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
