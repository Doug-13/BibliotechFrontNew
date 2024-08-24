import React, { useState, useEffect } from 'react';
import './modalEmprestimo.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';

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
  bookId,
  ownerId,
}) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editAuthor, setEditAuthor] = useState(author);
  const [editPublisher, setEditPublisher] = useState(publisher);
  const [editPublishDate, setEditPublishDate] = useState(publishDate);
  const [editGenre, setEditGenre] = useState(genre);
  const [editDescription, setEditDescription] = useState(description);
  const [editStatus, setEditStatus] = useState(status);
  const [editVisibility, setEditVisibility] = useState(visibility);
  const [rating, setRating] = useState(2);
  const [loanDate, setLoanDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = useState('');
  const [requesterName, setRequesterName] = useState('');

  const [errors, setErrors] = useState({
    returnDate: false,
    requesterName: false,
  });

  useEffect(() => {
    setEditTitle(title);
    setEditAuthor(author);
    setEditPublisher(publisher);
    setEditPublishDate(publishDate);
    setEditGenre(genre);
    setEditDescription(description);
    setEditStatus(status);
    setEditVisibility(visibility);
  }, [title, author, publisher, publishDate, genre, description, status, visibility]);

  const handleSave = async () => {
    const newErrors = {
      returnDate: !returnDate,
      requesterName: !requesterName,
    };

    if (newErrors.returnDate || newErrors.requesterName) {
      setErrors(newErrors);
      return;
    }

    const requestData = {
      requester_id: requesterName,  // Aqui estamos usando o nome do solicitante como requester_id
      owner_id: ownerId,
      bookId: bookId,
      loan_date: loanDate,
      return_date: returnDate,
      status: editStatus,
      createdAt: loanDate,
      updatedAt: new Date().toISOString(),
    };

    try {
      console.log(requestData);
      await axios.post('http://localhost:3002/api/books-requests/book_request', requestData);
      console.log('Book request added successfully');

      // Mostrar mensagem de confirmação
      alert('Solicitação de empréstimo adicionada com sucesso!');

      // Limpar campos
      setReturnDate('');
      setRequesterName('');

      handleConfirm(requestData);
      handleClose();
    } catch (error) {
      console.error('Error adding book request:', error);
      alert('Erro ao adicionar a solicitação de empréstimo. Tente novamente.');
    }
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
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
              required
              error={errors.returnDate}
              helperText={errors.returnDate ? 'Data de devolução é obrigatória' : ''}
            />
            <TextField
              label="Nome do Solicitante"
              fullWidth
              value={requesterName}
              onChange={(e) => setRequesterName(e.target.value)}
              margin="normal"
              required
              error={errors.requesterName}
              helperText={errors.requesterName ? 'Nome do solicitante é obrigatório' : ''}
            />
            {/* Adicionando campo para mostrar o bookId */}
            <Typography variant="body1" color="textSecondary" marginTop={2}>
              <strong>ID do Livro:</strong> {bookId || 'Não disponível'}
            </Typography>
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
