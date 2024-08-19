import React from 'react';

const LoginPrompt = ({ onLoginClick }) => {
  return (
    <div className='login-prompt'>
      <p>¿Tienes una cuenta? <span className='Sing__color' onClick={onLoginClick}>Iniciar sesión</span></p>
    </div>
  );
};

export default LoginPrompt;
