const { selectAllTopics } = require("./topics.model");
const {
  selectArticleByID,
  selectArticles,
  alterArticleVotes,
} = require("./articles.model");
const {
  insertComment,
  selectCommentsByArticleID,
  removeComment,
} = require("./comments.model");

module.exports = {
  selectAllTopics,
  selectArticleByID,
  selectArticles,
  insertComment,
  selectCommentsByArticleID,
  alterArticleVotes,
  removeComment,
};
