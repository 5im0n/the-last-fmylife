# the-last-fmylife

Lightweight app to retrieve (with a web crawler) and expose (with REST API) the last [fmylife](http://www.viedemerde.fr/) stories. This application is fully developed in JavaScript.

[![Build Status](http://img.shields.io/travis/5im0n/the-last-fmylife/master.svg?style=flat-square)](https://travis-ci.org/5im0n/the-last-fmylife)
[![devDependency Status](https://david-dm.org/5im0n/the-last-fmylife.svg?style=flat)](https://david-dm.org/5im0n/the-last-fmylife#info=dependencies)



## Quick start


### Requirements

To use this app you need to install:

 - [Node JS](http://nodejs.org/)
 - [NPM](https://www.npmjs.org/)
 - [Mongo DB](http://www.mongodb.org/)


### Initial setup

1. Clone this project: `git clone git@github.com:5im0n/the-last-fmylife.git`
2. Install all dependencies with NPM: `npm install`
3. Go to the `config/configuration.json` file and update it to fit your preferences.


### How to use

1. Retrieve (with the web crawler) and save the last fmylife stories with `npm run crawler`
2. Then to expose the fmylife stories with a REST API run `npm start`.


### API documentation

Fetch the stories `/api/posts`. You can use params: author, from and to like: `/api/posts?author=simon&from=2014-01-01&to=2014-12-31`
```json
{
	"posts": [
		{
			"id": 1,
			"content" : "fmylife content",
			"date": "2014-01-01 00:00",
			"author": "Genius"
		}
	],
	"count": 1
}
```
Fetch a story with its id `/api/posts/:id`
```json
{
	"post": {
		"id": 1,
		"content" : "fmylife content",
		"date": "2014-01-01 00:00",
		"author": "Genius"
	}
}
```


## Test

To test the API server and find source code errors (with JSHint) just run `npm test`



## Changelog

 - **0.5.0**: Web crawler to retrieve the fmylife stories
 - **0.9.0**: Server API to expose the fmylife stories
 - **1.0.0**: Add tests



## Versioning

This project is maintained under [the Semantic Versioning guidelines](http://semver.org/).



## Copyright and license

Code and documentation copyright Simon MAHE, Code released under [the GPL-V3 license](LICENSE).