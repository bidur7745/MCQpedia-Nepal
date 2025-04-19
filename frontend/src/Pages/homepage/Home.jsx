import React from 'react'
import { assets } from '../../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import './Home.css'
import Body from '../../Components/Body/Body';
import Faq from '../../Components/Faq/Faq';

const Home = () => {
  return (
    <>
    
    <div className="home-container">
      <div className="text-content">
        <h1>ALL MCQ EXAMS ONE PLATFORM</h1>
        <p>Your Gateway to Academic Excellence.</p>
        <div className="go-green">
          <FontAwesomeIcon icon={faLeaf} className="leaf-icon" />
          <span>Go Green, Go Paperless </span>
          <FontAwesomeIcon icon={faLeaf} className="leaf-icon" />

        </div>
        <p className="description">
          Explore question sets of various fields from different renowned institutions, 
          practice live and mock tests, and prepare for the ultimate exam.
        </p>
        <button className="get-started-button">Get started</button>
      </div>
      <div className="image-content">
        <img src={assets.HomepageImage} alt="home page image" />
      </div>
    </div>
    <br/>
    <Body/>
    <Faq/>
  </>
    
  )
}

export default Home