console.log("home controller  called")
module.exports = {
  index: function(params, callback) {
  	console.log(params, callback)
    callback();
  }
};
