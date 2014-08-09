'use strict';


/**
 * Module dependencies.
 */
var nconf   = require('nconf');
var Crawler = require('crawler').Crawler;
var _s      = require('underscore.string');

// Load the configuration file //
nconf.argv().env().file('configuration.json');


var nbStoriesCrawled = 0; // The number of crawle stories
var currentCrawlingPage = 0; // The current page being crawl



/**
 * Create the crawler
 */
var c = new Crawler({

	"maxConnections": 10,
	"forceUTF8": true,

	"callback": function(error, result, $){

		//console.log(error);
		//console.log(result);

		//console.log(error);
		//return new Error("Error appends");

		var nbItemsToParseInThePage = $(nconf.get('fmylife:domElement')).length; // Nb of stories to parse in the current page
		var nbItemsCrawledInThePage = 0; // Number of stories who have been parse in the current page 

		
		// Loop on each DOM item element // 
		$(nconf.get('fmylife:domElement')).each(function(i, item){

			// If the number of requested stories isn't reach parse it //
			if(nbStoriesCrawled < nconf.get('fmylife:nbToRetrieve')) {

				nbStoriesCrawled++;
				nbItemsCrawledInThePage++;


				// Create the storie //
				var storie = {};

				// Retrieve the id and the text //
				storie.id = item.id;
				storie.text = $(this).find('p:first').text();

				// Retrieve the date and the Author //
				var dirtyString = $(this).find('p:last').text();
				var reg = /Le|à|Ã/i;

				storie.author = _s.clean(_s.strRight(dirtyString, '- par'));
				storie.date = _s.clean(_s.strLeft(dirtyString, ' -')).replace(reg, '');


				// Crawl the next page if the number of requested stories is not reached //
				if(nbStoriesCrawled < nconf.get('fmylife:nbToRetrieve') && nbItemsToParseInThePage === nbItemsCrawledInThePage){
					currentCrawlingPage++;
					console.log('# Crawing the next page: '+currentCrawlingPage);
					c.queue(nconf.get('fmylife:url')+currentCrawlingPage);
				}

				console.log(nbStoriesCrawled);
			}

		});
	},

	onDrain: function(){
		console.log('### The requested number of fmylife stories have been crawled ###');
	}

	
});


// Queue just one URL, with default callback
console.log("### Crawler starting ###");
c.queue(nconf.get('fmylife:url'));