const { selectAllEndpoints } = require("../models/index");

exports.getEndpoints = (req, res) => {
  selectAllEndpoints().then((endpoints) => {
    res.status(200).send(endpoints);
  });
};
