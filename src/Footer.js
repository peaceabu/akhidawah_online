import React from 'react'
import './Footer.css'
import GoToTopButton from './Components/GotoTop';
import Contacts from './Components/Contacts';

const Footer = () => {
    const year = new Date();
  return (
    
<div className='footer-menu'>
  <GoToTopButton />
  <footer>
    
    <div className='footer-menu'>
    <div className='footer-top'>
      <Contacts />
    <p> Copyrights &copy; {new Date().getFullYear()}  </p>
    </div>
    <div className='footer-bottom'>
    <a >www.peacepagesolutions.site</a>
      
    </div>
  </div>
  </footer>
</div>




  )
}

export default Footer