module.exports = function(app) {
    // var helpers = require(__dirname + '/helpers');

    app.get('/', function(req, res) {
        res.render('main');
    });

    app.get('/video', function(req, res) {
        res.render('video');
    });

    // app.get('/chat', function(req, res) {
    //     res.render('chat');
    //
    // });
}
