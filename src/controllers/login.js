const user = require("./../models/user");
const findUser = require("./checkUserExists");
const compareHash = require("./../controllers/hashingValidation").validatePass();
const signJWT = require("./jwtSignValidate").sign()

module.exports = async function(username, password) {
    return new Promise(function(resolve, reject) {
        // first, make sure that we find the user.
        const userObject = await findUser(username);
        if (userObject) {
            // means that this is not false, and the user exists
            if (await compareHash(password, userObject.password)) {
                // if this is true, comparison is fine, we want to sign a jwt object and send it over.  
                let jwtToken = await signJWT(userObject.username, userObject.role);
                resolve(jwtToken);
            }
        }
        // smart way of conditionals
        resolve(false);
    })
}
