import express from "express";
import bcrypt from "bcrypt";
import User from "../model/User_model.js";
import MangaPage from "../model/MangaPage_model.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
const app = express();

// add a manga to user's favorite list, requires session id and manga object
router.post("/mangadb/addMangaToFavoriteList", async (req, res) => {
  const mangaObj = req.body.mangaObj;
  const checkMangaDuplicate = await User.findOne({
    email: req.session.userEmail,
    "favoriteList.id": mangaObj.id,
  });
  if (checkMangaDuplicate) {
    res.json({ status: "error", msg: "Duplicate Playlist Name" });
  } else {
    const modify = await User.updateOne(
      {
        email: req.session.userEmail,
      },
      {
        $push: { favoriteList: mangaObj },
      }
    );
    if (modify) {
      res.json({ status: "success" });
    } else {
      res.json({ status: "error" });
    }
  }
});
//Delete a manga from user's favorite list, requires session id and manga object
router.post("/mangadb/deleteMangaFromFavoriteList", async (req, res) => {
  const mangaObj = req.body.mangaObj;
  const findMangaToDelete = await User.updateOne(
    {
      email: req.session.userEmail,
    },
    {
      $pull: {
        favoriteList: {
          id: mangaObj.id,
        },
      },
    }
  );
  if (findMangaToDelete) {
    return res.json({ status: "success" });
  } else {
    return res.json({ status: "error" });
  }
});

export default router;
