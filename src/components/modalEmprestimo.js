  import React, { useState, useEffect } from 'react';
  import './modalEmprestimo.css';
  import { styled } from '@mui/material/styles';
  import Box from '@mui/material/Box';
  import Rating from '@mui/material/Rating';
  import FavoriteIcon from '@mui/icons-material/Favorite';
  import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
  import Typography from '@mui/material/Typography';
  import TextField from '@mui/material/TextField';

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

  const ModalEmprestimo = ({
    show,
    handleClose,
    handleConfirm,
    title,
    author,
    isbn,
    publisher,
    publishDate,
    genre,
    description,
    status,
    visibility,
    imageUrl,
  }) => {
    const [editTitle, setEditTitle] = useState(title);
    const [editAuthor, setEditAuthor] = useState(author);
    const [editIsbn, setEditIsbn] = useState(isbn);
    const [editPublisher, setEditPublisher] = useState(publisher);
    const [editPublishDate, setEditPublishDate] = useState(publishDate);
    const [editGenre, setEditGenre] = useState(genre);
    const [editDescription, setEditDescription] = useState(description);
    const [editStatus, setEditStatus] = useState(status);
    const [editVisibility, setEditVisibility] = useState(visibility);
    const [rating, setRating] = useState(2);
    const [loanDate, setLoanDate] = useState(() => new Date().toISOString().split('T')[0]); // Today's date in YYYY-MM-DD format
    const [returnDate, setReturnDate] = useState('');
    const [requesterName, setRequesterName] = useState('');

    useEffect(() => {
      setEditTitle(title);
      setEditAuthor(author);
      setEditIsbn(isbn);
      setEditPublisher(publisher);
      setEditPublishDate(publishDate);
      setEditGenre(genre);
      setEditDescription(description);
      setEditStatus(status);
      setEditVisibility(visibility);
    }, [title, author, isbn, publisher, publishDate, genre, description, status, visibility]);

    const handleSave = () => {
      handleConfirm({
        title: editTitle,
        author: editAuthor,
        isbn: editIsbn,
        publisher: editPublisher,
        publishDate: editPublishDate,
        genre: editGenre,
        description: editDescription,
        status: editStatus,
        visibility: editVisibility,
        imageUrl,
        rating,
        loanDate,
        returnDate,
        requesterName,
      });
    };

    if (!show) {
      return null;
    }

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="modal-close-button" onClick={handleClose}>
            &times;
          </button>
          <h2>Realizar Empréstimo</h2>
          <div className="modal-header">
            <img src={imageUrl} alt={editTitle} style={{ width: '100px', height: 'auto', marginRight: '20px' }} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography component="legend">Sua Avaliação</Typography>
              <StyledRating
                name="customized-color"
                value={rating}
                onChange={(e, newValue) => setRating(newValue)}
                getLabelText={(value) => `${value} Coração${value !== 1 ? 's' : ''}`}
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />
            </Box>
          </div>
          <div className="modal-body">
            <form>
              <TextField
                label="Título"
                fullWidth
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Autor"
                fullWidth
                value={editAuthor}
                onChange={(e) => setEditAuthor(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Editora"
                fullWidth
                value={editPublisher}
                onChange={(e) => setEditPublisher(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Data de Empréstimo"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={loanDate}
                onChange={(e) => setLoanDate(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Data de Devolução"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Nome do Solicitante"
                fullWidth
                value={requesterName}
                onChange={(e) => setRequesterName(e.target.value)}
                margin="normal"
              />
            </form>
          </div>
          <div className="modal-actions">
            <button onClick={handleSave}>Salvar</button>
            <button onClick={handleClose}>Cancelar</button>
          </div>
        </div>
      </div>
    );
  };

  export default ModalEmprestimo;
