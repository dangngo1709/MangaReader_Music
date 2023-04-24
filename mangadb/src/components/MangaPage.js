import React from 'react'
import "../css/mangapage.css";
import { useState, useEffect, useRef } from 'react';
import Menu from './Menu';
import { Navigate, useNavigate } from "react-router-dom";
//import Manga from '../utility/Manga';

const MangaPage = ({manga}) => {
 const [isMenuExpanded, setIsMenuExpanded] = useState(false);
 const [isAccountExpanded, setIsAccountExpanded] = useState(false);
 const [coverArt, setcoverArt] = useState("");
 const selectRef = useRef(null);
 let mangaObj = JSON.parse(localStorage.getItem('manga'));
 const navigate = useNavigate();
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
const handleChapterClick = async (event) => {
  event.preventDefault()
  localStorage.setItem('select_index', selectRef.current.selectedIndex);
  let chapList = [];
  let chapterImgs;
  let done = false;
  for(let i = 0; i < chList.length; i++){
    chapList.push(chList[i].chapter_num);
    if(chList[i].chapter_num == event.target.value && !done){
      chapterImgs = await manga.generateChapterImgs(chList[i]);
      done = true;
    }
  }
  localStorage.setItem('sortedChList', JSON.stringify(chapList));
  localStorage.setItem('chapterImgs', JSON.stringify(chapterImgs));
  navigate("/chapterpage");
}
 useEffect( () => {
  let chList = manga.chapter_list;
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
     <div className="item1" id="item_1">
       Header</div>
     <div className="item2" id="item_2">
        <Menu/>
     </div>
     <div className="item3" id="item_3">
       <div className="column">
       <img src={coverArt} height={350} width={200} className="left-image" />

         <div style={{ display: 'flex', flexDirection: "column",}}>
           
            <p style={{textAlign:"left", fontSize: "30px", color: "purple"}}>{mangaObj.title}</p>
             <div className = "description"><span style = {{fontWeight: "bold"}}>Description:</span> {mangaObj.description} </div>
             <p style={{textAlign:"left", fontSize: "25px", color: 'black'}}><span style = {{fontWeight: "bold"}}>Author:</span> {mangaObj.author}</p>
             <p style={{textAlign:"left", fontSize: "25px", color: 'black'}}><span style = {{fontWeight: "bold"}}>Artist:</span> {mangaObj.artist}</p>
             <p  style = {{textAlign:"left", fontSize:"25px", color: 'black'}}><span style = {{fontWeight: "bold"}}>Genre:</span> {mangaObj.genreList.map ( (genre,index) => (<span key = {index}> {genre},</span>))}</p>  

         </div> 
       </div>
       <div style={{textAlign:"left", marginLeft:"17px"}}>       
        <label>
            <select name="Sort Order" id="orderSelect" onChange={handleChapterClick} ref={selectRef}>
            {chList.map((chapter,index)=> (<option key={index} value={chapter.chapter_num}>Chapter {chapter.chapter_num}</option> ))}
            </select>
          </label>
      </div>
     </div>
   </div>
 );


}
export default MangaPage


