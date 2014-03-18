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
		// if ( !this.init ) {
		// 	this.init = true;
		// 	// this.model = new StatModel({}, { app : this.app });
		// 	console.log(this.model.sync);
		// 	// this.model.sync({
		// 	//         success: function (data) {
		// 	//         	console.log(data, "data");
		// 	//         }
		// 	//     });
		// 	// this.model.sync("read", this.model, {
		// 	// 	success : this.handleStats.bind( this, null ),
		// 	// 	error : this.handleStats.bind( this )
		// 	// });
		// 	// then apply the res to this.model
		// 
		// this.el.append(this.widget)

	},
	handleStats : function ( err, res ) {
		// make sure you context is correct `this`
		// console.log( res );
		// this.model.set(res.egood_stats);
		// console.log(this.model.toJSON());
		// you will need to rerender to have the new model applied

	}
});
// this is important
module.exports.id = 'home/index';