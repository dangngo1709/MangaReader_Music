import Manga from "../utility/Manga.js";
import axios from "axios";
export default class MangaList {
  constructor() {
    this.manga_list = [];
    this.order = {};
    this.filters = {};
    this.includedTagNames = [];
    this.excludedTagNames = [];
    this.base_url = "https://api.mangadex.org";
    this.include = "?includes[]=author&includes[]=artist&includes[]=cover_art";
  }
  addManga(x){
    this.manga_list.push(x);
  }
  getMangaList(){
    return this.manga_list;
  }
  /** filter = { "order[rating]": "desc", "order[followedCount]": "desc" } */
  setOrder(filter) {
    this.order = filter;
  }
  /**
     * const filters = {
        publicationDemographic: ['seinen'],
        status: ['completed'],
        contentRating: ['suggestive']
        };
     */
  setFilters(filter) {
    this.filters = filter;
  }
  /**
   *
   * const includedTags = ['Action', 'Romance'];
   *
   */
  async setIncludedTags(filter) {
    let includedTagIDs;
    const tags = await axios(`${this.base_url}/manga/tag`);
    // ['391b0423-d847-456f-aff0-8b0cfc03066b', '423e2eae-a7a2-4a8b-ac03-a8351462d71d']
    includedTagIDs = tags.data.data
      .filter((tag) => filter.includes(tag.attributes.name.en))
      .map((tag) => tag.id);
    this.includedTagNames = includedTagIDs;
  }
  /**
   *
   * const excludedTags= ['Harem'];
   */
  async setExcludedTags(filter) {
    let excludedTagIDs;
    const tags = await axios(`${this.base_url}/manga/tag`);

    // ['391b0423-d847-456f-aff0-8b0cfc03066b', '423e2eae-a7a2-4a8b-ac03-a8351462d71d']
    excludedTagIDs = tags.data.data
      .filter((tag) => filter.includes(tag.attributes.name.en))
      .map((tag) => tag.id);
    this.includedTagNames = excludedTagIDs;
  }

  async fetchMangaID() {
    const includedTags = ['Action', 'Romance'];
    const excludedTags= ['Harem']
    this.setIncludedTags(includedTags);
    this.setExcludedTags(excludedTags);
    const resp = await axios({
        method: 'GET',
        url: `${this.base_url}/manga`,
        params: {
            includedTags: this.includedTagNames,
            excludedTags: this.excludedTagNames
        }
    });
    resp.data.data.map(manga => {
        const newManga = new Manga();
        newManga.setID(manga.id);
        this.addManga(newManga);
    })
  }

  async fetchMangaFromID() {
    const promise = this.manga_list.map( async(manga) => {
        const response = await axios({
            method: 'GET',
            url: `${this.base_url}/manga/${manga.getID()}/${this.include}`,
          })
        return response;
    })
    return Promise.all(promise);
  }

  generateMangaList(res) {
    const list =  res.map( data => data.data.data);
    for(let i = 0; i < this.manga_list.length; i++){
        let title, author, artist, cover_art_url;
        title = Object.values(list[i].attributes.title)[0];
        for(let j = 0; j < list[i].relationships.length; j++){
            if(list[i].relationships[j].type == 'author'){
                author = list[i].relationships[0].attributes.name;
            }
            if(list[i].relationships[j].type == 'artist'){
                artist = list[i].relationships[1].attributes.name;
            }
            if (list[i].relationships[j].type == 'cover_art'){
                const cover_art = list[i].relationships[j].attributes.fileName;
                cover_art_url = this.manga_list[i].createCoverArtUrl(cover_art);
            }
        }
        this.manga_list[i].setTitle(title);
        this.manga_list[i].setAuthor(author);
        this.manga_list[i].setArtist(artist);
        this.manga_list[i].setCoverArt(cover_art_url);
    }
    return this.manga_list;
  }

}

