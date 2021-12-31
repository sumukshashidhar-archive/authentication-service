const bcrypt = require("bcrypt")
const logger = require('winston')
//https://stackoverflow.com/questions/14531232/how-to-use-winston-in-several-modules

module.exports = {
    hashPass: async function(plaintext_password) {
        return new Promise(function(resolve, reject) {
            bcrypt.hash(plaintext_password, process.env.SALT_ROUNDS, function(err, hashedPassword) {
                if (err) {
                    logger.error(`Failed to hash password ${err}`);
                    reject(err);
                } else {
                    logger.silly("Hashed Password")
                    resolve(hashedPassword);
                }
            })
        })
    },

    validatePass: async function(plaintext_password, hashedPassword) {
        return new Promise(function(resolve, reject) {
            bcrypt.compare(plaintext_password, hashedPassword, function(err, response) {
                if (err) {
                    logger.error(`Failed to compare hashed password: ${err}`);
                    reject(err);
                } else {
                    logger.silly("Password comparison succeeded");
                    resolve(hashedPassword);
                }
            })
        })
    }
}