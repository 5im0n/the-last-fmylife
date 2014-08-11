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

require('../util/database');
var restify = require('restify');
var assert  = require('assert');
var storiesController = require('../controllers/stories');


// ---------------------------------------------------------- //
// ---------------------------------------------------------- //



// Build API URL //
var url = 'http://'+nconf.get('server-api:url')+':'+nconf.get('server-api:port');


// Create the test client //
var client = restify.createJsonClient({ url: url, version: '*' });



describe('Server API', function() {
	
	// Test #1 - Server API is alive //
	describe('alive', function() {
		it('should return a HTTP 200 response', function(done) {
			
			client.get(nconf.get('server-api:path'), function(err, req, res) {
				if(err) {
					throw new Error(err);
				}
				else {
					assert.equal(res.statusCode, 200);
					done();
				}
			});
		});
	});


	// Test #2 - Server API return correct result //
	describe('/posts/id', function() {

		var mockStory = {
			id: 120590,
			content : "fmylife content",
			date: Date.now(),
			author: "Simon"
		};

		// Save the story in the database //
		before(function(){
			storiesController.persist(mockStory);
		});

		// Delete all stories from the database //
		after(function(){
			storiesController.dropAll();
		});

		it('should return storie with author\'s name Simon', function(done) {
			
			client.get(nconf.get('server-api:path')+'/posts/'+mockStory.id, function(err, req, res, data) {

				if(err) {
					throw new Error(err);
				}
				else {
					assert.equal(data.post.author, 'Simon');
					done();
				}
			});
		});
	});

});