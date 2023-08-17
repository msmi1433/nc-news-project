const commentsRouter = require("express").Router();
const { deleteCommentByID } = require("../controllers");

commentsRouter.delete("/:comment_id", deleteCommentByID);

module.exports = commentsRouter;
