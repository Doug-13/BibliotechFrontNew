import React from 'react';
import '../Css/styleProfile.css';

import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import DecorativeBar from '../components/Perfumaria';
import axiosInstance from '../axios/ConfigAxios';
import { useState, useEffect } from "react";

function Profile() {

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // const [mensagem, setMensagem] = useState('');
  // const [buscarPorNome, setBurcarPorNome] = useState('');

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

  // const handleDelete = (id) => {
  //   setSelectedId(id);
  //   setShowModal(true);
  // };

  // const confirmDelete = () => {
  //   axiosInstance.delete(`http://localhost:3001/api/usuarios/${selectedId}`)
  //     .then(response => {
  //       setRegistros(registros.filter(registro => registro.id !== selectedId));
  //       setMensagem('Registro deletado com sucesso!');
  //       setShowModal(false);
  //     })
  //     .catch(error => {
  //       setError('Houve um problema ao deletar o registro.');
  //       setShowModal(false);
  //     });

  //   setTimeout(() => {
  //     setMensagem('');
  //   }, 3000);
  // };

  const closeModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  return (      
    <div className="profile-container">
      <Header/>
    <div >
      <Menu />
      <div className="profile-info">
        <div className="profile-pic">
          <img src="caminho/para/foto-perfil.jpg" alt="Foto de Perfil" />
        </div>
        <div className="profile-details">
          <h1 className="profile-name">Nome do Usuário {profile.name}</h1>
          <p className="profile-bio">Breve descrição sobre o usuário, hobbies, interesses, etc.</p>
          <Link to="/userProfile" className="edit-profile-button">Editar Perfil</Link>
          <Link to="/personal-library" className="library-link">Minha Biblioteca</Link>
        </div>
      </div>
      <section className="followers-section">
        <h2>Seguidores</h2>
        <div className="follower-list">
          <div className="follower-item">
            <Link to="/follower/1">
              <img src="caminho/para/foto1.jpg" alt="Seguidor 1" />
              <h3>Nome Seguidor 1</h3>
            </Link>
          </div>
          <div className="follower-item">
            <Link to="/follower/2">
              <img src="caminho/para/foto2.jpg" alt="Seguidor 2" />
              <h3>Nome Seguidor 2</h3>
            </Link>
          </div>
          {/* Adicione mais seguidores conforme necessário */}
        </div>
      </section>
    </div>
    <Footer/>
    </div>

  );
}

export default Profile;
