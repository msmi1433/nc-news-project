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
const { selectUsers, selectUserByUsername } = require("./users.model");

module.exports = {
  selectAllTopics,
  selectArticleByID,
  selectArticles,
  insertComment,
  selectCommentsByArticleID,
  alterArticleVotes,
  removeComment,
  selectUsers,
  selectUserByUsername,
};
