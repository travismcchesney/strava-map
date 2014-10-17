var express = require('express');

var handlebars = require('express-handlebars').create();
var routes = require('./routes');
var runs = require('./routes/runs');

var http = require('http');
var path = require('path');

var config = require('./config');

var app = express();

// all environments
app.set('port', process.env.PORT || 2997);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon("./public/images/favicon.ico"));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
config.strava_response_type = 'code';
config.strava_redirect_uri = 'http://localhost:2779/oauth/callback';
config.strava_scope = 'view_private';
config.strava_state = 'strava-map';
config.strava_approval_prompt = 'force';
config.strava_client_id = 'TODO';
config.strava_client_secret = '51a543276876e867b683ac0bd420624787170d59';


// GET /
app.get('/', routes.index(config.strava_response_type, config.strava_redirect_uri, config.strava_scope,
   config.strava_state, config.strava_approval_prompt, config.strava_client_id, config.strava_client_secret));

// GET /oauth/callback
app.get('/oauth/callback', runs.list(config.strava_client_id, config.strava_client_secret, 'TODO - CODE'));

http.createServer(app).listen(app.get('port'), function () {
  console.log('Strava Map listening on port ' + app.get('port'));
});
