import "../css/homepage.css";
import React, {useState, useEffect} from 'react';
import MangaList from "../utility/MangaList";
import Menu from "./Menu";
import FavoritesListComponent from "./FavoritesListComponent";

const FavoritesListPage = ({manga, setManga}) => {
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

    const handleLogout = async() => {
      console.log('here')
      const resp = await fetch('/mangadb/logout', {
        method: "GET"
      }).then( () => {
        localStorage.clear();
        window.location.href = '/login';
      })
    }


    return (
      <div className="grid-container" >
        
        <div className="item1" id="item_1">
          <div className="tempUserValidation">
            <button id="UserValidationButtons" onClick={handleLogin}>Login</button>
            <button id="UserValidationButtons" onClick={handleRegister}>Register</button>
          </div>
        </div>

        <div className="item2" id="item_2">
          <Menu />
        </div>

        <div className="item3" id="item_3">
          <div className="main">
            <FavoritesListComponent 
              setManga={setManga}  />
          </div>
        </div>

      </div>
    );

}

export default FavoritesListPage;
