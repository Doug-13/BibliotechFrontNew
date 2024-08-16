import React, { useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

import "../Css/styleAddBooks.css";
import DecorativeBar from "../components/Perfumaria";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para cadastrar o livro na biblioteca pessoal
    console.log(`Livro cadastrado: ${title} por ${author}`);
  };

  return (
    <div className="add-book-container">
      <Header />
      <div className="add-book-container1">
        <Menu />
        <h1>Cadastrar Livros</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="title">Título do Livro</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do livro"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="author">Autor</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Digite o autor do livro"
              required
            />
          </div>
          <button type="submit" className="add-book-button">
            Cadastrar Livro
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AddBook;
