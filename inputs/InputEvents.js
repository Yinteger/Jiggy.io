zen.inputs.InputEvents = function() {
	throw new Error('InputEvents is static.');
};

zen.extends(null, zen.inputs.InputEvents, {}, {
	BUTTON_PRESS 	: 'buttonpress',
	BUTTON_DOWN		: 'buttondown',
	BUTTON_UP 		: 'buttonup',
	POINTER_MOVE 	: 'pointermove',
	WHEEL 			: 'wheel'
});
