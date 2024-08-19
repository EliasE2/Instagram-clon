import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import Logo from '../../src/image/Logo2.png';
import Search from '../Icons/Search';
import House from '../Icons/House';
import Compass from '../Icons/Compass';
import Heart from '../Icons/heart';
import Threads from '../Icons/FaThreads'; 
import Menu from '../Icons/Menu';
import { FaPlusSquare, FaFilm, FaFacebookMessenger, FaUser, FaTimes } from 'react-icons/fa';
import { FaInstagram } from "react-icons/fa6";

const Sidebar = ({ onCreateClick, onSearch }) => {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(storedSearches);
  }, []);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const toggleSearchBox = () => setShowSearchBox(!showSearchBox);

  const handleSearchInput = (e) => setSearchQuery(e.target.value);

  const handleAddSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      setRecentSearches([searchQuery, ...recentSearches]);
      onSearch(searchQuery); // Pasar el término de búsqueda a HomePage
      setSearchQuery('');
    }
  };

  const handleClearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleRemoveSearch = (searchToRemove) => {
    setRecentSearches(recentSearches.filter(search => search !== searchToRemove));
  };

  const handleRecentSearchClick = (search) => {
    onSearch(search); // Pasar el término de búsqueda a HomePage
    setSearchQuery('');
  };

  return (
    <>
      <nav className={`sidebar ${showSearchBox ? 'sidebar-collapsed' : ''}`}>
        <div className="sidebar-logo">
          {showSearchBox ? (
            <div className="logo-and-title">
              <FaInstagram className="logo-icon" />
            </div>
          ) : (
            <img src={Logo} alt="Logo" className="logo-image" />
          )}
        </div>
        <Link to="/home" className="sidebar-item">
          <House className="icon-house" />
          <span>Inicio</span>
        </Link>
        <div className="sidebar-item" onClick={toggleSearchBox}>
          <Search className="icon-search" />
          <span>Buscar</span>
        </div>
        <Link to="/explore" className="sidebar-item">
          <Compass className="icon-explore" />
          <span>Explorar</span>
        </Link>
        <Link to="/reels" className="sidebar-item">
          <FaFilm className="icon-reels" />
          <span>Reels</span>
        </Link>
        <Link to="/messages" className="sidebar-item">
          <FaFacebookMessenger className="icon-messages" />
          <span>Mensajes</span>
        </Link>
        <Link to="/notifications" className="sidebar-item">
          <Heart className="icon-notifications" />
          <span>Notificaciones</span>
        </Link>
        <div className="sidebar-item" onClick={onCreateClick}>
          <FaPlusSquare className="icon-create" />
          <span>Crear</span>
        </div>
        <Link to="/profile" className="sidebar-item">
          <FaUser className="icon-profile" />
          <span>Perfil</span>
        </Link>
        <div className="sidebar-bottom">
          <Link to="/threads" className="sidebar-item">
            <Threads className="icon-threads" />
            <span>Threads</span>
          </Link>
          <Link to="/more" className="sidebar-item">
            <Menu className="icon-more" />
            <span>Más</span>
          </Link>
        </div>
      </nav>

      {showSearchBox && (
        <div className="search-box">
          <span className="search-title">Buscar</span>
          <input
            className="search-input"
            type="text"
            placeholder="Buscar"
            value={searchQuery}
            onChange={handleSearchInput}
            onKeyDown={handleAddSearch}
          />
          <div className="search-line"></div>
          <div className="search-recent-container">
            <span className="search-recent">Recientes</span>
            <span className="clear-all" onClick={handleClearAll}>
              Borrar todo
            </span>
          </div>
          <div className="recent-searches-list">
            {recentSearches.map((search, index) => (
              <div key={index} className="recent-search-item" onClick={() => handleRecentSearchClick(search)}>
                {search}
                <FaTimes 
                  className="remove-icon" 
                  onClick={() => handleRemoveSearch(search)} 
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
