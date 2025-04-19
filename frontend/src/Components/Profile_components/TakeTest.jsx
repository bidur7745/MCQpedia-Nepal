import React, { useState, useEffect } from "react";
import { useAuth } from '../../Contexts/AuthContext';
// import { userQuestionService} from "../../services/userQuestionServices";
import "./TakeTest.css";
import axios from "axios";
import { getTestQuestions, saveTestResult } from "../../services/testServices";

const TakeTest = () => {
  const { user } = useAuth();
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const categories = [
    "Python",
    "Javascript",
    "Java",
    "Operating-System",
    "Cyber-Security",
    "Physics",
    "Chemistry",
    "Biology",
    "Miscellaneous"
  ];

  const difficulties = ["Easy", "Medium", "Hard"];

  const fetchQuestions = async () => {
    if (!category || !difficulty) return;

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:5000/api/test/questions`, {
        params: {
          category,
          difficulty,
          numberOfQuestions
        }
      });
      
      if (response.data && response.data.questions) {
        setQuestions(response.data.questions);
        setSelectedOptions({});
        setShowAnswers(false);
        setScore(0);
        setCurrentQuestionIndex(0);
      } else {
        setError("No questions found for the selected category and difficulty");
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError(err.response?.data?.message || "Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category && difficulty) {
      fetchQuestions();
    }
  }, [category, difficulty, numberOfQuestions]);

  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedOptions[q._id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = correctCount;
    setScore(finalScore);
    setShowAnswers(true);
    // We'll save test record with a specific button instead of automatically
  };

  const handleSaveTestRecord = async () => {
    if (!user || !user._id) {
      alert("You must be logged in to save test records");
      return;
    }

    try {
      setIsSaving(true);
      console.log("Using user ID:", user._id);
      
      // Save test record
      const response = await axios.post(
        "http://localhost:5000/api/test/save-test", 
        {
          userId: user._id,
          category,
          totalQuestions: questions.length,
          correctAnswers: score,
          percentage: ((score / questions.length) * 100).toFixed(2)
        }
      );
      
      console.log("API Response:", response);
      
      if (response.status === 200 || response.status === 201) {
        console.log("Test record saved successfully!", response.data);
        alert("Test record saved successfully!");
      } else {
        console.warn("Unexpected response:", response);
        alert("Unexpected response from server. Check console for details.");
      }
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Error response data:", err.response?.data);
      console.error("Error message:", err.message);
      alert("Failed to save test record: " + (err.response?.data?.error || err.message));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setCategory("");
    setDifficulty("");
    setQuestions([]);
    setSelectedOptions({});
    setShowAnswers(false);
    setScore(0);
    setError("");
    setCurrentQuestionIndex(0);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderCurrentQuestion = () => {
    if (!questions.length) return null;
    
    const q = questions[currentQuestionIndex];
    return (
      <div key={q._id} className="question-card">
        <div className="question-progress">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
        </div>
        <h3>{q.question}</h3>
        <div className="options">
          {q.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedOptions[q._id] === option
                  ? "selected"
                  : showAnswers && option === q.correctAnswer
                  ? "correct"
                  : ""
              }`}
              onClick={() => !showAnswers && handleOptionSelect(q._id, option)}
              disabled={showAnswers}
            >
              {option}
            </button>
          ))}
        </div>
        {showAnswers && (
          <div className="explanation">
            <p>Explanation: {q.explanation}</p>
          </div>
        )}
        
        {!showAnswers && (
          <div className="navigation-buttons">
            <button 
              onClick={handlePreviousQuestion} 
              className="nav-button prev-button"
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            
            {currentQuestionIndex === questions.length - 1 ? (
              <button onClick={handleSubmit} className="submit-button">
                Submit Test
              </button>
            ) : (
              <button 
                onClick={handleNextQuestion} 
                className="nav-button next-button"
                disabled={!selectedOptions[q._id]}
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="take-test-container">
      <div className="take-test-header">
        <h2>Select Test Options</h2>
        <div className="test-options">
          <div className="form-group">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Difficulty:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="form-control"
            >
              <option value="">Select Difficulty</option>
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Number of Questions:</label>
            <input
              type="number"
              min="1"
              max="50"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(Math.max(1, Math.min(50, parseInt(e.target.value) || 10)))}
              className="form-control"
            />
          </div>
          <button onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </div>

      <div className="take-test-content">
        {loading ? (
          <div className="loading">Loading questions...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : questions.length > 0 ? (
          <>
            <div className="questions-header">
              <h2>Test Questions</h2>
              <div className="test-info">
                <span>Category: {category}</span>
                <span>Difficulty: {difficulty}</span>
                <span>Questions: {questions.length}</span>
              </div>
            </div>

            {!showAnswers ? (
              renderCurrentQuestion()
            ) : (
              <div className="results">
                <h3>Test Results</h3>
                <p>Score: {score} out of {questions.length}</p>
                <p>Percentage: {((score / questions.length) * 100).toFixed(1)}%</p>
                <div className="result-actions">
                  <button 
                    onClick={handleSaveTestRecord} 
                    className="save-record-button"
                    disabled={isSaving || !user}
                  >
                    {isSaving ? "Saving..." : "Save Test Record"}
                  </button>
                  <button onClick={handleReset} className="reset-button">
                    Take Another Test
                  </button>
                </div>
                {!user && <p className="login-warning">Please log in to save your test results</p>}
              </div>
            )}
          </>
        ) : (
          <div className="no-questions">
            <h2>Select a category and difficulty to start the test</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeTest;
