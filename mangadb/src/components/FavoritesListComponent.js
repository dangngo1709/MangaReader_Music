import React, { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../css/FavoritesListComponent.css";
import MangaList from "../utility/MangaList";
import { FaTrash } from "react-icons/fa";


const FavoritesListComponent = ({setManga}) => {

    const navigate = useNavigate();


    const [favoriteList, setfavoriteList] = useState([
      {
        title: "swag manga",
        id: "4d32cc48-9f00-4cca-9b5a-a839f0764984"
      },
      
      {
        id: "b9af3a63-f058-46de-a9a0-e0c13906197a"
      },
    ]);

    //for redirecting to manga page 
    const handleMangaClick = async (manga, event) => {
      event.preventDefault();

      const id = manga.id;
      const resp = await manga.generateChapters(id);
      setManga(manga);

      setTimeout( () => {
        setManga(manga);
        localStorage.setItem('manga', JSON.stringify(manga));
        navigate("/mangapage");
      }, 700)
    };



    //for removing manga off of the favorites list page
    const handleRemoveManga = async (manga, event) => {

    }

    //for searching favorites list
    const [searchFLManga, setsearchFLManga] = useState("");

    const handlesearchFLManga = (event) => {
        event.preventDefault();
        setsearchFLManga(event.target.value);

    }

    const response = fetch("/mangadb/getUser",{
      method: "GET"
    }).then(async (res) => {
      const data = await res.json()
      console.log(data.user)
    })  


    return (

        <div className="FavoritesListContainer">
            
            <div className="FLheader">
                <p id="FLtitle">My Favorite Mangas :3</p>

            </div>

            <div className="FLmain">
                { 
                favoriteList.map( (mangaObj,index) => 
                    (
                    <div className="FLbookblock">
                      <div
                          className="FLinnerblock"
                          onClick={(e) => handleMangaClick(mangaObj, e)}
                          key={index}>
                          <img src={favoriteList.coverArt} alt="img" />
                          <div id="FLmangatitle">
                          {mangaObj.title}
                          <br />
                          <span id="FLauthor">Author: {mangaObj.author}</span>
                          <br />
                          <span id="FLauthor">Artist: {mangaObj.artist}</span>
                          </div>
                          <p id="FLdescription"><span style={{fontWeight: 'bold'}}>
                              Description: </span>{mangaObj.description}</p>
                      </div>
                      <div id="remove">
                          <button id="trashbutton"><FaTrash/></button>
                        </div>
                    </div>
                    )
                ) }
            </div>

            
        </div>
    )



}


export default FavoritesListComponent;