import React from 'react';
import Modal from 'react-modal';
import { BiSolidBadgeCheck } from 'react-icons/bi'; // Import the React icons
import { BsFillExclamationOctagonFill } from 'react-icons/bs';
import './CustomAlertModalStyle.css';

// Set appElement to make the modal accessible to screen readers
Modal.setAppElement('#roo');

const CustomAlertModal = ({ isOpen, onClose, selectedinfo, crtinfo }) => {
  
  const isCorrect = selectedinfo === crtinfo;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Custom Alert"
      className="custom-alert-modal"
      overlayClassName="custom-alert-overlay"
    >
      <div className="modal-content">
      {isCorrect ? (<h2 style={{ color: 'green' }}>Masha Allah</h2>): (<h2 style={{ color: 'red' }}>Wrong Answer</h2>)}
        
        <h1>{isCorrect ? <BiSolidBadgeCheck style={{ color: 'green' }} /> : <BsFillExclamationOctagonFill style={{ color: 'red' }} />}</h1>
        <p>{`Selected option : ${selectedinfo}`}</p>
        <p>{`Correct option : ${crtinfo}`}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </Modal>
  );
};

export default CustomAlertModal;
