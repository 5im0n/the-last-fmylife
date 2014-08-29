/*!
 * the-last-fmylife
 * Copyright 2014 Simon MAHÉ <mahe.simon@gmail.com>
 * Licensed under AGPL-3.0 (https://www.gnu.org/licenses/agpl.txt)
 */

module.exports = function(grunt) {

	'use strict';

	var jsFiles = ['Gruntfile.js', 'controllers/**/*.js', 'models/**/*.js', 'util/**/*.js', 'test/**/*.js'];

	grunt.initConfig({


		// Check JS Files //
		jshint: {
			options: {
				jshintrc: 'config/.jshintrc'
			},
			all: jsFiles
		},


		// Check Style JS Files //
		jscs: {
			options: {
				config: 'config/.jscsrc'
			},
			main: jsFiles
		}


	});


	// Load the Tasks //
	require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });


	// Check tasks //
	grunt.registerTask('check', ['jshint', 'jscs']);

};
