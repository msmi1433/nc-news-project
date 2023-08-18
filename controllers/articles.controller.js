const { checkTopicExists } = require("../db/seeds/utils");
const {
  selectArticleByID,
  selectArticles,
  alterArticleVotes,
  insertArticle,
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
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const page = req.query.page ? parseInt(req.query.page) : undefined;

  const promises = [selectArticles(topic, sort_by, order, limit, page)];

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

exports.postArticle = (req, res, next) => {
  const newArticle = req.body;
  if (!newArticle.article_img_url) {
    newArticle.article_img_url =
      "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";
  }
  insertArticle(newArticle)
    .then(({ rows }) => {
      res.status(201).send({ postedArticle: rows[0] });
    })
    .catch(next);
};
