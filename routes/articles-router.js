const articlesRouter = require("express").Router();

const {
  getArticles,
  getArticleByID,
  postCommentToArticleID,
  getCommentsByArticleID,
  patchArticleByID,
  postArticle,
} = require("../controllers");

articlesRouter
  .get("/", getArticles)
  .get("/:article_id", getArticleByID)
  .get("/:article_id/comments", getCommentsByArticleID)
  .post("/:article_id/comments", postCommentToArticleID)
  .patch("/:article_id", patchArticleByID)
  .post("/", postArticle);

module.exports = articlesRouter;
