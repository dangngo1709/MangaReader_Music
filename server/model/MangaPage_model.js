import mongoose from "mongoose";

/**
 * Manga Page data in backend
 * manga_id: unique id for a manga page
 * comments: array of comment objects (refer to frontend for comment object)
 */
const MangaPage = new mongoose.Schema(
  {
    manga_id: { type: String, unique: true },
    comments: { type: Array },
  },
  { collection: "manga-pages" }
);

const model = mongoose.model("manga-pages", MangaPage);
export default model;
