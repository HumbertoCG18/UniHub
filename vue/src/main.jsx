import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Importa seus estilos globais e do Tailwind
import App from './App.jsx' // Importa seu componente principal

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)