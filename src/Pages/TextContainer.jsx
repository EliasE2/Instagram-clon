import React from 'react';
import { FaFacebookF } from 'react-icons/fa6';

const TextContainer = () => {
  return (
    <div className='Form__Inicie'>
      <div className='Text__Container'>
        <p className='Text__Size'>
          Regístrate para ver fotos y videos de <span className='TextFriend'>tus amigos.</span>
        </p>
        <button className='SingIn move'>
          <FaFacebookF className="facebook-icon-inside" />
          Iniciar sesión con Facebook
        </button>
        <div className='lines-container LineCR'>
          <hr className='line LineR' />
          <span className='or-text'>o</span>
          <hr className='line LineR' />
        </div>
      </div>
    </div>
  );
};

export default TextContainer;
