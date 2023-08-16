const express = require("express");
const app = express();
const {
  getTopics,
  getEndpoints,
  getArticles,
  getArticleByID,
  psqlErrorHandler,
  customErrorHandler,
  postCommentToArticleID,
  getCommentsByArticleID,
  patchArticleByID,
} = require("./controllers");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleByID);

app.post("/api/articles/:article_id/comments", postCommentToArticleID);

app.get("/api/articles/:article_id/comments", getCommentsByArticleID);

app.patch("/api/articles/:article_id", patchArticleByID);

app.use(psqlErrorHandler);

app.use(customErrorHandler);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: err });
});

module.exports = app;
