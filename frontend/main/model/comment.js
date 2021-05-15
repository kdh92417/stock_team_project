import API from '../../api/api.js'

class Comment {
  constructor() {
    this.comment = {};
  }

  saveComment(content, pfId) {
    this.comment.content = content;
    this.comment.portfolio_id = pfId;
  }
}

export default Comment;