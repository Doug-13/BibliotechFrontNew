import React from 'react';
import '../Css/styleLibrary.css';
import ButtonBack from '../components/ButtonBack';
import DecorativeBar from '../components/Perfumaria';
import LoginFooter from '../components/FooterLogin';
import Footer from '../components/Footer';


function PersonalLibrary() {
  const books = [
    { id: 1, title: 'Livro 1', author: 'Autor 1', status: 'Disponível' },
    { id: 2, title: 'Livro 2', author: 'Autor 2', status: 'Emprestado para João' },
    { id: 3, title: 'Livro 3', author: 'Autor 3', status: 'Disponível' },
    { id: 4, title: 'Livro 4', author: 'Autor 4', status: 'Emprestado para Carlos' },
    { id: 5, title: 'Livro 5', author: 'Autor 5', status: 'Disponível' },
    { id: 6, title: 'Livro 6', author: 'Autor 6', status: 'Disponível' },
    { id: 6, title: 'Livro 6', author: 'Autor 6', status: 'Disponível' },
    { id: 6, title: 'Livro 6', author: 'Autor 6', status: 'Disponível' },
    { id: 6, title: 'Livro 6', author: 'Autor 6', status: 'Disponível' },
    // Adicione mais livros conforme necessário
  ];

  return (
    <div>
    <div className="personal-library-container">
      <h1>Minha Biblioteca</h1>
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>Status: {book.status}</p>
          </div>
        ))}
      </div>
      <ButtonBack/>
    </div>
    <Footer/>
    <DecorativeBar/>
    </div>
  );
}

export default PersonalLibrary;
