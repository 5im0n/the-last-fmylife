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
var persist = function(storie){

	Storie.create(storie, function (err) {
		if (err) { 
			throw err;
		}
		else{
			console.log('Storie '+storie.id+' correctly save');
		}
	});

}


/** 
 * Drop all stories from the database
 */
var dropAll = function(){
	Storie.remove({}, function(err){
		console.log('Stories collection correctly dropped');
	})
}

exports.persist = persist;
exports.dropAll = dropAll;