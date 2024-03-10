import React from 'react'

const Footer = () => {
  return (
    <div
    className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
    data-wow-delay="0.1s"
  >
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-lg-3 col-md-6">
          <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
            GRAN CAFFE
          </h4>
          <a className="btn btn-link" href>
            About Us
          </a>
          <a className="btn btn-link" href>
            Contact Us
          </a>
          <a className="btn btn-link" href>
            Reservation
          </a>
          <a className="btn btn-link" href>
            Privacy Policy
          </a>
          <a className="btn btn-link" href>
            Terms &amp; Condition
          </a>
        </div>
        <div className="col-lg-3 col-md-6">
          <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
            Contact
          </h4>
          <p className="mb-2">
            <i className="fa fa-map-marker-alt me-3" />
            Al Mustaqbal street, City Walk Dubai United Arab Emirates
          </p>
          <p className="mb-2">
            <i className="fa fa-phone-alt me-3" />
            +971 52 342 7000
          </p>
          <p className="mb-2">
            <i className="fa fa-envelope me-3" />
            grancaffedm@gmail.com
          </p>
          <div className="d-flex pt-2">
            <a className="btn btn-outline-light btn-social" href>
              <i className="fab fa-twitter" />
            </a>
            <a className="btn btn-outline-light btn-social" href>
              <i className="fab fa-facebook-f" />
            </a>
            <a className="btn btn-outline-light btn-social" href>
              <i className="fab fa-youtube" />
            </a>
            <a className="btn btn-outline-light btn-social" href>
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
            Opening
          </h4>
          <h5 className="text-light fw-normal">Monday - Saturday</h5>
          <p>09AM - 09PM</p>
          <h5 className="text-light fw-normal">Sunday</h5>
          <p>10AM - 08PM</p>
        </div>
        <div className="col-lg-3 col-md-6">
          <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
            Newsletter
          </h4>
          <p>Subscribe to get updates of offers.</p>
          <div className="position-relative mx-auto" style={{ maxWidth: 400 }}>
            <input
              className="form-control border-primary w-100 py-3 ps-4 pe-5"
              type="text"
              placeholder="Your email"
            />
            <button
              type="button"
              className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="copyright">
        <div className="row">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            ©{' '}
            <a className="border-bottom" href="#">
              GRAN CAFFE
            </a>
            , All Right Reserved.
            {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
            Developed by {' '}
            <a className="border-bottom" href="https://abdullahshahportfolio.netlify.app/">
             Abdullah Shah
            </a>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div className="footer-menu">
              <a href>Home</a>
              <a href>Cookies</a>
              <a href>Help</a>
              <a href>FQAs</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Footer
