import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { Analytics } from "@vercel/analytics/react"
import './design-tokens.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <App />
            <Analytics />
          </BrowserRouter>
        </FavoritesProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
)