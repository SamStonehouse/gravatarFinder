/* Sexy modular JavaScript */
gravatarGetter = (function(undefined) {
	var baseUrl = 'http://www.gravatar.com/avatar/';

	var defaultOptions = {
		rating: 'g',
		defaultImage: 'mm',
		size: 80,
		extra: {}
	};


	/* See: http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically */
	var mergeOptions = function(defaults, settings){
	    var results = {};
	    for (var attrname in defaults) { results[attrname] = defaults[attrname]; }
	    for (var attrname in settings) { results[attrname] = settings[attrname]; }
	    return results;
	}


	/* See: http://stackoverflow.com/questions/111529/create-query-parameters-in-javascript */
	var encodeQueryData = function (data) {
		var ret = [];
		for (var d in data) {
			ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
		}

		return ret.join("&");
	}

	var getGravatarURL = function(email, opts, callback) {

		//Check if 2nd parameter is options object or callback
		if (!typeof(callback) == "function") {
			callback = opts;
			opts = {};
		}

		//Check if email provided, if not throw a new error
		if (!email) {
			if (typeof(callback) == "function") {
				callback(new Error("No email provided"));
			} 

			return;
		}

		//If options is not defined set it to the default, otherwise merge it with the defaults
		if (!opts) {
			opts = defaultOptions;
		} else {
			opts = mergeOptions(defaultOptions, opts);
		}

		hashedEmail = md5(email.toLowerCase());

		urlData = {
			s: opts.size,
			r: opts.rating,
			d: opts.defaultImage
		}

		//Add any extra options to the url data
		urlData = mergeOptions(opts.extra, urlData);

		//Create query string from URL data
		var urlString = baseUrl + hashedEmail + "?" + encodeQueryData(urlData);

		if (typeof(callback) == "function") {
			callback(null, urlString);
			return;
		} else {
			return urlString;
		}
	}

	return {
		getGravatarURL: getGravatarURL
	}

})(undefined)