import React from "react";
import "../css/profile.css";
import { useState, useEffect } from "react";
import profilepicture from "../assets/profilepicture.jpeg";
import Menu from "./Menu";
import Header from "./Header";

const Profile = ({ setManga }) => {
  const [text, setText] = useState("");
  const [username, setUserName] = useState("");
  const base_url = "http://localhost:5001";
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = localStorage.getItem("session_id");
    // Here you can save the text to a database or perform other actions
    //setText('');
    /* make a post request*/
    const resp = await fetch(`/mangadb/profileAboutMe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        email,
      }),
    });
  };
  const getAboutMe = async () => {
    const res = await fetch("/mangadb/getAboutMe", {
      method: "GET",
    });
    const data = await res.json();
    if (data.status === "true") {
      setText(data.aboutMe);
    } else {
      alert("error");
    }
  };
  const getUserName = async () => {
    const res = await fetch("/mangadb/getUserName", {
      method: "GET",
    });
    const data = await res.json();
    if (data.status === "true") {
      setUserName(data.UserName);
    } else {
      alert("error");
    }
  };
  const deleteAccount = async () => {
    const res = await fetch("/mangadb/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });
    const data = await res.json();
    if (data.status === "true") {
      alert("Successfully Deleted Account. Please Login Again");
      const resp = await fetch("/mangadb/logout", {
        method: "GET",
      }).then(() => {
        localStorage.clear();
        window.location.href = "/login";
      });
    } else {
      alert("error");
    }
  };
  useEffect(() => {
    /* Make a ge request to retrieve data */
    getAboutMe();
    getUserName();
  }, []);
  return (
    <div className="grid-container"
      <div className="p1" id="item_1">
        <Header setManga={setManga} />
      </div>
      <div className="p2" id="item_2">
        <Menu />
      </div>
      <div className="p3" id="item_3">
        <div className="Card-Area">
          <div className="Card">
            <div className="upper-container">
              <div className="image-container">
                <img src={profilepicture} alt="" height="100px" width="100px" />
              </div>
            </div>
            <div className="lower-container">
              <h3
                style={{
                  color: "black",
                  fontWeight: "700",
                  fontSize: "3.0rem",
                }}
              >
                {username}
              </h3>
              ;
              <p
                style={{
                  color: "black",
                  flex: 1,
                  flexWrap: "wrap",
                  flexDirection: "row",
                }}
              >
                {text}
              </p>
              <button
                onClick={deleteAccount}
                style={{
                  textAlign: "center",
                  width: 350,
                  alignContent: "center",
                }}
                className="deletebutton"
                type="delete"
              >
                {" "}
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <div style={{ alignItems: "left" }}>
              <textarea
                maxLength={300}
                type="text"
                class="introduce-input"
                placeholder="Type something..."
                value={text}
                onChange={handleTextChange}
              />
            </div>
            <button className="savebutton" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
