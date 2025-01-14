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

  //for dropdown on menu
  const handleMenuClick = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  //for dropdown on account
  const handleAccountClick = () => {
    setIsAccountExpanded(!isAccountExpanded);
  };

  //for the music player under the dropdown links
  //users can shuffle between the songs in their current playlist
  //uses accompanying youtube links to play the songs 
  const adjustCurrentSong = (index) => {
    if (songList) {
      setSongTitle(songList[index].name);
      setUrl(`https://www.youtube.com/watch?v=${songList[index].videoID}`);
    }
  };

  //assumption: user has already created a playlist(s)
  //users are then able to select their preferred playlist and play 
  //uses song names and a modified youtube url to play songs
  const selectPlaylist = (event) => {
    setPlaylistName(event.target.value);
    if (songList) {
      for (let i = 0; i < playlists.length; i++) {
        if (event.target.value == playlists[i].name) {
          setSongList(playlists[i].songs);
          setSongTitle(playlists[i].songs[0].name);
          setUrl(
            `https://www.youtube.com/watch?v=${playlists[i].songs[0].videoID}`
          );
        }
      }
    } else {
      alert("Playlist is empty, please add a song!");
    }
  };

  //gets each specific user's created playlist
  const setUpMusicPlayer = () => {
    const resp = fetch(`/mangadb/getAllPlaylists`, {
      method: "GET",
    }).then(async (res) => {
      const data = await res.json();
      //user specific playlists
      setPlaylists(data.playlists);
      for (let i = 0; i < playlists?.length; i++) {
        if (playlists[i].name === currPlaylistName) {
          setSongList(playlists[i].songs);
        }
      }
      //for switching between songs
      adjustCurrentSong(currentIndex);
    });
  };

  useEffect(() => {
    //gets each specific user's created playlist
    setUpMusicPlayer();
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
