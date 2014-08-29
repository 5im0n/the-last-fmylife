/*!
 * the-last-fmylife
 * Copyright 2014 Simon MAHÉ <mahe.simon@gmail.com>
 * Licensed under AGPL-3.0 (https://www.gnu.org/licenses/agpl.txt)
 */

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

// All the fields requested expect _id //
var fields = '-_id id content date author';


// Create the model for the stories //
module.export = mongoose.model('Storie', storieSchema);
module.export.fields = fields;
