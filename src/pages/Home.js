import React, { useState, useEffect, useRef } from "react";
import "../Css/styleHome.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import Modal from "../components/modalHome"; // Certifique-se de que o caminho está correto

function Home() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const userId = 'user456'; // Substitua com a lógica para obter o ID do usuário
  const [scrollIndex, setScrollIndex] = useState(0);
  const carouselRef = useRef(null);
  const itemsToShow = 8;

  useEffect(() => {
    console.log('useEffect rodando'); // Verifique se o useEffect está sendo executado

    // Fazendo a chamada para o backend
    fetch(`http://localhost:3002/api/books/user/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Dados recebidos do backend:', data); // Verifique os dados recebidos

        if (data.length === 0) {
          console.warn('Nenhum livro retornado para este usuário.');
        }

        // Filtra livros públicos
        const publicBooks = data.filter(book => book.visibility === 'public');
        
        // Verifica se existem livros públicos após o filtro
        if (publicBooks.length === 0) {
          console.warn('Nenhum livro público disponível.');
        }

        setBooks(publicBooks);
      })
      .catch(error => console.error('Erro ao buscar os livros:', error));
  }, [userId]);

  const handlePrevClick = () => {
    setScrollIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setScrollIndex(prevIndex => Math.min(prevIndex + 1, Math.ceil(books.length / itemsToShow) - 1));
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${scrollIndex * (100 / itemsToShow)}%)`;
    }
  }, [scrollIndex, books]);

  const handleBookClick = (book) => {
    console.log('Livro clicado:', book); // Log para verificar o livro clicado
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Fechando modal'); // Log para verificar o fechamento do modal
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const confirmAction = () => {
    console.log('Ação confirmada para o livro:', selectedBook);
    // Adicione aqui a lógica para confirmar a ação, como realizar o empréstimo.
    closeModal(); // Fecha o modal após a ação
  };

  return (
    <div className="home-container">
      <Header />
      <div>
        <Menu />
        <main className="main-content">
          <section className="intro">
            <h2>Bem-vindo à nossa Biblioteca Online!</h2>
            <p>
              Aqui você pode explorar uma vasta coleção de livros, reservar seus
              favoritos e acompanhar seus empréstimos.
            </p>
            <button className="explore-button">Explorar Livros</button>
          </section>

          <section className="featured-books">
            <h2>Seus livros</h2>
            <div className="carousel-container">
              <button className="carousel-button prev" onClick={handlePrevClick}>‹</button>
              <div className="carousel-track" ref={carouselRef}>
                {books.length === 0 ? (
                  <p>Nenhum livro público disponível.</p>
                ) : (
                  books.map(book => (
                    <div 
                      key={book.id} 
                      className="carousel-item"
                      onClick={() => handleBookClick(book)}
                    >
                      <img src={book.imageUrl} alt={book.title} />
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                    </div>
                  ))
                )}
              </div>
              <button className="carousel-button next" onClick={handleNextClick}>›</button>
            </div>
          </section>
        </main>
      </div>
      <Footer />
      
      <Modal 
        show={isModalOpen} 
        handleClose={closeModal} 
        handleConfirm={confirmAction} 
        title={selectedBook ? selectedBook.title : ''}
      >
        {selectedBook && (
          <div>
            <p>Autor: {selectedBook.author}</p>
            <p>Descrição: {selectedBook.description}</p>
            {/* Adicione mais detalhes do livro aqui conforme necessário */}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Home;
