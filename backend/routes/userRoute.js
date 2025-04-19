import express from "express";
import { register, login, logout, getProfile } from "../Controller/userController.js";
import userMiddleware from "../Middleware/userMiddleware.js";

const UserRouter = express.Router();

UserRouter.post("/register", register);
UserRouter.post("/login", login);
UserRouter.post("/logout", logout);
UserRouter.get("/me", userMiddleware, getProfile); // Protected route

export default UserRouter;
