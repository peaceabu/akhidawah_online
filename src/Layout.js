// Layout.js

import React from 'react';
import Header from './Header';
import FooterNav from './Components/FooterNav';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <FooterNav />
    </div>
  );
};

export default Layout;
