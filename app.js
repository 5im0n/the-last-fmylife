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
var server = require('./util/server-api');


// ---------------------------------------------------------- //
// ---------------------------------------------------------- //



/**
 * Launch the server
 */
server.listen(nconf.get('server-api:port'), nconf.get('server-api:url'), function () {
	console.log('%s listening at %s', server.name, server.url);
});