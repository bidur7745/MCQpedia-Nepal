import express from 'express';
import {  getQuestionsByCategory } from '../Controller/questionController.js';

const QuestionRouter = express.Router();

// Route to get questions by category

QuestionRouter.get("/:category", getQuestionsByCategory)
// router.get('/questions/:category', getQuestionsByCategory);

export default QuestionRouter;
