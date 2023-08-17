const commentsRouter = require("express").Router();
const { deleteCommentByID, patchCommentByID } = require("../controllers");

commentsRouter
  .delete("/:comment_id", deleteCommentByID)
  .patch("/:comment_id", patchCommentByID);

module.exports = commentsRouter;
