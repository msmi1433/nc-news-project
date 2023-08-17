const express = require("express");
const app = express();
const { psqlErrorHandler, customErrorHandler } = require("./controllers");
const {
  apiRouter,
  topicsRouter,
  articlesRouter,
  usersRouter,
  commentsRouter,
} = require("./routes");

app.use(express.json());
app.use("/api/topics", topicsRouter);
app.use("/api", apiRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);
app.use("/api/comments", commentsRouter);

app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: err });
});

module.exports = app;
