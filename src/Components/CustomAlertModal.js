import React from 'react';
import Modal from 'react-modal';
import './CustomAlertModalStyle.css'

// Set appElement to make the modal accessible to screen readers
Modal.setAppElement('#roo');

const CustomAlertModal = ({ isOpen, onClose, message, crtinfo }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Custom Alert"
      className="custom-alert-modal"
      overlayClassName="custom-alert-overlay"
    >
      <div className="modal-content">
        <h2>Masha Allah </h2>
        <p>{message}</p>
        <p>{crtinfo}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </Modal>
  );
};

export default CustomAlertModal;
