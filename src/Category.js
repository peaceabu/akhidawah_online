// Category.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Category.css';
import './Common.css';
import Select from 'react-select';

const Category = () => {
  const navigate = useNavigate();
  const langstateOptions = [
    { value: "tamil", label: "Tamil" },
    { value: "images", label: "English"} 
  ]
  const [langselectedOption, setlangSelectedOption] = useState(langstateOptions[0]);
  const handleChange = (selected) => {
    setlangSelectedOption(selected);
  };
  const navigateToImageGallery = (category) => {
    navigate(`/image-gallery/${langselectedOption.value}/${category}`);
  };
  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "white" : "#212529",
      backgroundColor: state.isSelected ? "#212529" : "#ffff",
      }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#212529",
      padding: "10px",
      border: "none",
      boxShadow: "none",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
  };
  return (
    <div>
      <h1 className='shared-header'>Category</h1>
      <div className='LangDiv'>
          <label htmlFor="langlabel">Choose Language</label>
          <Select
            id="lang"
            options={langstateOptions}
            value={langselectedOption}
            onChange={handleChange}
            styles={customStyles}
            isSearchable={false}
          />
        </div>
        {langselectedOption.value === 'images' ? (
        <div className='ImgCat - English'>
        
        {/* <div className='ViewLatestOptions'>
            <h1>Latest Images</h1>
            <button onClick={() => navigateToImageGallery('latest')}>View Images</button>
          </div> */}
        <div className='ViewQuranOptions'>
            <h1>Quran Verses</h1>
            <button onClick={() => navigateToImageGallery('quran')}>View Images</button>
          </div>
          <div className='ViewImgOptions'>
            <h1>Hadees Images</h1>
            <button onClick={() => navigateToImageGallery('hadees')}>View Images</button>
          </div>
        
          <div className='ViewWallpaperOptions'>
            <h1>Islamic Wallpapers</h1>
            <button onClick={() => navigateToImageGallery('wallpaper')}>View Images</button>
          </div>
          <div className='ViewQuizOptions'>
            <h1>Islamic Quiz</h1>
            <button onClick={() => navigateToImageGallery('quiz')}>View Images</button>
          </div>
        </div>
        ) : (
        <div className='ImgCat - Tamil'>
        
        {/* <div className='ViewLatestOptions'>
            <h1>Latest Images</h1>
            <button onClick={() => navigateToImageGallery('latest')}>View Images</button>
          </div> */}
        <div className='TamilQuranOptions'>
            <h1>Quran Verses</h1>
            <button onClick={() => navigateToImageGallery('quran')}>View Images</button>
          </div>
          <div className='TamilImgOptions'>
            <h1>Hadees Images</h1>
            <button onClick={() => navigateToImageGallery('hadees')}>View Images</button>
          </div>
        
          <div className='TamilWallpaperOptions'>
            <h1>Islamic Wallpapers</h1>
            <button onClick={() => navigateToImageGallery('wallpaper')}>View Images</button>
          </div>
          <div className='TamilQuizOptions'>
            <h1>Islamic Quiz</h1>
            <button onClick={() => navigateToImageGallery('quiz')}>View Images</button>
          </div>
        </div>
        )}
    </div>
  );
};

export default Category;
