import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../data/firebase'; // Importa la instancia de autenticación
import FacebookIcon from '../Icons/FacebookIcon';
import { useNavigate } from 'react-router-dom';


const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Usa useNavigate para la redirección

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuario logueado:', userCredential.user);
      navigate('/home'); // Redirige a HomePage después del inicio de sesión exitoso
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  return (
    <div className='Form__Container'>
      <div className='Logo'>
        <img className='Image' src="/src/image/Logo.png" alt="" />
      </div>
      <div className='Form'>
        <form onSubmit={handleLogin}>
          <input
            className='Email__Password'
            type="text"
            placeholder='Telefono, usuario o correo electronico'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='Email__Password'
            type="password"
            placeholder='Contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='SingIn' type="submit">Iniciar sesión</button>
        </form>
        <div className='lines-container'>
          <hr className='line' />
          <span className='or-text'>o</span>
          <hr className='line' />
        </div>
        <div className='icon-text-container'>
          <FacebookIcon /> 
          <span className='facebook-text'><a href="#">Inicia sesión con Facebook</a></span>
        </div>
        <div className='forgot-password-container'>
          <span className='forgot-password'>¿Olvidaste tu contraseña?</span>
        </div>
      </div>
    </div>
  );
}

export default Form;
