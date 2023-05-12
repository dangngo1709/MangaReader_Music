import express from "express";
import bcrypt from "bcrypt";
import User from "../model/User_model.js";
import MangaPage from "../model/MangaPage_model.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
const app = express();

router.post("/mangadb/addMangaToFavoriteList", async (req, res) => {
  const mangaObj = req.body.mangaObj;
  const checkMangaDuplicate = await User.findOne({
    email: req.session.userEmail,
    "favoriteList.id": mangaObj.id,
  });
  console.log(mangaObj);
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

router.post("/mangadb/deleteMangaFromPlaylist", async (req, res) => {
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
