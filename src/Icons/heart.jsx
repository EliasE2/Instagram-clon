import React from 'react';
import { CiHeart } from 'react-icons/ci';
import '../../src/Pages/FeedPost.css';

const Heart = ({ className, onClick }) => {
  return (
    <CiHeart className={className} onClick={onClick} />
  );
};

export default Heart;
