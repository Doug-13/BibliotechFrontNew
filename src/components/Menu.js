import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Css/styleMenu.css';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="menu-toggle-button" onClick={toggleMenu}>
        ☰
      </button>

      <nav className={`menu-container ${isOpen ? 'open' : ''}`}>
        <ul className="menu-list">
           <li className="menu-item"><Link to="/Home" onClick={toggleMenu}>Início</Link></li>
          <li className="menu-item"><Link to="/community" onClick={toggleMenu}>Comunidade</Link></li>
          <li className="menu-item"><Link to="/AddBook" onClick={toggleMenu}>Cadastrar Livros</Link></li>
          <li className="menu-item"><Link to="/Profile" onClick={toggleMenu}>Perfil</Link></li>
          {/* <!-- Adicionar outros links conforme novas seções forem criadas --> */}
        </ul>
      </nav>

      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
}

export default Menu;
