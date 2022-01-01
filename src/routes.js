const login = require("./controllers/login")
const register = require("./controllers/registration")
const logger = require('winston');
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send('UP');
    });
    // TODO: Add JOI Validation
    app.post('/login', async function(req, res) {
        // just send the username password combo to the login controller.
        let response = await login(req.body.username, req.body.password);
        if (response !== false) {
            // successful validation and json token
            res.status(200).json({"token": response})

        } else {
        res.json({"Error": "Either user does not exist or wrong password."});
        }
    });

    app.post('/register', async function(req, res) {
        console.log(req.body.username, req.body.password)
        let response = await register(req.body.username, req.body.password, "user");
        if (response !== false) {
            res.status(200).json({"object": response})
        } else {res.status(500).json({"Message": "Failed to create user"})}
        
    })
    return app;
}