import React from 'react';
import '../Css/styleFooter.css'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Contato</h4>
          <p>Email: contato@seusite.com</p>
          <p>Telefone: (11) 1234-5678</p>
        </div>
        <div className="footer-section">
          <h4>Siga-nos</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
