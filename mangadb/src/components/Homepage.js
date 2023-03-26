import React, { useState } from 'react';
import "../css/homepage.css";
import { FaHome } from 'react-icons/fa';
import {AiOutlineMenu, AiTwotoneSetting, AiFillProfile} from 'react-icons/ai';
import {ImFire} from  'react-icons/im';
import {MdAccountCircle, MdFavorite} from 'react-icons/md'

const Homepage = () => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isAccountExpanded, setIsAccountExpanded] = useState(false);

  const handleMenuClick = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  const handleAccountClick = () => {
    setIsAccountExpanded(!isAccountExpanded);
  };

  return (
    <div class="grid-container">
      <div class="item1">Header</div>
      <div class="item2">
        <div class="menu">
          <button onClick={handleMenuClick} className="MenuButton">
           <AiOutlineMenu style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px' }}/> Menu
          </button>
          {isMenuExpanded && (
            <div className="submenu1">
              <button className="HomeButton"><FaHome style={{ display: 'inline-block', verticalAlign:'middle', marginRight: '10px' }}/> Home</button>
              <button className="MostPopularButton"> <ImFire style={{ display: 'inline-block', verticalAlign:'middle', marginRight: '10px' }}/>Most Popular</button>
            </div>
          )}
          <button onClick={handleAccountClick} className="AccountButton">
          <MdAccountCircle style={{ display: 'inline-block', verticalAlign:'middle', marginRight: '10px' }}/>
           Account
          </button>
          {isAccountExpanded && (
            <div className="submenu2">
              <button className="ProfileButton">
              <AiFillProfile style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px' }}/>
                Profile</button>
              <button className="MyFavoriteListButton">
              <MdFavorite style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px' }}/>
                My Favorite List</button>
              <button className="SettingButton">
              <AiTwotoneSetting style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px' }}/>
                Settings</button>
            </div>
          )}
        </div>
      </div>
      <div class="item3">Main</div>
      <div class="item5">Footer</div>
    </div>
  );
};

export default Homepage;
