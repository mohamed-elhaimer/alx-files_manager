/* eslint-disable consistent-return */
const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    // Handle Redis client error
    this.client.on('error', (err) => {
      console.error('Redis client error:', err);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(true);
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(true);
      });
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
