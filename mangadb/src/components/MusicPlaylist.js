import React, { useState, useEffect, useRef } from "react";
import Menu from "./Menu";
import "../css/musicplaylist.css";
import MusicSearch from "./MusicSearch";
import MusicPlaylistPage from "./MusicPlaylistPage";
import Header from "./Header";
const MusicPlaylist = ({ setManga }) => {
  const searchPageRef = useRef();
  const playlistPageRef = useRef();
  const [isSearchPage, setIsSearchPage] = useState(false);

  const handlePlaylistPage = () => {
    searchPageRef.current.style.color = "white";
    playlistPageRef.current.style.color = "#10a7c2";
    setIsSearchPage(false);
  };
  const handleSearchPage = () => {
    searchPageRef.current.style.color = "#10a7c2";
    playlistPageRef.current.style.color = "white";
    setIsSearchPage(true);
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
        <div  className="musicplaypage">
          {isSearchPage ? <MusicSearch /> : <MusicPlaylistPage />}
          <br />
          <div className="music-player-container" style={{}}>
            <span
              style={{
                marginRight: "10px",
                color: "white",
                userSelect: "none",
              }}
              ref={searchPageRef}
              onClick={handleSearchPage}
            >
              Search Music
            </span>
            <span style={{ marginRight: "10px" }}>| </span>
            <span
              onClick={handlePlaylistPage}
              style={{ userSelect: "none", color: "#10a7c2" }}
              ref={playlistPageRef}
            >
              {" "}
              Manage Playlists
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlaylist;
