import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleSearch = () => {
    // Call the onSearch prop with the current searchTerm
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Enter search term"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
