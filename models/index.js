const { selectAllTopics } = require("./topics.model");
const {
  selectArticleByID,
  selectArticles,
  alterArticleVotes,
  insertArticle,
} = require("./articles.model");
const {
  insertComment,
  selectCommentsByArticleID,
  removeComment,
  alterCommentVotes,
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
  alterCommentVotes,
  insertArticle,
};
