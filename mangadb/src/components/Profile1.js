import React from 'react'
import "../css/profile.css";
import { useState, useEffect } from 'react';
import profilepicture from "../assets/profilepicture.jpeg"
import Menu from './Menu';

const Profile = () => {
  const [text, setText] = useState('');
  const [username, setUserName] = useState('');
  const base_url = 'http://localhost:5001'
  const handleTextChange = (event) => {
    setText(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = localStorage.getItem('session_id');
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
        email
      })
    });
  }
  const getAboutMe = async() => {
    const res = await fetch('/mangadb/getAboutMe', {
      method: "GET"
    })
    const data = await res.json();
    if(data.status === 'true'){
      console.log(data.aboutMe)
      setText(data.aboutMe);
    } else {
      console.log(data.status);
    }
  }
  const getUserName = async() => {
    const res = await fetch('/mangadb/getUserName', {
      method: "GET"
    })
    const data = await res.json();
    if(data.status === 'true'){
      setUserName(data.UserName)
    }else{
      console.log(data.status)
    }
  }
  const deleteAccount = async() =>{
    const res = await fetch ('/mangadb/delete',{
      method :"DELETE"
    })
    const data = await res.json();
    if(data.status === 'true'){
      alert("Successfully Deleted Account. Please Login Again");
      const resp = await fetch('/mangadb/logout', {
        method: "GET"
      }).then( () => {
        localStorage.clear();
        window.location.href = '/login';
      })
    }else{
      console.log(data.status)
    }
  }
  useEffect( () => {
    /* Make a ge request to retrieve data */
    getAboutMe();
    getUserName();
  }, [])
  return (
    <div className="grid-container">
      <div className="p1" id="p_1">
      </div>
      <div className="p2" id="p_2">
        <Menu />
      </div>
      <div className="p3" id="p_3">
        <div className="profilepic">
          <img className="pic" src={profilepicture} alt="Profile Picture" />
          </div>
          <div style={{color: 'Purple'}}className="username">{username}</div>
          <div style={{color: 'black' }}  className = "AboutMe"> {text}</div>
          
            <button onClick={deleteAccount} style={{textAlign: 'center', width: 350, alignContent: 'center', marginTop: 20}} className= "deletebutton" type="delete"> Delete Account</button>
            
        <form onSubmit={handleSubmit}>
          <div>
            
         <div style ={{ alignItems: 'left'}}>
            <textarea type="text" class="introduce-input" placeholder='Type something...' value={text} onChange={handleTextChange} />
            </div>
          <button className='savebutton' type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
