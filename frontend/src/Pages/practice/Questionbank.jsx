import React from 'react';
import { useNavigate } from "react-router-dom";
import './Questionbank.css'; // Importing custom CSS

import pythonImg from "../../assets/python.png";
import jsImg from "../../assets/js.png";
import javaImg from "../../assets/java.png";
import os from "../../assets/os.png";
import cyber from "../../assets/cyber.png";
import physics from "../../assets/physics.jpg"
import Chemistry from "../../assets/ch.jpg"
import Bilogy from "../../assets/bio.png"
import Miscellaneous from "../../assets/mi.jpg"

const categories = [
  { name: "Python", image: pythonImg },
  { name: "JavaScript", image: jsImg },
  { name: "Java", image: javaImg },
  { name: "Operating System", image: os },
  { name: "Cyber Security", image: cyber },
  { name: "Physics", image: physics},
  { name: "Chemistry", image: Chemistry},
  { name: "Biology", image: Bilogy},
  { name: "Miscellaneous", image: Miscellaneous},
];

const Questionbank = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    console.log('Navigating to category:', categoryName);
    // Convert to lowercase and replace spaces with hyphens
    const formattedCategory = categoryName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/question-bank/${formattedCategory}`);
  };

  return (
    <div className="practice-container">
      {/* Page Title */}
      <h1 className="page-title">📚 Choose a Category</h1>
      <p className="page-description">
        Select a category to practice multiple-choice questions and enhance your skills.
      </p>
      <hr className="divider" />

      {/* Category List */}
      <div className="category-list">
        {categories.map((category) => (
          <div
            key={category.name}
            className="category-card"
            onClick={() => handleCategoryClick(category.name)}
          >
            <img src={category.image} alt={category.name} />
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>

      {/* Motivational Quote */}
      <p className="motivational-quote">
        "Knowledge is power! Keep practicing and master your skills! 💡"
      </p>
    </div>
  );
}

export default Questionbank;
