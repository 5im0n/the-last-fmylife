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
nconf.argv().env().file('config/configuration.json'); // Load the configuration file

require('./database');
var Crawler           = require('crawler').Crawler;
var _s                = require('underscore.string');
var moment            = require('moment');
var storiesController = require('../controllers/stories');



var nbStoriesCrawled = 0; // The number of crawle stories
var currentCrawlingPage = 0; // The current page being crawl

moment.locale('fr'); // Set the moment locale to Fr


// ---------------------------------------------------------- //
// ---------------------------------------------------------- //



/**
 * Create the crawler
 */
var c = new Crawler({

	maxConnections: 10,
	forceUTF8: true,

	callback: function(error, result, $) {


		var nbItemsToParseInThePage = $(nconf.get('fmylife:domElement')).length; // Nb of stories to parse in the current page
		var nbItemsCrawledInThePage = 0; // Number of stories who have been parse in the current page


		/**
		 * Loop on each DOM storie elements
		 */
		$(nconf.get('fmylife:domElement')).each(function(i, item) {

			// If the number of requested stories isn't reach parse it //
			if (nbStoriesCrawled < nconf.get('fmylife:nbToRetrieve')) {

				nbStoriesCrawled++;
				nbItemsCrawledInThePage++;


				// Create the storie object //
				var storie = {};

				// Retrieve the id and the text //
				storie.id = item.id;
				storie.content = $(this).find('p:first').text();

				// Retrieve the date and the Author //
				var dirtyString = $(this).find('div.right_part p:nth-child(2)').text();

				storie.author = _s.clean(_s.strRight(dirtyString, '- par'));
				storie.date = moment(_s.clean(_s.strLeft(dirtyString, ' -')), 'DD/MM/YYYY HH:mm');


				// Persist the storie in the database //
				storiesController.persist(storie);


				// Crawl the next page if the number of requested stories isn't reach //
				if (nbStoriesCrawled < nconf.get('fmylife:nbToRetrieve') && nbItemsToParseInThePage === nbItemsCrawledInThePage){
					currentCrawlingPage++;
					console.log('### Crawing the next page: ' + currentCrawlingPage);
					c.queue(nconf.get('fmylife:url') + currentCrawlingPage);
				}
			}

		});
	},


	/**
	 * Display message when the crawler has finished its work
	 */
	onDrain: function() {
		console.log('### The requested number of fmylife stories have been crawled ###');
	}


});


// Clear the stories collection before to crawl //
storiesController.dropAll();

// Start the crawler //
console.log('### Crawler starting ###');
c.queue(nconf.get('fmylife:url'));
