import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';

export const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

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
        <button className="cart_button">Carrinho</button>
        <button className="user_button">Usuário</button>
      </div>
    </header>
  );
};
