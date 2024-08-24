import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import "../Css/styleAddBooks.css";
import DecorativeBar from "../components/Perfumaria";
import Switch from '@mui/material/Switch';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 400,
  bgcolor: '#f5f5f5',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 4, // Adiciona bordas arredondadas ao modal
};

const modalContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Centraliza o título e os botões
  textAlign: 'center', // Centraliza o texto do título e das mensagens
  gap: '20px', // Espaçamento entre os elementos
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center', // Centraliza os botões
  gap: '10px', // Espaçamento entre os botões
  marginTop: '20px', // Espaçamento superior para os botões
};

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publishDate, setPublishDate] = useState("2024-08-13");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState(false);
  const [rating, setRating] = useState(2);
  const [ownerId, setOwnerId] = useState("user456");
  const [visibility, setVisibility] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [modalData, setModalData] = useState({});

  const fetchBookDetails = async (isbn) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
      );
      const bookData = response.data.items[0].volumeInfo;

      setTitle(bookData.title || "");
      setAuthor(bookData.authors ? bookData.authors.join(", ") : "");

      let formattedPublishDate = "2024-08-13";
      if (bookData.publishedDate) {
        if (bookData.publishedDate.length === 4) {
          formattedPublishDate = `${bookData.publishedDate}-01-01`;
        } else if (bookData.publishedDate.length === 7) {
          formattedPublishDate = `${bookData.publishedDate}-01`;
        } else {
          formattedPublishDate = bookData.publishedDate;
        }
      }
      setPublishDate(formattedPublishDate);

      setGenre(bookData.categories ? bookData.categories.join(", ") : "");
      setImageUrl(bookData.imageLinks ? bookData.imageLinks.thumbnail : "");
      setPublisher(bookData.publisher || "");
      setDescription(bookData.description || "");
    
    } catch (error) {
      console.error("Erro ao buscar detalhes do livro:", error);
    }
  };

  const handleIsbnChange = (e) => {
    const isbnValue = e.target.value;
    setIsbn(isbnValue);
    if (isbnValue.length === 13) {
        fetchBookDetails(isbnValue);
    }
};

const handleStatusChange = (event) => {
    setStatus(event.target.checked);
};

const handleVisibilityChange = (event) => {
    setVisibility(event.target.checked);
};

const handleRatingChange = (event, newValue) => {
    setRating(newValue);
};

const handleSubmit = (e) => {
    e.preventDefault();
    setModalData({
        title,
        author,
        isbn,
        publisher,
        publishDate,
        genre,
        description,
        status,
        rating,
        visibility,
        imageUrl,
    });
    setOpenModal(true);
};

const handleConfirmSave = async () => {
    const newBook = {
        title,
        author,
        isbn,
        publisher,
        publish_date: publishDate,
        genre,
        description,
        status: status ? "Lido" : "Não lido",
        rating,
        owner_id: ownerId,
        visibility: visibility ? "Publico" : "Privado",
        image_url: imageUrl,
    };

    try {
        await axios.post('http://localhost:3002/api/books/book', newBook);
        setSuccessMessage("Livro cadastrado com sucesso!");
        clearForm();
    } catch (error) {
        console.error("Erro ao cadastrar o livro:", error);
        setSuccessMessage("Erro ao cadastrar o livro, tente novamente.");
    } finally {
        setOpenModal(false);
    }
};

const clearForm = () => {
    setTitle("");
    setAuthor("");
    setIsbn("");
    setPublishDate("2024-08-13");
    setGenre("");
    setStatus(false);
    setRating(2);
    setOwnerId("user456");
    setVisibility(false);
    setImageUrl("");
    setDescription("");
    setPublisher("");
};

  return (
    <div className="add-book-container">
      <Header title="Cadastro de Livros" />
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            {/* <Menu /> */}
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="form-container">
              {successMessage && <Alert severity="success">{successMessage}</Alert>}
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ bgcolor: 'white', padding: '20px' }}>
                  <Grid item xs={12} md={6}>
                    <div className="input-group">
                      <label htmlFor="isbn">ISBN</label>
                      <input
                        type="text"
                        id="isbn"
                        value={isbn}
                        onChange={handleIsbnChange}
                        placeholder="Digite o ISBN do livro"
                        fullWidth
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className="input-group">
                      <label htmlFor="title">Título do Livro</label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Digite o título do livro"
                        required
                        fullWidth
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className="input-group">
                      <label htmlFor="author">Autor</label>
                      <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Digite o autor do livro"
                        fullWidth
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className="input-group">
                      <label htmlFor="publishDate">Data de Publicação</label>
                      <input
                        type="date"
                        id="publishDate"
                        value={publishDate}
                        onChange={(e) => setPublishDate(e.target.value)}
                        fullWidth
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className="input-group">
                      <label htmlFor="genre">Gênero</label>
                      <input
                        type="text"
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        placeholder="Digite o gênero do livro"
                        fullWidth
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className="input-group">
                      <label htmlFor="status">Livro lido?</label>
                      <Switch
                        checked={status}
                        onChange={handleStatusChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className="input-group">
                      <label htmlFor="publisher">Editora</label>
                      <input
                        type="text"
                        id="publisher"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                        placeholder="Digite o nome da editora"
                        fullWidth
                      />
                    </div>
                  </Grid>

                  {status && (
                    <>
                      <Typography component="legend">Avalie Seu Livro</Typography>
                      <StyledRating
                        name="customized-color"
                        value={rating}
                        onChange={handleRatingChange}
                        getLabelText={(value) => `${value} Coração${value !== 1 ? 's' : ''}`}
                        precision={0.5}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                      />
                    </>
                  )}

                  <Grid item xs={12}>
                    <div className="input-group-description">
                      <label htmlFor="description">Descrição</label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Digite uma descrição do livro"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className="input-group">
                      <label htmlFor="visibility">Visibilidade</label>
                      <Switch
                        checked={visibility}
                        onChange={handleVisibilityChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className="input-group">
                      <label htmlFor="imageUrl">URL da Imagem</label>
                      <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Digite a URL da imagem"
                        fullWidth
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Salvar
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={modalStyle}>
                  <div style={modalContentStyle}>
                    <Typography variant="h6" component="h2">
                      Confirmar Cadastro do Livro
                    </Typography>
                    <Typography>
                      Você está prestes a cadastrar o livro:
                    </Typography>
                    <Typography><strong>Título:</strong> {modalData.title}</Typography>
                    <Typography><strong>Autor:</strong> {modalData.author}</Typography>
                    <Typography><strong>Avaliação:</strong> {modalData.rating}</Typography>

                    <div style={buttonContainerStyle}>
                      <Button onClick={handleConfirmSave} variant="contained" color="primary">
                        Confirmar
                      </Button>
                      <Button onClick={() => setOpenModal(false)} variant="outlined" color="secondary">
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </Box>
              </Modal>
            </div>
          </Grid>
        </Grid>
      </Container>
      <DecorativeBar />
      <Footer />
    </div>
  );
}

export default AddBook;