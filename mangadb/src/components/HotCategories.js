import "../css/HotCategories.css";
import React, { useState, useEffect } from "react";
const HotCategories = ({ setGenre }) => {

  //most common genres in manga
  const genres = [
    "Adventure",
    "Sports",
    "Medical",
    "Comedy",
    "Isekai",
    "Action",
    "Thriller",
    "Fantasy",
    "Drama",
    "Romance",
    "Horror",
    "Mystery",
  ];

  //for creating new filtered list of genres
  const [genreList, setGenreList] = useState([]);
  useEffect(() => {
    setGenreList(genres);
  }, []);
  //for displaying mangas under this specific genre
  const handleGenreClick = (genre, e) => {
    setGenre(genre);
  };
  return (
    <div className="categories">
      <div className="categories-header">
        <span id="hot">Hot </span> Categories
      </div>
      <div className="hotcategories">
        <div className="frame">
          {genreList.map((genre, index) => (
            <div
              className="genres"
              key={index}
              onClick={(e) => handleGenreClick(genre, e)}
            >
              {genre}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotCategories;
