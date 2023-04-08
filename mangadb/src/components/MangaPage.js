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
import Menu from './Menu';
const MangaPage = () => {
 const [isMenuExpanded, setIsMenuExpanded] = useState(false);
 const [isAccountExpanded, setIsAccountExpanded] = useState(false);
 const [chList, setChList] = useState([]);
 function sortData(data) {
  //bubble sort
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data.length - i - 1; j++) {
      if (Number(data[j].chapter_num) > Number(data[j + 1].chapter_num)) {
        var temp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = temp;
      }
    }
  }
  return data;
}
 useEffect( () => {
  let mangaObj= JSON.parse(localStorage.getItem('manga'));
  let chList = mangaObj.chapter_list;
  let sortedChList = sortData(chList);
  setChList(sortedChList);
 }, [])
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
        <Menu/>
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