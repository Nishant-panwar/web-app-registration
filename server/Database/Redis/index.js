const { redis } = require('./connection');

/**
 * This Class will contains a redis client that will be used throughout the application
 * It contains basic function of fetching and saving data from the redis client
 */
class Redis {

    constructor() {
        console.log('Created a Redis Client for weh-app');
        this.redis = redis;
    }


    /**
     * This function is used for initalising the redis client
     */
    init() {
        if (this.redis.connected) {
            console.log("Successfully connected to redis.");
            resolve("");
        } else {
            this.redis.on("connect", () => {
                console.log("Successfully connected to redis.");
            });

            this.redis.on("error", error => {
                console.log("Unable to connect redis server.");
                console.log(error);
                process.exit(1);
            });
        }
    }

    /**
     * used to fetch the detail of a user
     * @param {string} email 
     */
    fetch(email) {
        console.log(`Fetching for ${email}`);
        return new Promise((resolve, reject) => {
            this.redis.get(email, (err, value) => {
                if (err) {
                    console.error(err);
                    reject();
                } else {
                    console.log(value)
                    resolve(value);
                }
            });
        })
    }

    /**
     * used to save the details of a user
     * @param {string} email 
     * @param {string} userDetails 
     */
    save(email, userDetails) {
        return new Promise((resolve, reject) => {

            // Send resuest to redis server
            this.redis.set(email, userDetails, (err, itemAdded) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(itemAdded);
                }
            });
        })
    }

}

module.exports = new Redis();