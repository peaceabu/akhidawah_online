import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import './Mediagallery.css';
import './Common.css';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { MdDelete } from 'react-icons/md';
import {FaUpload} from "react-icons/fa";
import {BiLogOut, BiLogIn} from "react-icons/bi";
import { Bars } from 'react-loader-spinner';

const firebaseApp = initializeApp(firebaseConfig);

const Profile = () => {
  const [user, setUser] = useState(null); // State to store user information
  const [profileImages, setProfileImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Firebase listener to check if a user is logged in
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged in
        setUser(authUser);
        // Fetch and filter images based on profile name
        fetchImagesByProfileName(authUser.displayName);
      } else {
        // User is not logged in
        setUser(null);
        // Clear the profile images when the user logs out
        setProfileImages([]);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

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

  const fetchImagesByProfileName = (profileName) => {
    setLoading(true);
    const storageRef = firebase.storage().ref();
  
    // Function to recursively list items in a folder and its subfolders
    const listAllItems = (ref) => {
      return ref.listAll().then((result) => {
        const downloadURLsPromises = [];
  
        // Map each item to its getDownloadURL promise
        const itemPromises = result.items.map((item) => {
          return item.getMetadata().then((metadata) => {
            // Check if the profile name in metadata matches the user's profile name
            const matchesProfile = metadata.customMetadata && metadata.customMetadata.author === profileName;
            if (matchesProfile) {
              console.log("Matched:", item.name);
              return item.getDownloadURL(); // Return the download URL promise
            }
            return null;
          });
        });
  
        // Recursively list items in subdirectories
        const subdirPromises = result.prefixes.map((prefix) => {
          return listAllItems(prefix);
        });
  
        // Wait for all item promises to resolve and filter out null values
        return Promise.all(itemPromises)
          .then((downloadURLs) => downloadURLs.filter((url) => url !== null))
          .then((filteredDownloadURLs) => {
            // Combine filteredDownloadURLs with download URLs from subdirectories
            downloadURLsPromises.push(...filteredDownloadURLs);
            return Promise.all(subdirPromises);
          })
          .then((subdirDownloadURLs) => {
            // Combine download URLs from subdirectories with downloadURLsPromises
            downloadURLsPromises.push(...subdirDownloadURLs.flat());
            return downloadURLsPromises;
          });
      });
    };
  
    // Start the recursive listing from the root folder
    listAllItems(storageRef)
      .then((downloadURLs) => {
        // Flatten the nested arrays of download URLs
        const flattenedURLs = [].concat(...downloadURLs);
        // Set the filtered image URLs in state
        setProfileImages(flattenedURLs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setLoading(false);
      });
  };
  

  const deleteImage = (imageUrl) => {
    const storageRef = firebase.storage().refFromURL(imageUrl);
  
    // Delete the image
    storageRef
      .delete()
      .then(() => {
        console.log('Image deleted successfully.');
        fetchImagesByProfileName(user.displayName);
              })
      .catch((error) => {
        alert('Error deleting image:', error);
      });
  };

  return (
    <div className="HandleAppCls">
      <h1 className='shared-header'>Profile</h1>
      <header className="HandleAppCls-header">
        {user ? (
          // If user is logged in, display the logout button
          <div>
            <p>Welcome, {user.displayName}!</p>
            <button onClick={handleLogout}>Logout <BiLogOut /></button>
            {/* Display the filtered images here */}
            <div className='MaingalleryDiv'>
            {profileImages.length > 0 ? (
            <div className='ProfileDiv'>
            <h1>My Uploads</h1>
            <div className='galleryDiv'>
              
              {profileImages.map((imageUrl, index) => (
                <div key={index} className='image-card'>
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Profile Image ${index}`}
                  className='img'
                /> 
                <div className='downloadBtn'>
                <button onClick={() => deleteImage(imageUrl)}>
                  Delete <MdDelete />
                </button>
              </div>
                </div>
              ))}
              
            </div>
            </div>
              ) : (
                <div className='empty-gallery-message'>
                  {/* Show this div when profileImages is empty */}
                  You didn't upload any Images
                  <Link to="/contribute">
                  <button><FaUpload /> Upload Now</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          // If user is not logged in, display the login button
          <div>
            <p>You are not logged in.</p>
            <button onClick={handleLogin}>Login <BiLogIn /></button>
          </div>
        )}
      </header>
      {loading && (
        <div className='loader-overlay'>
          <Bars type='TailSpin' color='#00BFFF' height={80} width={80} />
        </div>
      )}
    </div>
  );
};

export default Profile;
