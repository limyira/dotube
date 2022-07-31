import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import "regenerator-runtime";
import path  from "path";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import rootRouter from "./router/rootRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";
import apiRouter from "./router/apiRouter";
import { loacalsMiddleware } from "./middleware";
import MongoStore from "connect-mongo";

const app = express();
const PORT = process.env.PORT || 4300;
const logger = morgan("dev");


app.set("view engine", "pug");
app.set("views",path.join(process.cwd(), "src/views"));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl:process.env.DB_URL })
}));


app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
});

app.use(flash());
app.use(loacalsMiddleware);
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("assets"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);


const handleListening = () => {
    return console.log("❤Sever is connected..!");
};


app.listen(PORT,handleListening);