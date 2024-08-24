import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CommunityList from '../components/CommunityList'; // Importa o novo componente
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import '../Css/styleMenu.css';

function Community() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleCreateCommunity = () => {
    setOpenCreateModal(true);
    handleMenuClose(); // Fecha o menu ao selecionar uma opção
  };

  const handleViewMyCommunities = () => {
    // Lógica para visualizar comunidades que o usuário participa
    handleMenuClose(); // Fecha o menu ao selecionar uma opção
  };

  const handleViewAllCommunities = () => {
    // Lógica para visualizar todas as comunidades existentes
    handleMenuClose(); // Fecha o menu ao selecionar uma opção
  };

  const handleCreateCommunitySubmit = () => {
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    console.log('Creating community with:', communityName, communityDescription);

    // Limpa o formulário e fecha o modal
    setCommunityName('');
    setCommunityDescription('');
    setOpenCreateModal(false);
  };

  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleBackToHome = () => {
    navigate('/Home');
  };

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
            Comunidades
          </Typography>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleBackToHome}>Inicio</MenuItem> 
        <MenuItem onClick={handleCreateCommunity}>Criar Comunidade</MenuItem>
        <MenuItem onClick={handleViewMyCommunities}>Minhas Comunidades</MenuItem>
        <MenuItem onClick={handleViewAllCommunities}>Comunidades Existentes</MenuItem>
      </Menu>
  
      <div className="community-content">
        {/* Aqui você pode renderizar o conteúdo de acordo com a seleção do usuário */}
      </div>
      <div className="community-container">
        <h1>Comunidade</h1>
        <p>Aqui você pode interagir com outros usuários, compartilhar suas leituras e participar de discussões.</p>
        {/* <!-- Conteúdo da Comunidade será adicionado aqui --> */}
      </div>
      {/* Adiciona a lista de comunidades aqui */}
      <CommunityList />
      <Footer />

      {/* Modal para criar uma nova comunidade */}
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <DialogTitle>Criar Nova Comunidade</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="communityName"
            label="Nome da Comunidade"
            type="text"
            fullWidth
            variant="outlined"
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="communityDescription"
            label="Descrição"
            type="text"
            fullWidth
            variant="outlined"
            value={communityDescription}
            onChange={(e) => setCommunityDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateModal(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreateCommunitySubmit} color="primary">
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Community;
