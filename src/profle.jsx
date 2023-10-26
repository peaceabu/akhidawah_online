import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import './Mediagallery.css';
import './Common.css';
import './profile.css';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { MdDelete, MdEditSquare ,MdCancel} from 'react-icons/md';
import { FaUpload,FaArrowCircleRight,FaArrowCircleLeft } from 'react-icons/fa';
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { Bars } from 'react-loader-spinner';
import {FaCircleArrowUp } from "react-icons/fa6";

const firebaseApp = initializeApp(firebaseConfig);

const Profile = () => {
  const [user, setUser] = useState(null); // State to store user information
  const [profileImages, setProfileImages] = useState([]);
  const [ImagesInfo, setImagesInfo] = useState([]);
  const [Imgurl, setImgurl] = useState('');
  const [loading, setLoading] = useState(false);
  const [editdiv, setEdidiv] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);
  const [imageMetadata, setImageMetadata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9; // Number of images per page
  const [totalPages, setTotalPages] = useState(0);

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
    const imageInfo = [];
    const storageRef = firebase.storage().ref();
  
    const listAllItems = async (ref) => {
      try {
        const result = await ref.listAll();
        const downloadURLsPromises = [];
  
        const itemPromises = result.items.map(async (item) => {
          try {
            const metadata = await item.getMetadata();
            const matchesProfile = (metadata.customMetadata && metadata.customMetadata.author === profileName) || (profileName === "ABDUL MALIK" && metadata.customMetadata === undefined);
  
            if (matchesProfile) {
              let tagvalues;
              let path;
  
              if (metadata.customMetadata) {
                tagvalues = metadata.customMetadata.tags;
                path = metadata.customMetadata;
              } else {
                tagvalues = '';
                path = '';
              }
  
              
              const url = await item.getDownloadURL();
              imageInfo.push({ url, metadata: tagvalues });
              return { url, metadata: tagvalues };
            }
  
            return null;
          } catch (error) {
            console.error("Error fetching item metadata:", error);
            return null;
          }
        });
  
        const subdirPromises = result.prefixes.map((prefix) => {
          return listAllItems(prefix);
        });
  
        const resolvedItemPromises = await Promise.all(itemPromises);
        const filteredDownloadURLs = resolvedItemPromises.filter((item) => item !== null);
  
        downloadURLsPromises.push(...filteredDownloadURLs);
  
        const subdirDownloadURLs = await Promise.all(subdirPromises);
        downloadURLsPromises.push(...subdirDownloadURLs.flat());
  
        return downloadURLsPromises;
      } catch (error) {
        console.error("Error listing all items:", error);
        throw error;
      }
    };
  
    listAllItems(storageRef)
      .then((downloadURLs) => {
        const flattenedURLs = [].concat(...downloadURLs);
        const startIndex = (currentPage - 1) * imagesPerPage;
        const endIndex = currentPage * imagesPerPage;
        const slicedImages = flattenedURLs.slice(startIndex, endIndex);
  
        const slicedImageInfo = imageInfo.slice(startIndex, endIndex);
  
        setImagesInfo(slicedImageInfo);
        setTotalPages(Math.ceil(flattenedURLs.length / imagesPerPage));
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
  const EditToggle = (imageUrl, index) => {
    setEdidiv(true)
    setImgurl(imageUrl)
    const arrayValues = ImagesInfo[index].metadata
    let arrayFromMetadata;

    if (typeof arrayValues === 'string') {
      // Assuming your metadata is comma-separated, change the delimiter as needed
      arrayFromMetadata = arrayValues.split(',');
    } else {
      // Handle the case where arrayValues is not a string
      arrayFromMetadata = []; // or any other default value
    }
    
    setTags(arrayFromMetadata);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTags = () => {
    if (inputValue.trim() !== '') {
      setTags([...tags, inputValue]);
      setInputValue('');
    }
  };
  const handleRemoveTags = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };
  
  const CloseToggle = () => {
    setEdidiv(false)
  };

 

const SubmitToggle = async () => {
  setEdidiv(false);
  const path = getStoragePathFromUrl(Imgurl)
  const pathArray = ImagesInfo[0].url.split('/');
  const storagePath = pathArray.slice(4).join('/'); // Adjust the index as needed
  const storageRef = firebase.storage().ref().child(path);
  try {
    const metadata = await storageRef.getMetadata();

    // Update the tags in the custom metadata
    metadata.customMetadata = {
      ...metadata.customMetadata,
      tags: tags.join(','),
    };

    await storageRef.updateMetadata(metadata);
    console.log('Metadata updated successfully.');
  } catch (error) {
    console.error('Error updating metadata:', error);
  }

  // Refetch images to reflect the changes
  fetchImagesByProfileName(user.displayName);
};

function getStoragePathFromUrl(url) {
  // Find the index of the 'o/' segment
  const startIndex = url.indexOf('o/') + 2;
  // Find the index of the '?' character
  const endIndex = url.indexOf('?');
  const pathString = url.substring(startIndex, endIndex);
  const decodedPath = decodeURIComponent(pathString);
  return decodedPath;
}

const goToPreviousPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
    fetchImagesByProfileName(user.displayName);
  }
};

const goToNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
    fetchImagesByProfileName(user.displayName);
  }
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
              {ImagesInfo.length > 0 ? (
                <div className='ProfileDiv'>
                  <h1>My Uploads</h1>
                  <div className='galleryDiv'>

                    {ImagesInfo.map((imageUrl, index) => (
                      
                      <div key={index} className='image-card'>
                      
                        <img
                          key={index}
                          src={imageUrl.url}
                          alt={`Profile Image ${index}`}
                          className='img'
                        />
                           
                        <div className='downloadBtn'>
                          <button onClick={() => deleteImage(imageUrl)}>
                            <MdDelete />
                          </button>
                          <button onClick={() => EditToggle(imageUrl.url,index)}>
                            <MdEditSquare />
                          </button>
                        </div>
                     
                      </div>
                     
                    


                    ))}
                    {editdiv && (
                      <div className='editDiv' >
                        <div className='TagsInput'>
                          <label htmlFor="interestInput">Tags</label>
                          
                          <div>
                            <input
                              type="text"
                              id="TagsInput"
                              value={inputValue}
                              onChange={handleInputChange}
                              placeholder="Type an Tags"
                              className="custom-input"
                            />
                            <button onClick={handleAddTags}>Add</button>
                          </div>
                        </div>
                        <div className='SelectedTagsDiv'>
                          {tags.map((tags, index) => (
                            <div key={index} className='SelectedTagsItem'>
                              <span>{tags}</span>
                              <button onClick={() => handleRemoveTags(index)}>X</button>
                            </div>
                          ))}
                        </div>
                        <button onClick={() => SubmitToggle()}>
                        Submit<FaCircleArrowUp />
                          </button>
                          <button onClick={() => CloseToggle()}>
                        Cancel<MdCancel />
                          </button>

                      </div>
                    )}
                    
                  </div>
                  <div className="pagination-buttons">
                    {!loading && currentPage !== 1 && (
                      <button onClick={goToPreviousPage} disabled={currentPage === 1 || loading}>
                        <FaArrowCircleLeft />
                      </button>
                    )}
                    {!loading && currentPage !== totalPages && totalPages !== 0 && (
                      <button onClick={goToNextPage} disabled={currentPage === totalPages || loading}>
                        <FaArrowCircleRight />
                      </button>
                    )}
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
