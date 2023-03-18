import React from 'react'
import "../css/homepage.css"
const Homepage = () => {
  return (
    <div class="grid-container">
        <div class="item1">Header</div>
        <div class="item2">
          <div class= "menu">
              <div>Menu</div>  
              <div class = "Home">
                Home
                </div>
              <div class ="RankingSystem"> Ranking System</div>
          </div>

              <div class = "account"> Account
                <div class ="profile">Profile</div>
                <div class ="bookmarked">Bookmarked</div>
                <div class ="ReadingHistory">Reading History</div>
              </div>
        </div>
        <div class="item3">
        <h3 id="cont-read">Continue Reading</h3>
            <div className="book-row">
                <div className="book-block">Title</div>
                <div className="book-block">Title</div>
                <div className="book-block">Title</div>
                <div className="book-block">Title</div>
                <div className="book-block">Title</div>
                <div className="book-block">Title</div>
                <div className="book-block">Title</div>
                <div className="book-block">Title</div>
                <div className="book-block">Title</div>
            </div>  
        </div>  
        <div class="item5">Footer</div>
    </div>
  )
}

export default Homepage