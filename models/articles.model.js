const db = require("../db/connection");
const { checkTopicExists } = require("../db/seeds/utils");
const format = require("pg-format");

exports.selectArticleByID = (article_id) => {
  return db
    .query(
      `SELECT articles.article_id, articles.title, articles.topic, articles.author,
    articles.body, articles.created_at, articles.article_img_url, 
    COUNT(comments.comment_id)::INT AS comment_count
    FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`,
      [article_id]
    )
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

exports.selectArticles = (
  topic,
  sortBy = "created_at",
  order = "DESC",
  limit = 10,
  page = 1
) => {
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

  if (isNaN(limit)) {
    return Promise.reject({
      status: 400,
      msg: "limit must be a number",
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

  queryString += ` GROUP BY articles.article_id ORDER BY ${sortBy} ${order}
  LIMIT ${limit} OFFSET ${(page - 1) * limit}`;

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

exports.insertArticle = (newArticle) => {
  const { author, title, body, topic, article_img_url } = newArticle;
  const insertQuery = format(
    `INSERT INTO articles
  (author, title, body, topic, article_img_url)
  VALUES %L
  RETURNING *;`,
    [[author, title, body, topic, article_img_url]]
  );
  return db.query(insertQuery).then(({ rows }) => {
    const article_id = rows[0].article_id;
    return db.query(
      `SELECT articles.article_id, articles.author, articles.title, 
    articles.topic, articles.created_at, articles.votes, article_img_url,
    COUNT (comments.comment_id)::INT AS comment_count, articles.body 
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`,
      [article_id]
    );
  });
};
