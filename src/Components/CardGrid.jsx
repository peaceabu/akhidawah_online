import React, { useEffect, useState } from 'react';
import './CardGrid.css';
import { MdViewCarousel,MdWallpaper,MdQuiz } from "react-icons/md";
import { FaQuran } from "react-icons/fa";
import { GiLifeBar } from "react-icons/gi";
import { LiaImages } from "react-icons/lia";
import { Link } from 'react-router-dom';

const data = [
  { title: 'Quran Verses', description: 'Access a collection of meaningful and insightful Quranic passages that provide guidance and wisdom for all aspects of life.', path: '/quran',icon:<FaQuran className="icon"/> },
  { title: 'Hadith Images', description: 'Discover a selection of Hadith images contains the sayings and traditions of the Prophet Muhammad (peace be upon him).', path: '/hadees' ,icon:<GiLifeBar className="icon"/>},
  { title: 'Islamic Wallpapers', description: 'Elevate the aesthetic of your digital space with a stunning array of Islamic wallpapers', path: '/wallpaper',icon:<MdWallpaper className="icon"/> },
  { title: 'Islamic Quiz', description: 'Test and deepen your knowledge of Islam with engaging Islamic quizzes', path: '/quiz' ,icon:<MdQuiz className="icon"/>},
  { title: 'Dawah Templates', description: 'Use Free islamic templates to create Islamic posters and dawah images', path: '/templates' ,icon:<LiaImages className="icon"/>},
];

function CardGrid() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={`card-grid ${isMounted ? 'show' : ''}`}>
      <div className="shared-header">Category </div>

      <div className="card-container">
        {data.map((item, index) => (
          // <Link to={'image-gallery/tamil/' + item.path} key={index} className="card-link">
            <div className="card" key={index}>
              <div className="content">
                <span className="title">{item.title}</span>
                <div className='iconDiv'>{item.icon}</div>
                <p className="desc">{item.description}</p>
                <Link to={'image-gallery/tamil' + item.path} className="action">
                  Find out more
                  <span aria-hidden="true"> →</span>
                </Link>
              </div>
            </div>
          
        ))}
      </div>
    </div>
  );
}

export default CardGrid;
