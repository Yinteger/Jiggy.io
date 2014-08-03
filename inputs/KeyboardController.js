
zen.inputs.KeyboardController = function(inputManager) {
	zen.inputs.Controller.call(this, inputManager);
};

zen.extends(zen.inputs.Controller, zen.inputs.KeyboardController, {
	_keyDownHandler : null,
	_keyUpHandler : null,

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
			self._onKeyDown(e);
		};

		this._keyUpHandler = function(e) {
			self._onKeyUp(e);
		};

		window.addEventListener('keydown', this._keyDownHandler);
		window.addEventListener('keyup', this._keyUpHandler);
	},

	_onKeyDown : function(e) {
		e.preventDefault();
		this._fireEvent('keydown', this._getEventDetail(e));
	},

	_onKeyUp : function(e) {
		e.preventDefault();
		this._fireEvent('keyup', this._getEventDetail(e));
	},

	_getEventDetail : function(e) {
		return  {
			keyCode : e.keyCode,
			altKey : e.altKey,
			shiftKey : e.shiftKey,
			superKey : e.metaKey
		};
	}
});