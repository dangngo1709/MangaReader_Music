import "../css/chapterpage.css";
import React, { useState, useEffect, useRef } from "react";
import Menu from "./Menu";
import { Navigate, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import axios from "axios";
import Header from "./Header";

const ChapterPage = ({ manga, setManga }) => {
  const [chImgs, setChImgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("Vertical");
  const [pageIndex, setPage] = useState(0);
  const navigate = useNavigate();
  const selectRef = useRef(null);
  const chapNavbarRef = useRef(null);
  let chList = JSON.parse(localStorage.getItem("sortedChList"));
  const base_url = "https://api.mangadex.org";
  const img_url = "https://uploads.mangadex.org";
  function sortData(data) {
    //bubble sort to sift through data
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

  //for displaying selected chapter's images based on user selection
  useEffect(() => {
    selectRef.current.selectedIndex = localStorage.getItem("select_index");
    setChImgs(JSON.parse(localStorage.getItem("chapterImgs")));
  }, []);
  
  //for the requested manga, generate the corresponding 
  //images based on which chapter was chosen
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

  //for going back to the previous manga chapter 
  const handlePrev = async (event) => {
    let mangaObj = JSON.parse(localStorage.getItem("manga"));
    event.preventDefault();
    if (selectRef.current.selectedIndex - 1 > 0) {
      let chapterImgs;
      selectRef.current.selectedIndex =
        localStorage.getItem("select_index") - 1;
      localStorage.setItem("select_index", selectRef.current.selectedIndex);
      let sortChapList = sortData(mangaObj.chapter_list);
      chapterImgs = await generateChapterImgs(
        sortChapList[selectRef.current.selectedIndex]
      );
      setChImgs(chapterImgs);
      setLoading(true);
      window.scrollTo(0, 0);
      setTimeout(() => {
        setLoading(false);
        setPage(0);
      }, 700);
    }
  };

  //for going to the next manga chapter 
  const handleNext = async (event) => {
    let mangaObj = JSON.parse(localStorage.getItem("manga"));
    event.preventDefault();
    if (selectRef.current.selectedIndex + 1 < mangaObj.chapter_list.length) {
      let chapterImgs;
      selectRef.current.selectedIndex =
        Number(localStorage.getItem("select_index")) + 1;
      localStorage.setItem("select_index", selectRef.current.selectedIndex);
      let sortChapList = sortData(mangaObj.chapter_list);
      chapterImgs = await generateChapterImgs(
        sortChapList[selectRef.current.selectedIndex]
      );
      setChImgs(chapterImgs);
      setLoading(true);
      window.scrollTo(0, 0);
      setTimeout(() => {
        setLoading(false);
        setPage(0);
      }, 700);
    }
  };

  //to display the selected manga chapter's images
  const handleChapterClick = async (event) => {
    event.preventDefault();
    let mangaObj = JSON.parse(localStorage.getItem("manga"));
    let chapterImgs;
    localStorage.setItem("select_index", selectRef.current.selectedIndex);
    let sortChapList = sortData(mangaObj.chapter_list);
    chapterImgs = await generateChapterImgs(
      sortChapList[selectRef.current.selectedIndex]
    );
    setChImgs(chapterImgs);
    setLoading(true);
    localStorage.setItem("chapterImgs", JSON.stringify(chapterImgs));
    setChImgs(JSON.parse(localStorage.getItem("chapterImgs")));
    setTimeout(() => {
      setLoading(false);
      setPage(0);
    }, 700);
  };

  //for displaying the manga pages horizontally or vertically
  const handleView = (event) => {
    setView(event.target.value);
  };

  //for going to the next manga chapter page
  const handleNextPage = (event) => {
    if (pageIndex < chImgs.length - 1) {
      const page = pageIndex + 1;
      setPage(page);
      window.scrollTo(0, 0);
    }
  };
  //for going to the next manga chapter page
  const handlePrevPage = (event) => {
    if (pageIndex > 0) {
      const page = pageIndex - 1;
      setPage(page);
      window.scrollTo(0, 0);
    }
  };
  return (
    <div className="grid-container">
      <div className="item1" id="item_1">
        <Header setManga={setManga} />
      </div>
      <div className="item2" id="item_2">
        <Menu />
      </div>
      <div className="item3" id="item_3">
        <div className="chapter-container">
          <form>
            <label>
              <input
                type="radio"
                value="Vertical"
                checked={view === "Vertical"}
                onChange={handleView}
              />
              <span style={{ fontSize: "20px", marginRight: "10px" }}>
                Vertical View
              </span>
            </label>
            <label>
              <input
                type="radio"
                value="Horizontal"
                checked={view === "Horizontal"}
                onChange={handleView}
              />
              <span style={{ fontSize: "20px" }}>Horizontal View</span>
            </label>
          </form>
          <div className="chapter-navbar" ref={chapNavbarRef}>
            <button id="prev" onClick={handlePrev}>
              {" "}
              Prev Chapter
            </button>
            <select
              name="Sort Order"
              id="chap-sorter"
              onChange={handleChapterClick}
              ref={selectRef}
            >
              {chList.map((chapter_num, index) => (
                <option key={index} value={chapter_num}>
                  Chapter {chapter_num}
                </option>
              ))}
            </select>
            <button id="prev" onClick={handleNext}>
              {" "}
              Next Chapter
            </button>
          </div>
          {loading ? (
            <>
              <h2>Loading</h2>
            </>
          ) : (
            <div className="chapter-display">
              {view == "Vertical" ? (
                chImgs.map((url, index) => (
                  <span>
                    <img key={index} id="chapter-img" src={url} alt="img" />
                  </span>
                ))
              ) : (
                <>
                  <img
                    id="chapter-img-hori"
                    src={chImgs[pageIndex]}
                    alt="img"
                  />
                  <div className="page-tools">
                    <button
                      onClick={handlePrevPage}
                      style={{ backgroundColor: "rgb(32,32,32)" }}
                    >
                      <AiOutlineArrowLeft
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                          marginRight: "10px",
                          color: "whitesmoke",
                        }}
                      />
                    </button>
                    {pageIndex}/{chImgs.length - 1}
                    <button
                      onClick={handleNextPage}
                      style={{
                        backgroundColor: "rgb(32,32,32)",
                        marginLeft: "6px",
                      }}
                    >
                      <AiOutlineArrowRight
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                          marginRight: "10px",
                          color: "whitesmoke",
                        }}
                      />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          <div className="chapter-navbar">
            <button id="prev" onClick={handlePrev}>
              {" "}
              Prev Chapter
            </button>
            <button id="prev" onClick={handleNext}>
              {" "}
              Next Chapter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
