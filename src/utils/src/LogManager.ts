import { SeverityEnum } from './SeverityEnum';

export class LogManager {
	private _logLevel : SeverityEnum;
	private static _instance:LogManager = new LogManager();
	
	protected constructor () {
		this._logLevel = SeverityEnum.WARNING | SeverityEnum.ERROR;
		// if (zen.isDebugMode()) {
		this._logLevel = this._logLevel | SeverityEnum.DEBUG | SeverityEnum.INFO;
	}

	public log (severity : SeverityEnum, message: string) : void {
		if (this.getLogLevel() & severity) {
			switch(severity) {
				case SeverityEnum.DEBUG:
					console.debug(`[DEBUG] ${message}`);
					break;
				case SeverityEnum.INFO:
					console.info(`[INFO] ${message}`);
					break;
				case SeverityEnum.WARNING:
					console.warn(`[WARN] ${message}`);
					break;
				case SeverityEnum.ERROR:
					console.error(`[ERROR] ${message}`);
					break;
				case SeverityEnum.DEPRECATE:
					console.error(`[DEPRECATE] ${message}`);
			}
		}
	}

	public debug(message: string): void {
		this.log(SeverityEnum.DEBUG, message);
	}

	public info(message: string): void {
		this.log(SeverityEnum.INFO, message);
	}

	public warn(message: string): void {
		this.log(SeverityEnum.WARNING, message);
	}

	public error(message: string): void {
		this.log(SeverityEnum.ERROR, message);
	}

	public deprecate(message: string): void {
		this.log(SeverityEnum.DEPRECATE, message);
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

	public static getSingleton():LogManager {
		if (!LogManager._instance) {
			LogManager._instance = new LogManager();
		}
		return LogManager._instance;
	}

}