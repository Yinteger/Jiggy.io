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

zen.inputs.MouseController = function(inputManager) {
	zen.inputs.Controller.call(this, inputManager);
	this.x = -1;
	this.y = -1;
};

zen.extends(zen.inputs.Controller, zen.inputs.MouseController, {
	_mouseDownHandler : null,
	_mouseUpHandler : null,
	_mouseMoveHandler : null,
	_contextMenuHandler : null,
	x : null,
	y : null,

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
	},

	_attachEvents : function() {
		var self = this;

		this._mouseDownHandler = function(e) {
			self._onMouseDown(e);
		};
		this._mouseUpHandler = function(e) {
			self._onMouseUp(e);
		};
		this._mouseMoveHandler = function(e) {
			self._onMouseMove(e);
		};
		this._contextMenuHandler = function(e) {
			e.preventDefault();
		};

		window.addEventListener('contextmenu', this._contextMenuHandler);
		document.body.addEventListener('mousedown', this._mouseDownHandler);
		document.body.addEventListener('mouseup', this._mouseUpHandler);
		document.body.addEventListener('mousemove', this._mouseMoveHandler);
	},

	_onMouseDown : function(e) {
		//e.preventDefault();
		this._fireEvent('mousedown', this._getEventDetail(e));
	},

	_onMouseMove : function(e) {
		//e.preventDefault();
		if (this.x !== e.x || this.y !== e.y) {
			this.x = e.x;
			this.y = e.y;
			this._fireEvent('mousemove', this._getEventDetail(e));
		}
	},

	_onMouseUp : function(e) {
		//e.preventDefault();
		this._fireEvent('mouseup', this._getEventDetail(e));
	},

	_getEventDetail : function(e) {
		return {
			ctrlKey : e.ctrlKey,
			shiftKey : e.shiftKey,
			superKey : e.metaKey,
			x : e.x,
			y : e.y,
			button: e.button
		};
	}
});