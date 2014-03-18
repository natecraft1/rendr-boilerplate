var utils = require('rendr/server/utils'),
	fs = require("fs"),
	path = require("path"),
	_ = require('underscore'),
	url = require('url'),
	qs = require("qs"),
	request = require('request'),
	debug = require('debug')('app:DataAdapter'),
	returned = require('debug')('app:DataAdapter:return'),
	inspect = require('util').inspect;

module.exports = DataAdapter;


function DataAdapter(options) {
	this.options = options || {};
}

//
// `req`: Actual request object from Express/Connect.
// `api`: Object describing API call; properties including 'path', 'query', etc.
//        Passed to `url.format()`.
// `options`: (optional) Options.
// `callback`: Callback.
//

DataAdapter.prototype.request = function(req, api, options, callback) {

	var _this = this, start, end, route, query;

	if (arguments.length === 3) {
		callback = options;
		options = {};
	}

	options = _.clone(options);
	_.defaults(options, {
		convertErrorCode: true,
		allow4xx: false
	});

	this.preFormat( api, req );

	start = new Date().getTime();
	// getting rid of query string
	query = /\?/g;
	api.url = (query.test(api.url)) ? api.url.split(/\?/g)[0] : api.url;

	debug( "%s", inspect(api.headers) );

	request(api, function(err, response, body) {

		returned("%s <<<", body);
	
		if (err) return callback(err);
	
		end = new Date().getTime();
		debug('%s %s %s %sms', api.method.toUpperCase(), api.url, response.statusCode, end - start);
		debug('%s', inspect(response.headers));

		// _this.proxyCookies(req, response); 

		if (options.convertErrorCode) {
			err = _this.getErrForResponse(response, {allow4xx: options.allow4xx});
		}

		var obj;
		debug('%s <<<content-type', /json/gi.test( response.headers["content-type"] ) );

		body = body.trim();

		if( /json/gi.test( response.headers["content-type"] ) && /^[\[{]/.test( body ) ){

			try {
				obj = JSON.parse(body);
			} catch ( e ){
				obj = null
				err = e.message;
				response.statusCode = 500;

			}

			body = obj || { error : { system : [err] } } ;

		}else{
			body = { error : { system : ["API returned an improper type of data"], body : body } }
			response.statusCode = 500;
		}

		_this.handleResponse(err, api, body, req, response, callback );	
	});
};

DataAdapter.prototype.handleResponse = function(err, api, body, req, response, callback){
 	callback(err, response, body); 
};


// preformats the data and sets the default data
DataAdapter.prototype.preFormat = function( api, req ){

	if( api.method === "POST" || api.method === "PUT" ){
		api.query = api.body
	}
	
	api = this.apiDefaults(api, req);
	api.method = "POST";
	api.headers['Content-Type'] = (/multipart/.test(req.headers["content-type"])) ? req.headers["content-type"] : "application/x-www-form-urlencoded" ; 

	// super hack from spac

	if ( typeof api.query === 'object' && api.query ) {
		api.body = qs.stringify(api.query);
	}

};

DataAdapter.prototype.apiDefaults = function(api, req) {
	var urlOpts, basicAuth, authParts;

	urlOpts = _.defaults(_.pick(api, 'protocol', 'port', 'query'), _.pick(this.options, ['protocol', 'port', 'host']));
	urlOpts.pathname = api.path || api.pathname;

	api = _.defaults(api, {
		method: 'POST',
		url: url.format(urlOpts),
		headers: {}
	});

	 debug("%s \\n\\n\<----cookies\n\\n", inspect(req.cookies) )
	 debug('%s <-time', +new Date( ) + url.format(urlOpts) );

	// Add in our custom keys, eventualy pass unique keys for each user
	if (api.headers['User-Agent'] == null) {
		api.headers['User-Agent'] = 'Rendr Test App; Node.js';
		api.headers['Content-Type'] = "application/x-www-form-urlencoded"
		api.headers['Connection'] = "keep-alive"	
	}
	return api;
};

// Convert 4xx, 5xx responses to be errors.
DataAdapter.prototype.getErrForResponse = function(res, options) {
	var status, err;
	status = +res.statusCode;
	err = null;
	if (utils.isErrorStatus(status, options)) {
		err = new Error(status + " status");
		err.status = status;
		err.body = res.body;
	}
	return err;
};
