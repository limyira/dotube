import express from "express";
import { logout, edit } from "../controller/userController";

const userRouter = express();

userRouter.get("/edit", edit)
userRouter.get("/logout", logout)

export default userRouter;
