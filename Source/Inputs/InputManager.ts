import {EventEmitter} from 'events';
import {
	Controller,
	ControllerFactory,
	ControllerType
} from './';

export class InputManager extends EventEmitter {
	private static _instance: InputManager;
	private _controllers: {[name: string]: Controller};
	private _factory: ControllerFactory;

	constructor() {
		super();
		if (InputManager._instance) {
			throw new Error('InputManager is a singleton');
		}
		InputManager._instance = this;

		this._controllers = {};
		this._factory = this._createControllerFactory();
	}

	public static getSingleton(): InputManager {
		if (!InputManager._instance) {
			new InputManager();
		}

		return InputManager._instance;
	}

	public createController(name: string, type: ControllerType): void {
		var controller: Controller = this._factory.create(type);
		this._controllers[name] = controller;
		// controller.addListener(this);
	}

	public removeController(name: string): void {
		if (!this.hasController(name)) {
			return;
		}

		var controller = this._getController(name);
		// controller.removeListener(this);
		controller.destroy();

		delete this._controllers[name];
	}

	public hasController(name: string): boolean {
		return !!(this._controllers[name]);
	}

	private _getController(name: string): Controller {
		if (!this.hasController(name)) {
			return null;
		}

		return this._controllers[name];
	}

	private _getControllerName(controller: Controller): string {
		for (var i in this._controllers) {
			if (this._controllers[i] === controller) {
				return i;
			}
		}
		return null;
	}

	private _createControllerFactory(): ControllerFactory {
		return ControllerFactory.getSingleton();
	}
}


