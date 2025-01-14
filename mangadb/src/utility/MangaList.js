import MangaClass from "./Manga";
import axios from "axios";
export default class MangaList {
  /**
   * MangaList Class
   * manga_list: list of manga objects
   * titleSearch: title filter
   * order: filter based on order
   * filters: misc. filters
   * includedTagNames: ids for included genres
   * excludedTagNames: ids for excluded genres
   * base_url: base url of mangadex api
   * include: url for including cover art, author, artist
   * in mangadex api requests
   */
  constructor() {
    this.manga_list = [];
    this.titleSearch = "";
    this.order = "";
    this.filters = "";
    this.includedTagNames = "";
    this.excludedTagNames = "";
    this.base_url = "https://api.mangadex.org";
    this.include =
      "?includes[]=author&includes[]=artist&includes[]=cover_art&includes[]=tag&includes[]=leader&includes[]=member";
  }
  setTitleSearch(x) {
    this.titleSearch = x;
  }
  getTitleSearch(x) {
    return this.titleSearch;
  }
  setIncludedTag(x) {
    this.includedTagNames = x;
  }
  setExcludedTag(x) {
    this.excludedTagNames = x;
  }
  setOrder(x) {
    this.order = x;
  }
  addManga(x) {
    this.manga_list.push(x);
  }
  getMangaList() {
    return this.manga_list;
  }
  // set filters: included and excluded genres and order
  async setFilter(filters) {
    if (filters.includedTags) {
      let includedTagIDs;
      const tags = await axios(`${this.base_url}/manga/tag`);
      // ['391b0423-d847-456f-aff0-8b0cfc03066b', '423e2eae-a7a2-4a8b-ac03-a8351462d71d']
      includedTagIDs = tags.data.data
        .filter((tag) => filters.includedTags.includes(tag.attributes.name.en))
        .map((tag) => tag.id);
      this.setIncludedTag(includedTagIDs);
    }
    if (filters.excludedTags) {
      let excludedTagIDs;
      const tags = await axios(`${this.base_url}/manga/tag`);
      // ['391b0423-d847-456f-aff0-8b0cfc03066b', '423e2eae-a7a2-4a8b-ac03-a8351462d71d']
      excludedTagIDs = tags.data.data
        .filter((tag) => filters.excludedTags.includes(tag.attributes.name.en))
        .map((tag) => tag.id);
      this.setExcludedTag(excludedTagIDs);
    }
    if (filters.order) {
      const finalOrderQuery = {};
      // { "order[rating]": "desc", "order[followedCount]": "desc" }
      for (const [key, value] of Object.entries(filters.order)) {
        finalOrderQuery[`order[${key}]`] = value;
      }
      this.setOrder(finalOrderQuery);
    }
  }
  // fetch mangaID based on included and excluded genres, title, order
  // gets 12 manga ids from mangadex api
  async fetchMangaID() {
    const resp = await axios({
      method: "GET",
      url: `${this.base_url}/manga`,
      params: {
        includedTags: this.includedTagNames,
        excludedTags: this.excludedTagNames,
        title: this.getTitleSearch(),
        limit: 12,
        ...this.order,
      },
    }).then((resp) => {
      // for each manga id assign it to a manga object and add to manga_list
      resp.data.data.map((manga) => {
        const newManga = new MangaClass();
        newManga.setID(manga.id);
        this.addManga(newManga);
      });
    });
  }
  // for each manga object in manga_list, fetch the manga from mangadex api
  async fetchMangaFromID() {
    const promise = this.manga_list.map(async (manga) => {
      const response = await axios({
        method: "GET",
        url: `${this.base_url}/manga/${manga.getID()}/${this.include}`,
      });
      return response;
    });
    return Promise.all(promise);
  }
  // for each manga request, set the title, cover art,
  // artist, arthor,  and description for each manga object
  // in the manga_list
  generateMangaInfo(res) {
    const list = res.map((data) => data.data.data);
    for (let i = 0; i < this.manga_list.length; i++) {
      let title, author, artist, cover_art_url, description;
      title = Object.values(list[i].attributes.title)[0];
      for (const [key, value] of Object.entries(
        list[i].attributes.description
      )) {
        if (key === "en") {
          description = value;
          break;
        }
      }
      for (let k = 0; k < list[i].attributes.tags.length; k++) {
        this.manga_list[i].addGenre(
          list[i].attributes.tags[k].attributes.name.en
        );
      }
      for (let j = 0; j < list[i].relationships.length; j++) {
        if (list[i].relationships[j].type == "author") {
          author = list[i].relationships[0].attributes.name;
        }
        if (list[i].relationships[j].type == "artist") {
          artist = list[i].relationships[1].attributes.name;
        }
        if (list[i].relationships[j].type == "cover_art") {
          const cover_art = list[i].relationships[j].attributes.fileName;
          cover_art_url = this.manga_list[i].createCoverArtUrl(cover_art);
        }
      }
      this.manga_list[i].setTitle(title);
      this.manga_list[i].setAuthor(author);
      this.manga_list[i].setArtist(artist);
      this.manga_list[i].setCoverArt(cover_art_url);
      this.manga_list[i].setDescription(description);
    }
    return this.manga_list;
  }
  // execute fetchMangaID, then fetchMangaFromID, and
  // lastly generateMangaInfo
  async generateMangaList() {
    this.fetchMangaID().then(() => {
      this.fetchMangaFromID().then((res) => {
        this.generateMangaInfo(res);
      });
    });
    return this.manga_list;
  }
}
