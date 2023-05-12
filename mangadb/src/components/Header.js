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
  const [username, setUsername] = useState("");
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

  const fetchUser = async () => {
    const resp = await fetch(`/mangadb/getUser`, {
      method: "GET",
    });
    const data = await resp.json();
    if (data.status === "true") {
      setUsername(data.user.name);
    }
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
      setTimeout(() => {
        setLoading(false);
      }, 1200);
      setUpdate(false);
    }
    fetchSessionID();
    fetchUser();
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
            type="text"
            value={title}
            onChange={onChange}
            placeholder="Search.."
            id="searchInputText"
          ></input>
          <BiHide id="hideBtn" onClick={hide} />
          <ImSearch id="searchIcon" onClick={() => onSearch(title)} />
          <div className="dropdown" ref={searchBoxRef}>
            {loading ? (
              <div>Loading</div>
            ) : (
              searchRes?.map((manga, index) => (
                <p onClick={(e) => handleMangaClick(manga, e)} key={index}>
                  {manga.title}
                </p>
              ))
            )}
          </div>
        </div>
        {loggedIn ? (
          <button onClick={handleLogout} id="logoutBtn">
            {loggedIn === "true" ? "Logout" : "Login"}
          </button>
        ) : (
          <a class="active" id="loginButton" href={"/login"}>
            Login
          </a>
        )}
        <h3 style={{ margin: "12px", fontSize: "30px" }}>{username}</h3>
      </div>
    </div>
  );
};

export default Header;
