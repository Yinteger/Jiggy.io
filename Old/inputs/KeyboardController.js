
zen.inputs.KeyboardController = function() {
	zen.inputs.Controller.call(this);
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

		this._keyDownHandler = function(e) {
			e.preventDefault();
			if (self._eventDetails.keyCodes.indexOf(e.keyCode) === -1) {
				self._updateEventDetail(e);
				self._onKeyDown();
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

	_onKeyDown : function() {
		this._fireEvent(zen.inputs.InputEvents.BUTTON_DOWN, this._eventDetails);
	},

	_onKeyUp : function() {
		this._fireEvent(zen.inputs.InputEvents.BUTTON_UP, this._eventDetails);
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