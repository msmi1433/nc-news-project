const { selectArticleByID } = require("../models");
const { insertComment } = require("../models");
const { selectCommentsByArticleID } = require("../models");

exports.postCommentToArticleID = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  selectArticleByID(article_id)
    .then(() => {
      return insertComment(username, body, article_id);
    })
    .then(({ rows }) => {
      const comment = rows[0];
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticleID = (req, res, next) => {
  const article_id = req.params.article_id;

  selectArticleByID(article_id)
    .then(() => {
      return selectCommentsByArticleID(article_id);
    })
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
