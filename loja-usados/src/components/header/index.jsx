import { Link } from 'react-router-dom';
import './index.css';

export const Header = () => {
  return (
    <header>
      {/* Link que leva à página inicial */}
      <Link to="/" className="logo-link">
        <h1>PC-Segunda</h1>
      </Link>
      <div className="search_bar">
        <textarea name="search_area" id="search_area" placeholder="Pesquise aqui"></textarea>
        <button className="search_button">Pesquisar</button>
      </div>
      <div className="buttons">
        {/* <Link to="/cart"> */}
          <button className="cart_button">Carrinho</button>
        {/* </Link> */}
        {/* <Link to="/user"> */}
          <button className="user_button">Usuário</button>
        {/* </Link> */}
      </div>
    </header>
  );
};