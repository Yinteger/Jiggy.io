/**
 * MouseController class to represent a Mouse input.
 *
 * Note: Is the mouse move event being fired constantly?
 * Bug report: https://code.google.com/p/chromium/issues/detail?id=390326&thanks=390326&ts=1404171639
 * This is an issue with Windows on Chrome (and some other
 * browsers on Windows). Some programs may constantly
 * send a WM_MOUSEMOVE signal, causing chrome to fire mouse
 * move events even if the mouse pointer is not moving.
 *
 * To combat this bug, we will track coordinates and only
 * notify when these coordinates are changed.
 */

zen.inputs.MouseController = function() {
	zen.inputs.Controller.call(this);
	this._eventDetails = {
		altKey : false,
		shiftKey : false,
		superKey : false,
		x : -1,
		y : -1,
		buttons : [],
		button : null
	};
};

zen.extends(zen.inputs.Controller, zen.inputs.MouseController, {
	_mouseDownHandler : null,
	_mouseUpHandler : null,
	_mouseMoveHandler : null,
	_contextMenuHandler : null,
	_wheelHandler : null,
	_eventDetails : null,

	destroy : function() {
		if (this._mouseDownHandler) {
			document.body.removeEventListener('mousedown', this._mouseDownHandler);
			this._mouseDownHandler = null;
		}
		if (this._mouseUpHandler) {
			document.body.removeEventListener('mouseup', this._mouseUpHandler);
			this._mouseUpHandler = null;
		}
		if (this._mouseMoveHandler) {
			document.body.removeEventListener('mousemove', this._mouseMoveHandler);
			this._mouseMoveHandler = null;
		}
		if (this._contextMenuHandler) {
			window.removeEventListener('contextmenu', this._contextMenuHandler);
			this._contextMenuHandler = null;
		}
		if (this._wheelHandler) {
			window.removeEventListener('wheel', this._wheelHandler);
			this._wheelHandler = null;
		}
	},

	_attachEvents : function() {
		var self = this;

		var x, y;

		var _fireEvent = function() {
			if (self._eventDetails.buttons.length > 0) {
				self._onMouseDown();
			}
			if (self._eventDetails.x !== x || self._eventDetails.y !== y) {
				x = self._eventDetails.x;
				y = self._eventDetails.y;
				self._onMouseMove();
			}
			window.requestAnimationFrame(_fireEvent);
		};

		window.requestAnimationFrame(_fireEvent);

		this._mouseDownHandler = function(e) {
			if (self._eventDetails.buttons.indexOf(e.button) === -1) {
				self._updateEventDetail(e);
				self._onMousePress();
			}
		};
		
		this._mouseUpHandler = function(e) {
			self._updateEventDetail(e);
			self._onMouseUp();
		};
		
		this._mouseMoveHandler = function(e) {
			// if (self._eventDetails.x !== e.x || self._eventDetails.y !== e.y) {
				self._updateEventDetail(e);
				// self._onMouseMove();
			// }
		};
		
		this._contextMenuHandler = function(e) {
			e.preventDefault();
		};

		this._wheelHandler = function(e) {
			e.preventDefault();
			self._updateEventDetail(e);
			self._onMouseWheel();
		};

		window.addEventListener('wheel', this._wheelHandler);
		document.body.addEventListener('contextmenu', this._contextMenuHandler);
		document.body.addEventListener('mousedown', this._mouseDownHandler);
		document.body.addEventListener('mouseup', this._mouseUpHandler);
		document.body.addEventListener('mousemove', this._mouseMoveHandler);
	},

	_onMousePress : function() {
		this._fireEvent(zen.inputs.InputEvents.BUTTON_PRESS, this._eventDetails);
	},

	_onMouseDown : function() {
		this._fireEvent(zen.inputs.InputEvents.BUTTON_DOWN, this._eventDetails);
	},

	_onMouseMove : function() {
		this._fireEvent(zen.inputs.InputEvents.POINTER_MOVE, this._eventDetails);
	},

	_onMouseUp : function() {
		this._fireEvent(zen.inputs.InputEvents.BUTTON_UP, this._eventDetails);
	},

	_onMouseWheel : function() {
		this._fireEvent(zen.inputs.InputEvents.WHEEL, this._eventDetails);
	},

	_updateEventDetail : function(e) {
		this._eventDetails.altKey = e.altKey;
		this._eventDetails.shiftKey = e.shiftKey;
		this._eventDetails.superKey = e.metaKey;
		this._eventDetails.button = e.button;
		this._eventDetails.x = e.x;
		this._eventDetails.y = e.y;

		if (e.type === 'mousedown') {
			if (this._eventDetails.buttons.indexOf(e.button) === -1) {
				this._eventDetails.buttons.push(e.button);
			}
		}
		else if (e.type === 'mouseup') {
			if (this._eventDetails.buttons.indexOf(e.button) > -1) {
				this._eventDetails.buttons.splice(this._eventDetails.buttons.indexOf(e.button), 1);
			}
		}
	}
});