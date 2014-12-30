/**
 * public constructor Iterator
 *
 * General Iterator class for looping through arrays
 * 
 */
zen.util.Iterator = function(array) {
	this.array = array;
	this.index = -1;
	this.length = array.length;
};

zen.extends(null, zen.util.Iterator, {
	hasNext : function () {
		if (this.array[this.index + 1]) {
			return true;
		} else {
			return false;
		}
	},

	next : function () {
		this.index += 1;
		return this.array[this.index];
	},

	hasPrev : function () {
		if (this.array[this.index - 1]) {
			return true;
		} else {
			return false;
		}
	},

	prev : function () {
		this.index -= 1;
		return this.array[this.index];
	},

	setToBeginning : function () {
		this.index = -1;
	},

	setToEnd : function () {
		this.index = this.array.length;
	},

	getFirst : function () {
		return this.array[0];
	},

	getLast : function () {
		return this.array[this.array.length - 1];
	}
});