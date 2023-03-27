
export default class Manga {
    constructor(){
        this.id = '';
        this.title = '';
        this.author = '';
        this.artist = '';
        this.coverArt = '';
        this.chapterImages = [];
    }
    setID(x){
        this.id = x;
    }
    getID(){
        return this.id;
    }
    setTitle(x){
        this.title = x;
    }
    getTitle(x){
        return this.title;
    }
    setAuthor(x){
        this.author = x;
    }
    getAuthor(x){
        return this.author;
    }
    setArtist(x){
        this.artist = x;
    }
    getArtist(x){
        return this.artist;
    }
    setCoverArt(x){
        this.coverArt = x;
    }
    getCoverArt(x){
        return this.coverArt;
    }
    createCoverArtUrl(x){
        const width = 256;
        return `https://uploads.mangadex.org/covers/${this.getID()}/` +
        `${x}.${width}.jpg`;
    }
    setChapterImages(x){
        this.chapterImages = x;
    }
    getChapterImages(x){
        return this.chapterImages;
    }
}