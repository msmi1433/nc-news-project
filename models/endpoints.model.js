const fs = require("fs/promises");

exports.selectAllEndpoints = () => {
  return fs.readFile(`${__dirname}/../endpoints.json`, "utf-8").then((file) => {
    return JSON.parse(file);
  });
};
