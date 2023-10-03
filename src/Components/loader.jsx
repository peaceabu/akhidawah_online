import React from 'react';
import './loader.css';
import { Triangle } from 'react-loader-spinner';

const Loader = ({ isUploading, showSuccessMessage }) => {
  return (
    <div className={`loader-overlay ${isUploading ? 'visible' : 'hidden'}`} id='loadingDiv'>
      <div className="loader-content">
        <p color="#00BFFF">Uploading...</p>
        <Triangle color="#00BFFF" height={80} width={80} />
        {showSuccessMessage && <p>Uploaded Successfully..</p>}
      </div>
    </div>
  );
};

export default Loader;
