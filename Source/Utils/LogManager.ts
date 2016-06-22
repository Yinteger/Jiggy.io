import { SeverityEnum } from './SeverityEnum';

export class LogManager {
	private _logLevel : SeverityEnum;
	private static _instance:LogManager = new LogManager();
	constructor () {
        if(LogManager._instance){
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        LogManager._instance = this;

		this._logLevel = SeverityEnum.WARNING | SeverityEnum.ERROR;
		// if (zen.isDebugMode()) {
		this._logLevel = this._logLevel | SeverityEnum.DEBUG | SeverityEnum.INFO;
	}

	public log (severity : SeverityEnum, message: string) : void {
		if (this.getLogLevel() & severity) {
			switch(severity) {
				case SeverityEnum.DEBUG:
					console.debug(message);
					break;
				case SeverityEnum.INFO:
					console.info(message);
					break;
				case SeverityEnum.WARNING:
					console.warn(message);
					break;
				case SeverityEnum.ERROR:
					console.error(message);
					break;
			}
		}
	}

	public setLogLevel (severity: SeverityEnum) : void {
		this._logLevel = severity;
		// if (zen.isDebugMode() && this._logLevel & SeverityEnum.DEBUG === 0) {
			//If debug mode, always have the DEBUG flag enabled.
			// this._logLevel = this._logLevel | zen.util.LogManager.DEBUG;
		// }
		// else {
			this._logLevel = severity;
		// }
	}

	public getLogLevel () : SeverityEnum {
		return this._logLevel;
	}

	public static getInstance():LogManager {
		return LogManager._instance;
	}

}