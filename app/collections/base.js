var RendrBase = require('rendr/shared/base/collection');
module.exports = RendrBase.extend({
	parse : function ( data ) {
		console.log(data, "data")
		/* You can parse the data you get back from the server here
		 * then you return an array of objects
		 */
		return data;
	}
});
