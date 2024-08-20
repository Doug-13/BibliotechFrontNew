import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/styleUserProfile.css';

const ButtonBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="button-container">
      <button onClick={handleGoBack} className="button-back">
        Voltar
      </button>
    </div>
  );
};

export default ButtonBack;

// import React from 'react';

// import { useNavigate  } from 'react-router-dom';

// const ButtonBack = () => {
//     const navigate = useNavigate();
  
//     const handleGoBack = () => {
//       navigate(-1); // Navega para a página anterior
//     };
  
//     return (
//         <div className="button-container">
//             <button onClick={handleGoBack}>
//                 Voltar
//             </button>
//       </div>
//     );
//   };

// export default ButtonBack;