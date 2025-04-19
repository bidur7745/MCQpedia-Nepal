import express from "express";
import { getTestQuestions, getUserPerformance, submitTest } from "../Controller/testController.js";

const testRouter = express.Router();

testRouter.get("/questions", getTestQuestions);  // Get test questions
testRouter.post("/save-test", submitTest);   // Save test record
testRouter.get("/performance/:userId", getUserPerformance);  // Get user performance

export default testRouter;
