import React, { useState, useEffect } from 'react';
import "../Css/styleHome.css";
import Footer from "../components/Footer";
import Modal from "../components/modalHome";
import ModalEdit from '../components/modalEdit';
import ModalEmprestimo from '../components/modalEmprestimo';
import ModalShare from '../components/modalShare';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState('allbooks');
  const [modalState, setModalState] = useState({ open: false, type: null });
  const [selectedBook, setSelectedBook] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const userId = 'user456'; // Replace with logic to get the user ID
  const navigate = useNavigate();
  
  // Define libraryUrl
  const libraryUrl = `http://localhost:3002/api/users/${userId}/library`;

  useEffect(() => {
    fetch(`http://localhost:3002/api/books/user/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const publicBooks = data.filter(book => book.visibility === 'Publico');
        setBooks(publicBooks);
      })
      .catch(error => console.error('Erro ao buscar os livros:', error));
  }, [userId]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setModalState({ open: true, type: 'view' });
  };

  const closeModal = () => {
    setModalState({ open: false, type: null });
    setSelectedBook(null);
  };

  const openEditModal = () => {
    setModalState({ open: true, type: 'edit' });
  };

  const openEmprestimoModal = () => {
    setModalState({ open: true, type: 'emprestimo' });
  };

  const handleSave = (updatedBook) => {
    console.log('Livro atualizado:', updatedBook);
    closeModal();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddBookClick = () => {
    navigate('/pages/AddBook'); 
  };
  const handleOpenProfile = () => {
    navigate('/Profile'); 
  };

  const handleShareLibraryClick = () => {
    setShareModalOpen(true);
  };

  const handleShareModalClose = () => {
    setShareModalOpen(false);
  };
// Filtragem dos livros
const filteredBooks = books.filter(book => {
  // Normalizar valores para comparação
  const normalizedStatus = book.status ? book.status.toLowerCase() : '';
  const normalizedVisibility = book.visibility ? book.visibility.toLowerCase() : '';

  console.log(`Filtrando livro: ${book.title}, Status: ${normalizedStatus}, Visibilidade: ${normalizedVisibility}`);

  switch (filter) {
    case 'allbooks':
      return true; // Mostrar todos os livros

    case 'lidos':
      return normalizedStatus === 'lido'; // Mostrar livros lidos

    case 'naolidos':
      return normalizedStatus === 'não lido'; // Mostrar livros não lidos

    case 'emprestados':
      return normalizedStatus === 'emprestado'; // Mostrar livros emprestados

    case 'privados':
      return normalizedVisibility === 'privado'; // Mostrar livros privados

    default:
      return false; // Filtros desconhecidos
  }
});



  return (
    <div className="home-container">
      <AppBar position="fixed">
        <Toolbar>
          <img
            src="./Assets/Logo.png"
            alt="Logo"
            style={{ height: '100px', marginRight: '20px' }}
          />
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ fontSize: '2rem' }}
          >
            <MenuIcon sx={{ fontSize: '2.5rem' }} />
          </IconButton>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Minha Biblioteca
          </Typography>
          <Avatar
            alt="Nome do Usuário"
            src="./Assets/avatar.jpg"
            sx={{
              marginLeft: '120px',
              width: '100px',
              height: '100px'
            }}
          />
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleOpenProfile}>Perfil</MenuItem>
        <MenuItem onClick={handleMenuClose}>Comunidades</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
      <main className="main-content">
        <section className="featured-books">
          <Typography variant="h4" component="h2" sx={{ marginBottom: '20px', textAlign: 'center' }}>
            Meus Livros
          </Typography>
          <div className="button-container" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Tooltip title="Adicionar Livro">
              <IconButton
                color="inherit"
                onClick={handleAddBookClick}
                sx={{ fontSize: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <AddIcon sx={{ fontSize: '2.5rem' }} />
                <Typography variant="caption" sx={{ marginTop: '5px' }}>Adicionar Livro</Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Compartilhar Biblioteca">
              <IconButton
                color="inherit"
                onClick={handleShareLibraryClick}
                sx={{ fontSize: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <ShareIcon sx={{ fontSize: '2.5rem' }} />
                <Typography variant="caption" sx={{ marginTop: '5px' }}>Compartilhar Biblioteca</Typography>
              </IconButton>
            </Tooltip>
          </div>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={filter}
              onChange={handleFilterChange}
            >
              <FormControlLabel value="allbooks" control={<Radio />} label="Todos os Livros" />
              <FormControlLabel value="lidos" control={<Radio />} label="Lidos" />
              <FormControlLabel value="naolidos" control={<Radio />} label="Não Lidos" />
              <FormControlLabel value="emprestados" control={<Radio />} label="Emprestados" />
              <FormControlLabel value="privados" control={<Radio />} label="Privados" />
            </RadioGroup>
          </FormControl>

          <div className="carousel-container">
            <ImageList
              sx={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'center',
              }}
              cols={4}
              rowHeight="auto"
            >
              {filteredBooks.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', width: '150%' }}>
                  Nenhum livro disponível.
                </Typography>
              ) : (
                filteredBooks.map((book) => (
                  <ImageListItem
                    key={book.id}
                    sx={{
                      width: 'calc(20% - 20px)', // Adjust item width
                      borderRadius: '10px',
                      marginTop: '3rem',
                      overflow: 'hidden',
                      boxShadow: 3,
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 6,
                      },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                    onClick={() => handleBookClick(book)}
                  >
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div
                      style={{
                        textAlign: 'center',
                        marginTop: '10px',
                      }}
                    >
                      <Typography variant="h6" component="p" style={{ color: 'black' }}>
                        {book.title}
                      </Typography>
                      <Typography variant="body2" component="p" style={{ color: 'gray' }}>
                        by {book.author}
                      </Typography>
                    </div>
                  </ImageListItem>
                ))
              )}
            </ImageList>
          </div>
        </section>
      </main>
      <Footer />
      <Modal
        show={modalState.open && modalState.type === 'view'}
        handleClose={closeModal}
        handleConfirm={openEditModal}
        handleEmprestimo={openEmprestimoModal}
        title={selectedBook ? selectedBook.title : ''}
        author={selectedBook ? selectedBook.author : ''}
        isbn={selectedBook ? selectedBook.isbn : ''}
        publisher={selectedBook ? selectedBook.publisher : ''}
        publishDate={selectedBook ? selectedBook.publishDate : ''}
        genre={selectedBook ? selectedBook.genre : ''}
        description={selectedBook ? selectedBook.description : ''}
        status={selectedBook ? selectedBook.status : ''}
        visibility={selectedBook ? selectedBook.visibility : ''}
        imageUrl={selectedBook ? selectedBook.imageUrl : ''}
      />
      <ModalEdit
        show={modalState.open && modalState.type === 'edit'}
        handleClose={closeModal}
        handleConfirm={handleSave}
        title={selectedBook ? selectedBook.title : ''}
        author={selectedBook ? selectedBook.author : ''}
        isbn={selectedBook ? selectedBook.isbn : ''}
        publisher={selectedBook ? selectedBook.publisher : ''}
        publishDate={selectedBook ? selectedBook.publishDate : ''}
        genre={selectedBook ? selectedBook.genre : ''}
        description={selectedBook ? selectedBook.description : ''}
        status={selectedBook ? selectedBook.status : ''}
        visibility={selectedBook ? selectedBook.visibility : ''}
        imageUrl={selectedBook ? selectedBook.imageUrl : ''}
      />
      <ModalEmprestimo
        show={modalState.open && modalState.type === 'emprestimo'}
        handleClose={closeModal}
        handleConfirm={handleSave}
        title={selectedBook ? selectedBook.title : ''}
        author={selectedBook ? selectedBook.author : ''}
        isbn={selectedBook ? selectedBook.isbn : ''}
        publisher={selectedBook ? selectedBook.publisher : ''}
        publishDate={selectedBook ? selectedBook.publishDate : ''}
        genre={selectedBook ? selectedBook.genre : ''}
        description={selectedBook ? selectedBook.description : ''}
        status={selectedBook ? selectedBook.status : ''}
        visibility={selectedBook ? selectedBook.visibility : ''}
        imageUrl={selectedBook ? selectedBook.imageUrl : ''}
      />
      <ModalShare
        show={shareModalOpen}
        handleClose={handleShareModalClose}
        shareUrl={libraryUrl}
      />
    </div>
  );
}

export default Home;
