import React, { useState } from 'react';
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
  handleViewEmprestimo,
  title,
  author,
  isbn,
  publisher,
  publishDate,
  genre,
  loan, // Prop que representa o estado do empréstimo
  description,
  requestId,
  status,
  visibility,
  imageUrl,
  bookId,
}) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openLoanDetails, setOpenLoanDetails] = useState(false);

  const handleDelete = async () => {
    try {
      console.log(bookId);
      await fetch(`http://localhost:3002/api/books/book/${bookId}`, {
        method: 'DELETE',
      });
      handleClose(); // Fecha o modal após a exclusão
    } catch (error) {
      console.error('Erro ao deletar o livro:', error);
    }
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleConfirmDelete = () => {
    handleDelete();
    handleCloseConfirmDialog();
  };

  const handleOpenLoanDetails = () => {
    setOpenLoanDetails(true);
  };

  const handleCloseLoanDetails = () => {
    setOpenLoanDetails(false);
  };

  const handleReturnBook = async () => {
    if (!loan || !loan.id) return;

    try {
      // Atualiza a solicitação de empréstimo para marcar como devolvido
      console.log(requestId)
      await fetch(`http://localhost:3002/api/books-requests/book_request/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...loan,
          returnDate: new Date().toISOString(), // Atualiza a data de devolução para o momento atual
          deliveryStatus: 'Devolvido', // Atualiza o status de entrega
        }),
      });
      // Adicione qualquer lógica adicional após a atualização (e.g., atualizar a lista de empréstimos)
      handleCloseLoanDetails(); // Fecha o diálogo de detalhes do empréstimo
    } catch (error) {
      console.error('Erro ao registrar devolução:', error);
    }
  };

  return (
    <>
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
          {loan ? (
            <Button onClick={handleOpenLoanDetails} color="secondary" variant="contained">
              Ver Empréstimo
            </Button>
          ) : (
            <Button onClick={handleEmprestimo} color="secondary" variant="contained">
              Realizar Empréstimo
            </Button>
          )}
          <Button onClick={handleOpenConfirmDialog} color="error" variant="contained">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Confirmação */}
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza de que deseja excluir este livro?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Detalhes do Empréstimo */}
      <Dialog open={openLoanDetails} onClose={handleCloseLoanDetails} maxWidth="sm" fullWidth>
        <DialogTitle>Detalhes do Empréstimo</DialogTitle>
        <DialogContent dividers>
          {loan ? (
            <Box>
               <Typography variant="body1"><strong>Id do emprestimo:</strong> {loan.requestId}</Typography>
              <Typography variant="body1"><strong>ID do Solicitante:</strong> {loan.requesterId}</Typography>
              <Typography variant="body1"><strong>Data do Empréstimo:</strong> {loan.loanDate}</Typography>
              <Typography variant="body1"><strong>Data de Retorno:</strong> {loan.returnDate}</Typography>
              <Typography variant="body1"><strong>Status:</strong> {loan.status}</Typography>
              <Typography variant="body1"><strong>Status de Entrega:</strong> {loan.deliveryStatus}</Typography>
            </Box>
          ) : (
            <Typography>Não há detalhes de empréstimo disponíveis.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          {loan && (
            <Button onClick={handleReturnBook} color="primary" variant="contained">
              Registrar devolução
            </Button>
          )}
          <Button onClick={handleCloseLoanDetails} color="primary" variant="contained">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Modal;
