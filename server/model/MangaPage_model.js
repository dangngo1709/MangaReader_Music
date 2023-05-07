import mongoose from "mongoose";

const MangaPage = new mongoose.Schema(
    {
      manga_id: { type: String, unique: true},
      comments: { type: Array}
    },
    {collection: "manga-pages"}
  );
  
  const model = mongoose.model('manga-pages', MangaPage);
  export default model;