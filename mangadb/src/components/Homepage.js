import "../css/homepage.css";
import logo from "../assets/logo.png";
import Cont_Read from "./Cont_Read";
import React, { useState, useEffect, useRef } from "react";
import Menu from "./Menu";
import HotCategories from "./HotCategories";
import Header from "./Header";

const Homepage = ({ manga, setManga }) => {
  const [genre, setGenre] = useState("Adventure");
  const [mangaList, setList] = useState([]);

  const sessionID = localStorage.getItem("session_id");
  /*if (!sessionID) {
    localStorage.setItem('login_missing', 'true');
    window.location.href = '/login'
  }*/
  return (
    <div className="grid-container">
      <div className="item1" id="item_1">
        <Header setManga={setManga} />
      </div>
      <div className="item2" id="item_2">
        <Menu />
      </div>
      <div className="item3" id="item_3">
        <HotCategories setGenre={setGenre} />
        <Cont_Read
          setManga={setManga}
          setList={setList}
          mangaList={mangaList}
          genre={genre}
        />
      </div>
    </div>
  );
};

export default Homepage;
