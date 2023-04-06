import "../css/HotCategories.css";
import React, {useState,useEffect} from "react";
const HotCategories = ({setGenre}) => {
  const genres = [
    "Adventure",
    "Shounen",
    "Shojo",
    "Kodomomuke",
    "Isekai",
    "Action",
    "Adventure",
    "Fantasy",
    "Drama",
    "Romance",
    "Horror",
    "Mystery",
  ];
  const [genreList,setGenreList] = useState([]);
  useEffect( () => {
    setGenreList(genres);
  }, [])
  const handleGenreClick = (genre, e) => {
    setGenre(genre);
  }
  return (
    <div className="categories">
      <div className="categories-header">
        <span id="hot">Hot </span> Categories
      </div>
      <div className="hotcategories">
        <div className="frame">
          {genreList.map( (genre,index) => (
            <div className="genres" key={index} onClick={(e) => (handleGenreClick(genre, e))}>
              {genre}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotCategories;
