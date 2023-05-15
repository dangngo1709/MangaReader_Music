import ReactPlayer from "react-player/lazy";
import "../css/musicplayer.css";
import React, { useState, useEffect, useRef } from "react";
import {
  ImPlay2,
  ImPause,
  ImVolumeHigh,
  ImPrevious,
  ImNext,
} from "react-icons/im";
const MusicPlayer = ({ songTitle, url, currentIndex, setIndex, songList }) => {
  const [fractionPlayed, setFractionPlayed] = useState(0);
  const [secondsPlayed, setSecondsPlayed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);

  //these four functions are simple music play functions
  //pause, play, change volume and then be able to see
  //a progress bar of the current song playing
  const handlePause = () => {
    setPlaying(false);
  };

  const handlePlay = () => {
    setPlaying(true);
  };
  const handleVolume = (event) => {
    setVolume(event.target.value);
  };

  const handleProgress = (e) => {
    setFractionPlayed(e.played);
    setSecondsPlayed(e.playedSeconds);
  };

  //React player doesn't automatically convert time to minutes. 
  //As such, this is to compensate for that and show song times properly
  const convertSecondsToMinutes = (seconds) => {
    let min = Math.floor(seconds / 60);
    let remainderSeconds = Math.floor(seconds % 60);
    let lessThan10Seconds = false;
    if (remainderSeconds < 10) {
      lessThan10Seconds = true;
    }
    return `${min}:${lessThan10Seconds ? 0 : ""}${remainderSeconds}`;
  };

  //simply music play functions again
  //go to the previous song before current song
  const prevSong = () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setIndex(prevIndex);
    }
  };

  //skip to the next song 
  const nextSong = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex < songList?.length) {
      setIndex(nextIndex);
    }
  };

  //move on to the next song if the current one is finished 
  const handleEndOfSong = () => {
    if (currentIndex + 1 >= songList?.length) {
      let i = 0;
      setIndex(i);
    } else {
      nextSong();
    }
  };
  return (
    <>
      <ReactPlayer
        id="music-player"
        playing={playing}
        url={url}
        volume={volume}
        onProgress={handleProgress}
        onEnded={handleEndOfSong}
        width="0px"
        height="0px"
      />
      <h5 style={{ fontWeight: "normal", marginTop: "30px" }}>{songTitle}</h5>
      <div className="music-player-container">
        <div className="time-box">0:00</div>
        <progress max={1} value={fractionPlayed} />
        <div className="time-box">{convertSecondsToMinutes(secondsPlayed)}</div>
      </div>
      <div className="music-player-container">
        {songList?.length > 0 ? (
          <ImPrevious
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginRight: "10px",
              color: "white",
            }}
            onClick={prevSong}
          />
        ) : (
          <></>
        )}
        {playing ? (
          <ImPause
            onClick={handlePause}
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginRight: "10px",
              color: "white",
            }}
          />
        ) : (
          <ImPlay2
            onClick={handlePlay}
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginRight: "10px",
              color: "white",
            }}
          />
        )}
        {songList?.length > 0 ? (
          <ImNext
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginRight: "10px",
              color: "white",
            }}
            onClick={nextSong}
          />
        ) : (
          <></>
        )}
      </div>
      <ImVolumeHigh
        onClick={handlePlay}
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          marginRight: "10px",
          color: "white",
        }}
      />
      <input
        type="range"
        id="range2"
        min={0}
        max={1}
        step="any"
        value={volume}
        onChange={handleVolume}
      />
      <span style={{ fontSize: "25px", margin: "5px" }}>
        {Math.floor(volume * 100)}%
      </span>
    </>
  );
};

export default MusicPlayer;
