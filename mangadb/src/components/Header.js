import React, { useState, useEffect, useRef } from "react";
import MangaList from "../utility/MangaList";
import { ImSearch } from "react-icons/im";
import { BiHide } from "react-icons/bi";
import { Navigate, useNavigate } from "react-router-dom";
import MangaListClass from "../utility/MangaList";
import MangaPage from "./MangaPage";
import logo from "../assets/logo.png";

const Header = ({ setManga }) => {
  const searchBoxRef = useRef();
  const navigate = useNavigate();
  const [displaySearchBox, setDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [updateSearch, setUpdate] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [loggedIn, setLoggedIn] = useState("false");
  const hide = () => {
    setHidden(!hidden);
    if (hidden === true) {
      searchBoxRef.current.style.display = "none";
    } else {
      searchBoxRef.current.style.display = "block";
    }
  };

  const fetchSessionID = async () => {
    const resp = await fetch(`/mangadb/getSessionID`, {
      method: "GET",
    });
    const data = await resp.json();
    if (data.status === "true") {
      localStorage.setItem("loggedIn", true);
      setLoggedIn(localStorage.getItem("loggedIn"));
    } else {
      localStorage.setItem("loggedIn", false);
      setLoggedIn("false");
      alert("User not logged In!");
      navigate("/login");
    }
  };

  const handleMangaClick = async (manga, event) => {
    event.preventDefault();
    const id = manga.id;
    manga.generateChapters(id);
    setTimeout(() => {
      setManga(manga);
      localStorage.setItem("manga", JSON.stringify(manga));
      navigate("/mangapage");
    }, 1000);
  };

  const onSearch = (searchTerm) => {
    setUpdate(true);
    setLoading(true);
    setTitle(searchTerm);
    searchBoxRef.current.style.height = "500px";
  };

  useEffect(() => {
    if (title?.length > 0 && updateSearch == true) {
      const list = new MangaListClass();
      const includedTags = [""];
      const excludedTags = ["Harem", "Ecchi"];
      list.setTitleSearch(title);
      let order = {};
      const filterObj = {
        includedTags: includedTags,
        excludedTags: excludedTags,
        order: order,
      };
      // Create filters above ^^
      // If you like to search just for a title, add in the setTitleSearch
      list.setFilter(filterObj).then(() => {
        list.generateMangaList().then((res) => {
          setSearchRes(res);
        });
      });
      setUpdate(false);
    }
    setTimeout(() => {
      setLoading(false);
    }, 700);
    fetchSessionID();
  }, [updateSearch, searchRes, onSearch]);

  const handleLogout = async () => {
    if (loggedIn) {
      const resp = await fetch(`/mangadb/logout`, {
        method: "GET",
      }).then(async (res) => {
        const data = await res.json();
        if (data.status === "success") {
          localStorage.setItem("loggedIn", false);
          setLoggedIn("false");
          localStorage.setItem("session_id", "");
          setTimeout(() => {
            navigate("/login");
          }, 400);
        } else {
          alert("error");
        }
      });
    }
  };

  const onChange = (event) => {
    setTitle(event.target.value);
  };
  const doNothing = () => {};

  return (
    <div class="topnav">
      <img style={{ marginLeft: "250px" }} src={logo} alt="text" />
      <div
        style={{
          marginLeft: "auto",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div class="search-container">
          <input
            style={{
              marginRight: "5px",
              width: "200px",
              height: "35px",
              fontSize: "20px",
            }}
            type="text"
            value={title}
            onChange={onChange}
            placeholder="Search.."
          ></input>
          <BiHide
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginRight: "10px",
              color: "#10a7c2",
              padding: "5px",
              marginTop: "10px",
            }}
            onClick={hide}
          />
          <ImSearch
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginRight: "10px",
              color: "#10a7c2",
              padding: "5px",
              marginTop: "10px",
              marginRight: "20px",
            }}
            onClick={() => onSearch(title)}
          />
          <div className="dropdown" ref={searchBoxRef}>
            {loading ? (
              <div>Loading</div>
            ) : displaySearchBox ? (
              <div></div>
            ) : (
              searchRes?.map((manga, index) => (
                <p
                  onClick={(e) => handleMangaClick(manga, e)}
                  key={index}
                  style={{
                    width: "200px",
                    fontSize: "13px",
                    marginRight: "auto",
                    marginLeft: "auto",
                    overflowX: "hidden",
                    userSelect: "none",
                  }}
                >
                  {manga.title}
                </p>
              ))
            )}
          </div>
        </div>
        <a
          class="active"
          id="loginButton"
          href={loggedIn === "true" ? "/login" : "/"}
        >
          {loggedIn === "true" ? "Login" : "Signup"}
        </a>
        <button onClick={handleLogout} id="logoutBtn">
          {loggedIn === "true" ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Header;
