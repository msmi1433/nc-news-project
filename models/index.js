const { selectAllTopics } = require("./topics.model");
const { selectArticleByID, selectArticles } = require("./articles.model");
const { insertComment } = require("./comments.model");

module.exports = {
  selectAllTopics,
  selectArticleByID,
  selectArticles,
  insertComment,
};
