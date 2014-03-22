/**
 *
 * LogicEngine.js
 *
 * Engine in charge of calling Logic Callbacks at set Intervals
 */

zen.engines.LogicEngine = function () {
	this.logicCalls = {};
	this.intervalID = null;
	this.interval = 10;
};

zen.engines.LogicEngine.prototype.addLogic = function (id, logicMethod, interval) {

	this.logicCalls[id] = {
		'method': logicMethod,
		'interval': interval,
		'interval_id': null
	};

	this.resumeLogic(id);
};

zen.engines.LogicEngine.prototype.pauseLogic = function (id) {
	if (this.logicCalls[id]) {
		clearInterval(this.logicCalls[id].interval_id);
	} else {
		console.warn("Attempted to pause logic that does not exist!");
	}
};

zen.engines.LogicEngine.prototype.resumeLogic = function (id) {
	if (this.logicCalls[id]) {
		this.logicCalls[id].interval_id = setInterval(this.logicCalls[id].method, this.logicCalls[id].interval);
	} else {
		console.warn("Attempted to resume logic that does not exist!");
	}
};

zen.engines.LogicEngine.prototype.removeLogic = function (id) {
	this.pauseLogic(id);
	this.logicCalls[id] = undefined;
};

zen.engines.LogicEngine.prototype.start = function () {
	var self = this;
	this.intervalID = setInterval(function () {
		self._logicLoop();
	}, this.interval);
};

zen.engines.LogicEngine.prototype.stop = function () {
	clearInterval(this.intervalID);
};