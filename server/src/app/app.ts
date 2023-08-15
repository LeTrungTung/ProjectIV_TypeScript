import express, { Express, Response, Request } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import Router from "./routers";
import path from "path";
import cors from "cors";

const app: Express = express();

//middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

//static file
const staticDirectory = path.join(__dirname, "../../public");
app.use(express.static(staticDirectory));
//Router

Router(app);

//Handle Error

export default app;
