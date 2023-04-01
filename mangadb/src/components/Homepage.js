import "../css/homepage.css";
import Cont_Read from "./Cont_Read";
import React, {useState, useEffect} from 'react';
import MangaList from "../utility/MangaList";

import MangaPage from "./MangaPage";
import Menu from "./Menu";

const Homepage = () => {
  const [manga, setManga] = useState(null);
  useEffect( () => {
  }, [])
  const sessionID = localStorage.getItem('session_id');
  if (!sessionID) {
    localStorage.setItem('login_missing', 'true');
    window.location.href = '/login'
  }
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  }
  return (
    <div className="grid-container">
      <div className="item1">
      <button onClick={handleLogout}>Logout</button>
      Header</div>
      <div className="item2">
        <Menu/>
      </div>
      <div className="item3">Main</div>
      <Cont_Read setManga={setManga}/>
    </div>
  );
}

export default Homepage;
