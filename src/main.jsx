import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import LoginProvider from './Contexts/LoginContext.jsx'
import HomeProvider from './Contexts/HomeContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>

        <LoginProvider>
              <HomeProvider>
                <App />
              </HomeProvider>
      </LoginProvider>
  </BrowserRouter>

    
  
)
