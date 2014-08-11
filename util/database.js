/*!
 * the-last-fmylife
 * Copyright 2014 Simon MAHÉ <mahe.simon@gmail.com>
 * Licensed under AGPL-3.0 (https://www.gnu.org/licenses/agpl.txt)
 */
 
'use strict';

/**
 * Module dependencies.
 */
var nconf    = require('nconf');
var mongoose = require('mongoose');


// ---------------------------------------------------------- //
// ---------------------------------------------------------- //



// Build the connection URI //
var dbURI = nconf.get('mongodb:host')+nconf.get('mongodb:database');

// Create the database connection //
mongoose.connect(dbURI);



/**
 * CONNECTION EVENTS
 */

// When connected //
mongoose.connection.on('connected', function() {
	console.log('Mongoose connection open to ' + dbURI);
});

// If the connection throws an error //
mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error: ' + err);
});

// When the connection is disconnected //
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose connection disconnected');
});

// If the Node process ends, close the Mongoose connection //
process.on('SIGINT', function() {
	mongoose.connection.close(function() {
    	console.log('Mongoose disconnected');
    	process.exit(0);
	});
});



/**
 * Import Schémas and Models
 */
require('../models/storie');