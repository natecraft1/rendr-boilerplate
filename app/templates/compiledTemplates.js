module.exports = function(Handlebars) {

var templates = {};

templates["home/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "\n";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.view || depth0.view),stack1 ? stack1.call(depth0, "widgets/sidebar_widget", options) : helperMissing.call(depth0, "view", "widgets/sidebar_widget", options)))
    + "\n<div id=\"content_container\">\n	<h1>Content</h2>\n	<p>Bacon ipsum dolor sit amet brisket sirloin pork chop chuck venison doner turducken tongue. Strip steak pork loin beef ribs, turducken chicken flank frankfurter kielbasa. Ribeye tail ball tip, flank doner filet mignon bresaola biltong spare ribs turducken landjaeger drumstick rump chuck. Tenderloin drumstick beef chicken tri-tip spare ribs kielbasa short ribs biltong bresaola flank t-bone ground round corned beef pastrami. Fatback kielbasa pork belly venison brisket shankle ground round tail pastrami rump chicken spare ribs flank. Pork chop salami pastrami sausage drumstick.</p>\n</div>";
  return buffer;
  });

templates["widgets/sidebar_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"stat\">\n		<p class=\"key\">\n		";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " \n		</p>\n	</br>\n	<p class=\"val\">\n	";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n	</p>\n	</div>\n";
  return buffer;
  }

  buffer += "<div id=\"widget\">\n";
  stack1 = helpers.each.call(depth0, depth0.stats, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n 	<a class=\"prev\"> < </a>\n	<a class=\"next\"> > </a>\n\n</div>";
  return buffer;
  });

return templates;

};