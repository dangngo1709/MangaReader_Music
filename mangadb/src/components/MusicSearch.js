import React, { useState, useEffect, useRef } from "react";
import "../css/musicplayer.css";
import axios from "axios";
import SongClass from "../utility/Song.js";
import { ImSearch } from "react-icons/im";
import MusicPlayer from "./MusicPlayer";
import { MdOutlineAddCircleOutline } from "react-icons/md";

const MusicSearch = () => {
  const [url, setUrl] = useState("");
  const [term, setTerm] = useState("Coldplay");
  const [songList, setSongList] = useState(null);
  const [songID, setSongID] = useState(null);
  const [searchSubmit, setSearchSubmit] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [playlists, setPlaylists] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  let api;

  const handleAddSongToPlaylist = async () => {
    if (songTitle && playlist) {
      const songObj = new SongClass();
      songObj.name = songTitle;
      songObj.videoID = songID;
      const playlistName = playlist;
      const resp = await fetch(`/mangadb/addNewSong`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          songObj,
          playlistName,
        }),
      });
      const data = await resp.json();
      if (data.status === "error") {
        alert(
          `${songTitle} already exists in playlist[${playlist}] and will not be added!`
        );
      } else {
        alert(`${songTitle} was added to Playlist[${playlist}]`);
      }
    } else {
      alert("Please choose a song and a playlist!");
    }
  };
  const fetchAPI = async () => {
    const resp = await axios({
      method: "GET",
      url: `http://localhost:5001/mangadb/apikey`,
    });
    return resp.data.key;
  };
  const searchPlaylist = async (api, term) => {
    const resp = await axios({
      method: "GET",
      url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${term}&type=playlist&key=${api}`,
    });
    return resp;
  };
  const searchSongs = async (api, id) => {
    const resp = await axios({
      method: "GET",
      url: `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&&playlistId=${id}&key=${api}`,
    });
    return resp;
  };

  useEffect(() => {
    const resp = fetch(`/mangadb/getAllPlaylists`, {
      method: "GET",
    }).then(async (res) => {
      const data = await res.json();
      setPlaylists(data.playlists);
    });
    if (searchSubmit == true) {
      const songList = [];
      fetchAPI().then((res) => {
        api = res;
        searchPlaylist(api, term).then((res) => {
          res.data.items.map((item) => {
            searchSongs(api, item.id.playlistId).then((res) => {
              res.data.items.map((item) => {
                let song = new SongClass();
                song.videoID = item.snippet.resourceId.videoId;
                song.name = item.snippet.title;
                songList.push(song);
              });
              setSongList(songList);
              setSearchSubmit(false);
            });
          });
        });
      });
    }
  }, [searchSubmit]);

  const handleSearch = (event) => {
    setTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    setSearchSubmit(true);
  };

  const handleSongClick = (index) => {
    setSongTitle(songList[index].name);
    setSongID(songList[index].videoID);
    setUrl(`https://www.youtube.com/watch?v=${songList[index].videoID}`);
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <input
        type="text"
        id="musicSearch"
        value={term}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />
      <ImSearch
        onClick={handleSearchSubmit}
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          marginRight: "10px",
          color: "#10a7c2",
          padding: "5px",
          marginTop: "10px",
        }}
      />
      <div className="song-container">
        {songList?.map((song, index) => (
          <div
            className="song-block"
            key={index}
            onClick={() => handleSongClick(index)}
          >
            {song.name}
          </div>
        ))}
      </div>
      <MusicPlayer songTitle={songTitle} url={url} />
      <div className="music-player-container">
        <MdOutlineAddCircleOutline
          id="addSongFromPlaylist"
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "10px",
            color: isHovered ? "#10a7c2" : "white",
          }}
          onClick={handleAddSongToPlaylist}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <select onChange={(e) => setPlaylist(e.target.value)}>
          <option selected>Select A Playlist to Add</option>
          {playlists?.map((playlist, index) => (
            <option key={index}>{playlist.name}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default MusicSearch;