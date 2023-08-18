const { getTopics } = require("./topics.controller");
const { getEndpoints } = require("./endpoints.controller");
const {
  getArticleByID,
  getArticles,
  patchArticleByID,
  postArticle,
} = require("./articles.controller");
const {
  psqlErrorHandler,
  customErrorHandler,
} = require("./error-handlers.controller");
const {
  postCommentToArticleID,
  getCommentsByArticleID,
  deleteCommentByID,
  patchCommentByID,
} = require("./comments.controller");
const { getUsers, getUserByUsername } = require("./users.controller");

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
  getUserByUsername,
  patchCommentByID,
  postArticle,
};
