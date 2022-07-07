import express from "express";
import { logout, startGithub, finishgithub } from "../controller/userController";

const userRouter = express();

userRouter.get("/logout", logout)

export default userRouter;
