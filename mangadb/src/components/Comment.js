import React from "react";
import { useState, useEffect, useRef } from "react";
import "../css/comment.css";
import commentObj from "../utility/CommentClass";
import { v4 as uuidv4 } from "uuid";
const Comment = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(null);
  const [name, setName] = useState("");
  const submitButtonRef = useRef(null);

  const onDeleteHandler = async (id) => {
    const mangaObj = JSON.parse(localStorage.getItem("manga"));
    const mangaPageId = mangaObj.id;
    const resp = await fetch(`/mangadb/deleteComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        mangaPageId,
      }),
    });
    const data = await resp.json();
    console.log(data);
    fetchMangaPage();
  };
  const fetchUsername = async () => {
    const mangaObj = JSON.parse(localStorage.getItem("manga"));
    const id = mangaObj.id;
    const resp = await fetch(`/mangadb/getUser`, {
      method: "GET",
    });
    const data = await resp.json();
    setName(data.user.name);
    console.log(data.user.name);
    const resp1 = await fetch(`mangadb/getMangaPage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const mangaPage = await resp1.json();
    console.log(mangaPage.mangapage.comments);
    setComments(mangaPage.mangapage.comments);
  };
  const fetchMangaPage = async () => {
    const mangaObj = JSON.parse(localStorage.getItem("manga"));
    const id = mangaObj.id;
    const resp1 = await fetch(`mangadb/getMangaPage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const mangaPage = await resp1.json();
    setComments(mangaPage.mangapage.comments); // Update the comments state with the fetched comments
  };

  const createMangaPageInBackend = async () => {
    const mangaObj = JSON.parse(localStorage.getItem("manga"));
    const id = mangaObj.id;
    const resp = await fetch(`mangadb/createMangaPage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
  };

  const onClickHandler = async () => {
    const cid = uuidv4();
    const commentObject = new commentObj();
    commentObject.username = name;
    commentObject.comment = comment;
    commentObject.id = cid;
    const mangaObj = JSON.parse(localStorage.getItem("manga"));
    const id = mangaObj.id;
    const resp = await fetch(`/mangadb/addComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentObject,
        id,
      }),
    });
    const data = await resp.json();
    console.log(data);
    setComment("");
    fetchMangaPage();
  };
  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      submitButtonRef.current.click();
    }
  };
  useEffect(() => {
    // fetch the user from database, make sure u log in before
    fetchUsername();
    createMangaPageInBackend();
    fetchMangaPage(); // Fetch the initial comments

    const interval = setInterval(fetchMangaPage, 5000); // Fetch the updated comments every 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ marginLeft: 40 }} classname="comment-area">
      <div className="comment-flexbox">
        <h3 className="comment-text">Comment</h3>
        <textarea
          value={comment}
          onChange={onChangeHandler}
          onKeyPress={handleKeyPress}
          className="input-box"
        />
        <button
          ref={submitButtonRef}
          onClick={onClickHandler}
          className="comment-button"
        >
          Submit
        </button>
      </div>
      <div className="main-container">
        <div style={{ overflowY: "scroll" }}>
          {comments?.map((text, index) => (
            <div className="comment-container" key={index}>
              <span
                style={{ color: "blue", fontWeight: "bold", fontSize: "18px" }}
              >
                {text.username}
              </span>{" "}
              <br />
              <span style={{ marginLeft: "5px" }}>{text.comment}</span>
              {text.username === name && (
                <button onClick={() => onDeleteHandler(text.id)}>Delete</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
