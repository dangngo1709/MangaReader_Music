import "../css/homepage.css";
import Cont_Read from "./Cont_Read";
import React, {useState, useEffect} from 'react';
import MangaList from "../utility/MangaList";

import MangaPage from "./MangaPage";
import Menu from "./Menu";
import HotCategories from "./HotCategories";

const Homepage = ({manga, setManga}) => {
  const [genre, setGenre] = useState('Adventure');
  const [mangaList, setList] = useState([]);
  useEffect( () => {
  }, [])
  const sessionID = localStorage.getItem('session_id');
  // if (!sessionID) {
  //   localStorage.setItem('login_missing', 'true');
  //   window.location.href = '/login'
  // }
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  }
  return (
    <div className="grid-container">
      <div className="item1" id="item_1">
        <button onClick={handleLogout}>Logout</button>
        Header</div>
      <div className="item2" id="item_2">
        <Menu/>
      </div>
      <div className="item3" id="item_3">
        <HotCategories setGenre={setGenre}/>
        <Cont_Read setManga={setManga} setList={setList} mangaList={mangaList} genre={genre}/>  
      </div>
    </div>
  );
}

export default Homepage;
