module.exports = function(app,appEnv) {
    // var helpers = require(__dirname + '/helpers');

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/videocall', function(req, res) {
        res.render('videocall',{
            pat:"placeholder"
        });
    });

}
