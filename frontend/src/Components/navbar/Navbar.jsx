import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <p>MCQpedia Nepal</p>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navbar Links */}
      <div className={`navbar-links ${isMenuOpen ? "show" : ""}`}>
        <NavLink exact to="/" activeClassName="active" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/question-bank" activeClassName="active" className="nav-link">
          Question Bank
        </NavLink>

        <NavLink to="/about-us" activeClassName="active" className="nav-link">
          About Us
        </NavLink>
      </div>

      {/* Auth Buttons or Profile Icon */}
      <div className="navbar-auth">
        {user ? (
          <NavLink to="/profile" className="profile-icon">
            <div className="avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : <FontAwesomeIcon icon={faUser} />}
            </div>
          </NavLink>
        ) : (
          <>
            <NavLink to="/register?component=login" className="auth-button login-button">
              Login
            </NavLink>
            <NavLink to="/register?component=signup" className="auth-button signup-button">
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
