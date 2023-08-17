const apiRouter = require("express").Router();
const { getEndpoints } = require("../controllers");

apiRouter.get("/", getEndpoints);

module.exports = apiRouter;
