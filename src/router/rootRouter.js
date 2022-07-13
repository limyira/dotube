import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controller/userController";
import { search, trending } from "../controller/videoController";
import { publicOnlyMiddleware } from "../middleware";

const rootRouter = express.Router();

rootRouter.get("/", trending);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.get("/search", search);


export default rootRouter;