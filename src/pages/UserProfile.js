import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import ButtonBack from "../components/ButtonBack";
import {Container, TextField, Button, Select, MenuItem, FormControl, InputLabel, Modal, Box, Typography, Alert,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function UserProfile() {
  const [profileId, setProfileId] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const [biography, setBiography] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [readingPreferences, setReadingPreferences] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const handleConfirmSave = async () => {
    const newUserProfile = {
      profile_id: profileId,
      name,
      nickname,
      birth_date: birthDate,
      biography: biography,
      reading_preferences: readingPreferences,
      phone_Number: phoneNumber,
      social_media: socialMedia,
    };

    try {
      console.log("post", newUserProfile);
      await axios.post(
        "http://localhost:3002/api/usersProfile/user_profile",
        newUserProfile
      );
      setSuccessMessage("Perfil cadastrado com sucesso!");
      clearForm();
    } catch (error) {
      console.error("Erro ao cadastrar o perfil:", error);
    } finally {
      setOpenModal(false);
    }
  };

  const clearForm = () => {
    setProfileId("");
    setName("");
    setNickname("");
    setBirthDate("2000-01-01");
    setBiography("");
    setReadingPreferences([]);
    setPhoneNumber("");
    setSocialMedia("");
  };

  const handleChange = (event) => {
    setReadingPreferences(event.target.value);
  };

  return (
    <Container>
      <Header />
      <Menu />
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Perfil de Usuário
        </Typography>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nome"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Apelido"
            variant="outlined"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Data de Nascimento"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Bio"
            variant="outlined"
            multiline
            rows={4}
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Preferências de Leitura</InputLabel>
            <Select
              multiple
              value={readingPreferences}
              onChange={handleChange}
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="Ficção">Ficção</MenuItem>
              <MenuItem value="Não-ficção">Não-ficção</MenuItem>
              <MenuItem value="Religioso">Religioso</MenuItem>
              <MenuItem value="Aventura">Aventura</MenuItem>
              <MenuItem value="Romance">Romance</MenuItem>
              <MenuItem value="Mistério">Mistério</MenuItem>
              <MenuItem value="Fantasia">Fantasia</MenuItem>
              <MenuItem value="Biografia">Biografia</MenuItem>
              <MenuItem value="História">História</MenuItem>
              <MenuItem value="Ciência">Ciência</MenuItem>
              <MenuItem value="Autoajuda">Autoajuda</MenuItem>
              <MenuItem value="Poesia">Poesia</MenuItem>
              <MenuItem value="Drama">Drama</MenuItem>
              <MenuItem value="Terror">Terror</MenuItem>
              <MenuItem value="Suspense">Suspense</MenuItem>
              <MenuItem value="Humor">Humor</MenuItem>
              <MenuItem value="Tecnologia">Tecnologia</MenuItem>
              <MenuItem value="Gastronomia">Gastronomia</MenuItem>
              <MenuItem value="Religião">Religião</MenuItem>
              <MenuItem value="Viagem">Viagem</MenuItem>
              <MenuItem value="Esporte">Esporte</MenuItem>
              <MenuItem value="Saúde">Saúde</MenuItem>
              <MenuItem value="Negócios">Negócios</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Telefone"
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Redes Sociais"
            variant="outlined"
            value={socialMedia}
            onChange={(e) => setSocialMedia(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Salvar Perfil
          </Button>
          
        </form>
      </Box>
      <ButtonBack />
      <Footer />

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Confirmar Cadastro
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Deseja salvar o perfil de "{name}"?
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmSave}
            >
              Confirmar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenModal(false)}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default UserProfile;



// import React, { useState } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import Menu from "../components/Menu";
// import Footer from "../components/Footer";
// import ButtonBack from "../components/ButtonBack";
// import "../Css/styleUserProfile.css"; 
// //import DecorativeBar from "../components/Perfumaria";
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Alert from '@mui/material/Alert';
// import { Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';


// const modalStyle = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };


// function UserProfile() {

//   // const [campos, setCampos] = useState({
//   //   profileId: 0,
//   //   name: '',
//   //   nickname: '',
//   //   birthDate: '2000-01-01',
//   //   biography: '',
//   //   phoneNumber: '',
//   //   socialMedia:'',
//   // });

//   const [profileId, setProfileId] = useState("");
//   const [name, setName] = useState("");
//   const [nickname, setNickname] = useState("");
//   const [birthDate, setBirthDate] = useState("2000-01-01");
//   const [biography, setBiography] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [socialMedia, setSocialMedia] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [openModal, setOpenModal] = useState(false);
//   const [readingPreferences, setReadingPreferences] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     //chamar a validacao de campos
//     setOpenModal(true);
//   };

//   const handleConfirmSave = async () => {
//     const newUserProfile = {
//       profile_id: profileId,
//       name,
//       nickname,
//       birth_date: birthDate,
//       biography: biography,
//       reading_preferences: readingPreferences,
//       phone_Number: phoneNumber,
//       social_media: socialMedia,
//     };

//     try {
//        console.log('post', newUserProfile)
//       await axios.post('http://localhost:3002/api/usersProfile/user_profile', newUserProfile);
//       setSuccessMessage("Perfil cadastrado com sucesso!");
//       clearForm();
//     } catch (error) {
//       console.log("error", error)
//       console.error("Erro ao cadastrar o perfil:", error);
//     } finally {
//       setOpenModal(false);
//     }
//   };

//   const clearForm = () => {
//     setProfileId("");
//     setName("");
//     setNickname("");
//     setBirthDate("2000-01-01");
//     setBiography("");
//     setReadingPreferences([]);
//     setPhoneNumber("");
//     setSocialMedia("");
//   };


//     const handleChange = (event) => {
//       setReadingPreferences(event.target.value);
//     };
  
//     return (
//       <div className="add-profile-container">
//         <Header />
//         <div className="add-profile-container1">
//           <Menu />
//           <div className="form-container">
//             <h1>Perfil de Usuário</h1>
//             {successMessage && <Alert severity="success">{successMessage}</Alert>}
//             <form onSubmit={handleSubmit}>
//               <div className="input-group">
//                 <label htmlFor="name">Nome</label>
//                 <input
//                   type="text"
//                   id="name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Digite seu nome"
//                   required
//                 />
//               </div>
//               <div className="input-group">
//                 <label htmlFor="nickname">Apelido</label>
//                 <input
//                   type="text"
//                   id="nickname"
//                   value={nickname}
//                   onChange={(e) => setNickname(e.target.value)}
//                   placeholder="Digite seu apelido"
//                   required
//                 />
//               </div>
//               <div className="input-group">
//                 <label htmlFor="birthDate">Data de Nascimento</label>
//                 <input
//                   type="date"
//                   id="birthDate"
//                   value={birthDate}
//                   onChange={(e) => setBirthDate(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="input-group">
//                 <label htmlFor="biography">Bio</label>
//                 <input
//                   type="text"
//                   id="biography"
//                   value={biography}
//                   onChange={(e) => setBiography(e.target.value)}
//                   placeholder="Conte-nos um pouco sobre você"
//                   required
//                 />
//               </div>
//               <div className="input-group">
//                 <FormControl fullWidth>
//                   <InputLabel id="reading-preferences-label">Preferências de Leitura</InputLabel>
//                   <Select
//                     labelId="reading-preferences-label"
//                     id="reading-preferences"
//                     multiple
//                     value={readingPreferences}
//                     onChange={handleChange}
//                     renderValue={(selected) => selected.join(', ')}
//                   >
//                     <MenuItem value="Ficção">Ficção</MenuItem>
//                     <MenuItem value="Não-ficção">Não-ficção</MenuItem>
//                     <MenuItem value="Religioso">Religioso</MenuItem>
//                     <MenuItem value="Aventura">Aventura</MenuItem>
//                     <MenuItem value="Romance">Romance</MenuItem>
//                     <MenuItem value="Mistério">Mistério</MenuItem>
//                     <MenuItem value="Fantasia">Fantasia</MenuItem>
//                     <MenuItem value="Biografia">Biografia</MenuItem>
//                     <MenuItem value="História">História</MenuItem>
//                     <MenuItem value="Ciência">Ciência</MenuItem>
//                     <MenuItem value="Autoajuda">Autoajuda</MenuItem>
//                     <MenuItem value="Poesia">Poesia</MenuItem>
//                     <MenuItem value="Drama">Drama</MenuItem>
//                     <MenuItem value="Terror">Terror</MenuItem>
//                     <MenuItem value="Suspense">Suspense</MenuItem>
//                     <MenuItem value="Humor">Humor</MenuItem>
//                     <MenuItem value="Tecnologia">Tecnologia</MenuItem>
//                     <MenuItem value="Gastronomia">Gastronomia</MenuItem>
//                     <MenuItem value="Religião">Religião</MenuItem>
//                     <MenuItem value="Viagem">Viagem</MenuItem>
//                     <MenuItem value="Esporte">Esporte</MenuItem>
//                     <MenuItem value="Saúde">Saúde</MenuItem>
//                     <MenuItem value="Negócios">Negócios</MenuItem>
//                   </Select>
//                   <FormHelperText>Selecione seus gêneros preferidos</FormHelperText>
//                 </FormControl>
//               </div>
//               <div className="input-group">
//                 <label htmlFor="phone">Telefone</label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   placeholder="Digite seu telefone"
//                   required
//                 />
//               </div>
//               <div className="input-group">
//                 <label htmlFor="socialMedia">Redes Sociais</label>
//                 <input
//                   type="text"
//                   id="socialMedia"
//                   value={socialMedia}
//                   onChange={(e) => setSocialMedia(e.target.value)}
//                   placeholder="Digite suas redes sociais"
//                 />
//               </div>
//               <button type="submit" className="add-profile-button">
//                 salvar Perfil
//               </button>
//             </form>
//           </div>
//         </div>
//         <ButtonBack />
//         <Footer />
  
//         <Modal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//       >
//         <Box sx={modalStyle}>
//           <Typography id="modal-title" variant="h6" component="h2">
//             Confirmar Cadastro
//           </Typography>
//           <Typography id="modal-description" sx={{ mt: 2 }}>
//             Deseja salvar o perfil de "{name}"?
//           </Typography>
//           <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
//             <Button variant="contained" color="primary" onClick={handleConfirmSave}>
//               Confirmar
//             </Button>
//             <Button variant="outlined" color="secondary" onClick={() => setOpenModal(false)}>
//               Cancelar
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//       </div>
//     );
//   };
  
//   export default UserProfile;
  
