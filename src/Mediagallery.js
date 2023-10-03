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
  
  useEffect(() => {
    if (!hasFetchedImages) {
    const fetchImagesForPage = async () => {
      console.log('try')
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
        console.log(startIndex, imageList.items.length)

        

        // Clear the displayed images array before adding new images
        if (startIndex === 0  && imageList.items.length === 0) {
          setDisplayedImages([]);
          setImageMetadata([]);
          setHasFetchedImages('moreImagesUploading');
          setLoading(false)
          return
        }

        for (let i = startIndex; i < endIndex && i < imageList.items.length; i++) {
          console.log('length',imageList.items.length)
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
    console.log('download',url)
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

  const handleOptionClick = (quizoption) => {
    setSelectedOption(quizoption);
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div id='image-gallery-container'>
      <h1 className='shared-header'>{capitalizedCategory} Images</h1>
      
      
      {!loading  && (
      <div className='MaingalleryDiv'>
      {capitalizedCategory === 'Quiz' ? (
        
        <div className='galleryDiv - quiz'>
          
          {displayedImages.map((url, index) => (
            <div key={index} className='image-card'>
              <img src={url} alt={`Image ${index}`} className='img' />
              <div className='image-metadata'>
              {imageMetadata[index]?.customMetadata?.author ? (
                <p>Upload by: {imageMetadata[index]?.customMetadata?.author}</p>
              ) : (
                <p>Upload by: IRFOfficialNet</p> // Provide a fallback message or value
              )}
              </div>
              <div className='quizBtn'>
                <span className='quizOption' onClick={() => handleOptionClick('A')}>
                  A
                </span>
                <span className='quizOption' onClick={() => handleOptionClick('B')}>
                  B
                </span>
                <span className='quizOption' onClick={() => handleOptionClick('C')}>
                  C
                </span>
                <CustomAlertModal
                  isOpen={showAlert}
                  onClose={closeAlert}
                  message={`Selected option : ${selectedOption}`}
                  crtinfo={`Correct option : ${imageMetadata[index].customMetadata.answer}`}
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
              {imageMetadata[index]?.customMetadata?.author ? (
                <p>Upload by: {imageMetadata[index]?.customMetadata?.author}</p>
              ) : (
                <p>Upload by: IRFOfficialNet</p> // Provide a fallback message or value
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
          <p>{currentPage} {totalPages}</p>
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
