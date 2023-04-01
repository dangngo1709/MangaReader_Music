import axios from "axios";
import Chapter from "./Chapter.js";
export default class Manga {
  constructor() {
    this.id = "";
    this.title = "";
    this.author = "";
    this.artist = "";
    this.coverArt = "";
    this.chapter_list = [];
    this.base_url = "https://api.mangadex.org";
    this.img_url = "https://uploads.mangadex.org";
    this.description = '';
  }
  setDescription(x){
    this.description = x;
  }
  getDescription(){
    return this.description;
  }
  setID(x) {
    this.id = x;
  }
  getID() {
    return this.id;
  }
  setTitle(x) {
    this.title = x;
  }
  getTitle(x) {
    return this.title;
  }
  setAuthor(x) {
    this.author = x;
  }
  getAuthor(x) {
    return this.author;
  }
  setArtist(x) {
    this.artist = x;
  }
  getArtist(x) {
    return this.artist;
  }
  setCoverArt(x) {
    this.coverArt = x;
  }
  getCoverArt(x) {
    return this.coverArt;
  }
  async getlistChapters(manga_id) {
    const resp = await axios({
      method: "GET",
      url: `${this.base_url}/manga/${manga_id}/feed`,
    }).catch(err => {
      console.log(err)
    })
    return Promise.resolve(resp);
  }

  async generateChapters(manga_id) {
    this.getlistChapters(manga_id)
      .then((res) => {
        res.data.data.map( (chapter) => {
          const newChapter = new Chapter();
          newChapter.setChapterID(chapter.id);
          newChapter.setChapterNum(chapter.attributes?.chapter);
          newChapter.setNumPgs(chapter.attributes?.pages);
          chapter.relationships.forEach((res) => {
            if (res.type == "scanlation_group") {
              newChapter.setScanID(res.id);
            }
          });
          this.addChapterList(newChapter);
        });
      })//get scanlation group
      .then(async () => {
        for (let i = 0; i < this.chapter_list.length; i++) {
          const scanID = this.chapter_list[i].scanlationID;
          const resp = await axios({
            method: "GET",
            url: `${this.base_url}/group/${scanID}`,
          });
          const scanGroup = await resp.data.data.attributes?.name;
          this.chapter_list[i].setScanlationGroup(scanGroup);
        }
        this.sortData(this.chapter_list);
      })
    return this.chapter_list
  }

  async generateChapterImgs(chList){
    let dataSaver,chapterHash
    const chID = chList[0].chapter_id;
      const resp = await axios({
        method: "GET",
        url: `${this.base_url}/at-home/server/${chID}`
      })
      chapterHash = await resp.data.chapter.hash;
      dataSaver = await resp.data.chapter.dataSaver;
      for(let j = 0; j < 2; j++){
        const fileName = dataSaver[j];
        const link = `${this.img_url}/data-saver/${chapterHash}/${fileName}`;
        chList[0].addChapterImg(link)
      }
      console.log(chList[0])
    return this.chapter_list;
  }

  sortData(data) {
    //bubble sort
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data.length - i - 1; j++) {
        if (Number(data[j].chapter_num) > Number(data[j + 1].chapter_num)) {
          var temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;
        }
      }
    }
  }
  /**
   * 
   * this.manga_list.forEach((manga) => {
          const chList = manga.chapter_list;
          this.sortData(chList);
        });
   */

  createCoverArtUrl(x) {
    const width = 256;
    return (
      `https://uploads.mangadex.org/covers/${this.getID()}/` +
      `${x}.${width}.jpg`
    );
  }
  addChapterList(x) {
    this.chapter_list.push(x);
  }
  getChapterList(x) {
    return this.chapter_list;
  }
}
