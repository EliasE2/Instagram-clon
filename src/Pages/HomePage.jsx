import React, { useState } from 'react';
import Sidebar from './Sidebar';
import FeedPost from './FeedPost';
import FileUpload from './FileUpload';
import './HomePage.css';

const HomePage = () => {
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleFileUpload = () => {
    setShowFileUpload(!showFileUpload);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="homepage">
      <Sidebar onCreateClick={handleToggleFileUpload} onSearch={handleSearch} />
      <div className="content">
        {showFileUpload && <FileUpload />}
        <FeedPost searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default HomePage;
