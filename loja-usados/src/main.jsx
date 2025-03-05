import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importações do React Router

import Home from './pages/home/Home.jsx'
import NotFound from './pages/not_found/NotFound.jsx';
import Offer from './pages/offer/ViewOffer.jsx';
import Search from './pages/search/Search.jsx';
import App from "./App.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/2" element={<App />} />
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
