const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const logger = require('winston');

const publicKeyPath = path.join(__dirname, './../keys/public.pem');
const privateKeyPath = path.join(__dirname, './../keys/private.pem');

// key imports
const publicKEY = fs.readFileSync(publicKeyPath, "utf-8")
const privateKEY = fs.readFileSync(privateKeyPath, "utf-8")

// token signing options
const tokenOptions = require("./../config/tokenOptions");


module.exports = {
    sign: async function (username, role) {
        return new Promise(function (resolve, reject) {
            jwt.sign({ username: username, role: role }, privateKEY, tokenOptions.signOptions, function (err, signedToken) {
                if (err) {
                    logger.error(`Failed to sign token ${err}`);
                    reject(err);
                } else {
                    logger.info(`Signed a token for ${username}`);
                    resolve(signedToken);
                }
            })
        })
    },

    verification: async function (passedToken) {
        return new Promise(function (resolve, reject) {
            jwt.verify(passedToken, publicKEY, tokenOptions.verifyOptions, function (err, decodedToken) {
                if (err) {
                    logger.error(`Failed to validate token ${err}`);
                    reject(err);
                } else {
                    logger.info(`Decoded a token ${decodedToken}`);
                    resolve(decodedToken);
                }
            })
        })
    }
}