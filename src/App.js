import Content from './Content';
import Mediahanle from './Mediahandle';
import ImageGallery from './Mediagallery';
import { BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';
import Category from './Category';
import About from './About';
import React, { useRef } from 'react';
import Layout from './Layout';
import Profile from './profle';
import SearchCard from './Components/Searchbar';

function App() {
  const scrollToRef = useRef(null);

  return (
    <Router>
    <div className='App'>
  
      <Routes>
      <Route
            path="/"
            element={
              <Layout>
                <Content />
              </Layout>
            }
          />
              <Route
            path="/searchcard"
            element={
              <Layout>
                <SearchCard />
              </Layout>
            }
          />
         <Route 
            path="/image-gallery/:lang/:category" 
            element={<Layout>
              <ImageGallery />
              </Layout>} />
          <Route
            path="/category"
            element={
              <Layout>
                <Category />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/contribute"
            element={
              <Layout>
                <Mediahanle />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
        </Routes>


    </div>
  </Router>



  );
}

export default App;
