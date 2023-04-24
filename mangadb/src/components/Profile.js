import React from 'react'
import "../css/profile.css";
import { useState } from 'react';
import profilepicture from "/Users/dangngo/Desktop/project133/mangadb/src/assets/profilepicture.jpeg"
import Menu from './Menu';

const Profile = () => {
  const [text, setText] = useState('');
  const base_url = 'http://localhost:5001'
  const handleTextChange = (event) => {
    setText(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Text submitted: ' + text);
    console.log(localStorage.getItem('session_id'))
    const email = localStorage.getItem('session_id');
    // Here you can save the text to a database or perform other actions
    setText('');
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


    /* Make a get request to retrieve data */
  }
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
          <div style={{color: 'black'}}className="username">UserName1<br />
            <div style ={{fontSize: 20, marginTop: 20}}className="DateCreateAccount" >First Joined: <br />
              <div className="FListCount"> Favorite List:

              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <div className = "cpbutton-area">
              <button className='cpbutton' type="change">Change Avatar</button>
            </div>
            <div style ={{textAlign:'left', fontSize: 20, marginTop: 20, marginLeft: 185}} className="deletebutton-area">
            <button style={{textAlign: 'center',alignItems:'left', width: 200}} className= "deletebutton" type="delete"> Delete</button>
            </div>
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
