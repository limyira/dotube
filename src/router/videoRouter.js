import express from "express";
import { getEdit, postEdit, watch, getUpload, postUpload, deleteVideo } from "../controller/videoController";
import { videoUpload} from "../middleware";
const videoRouter = express.Router();

videoRouter.route("/upload").get(getUpload).post(videoUpload.single("video"),postUpload);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);

export default videoRouter;