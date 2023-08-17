const db = require("../db/connection");

exports.selectArticleByID = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((result) => {
      const article = result.rows[0];
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: "article_id does not exist",
        });
      } else {
        return article;
      }
    });
};

exports.selectArticles = (topic, sortBy = "created_at", order = "DESC") => {
  if (
    !["article_id", "comment_count", "votes", "created_at"].includes(sortBy)
  ) {
    return Promise.reject({
      status: 400,
      msg: "invalid sort_by query",
    });
  }

  if (!["ASC", "DESC"].includes(order)) {
    return Promise.reject({
      status: 400,
      msg: "invalid order query",
    });
  }

  let queryString = `SELECT articles.article_id, articles.author, articles.title, 
articles.topic, articles.created_at, articles.votes, article_img_url,
COUNT (comments.comment_id)::INT AS comment_count
FROM articles
LEFT JOIN comments ON articles.article_id = comments.article_id`;

  let queryArray = [];
  if (topic) {
    queryString += ` WHERE topic = $1`;
    queryArray.push(topic);
  }

  queryString += ` GROUP BY articles.article_id ORDER BY ${sortBy} ${order}`;

  return db.query(queryString, queryArray).then(({ rows }) => {
    return rows;
  });
};

exports.alterArticleVotes = (articleID, incVotes) => {
  return db
    .query(
      `UPDATE articles
     SET votes = votes + $1
     WHERE article_id = $2
     RETURNING *;`,
      [incVotes, articleID]
    )
    .then(({ rows }) => {
      const article = rows[0];
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: "article_id does not exist",
        });
      } else {
        return article;
      }
    });
};
