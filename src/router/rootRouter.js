import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controller/userController";
import { search, trending } from "../controller/videoController";

const rootRouter = express();

rootRouter.get("/", trending);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", search);


export default rootRouter;