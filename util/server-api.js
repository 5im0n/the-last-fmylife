/*!
 * the-last-fmylife
 * Copyright 2014 Simon MAHÉ <mahe.simon@gmail.com>
 * Licensed under AGPL-3.0 (https://www.gnu.org/licenses/agpl.txt)
 */

'use strict';

/**
 * Module dependencies.
 */
var nconf   = require('nconf');
nconf.argv().env().file('config/configuration.json'); // Load the configuration file

require('./database');
var restify           = require('restify');
var storiesController = require('../controllers/stories');


// ---------------------------------------------------------- //
// ---------------------------------------------------------- //



/**
 * Create the server
 */
var server = restify.createServer({ name: nconf.get('server-api:name'), version: nconf.get('server-api:version') });
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());



/**
 * API Home
 * @return The server API name and version
 */
function getHome(req, res, next) {
	res.json(200, { name: nconf.get('server-api:name'), version: nconf.get('server-api:version') });
	return next();
}



/**
 * Define the routes
 */
server.get(nconf.get('server-api:path'), getHome);
server.get(nconf.get('server-api:path') + '/posts', storiesController.getStories);
server.get(nconf.get('server-api:path') + '/posts/:id', storiesController.getStory);
server.del(nconf.get('server-api:path') + '/posts/:id', storiesController.deleteStory);



// Export the server //
module.exports = server;
