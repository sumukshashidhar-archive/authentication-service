module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send('UP');
    });

    app.post('/login', function(req, res) {

    });
    return app;
}