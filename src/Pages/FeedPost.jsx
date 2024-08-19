import React, { useState, useEffect } from 'react';
import { db } from '../data/firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore';
import './FeedPost.css';
import Heart from '../Icons/heart';
import { FaRegComment } from 'react-icons/fa'; // Importa FaRegComment
import SendIcon from '../Icons/enviar';
import SaveIcon from '../Icons/guardar';
import { FaArrowLeft } from 'react-icons/fa'; // Importa el ícono de flecha

const FeedPost = ({ searchQuery }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set()); // Set para mantener el estado de los likes
  const [showComments, setShowComments] = useState(null); // Estado para mostrar comentarios
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('datetime', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        image: doc.data().image,
        userId: doc.data().userId,
        datetime: doc.data().datetime.toDate().toLocaleString(),
        likes: doc.data().likes || 0,
        comments: doc.data().comments || [] // Obtener comentarios
      }));
      setPosts(allPosts);
      if (searchQuery) {
        setFilteredPosts(allPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase())));
      } else {
        setFilteredPosts(allPosts);
      }
    });

    return () => unsubscribe();
  }, [searchQuery]);

  const handleLike = async (id, currentLikes) => {
    const newLikes = likedPosts.has(id) ? currentLikes - 1 : currentLikes + 1;
    const newLikedPosts = new Set(likedPosts);
    if (likedPosts.has(id)) {
      newLikedPosts.delete(id);
    } else {
      newLikedPosts.add(id);
    }
    setLikedPosts(newLikedPosts);

    try {
      await updateDoc(doc(db, 'posts', id), {
        likes: newLikes
      });
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'posts', id));
      console.log('Publicación eliminada');
    } catch (error) {
      console.error('Error al eliminar publicación:', error.message);
    }
  };

  const handleAddComment = async (postId) => {
    if (newComment.trim() === '') return;

    try {
      const postRef = doc(db, 'posts', postId);
      const post = posts.find(post => post.id === postId);
      await updateDoc(postRef, {
        comments: [...post.comments, newComment]
      });
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (postId, commentIndex) => {
    try {
      const postRef = doc(db, 'posts', postId);
      const post = posts.find(post => post.id === postId);
      const updatedComments = post.comments.filter((_, index) => index !== commentIndex);
      await updateDoc(postRef, { comments: updatedComments });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="feed-post-container">
      {searchQuery && (
        <button className="back-button" onClick={() => window.location.search = ''}>
          <FaArrowLeft /> Regresar
        </button>
      )}
      {filteredPosts.map(post => (
        <div key={post.id} className="feed-post">
          <div className="feed-post-header">
            <div className="user-info">
              <span className="username">Usuario {post.userId}</span>
              <span className="post-time">{post.datetime}</span>
            </div>
            <button onClick={() => handleDelete(post.id)} className="delete-btn">Eliminar</button>
          </div>
          <div className="feed-post-image-container">
            <img className="feed-post-image" src={post.image} alt={post.title} />
          </div>
          <div className="feed-post-icons">
            <Heart
              className={`like-icon ${likedPosts.has(post.id) ? 'liked' : ''}`}
              onClick={() => handleLike(post.id, post.likes)}
            />
            <FaRegComment onClick={() => setShowComments(showComments === post.id ? null : post.id)} />
            <SendIcon />
            <SaveIcon />
          </div>
          <div className="feed-post-title">
            <span className="username">Usuario {post.userId}</span>
            <span>{post.title}</span>
          </div>
          {showComments === post.id && (
            <div className="feed-post-comments">
              <div className="comment-form">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Añadir un comentario..."
                />
                <button onClick={() => handleAddComment(post.id)}>Enviar</button>
              </div>
              {post.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <span className="comment-text">{comment}</span>
                  <button onClick={() => handleDeleteComment(post.id, index)} className="delete-comment-btn">Eliminar</button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeedPost;
