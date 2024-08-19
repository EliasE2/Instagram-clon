import React from 'react';
import './FacebookIcon.css'; // Asegúrate de importar el archivo CSS

const FacebookIcon = () => {
  return (
    <div className="facebook-icon-container">
      <svg className='facebook-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12.1C22 6.489 17.511 2 12 2S2 6.489 2 12.1c0 5.01 3.873 9.14 8.88 9.9v-6.99h-2.68v-2.91h2.68v-2.23c0-2.66 1.28-4.16 3.23-4.16 1.16 0 2.38.21 2.38.21v2.64h-1.34c-1.32 0-1.73.82-1.73 1.66v1.96h2.89l-.46 2.91h-2.43v6.99c5.07-.76 8.88-4.89 8.88-9.9z" fill="#3b5998"/>
      </svg>
    </div>
  );
}

export default FacebookIcon;
