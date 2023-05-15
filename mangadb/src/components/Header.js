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

  //hiding the search bar results
  const hide = () => {
    setHidden(!hidden);
    if (hidden === true) {
      searchBoxRef.current.style.display = "none";
    } else {
      searchBoxRef.current.style.display = "block";
    }
  };

  //depends on the user. Checks to see if a user is logged in or not
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

  //redirects to the selected manga's page 
  const handleMangaClick = async (manga, event) => {
    event.preventDefault();
    const id = manga.id;
    manga.generateChapters(id);
    setManga(manga);
    setTimeout(() => {
      setManga(manga);
      localStorage.setItem("manga", JSON.stringify(manga));
      navigate("/mangapage");
    }, 1000);
  };

  //for the search bar (upon search)
  const onSearch = (searchTerm) => {
    //updates, loads and shows the
    setUpdate(true);
    setLoading(true);
    setTitle(searchTerm);
    searchBoxRef.current.style.height = "500px";
  };


  //getting specific users
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

    //checks if search bar actually has input 
    //list created along with certain filters 
    if (title?.length > 0 && updateSearch == true) {
      const list = new MangaListClass();

      //included/excluded genres
      const includedTags = [""];
      const excludedTags = ["Harem", "Ecchi"];
      //for searching manga title
      list.setTitleSearch(title);
      let order = {};

      //for filters and changing manga order
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
      }, 1500);
      setUpdate(false);
    }
    fetchSessionID();
    fetchUser();
  }, [updateSearch, searchRes, onSearch]);

  //checks if user is logged in and promptly redirects them 
  //to the login page 
  //removes every user specific item from localstorage
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
          localStorage.removeItem("playlists");
          localStorage.removeItem("playlistName");
          localStorage.removeItem("songList");
          localStorage.removeItem("url");
          localStorage.removeItem("songTitle");
          setTimeout(() => {
            navigate("/login");
          }, 400);
        } else {
          alert("error");
        }
      });
    }
  };

  //for user input
  const onChange = (event) => {
    setTitle(event.target.value);
  };

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
