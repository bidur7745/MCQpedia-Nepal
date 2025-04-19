import express from "express";
import { submitContactForm } from "../Controller/contactController.js";

const  contactFormRoutes = express.Router();

// Route to submit a contact form
contactFormRoutes.post("/feedback", submitContactForm);

// // Route to get all form submissions (Admin)
// router.get("/submissions", getAllSubmissions);

// // Route to get a single submission by ID
// router.get("/submissions/:id", getSubmissionById);

// // Route to delete a submission by ID
// router.delete("/submissions/:id", deleteSubmission);

export default  contactFormRoutes;
