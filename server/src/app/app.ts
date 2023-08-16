import express, { Express, Response, Request } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import Router from "./routers";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Express = express();

//middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:5050"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

//static file
const staticDirectory = path.join(__dirname, "../../public");
app.use(express.static(staticDirectory));
//Router

Router(app);

//Handle Error

export default app;
