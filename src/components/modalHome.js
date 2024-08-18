import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const Modal = ({
  show,
  handleClose,
  handleConfirm,
  handleEmprestimo,
  title,
  author,
  isbn,
  publisher,
  publishDate,
  genre,
  description,
  status,
  visibility,
  imageUrl
}) => {
  return (
    <Dialog open={show} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Box className="modal-box">
          <Box sx={{ display: 'flex', gap: 3, marginBottom: 2 }}>
            <img
              src={imageUrl}
              alt={title}
              style={{ width: '150px', height: 'auto' }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body1"><strong>ISBN:</strong> {isbn}</Typography>
              <Typography variant="body1"><strong>Autor:</strong> {author}</Typography>
              <Typography variant="body1"><strong>ISBN:</strong> {isbn}</Typography>
              <Typography variant="body1"><strong>Editora:</strong> {publisher}</Typography>
              <Typography variant="body1"><strong>Data de Publicação:</strong> {publishDate}</Typography>
              <Typography variant="body1"><strong>Gênero:</strong> {genre}</Typography>
              <Typography variant="body1"><strong>Status:</strong> {status ? "Lido" : "Não lido"}</Typography>
              <Typography variant="body1"><strong>Visibilidade:</strong> {visibility ? "Público" : "Privado"}</Typography>
            </Box>
          </Box>
          <Divider sx={{ marginBottom: 2 }} />
          <Typography component="legend">Avalie Seu Livro</Typography>
          <StyledRating
            name="customized-color"
            defaultValue={2}
            getLabelText={(value) => `${value} Coração${value !== 1 ? 's' : ''}`}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          Editar Livro
        </Button>
        <Button onClick={handleEmprestimo} color="secondary" variant="contained">
          Realizar Empréstimo
        </Button>
        <Button onClick={handleClose} color="error" variant="contained">
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;