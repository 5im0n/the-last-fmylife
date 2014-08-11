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
function persist(storie){

	Storie.create(storie, function (err) {
		if(err) { 
			throw err;
		}
		else {
			console.log('Storie '+storie.id+' correctly save');
		}
	});

}



/** 
 * Get stories from the database
 */
function getStories(req, res, next) {
	
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
}



/** 
 * Get the story from the database with his ID
 */
function getStory(req, res, next) {

	var query = {id: req.params.id};

	Storie.findOne(query, Storie.fields, function(err, storie) { 
		if(err) {
			return next(new restify.InternalError('Error occur'));
		}
		else {
			console.log('Storie '+query.id+' requested');
			res.json(200, { post: storie });
			return next();
		}
	});
}



/** 
 * Drop all stories from the database
 */
function dropAll() {
	Storie.remove({}, function(err){
		if(err) {
			throw err;
		}
		else {
			console.log('Stories collection correctly dropped');	
		}
	});
}


exports.persist    = persist;
exports.getStories = getStories;
exports.getStory   = getStory;
exports.dropAll    = dropAll;