'use strict';

/**
 * Module dependencies.
 */
var nconf   = require('nconf'); 
nconf.argv().env().file('configuration.json'); // Load the configuration file

require('./util/database');
var restify           = require('restify');
var storiesController = require('./controllers/stories');


// ---------------------------------------------------------- //
// ---------------------------------------------------------- //



/**
 * Create the server
 */
var server = restify.createServer({ name: nconf.get('server:name'), version: nconf.get('server:version') });
server.use(restify.queryParser());
server.use(restify.bodyParser());	



/**
 * API Home
 * @return The server API name and version
 */
function getHome(req, res, next) {
	res.json({ name: nconf.get('server:name'), version: nconf.get('server:version') });
	return next();
}



/**
 * Define the routes
 */
server.get('/api', getHome);
server.get('/api/posts', storiesController.getStories);
server.get('/api/posts/:id', storiesController.getStory);




/**
 * Launch the server
 */
server.listen(nconf.get('server:port'), nconf.get('server:url'), function () {
	console.log('%s listening at %s', server.name, server.url);
});