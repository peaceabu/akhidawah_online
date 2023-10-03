import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';

import 'firebase/compat/storage';
import 'firebase/compat/database';
import './MediaHanle.css';
import './Common.css';
import Select from 'react-select';
import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import {BiLogOut, BiLogIn} from "react-icons/bi";
import {FaCircleArrowUp } from "react-icons/fa6";
import {MdOutlineWarning} from "react-icons/md";
import {FaFileUpload} from "react-icons/fa";
import Loader from './Components/loader'
import { Button } from 'bootstrap';




firebase.initializeApp(firebaseConfig);

const Mediahanle = () => {
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [user, setUser] = useState(null); 
  const [showPolicy, setShowPolicy] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const togglePolicy = () => {
    setShowPolicy(!showPolicy);
  };

  const stateOptions = [
    { value: "quran", label: "Quran Images" },
    { value: "hadees", label: "Hadees Images" },
    { value: "wallpaper", label: "Wallpapers" },
    { value: "quiz", label: "Islamic Quiz" },
    { value: "templates", label: "Islamic Templates"}
  ]
  const quizstateOptions = [
    { value: "A", label: "A" },
    { value: "B", label: "B"},
    { value: "C", label: "C" }    
  ]
  
  const [dropselectedOption, setDropSelectedOption] = useState(stateOptions[0]);
  const [quizdropselectedOption, setquizDropSelectedOption] = useState(quizstateOptions[2]);
  
  
  useEffect(() => {
    // Firebase listener to check if a user is logged in
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged in
        setUser(authUser);
      } else {
        // User is not logged in
        setUser(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  const handleChange = (selected) => {
    setDropSelectedOption(selected);
  };
  const quizhandleChange = (selected) => {
    setquizDropSelectedOption(selected);
  };
  const langstateOptions = [
    { value: "tamil", label: "Tamil" },
    { value: "images", label: "English"} 
  ]
  const [langselectedOption, setlangSelectedOption] = useState(langstateOptions[0]);
  const langhandleChange = (selected) => {
    setlangSelectedOption(selected);
  };

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#212529" : "#fff",
      backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
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
  const inputStyles = {
    backgroundColor: "#212529",
    padding: "15px",
    border: "none",
    boxShadow: "none",
    color: "#fff",
  };  
   const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    
  };

  const handleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

const submitform = () => {
  console.log('submit clicked')
  if (inputValue != ''){
    if (dropselectedOption) {
      setIsUploading(true);
      setShowSuccessMessage(false); 
      scrollToLoadingDiv();
      // Rest of your code
      const file = selectedFile
      const storagePath = langselectedOption.value + '/' + dropselectedOption.value + '/' + file.name;
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(storagePath);
      const metadata = {
        customMetadata: {
          author: user.displayName,
          description: inputValue,
          answer: quizdropselectedOption.value
        },
      };
      
      imageRef.put(file, metadata).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      setUploadSuccess(true);
      setIsUploading(false); // Hide the modal
      setSelectedFile(null); // Clear the selected file
      setShowSuccessMessage(true);
  
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    });         
    }
  }
  else{
    alert('Please Enter Description')
  }
  
}


const scrollToLoadingDiv = () => {
  const loadingDiv = document.getElementById('loadingDiv'); // Replace 'loadingDiv' with the actual ID or class name
  if (loadingDiv) {
    loadingDiv.scrollIntoView({ behavior: 'smooth' });
  }
};
  return (
    <div className="HandleAppCls">
      <h1 className='shared-header'>Share Your Work</h1>
      <header className="HandleAppCls-header">
        
        <p>{'Narrated `Abdullah bin `Amr, “The Prophet (ﷺ) said, "Convey (my teachings) to the people even if it were a single sentence'}</p>
        <p>{"Sahih al Bukhaari, Book of Prophets, hadith-3461."}</p>
       <button onClick={togglePolicy}>Read Me <MdOutlineWarning /></button>
       {showPolicy && (
        <div className='PolicyDiv'>
        <p>{'Images Uploading only should be Islamic related based on categories Quran,Hadiths,Wallpaper,Quiz.Any irrelevant post or Wrong information post will deleted and the profile will be blocked from accessing site'}</p>
        <p>{'AKHI DAWAH'}</p>
        <button onClick={togglePolicy}>OK</button>
        </div>
        )}
        {user ? (
          <div className='uploadmain'>
        <div className='uploadDiv'>
        <label>Upload Image</label>
        <label htmlFor="fileInput" className="custom-file-input">
        <img src={'/plus.png'} alt="PNG Image" className="image-style" />
        {/* <FaFileUpload style={{ fontSize: '28px' }} /> */}
        <input
          type="file"
          id="fileInput"
          onChange={handleFileUpload}
          style={{ display: 'none' }} 
          accept="image/*" />
         
      </label>
     
      </div>
      
        {selectedFile && (
          <div>
            <p>Selected File: {selectedFile.name}</p>
            <img src={URL.createObjectURL(selectedFile)} className='imgfile' alt="Selected" />
          </div>
        )}
        {uploadSuccess && <p className="success-message">Image uploaded successfully!</p>}

        <div className='LangDiv'>
          <label htmlFor="langlabel">Choose Language</label>
          <Select
            id="lang"
            options={langstateOptions}
            value={langselectedOption}
            onChange={langhandleChange}
            styles={customStyles}
            
          />
        </div>
        <div className='CategoryDiv'>
          <label htmlFor="category">Image Category</label>
          <Select
            id="category"
            options={stateOptions}
            value={dropselectedOption}
            onChange={handleChange}
            isSearchable={false}
            styles={customStyles}
          />

        </div>
        <div className='DescDiv'>
          <label htmlFor="desc">Description</label>
          <input
              type="text"
              id="text-input"
              value={inputValue}
              onChange={handleInputChange}
              className="custom-input"
              placeholder='Ex. Quran 112:3'
            />

        </div>
        {dropselectedOption.value === 'quiz' ? (
        <div className='QuizDiv'>
          <label htmlFor="quizlabel">Choose Answer</label>
          <Select
            id="quiz"
            options={quizstateOptions}
            value={quizdropselectedOption}
            onChange={quizhandleChange}

            styles={customStyles}
          />

        </div>
        ):null}
{isUploading && (
         
         <Loader isUploading={isUploading} showSuccessMessage={showSuccessMessage} />
        )}
        <button onClick={() => submitform()}>Submit <FaCircleArrowUp /></button>
        <div>
            
            <button onClick={handleLogout}>Logout <BiLogOut /></button>
          </div>
        </div>
         ) : (
          // If user is not logged in, display a login button
          <div>
            <p>You are not logged in.</p>
            <button onClick={handleLogin}>Login with Google <BiLogIn /></button>
          </div>
        )}
      </header>
    </div>

  );
}

export default Mediahanle;
