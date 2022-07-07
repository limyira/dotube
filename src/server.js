import "./db";
import "./models/Video";
import express from "express";
import morgan from "morgan";
import path from  "path";
import rootRouter from "./router/rootRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";

const app = express();
const PORT = 4100;
const logger = morgan("dev");

const x = path.join(process.cwd(), "src/views");
console.log(x);



app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);


const handleListening = () => {
    return console.log("❤Sever is connected..!");
};


app.listen(4100,handleListening);