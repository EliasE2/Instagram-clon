import React from 'react';
import './Footer.css'; // Importa el archivo CSS para el footer

const Footer = () => {
  return (
    <footer className='footer'>
      <ul className='footer-links'>
        <li><a href="#">Meta</a></li>
        <li><a href="#">Información</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Empleo</a></li>
        <li><a href="#">Ayuda</a></li>
        <li><a href="#">API</a></li>
        <li><a href="#">Privacidad</a></li>
        <li><a href="#">Condiciones</a></li>
        <li><a href="#">Ubicaciones</a></li>
        <li><a href='#'>Instagram Lite</a></li>
        <li><a href="#">Threads</a></li>
        <li><a href="#">Importaciones de contacto y no usuarios</a></li>
        <li><a href="#">Meta Verified</a></li>
      </ul>
      <div className='footer-bottom'>
        <a href="#" className='footer-language'>Idioma</a>
        <p>&copy; 2024 Instagram from Meta</p>    
      </div>
    </footer>
  );
};

export default Footer;
