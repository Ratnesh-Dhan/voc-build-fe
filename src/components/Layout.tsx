import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Toaster position="top-center" />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
