import express from "express";
import {registerView, createComment, removeComments} from "../controller/videoController";




const apiRouter = express.Router();



apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);
apiRouter.delete("/videos/:id([0-9a-f]{24})/remove", removeComments)

export default apiRouter;