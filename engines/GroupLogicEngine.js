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
	this.intervals = {};
	this.intervalID = null;
	this.interval = 10;
};

/**
 * Public addLogic 
 *
 * Adds a Logic Method to be called at a set interval
 *
 * @param id, String, the identifier for this Logic, to be used to add/remove/pause/resume it later
 * @param logicMethod, Method, the logic method to be called
 * @param interval, Number, the interval at which the logicMethod should be called
 * @return void
 */
zen.engines.GroupLogicEngine.prototype.addLogic = function (id, logicMethod, interval) {
	this.logicCalls[id] = {
		'method': logicMethod,
		'interval': interval
	};

	if (!this._hasInterval(interval)) {
		//Create the Interval for this Interval of Logic Loop
		this._createInterval(interval);
	}

	this._addToInterval(id, interval);
};

/**
 * pauseLogic 
 *
 * Pauses the Logic Method but keeps it in storage to be resumed later
 *
 * @param id, String, identifier for the logic
 * @return void
 */
zen.engines.GroupLogicEngine.prototype.pauseLogic = function (id) {
	this._removeFromInterval(id);
};

/**
 * resumeLogic 
 *
 * Resumes a paused logic method to continue getting called at it's interval
 *
 * @param id, String, idenfitier for the logic
 * @return void
 */
zen.engines.GroupLogicEngine.prototype.resumeLogic = function (id) {
	this._addToInterval(id);
};

/**
 * removeLogic 
 *
 * Removes a Logic completely.  Stops looping it and removes it from this classes memory
 *
 * @param id, String, identifier for the logic
 * @return void
 */
zen.engines.GroupLogicEngine.prototype.removeLogic = function (id) {
	this._removeFromInterval(id);
	delete this.logicCalls[id];
};

// /**
//  * start 
//  *
//  * methoddescription
//  *
//  * @param none
//  * @return void
//  */
// zen.engines.GroupLogicEngine.prototype.start = function () {
// 	var self = this;
// 	this.intervalID = setInterval(function () {
// 		self._logicLoop();
// 	}, this.interval);
// };

// zen.engines.GroupLogicEngine.prototype.stop = function () {
// 	clearInterval(this.intervalID);
// };

/**
 * _createInterval 
 *
 * Creates a object which references the ID of an interval,
 * and a collection of all the methods to be run in that interval
 *
 * @param interval, Number, the interval this Logic Loop gets called in
 * @return void
 */
zen.engines.GroupLogicEngine.prototype._createInterval = function (interval) {
	var self = this;
	this.intervals[interval] = {
		'methods': [],
		'interval_id': 	setInterval(function () {
							self._interval(interval);
						}, interval)
	};
};

/**
 * _hasInterval
 *
 * Checks to see if there is a interval active	 
 *
 * @param interval, Number, the interval speed to check
 * @return Boolean
 */
zen.engines.GroupLogicEngine.prototype._hasInterval = function (interval) {
	return this.intervals[interval] != undefined;
};

/**
 * _removeInterval 
 *
 * Removes a Interval and all of it's methods from being ran
 *
 * @param interval, Number, the interval speed this interval represents
 * @return void
 */
zen.engines.GroupLogicEngine.prototype._removeInterval = function (interval) {
	clearInterval(this.intervals[interval].interval_id);
	delete this.intervals[interval];
};

/**
 * _addToInterval 
 *
 * Adds Logic to a Interval
 *
 * @param id, String, Identifier for the logic
 * @return void
 */
zen.engines.GroupLogicEngine.prototype._addToInterval = function (id) {
	this.intervals[this.logicCalls[id].interval].methods.push(this.logicCalls[id].method);
};

/**
 * _removeFromInterval 
 *
 * Removes a Logic from being ran in an Interval
 *
 * @param id, String, Identifier for the logic
 * @return void
 */
zen.engines.GroupLogicEngine.prototype._removeFromInterval = function (id) {
	var interval = this.logicCalls[id].interval;
	this.intervals[interval].methods.splice(this.intervals[interval].methods.indexOf(this.logicCalls[id].method), 1);
	
	if (this.intervals[interval].methods.length === 0) {
		this._removeInterval(interval);
	}
};

/**
 * _interval 
 *
 * Gets called by each Interval to run all the Logic Methods in that Interval
 *
 * @param Interval, Number, The Interval calling this
 * @return void
 */
zen.engines.GroupLogicEngine.prototype._interval = function (interval) {
	for (var i in this.intervals[interval].methods) {
		this.intervals[interval].methods[i]();
	}
};