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
const {
  postCommentToArticleID,
  getCommentsByArticleID,
  deleteCommentByID,
} = require("./comments.controller");
const { getUsers } = require("./users.controller");

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
  deleteCommentByID,
  getUsers,
};
