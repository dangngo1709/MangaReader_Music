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
import Manga from '../utility/Manga';

const MangaPage = ({manga}) => {
 const [isMenuExpanded, setIsMenuExpanded] = useState(false);
 const [isAccountExpanded, setIsAccountExpanded] = useState(false);
 const [coverArt, setcoverArt] = useState("");
 let mangaObj = JSON.parse(localStorage.getItem('manga'));
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
let sortedChList;
const [chList, setChList] = useState([]);
const handleChapterClick = (event) => {
  event.preventDefault()
  console.log(event.target.value)
}
 useEffect( () => {
  let mangaObj= JSON.parse(localStorage.getItem('manga'));
  let chList = mangaObj.chapter_list;
  sortedChList = sortData(chList);
  setChList(sortedChList);
  setcoverArt(mangaObj.coverArt)
 },[])



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
       <img src={coverArt} height={350} width={200} className="left-image" />

         <div style={{ display: 'flex', flexDirection: "column" }}>
           
            <p style={{textAlign:"left", fontSize: "30px", color: "purple"}}>{mangaObj.title}</p>
             <p className = "description"><span style = {{fontWeight: "bold"}}>Description:</span> {mangaObj.description} </p>
             <p style={{textAlign:"left", fontSize: "25px"}}>Author: {mangaObj.author}</p>
             <p style={{textAlign:"left", fontSize: "25px"}}>Artist: {mangaObj.artist}</p>
             <p  style = {{textAlign:"left", fontSize:"25px",width:"900px"}}>Genre: {mangaObj.genreList.map ( (genre,index) => (<span key = {index}> {genre},</span>))}</p>  

         </div> 
       </div>
       <div style={{textAlign:"left", marginLeft:"17px"}}>       
        <label>
            <select name="Sort Order" id="orderSelect" onChange={handleChapterClick}>
            {chList.map((chapter,index)=> (<option value={chapter.chapter_num}>Chapter {chapter.chapter_num}</option> ))}
            </select>
          </label>
      </div>
     </div>
   </div>
 );


}
export default MangaPage


