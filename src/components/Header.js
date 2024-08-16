import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import '../Css/styleHeader.css'

function Header() {
  return (
    <header className="site-header">
      <div className="header-content">
        <div className="logo-container">
          <img src="/logo.png" alt="Logotipo do Site" className="site-logo" />
        </div>
        <div className="header-right">
          <Menu />
          <Link to="/Profile" className="header-profile-link">Meu Perfil</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
