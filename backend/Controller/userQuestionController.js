import Question from "../model/userQuestionModel.js";

// Create a new question
export const createQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, explanation, category, difficulty } = req.body;

    if (!question || !options || options.length < 2 || !correctAnswer || !explanation || !category || !difficulty) {
      return res.status(400).json({ error: "All fields are required, and at least two options must be provided" });
    }

    const newQuestion = new Question({
      question,
      options,
      correctAnswer,
      explanation,
      category: category.toLowerCase(),  // Store category in lowercase
      difficulty: difficulty.toLowerCase(), // Store difficulty in lowercase
      createdBy: req.user.id,
    });

    await newQuestion.save();
    res.status(201).json({ message: "Question created successfully" });
  } catch (err) {
    console.error("Error creating question:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all questions for the question bank page (public)
export const getAllQuestions = async (req, res) => {
  try {
    const { category } = req.params;
    const { limit } = req.query; // Get limit from query parameters
    
    let query = {};
    
    // If category is provided, filter by it
    if (category) {
      query.category = category.toLowerCase();
    }
    
    console.log("Query:", query); // Debug log
    
    // If limit is provided, use it to limit the number of questions
    let questions;
    if (limit) {
      // Convert limit to number and ensure it's positive
      const numLimit = Math.max(1, parseInt(limit));
      questions = await Question.find(query).limit(numLimit);
    } else {
      questions = await Question.find(query);
    }
    
    console.log("Found questions:", questions.length); // Debug log
    
    if (!questions || questions.length === 0) {
      return res.status(404).json({ 
        error: "No questions found",
        message: category ? `No questions found for category: ${category}` : "No questions available"
      });
    }
    
    res.status(200).json({ questions });
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get questions created by the logged-in user
export const getMyQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ createdBy: req.user.id });
    res.status(200).json(questions);
  } catch (err) {
    console.error("Error fetching user questions:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Edit a question (only if the user created it)
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, options, correctAnswer, explanation, category, difficulty } = req.body;

    const existingQuestion = await Question.findById(id);
    if (!existingQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Check if the logged-in user is the one who created the question
    if (existingQuestion.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "You can only edit your own questions" });
    }

    existingQuestion.question = question || existingQuestion.question;
    existingQuestion.options = options || existingQuestion.options;
    existingQuestion.correctAnswer = correctAnswer || existingQuestion.correctAnswer;
    existingQuestion.explanation = explanation || existingQuestion.explanation;
    existingQuestion.category = category ? category.toLowerCase() : existingQuestion.category;
    existingQuestion.difficulty = difficulty ? difficulty.toLowerCase() : existingQuestion.difficulty;

    await existingQuestion.save();
    res.status(200).json({ message: "Question updated successfully" });
  } catch (err) {
    console.error("Error updating question:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a question (only if the user created it)
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (err) {
    console.error("Error deleting question:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get the count of questions created by a user
export const getQuestionCountByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    
    // Count questions created by this user
    const count = await Question.countDocuments({ createdBy: userId });
    
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error getting question count:", error);
    res.status(500).json({ error: "Server error" });
  }
};