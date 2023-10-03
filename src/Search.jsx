import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import firebaseConfig from './firebaseConfig';



firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
function Search() {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [profileImages, setProfileImages] = useState([]);

  useEffect(() => {
    // Function to retrieve images with custom metadata
    const fetchImages = (searchTerm) => {
      // const storagePath = 'tamil'; // Set the root folder
      console.log(searchTerm)
      const storageRef = firebase.storage().ref();
    
      // Function to recursively list items in a folder and its subfolders
      const listAllItems = (ref) => {
        return ref.listAll().then((result) => {
          const downloadURLsPromises = [];
    
          // Map each item to its getDownloadURL promise
          const itemPromises = result.items.map((item) => {
            return item.getMetadata().then((metadata) => {
              // Check if the profile name in metadata matches the user's profile name
              const matchesProfile = metadata.customMetadata && metadata.customMetadata.description === searchTerm;
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
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
        });
    };

    fetchImages();
  }, []);

  // Function to filter images based on the search term
  const filteredImages = images.filter((image) =>
    image.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="image-list">
        {filteredImages.map((image, index) => (
          <div key={index}>
            <img src={image.url} alt={image.description} />
            <p>{image.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
