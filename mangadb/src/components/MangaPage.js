import React from 'react'
import "../css/mangapage.css";
import { FaHome } from 'react-icons/fa';
import { AiOutlineMenu, AiTwotoneSetting, AiFillProfile } from 'react-icons/ai';
import { ImFire } from 'react-icons/im';
import { MdAccountCircle, MdFavorite } from 'react-icons/md'
import Cont_Read from "./Cont_Read";
import { useState, useEffect } from 'react';
import MangaList from "../utility/MangaList";
import MangaCover from '../assets/MangaCover.jpeg'
const MangaPage = () => {
 const [isMenuExpanded, setIsMenuExpanded] = useState(false);
 const [isAccountExpanded, setIsAccountExpanded] = useState(false);


 const handleClick = (event) => {
   console.log('Button clicked!', event);
 }


 const handleMenuClick = () => {
   setIsMenuExpanded(!isMenuExpanded);
 };


 const handleAccountClick = () => {
   setIsAccountExpanded(!isAccountExpanded);
 };
 return (
   <div className="grid-container">
     <div className="item1">
       Header</div>
     <div className="item2">
       <div className="menu">
         <button onClick={handleMenuClick} className="MenuButton">
           <AiOutlineMenu style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px' }} /> Menu
         </button>
         {isMenuExpanded && (
           <div className="submenu1">
             <button className="HomeButton"><FaHome style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px' }} /> Home</button>
             <button className="MostPopularButton"> <ImFire style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px' }} />Most Popular</button>
           </div>
         )}
         <button onClick={handleAccountClick} className="AccountButton">
           <MdAccountCircle style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px' }} />
           Account
         </button>
         {isAccountExpanded && (
           <div className="submenu2">
             <button className="ProfileButton">
               <AiFillProfile style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px' }} />
               Profile</button>
             <button className="MyFavoriteListButton">
               <MdFavorite style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px' }} />
               My Favorite List</button>
             <button className="SettingButton">
               <AiTwotoneSetting style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px' }} />
               Settings</button>
           </div>
         )}
       </div>
     </div>
     <div className="item3">
       <div className="column">
         <div style={{ display: 'flex' }}>
           <img src={MangaCover} height={300} width={200} className="left-image" />
           <div style={{ marginLeft: '20px' }}>
             <h3>Title</h3>
             <p style={{textAlign:"left"}}>Some description text goes here.</p>
             <p style={{textAlign:"left"}}>Author</p>
           </div>
         </div>
         <button className="ReadMangaButton" onClick={handleClick}>Read It!</button>
       </div>
     </div>
   </div>
 );


}


export default MangaPage
