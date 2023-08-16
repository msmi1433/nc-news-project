const { getTopics } = require("./topics.controller");
const { getEndpoints } = require("./endpoints.controller");
const {
  getArticleByID,
  getArticles,
  patchArticleByID,
} = require("./articles.controller");
const {
  psqlErrorHandler,
  customErrorHandler,
} = require("./error-handlers.controller");

const { postCommentToArticleID } = require("./comments.controller");

const { getCommentsByArticleID } = require("./comments.controller");

module.exports = {
  getTopics,
  getEndpoints,
  getArticleByID,
  psqlErrorHandler,
  customErrorHandler,
  getArticles,
  postCommentToArticleID,
  getCommentsByArticleID,
  patchArticleByID,
};
