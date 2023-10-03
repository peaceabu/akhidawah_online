import React from 'react';
import './ContactUs.css';
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp,FaTelegram } from 'react-icons/fa';

const Contacts = () => {
  const socialMediaData = [
    { name: 'Facebook', link: 'https://www.facebook.com/IRFOfficialNet', icon: <FaFacebook /> },
    { name: 'Instagram', link: 'https://instagram.com/irfofficialnet', icon: <FaInstagram /> },
    { name: 'Youtube', link: 'https://www.youtube.com/@irfofficialnet', icon: <FaYoutube /> },
    { name: 'WhatsApp', link: 'https://chat.whatsapp.com/BCf4YNzCjRF2fyf6RE6lV7', icon: <FaWhatsapp /> },
    { name: 'Telegram', link: 'https://t.me/IRFOfficialNet', icon: <FaTelegram /> },
  ];

  return (
    <div className="social-media-links">
      {socialMediaData.map((socialMedia, index) => (
        <a key={index} href={socialMedia.link} target="_blank" rel="noopener noreferrer">
          <i className={`fab fa-${socialMedia.name.toLowerCase()}`}>{socialMedia.icon}</i>
        </a>
      ))}
    </div>
  );
};

export default Contacts;
