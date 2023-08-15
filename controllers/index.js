const { getTopics } = require("./topics.controller");
const { getEndpoints } = require("./endpoints.controller");
const { getArticleByID, getArticles } = require("./articles.controller");
const {
  psqlErrorHandler,
  customErrorHandler,
} = require("./error-handlers.controller");

module.exports = {
  getTopics,
  getEndpoints,
  getArticleByID,
  psqlErrorHandler,
  customErrorHandler,
  getArticles,
};
