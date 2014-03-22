/**
 *
 * GroupLogicEngine.js
 *
 * Engine in charge of calling Logic Callbacks at set Intervals
 * The Logic engine has several intervals, for each interval of interval that has been
 * added so that things with the same interval are groupped together in interval calls
 * instead of each having a interval
 */

zen.engines.GroupLogicEngine = function () {
	this.logicCalls = {};
	this.logicLoops = {};
	this.intervalID = null;
	this.interval = 10;
};

zen.engines.GroupLogicEngine.prototype.addLogic = function (id, logicMethod, interval) {
	this.logicCalls[id] = {
		'method': logicMethod,
		'interval': interval
	};

	if (!this._hasLogicLoop(interval)) {
		//Create the Interval for this Interval of Logic Loop
		this._createLogicLoop(interval);
	}

	this._addToLogicLoop(id, interval);
};

zen.engines.GroupLogicEngine.prototype.pauseLogic = function (id) {
	this._removeFromLogicLoop(id);
};

zen.engines.GroupLogicEngine.prototype.resumeLogic = function (id) {
	this._addToLogicLoop(id);
};

zen.engines.GroupLogicEngine.prototype.removeLogic = function (id) {
	this._removeFromLogicLoop(id);
	delete this.logicCalls[id];
};

zen.engines.GroupLogicEngine.prototype.start = function () {
	var self = this;
	this.intervalID = setInterval(function () {
		self._logicLoop();
	}, this.interval);
};

zen.engines.GroupLogicEngine.prototype.stop = function () {
	clearInterval(this.intervalID);
};

zen.engines.GroupLogicEngine.prototype._createLogicLoop = function (interval) {
	var self = this;
	this.logicLoops[interval] = {
		'methods': [],
		'interval_id': 	setInterval(function () {
							self._logicLoop(interval);
						}, interval)
	};
};

zen.engines.GroupLogicEngine.prototype._hasLogicLoop = function (interval) {
	return this.logicLoops[interval] != undefined;
};

zen.engines.GroupLogicEngine.prototype._removeLogicLoop = function (interval) {
	clearInterval(this.logicLoops[interval].interval_id);
	delete this.logicLoops[interval];
};

zen.engines.GroupLogicEngine.prototype._addToLogicLoop = function (id) {
	this.logicLoops[this.logicCalls[id].interval].methods.push(this.logicCalls[id].method);
};

zen.engines.GroupLogicEngine.prototype._removeFromLogicLoop = function (id) {
	var interval = this.logicCalls[id].interval;
	this.logicLoops[interval].methods.splice(this.logicLoops[interval].methods.indexOf(this.logicCalls[id].method), 1);
	
	if (this.logicLoops[interval].methods.length === 0) {
		this._removeLogicLoop(interval);
	}
};

zen.engines.GroupLogicEngine.prototype._logicLoop = function (interval) {
	for (var i in this.logicLoops[interval].methods) {
		this.logicLoops[interval].methods[i]();
	}
};