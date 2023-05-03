
import { FaHome } from 'react-icons/fa';
import {AiOutlineMenu, AiTwotoneSetting, AiFillProfile} from 'react-icons/ai';
import {ImFire, ImMusic} from 'react-icons/im';
import {MdAccountCircle, MdFavorite} from 'react-icons/md'
import React, {useState, useEffect} from 'react';

const Menu = () => {
      const [isMenuExpanded, setIsMenuExpanded] = useState(false);
      const [isAccountExpanded, setIsAccountExpanded] = useState(false);
    
      const handleMenuClick = () => {
        setIsMenuExpanded(!isMenuExpanded);
      };
    
      const handleAccountClick = () => {
        setIsAccountExpanded(!isAccountExpanded);
      };
  return (
    <div className="menu">
    <button onClick={handleMenuClick} className="MenuButton">
    <AiOutlineMenu style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px', color: 'whitesmoke' }}/> <span style={{color: 'white', letterSpacing: '0.5px'}}>Menu </span>
    </button>
    {isMenuExpanded && (
      <div className="submenu1">
        <a href="/homepage"><button className="HomeButton"><FaHome style={{ display: 'inline-block', verticalAlign:'middle', marginRight: '10px', color: 'whitesmoke'}}/> <span style={{color: 'white', letterSpacing: '0.5px'}}>Home</span></button></a>
      </div>
    )}
    <button onClick={handleAccountClick} className="AccountButton">
    <MdAccountCircle style={{ display: 'inline-block', verticalAlign:'middle', marginRight: '10px', color: 'whitesmoke'}}/>
    <span style={{color: 'white', letterSpacing: '0.5px'}}>Account</span>
    </button>
    {isAccountExpanded && (
      <div className="submenu2">
        <a href="/profilepage"><button className="ProfileButton" >
        <AiFillProfile style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px', color: 'whitesmoke' }}/>
        <span style={{color: 'white', letterSpacing: '0.5px'}}>Profile</span>
          </button></a>
        <button className="MyFavoriteListButton">
        <MdFavorite style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px', color: 'whitesmoke' }}/>
          <span style={{color: 'white', letterSpacing: '0.5px'}}>My Favorite List</span>
          </button>
        <button className="ProfileButton"> 
        <ImMusic style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px', color: 'whitesmoke' }}/>
        <span style={{color: 'white', letterSpacing: '0.5px'}}>Music Playlist</span>
          </button>
        <button className="SettingButton">
        <AiTwotoneSetting style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px', color: 'whitesmoke' }}/>
          <span style={{color: 'white', letterSpacing: '0.5px'}}>Settings</span>
          </button>
      </div>
    )}
  </div>
  )
}

export default Menu
