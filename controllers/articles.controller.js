const { checkTopicExists } = require("../db/seeds/utils");
const {
  selectArticleByID,
  selectArticles,
  alterArticleVotes,
} = require("../models");

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
  const { topic, sort_by, order } = req.query;

  const promises = [selectArticles(topic, sort_by, order)];

  if (topic) promises.push(checkTopicExists(topic));

  return Promise.all(promises)
    .then((promises) => {
      res.status(200).send({ articles: promises[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleByID = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  alterArticleVotes(article_id, inc_votes)
    .then((updatedArticle) => {
      res.status(200).send({ updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
};
