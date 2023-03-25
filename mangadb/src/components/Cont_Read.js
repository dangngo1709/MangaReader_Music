import React, {useEffect,useState,useRef} from "react";
import "../css/homepage.css";
import axios from "axios";

const Cont_Read = () => {
  const width = 256;
  const [manga_list,setList] = useState([]);
  const [manga_ids,setIDs] = useState([]);
  const [doneFetchManga,setFM] = useState(false);
  const BASE_URL = 'https://api.mangadex.org';
  const author_artist_cover = '?includes[]=author&includes[]=artist&includes[]=cover_art'

  /** Filters */
  const shounen_filter = {
    publicationDemographic: ['shounen']
  };

  const fetchMangaID = async (filters) => {
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/manga`,
      params: filters
    })
    setIDs([...manga_ids, response.data.data.map(manga => manga.id)])
    setFM(true);
  }

  const fetchMangaFromID = async () => {
    const promise = manga_ids[0].map( async(id) => {
      const response = await axios({
        method: 'GET',
        url: `${BASE_URL}/manga/${id}/${author_artist_cover}`,
      })
      return response;
    })
    return Promise.all(promise);
  }

  /* */
  useEffect(() => {
    /** Fetch manga ids from Mangadex API based on a filter*/
    fetchMangaID(shounen_filter);
    if (doneFetchManga){
      console.log('done fetching')
      /** Fetch the actual manga for each manga id */
      fetchMangaFromID()
      .then( (res) => {
        setList([...manga_list, res.map( data => data.data.data)]);
      })
    }
  }, [doneFetchManga])


  return (
    <div className="item5" id="item_5">
      <h3 id="cont-read">
        Continue <span id="reading">Reading</span>
      </h3>
      <div className="book-row">
        {manga_list[0] ? (
          manga_list[0].map((manga, index) => (
            <div className="book-block" key={index}>
              {manga.relationships[2].attributes.fileName ? <img src={
                `https://uploads.mangadex.org/covers/${manga.id}/` +
                `${manga.relationships[2].attributes.fileName}.${width}.jpg`} alt="img"/>
              : <img src={
                `https://uploads.mangadex.org/covers/${manga.id}/` +
                `${manga.relationships[3].attributes.fileName}.${width}.jpg`} alt="img"/>}
              <div id="rec_title">{Object.values(manga.attributes.title)[0]}<br/>
              <span>Author: {manga.relationships[0].attributes.name}</span><br/>
              <span>Artist: {manga.relationships[1].attributes.name}</span>
              </div>
              <div className="author"></div>
            </div>
          ))
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
};

export default Cont_Read;
