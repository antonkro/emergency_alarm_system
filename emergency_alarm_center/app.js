var express = require('express');
var app = express();
var server = require('http').Server(app);



// app enviroment ======================================================================
var argv = require( 'argv' );
var args = argv.run();
var cfenv = require( 'cfenv' );

var appEnv = cfenv.getAppEnv();
appEnv.port= args.targets[0];
// configure app ======================================================================
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//ressources ======================================================================
app.use(express.static(__dirname + '/views/ressources'));

// internal modules ======================================================================
require(__dirname + '/routes.js')(app,appEnv);
require(__dirname + '/events.js')(app);

// app.listen(appEnv.port);
// server.listen(0, "0.0.0.0", function (req, res) {
  // console.log("Server starting on " + appEnv.url);
// });
server.listen(appEnv.port, appEnv.bind, function() {
    console.log("server started on " + appEnv.bind + " on port: "+ appEnv.port)
})