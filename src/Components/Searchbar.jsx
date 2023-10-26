import React, { useState } from 'react';
import SearchableImageGallery from './SearchableImageGallery';
import '../styles/SearchCard.css';

const SearchCard = ({ onSearch }) => {
  const [displayedImages, setDisplayedImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  const handleSearch = (results) => {
    setDisplayedImages([]);
    setTotalPages(0);
    setCurrentPage(1);
    // You may also update other state variables if needed
  };
  return (
    <div className='SearchDiv'>
     <h1 className='shared-header'>Search</h1>
        <SearchableImageGallery onSearch={handleSearch} displayedImages={[]} />    
    </div>
  );
};

export default SearchCard;
