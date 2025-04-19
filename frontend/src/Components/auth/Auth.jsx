import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { assets } from '../../assets/assets';
import './loginsignup.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="form-container">
      <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>

      {!isLogin && (
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input type="text" placeholder="Full Name" />
        </div>
      )}

      <div className="input-group">
        <FontAwesomeIcon icon={faEnvelope} className="icon" />
        <input type="email" placeholder="Email Address" />
      </div>

      <div className="input-group">
        <FontAwesomeIcon icon={faLock} className="icon" />
        <input type="password" placeholder="Password" />
      </div>

      {isLogin && <p className="login-prompt"><a href="#">Forget Password?</a></p>}

      <button className="sign-up-btn">{isLogin ? "Login" : "Sign Up"}</button>

      <button className="google-signup-button">
        <img src={assets.googleLogo} alt="Google Logo" /> Continue with Google
      </button>

      <p className="login-prompt">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <a onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "blue" }}>
          {isLogin ? "Signup" : "Login"}
        </a>
      </p>
    </div>
  );
};

export default Auth;
