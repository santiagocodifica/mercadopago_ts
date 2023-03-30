import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './features/auth'
import { ModalsContextProvider } from './features/modals'
import { CartContextProvider } from './features/cart'
import ScrollToTop from './utils/ScrollToTop'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AuthContextProvider>
        <CartContextProvider>
          <ModalsContextProvider>
            <App />
          </ModalsContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
