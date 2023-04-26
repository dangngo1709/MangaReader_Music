import React from 'react'
import "../css/mangapage.css";
import { useState, useEffect, useRef } from 'react';
import Menu from './Menu';
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const MangaPage = ({manga}) => {
 const [isMenuExpanded, setIsMenuExpanded] = useState(false);
 const [isAccountExpanded, setIsAccountExpanded] = useState(false);
 const [coverArt, setcoverArt] = useState("");
 const [scanGroups, setGroup] = useState(null);
 const selectRef = useRef(null);
 let mangaObj = JSON.parse(localStorage.getItem('manga'));
 const base_url = "https://api.mangadex.org";
 const img_url = "https://uploads.mangadex.org";
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
async function generateChapterImgs(chapter){
  const chapter_imgs = [];
  const chID = chapter.chapter_id;
  const resp = await axios({
      method: "GET",
      url: `${base_url}/at-home/server/${chID}`
  })
  const chapterHash = await resp.data.chapter.hash;
  const dataSaver = await resp.data.chapter.dataSaver;
  for(let j = 0; j < dataSaver.length; j++){
      const fileName = dataSaver[j];
      const link = `${img_url}/data-saver/${chapterHash}/${fileName}`;
      chapter_imgs.push(link);
  }
 return chapter_imgs; 
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
      chapterImgs = await generateChapterImgs(chList[i]);
      done = true;
    }
  }
  localStorage.setItem('sortedChList', JSON.stringify(chapList));
  localStorage.setItem('chapterImgs', JSON.stringify(chapterImgs));
  navigate("/chapterpage");
}
function createScanGroups(){
  let scanGroups = ['Mangadex']
  for(let i = 0; i < mangaObj.chapter_list.length; i++){
    if(mangaObj.chapter_list[i].scanlation_group){
      let group = mangaObj.chapter_list[i].scanlation_group
      if(group.length > 0 && scanGroups.includes(group) == false){
        scanGroups.push(group);
      }
    }
  }
  return scanGroups;
}
 useEffect( () => {
  localStorage.setItem("groupList", JSON.stringify(createScanGroups()));
  setGroup(JSON.parse(localStorage.getItem("groupList")));
  setTimeout( () => {
  },200)
  let chList = mangaObj.chapter_list;
  sortedChList = sortData(chList);
  setChList(sortedChList);
  setcoverArt(mangaObj.coverArt)
 },[])

 const handleFirstPage = async(event) => {
  event.preventDefault()
  localStorage.setItem('select_index', 0);
  let chapList = [];
  let chapterImgs;
  let done = false;
  for(let i = 0; i < chList.length; i++){
    chapList.push(chList[i].chapter_num);
  }
  chapterImgs = await generateChapterImgs(chList[0]);
  localStorage.setItem('sortedChList', JSON.stringify(chapList));
  localStorage.setItem('chapterImgs', JSON.stringify(chapterImgs));
  navigate("/chapterpage");
 }
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
             <p  style = {{textAlign:"left", fontSize:"25px", color: 'black'}}>
              <span style = {{fontWeight: "bold"}}>Scan Groups: </span>
                {scanGroups?.map ( (group,index) => (<span key={index}> {group},</span>))}
             </p>
         </div> 
       </div>
       <div style={{display: 'flex', justifyContent: 'left', marginLeft:"28px"}}>       
        <label>
            <select name="Sort Order" id="orderSelect" onChange={handleChapterClick} ref={selectRef}>
            {chList.map((chapter,index)=> (<option key={index} value={chapter.chapter_num}>Chapter {chapter.chapter_num}</option> ))}
            </select>
        </label>
        <button id="firstPage" onClick={handleFirstPage}> First Page </button>
      </div>
     </div>
   </div>
 );


}
export default MangaPage


