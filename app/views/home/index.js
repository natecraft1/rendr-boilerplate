var BaseView = require('../base'),
	StatModel = require('../../models/stats'),
	WidgetView = require('../widgets/sidebar_widget');

module.exports = BaseView.extend({
	events : {
		'click .next' : 'nextStat',
		'click .prev' : 'prevStat'
	},
	initialize: function () {
	},
	postRender : function ( ) {

		// i dont know if we need logic in here 
	},
	handleStats : function ( err, res ) {

	}
});
// this is important
module.exports.id = 'home/index';