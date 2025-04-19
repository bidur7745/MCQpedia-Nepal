import Question from '../model/questionModel.js';


 const getQuestionsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
      // Make the query case-insensitive using RegExp
      const questions = await Question.find({
          category: { $regex: new RegExp(`^${category}$`, 'i') } // 'i' makes it case-insensitive
      });

      if (questions.length === 0) {
          return res.status(404).json({ message: "No questions found for this category" });
      }

      res.json(questions);
  } catch (err) {
      res.status(500).json({ message: err.message });

  }
}; 



export { getQuestionsByCategory };