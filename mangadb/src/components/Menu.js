import { FaHome } from "react-icons/fa";
import { AiOutlineMenu, AiTwotoneSetting, AiFillProfile } from "react-icons/ai";
import { ImFire, ImMusic } from "react-icons/im";
import { MdAccountCircle, MdFavorite } from "react-icons/md";
import React, { useState, useEffect } from "react";
import MusicPlayer from "./MusicPlayer";

const Menu = () => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isAccountExpanded, setIsAccountExpanded] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [currentIndex, setIndex] = useState(0);
  const [url, setUrl] = useState("");
  const [playlists, setPlaylists] = useState(null);
  const [currPlaylistName, setPlaylistName] = useState(null);
  const [songList, setSongList] = useState(null);

  const handleMenuClick = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  const handleAccountClick = () => {
    setIsAccountExpanded(!isAccountExpanded);
  };

  const selectPlaylist = (event) => {
    setPlaylistName(event.target.value);
  };

  const adjustCurrentSong = (index) => {
    if (songList?.length > 0) {
      setSongTitle(songList[index].name);
      setUrl(`https://www.youtube.com/watch?v=${songList[index].videoID}`);
    } else {
      setSongTitle("");
      setUrl("");
    }
  };

  useEffect(() => {
    const resp = fetch(`/mangadb/getAllPlaylists`, {
      method: "GET",
    }).then(async (res) => {
      const data = await res.json();
      setPlaylists(data.playlists);
      for (let i = 0; i < playlists.length; i++) {
        if (playlists[i].name === currPlaylistName) {
          setSongList(playlists[i].songs);
        }
      }
      adjustCurrentSong(currentIndex);
    });
  }, [selectPlaylist, currentIndex]);
  return (
    <div className="menu">
      <button onClick={handleMenuClick} className="MenuButton">
        <AiOutlineMenu
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "10px",
            color: "whitesmoke",
          }}
        />{" "}
        <span style={{ color: "white", letterSpacing: "0.5px" }}>Menu</span>
      </button>
      {isMenuExpanded && (
        <div className="submenu1">
          <a href="/homepage">
            <button className="HomeButton">
              <FaHome
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: "10px",
                  color: "whitesmoke",
                }}
              />{" "}
              <span style={{ color: "white", letterSpacing: "0.5px" }}>
                Home
              </span>
            </button>
          </a>
        </div>
      )}
      <button onClick={handleAccountClick} className="AccountButton">
        <MdAccountCircle
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "10px",
            color: "whitesmoke",
          }}
        />
        <span style={{ color: "white", letterSpacing: "0.5px" }}>Account</span>
      </button>
      {isAccountExpanded && (
        <div className="submenu2">
          <a href="/profilepage">
            <button className="ProfileButton">
              <AiFillProfile
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: "10px",
                  color: "whitesmoke",
                }}
              />
              <span style={{ color: "white", letterSpacing: "0.5px" }}>
                Profile
              </span>
            </button>
          </a>
          <a href="/FavoritesListPage">
          <button className="MyFavoriteListButton">
            <MdFavorite
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                marginRight: "10px",
                color: "whitesmoke",
              }}
            />
            <span style={{ color: "white", letterSpacing: "0.5px" }}>
              My Favorite List
            </span>
          </button>
          </a>
          <a href="/musicplaylist">
            <button className="ProfileButton">
              <ImMusic
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: "10px",
                  color: "whitesmoke",
                }}
              />
              <span style={{ color: "white", letterSpacing: "0.5px" }}>
                Music Playlist
              </span>
            </button>
          </a>
        </div>
      )}
      <div style={{ marginTop: "20px" }}>
        <MusicPlayer
          songTitle={songTitle}
          url={url}
          currentIndex={currentIndex}
          setIndex={setIndex}
          songList={songList}
        />{" "}
        <br></br>
        <select onChange={selectPlaylist}>
          <option selected>Select A Playlist</option>
          {playlists?.map((playlist, index) => (
            <option key={index}> {playlist.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Menu;
