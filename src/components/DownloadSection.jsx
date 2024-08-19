import React from 'react';

const DownloadSection = () => {
  const handleMicrosoftClick = () => {
    const userConfirmed = window.confirm('¿Abrir Microsoft Store?');
    if (userConfirmed) {
      window.location.href = 'https://apps.microsoft.com/detail/9nblggh5l9xt?hl=es-co&gl=CO';
    }
  };

  return (
    <div className='dowland'>
      <div className='dowland__text'>
        <p>Descargar la app</p>
      </div>
      <div className='dowland__image'>
        <a
         href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3D47B36D66-F1B5-4E75-A93B-2CD7BF6D16C0%26utm_campaign%3DunifiedHome%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge"
         target='_blank'
         rel='noopener noreferrer'
         >
          <img className='playStore__image' src="/src/image/Dowland.png" alt="Google Play Store" />
         </a>
         
          <img className='microsoft__image'
           src="/src/image/Microsoft.png"
           alt="Microsoft Store"
           width={100}
           height={60}
           onClick={handleMicrosoftClick}
         />
      </div>
    </div>
  );
};

export default DownloadSection;
