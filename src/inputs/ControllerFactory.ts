import {
	Controller,
	KeyboardController,
	MouseController,
	ControllerType
} from './';


export class ControllerFactory {
	private static _instance: ControllerFactory;

	protected constructor() {
	}

	public static getSingleton(): ControllerFactory {
		if (!ControllerFactory._instance) {
			ControllerFactory._instance = new ControllerFactory();
		}
		return ControllerFactory._instance;
	}

	public create(type: ControllerType): Controller {
		switch(type) {
			default:
				throw new Error('Controller Type is not supported.');
			case ControllerType.MOUSE:
				return new MouseController();
			case ControllerType.KEYBOARD:
				return new KeyboardController();
		}
	}
}