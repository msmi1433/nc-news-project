const articlesRouter = require("express").Router();

const {
  getArticles,
  getArticleByID,
  postCommentToArticleID,
  getCommentsByArticleID,
  patchArticleByID,
} = require("../controllers");

articlesRouter
  .get("/", getArticles)
  .get("/:article_id", getArticleByID)
  .get("/:article_id/comments", getCommentsByArticleID)
  .post("/:article_id/comments", postCommentToArticleID)
  .patch("/:article_id", patchArticleByID);

module.exports = articlesRouter;
