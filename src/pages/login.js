import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../authentication/Authentication';
import { Container, TextField, Button, Typography, Box, Link as MuiLink, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { setAuthToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const login = async () => {
        try {
            const response = await axios.post('http://localhost:3002/api/users/login', { email, password });
            setAuthToken(response.data.token);
            navigate('/Home');
        } catch (error) {
            alert('Erro no login: ' + error.response.data);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                {/* Logo Section */}
                <img src="./Assets/Logo.png" alt="Logo" style={{ width: '50%', maxWidth: '200px', marginBottom: '20px',borderRadius: '6rem' }} />
                
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="E-mail do usuário"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <MuiLink component={Link} to="/esqueci-minha-senha" variant="body2" sx={{ mt: 1, mb: 1 }}>
                    Esqueceu a senha?
                </MuiLink>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={login}
                >
                    Login
                </Button>
                <MuiLink component={Link} to="/Registro" variant="body2">
                    Acessar cadastro
                </MuiLink>
            </Box>
        </Container>
    );
};

export default Login;