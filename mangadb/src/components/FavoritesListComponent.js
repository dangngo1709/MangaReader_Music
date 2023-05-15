import React, { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../css/FavoritesListComponent.css";
import MangaList from "../utility/MangaList";
import { FaTrash } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const FavoritesListComponent = ({ setManga }) => {
  //for each specific manga block object 
  let mangaObj = JSON.parse(localStorage.getItem("manga"));
  const navigate = useNavigate();
  //for removing manga off of the favorites list page
  const handleRemoveManga = async (mangaObj) => {
    const res = await fetch("/mangadb/deleteMangaFromFavoriteList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mangaObj,
      }),
    });

    //for checking to see if manga been deleted properly from the list
    const data = await res.json();
    if (data.status === "success") {
      alert("manga has been deleted from the favorites list!");
      window.location.href = "/FavoritesListPage";
    } else {
      alert("error! manga could not be deleted from the favorites list!");
    }
  };

  //getting different user's lists
  const response = () => {
    fetch("/mangadb/getUser", {
      method: "GET",
    }).then(async (res) => {
      const data = await res.json();
      //display favorites list based on the current user logged in 
      setfavoriteList(data.user.favoriteList);
    });
  };

  useEffect(() => {
    //getting different user's lists
    response();
  }, []);


  //favorites list 
  const [favoriteList, setfavoriteList] = useState(null);

  //for redirecting to manga page
  const handleMangaClick = async (manga, event) => {
    event.preventDefault();

    const id = manga.id;
    const resp = await manga.generateChapters(id);
    setManga(manga);


    //needed bc if manga object blocks are clicked on too quickly,
    //the images and/or manga information simply won't display
    setTimeout(() => {
      setManga(manga);
      localStorage.setItem("manga", JSON.stringify(manga));
    }, 700);
  };

  return (
    <div className="FavoritesListContainer">
      <div className="FLheader">
        <p id="FLtitle">My Favorite List</p>
      </div>

      <div className="FLmain">
        {favoriteList?.map((mangaObj, index) => (
          <div className="FLbookblock">
            <div className="FLinnerblock" key={index}>
              <img
                src={mangaObj.coverArt}
                height="300px"
                width="256px"
                alt="img"
                onClick={(e) => handleMangaClick(mangaObj, e)}
              />
              <div id="FLmangatitle">
                {mangaObj.title}
                <br />
                <span id="FLauthor">Author: {mangaObj.author}</span>
                <br />
                <span id="FLauthor">Artist: {mangaObj.artist}</span>
              </div>
              <p id="FLdescription">
                <span style={{ fontWeight: "bold" }}>Description: </span>
                {mangaObj.description}
              </p>
            </div>
            <div id="remove">
              <button
                onClick={(e) => handleRemoveManga(mangaObj, e)}
                id="trashbutton"
              >
                <MdDeleteForever /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesListComponent;
