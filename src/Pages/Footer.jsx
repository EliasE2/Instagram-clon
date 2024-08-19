import React from 'react';

const Footer = ({ onLoginClick }) => {
  return (
    <>
      <div className="text-aligned">
        <p className="line1">Es posible que las personas que usan nuestro</p>
        <p className="line2">servicio hayan subido tu información de contacto</p>
        <p className="line3">a Instagram. <span className='inf__color'>más información</span></p>
      </div>
      <div className="terms-container">
        <p className="terms-text">Al registrarte, aceptas nuestras <span className='inf__color'>Condiciones</span>, la</p>
        <p className="terms-text policy"> <span className='inf__color'>Política de privacidad</span> y la <span className='inf__color'>Política de cookies</span>.</p>
      </div>
      <div>
      </div>
    </>
  );
};

export default Footer;
