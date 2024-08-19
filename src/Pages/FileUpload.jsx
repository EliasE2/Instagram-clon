import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db, storage } from '../data/firebase';
import './FileUpload.css';
import insta from "../image/Instagram.png"

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  // Medidas permitidas
  const MAX_WIDTH = 1080;
  const MAX_HEIGHT = 1080;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Crear un objeto Image para verificar las dimensiones
    const img = new Image();
    img.src = URL.createObjectURL(selectedFile);
    img.onload = () => {
      if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
        setError(`La imagen debe tener un máximo de ${MAX_WIDTH}x${MAX_HEIGHT} píxeles.`);
        setFile(null); // No se permite la imagen
      } else {
        setError(''); // Sin errores, se puede proceder
        setFile(selectedFile);
      }
    };
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !user) return;

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Error uploading file:', error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, 'posts'), {
          title,
          image: downloadURL,
          datetime: new Date(),
          userId: user.uid
        });
        setTitle('');
        setFile(null);
      }
    );
  };

  return (
    <form onSubmit={handleUpload}>
      <div className='crear'>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <span className='new-publication'>Crea una Nueva publicación</span>
      </div>
      <div>
             <input type="text" className='titulo' value={title} onChange={handleTitleChange} placeholder="Title" required /> 
      </div>
      <div>
              <input type="file" className='seleccionar-archivos' accept=".png, .jpg, .jpeg" onChange={handleFileChange} required />
      </div>
      <div>
        <img className='img-logo' src={insta} alt="" />
      </div>
      <div>
        <button type="submit" className='upload' disabled={!!error || !file}>Upload</button>
      </div>
      </div>
    </form>
  );
};

export default FileUpload;
