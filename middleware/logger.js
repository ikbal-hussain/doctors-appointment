const moment = require("moment");

const logger = (req, res, next) => {
  console.log(`[${moment().format()}] ${req.method} ${req.url}`);
  next();
};

module.exports = logger;

