import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './features/auth'
import { ModalsContextProvider } from './features/modals'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ModalsContextProvider>
          <App />
        </ModalsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
