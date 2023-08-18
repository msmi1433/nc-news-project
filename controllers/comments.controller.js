const {
  selectArticleByID,
  selectCommentsByArticleID,
  insertComment,
  removeComment,
  alterCommentVotes,
} = require("../models");

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

exports.deleteCommentByID = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then((deletedComment) => {
      if (deletedComment) {
        res.status(204).send();
      } else {
        return Promise.reject({
          status: 404,
          msg: "bad db query",
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchCommentByID = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  alterCommentVotes(comment_id, inc_votes)
    .then((updatedComment) => {
      res.status(200).send({ updatedComment });
    })
    .catch(next);
};
