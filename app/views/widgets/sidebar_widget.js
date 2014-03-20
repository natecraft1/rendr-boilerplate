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
		var payload = { stats : [] };
		var keys = Object.keys(res.egood_stats);
		keys.forEach(function(k) {
			// this is just to reformat the strings
			var K = k.split("_").map(function(w){ 
			  var first = w[0].toUpperCase();
			  w = w.substr(1);
			  return first + w;
			}).join(" ");

			payload.stats.push({ 
				key: K,
				value: res.egood_stats[k] 
			});
		});
		this.model.set(payload);
		// you will need to rerender to have the new model applied
		this.render();
		this.$stats = $(".stat");

		this.setupElements();

	},
	setupElements: function() {

		this.$stats.each(function(i) {
			$(this).css("left", i*220 + 20);
		});
	},
	nextStat: function(e) {
		var len = this.$stats.length;
		if ($(this.$stats[len-1]).position().left !== 20) {
			this.$stats.each(function(i) {
				var left = $(this).position().left;
				$(this).animate({left: left - 220 + 'px'}, { duration: 400, queue: false });
			});
		}
	},
	prevStat: function() {
		
		if ($(this.$stats[0]).position().left !== 20) {
			this.$stats.each(function(i) {
				var left = $(this).position().left;
				$(this).animate({left: left + 220 + 'px'}, { duration: 400, queue: false });
			});
		}
	}
});  
// this is important
module.exports.id = 'widgets/sidebar_widget';