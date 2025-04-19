import express from "express";
import { createQuestion, getAllQuestions, getMyQuestions, updateQuestion, deleteQuestion, getQuestionCountByUser } from "../Controller/userQuestionController.js";
import userMiddleware from "../Middleware/userMiddleware.js";

const userQuestionRouter = express.Router();

userQuestionRouter.post("/create", userMiddleware, createQuestion);

// Get questions created by the logged-in user (must come before /:category)
userQuestionRouter.get("/my-questions", userMiddleware, getMyQuestions);

// Get count of questions by user ID - public endpoint, no auth required
userQuestionRouter.get("/count/:userId", getQuestionCountByUser);

// Get all questions or questions by category
userQuestionRouter.get("/", getAllQuestions);
userQuestionRouter.get("/:category", getAllQuestions);

// Edit a question (only if the user created it)
userQuestionRouter.put("/edit/:id", userMiddleware, updateQuestion);

// Delete a question (only if the user created it)
userQuestionRouter.delete("/delete/:id", userMiddleware, deleteQuestion);

export default userQuestionRouter;
