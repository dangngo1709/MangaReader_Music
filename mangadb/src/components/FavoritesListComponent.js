import React, { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../css/FavoritesListComponent.css";
import MangaList from "../utility/MangaList";
import { BsFilterSquare } from "react-icons/bs";


const FavoritesListComponent = ({setManga, genre, mangaList, setList}) => {


    
    return (

        <div className="FavoritesListContainer">
            
            <div className="FLheader">
                <p id="FLtitle">Favorites</p>
                <input type="search" name="FLsearchbar" 
                    placeholder="Search favorite mangas here " ></input>
                <BsFilterSquare style={{display: 'flex'}}/>
            </div>

        </div>
    )



}


export default FavoritesListComponent;