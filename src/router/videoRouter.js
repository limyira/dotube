import express from "express";
import { edit, watch, getUpload, postUpload } from "../controller/videoController";

const videoRouter = express();

videoRouter.get("/edit", edit);
videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id([0-9a-f]{24})", watch);

export default videoRouter;