zen.inputs.MouseButtonCode = function() {
	throw new Error('MouseButtonCode is static.');
};

zen.extends(null, zen.inputs.MouseButtonCode, {}, {
	LEFT 		: 0,
	MIDDLE 		: 1,
	RIGHT 		: 2
});
