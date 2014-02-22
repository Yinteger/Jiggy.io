
zen.entities.EntityView = function(model) {
	model.addListener(this);
};

zen.extends(null, zen.entities.EntityView, {
	notify : function(event, data) {
		
	}
});