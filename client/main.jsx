import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/src/Stylesheets/index.css'
import App from '/src/App.jsx' // Corrected the import path

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
