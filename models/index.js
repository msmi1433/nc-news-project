const { selectAllTopics } = require("./topics.model");
const { selectArticleByID, selectArticles } = require("./articles.model");
const { selectCommentsByArticleID } = require("./comments.model");

module.exports = {
  selectAllTopics,
  selectArticleByID,
  selectArticles,
  selectCommentsByArticleID,
};
