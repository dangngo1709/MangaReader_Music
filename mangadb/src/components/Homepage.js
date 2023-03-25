import "../css/homepage.css";
import Cont_Read from "./Cont_Read";
import React, {useState} from 'react';
const Homepage = () => {
  const sessionID = localStorage.getItem('session_id');
  if (!sessionID) {
    localStorage.setItem('login_missing', 'true');
    window.location.href = '/login'
  }
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  }
  
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isAccountExpanded, setIsAccountExpanded] = useState(false);

  const handleMenuClick = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  const handleAccountClick = () => {
    setIsAccountExpanded(!isAccountExpanded);
  };
  return (
    <div className="grid-container">
      <div className="item1">
      <button onClick={handleLogout}>Logout</button>
      Header</div>
      <div className="item2">
        <div className="menu">
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
        <div className="account">
          {" "}
          Account
          <div className="profile">Profile</div>
          <div className="bookmarked">Bookmarked</div>
          <div className="ReadingHistory">Reading History</div>
        </div>
      </div>
      <div className="item3">Main</div>
      <Cont_Read />
    </div>
  );
};

export default Homepage;
