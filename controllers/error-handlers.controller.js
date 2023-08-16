exports.psqlErrorHandler = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "invalid data-type" });
  } else if (err.code === "23502") {
    res.status(400).send({ msg: "posted item format is invalid" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "parameter does not exist" });
  } else {
    next(err);
  }
};

exports.customErrorHandler = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};
