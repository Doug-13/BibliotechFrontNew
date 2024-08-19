import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Avatar, Button, Divider, Grid, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import axiosInstance from '../axios/ConfigAxios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to manage the drawer
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('http://localhost:3002/api/usersProfile/user_ProfileID/001')
      .then(response => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Houve um problema ao buscar os registros.');
        setLoading(false);
      });
  }, []);

  const handleMenuOpen = () => {
    setIsDrawerOpen(true); // Open the drawer when the menu icon is clicked
  };

  const handleHome = () => {
    setIsDrawerOpen(false); // Close the drawer when needed
    navigate('/Home');
  };

  const handleUserProfile = () => {
    setIsDrawerOpen(false); // Close the drawer when needed
    navigate('/UserProfile');
  };

  const handleMenuClose = () => {
    setIsDrawerOpen(false); // Close the drawer when needed
    navigate('/Home');
  };

  if (loading) return <Typography>Carregando...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Container sx={{ paddingTop: '120px' }}> {/* Add padding to compensate for the AppBar height */}
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
            Meu Perfil
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

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleMenuClose}
      >
        <List>
          <ListItem button onClick={handleMenuClose}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={handleHome}>
            <ListItemText primary="Minha Biblioteca" />
          </ListItem>
          <ListItem button onClick={handleUserProfile}>
            <ListItemText primary="Meu Perfil" />
          </ListItem>
        </List>
      </Drawer>

      <Card variant="outlined" sx={{ marginTop: 4, padding: 2 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar
                alt="Foto de Perfil"
                src="caminho/para/foto-perfil.jpg"
                sx={{ width: 100, height: 100 }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h4" component="div">
                {profile.name}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ marginTop: 1 }}>
                Breve descrição sobre o usuário, hobbies, interesses, etc.
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/userProfile"
                  sx={{ marginRight: 1 }}
                >
                  Editar Perfil
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  component={Link}
                  to="/Home"
                >
                  Minha Biblioteca
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Divider sx={{ marginY: 4 }} />

      <Typography variant="h6" component="div" gutterBottom>
        Seguidores
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar
                    alt="Seguidor 1"
                    src="caminho/para/foto1.jpg"
                    sx={{ width: 60, height: 60 }}
                  />
                </Grid>
                <Grid item xs>
                  <Typography variant="body1">
                    Nome Seguidor 1
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar
                    alt="Seguidor 2"
                    src="caminho/para/foto2.jpg"
                    sx={{ width: 60, height: 60 }}
                  />
                </Grid>
                <Grid item xs>
                  <Typography variant="body1">
                    Nome Seguidor 2
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
