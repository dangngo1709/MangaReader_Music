export default class CommentClass {
  /**
   * Comment Object
   * username: the user's name
   * comment: comment made by the user
   * id: unique comment id
   * date: the date when the comment was created
   */
  constructor() {
    this.username = "";
    this.comment = "";
    this.id = "";
    this.date = new Date().toISOString();
  }
}
