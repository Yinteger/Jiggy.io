import {
	LogManager,
	SeverityEnum
} from './';

export class IDGenerator {
	private static _instance: IDGenerator;

	protected constructor() {}

	public generate(): string {
		return IDGenerator.generate();
	}

	public static generate(): string {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16|0, v = c === 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	}

	public static getSingleton(): IDGenerator {
		LogManager.getSingleton().deprecate('IDGenerator should no longer be used as a singleton anymore. Instead use IDGenerator.generate().');
		if (!IDGenerator._instance) {
			IDGenerator._instance = new IDGenerator();
		}
		return IDGenerator._instance;
	}
}