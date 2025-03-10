import { Routes, Route } from "react-router-dom"; // Corrigido para importar diretamente no App
import './App.css';

import Home from './pages/home/Home.jsx';
import NotFound from './pages/not_found/NotFound.jsx';
import Offer from './pages/offer/ViewOffer.jsx';
import Account from './pages/account/Account.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import Search from './pages/search/Search.jsx';
import CreateOffer from './pages/offer/CreateOffer.jsx';

import { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    let token = localStorage.getItem("user");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/offer/:id" element={<Offer />} />
      <Route path="/create_offer" element={<CreateOffer />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default App;