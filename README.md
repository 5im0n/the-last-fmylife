# the-last-fmylife

Lightweight app to retrieve (with a web crawler) and expose (with REST API) the last [fmylife](http://www.viedemerde.fr/) stories. This application is fully developed in JavaScript.



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

1. Crawl and save the last fmylife stories with `npm run crawler`
2. Then to expose the fmylife stories with a REST API run `npm start`. 


## Test

1. Find source code errors with JSHint: `npm test`



## Versioning

This project is maintained under [the Semantic Versioning guidelines](http://semver.org/).



## Copyright and license

Code and documentation copyright Simon MAHE, Code released under [the GPL-V3 license](LICENSE).