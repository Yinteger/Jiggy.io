
zen.assets.Asset = function(type, url) {
	this.type = type;
	this.loadStrategy = null;
	this.data = null;
	this.setSource(url);
};

zen.assets.Asset.NOT_LOADED = 0;
zen.assets.Asset.LOADING = 1;
zen.assets.Asset.LOADED = 2;

zen.extends(null, zen.assets.Asset, {
	setSource : function(source) {
		this.url = source;
		this.setData(null);
		this.setState(zen.assets.Asset.NOT_LOADED);
	},

	getSource : function() {
		return this.url;
	},

	setState : function(state) {
		this.state = state;
		this.onStateChange(this.state);
	},

	getState : function() {
		return this.state;
	},

	setData : function(data) {
		this.data = data;
		this.setState(zen.assets.Asset.LOADED);
		this.onDataChange(this.data);
	},

	getData : function() {
		return this.data;
	},

	setLoadStrategy : function(loadStrategy) {
		this.loadStrategy = loadStrategy;
	},

	load : function() {
		this.loadStrategy.load(this);
	},

	isReady : function() {
		return (this.getState() === zen.assets.Asset.LOADED);
	},

	onStateChange: function(state) {},
	onDataChange : function(data) {},
	onError : function(error) {}
});