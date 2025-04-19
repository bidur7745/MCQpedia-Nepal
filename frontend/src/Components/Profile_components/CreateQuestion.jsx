import React, { useState } from "react";
// import { questionService } from "../../services/questionService";
// import {userQuestionServices } from "../../services/userQuestionServices";
import { userQuestionService } from "../../services/userQuestionServices";
import "./CreateQuestion.css";

const categories = [
  "Python",
  "Javascript",
  "Java",
  "Operating-System",
  "Cyber-Security",
  "Physics",
  "Chemistry",
  "Biology",
  "Miscellaneous",
];

const difficultyLevels = ["Easy", "Medium", "Hard"];

const CreateQuestion = () => {
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    category: "",
    difficulty: "",
    explanation: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      // Validate that at least two options are filled
      const validOptions = formData.options.filter(option => option.trim() !== "");
      if (validOptions.length < 2) {
        throw new Error("Please provide at least two options");
      }

      // Validate that correct answer is one of the options
      if (!validOptions.includes(formData.correctAnswer)) {
        throw new Error("Correct answer must be one of the provided options");
      }

      await userQuestionService.createQuestion({
        ...formData,
        options: validOptions
      });
      
      setMessage({ type: "success", text: "Question created successfully!" });
      setFormData({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        category: "",
        difficulty: "",
        explanation: "",
      });
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.response?.data?.error || error.message || "Failed to create question" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-question-form">
      <h2>Create a Question</h2>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label className="labelname">Question:</label>
        <input 
          className="inputname" 
          type="text" 
          name="question" 
          value={formData.question} 
          onChange={handleChange} 
          required 
        />

        <label className="labelname">Options:</label>
        <div className="create-options-container">
          {formData.options.map((option, index) => (
            <input
              className="inputname"
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              required
            />
          ))}
        </div>

        <label className="labelname">Correct Answer:</label>
        <select 
          className="inputname" 
          name="correctAnswer" 
          value={formData.correctAnswer} 
          onChange={handleChange} 
          required
        >
          <option value="">Select Correct Answer</option>
          {formData.options
            .filter(option => option.trim() !== "")
            .map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>

        <div className="row">
          <div className="half">
            <label className="labelname">Difficulty:</label>
            <select 
              className="inputname" 
              name="difficulty" 
              value={formData.difficulty} 
              onChange={handleChange} 
              required
            >
              <option value="">Select Difficulty</option>
              {difficultyLevels.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div className="half">
            <label className="labelname">Category:</label>
            <select 
              className="inputname" 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="labelname">Explanation:</label>
        <textarea 
          className="inputname" 
          name="explanation" 
          value={formData.explanation} 
          onChange={handleChange} 
          required 
          rows="3"
        />

        <button 
          className="submitbutton" 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateQuestion;
