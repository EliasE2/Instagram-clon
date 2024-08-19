import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../data/firebase'; // Importa la instancia de autenticación

import Logo from './Logo';
import TextContainer from './TextContainer';
import Footer from './Footer';
import LoginPrompt from './LoginPrompt';
import './Register.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');

  const handleLoginClick = () => {
    navigate('/'); // Redirige a la página de inicio de sesión
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuario registrado:', userCredential.user);
      navigate('/'); // Redirige a la página principal después de un registro exitoso
    } catch (error) {
      console.error('Error al registrar:', error.message);
    }
  };

  return (
    <div className="register-container">
      <Logo />
      <TextContainer />
      <form onSubmit={handleRegister}>
        <div className='Inputs__Container'>
          <input
            className='IN-RG'
            type="text"
            placeholder='Número de celular o correo electrónico'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='IN-RG'
            type="text"
            placeholder='Nombre completo'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            className='IN-RG'
            type="text"
            placeholder='Nombre de usuario'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className='IN-RG'
            type="password"
            placeholder='Contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='SingIn Move2' type="submit">Registrarse</button>
      </form>
      <Footer />
      <LoginPrompt onLoginClick={handleLoginClick} /> {/* Pasa la función handleLoginClick */}
    </div>
  );
}

export default RegisterPage;
