import {EventEmitter} from 'events';

/**
 * public DataManager
 *
 * DataManager is a singleton and is an interface to some type
 * of data storage. The DataManager is configured in a way that allows
 * for an asynchronous nature using the Observer util class to notify
 * listeners when data has been changed or removed.
 *
 * The base class itself is synchronous, but still uses an async workflow.
 * The base class uses the HTML5 local storage to store data that is 
 * available between sessions.
 *
 * One important limitation you should know, which applies to the
 * base class and may or may not apply to subclasses, is that data must be
 * of type "string". If any other type of object is passed then, the toString method
 * will be invoked for serialization.
 */

export enum DataEvent {
	DATA_SET,
	DATA_REMOVE,
	DATA_ERROR
}

export interface DataEventDetail {
	path: string;
	value: string;
}

export class DataManager extends EventEmitter {
	private static _instance: DataManager;

	public static DATA_SET: string = 'data_set';
	public static DATA_REMOVE: string = 'data_remove';
	public static DATA_ERROR: string = 'data_error';

	constructor() {
		super();

		if (DataManager._instance) {
			throw new Error('DataManager is a singleton.');
		}
		DataManager._instance = this;
	}

	public static getSingleton(): DataManager {
		if (!DataManager._instance) {
			new DataManager();
		}
		return DataManager._instance;
	}

	private _fireEvent(event: string, data: DataEventDetail): void {
		this.emit(event, data);
	}

	/**
	 * public setData
	 *
	 *	Sets data to the storage facility.
	 *	Fires DATA_SET event.
	 * 
	 * @param {String} path  
	 * @param {String} value 
	 */
	public setData(path: string, value: string): void {
		window.localStorage.setItem(path, value);
		this._fireEvent(DataManager.DATA_SET, {
			path : path,
			value: value
		});
	}

	/**
	 * public hasData
	 *
	 *	Checks to see if data path exists.
	 * 
	 * @param  {String}  path 
	 * @return {Boolean}      
	 */
	public hasData(path: string): boolean {
		return !(window.localStorage.getItem(path) === null);	
	}

	/**
	 * public getData
	 *
	 *	Gets data from the given path.
	 * 
	 * @param  {String} path 
	 * @return {String}      
	 */
	public getData(path: string): string {
		return window.localStorage.getItem(path);
	}

	/**
	 * public removeData
	 *
	 *	Deletes data at the given path.
	 * 	Fires DATA_REMOVE event.
	 * 
	 * @param  {String} path 
	 * @return {void}      
	 */
	public removeData(path: string): void {
		var data: string = this.getData(path);
		window.localStorage.removeItem(path);
		this._fireEvent(DataManager.DATA_REMOVE, {
			path : path,
			value : data
		});
	}
}