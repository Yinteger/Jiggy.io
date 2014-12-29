/**
 * public constructor Iterator
 *
 * General Iterator class for looping through arrays
 * 
 */
zen.util.Iterator = function(array) {
	this.array = array;
	this.index = -1;
};

zen.extends(null, zen.util.Observer, {
	hasNext : function () {
		if (this.array[this.index + 1]) {
			return true;
		} else {
			return false;
		}
	},

	next : function () {
		this.index += 1;
		return this.array[index];
	}
});