
export class IDGenerator {
	private static _instance: IDGenerator;

	constructor() {
		if (IDGenerator._instance) {
			throw new Error('IDGenerator is a singleton.');
		}
		IDGenerator._instance = this;
	}

	public generate(): string {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16|0, v = c === 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	}

	public static getSingleton(): IDGenerator {
		if (!IDGenerator._instance) {
			new IDGenerator();
		}
		return IDGenerator._instance;
	}
}