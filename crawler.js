'use strict';


/**
 * Module dependencies.
 */
var nconf   = require('nconf');
var Crawler = require('crawler').Crawler;
var _s      = require('underscore.string');


// Load the configuration file //
nconf.argv().env().file('configuration.json');


/**
 * Create the crawler
 */
var c = new Crawler({

	"maxConnections": 10,
	"forceUTF8": true,

	"callback": function(error, result, $){

		//console.log(error);
		//console.log(result);

		

		$(nconf.get('fmylife:domElement')).each(function(i, item){

			// Create the article //
			var article = {};

			// Retrieve the id and the text //
			article.id = item.id;
			article.text = $(this).find('p:first').text();

			
			// Retrieve the date and the Author //
			var dirtyString = $(this).find('p:last').text();
			var reg = /Le|à|Ã/i;

			article.author = _s.clean(_s.strRight(dirtyString, '- par'));
			article.date = _s.clean(_s.strLeft(dirtyString, ' -')).replace(reg, '');


			console.log(article);
				
		});
	}

	
});


// Queue just one URL, with default callback
c.queue(nconf.get('fmylife:url'));