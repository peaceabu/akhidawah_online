import React, { useState } from 'react';
import firebase from 'firebase/compat/app';

import 'firebase/compat/storage';
import 'firebase/compat/database';
import './Content.css';
import './Common.css';
import Search from './Search';
import CardGrid from './Components/CardGrid';
import About from './About'
// import Contacts from './Components/Contacts';
// import Category from './Category'
// import { Link, useNavigate } from 'react-router-dom';
// import firebaseConfig from './firebaseConfig';
import SearchableImageGallery from './Components/SearchableImageGallery';



// firebase.initializeApp(firebaseConfig);



const Content = () => {
  const [displayedImages, setDisplayedImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  const handleSearch = (results) => {
    console.log('resultr',results)
    setDisplayedImages([]);
    setTotalPages(0);
    setCurrentPage(1);
    // You may also update other state variables if needed
  };
  return (
    <div className="App">
      <div className='ConetntDiv'>
      <h1 className='shared-header'>Islamic Image Gallery</h1>
      <header className="App-header">
        
      <div className="quote">
        <p>"There is no god but He: That is the witness of Allah, His angels, and those endued with knowledge, standing firm on justice. There is no god but He, the Exalted in Power, the Wise  "</p>
        <b>[Quran, 3:18]</b>
       
    </div>
    <div className='centrelogo'>
    <img src="https://firebasestorage.googleapis.com/v0/b/kaswa-1d3ad.appspot.com/o/images%2Fbg%2Foie_TVlCEtqS5Sj6%20(2).png?alt=media&token=8b6a54fe-4403-4586-894c-62f50a4bfcb2" alt="IRFOfficialNet" />
    </div>
    <div className="welcome-message">
      <h2>Assalmu Alaikum !</h2>
        <p>Welcome to Akhi Dawah, an inspiring initiative by the Islamic Research Foundation-IRFOfficialNet. At Akhi Dawah, our hearts resonate with a profound love for Islam, and we are dedicated to bringing the Quranic verses, Hadiths, and Islamic wallpapers to life in both Tamil and English, presented in stunning High-Definition (HD) quality. Our mission is to encapsulate the wisdom and beauty of Islamic knowledge through captivating visuals.</p>
    </div>

      </header>
      <Search />
      
    </div>
    
    <SearchableImageGallery onSearch={handleSearch} displayedImages={[]} />
    <CardGrid />
   
    </div>
  );
}




export default Content