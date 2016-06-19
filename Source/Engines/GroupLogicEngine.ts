import {LogicEngine} from "./LogicEngine";

interface LogicCall {
	method: {(): void;};
	interval: number;
}

interface Interval {
	methods: {(): void; }[];
	interval_id: NodeJS.Timer;
}

export default class GroupLogicEngine extends LogicEngine {
	private _logicCalls : {[key: string]: LogicCall};
	private _intervals : {[key: string]: Interval};
	private _intervalID : string;
	private _interval : number;

	public addLogic (id: string, logicMethod : () => {}, interval : number) : void {
		this._logicCalls[id] = {
			'method': logicMethod,
			'interval': interval
		};

		if (!this._hasInterval(interval)) {
			//Create the Interval for this Interval of Logic Loop
			this._createInterval(interval);
		}

		this._addToInterval(id);
	}

	public pauseLogic (id : string) : void {
		this._removeFromInterval(id);
	}

	public resumeLogic (id: string) : void {
		this._addToInterval(id);
	}

	public removeLogic (id: string) : void {
		if (this._logicCalls[id]) {
			this._removeFromInterval(id);
			delete this._logicCalls[id];
		}
	}

	private _createInterval (interval : number) : void {
		var self = this;
		var methods : {() : void; }[] = [];
		this._intervals[interval] = {
			'methods': methods,
			'interval_id': 	setInterval(() => {
								this._processInterval(interval);
							}, interval)
		};
	}

	private _hasInterval (interval: number) : boolean {
		return this._intervals[interval] != undefined;
	}

	private _removeInterval (interval: number) : void {
		clearInterval(this._intervals[interval].interval_id);
		delete this._intervals[interval];
	}

	private _addToInterval (id: string) : void {
		this._intervals[this._logicCalls[id].interval].methods.push(this._logicCalls[id].method);
	}

	private _removeFromInterval (id: string) : void {
		var interval = this._logicCalls[id].interval;
		this._intervals[interval].methods.splice(this._intervals[interval].methods.indexOf(this._logicCalls[id].method), 1);
		
		if (this._intervals[interval].methods.length === 0) {
			this._removeInterval(interval);
		}
	}

	private _processInterval (interval : number) : void {
		for (var i in this._intervals[interval].methods) {
			this._intervals[interval].methods[i]();
		}
	}
}