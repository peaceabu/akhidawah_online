// Carousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousal.css'; // Create this file for custom styles if needed

const Carousel = ({ cards }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,  // Show one card at a time
        slidesToScroll: 1,
      };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {cards.map((card, index) => (
          <div key={index} className="carousel-card">
            {/* Your card content goes here */}
            <h3>{card.title}</h3>

            <span className='icon' >{card.icon}</span>

            <p>{card.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
