module.exports = function(app,appEnv) {
    // var helpers = require(__dirname + '/helpers');


    app.get('/', function(req, res) {
        res.render('index',{
            peer: appEnv.port

        });
    });

}
