// import BottonBack from "../components/BottonBack";
import React, { useState, useEffect } from "react";
// import axios from "axios";
import axiosInstance from "../axios/ConfigAxios";

function Register() {
  // Cria novo estado para os campos da tela
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
    setCampos((prevCampos) => ({
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
      newError.confirmPassword = "Para sua seguranca esse campo é obrigatório.";
    } //else if (!campos.confirmPassword !==campos.password) {
    //   newError.password = "As senhas devem ser iguais, igual par de vaso :>";
    // }

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
      confirmPassword:''
    })

    // Limpar mensagem após 3 segundos
    setTimeout(() => {
      setMensagem('');
  }, 3000);
    
    })
      .catch(error => {
        setMensagem('Houve um problema ao registrar o registro. ;-;');
      });

  };

function validConfirmPassword() {
  const newError = {};

  if (!campos.confirmPassword) {
    newError.confirmPassword = "Para sua seguranca esse campo é obrigatório.";
  } else if (!campos.confirmPassword !==campos.password) {
    newError.password = "As senhas devem ser iguais, igual par de vaso :>";
  }
  setError(newError);
}

return (
  <div className="App">
    {/* Importamos o componente Header criado */}

    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            <h2> -[Dados de cadastro]- </h2>
          </legend>

          <div className="inline-fields">
            <div className="field-maior">
              <label>
                -Nome:
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={campos.name}
                  onChange={handleInputChange}
                />
                {error.name && <p className="error">{error.name}</p>}
              </label>
            </div>
          </div>

          <div className="inline-fields">
            <div className="field-menor">
              <label>
                -Email:
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={campos.email}
                  onChange={handleInputChange}
                />
                {error.email && <p className="error">{error.email}</p>}
              </label>
            </div>

            <div className="field-menor">
              <label>
                -Senha:
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={campos.password}
                  onChange={handleInputChange}
                />
                {error.password && <p className="error">{error.password}</p>}
              </label>
            </div>

            <div className="field-menor">
              <label>
                -Confirma senha:
                <input
                  type="text"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={campos.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={validConfirmPassword}
                />
                {error.confirmPassword && <p className="error">{error.confirmPassword}</p>}
              </label>
            </div>
            </div>

            


          <input type="submit" value="salvar" />
        </fieldset>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  </div>
);
}

export default Register;