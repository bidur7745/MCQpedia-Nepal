import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Text Logo and tagline */}
        <div className="footer-logo">
          <h2>MCQpedia Nepal</h2>
          <p className="tagline">Empowering learners, one MCQ at a time.</p>
        </div>

        {/* Useful Links */}
        <div className="footer-links">
          <h4>Useful Links</h4>
          <ul>
          <li><Link to="/">Home</Link></li>
            <li><Link to="/practice-mcq">Practice MCQ</Link></li>
            <li><Link to="/create-mcq">Create MCQ</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/about-us">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <address>
            IIC Street, Sunsari, Nepal<br />
            Phone: +977 9862262556<br />
            <a href="mailto:siwakoti.bidur7745@gmail.com">siwakoti.bidur7745@gmail.com</a>.
          </address>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=100077671056442"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="https://x.com/SiwakotiBidur"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="https://www.instagram.com/bidur.bro/"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://www.linkedin.com/in/bidur-siwakoti-62b4b5285/"><FontAwesomeIcon icon={faLinkedin} /></a>
          </div>
        </div>
      </div>

      {/* Footer bottom line */}
      <div className="footer-bottom">
        <p>© 2024 MCQpedia Nepal. All rights reserved. <Link to='/privacy-policy'> Privacy Policy </Link><Link to='/terms-conditions' > Terms & Conditions</Link></p>
      </div>
    </footer>
  );
};

export default Footer;
