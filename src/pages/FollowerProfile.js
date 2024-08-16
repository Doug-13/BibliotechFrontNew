import React from 'react';
import '../Css/styleFollower.css';
import ButtonBack from '../components/ButtonBack';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DecorativeBar from '../components/Perfumaria';


function FollowerProfile() {
  return (
    <div className="follower-profile-container">
      <Header />
      <div>
      <div className="follower-profile-info">
        <div className="follower-profile-pic">
          <img src="caminho/para/foto-seguidor.jpg" alt="Foto do Seguidor" />
        </div>
        <div className="follower-profile-details">
          <h1 className="follower-profile-name">Nome do Seguidor</h1>
          <p className="follower-profile-bio">Descrição breve do seguidor e suas preferências literárias.</p>
          <button className="follow-button">Deixar de seguir</button>
          <button className="follow-button">Seus seguidores</button>
        </div>
      </div>

      <section className="library-section">
        <h2>Biblioteca de Livros</h2>
        <div className="book-list">
          <div className="book-item">
            <img src="caminho/para/livro1.jpg" alt="Livro 1" />
            <h3>Título do Livro 1</h3>
            <p>Autor do Livro 1</p>
            <button className="follow-button">Pedir emprestado</button>
          </div>
          <div className="book-item">
            <img src="caminho/para/livro2.jpg" alt="Livro 2" />
            <h3>Título do Livro 2</h3>
            <p>Autor do Livro 2</p>
            <button className="follow-button">Pedir emprestado</button>
          </div>
          <div className="book-item">
            <img src="caminho/para/livro3.jpg" alt="Livro 3" />
            <h3>Título do Livro 3</h3>
            <p>Autor do Livro 3</p>
            <button className="follow-button">Pedir emprestado</button>
          </div>
          {/* <!-- Adicionar mais livros conforme necessário --> */}
        </div>
      </section>
    </div>
    <Footer />
    </div>
  );
}

export default FollowerProfile;
