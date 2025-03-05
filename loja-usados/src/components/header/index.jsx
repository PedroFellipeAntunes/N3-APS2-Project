import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';

export const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // Para armazenar o valor da pesquisa

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Redireciona para a página de busca com o parâmetro product_name
      navigate(`/search?product_name=${searchQuery}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (searchQuery.trim()) {
        e.preventDefault(); // Previne a criação de uma nova linha se a pesquisa não estiver vazia
        handleSearch(); // Chama a função de pesquisa
      } else {
        e.preventDefault(); // Previne a criação de nova linha caso o campo esteja vazio
      }
    }
  };

  return (
    <header>
      {/* Link que leva à página inicial */}
      <Link to="/" className="logo-link">
        <h1>PC-Segunda</h1>
      </Link>
      <div className="search_bar">
        <textarea
          name="search_area"
          id="search_area"
          placeholder="Pesquise aqui"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Atualiza o valor da pesquisa
          onKeyDown={handleKeyDown} // Intercepta a tecla "Enter"
        ></textarea>
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