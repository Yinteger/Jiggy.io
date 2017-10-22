import {
	Controller,
	ControllerEventDetail,
	InputEvent,
	MouseButton,
	MouseEventDetail,
	InputManager
} from './';

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

export class MouseController extends Controller {
	private _x: number;
	private _y: number;
	private _eventDetails: MouseEventDetail;

	public constructor() {
		super();
		this._eventDetails = {
			altKey : false,
			shiftKey : false,
			superKey : false,
			x : -1,
			y : -1,
			buttons : [],
			button: null
		};
		this._x = -1;
		this._y = -1;
	}

	public destroy(): void {
		document.body.removeEventListener('mousedown', this._mouseDownHandler);
		document.body.removeEventListener('mouseup', this._mouseUpHandler);	
		document.body.removeEventListener('mousemove', this._mouseMoveHandler);
		window.removeEventListener('contextmenu', this._contextMenuHandler);
		window.removeEventListener('wheel', this._wheelHandler);
	}

	private _getMouseButton(e: MouseEvent): MouseButton {
		switch(e.button) {
			case 0:
				return MouseButton.BUTTON_LEFT;
			case 1:
				return MouseButton.BUTTON_MIDDLE;
			case 2:
				return MouseButton.BUTTON_RIGHT;
		}
		throw new Error('Unrecognized Mouse Button.');
	}

	private _mouseDownHandler(e: MouseEvent): void {
		var mouseButton: MouseButton = this._getMouseButton(e);
		
		if (this._eventDetails.buttons.indexOf(mouseButton) === -1) {
			this._updateEventDetail(e);
			this._onMouseDown();
		}
	}

	private _mouseUpHandler(e: MouseEvent): void {
		this._updateEventDetail(e);
		this._onMouseUp();
	}

	private _mouseMoveHandler(e: MouseEvent): void {
		this._updateEventDetail(e);
		if (this._eventDetails.x !== this._x || this._eventDetails.y !== this._y) {
			this._x = this._eventDetails.x;
			this._y = this._eventDetails.y;
			this._onMouseMove();
		}
	}

	private _contextMenuHandler(e: MouseEvent): void {
		e.preventDefault();
	}

	private _wheelHandler(e: MouseEvent): void {
		e.preventDefault();
		this._updateEventDetail(e);
		this._onMouseWheel();
	}

	protected _attachEvents(): void {
		window.addEventListener('wheel', this._wheelHandler);
		document.body.addEventListener('contextmenu', this._contextMenuHandler);
		document.body.addEventListener('mousedown', this._mouseDownHandler);
		document.body.addEventListener('mouseup', this._mouseUpHandler);
		document.body.addEventListener('mousemove', this._mouseMoveHandler);
	}

	protected _onMouseDown(): void {
		this._fireEvent(InputEvent.BUTTON_DOWN, this._eventDetails);
	}

	protected _onMouseUp(): void {
		this._fireEvent(InputEvent.BUTTON_UP, this._eventDetails);
	}

	protected _onMouseMove(): void {
		this._fireEvent(InputEvent.POINTER_MOVE, this._eventDetails);
	}

	protected _onMouseWheel(): void {
		this._fireEvent(InputEvent.WHEEL, this._eventDetails);
	}

	private _updateEventDetail(e: MouseEvent) {
		var mouseButton: MouseButton = this._getMouseButton(e);

		this._eventDetails.altKey = e.altKey;
		this._eventDetails.shiftKey = e.shiftKey;
		this._eventDetails.superKey = e.metaKey;
		this._eventDetails.button = e.button;
		this._eventDetails.x = e.x;
		this._eventDetails.y = e.y;

		if (e.type === 'mousedown') {
			if (this._eventDetails.buttons.indexOf(mouseButton) === -1) {
				this._eventDetails.buttons.push(mouseButton);
			}
		}
		else if (e.type === 'mouseup') {
			if (this._eventDetails.buttons.indexOf(mouseButton) > -1) {
				this._eventDetails.buttons.splice(this._eventDetails.buttons.indexOf(mouseButton), 1);
			}
		}
	}

	public initialize(inputManager: InputManager): void {
		this.on(InputEvent.BUTTON_DOWN.toString(), (data: MouseEventDetail) => {
			inputManager.onInputReceived(this, InputEvent.BUTTON_DOWN, data);
		});
		this.on(InputEvent.BUTTON_UP.toString(), (data: MouseEventDetail) => {
			inputManager.onInputReceived(this, InputEvent.BUTTON_UP, data);
		});
		this.on(InputEvent.POINTER_MOVE.toString(), (data: MouseEventDetail) => {
			inputManager.onInputReceived(this, InputEvent.POINTER_MOVE, data);
		});
		this.on(InputEvent.WHEEL.toString(), (data: MouseEventDetail) => {
			inputManager.onInputReceived(this, InputEvent.WHEEL, data);
		});
	}
}