import {EventEmitter} from 'events';

import {
	InputEvent,
	ControllerEventDetail,
	InputManager
} from './';

export abstract class Controller extends EventEmitter {
	constructor() {
		super();
		this._attachEvents();
	}

	protected _fireEvent(event: InputEvent, data: ControllerEventDetail): void {
		this.emit(event.toString(), data);
	}

	public abstract initialize(inputManager: InputManager): void;
	public abstract destroy(): void;
	protected abstract _attachEvents(): void;
}
