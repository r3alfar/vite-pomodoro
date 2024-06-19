import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'
// import SimpleNavbar from './components/custom/simple-navbar.tsx'
import MyNavbar from './components/navbar/myNavbar.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      {/* <SimpleNavbar /> */}
      <MyNavbar />
      <App />
    </ThemeProvider>

  </React.StrictMode>,
)
