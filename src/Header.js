import React, { useState } from 'react';
import './Header.css'; // Import your CSS file for styling
import {FaAlignJustify, FaHome, FaUpload, FaInfoCircle} from "react-icons/fa";
import {MdViewCarousel , MdAccountCircle} from "react-icons/md";
 
const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
<header>
  <div className='header-menu'>
    <div className='header-top'>
      
      <img src="https://firebasestorage.googleapis.com/v0/b/kaswa-1d3ad.appspot.com/o/images%2Fbg%2F20230909_172137.png?alt=media&token=0e9e50c8-92a7-4384-87ca-cf9caeacd2e3" alt="Akhi Dawah" />

    </div>
    {/* <div className='header-bottom'>
      <button className='NavToggle' onClick={toggleNav}>
      <FaAlignJustify /> Menu
      </button>
      <nav className={`NavOptions ${isNavOpen ? 'NavOpen' : ''}`}>
        <ul className="h-menu">
          <li><a href="/"><FaHome /> Home</a></li>
          <li><a href="/category"><MdViewCarousel /> Category</a></li>
          <li><a href="/contribute"><FaUpload /> Contribute</a></li>
          <li><a href="/about"><FaInfoCircle /> About</a></li>
          <li><a href="/profile"><MdAccountCircle /> Profile</a></li>
        </ul>
      </nav>
    </div> */}
  </div>
</header>

  );
};

export default Header;
