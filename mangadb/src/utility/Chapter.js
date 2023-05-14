import axios from "axios";
export default class Chapter {
  /**
   * Chapter object
   * chapter_id: id of chapter
   * chapter_num: chapter num
   * num_pgs: number of pages for this chapter
   * scanlationID: id used to get scan group from api
   * scanalation_group: scan group
   * chapter_imgs: array of urls for each img file
   * chapter_hash: used to generate chapter imgs
   * chapterData: array of img files
   */
  constructor() {
    this.chapter_id = "";
    this.chapter_num = "";
    this.num_pgs = "";
    this.scanlationID = "";
    this.scanlation_group = "";
    this.chapter_imgs = [];
    this.chapter_hash = "";
    this.chapterData = "";
    this.base_url = "https://api.mangadex.org";
    this.img_url = "https://uploads.mangadex.org";
  }
  setChapterHash(x) {
    this.chapter_hash = x;
  }
  getChapterHash() {
    return this.chapter_hash;
  }
  setChapterData(x) {
    this.chapterData = x;
  }
  getChapterData() {
    return this.chapterData;
  }
  setScanID(x) {
    this.scanlationID = x;
  }
  getScanID() {
    return this.scanlationID;
  }
  setChapterID(x) {
    this.chapter_id = x;
  }
  getChapterID(x) {
    return this.chapter_id;
  }
  setChapterNum(x) {
    this.chapter_num = x;
  }
  getChapterNum(x) {
    return this.chapter_num;
  }
  setNumPgs(x) {
    this.num_pgs = x;
  }
  getNumPgs(x) {
    return this.num_pgs;
  }
  setScanlationGroup(x) {
    this.scanlation_group = x;
  }
  getScanlationGroup(x) {
    return this.scanlation_group;
  }
  addChapterImg(x) {
    this.chapter_imgs.push(x);
  }
  getChapterImg(x) {
    return this.chapter_img;
  }
}
