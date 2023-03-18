import React from 'react'
import "../css/homepage.css"
const Homepage = () => {
  return (
    <div className="grid-container">
        <div className="item1">Header</div>
        <div className="item2">Menu</div>
        <div className="item3">Main</div>  
        <div className="item5">
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
    </div>
  )
}

export default Homepage