import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserData from './routes/UserData.js'
dotenv.config();
const pass = process.env.pass_key;
const user = process.env.user_key;
mongoose.connect(
  `mongodb+srv://${user}:${pass}@cluster0.wy1i4xn.mongodb.net/test`
);

const app = express();
app.use(express.json());
app.use(cors());
app.use(UserData)
const port = 5001;

app.listen(port, () => {
  console.log("server starting");
});
