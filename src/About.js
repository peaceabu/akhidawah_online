import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import Contacts from './Components/Contacts';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import './About.css';
import './Common.css';
import Carousel from './Components/Carousel.jsx'
import { FaKaaba, FaMosque} from "react-icons/fa"; 



const About = () => {

  const cards = [
    { title: 'Akhi Dawah', description: 'Akhi Dawah, an inspiring initiative by the Islamic Research Foundation-IRFOfficialNet. At Akhi Dawah, our hearts resonate with a profound love for Islam, and we are dedicated to bringing the Quranic verses, Hadiths, and Islamic wallpapers to life in both Tamil and English, presented in stunning High-Definition (HD) quality. Our mission is to encapsulate the wisdom and beauty of Islamic knowledge through captivating visuals.' ,icon: <FaKaaba className='icon'/>},
    { title: 'IRFOfficialNet', description: 'Islamic Research Foundation-IRFOfficialNet: IRF, a non-profit organization, is on a noble mission to introduce the true essence of Islam to non-Muslims. Our goal is to dispel misconceptions, foster understanding, and share the authentic message of Islam with Muslims and non-Muslims alike. We believe that by illuminating the path of truth, we can build bridges of harmony and promote a world where people of all backgrounds can appreciate the beauty of Islam.',icon:<FaMosque className='icon'/> },
   
    // Add more cards as needed
  ];

  return (
    <div className="About">
      <h1 className='shared-header'>About Us</h1>
       <div className='AboutCard'>
    <Carousel cards={cards} />
    <div className='ContactDiv'>
    <h1 className='shared-headertwo'>Contact Us</h1>
    <span>We value your feedback and are committed to providing a positive experience on our site. If you have suggestions to improve our content or if you would like to request the removal of specific material, please feel free to contact us.</span>
    </div>
    <Contacts />
    </div>
    </div>
    

  );
}




export default About