import Question from "../model/questionModel.js";
import UserQuestion from "../model/userQuestionModel.js";
import TestRecord from "../model/TestRecord.js";

// export const getTestQuestions = async (req, res) => {
//   try {
//       const { category, difficulty, numberOfQuestions } = req.query;

//       // Validate category input
//       if (!category) {
//           return res.status(400).json({ error: "Category is required" });
//       }

//       // If difficulty is "Any", don't apply difficulty filtering
//       const difficultyQuery = difficulty && difficulty !== "Any" ? { difficulty } : {};

//       // Fetch questions from both models (Question and UserQuestion)
//       const [questionResults, userQuestionResults] = await Promise.all([
//           Question.find({ category, ...difficultyQuery }).limit(parseInt(numberOfQuestions) || 10),
//           UserQuestion.find({ category, ...difficultyQuery }).limit(parseInt(numberOfQuestions) || 10)
//       ]);

//       // Combine results from both queries
//       const questions = [...questionResults, ...userQuestionResults];

//       // If no questions are found, return an error
//       if (questions.length === 0) {
//           return res.status(404).json({ error: "No questions found" });
//       }

//       // Send the combined list of questions as a response
//       res.status(200).json({ questions });
//   } catch (error) {
//       console.error("Error fetching test questions:", error);
//       res.status(500).json({ error: "Server error" });
//   }
// };



// export const getTestQuestions = async (req, res) => {
//   try {
//       const { category, difficulty, numberOfQuestions } = req.query;

//       // Validate category input
//       if (!category) {
//           return res.status(400).json({ error: "Category is required" });
//       }

//       // Normalize category and difficulty (convert to lowercase)
//       const normalizedCategory = category.toLowerCase();
//       const normalizedDifficulty = difficulty && difficulty !== "Any" ? difficulty.toLowerCase() : undefined;

//       // Fetch questions from both models (Question and UserQuestion)
//       const [questionResults, userQuestionResults] = await Promise.all([
//           Question.find({ category: { $regex: `^${category}$`, $options: "i" }, ...normalizedDifficulty && { difficulty: normalizedDifficulty } })
//               .limit(parseInt(numberOfQuestions) || 10),
//           UserQuestion.find({ category: normalizedCategory, ...normalizedDifficulty && { difficulty: normalizedDifficulty } })
//               .limit(parseInt(numberOfQuestions) || 10)
//       ]);

//       // Combine results from both queries
//       const questions = [...questionResults, ...userQuestionResults];

//       // If no questions are found, return an error
//       if (questions.length === 0) {
//           return res.status(404).json({ error: "No questions found" });
//       }

//       // Send the combined list of questions as a response
//       res.status(200).json({ questions });
//   } catch (error) {
//       console.error("Error fetching test questions:", error);
//       res.status(500).json({ error: "Server error" });
//   }
// };



export const getTestQuestions = async (req, res) => {
  try {
    const { category, difficulty, numberOfQuestions } = req.query;

    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    // Normalize inputs
    const normalizedCategory = category.toLowerCase();
    const normalizedDifficulty =
      difficulty && difficulty !== "Any" ? difficulty.toLowerCase() : undefined;

    // Fix difficulty case issue
    const difficultyQuery = normalizedDifficulty
      ? {
          $or: [
            { difficulty: normalizedDifficulty }, // For UserQuestion model (lowercase)
            {
              difficulty:
                normalizedDifficulty.charAt(0).toUpperCase() +
                normalizedDifficulty.slice(1),
            }, // For Question model (Capitalized)
          ],
        }
      : {};

    // Fetch questions from both models
    const [questionResults, userQuestionResults] = await Promise.all([
      Question.find({
        category: { $regex: `^${category}$`, $options: "i" },
        ...difficultyQuery,
      }).limit(parseInt(numberOfQuestions) || 10),

      UserQuestion.find({
        category: normalizedCategory,
        ...difficultyQuery,
      }).limit(parseInt(numberOfQuestions) || 10),
    ]);

    // Combine results
    const questions = [...questionResults, ...userQuestionResults];

    if (questions.length === 0) {
      return res.status(404).json({ error: "No questions found" });
    }

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching test questions:", error);
    res.status(500).json({ error: "Server error" });
  }
};












export const submitTest = async (req, res) => {
  try {
    const { userId, category, totalQuestions, correctAnswers, percentage } = req.body;

    if (!userId || !category) {
      return res.status(400).json({ error: "User ID and category are required" });
    }

    // Create and save the test record
    const newTestRecord = new TestRecord({
      user: userId,
      category,
      totalQuestions: totalQuestions || 0,
      correctAnswers: correctAnswers || 0,
      percentage: percentage || 0,
    });

    await newTestRecord.save();

    res.status(201).json({
      message: "Test record saved successfully",
      testSummary: { totalQuestions, correctAnswers, percentage },
    });

  } catch (error) {
    console.error("Error saving test record:", error);
    res.status(500).json({ error: "Server error while saving test record" });
  }
};


// ✅ Get user test performance (Category-wise & Overall)
export const getUserPerformance = async (req, res) => {
  try {
    const { userId } = req.params;

    const records = await TestRecord.find({ user: userId });

    if (records.length === 0) return res.status(200).json({ message: "No test records found." });

    let categoryStats = {};
    let totalCorrect = 0;
    let totalAttempted = 0;

    records.forEach((record) => {
      if (!categoryStats[record.category]) {
        categoryStats[record.category] = { totalQuestions: 0, correctAnswers: 0, averagePercentage: 0 };
      }
      categoryStats[record.category].totalQuestions += record.totalQuestions;
      categoryStats[record.category].correctAnswers += record.correctAnswers;
      totalCorrect += record.correctAnswers;
      totalAttempted += record.totalQuestions;
    });

    // Calculate category-wise average percentage
    Object.keys(categoryStats).forEach((category) => {
      categoryStats[category].averagePercentage = ((categoryStats[category].correctAnswers / categoryStats[category].totalQuestions) * 100).toFixed(2);
    });

    // Calculate overall percentage
    const overallPercentage = totalAttempted > 0 ? ((totalCorrect / totalAttempted) * 100).toFixed(2) : 0;

    res.status(200).json({ categoryStats, overallPercentage });
  } catch (error) {
    console.error("Error fetching user performance:", error);
    res.status(500).json({ error: "Server error while fetching user performance" });
  }
};
