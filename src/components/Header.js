import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

function Header({ title }) { // Recebe a prop title
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <img
          src="./Assets/logo.png"
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
          {title} {/* Usa a prop title */}
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
        <MenuItem onClick={handleMenuClose}>Comunidades</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Header;