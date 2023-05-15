import React from "react";
import "../css/mangapage.css";
import { useState, useEffect, useRef } from "react";
import Menu from "./Menu";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Comment from "./Comment";
import Header from "./Header";
const MangaPage = ({ manga, setManga }) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isAccountExpanded, setIsAccountExpanded] = useState(false);
  const [coverArt, setcoverArt] = useState("");
  const [scanGroups, setGroup] = useState(null);
  const selectRef = useRef(null);

  //for each manga object block 
  let mangaObj = JSON.parse(localStorage.getItem("manga"));
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

  //for displaying manga chapters and each chapters' images
  async function generateChapterImgs(chapter) {
    const chapter_imgs = [];
    const chID = chapter.chapter_id;
    const resp = await axios({
      method: "GET",
      url: `${base_url}/at-home/server/${chID}`,
    });
    const chapterHash = await resp.data.chapter.hash;
    const dataSaver = await resp.data.chapter.dataSaver;
    for (let j = 0; j < dataSaver.length; j++) {
      const fileName = dataSaver[j];
      const link = `${img_url}/data-saver/${chapterHash}/${fileName}`;
      chapter_imgs.push(link);
    }
    return chapter_imgs;
  }
  let sortedChList;
  const [chList, setChList] = useState([]);

  //upon click, take the selected chapter from the list and 
  //display the corresponding manga chapter images in the chapter page
  const handleChapterClick = async (event) => {
    event.preventDefault();
    localStorage.setItem("select_index", selectRef.current.selectedIndex);
    let chapList = [];
    let chapterImgs;
    let done = false;
    for (let i = 0; i < chList.length; i++) {
      chapList.push(chList[i].chapter_num);
      if (chList[i].chapter_num == event.target.value && !done) {
        chapterImgs = await generateChapterImgs(chList[i]);
        done = true;
      }
    }
    localStorage.setItem("sortedChList", JSON.stringify(chapList));
    localStorage.setItem("chapterImgs", JSON.stringify(chapterImgs));
    navigate("/chapterpage");
  };

  //required function in accordance to MangaDex API use requirements
  //shows the scan groups for each specific manga 
  function createScanGroups() {
    let scanGroups = ["Mangadex"];
    for (let i = 0; i < mangaObj.chapter_list.length; i++) {
      if (mangaObj.chapter_list[i].scanlation_group) {
        let group = mangaObj.chapter_list[i].scanlation_group;
        if (group.length > 0 && scanGroups.includes(group) == false) {
          scanGroups.push(group);
        }
      }
    }
    return scanGroups;
  }

  useEffect(() => {
    localStorage.setItem("groupList", JSON.stringify(createScanGroups()));
    //for getting the manga's scantalation group
    setGroup(JSON.parse(localStorage.getItem("groupList")));
    //for ensuring renders work properly
    setTimeout(() => {}, 200);
    let chList = mangaObj.chapter_list;
    sortedChList = sortData(chList);
    //new sorted chapter list based on selected manga
    setChList(sortedChList);
    setcoverArt(mangaObj.coverArt);
  }, []);

  //to start reading the manga's first chapter
  const handleFirstPage = async (event) => {
    event.preventDefault();
    localStorage.setItem("select_index", 0);
    let chapList = [];
    let chapterImgs;
    let done = false;
    for (let i = 0; i < chList.length; i++) {
      chapList.push(chList[i].chapter_num);
    }
    chapterImgs = await generateChapterImgs(chList[0]);
    localStorage.setItem("sortedChList", JSON.stringify(chapList));
    localStorage.setItem("chapterImgs", JSON.stringify(chapterImgs));
    navigate("/chapterpage");
  };

  //adding to favorites function
  //adds the current manga object into the favorite list 
  //this list is located in the favorite list component 
  const handleFaves = async () => {
    const res = await fetch("/mangadb/addMangaToFavoriteList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mangaObj,
      }),
    });
    const data = await res.json();
    if (data.status === "success") {
      alert(manga.title + " has been added to the favorites list!");
    } else {
      alert("Cannot add duplicate manga to favorite list!");
    }
  };


  return (
    <div className="grid-container">
      <div className="item1" id="item_1">
        <div id="gradient-gray"></div>
      </div>
      <div className="item2" id="item_2">
        <Menu />
      </div>
      <div className="item3" id="item_3">
        <div className="column">
          <img src={coverArt} height={350} width={200} className="left-image" />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ textAlign: "left", fontSize: "30px", color: "wheat" }}>
              {mangaObj.title}
            </p>
            <div className="description">
              <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
              {mangaObj.description}{" "}
            </div>
            <p style={{ textAlign: "left", fontSize: "25px", color: "white" }}>
              <span style={{ fontWeight: "bold" }}>Author:</span>{" "}
              {mangaObj.author}
            </p>
            <p style={{ textAlign: "left", fontSize: "25px", color: "white" }}>
              <span style={{ fontWeight: "bold" }}>Artist:</span>{" "}
              {mangaObj.artist}
            </p>
            <p style={{ textAlign: "left", fontSize: "25px", color: "white" }}>
              <span style={{ fontWeight: "bold" }}>Genre:</span>{" "}
              {mangaObj.genreList.map((genre, index) => (
                <span key={index}> {genre},</span>
              ))}
            </p>
            <p style={{ textAlign: "left", fontSize: "25px", color: "white" }}>
              <span style={{ fontWeight: "bold", color: "white" }}>
                Scan Groups:{" "}
              </span>
              {scanGroups?.map((group, index) => (
                <span key={index}> {group},</span>
              ))}
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            backgroundImage: "linear-gradient(to right, #16222a, #3a6073)",
          }}
        >
          <label>
            <select
              style={{ marginLeft: "40px" }}
              name="Sort Order"
              id="orderSelect"
              onChange={handleChapterClick}
              ref={selectRef}
            >
              {chList.map((chapter, index) => (
                <option key={index} value={chapter.chapter_num}>
                  Chapter {chapter.chapter_num}
                </option>
              ))}
            </select>
          </label>
          <button id="firstPage" onClick={handleFirstPage}>
            {" "}
            First Page{" "}
          </button>
          <button id="addToFavesButton" onClick={handleFaves}>
            {" "}
            Add To Favorites
          </button>
        </div>
        <div
          style={{
            backgroundImage: "linear-gradient(to right, #16222a, #3a6073)",
          }}
        >
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default MangaPage;
