import React, { useState, useEffect } from 'react';
import { ref, list, getDownloadURL, getMetadata,getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import SearchBar from './Searchbar';
import firebaseConfig from '../firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { FaDownload,FaArrowCircleRight,FaArrowCircleLeft } from 'react-icons/fa';
import './SearchableImage.css'

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);


// ... other imports ...

const SearchableImageGallery = ({ onSearch, displayedImages }) => {
  const placeholders = ["Quran 95:3", "Buhari 1302", "Mecca", "Muslim family"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000); // Change every 2 seconds (adjust as needed)

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []); // Empty dependency array ensures the effect runs once on mount

    const navigate = useNavigate();
    const { lang, category } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageMetadata, setImageMetadata] = useState([]);
    const [searchButtonClicked, setSearchButtonClicked] = useState(false);
    const downloadImage = (url) => {
      console.log('download',url)
      saveAs(url, 'akhidawah.jpg');
    };
    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
      };
    const handleSearch = async (term) => {
      try {
        setLoading(true);
        setSearchButtonClicked(true);
        setSearchResults([]); // Clear previous search results
        const imageMetadata = [];
        // console.log(lang)
        let imagesRef;
        if (lang){
          imagesRef = ref(storage, `${lang}/${category}`);
        }else{
          imagesRef = ref(storage);
        }
        console.log(imagesRef)
        const imageList = await list(imagesRef);
  
        const searchPromises = imageList.items.map(async (imageRef) => {
          const metadata = await getMetadata(imageRef);
  
          // Customize this part to match your metadata structure
          const author = metadata?.customMetadata?.tags || '';
          console.log('searchTerm',searchTerm)
          if (
            searchTerm &&
            author.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            const url = await getDownloadURL(imageRef);
            imageMetadata.push(metadata);
            return { url, metadata };
          } else if (!searchTerm) {
            const url = await getDownloadURL(imageRef);
            imageMetadata.push(metadata);
            return { url, metadata };
          }
  
          return null;
        });
  
        const results = await Promise.all(searchPromises);

        
        const validResults = results.filter(result => result && result.metadata && result.metadata.customMetadata !== undefined);

        setSearchResults(validResults);
    
        setImageMetadata(imageMetadata);
        // Pass the search results to the parent component
        onSearch(validResults.map(result => result.url));
      } catch (error) {
        console.error('Error searching images:', error);
      } finally {
        setLoading(false);
      }
    };
  

    return (
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholders[placeholderIndex]}
          className="custom-input"
        />
        <button onClick={handleSearch}>Search</button>
        {/* <SearchBar onSearch={handleSearch} /> */}
  
        {loading && <p>Loading...</p>}
       
        {!loading && searchResults.length > 0 && (
        <div className='MaingalleryDiv'>
        <div className='galleryDiv'>
        {searchResults.map((result, index) => (
          <div key={index} className='image-card'>
            <img src={result.url} alt={`Image ${index}`} />
            <div className='image-metadata'>
              {imageMetadata[index]?.customMetadata?.author === 'Abdul Malik' ||
              !imageMetadata[index]?.customMetadata?.author ? (
                <p>Upload by: {imageMetadata[index]?.customMetadata?.author || 'IRFOfficialNet'}</p>
              ) : (
                <p>Upload by: IRFOfficialNet</p>
              )}
            </div>
              <div className='downloadBtn'>
                <button onClick={() => downloadImage(result.url)}>
                  Download <FaDownload />
                </button>
              </div>
          </div>
        ))}
         
        </div>
        <div className='image-card'>
          <p>End of Searchresults</p>
        </div>
        </div>
       )}
       {!loading && searchResults.length === 0 && searchButtonClicked  &&(
         <div className='image-card'>
           <p>No search results found.</p>
         </div>
       )}
      </div>
    );
  };
  
  

export default SearchableImageGallery;
