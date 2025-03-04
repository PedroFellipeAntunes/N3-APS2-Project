import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importações do React Router
import NotFound from './pages/not_found/NotFound.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} /> {/* Página principal */}
        <Route path="/*" element={<NotFound />} /> {/* Página not found */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
