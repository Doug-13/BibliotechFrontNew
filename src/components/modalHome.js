import React from 'react';
import './modal.css';

const Modal = ({ show, handleClose, handleConfirm, title, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Botão para fechar o modal */}
        <button className="modal-close-button" onClick={handleClose}>
          &times;
        </button>
        <h2>{title}</h2>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-actions">
          <button onClick={handleClose}>Editar Livro</button>
          <button onClick={handleConfirm}>Realizar Empréstimo</button>
          <button onClick={handleClose}>Deletar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
