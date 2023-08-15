const { selectAllTopics } = require("./topics.model");
const { selectArticleByID, selectArticles } = require("./articles.model");

module.exports = { selectAllTopics, selectArticleByID, selectArticles };
