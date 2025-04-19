import React, { useState, useEffect } from 'react';
import { userQuestionService } from '../../services/userQuestionServices';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import './MyQuestion.css';
import './modeloverlay.css';

const MyQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // For managing modal visibility
  const [editingQuestion, setEditingQuestion] = useState(null); // Store the question being edited
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    difficulty: 'Easy', // Default difficulty
    explanation: '',
    category: 'Python'  // Set a default category
  });
  
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

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await userQuestionService.getMyQuestions();
      console.log("Raw API Response:", response);

      if (!Array.isArray(response)) {
        console.error("Unexpected response format:", response);
        throw new Error("Invalid response format from server");
      }

      setQuestions(response);
      setError(null);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to fetch questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await userQuestionService.deleteQuestion(questionId);
        setQuestions(prevQuestions => prevQuestions.filter(q => q._id !== questionId));
      } catch (err) {
        setError('Failed to delete question. Please try again.');
        console.error('Error deleting question:', err);
      }
    }
  };

  const handleEdit = (questionId) => {
    const questionToEdit = questions.find(q => q._id === questionId);
    setEditingQuestion(questionToEdit);
    setFormData({
      question: questionToEdit.question,
      options: questionToEdit.options || ['', '', '', ''],
      correctAnswer: questionToEdit.correctAnswer,
      difficulty: questionToEdit.difficulty || 'Easy',
      explanation: questionToEdit.explanation || '',
      category: questionToEdit.category || 'Python'  // Include category
    });
    setIsModalOpen(true);
  };
  

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prevState => ({
      ...prevState,
      options: newOptions
    }));
  };

  const handleSave = async () => {
    try {
      await userQuestionService.updateQuestion(editingQuestion._id, formData);
      setQuestions(prevQuestions =>
        prevQuestions.map(q => (q._id === editingQuestion._id ? { ...q, ...formData } : q))
      );
      handleModalClose();
    } catch (err) {
      setError('Failed to update question. Please try again.');
      console.error('Error updating question:', err);
    }
  };
  

  if (loading) {
    return (
      <div className="my-questions-loading">
        <div className="loader"></div>
        <p>Loading your questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-questions-error">
        <p>{error}</p>
        <button onClick={fetchQuestions} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="my-questions-container">
      <div className="my-questions-header">
        <h2>My Questions</h2>
        <button className="add-question-btn">
          <FaPlus /> Add New Question
        </button>
      </div>

      {questions.length === 0 ? (
        <div className="no-questions">
          <p>You haven't created any questions yet.</p>
          <button className="add-question-btn">
            <FaPlus /> Create Your First Question
          </button>
        </div>
      ) : (
        <div className="questions-grid">
          {questions.map((question) => (
            <div key={question._id} className="question-card">
              <div className="question-content">
                <h3>{question.question}</h3>
                <div className="options-container">
                  {question.options?.map((option, index) => (
                    <div
                      key={index}
                      className={`option ${option === question.correctAnswer ? 'correct' : ''}`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
              <div className="question-actions">
                <button className="edit-btn" onClick={() => handleEdit(question._id)}>
                  <FaEdit /> Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(question._id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Question</h3>
            <div className="form-group">
              <label>Question</label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Options</label>
              {formData.options.map((option, index) => (
                <input
                  key={index}
                  className='optionsharu'
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
              ))}
            </div>
            <div className="form-group">
              <label>Correct Answer</label>
              <select
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleInputChange}
              >
                {formData.options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Difficulty Level</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
              >
                {difficultyLevels.map((level, index) => (
                  <option key={index} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Explanation</label>
              <textarea
                name="explanation"
                value={formData.explanation}
                onChange={handleInputChange}
              />
            </div>
            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleModalClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyQuestion;
