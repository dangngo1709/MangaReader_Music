export default class Chapter {
    constructor(){
        this.chapter_id = '';
        this.chapter_num = '';
        this.num_pgs = '';
        this.scanlationID = '';
        this.scanlation_group = '';
        this.chapter_imgs = [];
        this.chapter_hash = '';
        this.chapterData = '';
    }

    setChapterHash(x){
        this.chapter_hash = x;
    }
    getChapterHash(){
        return this.chapter_hash;
    }
    setChapterData(x){
        this.chapterData = x;
    }
    getChapterData(){
        return this.chapterData;
    }
    setScanID(x){
        this.scanlationID = x;
    }
    getScanID(){
        return this.scanlationID;
    }
    setChapterID(x){
        this.chapter_id = x;
    }
    getChapterID(x){
        return this.chapter_id;
    }
    setChapterNum(x){
        this.chapter_num = x;
    }
    getChapterNum(x){
        return this.chapter_num;
    }
    setNumPgs(x){
        this.num_pgs = x;
    }
    getNumPgs(x){
        return this.num_pgs;
    }
    setScanlationGroup(x){
        this.scanlation_group = x;
    }
    getScanlationGroup(x){
        return this.scanlation_group;
    }
    addChapterImg(x){
        this.chapter_imgs.push(x);
    }
    getChapterImg(x){
        return this.chapter_img;
    }

}