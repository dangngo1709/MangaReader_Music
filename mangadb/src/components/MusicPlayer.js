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
const MusicPlayer = ({ songTitle, url }) => {
  const [fractionPlayed, setFractionPlayed] = useState(0);
  const [secondsPlayed, setSecondsPlayed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
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
  const convertSecondsToMinutes = (seconds) => {
    let min = Math.floor(seconds / 60);
    let remainderSeconds = Math.floor(seconds % 60);
    let lessThan10Seconds = false;
    if (remainderSeconds < 10) {
      lessThan10Seconds = true;
    }
    return `${min}:${lessThan10Seconds ? 0 : ""}${remainderSeconds}`;
  };
  return (
    <>
      <ReactPlayer
        id="music-player"
        playing={playing}
        url={url}
        volume={volume}
        onProgress={handleProgress}
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
        <ImPrevious
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "10px",
            color: "#10a7c2",
          }}
        />
        {playing ? (
          <ImPause
            onClick={handlePause}
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginRight: "10px",
              color: "#10a7c2",
            }}
          />
        ) : (
          <ImPlay2
            onClick={handlePlay}
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginRight: "10px",
              color: "#10a7c2",
            }}
          />
        )}
        <ImNext
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "10px",
            color: "#10a7c2",
          }}
        />
      </div>
      <ImVolumeHigh
        onClick={handlePlay}
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          marginRight: "10px",
          color: "#10a7c2",
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
