import React, { useState, useEffect } from 'react';
import imagen1 from '/src/image/InicieP5.png';
import imagen2 from '/src/image/InicieP6.png';
import imagen3 from '/src/image/InicieP7.png';
import imagen4 from '/src/image/Iniciep8.png'

const Header = () => {
  const images = [imagen1, imagen2, imagen3, imagen4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowImage(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setShowImage(true);
      }, 500);
    }, 4000); 

    return () => clearInterval(interval); 
  }, [images.length]);

  return (
    <div className='Inicie__Container'>
      {images.map((src, index) => (
        <img
          key={index}
          className={`Inicie__images ${showImage && currentImageIndex === index ? 'show' : ''}`}
          src={src}
          alt={`Imagen ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default Header;
