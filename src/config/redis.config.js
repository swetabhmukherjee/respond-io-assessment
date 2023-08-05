const redis = require("redis");

// Redis client configuration
const redisClient = redis.createClient();

// Error handling for Redis client
redisClient.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

module.exports = { redisClient };
