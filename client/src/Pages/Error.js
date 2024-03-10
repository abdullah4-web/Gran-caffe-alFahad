import React, { useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './PageNotFound.css'; // Import custom CSS file for styling

const PageNotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container-xxl bg-white p-0">
        {/* Apply hero-header only on larger screens */}
        <div className="container-xxl py-4 bg-dark hero-header mb-3 hero-header-large">
          <div className="container text-center my-3 pt-1 pb-1">
          </div>
        </div>
   
        <div className="container-fluid py-5 wow fadeIn">
          <div className="container text-center py-5">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <FaExclamationTriangle className="display-1 text-primary" />
                <h1 className="display-1">404</h1>
                <h1 className="mb-4">Page Not Found</h1>
                <p className="mb-4">We’re sorry, the page you have looked for does not exist on our website! Maybe go to our home page or try to use a search?</p>
                <a className="btn btn-primary rounded-pill py-3 px-5" href="/">Go Back To Home</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
