import axios from "axios";

const API_URL = "http://localhost:5000/api/test";

// ✅ Fetch test questions
export const getTestQuestions = async (category = "General", difficulty = "Any", numberOfQuestions = 10) => {
  try {
    const response = await axios.get(`${API_URL}/questions`, {
      params: { category, difficulty, numberOfQuestions },
    });
    return response.data.questions;
  } catch (error) {
    console.error("Error fetching test questions:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to fetch test questions");
  }
};

// ✅ Submit test answers
export const submitTest = async (userId, category, questions) => {
  if (!userId || !category || !questions.length) {
    throw new Error("Invalid test submission data");
  }

  try {
    const response = await axios.post(`${API_URL}/submit`, { userId, category, questions });
    return response.data.testSummary;
  } catch (error) {
    console.error("Error submitting test:", error.response?.data || error.message);  
    throw new Error(error.response?.data?.error || "Failed to submit test");
  }
};

// ✅ Fetch user test performance
export const getUserPerformance = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const response = await axios.get(`${API_URL}/performance/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user performance:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to fetch user performance");
  }
};

// ✅ Save test result
export const saveTestResult = async (userId, category, correctAnswers, totalQuestions) => {
  if (!userId || !category) {
    throw new Error("User ID and category are required");
  }

  try {
    const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
    
    const response = await axios.post(`${API_URL}/save-test`, {
      userId,
      category,
      totalQuestions,
      correctAnswers,
      percentage
    });
    
    return response.data;
  } catch (error) {
    console.error("Error saving test result:", error.response?.data || error.message);  
    throw new Error(error.response?.data?.error || "Failed to save test result");
  }
};



