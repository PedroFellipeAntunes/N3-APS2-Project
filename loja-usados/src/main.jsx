import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // Mudei para o BrowserRouter aqui

import App from './App'; // Importando o componente App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App /> {/* Renderizando o App diretamente */}
    </BrowserRouter>
  </StrictMode>,
);