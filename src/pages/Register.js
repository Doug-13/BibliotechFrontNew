import React, { useState } from "react";
import axiosInstance from "../axios/ConfigAxios";
import '../Css/register.css';

function Register() {
  const [campos, setCampos] = useState({
    user_id: 0,
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [mensagem, setMensagem] = useState("");
  const [error, setError] = useState({});

  function handleInputChange(event) {
    const { name, value } = event.target;
    setCampos(prevCampos => ({
      ...prevCampos,
      [name]: value,
    }));

    setError(prevError => ({
      ...prevError,
      [name]: ''
    }));
  }

  function validarCampos() {
    const newError = {};

    if (!campos.name) {
      newError.name = "Como assim você não tem nome?";
    }
    if (!campos.password) {
      newError.password = "Sem senha não tem segurança meu filho.";
    }
    if (!campos.confirmPassword) {
      newError.confirmPassword = "Para sua segurança esse campo é obrigatório.";
    } else if (campos.password !== campos.confirmPassword) {
      newError.confirmPassword = "As senhas devem ser iguais, igual par de vaso :>";
    }

    setError(newError);

    return Object.keys(newError).length === 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validarCampos()) {
      return;
    }

    console.log('campos', campos);
    axiosInstance.post('http://localhost:3002/api/users/user', campos)
      .then((response) => {
        alert("Formulário enviado com sucesso! :D");
        setMensagem("Formulário enviado com sucesso! :D");

        // Limpar os campos do formulário após o envio
        setCampos({
          user_id: 0,
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });

        // Limpar mensagem após 3 segundos
        setTimeout(() => {
          setMensagem('');
        }, 3000);
      })
      .catch(error => {
        setMensagem('Houve um problema ao registrar o registro. ;-;');
      });
  };

  return (
    <div className="register-container">
      <div className="form-wrapper">
        <h2>Cadastro de Usuário</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={campos.name}
              onChange={handleInputChange}
            />
            {error.name && <p className="error-message">{error.name}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              value={campos.email}
              onChange={handleInputChange}
            />
            {error.email && <p className="error-message">{error.email}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={campos.password}
              onChange={handleInputChange}
            />
            {error.password && <p className="error-message">{error.password}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmação de Senha:</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={campos.confirmPassword}
              onChange={handleInputChange}
              onBlur={validarCampos}
            />
            {error.confirmPassword && <p className="error-message">{error.confirmPassword}</p>}
          </div>

          <button type="submit" className="submit-button">Salvar</button>
        </form>
        {mensagem && <p className="success-message">{mensagem}</p>}
      </div>
    </div>
  );
}

export default Register;
