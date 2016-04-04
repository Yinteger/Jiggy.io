/**
 * public class InputManager
 *
 * A singleton that manages Controllers
 */

zen.events.EventManager = function() {
	if (zen.events.EventManager.prototype._instance) {
		return zen.events.EventManager.prototype._instance;
	}

	zen.events.EventManager.prototype._instance = this;

	this._observer = new zen.util.Observer(this);
	this._logManager = zen.app.getLogManager();

	this.setInputManager(zen.inputs.InputManager.getSingleton());
};

zen.extends(null, zen.events.EventManager, {
	_instance 		: null,
	_inputManager 	: null,
	_observer 		: null,

	setLogManager : function(logManager) {
		this._logManager = logManager;
	},

	getLogManager : function() {
		return this._logManager;
	},

	setInputManager : function(inputManager) {
		if (this._inputManager) {
			this._inputManager.removeListener(this);
		}

		this._inputManager = inputManager;
		this._inputManager.addListener(this);
	},

	getInputManager : function() {
		return this._inputManager;
	},

	registerController : function(name, type) {
		this.getInputManager().createController(name, type);
	},

	unregisterController : function(name) {
		this.getInputManager().removeController(name);
	},

	registerEventHandler : function(controllerName, event, handler) {
		if (!this.getInputManager().hasController(controllerName)) {
			this.getLogManager().log(zen.util.LogManager.WARNING, "Registering an event handler for an non-existant controller.");
		}
		this._observer.addHandler(controllerName + '-' + event, handler);
	},

	unregisterControllerEventHandler : function(controllerName, event, handler) {
		this._observer.removeHandler(controllerName + '-' + event, handler);
	},

	notify : function(event, data) {
		switch(event) {
			case 'keydown':
				event = 'down';
				break;
			case 'keyup':
				event = 'up';
				break;
			case 'keypress':
				event = 'press';
				break;
		}
		zen.app.getLogManager().log(zen.util.LogManager.DEBUG, event, data.keyCode, String.fromCharCode(data.keyCode));
		this._observer.fireEvent(data.controller + '-' + event, data);
	}
}, 
{
	BUTTON_PRESS : 'press',
	BUTTON_DOWN	 : 'down',
	BUTTON_UP	 : 'up',

	getSingleton : function() {
		if (!zen.events.EventManager.prototype._instance) {
			new zen.events.EventManager();
		}
		return zen.events.EventManager.prototype._instance;
	}
});