 import React, { useState } from 'react';
 import Header from '../components/Header';
 import Menu from '../components/Menu';
 import Footer from '../components/Footer';

 import '../Css/styleComunnity.css';
import DecorativeBar from '../components/Perfumaria';

function Community() {

  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCreateCommunity = () => {
    // Lógica para criar uma nova comunidade
    setMenuOpen(false); // Fecha o menu ao selecionar uma opção
  };

  const handleViewMyCommunities = () => {
    // Lógica para visualizar comunidades que o usuário participa
    setMenuOpen(false); // Fecha o menu ao selecionar uma opção
  };

  const handleViewAllCommunities = () => {
    // Lógica para visualizar todas as comunidades existentes
    setMenuOpen(false); // Fecha o menu ao selecionar uma opção
  };

  return (
    
    <div className="community-page">
      <Header/>
      <div>
        <Menu/>
      <header className="community-header">
        <div className="dropdown">
          <button className="dropdown-button" onClick={handleToggleMenu}>
            Comunidades
          </button>
          {menuOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={handleCreateCommunity}>
                Criar Comunidade
              </button>
              <button className="dropdown-item" onClick={handleViewMyCommunities}>
                Minhas Comunidades
              </button>
              <button className="dropdown-item" onClick={handleViewAllCommunities}>
                Comunidades Existentes
              </button>
            </div>
          )}
        </div>
      </header>
      <div className="community-content">
        {/* Aqui você pode renderizar o conteúdo de acordo com a seleção do usuário */}
      </div>
      <div className="community-container">
      <h1>Comunidade</h1>
      <p>Aqui você pode interagir com outros usuários, compartilhar suas leituras e participar de discussões.</p>
      {/* <!-- Conteúdo da Comunidade será adicionado aqui --> */}
    </div>
    </div>
    <Footer/>
    </div>
  );
 }

export default Community;

