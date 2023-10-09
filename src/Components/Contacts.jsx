import React from 'react';
import './ContactUs.css';
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp,FaTelegram } from 'react-icons/fa';
import { MdEmail} from 'react-icons/md'

const Contacts = () => {
  const socialMediaData = [
    { name: 'Facebook', link: 'https://www.facebook.com/IRFOfficialNet', icon: <FaFacebook /> },
    { name: 'Instagram', link: 'https://instagram.com/irfofficialnet', icon: <FaInstagram /> },
    { name: 'Youtube', link: 'https://www.youtube.com/@irfofficialnet', icon: <FaYoutube /> },
    { name: 'WhatsApp', link: 'https://chat.whatsapp.com/BCf4YNzCjRF2fyf6RE6lV7', icon: <FaWhatsapp /> },
    { name: 'Telegram', link: 'https://t.me/IRFOfficialNet', icon: <FaTelegram /> },
  ];

  return (
  
    <div className='PhoneMail'>
    <div>
        <span>
        <FaWhatsapp />
        </span>
        <a
          href="tel:+919751673794">
            +91 9751673794
          </a>
      </div>
      <div>

        <span>
          <MdEmail /> 
        </span>
        
        <a
          href="mailto:irfoffcialnet@gmail.com">
           irfoffcialnet@gmail.com
           </a>
        
       
        </div> 
        
    <div className="social-media-links">
      {socialMediaData.map((socialMedia, index) => (
        <a key={index} href={socialMedia.link} target="_blank" rel="noopener noreferrer">
          <i className={`fab fa-${socialMedia.name.toLowerCase()}`}>{socialMedia.icon}</i>
        </a>
      ))}
    </div>
    </div>
  );
};

export default Contacts;
