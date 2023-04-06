import React, { useEffect, useState, useRef } from "react";
import "../css/homepage.css";
import MangaList from "../utility/MangaList";

const Cont_Read = ({setManga, genre}) => {
  const [loading,setLoading] = useState(false);
  const [mangaList, setList] = useState([]);
  const handleMangaClick = async (manga, event) => {
    event.preventDefault();
    const id = manga.id
    const resp = await manga.generateChapters(id)
    setManga(manga);
    setTimeout( () => {
      setManga(manga);
    }, 700)
  };
  /** How to fetch Manga */
  useEffect(() => {
    setLoading(false);
    const list = new MangaList();
    const includedTags = [genre];
    const excludedTags = ["Harem"];
    const title = 'Fairy';
    //list.setTitleSearch(title);
    const order = {
      followedCount: "desc",
    };
    const filterObj = {
      includedTags: includedTags,
      excludedTags: excludedTags,
      order: order
    };
    // Create filters above ^^ 
    // If you like to search just for a title, add in the setTitleSearch 
    list.setFilter(filterObj).then( () => {
      list.generateMangaList().then( (res) => {
        setList(res);
      })
    })
  //important, need to wait 1 second or else it wont render
  setTimeout( () => {
    setLoading(true);
  }, 1200)
  }, [genre]);
  return (
    <div className="cont_read_container">
      <div id="cont-read">
        Genre: <span id="reading">{genre} </span>
      </div>
      <div className="book-row">
        {loading ? 
        mangaList.map( (manga,index) => 
            (
              <div
                className="book-block"
                onClick={(e) => handleMangaClick(manga, e)}
                key={index}
              >
                <img src={manga.coverArt} alt="img" />
                <div id="rec_title">
                  {manga.title}
                  <br />
                  <span id="rec_author">Author: {manga.author}</span>
                  <br />
                  <span id="rec_author">Artist: {manga.artist}</span>
                </div>
                <p id="description"><span style={{fontWeight: 'bold'}}>Description: </span>{manga.description}</p>
              </div>
            )
          ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
};

export default Cont_Read;
