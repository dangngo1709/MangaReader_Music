import React, { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../css/homepage.css";
import MangaList from "../utility/MangaList";

const Cont_Read = ({setManga, genre, mangaList, setList}) => {
  const [loading,setLoading] = useState(false);
  const [orderFilter, setOrder] = useState("Most Popular")
  const [scanGroups, setGroup] = useState(null);
  const navigate = useNavigate();
  const handleMangaClick = async (manga, event) => {
    event.preventDefault();
    const id = manga.id
    manga.generateChapters(id)
    setTimeout( () => {
      setManga(manga);
      localStorage.setItem('manga', JSON.stringify(manga));
      navigate("/mangapage");
    }, 700)
  };
  const handleOrderChange = (event) => {
    event.preventDefault();
    setOrder(event.target.value);
  }
  /** How to fetch Manga, need to import mangalist and useeffect */
  useEffect(() => {
    setLoading(false);
    const list = new MangaList();
    const includedTags = [genre];
    const excludedTags = ["Harem"];
    const title = 'Slime';
    //list.setTitleSearch(title);
    let order = {};
    if(orderFilter === 'Most Popular'){
      order.followedCount = 'desc'; 
    } else if (orderFilter === 'Relevant'){
      order.relevance = 'desc'; 
    } else {
      order.latestUploadedChapter = 'desc'
    }
    //list.setTitleSearch(title);
    const filterObj = {
      includedTags: includedTags,
      excludedTags: excludedTags,
      order: order,

      //for fav list 
      
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
  }, [genre, orderFilter]);
  return (
    <div className="cont_read_container">
      <div id="cont-read">
        Genre: <span id="reading">{genre} </span>
        <span id="Filter">
          <label>
            <select name="Sort Order" id="orderSelect" onChange={handleOrderChange}>
              <option value="Most Popular">Most Popular</option>
              <option value="Relevant">Relevant</option>
              <option value="Latest Uploaded Chapter">Latest Uploaded Chapter</option>
            </select>
          </label>
        </span>
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
