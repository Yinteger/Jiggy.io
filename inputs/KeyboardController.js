
zen.inputs.KeyboardController = function(inputManager) {
	zen.inputs.Controller.call(this, inputManager);
	this._keyCodes = [];
	this._eventDetails = {
		keyCodes : [],
		altKey : false,
		shiftKey : false,
		superKey : false
	};
};

zen.extends(zen.inputs.Controller, zen.inputs.KeyboardController, {
	_keyDownHandler : null,
	_keyUpHandler : null,
	_keyCodes : null,

	destroy : function() {
		if (this._keyUpHandler) {
			window.removeEventListener('keyup', this._keyUpHandler);
			this._keyUpHandler = null;
		}
		if (this._keyDownHandler) {
			window.removeEventListener('keydown', this._keyDownHandler);
			this._keyDownHandler = null;
		}
	},

	_attachEvents : function() {
		var self = this;

		//TODO: make this better
		var _fireEvent = function() {
			if (self._eventDetails.keyCodes.length > 0) {
				self._onKeyDown(self._eventDetails)
			}
			window.requestAnimationFrame(_fireEvent);
		};

		window.requestAnimationFrame(_fireEvent);

		this._keyDownHandler = function(e) {
			e.preventDefault();
			if (self._eventDetails.keyCodes.indexOf(e.keyCode) === -1) {
				self._updateEventDetail(e);
				self._onKeyPress();
			}
		};

		this._keyUpHandler = function(e) {
			e.preventDefault();
			self._updateEventDetail(e);
			self._onKeyUp();
		};

		window.addEventListener('keydown', this._keyDownHandler);
		window.addEventListener('keyup', this._keyUpHandler);
	},

	_onKeyPress : function() {
		this._fireEvent('keypress', this._eventDetails);
	},

	_onKeyDown : function() {
		this._fireEvent('keydown', this._eventDetails);
	},

	_onKeyUp : function() {
		this._fireEvent('keyup', this._eventDetails);
	},

	_updateEventDetail : function(e) {
		this._eventDetails.altKey = e.altKey;
		this._eventDetails.shiftKey = e.shiftKey;
		this._eventDetails.superKey = e.metaKey;
		this._eventDetails.keyCode = e.keyCode;
		if (e.type === 'keydown') {
			if (this._eventDetails.keyCodes.indexOf(e.keyCode) === -1) {
				this._eventDetails.keyCodes.push(e.keyCode);
			}
		}
		else if (e.type === 'keyup') {
			if (this._eventDetails.keyCodes.indexOf(e.keyCode) > -1) {
				this._eventDetails.keyCodes.splice(this._eventDetails.keyCodes.indexOf(e.keyCode), 1);
			}
		}
	}
});