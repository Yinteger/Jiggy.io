/**
 * public class InputManager
 *
 * A singleton that manages Controllers
 */

zen.inputs.InputManager = function() {
	if (zen.inputs.InputManager.prototype._instance) {
		return zen.inputs.InputManager.prototype._instance;
	}

	zen.inputs.InputManager.prototype._instance = this;

	this._observer = new zen.util.Observer(this);
	this._controllers = {};
	this._factory = this._createControllerFactory();	
};

zen.extends(null, zen.inputs.InputManager, {
	_instance 		: null,
	_controllers 	: null,
	_factory 		: null,

	createController : function(controllerName, controllerType) {
		this._controllers[controllerName] = this._factory.create(controllerType);
		zen.util.LogManager.getSingleton().log(zen.util.LogManager.INFO, 'Controller "' + controllerName + '" attached as ' + controllerType);
	},

	removeController : function(controllerName) {
		if (!this.hasController(controllerName)) {
			return;
		}

		var controller = this.getController(controllerName);
		controller.removeListener(this);
		controller.destroy();

		delete this._controllers[controllerName];
	},

	hasController : function(controllerName) {
		return !!(this._controllers[controllerName]);
	},

	getController : function(controllerName) {
		if (!this.hasController(controllerName)) {
			return null;
		}

		return this._controllers[controllerName];
	},

	addControllerListener : function(controllerName, listener) {
		if (!this.hasController(controllerName)) {
			return;
		}

		var controller = this.getController(controllerName);
		controller.addListener(listener);
	},

	isControllerListener : function(controllerName, listener) {
		if (!this.hasController(controllerName)) {
			return;
		}

		var controller = this.getController(controllerName);
		return controller.isListener(listener);
	},

	removeControllerListener : function(controllerName, listener) {
		if (!this.hasController(controllerName)) {
			return;
		}

		var controller = this.getController(controllerName);
		controller.removeListener(listener);
	},

	notify : function(evt, data) {
		zen.util.LogManager.getSingleton().log(zen.util.LogManager.DEBUG, evt, data, String.fromCharCode(data.keyCode));
	},

	_createControllerFactory : function() {
		return zen.inputs.ControllerFactory.getSingleton();
	}
}, 
{
	getSingleton : function() {
		if (!zen.inputs.InputManager.prototype._instance) {
			new zen.inputs.InputManager();
		}
		return zen.inputs.InputManager.prototype._instance;
	},

	//MOUSE BUTTON ENUMERATION
	MB_LEFT 		: 0,
	MB_MIDDLE 		: 1,
	MB_RIGHT 		: 2,

	//KEYBOARD BUTTON ENUMERATION
	//TODO: Add Number Pad keys (Don't have a num pad on laptop D:)
	BACKSPACE 				: 8,
	TAB						: 9,

	ENTER 					: 13,

	SHIFT 					: 16,
	CONTROL 				: 17,
	ALT 					: 18,
	
	CAPS_LOCK				: 20,
	
	ESCAPE 					: 27,

	PAGE_UP 				: 33,
	PAGE_DOWN 				: 34,
	END 					: 35,
	HOME 					: 36,
	LEFT_ARROW 				: 37,
	UP_ARROW 				: 38,
	RIGHT_ARROW 			: 39,
	DOWN_ARROW 				: 40,

	INSERT 					: 45,
	DELETE 					: 46,

	ZERO 					: 48,
	ONE						: 49,
	TWO 					: 50,
	THREE 					: 51,
	FOUR 					: 52,
	FIVE 					: 53,
	SIX 					: 54,
	SEVEN 					: 55,
	EIGHT 					: 56,
	NINE 					: 57,

	A 						: 65,
	B 						: 66,
	C 						: 67,
	D 						: 68,
	E 						: 69,
	F 						: 70,
	G 						: 71,
	H 						: 72,
	I 						: 73,
	J 						: 74,
	K 						: 75,
	L 						: 76,
	M 						: 77,
	N 						: 78,
	O 						: 79,
	P 						: 80,
	Q 						: 81,
	R 						: 82,
	S 						: 83,
	T 						: 84,
	U 						: 85,
	V 						: 86,
	W 						: 87,
	X 						: 88,
	Y 						: 89,
	Z 						: 90,
	SUPER					: 91,

	F1						: 112,
	F2 						: 113,
	F3 						: 114,
	F4 						: 115,
	F5 						: 116,
	F6 						: 117,
	F7 						: 118,
	F8 						: 119,
	F9 						: 120,
	F10 					: 121,
	F11 					: 122,
	F12 					: 123,

	SEMICOLON				: 186,
	EQUAL 					: 187,
	COMMA 					: 188,

	SUBTRACT 				: 189,
	PERIOD 					: 190,
	SLASH 					: 191,

	TILDE 					: 192,

	OPEN_SQUARE_BRACKET		: 219,
	BACKSLASH 				: 220,
	CLOSE_SQUARE_BRACKET 	: 221,
	APOSTROPHE 				: 222,

	FUNCTION 				: 255
	
});