import React, { useEffect, useState, useRef } from "react";
import "../css/homepage.css";
import MangaList from "../utility/MangaList";

const Cont_Read = ({setManga}) => {
  const [loading,setLoading] = useState(false);
  /** How to fetch Manga */
  const [mangaList, setList] = useState([]);
  const [genre,setGenre] = useState('Genre');
  const handleMangaClick = async (manga, event) => {
    event.preventDefault();
    const id = manga.id
    const resp = await manga.generateChapters(id)
    setManga(manga);
    setTimeout( () => {
      setManga(manga);
    }, 700)
  };
  useEffect(() => {
    if(mangaList.length == 0){
      const list = new MangaList();
      const includedTags = ["Isekai"];
      setGenre(includedTags[0]);
      const excludedTags = ["Harem"];
      const order = {
        updatedAt: "desc",
      };
      const titleSearch = 'Fairy Tail'
      const filterObj = {
        includedTags: includedTags,
        excludedTags: excludedTags,
      };
      // Create filters above ^^ 
      // If you like to search just for a title, add in the titleSearch 
      // variable inside generateMangaList. If u want multiple filters add
      // in a blank string '' as a parameter instead.
      list.setFilter(filterObj).then( () => {
        list.generateMangaList('').then( (res) => {
          setList([...mangaList, res]);
        })
      })
    }//important, need to wait 1 second or else it wont render
    setTimeout( () => {
      setLoading(true);
    }, 1200)
  }, []);
  return (
    <div className="item5" id="item_5">
      <h3 id="cont-read">
        Genre: <span id="reading">{genre} </span>
      </h3>
      <div className="book-row">
        {loading ? 
        mangaList[0].map( (manga,index) => 
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
