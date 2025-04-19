import {React,} from 'react';
import './body.css';
import { assets } from '../../assets/assets';


const Body = () => {
  return (
    <div className="homepage">
      <h1 className="heading">Everything You Need to Succeed in Your Exams</h1>

      <div className="section">
        <div className="image-section">
          <img src={assets.body1} alt="MCQpedia Nepal" />
        </div>
        <div className="text-section">
          <h2>MCQpedia Nepal: Nepal's First Online MCQ Exam Platform</h2>
          <p>
            Gain access to a diverse range of MCQ model exams, practice sets, detailed solutions, and more—shared by top educational institutions.
            Easily find live exams and materials tailored to your goals and exam needs.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="text-section">
          <h2>Take MCQ Exams Anytime, Anywhere</h2>
          <p>
            Prepare with a wealth of curated MCQ practice sets and exams, published by reputable institutes across Nepal.
            Discover upcoming live tests that align with your preparation, all available with just a few clicks.
          </p>
        </div>
        <div className="image-section">
          <img src={assets.body2} alt="Remote Online Exam Convenience" />
        </div>
      </div>

      <div className="section">
        <div className="image-section">
          <img src={assets.body3} alt="Instant Results and Detailed Performance Analysis" />
        </div>
        <div className="text-section">
          <h2>In-Depth Analytics and Personalized Reports</h2>
          <p>
            Our platform provides immediate feedback on practice sets and live exams, complete with your ranking against other test-takers.
            Track your progress with insightful analytics, compare scores, and access full solutions that highlight areas for improvement,
            ensuring steady progress toward your goal.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="text-section">
          <h2>Access to Leading Institutes in Nepal</h2>
          <p>
            MCQpedia Nepal brings together a network of experienced educational institutions specializing in competitive exam preparation.
            Join live and mock MCQ exams led by top educators, enhancing your readiness and giving you the tools to excel.
          </p>
        </div>
        <div className="image-section">
          <img src={assets.body4}alt="Nepal’s Top Institutions at Your Fingertips" />
        </div>
      </div>
    </div>
  );
};

export default Body;
