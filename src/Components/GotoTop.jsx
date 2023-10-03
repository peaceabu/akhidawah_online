// GoToTopButton.js
import React, { useState } from 'react';
import './GoToTop.css'
import {MdOutlineVerticalAlignTop} from 'react-icons/md'

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <button
      className={`go-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      <MdOutlineVerticalAlignTop />
    </button>
  );
};

export default GoToTopButton;
