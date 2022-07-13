import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import path  from "path";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./router/rootRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";
import { loacalsMiddleware } from "./middleware";
import MongoStore from "connect-mongo";

const app = express();
const PORT = 4200;
const logger = morgan("dev");


app.set("view engine", "pug");
app.set("views",path.join(process.cwd(), "src/views"));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl:process.env.DB_URL })
}));



app.use(loacalsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);


const handleListening = () => {
    return console.log("❤Sever is connected..!");
};


app.listen(4200,handleListening);