const login = require("./controllers/login")
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send('UP');
    });
    // TODO: Add JOI Validation
    app.post('/login', function(req, res) {
        // just send the username password combo to the login controller.
        let response = await login(req.body.username, req.body.password);
        if (response !== false) {
            // successful validation and json token
            res.status(200).json({"token": response})

        }
        res.json({"Error": "Either user does not exist or wrong password."});
    });
    return app;
}