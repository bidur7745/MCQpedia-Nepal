import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import UserRouter from "./routes/userRoute.js";
import questionRoutes from './routes/questionRoutes.js';
import contactFormRoutes from "./routes/contactRoutes.js";
import userQuestionRouter from "./routes/userQuestionRoutes.js";
import testRouter from "./routes/testRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"], credentials: true }));

// Connect to Database
connectDB();

// Routes
app.use("/api/user", UserRouter);
app.use("/api/question-bank", questionRoutes);
app.use("/api/contact", contactFormRoutes);
app.use("/api/questions", userQuestionRouter);
app.use("/api/test", testRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Application running on http://localhost:${PORT}`));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Application running on https://mcqpedia-nepal.onrender.com`));
