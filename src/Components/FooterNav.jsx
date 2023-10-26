// Navigation.js

import React, { useState, useEffect } from 'react';
import { FaHome, FaUpload, FaInfoCircle,FaSearch } from 'react-icons/fa';
import { MdViewCarousel, MdAccountCircle } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import './FooterNav.css';

const Navigation = () => {
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState('');

  useEffect(() => {
    // Extract the path name from the current route
    const pathname = location.pathname.replace('/', '');

    // Set the active state based on the current route
    setActiveNavItem(pathname || 'Home');
  }, [location]);

  return (
    <ul className="navigation">
      <li className={`nav-item ${activeNavItem === 'Home' ? 'active' : ''}`}>
        <Link to="/">
          <FaHome /> Home
        </Link>
      </li>
      <li className={`nav-item ${activeNavItem === 'searchcard' ? 'active' : ''}`}>
        <Link to="/searchcard">
          <FaSearch /> Search
        </Link>
      </li>
      <li className={`nav-item ${activeNavItem === 'category' ? 'active' : ''}`}>
        <Link to="/category">
          <MdViewCarousel /> Category
        </Link>
      </li>
      <li className={`nav-item ${activeNavItem === 'contribute' ? 'active' : ''}`}>
        <Link to="/contribute">
          <FaUpload /> Contribute
        </Link>
      </li>
      <li className={`nav-item ${activeNavItem === 'about' ? 'active' : ''}`}>
        <Link to="/about">
          <FaInfoCircle /> About
        </Link>
      </li>
      <li className={`nav-item ${activeNavItem === 'profile' ? 'active' : ''}`}>
        <Link to="/profile">
          <MdAccountCircle /> Profile
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
