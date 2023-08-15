const db = require("../db/connection");

const format = require("pg-format");

exports.insertComment = (author, body, article_id) => {
  const insertQuery = format(
    `INSERT INTO comments 
  (body, article_id, author, votes)
  VALUES %L
  RETURNING *;`,
    [[body, article_id, author, 0]]
  );
  return db.query(insertQuery);
};

exports.selectCommentsByArticleID = (articleID) => {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1
    ORDER BY created_at DESC`,
      [articleID]
    )
    .then(({ rows }) => {
      return rows;
    });
};
