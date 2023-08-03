const redis = require('redis');

// Redis client configuration
const redisClient = redis.createClient({
  host: '127.0.0.1', // Redis server host
  port: 6379,        // Redis server port
  // Add other configuration options if needed
});

// Error handling for Redis client
redisClient.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

module.exports = redisClient;
