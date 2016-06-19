import {EventEmitter} from 'events';

import {
	InputEvent,
	ControllerEventDetail
} from './';

export abstract class Controller extends EventEmitter {
	constroller() {
		this._attachEvents();
	}

	protected _fireEvent(event: InputEvent, data: ControllerEventDetail): void {
		data.controller = this;
		this.emit(event.toString(), data);
	}

	public abstract destroy(): void;
	protected abstract _attachEvents(): void;
}
