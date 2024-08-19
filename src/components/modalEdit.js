import React, { useState, useEffect } from 'react';
import './modalEdit.css'; // Atualize o CSS conforme necessário
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid'; // Importando Grid para layout

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const ModalEdit = ({
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
        <h2>Editar Livro</h2>
        <img src={imageUrl} alt={editTitle} style={{ width: '100px', height: 'auto' }} />
        <div className="modal-body">
          <form>
            <Grid container spacing={1}>
              <Grid item xs={4} sm={6}>
                <TextField
                  label="Título"
                  fullWidth
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4} sm={6}>
                <TextField
                  label="Autor"
                  fullWidth
                  value={editAuthor}
                  onChange={(e) => setEditAuthor(e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4} sm={6}>
                <TextField
                  label="ISBN"
                  fullWidth
                  value={editIsbn}
                  onChange={(e) => setEditIsbn(e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4} sm={6}>
                <TextField
                  label="Editora"
                  fullWidth
                  value={editPublisher}
                  onChange={(e) => setEditPublisher(e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4} sm={6}>
                <TextField
                  label="Data de Publicação"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={editPublishDate}
                  onChange={(e) => setEditPublishDate(e.target.value)}
                  margin="normal"
                />
              </Grid>

              <Grid item xs={4} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Gênero</InputLabel>
                  <Select
                    value={editGenre}
                    onChange={(e) => setEditGenre(e.target.value)}
                  >
                    <MenuItem value="Ficção">Ficção</MenuItem>
                    <MenuItem value="Não-ficção">Não-ficção</MenuItem>
                    <MenuItem value="Religioso">Religioso</MenuItem>
                    <MenuItem value="Aventura">Aventura</MenuItem>
                    <MenuItem value="Romance">Romance</MenuItem>
                    <MenuItem value="Mistério">Mistério</MenuItem>
                    <MenuItem value="Fantasia">Fantasia</MenuItem>
                    <MenuItem value="Biografia">Biografia</MenuItem>
                    <MenuItem value="História">História</MenuItem>
                    <MenuItem value="Ciência">Ciência</MenuItem>
                    <MenuItem value="Autoajuda">Autoajuda</MenuItem>
                    <MenuItem value="Poesia">Poesia</MenuItem>
                    <MenuItem value="Drama">Drama</MenuItem>
                    <MenuItem value="Terror">Terror</MenuItem>
                    <MenuItem value="Suspense">Suspense</MenuItem>
                    <MenuItem value="Humor">Humor</MenuItem>
                    <MenuItem value="Tecnologia">Tecnologia</MenuItem>
                    <MenuItem value="Gastronomia">Gastronomia</MenuItem>
                    <MenuItem value="Religião">Religião</MenuItem>
                    <MenuItem value="Viagem">Viagem</MenuItem>
                    <MenuItem value="Esporte">Esporte</MenuItem>
                    <MenuItem value="Saúde">Saúde</MenuItem>
                    <MenuItem value="Negócios">Negócios</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Descrição"
                  fullWidth
                  multiline
                  rows={4}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </form>
          <Box
            sx={{
              '& > legend': { mt: 2 },
              marginTop: '20px',
            }}
          >
            <Typography component="legend">Avalie Seu Livro</Typography>
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
        <div className="modal-actions">
          <button onClick={handleSave}>Salvar</button>
          <button onClick={handleClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;