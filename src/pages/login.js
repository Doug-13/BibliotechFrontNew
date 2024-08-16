import '../Css/styleLogin.css';
import LoginHeader from '../components/HeaderLogin';
import LoginFooter from '../components/FooterLogin';
import DecorativeBar from '../components/Perfumaria';

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//Importa o recurso para criar link do react
import {Link} from 'react-router-dom';

// import '../CSS/login.css'; // Importando o arquivo CSS

//Utilizado para armazenar o token no localStorage ou sessionStorage após o login
import { AuthContext } from '../authentication/Authentication';

const Login = () => {
  console.log('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    console.log('antes');
    const { setAuthToken } = useContext(AuthContext);
    console.log('depois');
    const navigate = useNavigate();

     const login = async () => {
        try {
            const response = await axios.post('http://localhost:3002/api/users/login', { email, password });
            setAuthToken(response.data.token);
            //localStorage.setItem('token', response.data.token); // Armazena o token
            setToken(response.data.token);
            navigate('/Home'); // Redireciona para a página interna
        } catch (error) {
            alert('Erro no login: ' + error.response.data);
        }
    };
    return (
        <div className="login-container">
            <div className="login-box">
                
                <h1>Login</h1>
                <div className="input-container">
                    <input 
                        type="email" 
                        placeholder="E-mail do usuario" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <br></br>
                <div className="input-container">
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <br></br>
                <Link to="/esqueci-minha-senha">Esqueceu a senha?</Link>
                <div className="button-container">
                    <button onClick={login} className="button">Login</button>
                </div>
                <br></br>
                <Link to="/Registro">Acessar cadastro</Link>
            </div>
        </div>
    );
};
export default Login;