
zen.entities.Entity = function(model) {
	var useDefaults = false;
	if (!model) {
		model = new zen.entities.EntityModel();
		useDefaults = true;
	}
	
	this.setModel(model);
	this.view = new zen.entities.EntityView(model);
	
	this.children = new Array();
	this.parent;

	if (useDefaults) {
		this._useDefaults();
	}
};

zen.extends(null, zen.entities.Entity, {

	//MODEL / VIEW / IDENTITY BASE

	setModel : function(model) {
		this.model = model;
	},

	getID : function() {
		return this.model.getAttribute('id');
	},

	getModel : function() {
		return this.model;
	},

	getView : function() {
		return this.view;
	},

	//COMPOSITE 

	addChild : function(child) {
		var parent = child.getParent();
		if (parent) {
			parent.removeChild(child);
		}
		this.children.push(child);
		child.setParent(this);
	},

	removeChild : function(child) {
		if (this.isChild(child)) {
			var idx = this.indexOf(child);
			this.children.splice(idx, 1);
		}
	},

	removeAllChildren : function() {
		var child;
		while (child = this.getChildAt(0)) {
			this.removeChild(child);	
		}
	},

	isChild : function(child) {
		return (this.indexOf(child) > -1);
	},

	indexOf : function(child) {
		return this.children.indexOf(child);
	},

	childCount : function() {
		return this.children.length;
	},

	getChildAt : function(index) {
		return this.children[index];
	},

	setParent : function(parent) {
		this.parent = parent;
	},

	getParent : function() {
		return this.parent;
	},

	iterator : function() {
		var i = -1;
		var self = this;
		return {
			hasNext : function() {
				var child = self.getChildAt(i + 1);
				return !(child === undefined || child === null);
			},

			next : function() {
				i++;
				return self.getChildAt(i);
			},

			hasPrevious : function() {
				var child = self.getChildAt(i - 1);
				return !(child === undefined || child === null);
			},

			previous : function() {
				i--;
				return self.getChildAt(i);
			}
		};
	},

	//GEOMETRY
	
	setX : function(x) {
		this.model.setAttribute('x', x);
	},

	getX : function() {
		return this.model.getAttribute(x);
	},

	setY : function(y) {
		this.model.setAttribute('y', y);
	},

	getY : function() {
		return this.model.getAttribute('y');
	},

	setZ : function(z) {
		this.model.setAttribute('z', z);
	},

	getZ : function() {
		return this.model.getAttribute('z');
	},

	setLocation : function(x, y, z) {
		if (x !== null || x !== undefined) {
			this.setZ(z);
		}
		if (y !== null || y !== undefined) {
			this.setY(y);
		}
		if (z !== null || z !== undefined) {
			this.setZ(z);
		}
	},

	getLocation : function() {
		return {
			x : this.getX(),
			y : this.getY(),
			z : this.getZ()
		};
	},

	setHeight : function(height) {
		this.model.setAttribute('height', height);
	},

	getHeight : function() {
		return this.model.getAttribute('height');
	},

	setWidth : function(width) {
		this.model.setAttribute('width', width);
	},

	getWidth : function() {
		return this.model.getAttribute('width');
	},

	setSize : function(width, height) {
		if (width !== null || width !== undefined) {
			this.setWidth(width);
		}
		if (height !== null || height !== undefined) {
			this.setHeight(height);
		}
	},

	getSize : function() {
		return {
			width: this.getWidth(),
			height : this.getHeight()
		};
	},

	setVisible : function(state) {
		this.model.setAttribute('visible', state);
	},

	isVisible : function() {
		return this.model.getAttribute('visible');
	},

	_useDefaults : function() {
		this.setLocation(0, 0, 0);
		this.setSize(0, 0);
		this.setVisible(true);
	}
});