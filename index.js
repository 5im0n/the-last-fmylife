'use strict';

/**
 * Module dependencies.
 */
var nconf   = require('nconf'); 
nconf.argv().env().file('config/configuration.json'); // Load the configuration file

require('./util/database');
var restify           = require('restify');
var storiesController = require('./controllers/stories');


// ---------------------------------------------------------- //
// ---------------------------------------------------------- //



/**
 * Create the server
 */
var server = restify.createServer({ name: nconf.get('server-api:name'), version: nconf.get('server-api:version') });
server.use(restify.queryParser());
server.use(restify.bodyParser());	



/**
 * API Home
 * @return The server API name and version
 */
function getHome(req, res, next) {
	res.json({ name: nconf.get('server-api:name'), version: nconf.get('server-api:version') });
	return next();
}



/**
 * Define the routes
 */
server.get(nconf.get('server-api:path'), getHome);
server.get(nconf.get('server-api:path')+'/posts', storiesController.getStories);
server.get(nconf.get('server-api:path')+'/posts/:id', storiesController.getStory);




/**
 * Launch the server
 */
server.listen(nconf.get('server-api:port'), nconf.get('server-api:url'), function () {
	console.log('%s listening at %s', server.name, server.url);
});