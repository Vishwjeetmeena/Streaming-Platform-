import "dotenv/config";
import authentication from "./Routes/authentication.js";
import user from "./Routes/userApi.js";
import movies from "./Routes/moviesApi.js";
import list from "./Routes/listApi.js";
import admins from "./Routes/adminApi.js";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import express from "express";
import { DbConnection } from "./Database/config/config.js";
import status from 'express-status-monitor'
const app = express();

app.use(cookieParser());
app.use(status()); // to check mermory concuption /status
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message:"Welcome to Home page"});
});

app.use("/api/auth", authentication);
app.use("/api/user",user);
app.use("/api/movies",movies);
app.use("/api/list",list);
app.use("/api/admin", admins);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is listning on port ${port}`);
});
DbConnection();