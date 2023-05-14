import mongoose from "mongoose";

/**
 * Description: User Data in the backend
 * name: the username of the user
 * email: the email of the user
 * password: hashed password
 * aboutMe: the user's about me description for their profile
 * playlists: an array of playlist objects (refer to playlist class in frontend)
 * favoriteList: array of manga objects (refer to manga class in frontend)
 */
const User = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aboutMe: { type: String },
    playlists: { type: Array },
    favoriteList: { type: Array },
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);
export default model;
