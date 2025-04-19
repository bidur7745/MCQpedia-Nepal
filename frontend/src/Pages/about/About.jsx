import React from 'react';
import './about.css';
import { assets } from '../../assets/assets';
import FeedbackForm from '../../Components/Form/Feedback';
import Testimonial from '../../Components/testimony/Testimonial';

const AboutPage = () => {
  const points = [
    { icon: '✔️', text: 'Free to Use' },
    { icon: '📈', text: 'Real-Time Results & Analytics' },
    { icon: '✅', text: 'Verified High-Quality Content' },
    { icon: '🌐', text: 'Collaboration with Top Educators' },
  ];

  return (
    <>
    <div className="about-page">
      {/* About MCQpedia Section */}
      <div className="about-section">
        <div className="about-image">
          <img src={assets.about1} alt="MCQpedia Nepal" />
        </div>
        <div className="about-text">
          <h2>About MCQpedia Nepal</h2>
          <p>
            MCQpedia Nepal is dedicated to providing free, high-quality educational resources to students. 
            Our mission is to make education accessible to everyone, bridging gaps with online tools 
            and curated content.
          </p>
          <p>
            Our platform offers model MCQ exams, live tests, instant results, and detailed analytics. 
            Join us and take a step towards your academic success.
          </p>
        </div>
      </div>

      {/* About Me Section */}
      <div className="about-section reverse">
        <div className="about-image">
          <img src={assets.bidur} alt="Founder" />
        </div>
        <div className="about-text">
          <h2>About Develper</h2>
          <p>
            Hi, I’m BIDUR SIWAKOTI, the founder of MCQpedia Nepal. As someone passionate about education, 
            I started this platform to make learning free and accessible for students across Nepal.
          </p>
          <p>
            I believe education is a right, not a privilege. MCQpedia Nepal reflects my commitment to 
            this vision, helping students achieve their dreams.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="points">
          {points.map((point, index) => (
            <div key={index} className="point">
              <span className="icon">{point.icon}</span>
              <p>{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    <Testimonial/>
    <FeedbackForm/>
    </>
  );
};

export default AboutPage;
