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
var _       = require('underscore');
var storiesController = require('../controllers/stories');


// ---------------------------------------------------------- //
// ---------------------------------------------------------- //



// Build API URL //
var url = 'http://'+nconf.get('server-api:url')+':'+nconf.get('server-api:port');


// Create the test client //
var client = restify.createJsonClient({ url: url, version: '*' });



describe('Server API', function() {


	// Clean the database after each test //
	afterEach(function(){
		storiesController.dropAll();
	});


	
	/**
	 * Test #1 - Server API is alive
	 */
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



	/**
	 * Test #2 - Server API return the story with his ID
	 */
	describe('/posts/id', function() {

		var mockStory = { id: 120590, content : 'fmylife content', date: Date.now(), author: 'Simon' };

		// Save the story in the database //
		before(function() {
			storiesController.persist(mockStory);
		});


		it('should get the correct story with his id', function(done) {
			
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



	/**
	 * Test #3 - Server API return the stories create by an author
	 */
	describe('/posts?author=:author', function() {

		var mockStories = [
			{ id: 120591, content : 'fmylife content', date: Date.now(), author: 'Simon' },
			{ id: 120592, content : 'fmylife content', date: Date.now(), author: 'Jeff' },
			{ id: 120593, content : 'fmylife content', date: Date.now(), author: 'Simon' },
			{ id: 120594, content : 'fmylife content', date: Date.now(), author: 'Simon' }
		];

		// Save the story in the database //
		before(function() {
			_.each(mockStories, function(s) {
				storiesController.persist(s);
			});
		});


		it('should return stories create by author Simon', function(done) {
			
			client.get(nconf.get('server-api:path')+'/posts?author=Simon', function(err, req, res, data) {

				if(err) {
					throw new Error(err);
				}
				else {
					assert.equal(data.count, 3);
					done();
				}
			});
		});
	});



	/**
	 * Test #4 - Server API return the stories create from :date to :date
	 */
	describe('/posts?from=:from&to=:to', function() {

		var mockStories = [
			{ id: 120591, content : 'fmylife content', date: new Date('2014', '01', '01'), author: 'Simon' },
			{ id: 120592, content : 'fmylife content', date: new Date('2014', '05', '01'), author: 'Jeff' },
			{ id: 120593, content : 'fmylife content', date: new Date('2014', '10', '25'), author: 'Simon' },
			{ id: 120594, content : 'fmylife content', date: new Date('2014', '11', '30'), author: 'Simon' }
		];

		// Save the story in the database //
		before(function() {
			_.each(mockStories, function(s) {
				storiesController.persist(s);
			});
		});


		it('should return stories create from :date to :date', function(done) {
			
			client.get(nconf.get('server-api:path')+'/posts?from=2014-08-01&to=2014-12-31', function(err, req, res, data) {

				if(err) {
					throw new Error(err);
				}
				else {
					assert.equal(data.count, 2);
					done();
				}
			});
		});
	});

});