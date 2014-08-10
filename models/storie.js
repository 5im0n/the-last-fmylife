'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');


// ---------------------------------------------------------- //
// ---------------------------------------------------------- //



// Create schema for the stories //
var storieSchema = new mongoose.Schema({
	id      : { type: Number, min: 0 },
	content : { type: String, default: '' },
	date    : { type: Date, default: Date.now },
	author  : { type: String, default: '' }
});


// Create the model for the stories //
var Storie = module.export = mongoose.model('Storie', storieSchema);