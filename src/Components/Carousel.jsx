// Carousel.js

import React from 'react';
import './Carousal.css'; // Custom styles

const Carousel = ({ cards }) => {
  return (
    <div className="carousel-container">
      {cards.map((card, index) => (
        <div key={index} className="carousel-card">
          {/* Your card content goes here */}
          <h3>{card.title}</h3>
          <span className='icon'>{card.icon}</span>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
