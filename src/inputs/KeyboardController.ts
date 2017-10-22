import {
	Controller,
	ControllerEventDetail,
	InputEvent,
	KeyCode,
	KeyboardEventDetail,
	InputManager
} from './';

export class KeyboardController extends Controller {
	private _keyCodes: KeyCode[];
	private _eventDetail: KeyboardEventDetail;

	public constructor() {
		super();

		this._eventDetail = {
			keyCodes : [],
			keyCode : null,
			altKey : false,
			shiftKey : false,
			superKey : false
		};
	}

	public destroy(): void {
		window.removeEventListener('keyup', this._keyUpHandler);
		window.removeEventListener('keydown', this._keyDownHandler);
	}

	private _keyDownHandler(e: KeyboardEvent): void {
		e.preventDefault();
		if (this._eventDetail.keyCodes.indexOf(e.keyCode) === -1) {
			this._updateEventDetail(e);
			this._onKeyDown();
		}
	}

	private _keyUpHandler(e: KeyboardEvent): void {
		e.preventDefault();
		this._updateEventDetail(e);
		this._onKeyUp();
	}

	protected _attachEvents(): void {
		this._keyUpHandler = this._keyUpHandler.bind(this);
		this._keyDownHandler = this._keyDownHandler.bind(this);
		window.document.addEventListener('keydown', this._keyDownHandler);
		window.addEventListener('keyup', this._keyUpHandler);
	}

	private _onKeyDown(): void {
		this._fireEvent(InputEvent.BUTTON_DOWN, this._eventDetail);
	}

	private _onKeyUp(): void {
		this._fireEvent(InputEvent.BUTTON_UP, this._eventDetail);
	}

	private _updateEventDetail(e: KeyboardEvent): void {
		this._eventDetail.altKey = e.altKey;
		this._eventDetail.shiftKey = e.shiftKey;
		this._eventDetail.superKey = e.metaKey;
		this._eventDetail.keyCode = e.keyCode;
		if (e.type === 'keydown') {
			if (this._eventDetail.keyCodes.indexOf(e.keyCode) === -1) {
				this._eventDetail.keyCodes.push(e.keyCode);
			}
		}
		else if (e.type === 'keyup') {
			if (this._eventDetail.keyCodes.indexOf(e.keyCode) > -1) {
				this._eventDetail.keyCodes.splice(this._eventDetail.keyCodes.indexOf(e.keyCode), 1);
			}
		}
	}

	public initialize(inputManager: InputManager): void {
		this.on(InputEvent.BUTTON_DOWN.toString(), (data: KeyboardEventDetail) => {
			inputManager.onInputReceived(this, InputEvent.BUTTON_DOWN, data);
		});
		this.on(InputEvent.BUTTON_UP.toString(), (data: KeyboardEventDetail) => {
			inputManager.onInputReceived(this, InputEvent.BUTTON_UP, data);
		});
	}
}
