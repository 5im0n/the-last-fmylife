/*!
 * the-last-fmylife
 * Copyright 2014 Simon MAHÉ <mahe.simon@gmail.com>
 * Licensed under AGPL-3.0 (https://www.gnu.org/licenses/agpl.txt)
 */

'use strict';

/**
 * Module dependencies.
 */
var restify  = require('restify');
var mongoose = require('mongoose');
var _        = require('underscore');
var Storie   = mongoose.model('Storie');
var nconf    = require('nconf');
var moment   = require('moment');


// ---------------------------------------------------------- //
// ---------------------------------------------------------- //



/**
 * Persist a storie into the database
 */
exports.persist = function(storie){

	Storie.create(storie, function (err) {
		if(err) {
			throw err;
		}
		else {
			console.log('Storie '+storie.id+' correctly save');
		}
	});

};



/**
 * Get stories from the database
 */
exports.getStories = function(req, res, next) {

	var query = {};

	// Build the query //
	_.each(req.params, function(value, index){

		if(index === 'author'){
			query.author = value;
		}
		else if(index === 'from'){
			query.date = {$gte: moment(value, 'YYYY-MM-DD').toDate() };
		}
		else if(index === 'to'){
			query.date.$lt = moment(value, 'YYYY-MM-DD').toDate();
		}

	});


	Storie.find(query, Storie.fields, { limit: nconf.get('fmylife:nbToRetrieve') }, function(err, stories) {
		if(err) {
			return next(new restify.InternalError('Error occur'));
		}
		else {
			console.log('Stories requested');
			res.json(200, { posts: stories, count: _.size(stories) });
			return next();
		}
	});
};



/**
 * Get the story from the database with his ID
 */
exports.getStory = function(req, res, next) {

	var query = {id: req.params.id};

	Storie.findOne(query, Storie.fields, function(err, storie) {
		if(err) {
			return next(new restify.InternalError('Error occur'));
		}
		else {
			console.log('Storie %d requested', query.id);
			res.json(200, { post: storie });
			return next();
		}
	});
};



/**
 * Delete the story from the database with his ID
 */
exports.deleteStory = function(req, res, next) {

	var query = { id: req.params.id };

	Storie.remove(query, function(err) {
		if(err) {
			return next(new restify.InternalError('Error occur'));
		}
		else {
			console.log('Storie %d deleted', query.id);
			res.json(204);
			return next();
		}
	});
};



/**
 * Drop all stories from the database
 */
exports.dropAll = function() {
	Storie.remove({}, function(err){
		if(err) {
			throw err;
		}
		else {
			console.log('Stories collection correctly dropped');
		}
	});
};