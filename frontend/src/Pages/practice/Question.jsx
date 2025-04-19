import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { questionService } from '../../services/questionService';
import './question.css';

const AVAILABLE_CATEGORIES = [
  "python",
  "javascript",
  "java",
  "operating-system",
  "cyber-security",
  "physics",
  "chemistry",
  "biology",
  "miscellaneous"
];

const Question = () => {
  const { category: initialCategory } = useParams();
  
  // Keep the category name as is from the URL, don't transform it
  const [category, setCategory] = useState(initialCategory || 'python');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [revealedAnswer, setRevealedAnswer] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories] = useState(AVAILABLE_CATEGORIES);

  // Fetch questions based on category
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log('Fetching questions for category:', category);
        setLoading(true);
        setError(null);
        const data = await questionService.getQuestionsByCategory(category.toLowerCase());
        console.log('Fetched questions:', data);
        
        // Handle both array and object response formats
        const questionsArray = Array.isArray(data) ? data : data.questions;
        
        if (questionsArray && questionsArray.length > 0) {
          setQuestions(questionsArray);
        } else {
          console.error('Unexpected data format:', data);
          setError('No questions found for this category');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to load questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchQuestions();
    }
  }, [category]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const revealAnswer = () => {
    if (!questions[currentQuestionIndex]) return;
    
    const correct = selectedOption === questions[currentQuestionIndex].correctAnswer;
    setIsAnswerCorrect(correct);
    setRevealedAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption('');
      setRevealedAnswer(false);
      setIsAnswerCorrect(null);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedOption('');
      setRevealedAnswer(false);
      setIsAnswerCorrect(null);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory.toLowerCase());
    setCurrentQuestionIndex(0);
    setSelectedOption('');
    setRevealedAnswer(false);
    setIsAnswerCorrect(null);
  };

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="question-page">
      {/* Sidebar for category filter */}
      <div className="category-filter">
        <h3>Categories</h3>
        <ul>
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={category === cat.toLowerCase() ? 'active' : ''}
            >
              {cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content area */}
      <div className="question-content">
        {loading ? (
          <div className="loading">Loading questions...</div>
        ) : questions.length > 0 ? (
          <div className="question">
            <div className="question-navigation">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <div className="navigation-buttons">
                <button 
                  onClick={handlePrevQuestion} 
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>
                <button 
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Next
                </button>
              </div>
            </div>

            <h3>{questions[currentQuestionIndex].question}</h3>
            <div className="options">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="option">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                    disabled={revealedAnswer}
                  />
                  <label 
                    htmlFor={`option-${index}`}
                    className={revealedAnswer ? (
                      option === questions[currentQuestionIndex].correctAnswer 
                        ? 'correct' 
                        : selectedOption === option 
                          ? 'incorrect' 
                          : ''
                    ) : ''}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>

            {!revealedAnswer ? (
              <button 
                onClick={revealAnswer} 
                className="reveal-btn"
                disabled={!selectedOption}
              >
                Check Answer
              </button>
            ) : (
              <div className="answer-feedback">
                <div className={`answer ${isAnswerCorrect ? 'correct' : 'incorrect'}`}>
                  {isAnswerCorrect ? 'Correct! 🎉' : 'Incorrect! 😕'}
                </div>
                <div className="explanation">
                  <strong>Explanation:</strong> {questions[currentQuestionIndex].explanation}
                </div>
                {currentQuestionIndex < questions.length - 1 && (
                  <button onClick={handleNextQuestion} className="next-btn">
                    Next Question
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="no-questions">
            <p>No questions available for this category.</p>
            <p>Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
