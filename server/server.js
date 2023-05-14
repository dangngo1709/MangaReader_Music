import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserData from "./routes/UserData.js";
import session from "express-session";
import FavoriteList from "./routes/FavoriteList.js";

// initialize pass and key to access mongodb
dotenv.config();
const pass = process.env.pass_key;
const user = process.env.user_key;
mongoose.connect(
  `mongodb+srv://${user}:${pass}@cluster0.wy1i4xn.mongodb.net/test`
);

// initialize session id using secret key
const secret_key = process.env.secret;
const app = express();
app.use(
  session({
    secret: secret_key,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      expires: 6000000000,
    },
  })
);

// initialize all routes, cors policy, json parsing
app.use(express.json());
app.use(cors());
app.use(UserData);
app.use(FavoriteList);
const port = 5001;

// initialize server
app.listen(port, () => {
  console.log("server starting");
});
