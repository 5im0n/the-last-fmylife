'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Storie = mongoose.model('Storie');


// ---------------------------------------------------------- //
// ---------------------------------------------------------- //



/** 
 * Persist a stories into the database
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
 * Get the stories from the database
 */
function getStories(req, res, next) {
	res.json({ message: "All the posts" });
	return next();
}



/** 
 * Get the story from the database with his ID
 */
function getStory(req, res, next) {

	var query = {id: req.params.id};
	
	Storie.findOne(query, Storie.fields, function(err, storie) { 
		if(err) {
			throw err;
		}
		else {
			console.log('Storie '+query.id+' requested');
			res.json({ post: storie });
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


exports.persist = persist;
exports.getStories = getStories;
exports.getStory = getStory;
exports.dropAll = dropAll;