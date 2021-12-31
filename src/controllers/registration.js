const user = require("./../models/user");
const logger = require('winston')
const hash = require("./../controllers/hashingValidation").hashPass();
const conflictCheck = require("./checkUserExists")

async function createUser(username, password, role) {
    return new Promise(function(resolve, reject) {
        const hashedPassword = await hash(password);
        const newUser = new user({
            username: username,
            password: hashedPassword,
            role: role
        })
        // save the new user in the database
        newUser.save(function(err, object) {
            if(err) {
                logger.error(`Ran into error while saving user object. ${err}`);
                reject(err);
            } else {
                logger.silly(`Saved user ${object}`)
                resolve(object)
            }
        })
    })

}

module.export = async function(username, password, role) {
    return new Promise(function(resolve, reject) {
        // first check if the current user already exists in the database.
        // we should not allow the addition of a user if it already exists
        if (!await conflictCheck(username)) {
            // means that the conflict check succeeded. we can add the user.
            let userObject = await createUser(username, password, role);
            resolve(userObject);
        } else {
            // if the user already exists and the conflict check fails.
            resolve(false);
        }
    })
}