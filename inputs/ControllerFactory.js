/**
 * public class ControllerFactory
 *
 * A singleton that creates controllers.
 */

zen.inputs.ControllerFactory = function() {
	if (zen.inputs.ControllerFactory.prototype._instance) {
		return zen.inputs.ControllerFactory.prototype._instance;
	}

	zen.inputs.ControllerFactory.prototype._instance = this;
};

zen.extends(null, zen.inputs.ControllerFactory, {
	_instance 		: null,

	create : function(controllerType) {
		switch (controllerType) {
			default:
				throw new Error('Controller type: ' + controllerType + ' is not supported.');
				break;
			case zen.inputs.ControllerFactory.MOUSE:
				return new zen.inputs.MouseController();
				break;
			case zen.inputs.ControllerFactory.KEYBOARD:
				return new zen.inputs.KeyboardController();
				break;
			// case zen.inputs.ControllerFactory.JOYSTICK:
			// 	return new zen.inputs.JoyStickController();
			// 	break;
		}
	}
}, 
{
	MOUSE 		: 'mouse',
	KEYBOARD 	: 'keyboard',
	// JOYSTICK 	: 'joystick',
	//XBOX360 	: 'xbox',
	//PLAYSTATION3: 'playstation',

	getSingleton : function() {
		if (!zen.inputs.ControllerFactory.prototype._instance) {
			new zen.inputs.ControllerFactory();
		}
		return zen.inputs.ControllerFactory.prototype._instance;
	}
});