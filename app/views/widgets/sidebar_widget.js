var BaseView = require('../base'),
	StatModel = require('../../models/stats');

module.exports = BaseView.extend({
	events : {
		'click .next' : 'nextStat',
		'click .prev' : 'prevStat'
	},
	postRender : function ( ) {
		if ( !this.setup ) {
			this.setup = true;
			this.model = new StatModel({ 
				loading : true 
			}, { 
				app : this.app 
			});
			
			this.model.sync("read", this.model, {
				success : this.handleStats.bind( this, null ),
				error : this.handleStats.bind( this )
			});


			// then apply the res to this.model
		}
	},
	handleStats : function ( err, res ) {
		// make sure you context is correct `this`
		console.log( res );
		var payload = { stats : [] };
		var keys = Object.keys(res.egood_stats);
		keys.forEach(function(k) {
			payload.stats.push({ 
				key: k,
				value: res.egood_stats[k] 
			});
		});
	
		console.log(payload);

		this.model.set(payload);
		// you will need to rerender to have the new model applied
		this.render();
	},
	statIndex: function(n) {
		return n % this.numberOfStats;
	},
	nextStat: function() {

	},
	prevStat: function() {

	}
});  
// this is important
module.exports.id = 'widgets/sidebar_widget';