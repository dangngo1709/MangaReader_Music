import React, { useState } from 'react';
import "../css/homepage.css";

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
            Menu
          </button>
          {isMenuExpanded && (
            <div className="submenu">
              <button className="HomeButton">Home</button>
              <button className="RankingButton">Ranking</button>
            </div>
          )}
          <button onClick={handleAccountClick} className="AccountButton">
            Account
          </button>
          {isAccountExpanded && (
            <div className="submenu">
              <button className="ProfileButton">Profile</button>
              <button className="MyListButton">My List</button>
              <button className="SettingButton">Settings</button>
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
