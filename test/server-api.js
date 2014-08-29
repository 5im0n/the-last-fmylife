/*!
 * the-last-fmylife
 * Copyright 2014 Simon MAHÉ <mahe.simon@gmail.com>
 * Licensed under AGPL-3.0 (https://www.gnu.org/licenses/agpl.txt)
 */

'use strict';

/**
 * Module dependencies.
 */
var nconf             = require('nconf');

var restify           = require('restify');
var assert            = require('assert');
var _                 = require('underscore');
var serverAPI         = require('../util/server-api');
var storiesController = require('../controllers/stories');



// ---------------------------------------------------------- //
// ---------------------------------------------------------- //



describe('Server API', function() {

	// Build API URL //
	var url = 'http://' + nconf.get('server-api:url') + ':' + nconf.get('server-api:port');

	// Create the test client //
	var client = restify.createJsonClient({ url: url, version: '*' });


	var mockStories = [
		{ id: 120591, content: 'fmylife content', date: new Date('2014', '01', '01'), author: 'Simon' },
		{ id: 120592, content: 'fmylife content', date: new Date('2014', '05', '01'), author: 'Jeff' },
		{ id: 120593, content: 'fmylife content', date: new Date('2014', '10', '25'), author: 'Simon' },
		{ id: 120594, content: 'fmylife content', date: new Date('2014', '11', '30'), author: 'Simon' }
	];


	// Before lauching the test //
	before(function(done) {

		// Launch the server and save the mock stories //
		serverAPI.listen(nconf.get('server-api:port'), nconf.get('server-api:url'), function () {
			console.log('%s listening at %s', serverAPI.name, serverAPI.url);

			storiesController.dropAll();

			_.each(mockStories, function(s) {
				storiesController.persist(s);
			});

			done();
		});
	});


	// After the tests was perfomed //
	after(function() {
		storiesController.dropAll();
		serverAPI.close();
	});



	/**
	 * Test #1 - Server API is alive
	 */
	it('should return a HTTP 200 response', function(done) {

		client.get(nconf.get('server-api:path'), function(err, req, res) {
			if (err) {
				throw new Error(err);
			}
			else {
				assert.equal(res.statusCode, 200);
				done();
			}
		});
	});



	/**
	 * Test #2 - Server API return the story with his ID
	 */
	it('should get the correct story with his id', function(done) {

		client.get(nconf.get('server-api:path') + '/posts/120592', function(err, req, res, data) {

			if (err) {
				throw new Error(err);
			}
			else {
				assert.equal(data.post.author, 'Jeff');
				assert.equal(data.post.id, 120592);
				done();
			}
		});
	});



	/**
	 * Test #3 - Server API return the stories create by an author
	 */
	it('should return stories create by author Simon', function(done) {

		client.get(nconf.get('server-api:path') + '/posts?author=Simon', function(err, req, res, data) {

			if (err) {
				throw new Error(err);
			}
			else {
				assert.equal(data.count, 3);
				done();
			}
		});
	});



	/**
	 * Test #4 - Server API return the stories create from :date to :date
	 */
	it('should return stories create from :date to :date', function(done) {

		client.get(nconf.get('server-api:path') + '/posts?from=2014-08-01&to=2014-12-31', function(err, req, res, data) {

			if (err) {
				throw new Error(err);
			}
			else {
				assert.equal(data.count, 2);
				done();
			}
		});
	});



	/**
	 * Test #5 - Server API delete the stories with his ID
	 */
	it('should delete story with his id', function(done) {

		client.del(nconf.get('server-api:path') + '/posts/120592', function(err) {
			assert.ifError(err);

			if (err) {
				throw new Error(err);
			}
			else {
				client.get(nconf.get('server-api:path') + '/posts/120592', function(err, req, res, data) {

					if (err) {
						throw new Error(err);
					}
					else {
						assert.equal(data.post, null);
						done();
					}
				});
			}
		});
	});

});
