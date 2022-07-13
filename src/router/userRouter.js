import express from "express";
import { see, logout, startGithub, finishGithub, getEditProfile, postEditProfile, getChangePassword, postChangePassword } from "../controller/userController";
import { publicOnlyMiddleware, protectorMiddleware, uploadImg } from "../middleware";
const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware ,logout)
userRouter.get("/startgithub", publicOnlyMiddleware, startGithub);
userRouter.get("/finishgithub", publicOnlyMiddleware, finishGithub);
userRouter.route("/edit-profile").all(protectorMiddleware).get(getEditProfile).post(uploadImg.single("avatar"),postEditProfile);
userRouter.route("/changepassword").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/:id", see);

export default userRouter;
