const { selectArticleByID, selectArticles } = require("../models");

exports.getArticleByID = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleByID(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then(({ rows: articles }) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};
