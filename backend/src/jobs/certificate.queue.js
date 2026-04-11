const { Queue } = require("bullmq");
const redis = require("../config/redis");

module.exports = new Queue("certificateQueue", {
  connection: redis
});