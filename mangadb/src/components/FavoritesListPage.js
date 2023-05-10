import "../css/homepage.css";
import React, {useState, useEffect} from 'react';
import MangaList from "../utility/MangaList";
import Menu from "./Menu";
import FavoritesListComponent from "./FavoritesListComponent";

const FavoritesListPage = ({manga, setManga}) => {
  const [favorited, setfavorited] = useState(false);

  //test 
    const [favoriteList, setfavoriteList] = useState([
      {
        id: "4d32cc48-9f00-4cca-9b5a-a839f0764984"
      },
      
      {
        id: "b9af3a63-f058-46de-a9a0-e0c13906197a"
      },
    ]);
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
              setfavorited={setfavorited}
              setManga={setManga} 
              setfavoriteList={setfavoriteList} 
              favoriteList={favoriteList}  />
          </div>
        </div>

      </div>
    );

}

export default FavoritesListPage;
