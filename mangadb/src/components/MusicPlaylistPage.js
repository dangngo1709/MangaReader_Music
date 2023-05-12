import React, { useState, useEffect, useRef } from "react";
import "../css/musicplaylist.css";
import PlaylistClass from "../utility/Playlist";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";
import MusicPlayer from "./MusicPlayer";

const MusicPlaylistPage = () => {
  const [playlistNewName, setPlaylistNewName] = useState("");
  const [playlists, setPlaylists] = useState(null);
  const [currentName, setCurrentName] = useState("");
  const [songList, setSongList] = useState(null);
  const [songTitle, setSongTitle] = useState("");
  const [songUrl, setSongUrl] = useState("");

  const fetchPlaylists = async () => {
    const resp = fetch(`/mangadb/getAllPlaylists`, {
      method: "GET",
    }).then(async (res) => {
      const data = await res.json();
      setPlaylists(data.playlists);
      for (let i = 0; i < playlists?.length; i++) {
        if (playlists[i].name === currentName) {
          setSongList(playlists[i].songs);
        }
      }
    });
  };

  const handleAddPlaylist = async () => {
    if (playlistNewName) {
      const playlistObj = new PlaylistClass();
      playlistObj.name = playlistNewName;
      const resp = await fetch(`/mangadb/addNewPlaylist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playlistObj,
        }),
      });
      const data = await resp.json();
      if (data.status === "error") {
        alert(data.msg);
      }
      window.location.reload();
    } else {
      alert("Please Enter a playlist name!");
    }
  };
  const deletePlaylist = async (name) => {
    if (name) {
      const playlistObj = new PlaylistClass();
      playlistObj.name = name;
      const resp = await fetch(`/mangadb/deletePlaylist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playlistObj,
        }),
      });
      const data = await resp.json();
      if (data.status === "error") {
        alert(data.msg);
      } else {
        alert(`succussfully deleted playlist[${name}]`);
        window.location.reload();
      }
    } else {
      alert("Please click on the name of a playlist first");
    }
  };
  const deleteSong = async (song) => {
    const resp = await fetch(`/mangadb/deleteSong`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        song,
      }),
    });
    const data = await resp.json();
    if (data.status === "success") {
      alert(`Successfully deleted song: ${song.name}`);
      window.location.reload()
    } else {
      alert(`Failed to delete song: ${song.name}`);
    }
  };
  const handlePlaylistClick = (name) => {
    setCurrentName(name);
    for (let i = 0; i < playlists.length; i++) {
      if (playlists[i].name == name) {
        setSongList(playlists[i].songs);
      }
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);
  const fetchAPI = async () => {
    const resp = await axios({
      method: "GET",
      url: `http://localhost:5001/mangadb/apikey`,
    });
    return resp.data.key;
  };
  const clickSong = async (song) => {
    setSongTitle(song.name);
    let apikey;
    fetchAPI()
      .then((res) => {
        apikey = res;
      })
      .then(() => {
        setSongUrl(`https://www.youtube.com/watch?v=${song.videoID}`);
      });
  };
  return (
    <>
      <div className="playlist-container">
        <div
          className="i1"
          style={{
            border: "2px solid white",
          }}
        >
          <p>Music Playlist</p>
          {playlists?.map((playlist, index) => (
            <p
              key={index}
              style={{ userSelect: "none" }}
              onClick={() => handlePlaylistClick(playlist.name)}
            >
              {playlist.name}
              <RiDeleteBinLine
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  color: "white",
                  padding: "5px",
                }}
                onClick={() => deletePlaylist(playlist.name)}
              />
            </p>
          ))}
          <input
            type="text"
            value={playlistNewName}
            placeholder={"Create a Name"}
            style={{ padding: "5px", fontSize: "18px" }}
            onChange={(e) => setPlaylistNewName(e.target.value)}
          />
          <p onClick={handleAddPlaylist} id="addPlaylistBtn">
            + Add Playlist
          </p>
        </div>
        <div
          className="i2"
          style={{
            borderBottom: "2px solid white",
          }}
        >
          <div style={{ borderRight: "2px solid white" }}>
            <p
              style={{
                borderBottom: "1px solid white",
                borderTop: "2px solid white",
              }}
            >
              Current Playlist: {currentName}
            </p>
            {songList?.map((song, index) => (
              <p
                key={index}
                style={{
                  borderBottom: "1px solid white",
                  userSelect: "none",
                  borderRight: "2px solid white",
                }}
                onClick={() => clickSong(song)}
              >
                {song.name}
                <RiDeleteBinLine
                  style={{
                    display: "inline-block",
                    verticalAlign: "middle",
                    color: "white",
                    padding: "5px",
                  }}
                  onClick={() => deleteSong(song)}
                />
              </p>
            ))}
            <MusicPlayer songTitle={songTitle} url={songUrl} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlaylistPage;
