import "../css/homepage.css";
import Cont_Read from "./Cont_Read";
import React, {useState, useEffect} from 'react';
import MangaList from "../utility/MangaList";

import MangaPage from "./MangaPage";
import Menu from "./Menu";
import FavoritesListComponent from "./FavoritesListComponent";

const FavoritesListPage = ({manga, setManga}) => {
    const [genre, setGenre] = useState('Adventure');
    const [mangaList, setList] = useState([]);
    useEffect( () => {
    }, [])


    const handleLogin = () => {
      localStorage.clear();
      window.location.href = '/login';
    }

    const handleRegister = () => {
      localStorage.clear();
      window.location.href = '/';
    }


    return (
      <div className="grid-container" >
        
        <div className="item1" id="item_1">
          <div className="tempUserValidation">
            <button id="UserValidationButtons" onClick={handleLogin}>Login</button>
            <button id="UserValidationButtons" onClick={handleRegister}>Register</button>
            Header here :3
          </div>
        </div>

        <div className="item2" id="item_2">
          <Menu />
        </div>

        <div className="item3" id="item_3">
          <div className="main">
            <FavoritesListComponent 
              setManga={setManga} 
              setList={setList} 
              mangaList={mangaList}  />
          </div>
        </div>

      </div>
    );

}

export default FavoritesListPage;
