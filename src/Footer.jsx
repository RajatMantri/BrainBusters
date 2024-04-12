import React from "react";
import "./index.css"; // Import custom CSS file for styling

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4">About Us</h5>
            <p className="text-muted">We are passionate about creating engaging quizzes for our users. Join us on our journey!</p>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="#" className="text-muted">Home</a></li>
              <li><a href="#" className="text-muted">Quizzes</a></li>
              <li><a href="#" className="text-muted">About</a></li>
              <li><a href="#" className="text-muted">Contact</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4">Connect With Us</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="#" className="text-muted"><i className="fab fa-facebook-f me-2"></i> Facebook</a></li>
              <li><a href="#" className="text-muted"><i className="fab fa-twitter me-2"></i> Twitter</a></li>
              <li><a href="#" className="text-muted"><i className="fab fa-instagram me-2"></i> Instagram</a></li>
              <li><a href="#" className="text-muted"><i className="fab fa-linkedin me-2"></i> LinkedIn</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4">Contact Us</h5>
            <ul className="list-unstyled mb-0">
              <li>Email: example@example.com</li>
              <li>Phone: +1234567890</li>
              <li>Address: 123 Street, City, Country</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-secondary py-4">
        <div className="container text-center">
          <p className="mb-0 text-muted">&copy; 2024 Your Quizzing Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
