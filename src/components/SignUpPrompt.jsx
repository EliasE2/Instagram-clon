// src/components/SignUpPrompt.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SignUpPrompt = () => {
  return (
    <div className='signup-prompt'>
      <p>¿No tienes una cuenta? <Link to='/register'><b>Regístrate</b></Link></p>
    </div>
  );
}

export default SignUpPrompt;
