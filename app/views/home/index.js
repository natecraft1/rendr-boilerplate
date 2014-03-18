var BaseView = require('../base'),
	StatModel = require('../../models/stats');

module.exports = BaseView.extend({
	events : {
		'click .next' : 'nextStat',
		'click .prev' : 'prevStat'
	},
	postRender : function ( ) {
		if ( !this.init ) {
			this.init = true;
			this.model = new StatModel({}, { app : this.app });
			// use this.model.sync
			// then apply the res to this.model
		}
	},
	handleStats : function ( err, res ) {
		// make sure you context is correct `this`
		console.log( arguments );
		// you will need to rerender to have the new model applied
		// this.render();
	}
});
// this is important
module.exports.id = 'home/index';