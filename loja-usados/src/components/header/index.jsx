import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';
import axios from 'axios';

export const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [userToken, setUserToken] = useState(null);

  // Verifique se existe um token de usuário
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUserToken(token);
    }
  }, []);

  const handleSearch = () => {
    // Sempre redireciona para a página de busca, mesmo se estiver vazio
    navigate(`/search?product_name=${searchQuery.trim()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Previne o comportamento padrão do Enter
      handleSearch();
    }
  };

  const handleLogout = () => {
    // Apaga o token do sessionStorage e redireciona para a Home
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = '';
    setUserToken(null);
    navigate('/');
  };

  return (
    <header>
      <Link to="/" className="logo-link">
        <h1>PC-Segunda</h1>
      </Link>
      <div className="search_bar">
        <input
          type="text"
          name="search_area"
          id="search_area"
          placeholder="Pesquise aqui"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search_button" onClick={handleSearch}>
          Pesquisar
        </button>
      </div>
      <div className="buttons">
        {userToken ? (
          <>
            <Link to="/create_offer">
              <button className="cart_button">Criar Oferta</button>
            </Link>
            <Link to="/account">
              <button className="account_button">Conta</button>
            </Link>
            <button className="logout_button" onClick={handleLogout}>
              Sair
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="login_button">Login</button>
          </Link>
        )}
      </div>
    </header>
  );
};
