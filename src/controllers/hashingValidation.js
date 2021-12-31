const bcrypt = require("bcrypt")

module.exports = {
    hashPass: async function(plaintext_password) {
        return new Promise(function(resolve, reject) {
            bcrypt.hash(plaintext_password, process.env.SALT_ROUNDS, function(err, hashedPassword) {
                if (err) {
                    reject(err);
                } else {
                    resolve(hashedPassword);
                }
            })
        })
    }
}