const { selectCommentsByArticleID } = require("../models");
const { selectArticleByID } = require("../models");

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
