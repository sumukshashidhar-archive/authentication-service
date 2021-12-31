const user = require("./../models/user");
const findUser = require("./checkUserExists")

module.exports = async function(username, password) {
    return new Promise(function(resolve, reject) {
        // first, make sure that we find the user.
        const userObject = await findUser(username);
        if (userObject) {
            // means that this is not false, and the user exists
            
        } else {
            // the user was not found
            resolve(false);
        }
    })
}
