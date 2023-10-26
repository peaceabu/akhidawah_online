import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStorage, ref, list, getDownloadURL, getMetadata  } from 'firebase/storage';
import './Mediagallery.css';
import './Common.css';
import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { saveAs } from 'file-saver';
import { FaDownload,FaArrowCircleRight,FaArrowCircleLeft } from 'react-icons/fa';
import { Bars } from 'react-loader-spinner';
import CustomAlertModal from './Components/CustomAlertModal';
import SearchableImageGallery from './Components/SearchableImageGallery';


const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const ImageGallery = () => {
  const navigate = useNavigate();
  const { lang,category } = useParams();
  const capitalizedCategory = capitalizeFirstLetter(category);
  const [imageMetadata, setImageMetadata] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9;
  const [displayedImages, setDisplayedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFetchedImages, setHasFetchedImages] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [CrtOption, setCrtOption] = useState('');
  
  useEffect(() => {
    if (!hasFetchedImages) {
    const fetchImagesForPage = async () => {      
      try {
        setLoading(true);
        const imagesRef = ref(storage, `${lang}/${category}`);
        const imageList = await list(imagesRef);
        const calculatedTotalPages = Math.ceil(imageList.items.length / imagesPerPage);
        setTotalPages(calculatedTotalPages);
        const startIndex = (currentPage - 1) * imagesPerPage;
        const endIndex = startIndex + imagesPerPage;
        const imageUrls = [];
        const imageMetadata = [];
       

        

        // Clear the displayed images array before adding new images
        if (startIndex === 0  && imageList.items.length === 0) {
          setDisplayedImages([]);
          setImageMetadata([]);
          setHasFetchedImages('moreImagesUploading');
          setLoading(false)
          return
        }

        for (let i = startIndex; i < endIndex && i < imageList.items.length; i++) {
          
          const imageRef = imageList.items[i];
          const url = await getDownloadURL(imageRef);
          const metadata = await getMetadata(imageRef);
          imageUrls.push(url);
          imageMetadata.push(metadata);
        }

        setDisplayedImages(imageUrls);
        
        setImageMetadata(imageMetadata);        
        setLoading(false);
        setHasFetchedImages(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      }
    };
    fetchImagesForPage();
    }
  }, [category, currentPage, hasFetchedImages]);

  const downloadImage = (url) => {    
    saveAs(url, 'akhidawah.jpg');
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleOptionClick = (quizoption,imgoptionval) => {
    setSelectedOption(quizoption);
    setCrtOption(imgoptionval)
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };
  const handleSearch = (results) => {
    setDisplayedImages([]);
    setTotalPages(0);
    setCurrentPage(1);
    // You may also update other state variables if needed
  };
  return (
    <div id='image-gallery-container'>
      <h1 className='shared-header'>{capitalizedCategory} Images</h1>
      {/* <SearchableImageGallery /> */}
      <SearchableImageGallery onSearch={handleSearch} displayedImages={[]} />
      
      {!loading  && (
      <div className='MaingalleryDiv'>
      {capitalizedCategory === 'Quiz' ? (
        
        <div className='galleryDiv - quiz'>
          
          {displayedImages.map((url, index) => (
            <div key={index} className='image-card'>
              <img src={url} alt={`Image ${index}`} className='img' />
              <div className='image-metadata'>
                  <p>
                    Upload by: {imageMetadata[index]?.customMetadata?.author &&
                      imageMetadata[index]?.customMetadata?.author !== 'ABDUL MALIK' &&
                      imageMetadata[index]?.customMetadata?.author !== 'Peace Abu'
                        ? imageMetadata[index]?.customMetadata?.author
                        : 'IRFOfficialNet'}
                  </p>
              </div>


              <div className='quizBtn'>
                <span className='quizOption' onClick={() => handleOptionClick('A',imageMetadata[index].customMetadata.answer)}>
                  A
                </span>
                <span className='quizOption' onClick={() => handleOptionClick('B',imageMetadata[index].customMetadata.answer)}>
                  B
                </span>
                <span className='quizOption' onClick={() => handleOptionClick('C',imageMetadata[index].customMetadata.answer)}>
                  C
                </span>
                <CustomAlertModal
                  isOpen={showAlert}
                  onClose={closeAlert}
                  selectedinfo={selectedOption}
                  crtinfo={CrtOption}
                />
              </div>
              <div className='downloadBtn'>
                <button onClick={() => downloadImage(url)}>
                  Download <FaDownload />
                </button>
              </div>
            </div>
          ))}
       </div>
      
      ) : (
        <div className='galleryDiv - nonquiz'>
          {displayedImages.map((url, index) => (
            <div key={index} className='image-card'>
              <img src={url} alt={`Image ${index}`} className='img' />
              <div className='image-metadata'>
                {imageMetadata[index]?.customMetadata?.author === 'Abdul Malik' ||
                !imageMetadata[index]?.customMetadata?.author ? (
                  <p>Upload by: {imageMetadata[index]?.customMetadata?.author || 'IRFOfficialNet'}</p>
                ) : (
                  <p>Upload by: IRFOfficialNet</p>
                )}
</div>  
              <div className='downloadBtn'>              
                <button onClick={() => downloadImage(url)}>
                  Download <FaDownload />
                </button>             
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
      )}
      {loading && (
        <div className='loader-overlay'>
          <Bars type='TailSpin' color='#00BFFF' height={80} width={80} />
        </div>
      )}
      
      <div className='pagination-buttons'>
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
      {!loading && (currentPage === totalPages || totalPages === 0) && (
        <div className='image-card'>
         <p> More images are uploading. Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
