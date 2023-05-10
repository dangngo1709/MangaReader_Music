import React, { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../css/FavoritesListComponent.css";
import MangaList from "../utility/MangaList";


const FavoritesListComponent = ({setManga, favoriteList, setfavoriteList, setfavorited}) => {

    const navigate = useNavigate();

    //for ensuring manga blocks render correctly 
    const [loading, setLoading] = useState(false);

    //for sorting the mangas
    const [orderFilter, setOrder] = useState("Most Popular");

    const handleOrderChange = (event) => {
      event.preventDefault();
      setOrder(event.target.value);
    }


    //for redirecting to manga page 
    const handleMangaClick = async (manga, event) => {
      event.preventDefault();

      const id = manga.id;
      const resp = await manga.generateChapters(id);
      setManga(manga);

      setTimeout( () => {
        setManga(manga);
        localStorage.setItem('manga', JSON.stringify(manga));
        navigate("/mangapage");
      }, 700)
    };



    //for removing manga off of the favorites list page
    const handleRemoveManga = async (manga, event) => {

    }

    //for searching favorites list
    const [searchFLManga, setsearchFLManga] = useState("");

    const handlesearchFLManga = (event) => {
        event.preventDefault();
        setsearchFLManga(event.target.value);

    }

    /** How to fetch Manga, need to import mangalist and useeffect */
    useEffect(() => {

      //for ensuring manga blocks render correctly 
      setLoading(false);

      const currentFavesList = new MangaList();

      const response = fetch("/mangadb/getUser",{
        method: "GET"
      }).then(async (res) => {
        const data = await res.json()
        console.log(data.user)
      })  


      //filter tags
      const includedTags = [];
      const excludedTags = [];

      
      

      //for changing manga list order
      let order = {};
      if(orderFilter === 'Most Popular'){
        order.followedCount = 'desc'; 
      } else {
        order.latestUploadedChapter = 'desc'
      }

      const filterObj = {
        includedTags: includedTags,
        excludedTags: excludedTags,
        order: order
      };

      // Create filters above ^^ 
      // If you like to search just for a title, add in the setTitleSearch 
      currentFavesList.setFilter(filterObj).then( () => {
        currentFavesList.generateMangaList().then( (res) => {
          setfavoriteList(res);
        })
      })

      //important, need to wait 1 second or else it wont render
      setTimeout( () => {
        setLoading(true);
      }, 1200)
    }, [orderFilter]);

    
    return (

        <div className="FavoritesListContainer">
            
            <div className="FLheader">
                <p id="FLtitle">My Favorite Mangas :3</p>


                <input type="search" id="FLsearchbar" 
                    placeholder="Search favorite mangas here " 
                    onChange={handlesearchFLManga}>
                </input>


                  <span>
                      <label>
                          <select name="Sort manga order" id= "FLorderSelect" 
                              onChange={handleOrderChange}>

                          <option value="Most Popular">Most Popular</option>
                          <option value="Latest Uploaded Chapter">Latest Uploaded Chapter</option>
                          </select>
                      </label>
                  </span>

            </div>


            <div className="FLmain">
                {loading ? 
                favoriteList.map( (manga,index) => 
                    (
                    <div
                        className="FLbookblock"
                        onClick={(e) => handleMangaClick(manga, e)}
                        key={index}>
                        <img src={manga.coverArt} alt="img" />
                        <div id="FLmangatitle">
                        {manga.title}
                        <br />
                        <span id="FLauthor">Author: {manga.author}</span>
                        <br />
                        <span id="FLauthor">Artist: {manga.artist}</span>
                        </div>
                        <p id="FLdescription"><span style={{fontWeight: 'bold'}}>
                            Description: </span>{manga.description}</p>
                    </div>
                    )
                ) : (
                <h1>Loading</h1>
                )}
            </div>

            
        </div>
    )



}


export default FavoritesListComponent;