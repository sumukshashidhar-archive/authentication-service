const user = require("./../models/user");
const logger = require('winston')
module.exports = async function (username) {
    /**
     * Given a username, checks for a conflict in the database.
     */
    return new Promise(function(resolve, reject) {
        user.findOne({username: username}, function(err, object) {
            if(err) {
                logger.error(`Failed in the user check process ${err}`)
                reject(err);
            } else {
                // now check if the object is null.
                if (object) {
                    // object is not null
                    logger.silly(`User already exists: ${object}`)
                    resolve(object);
                } else {
                    logger.silly(`Did not find any user. Can continue.`)
                    resolve(false);
                }
            }
        })
    })
}