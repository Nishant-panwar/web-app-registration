const redis = require("redis");

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

client.on("error", error => {
    console.log("Redis Error.");
    console.error(error);
});

module.exports.redis = client;