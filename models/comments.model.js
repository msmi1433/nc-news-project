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
