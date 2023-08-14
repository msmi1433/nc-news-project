const { selectAllTopics } = require("../models/index");

function getTopics(req, res) {
  selectAllTopics().then(({ rows: topics }) => {
    res.status(200).send({ topics });
  });
}

module.exports = { getTopics };
