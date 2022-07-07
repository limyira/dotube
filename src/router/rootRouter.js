import express from "express";
import { join, login } from "../controller/userController";
import { search, trending } from "../controller/videoController";

const rootRouter = express();

rootRouter.get("/", trending);
rootRouter.get("/login", login);
rootRouter.get("/join", join);
rootRouter.get("/search", search);


export default rootRouter;