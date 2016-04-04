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
		var controller = this._factory.create(controllerType);
		this._controllers[controllerName] = controller;

		controller.addListener(this);

		zen.app.getLogManager().log(zen.util.LogManager.INFO, 'Controller "' + controllerName + '" attached as ' + controllerType);
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

	_getControllerName : function(controller) {
		for (var i in this._controllers) {
			if (this._controllers[i] === controller) {
				return i;
			}
		}

		return null;
	},

	addListener : function(listener) {
		this._observer.addListener(listener);
	},

	isListener : function(listener) {
		return this._observer.isListener(listener);
	},

	removeListener : function(listener) {
		this._observer.removeListener(listener);
	},

	notify : function(evt, data) {
		//replace the controller object with the controller name
		data.controller = this._getControllerName(data.controller);

		//propogate event
		this._observer.fireEvent(evt, data);
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
	}
});