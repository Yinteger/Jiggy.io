
zen.util.LogManager = function() {
	if (zen.util.LogManager.prototype._instance) {
		return zen.util.LogManager.prototype._instance;
	}

	zen.util.LogManager.prototype._instance = this;

	this._logLevel = null;

	var logLevel = zen.util.LogManager.WARNING | zen.util.LogManager.ERROR;
	if (zen.isDebugMode()) {
		logLevel = logLevel | zen.util.LogManager.DEBUG | zen.util.LogManager.INFO;
	}
	this.setLogLevel(logLevel);
};

zen.extends(null, zen.util.LogManager, {
	/**
	 * @param  {Severity severity} Logs only if the logLevel matches the severity.
	 * @param  {String messages...} the message to log. Accepts multiple arguments.
	 * @return {void}
	 */
	log : function(severity, messages) {
		var args = Array.prototype.slice.call(arguments, 1);

		if (this.getLogLevel() & severity) {
			switch(severity) {
				case zen.util.LogManager.DEBUG:
					args.unshift('[DEBUG]');
					console.debug.apply(console, args);
					break;
				case zen.util.LogManager.INFO:
					console.info.apply(console, args);
					break;
				case zen.util.LogManager.WARNING:
					console.warning.apply(console, args);
					break;
				case zen.util.LogManager.ERROR:
					console.error.apply(console, args);
					break;
			}
		}
	},

	/**
	 * public setLogLevel
	 *
	 *	Sets the accepted log severity. Multiple values can be specified using bit flag operations.
	 *
	 *  For example, to enable ONLY debug:
	 *  setLogLevel(DEBUG);
	 *
	 *  to enable DEBUG and INFO:
	 *  setLogLevel(DEBUG | INFO);
	 *
	 * to enable DEBUG and ERROR:
	 * setLogLevel(DEBUG | ERROR);
	 *
	 * to enable all but ERROR:
	 * setLogLevel(DEBUG | INFO | WARNING ^ ERROR);
	 *
	 * For more information on bitflag operations:
	 * http://blog.millermedeiros.com/using-integers-to-store-multiple-boolean-values/
	 * 
	 * @param {SEVERITY { DEBUG, INFO, WARNING, ERROR }}
	 */
	setLogLevel : function(severity) {
		this._logLevel = severity;
		if (zen.isDebugMode() && this._logLevel & zen.util.LogManager.DEBUG === 0) {
			//If debug mode, always have the DEBUG flag enabled.
			this._logLevel = this._logLevel | zen.util.LogManager.DEBUG;
		}
		else {
			this._logLevel = severity;
		}
	},

	/**
	 *	public getLogLevel
	 *
	 * 	Returns the accepted severity level to log.
	 * 
	 * @return {SEVERITY { DEBUG, INFO, WARNING, ERROR }}
	 */
	getLogLevel : function() {
		return this._logLevel;
	}
}, {
	//SEVERITY LEVELS
	DEBUG 	: 1 << 0,
	INFO  	: 1 << 1,
	WARNING : 1 << 2,
	ERROR 	: 1 << 3,

	getSingleton : function() {
		if (!zen.util.LogManager.prototype._instance) {
			new zen.util.LogManager();
		}
		return zen.util.LogManager.prototype._instance;
	}
});
