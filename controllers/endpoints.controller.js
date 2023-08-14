const fs = require("fs/promises");

exports.getEndpoints = (req, res) => {
  return fs
    .readFile(`${__dirname}/../endpoints.json`, "utf-8")
    .then((endpoints) => {
      res.status(200).send({ endpoints: JSON.parse(endpoints) });
    });
};
