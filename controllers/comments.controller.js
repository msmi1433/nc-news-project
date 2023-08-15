const { selectArticleByID } = require("../models");
const { insertComment } = require("../models");

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
