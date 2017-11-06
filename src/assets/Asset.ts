import {IDGenerator} from '../utils';
import {
	AssetState,
	AssetType,
	AssetLoader
} from '../assets';
import {EventEmitter} from 'events';

export const enum AssetEvents {
	STATE_CHANGE 	= "state_change",
	DATA_CHANGE 	= "data_change",
	ERROR 			= "error"
}

// import {
// 	AssetState,
// 	AssetType,
// 	AssetLoader
// } from './';

export class Asset extends EventEmitter {
	private _id: string;
	private _type: AssetType;
	private _data: Object;
	private _state: AssetState;
	private _loadStrategy: AssetLoader;
	private _url: string;
	private _attributes: {
		[key: string]: any
	}

	/**
	 * public constructor Asset
	 *
	 *	Represents an asset to a game.
	 * 
	 * @param {AssetType} type
	 * @param {String} url  Location path.
	 */
	public constructor(type: AssetType, url?: string) {
		super();

		this._id = IDGenerator.getSingleton().generate();
		this._type = type;
		this._data = null;
		this.setSource(url);
		this._attributes = {};
	}

	/**
	 * public setSource
	 *
	 *	Sets the source location path of this asset.
	 *	This will clear the associated data, and set this asset in the
	 *	NOT_LOADED state.
	 * 
	 * @param {String} source 
	 */
	public setSource(source: string): void {
		if (source !== this.getSource()) {
			this._url = source;
			this.setData(null);
			this.setState(AssetState.NOT_LOADED);
		}
	}

	/**
	 * public getSource
	 *
	 *	Returns the source location path of this asset.
	 * 
	 * @return {String} 
	 */
	public getSource(): string {
		return this._url;
	}

	/**
	 * public setState
	 *
	 *	Sets the state of this asset.

	 * @internal
	 * @param {AssetState} state 
	 */
	public setState(state: AssetState): void {
		if (this._state !== state) {
			this._state = state;
			this.onStateChange(this._state);
			this.emit(AssetEvents.STATE_CHANGE, this._state);
		}
	}

	/**
	 * public getState
	 *
	 *	Returns the state of this asset.
	 * 	
	 * @return {AssetState}
	 */
	 public getState(): AssetState {
	 	return this._state;
	 }

	 /**
	 * public setData
	 *
	 * 	Sets the data for this asset.
	 * 
	 * @param {Mixed} data 
	 */
	public setData(data: Object): void {
		this._data = data;
		this.onDataChange(this._data);
		this.emit(AssetEvents.DATA_CHANGE, this._data);
	}

	/**
	 * public getData
	 *
	 *	Gets the asset data.
	 * 
	 * @return {Mixed} 
	 */
	public getData(): any {
		return this._data;
	}

	/**
	 * public getType
	 *
	 *	Get the type of this asset.
	 * 
	 * @return {AssetType}
	 */
	public getType(): AssetType {
		return this._type;
	}

	/**
	 * public setLoadStrategy
	 *
	 *	Sets the strategy class to be used for loading
	 * 
	 * @param {AssetLoader} loadStrategy 
	 */
	public setLoadStrategy(loadStrategy: AssetLoader): void {
		this._loadStrategy = loadStrategy;
	}

	/**
	 * public getLoadStrategy
	 *
	 *	Gets the strategy class used for loading.
	 * 
	 * @return {AssetLoader} 
	 */
	public getLoadStrategy(): AssetLoader {
		return this._loadStrategy;
	}

	/**
	 * public load
	 *
	 *	Loads the asset data.
	 *
	 * 	Use onDataChange hook method to get notified when data has
	 * 	finished loading.
	 * 
	 * @return {Promise<Asset>} 
	 */
	public load(): Promise<Asset> {
		return this._loadStrategy.load(this);
	}

	/**
	 * Unloads the asset data
	 */
	public unload(): Promise<Asset> {
		return this._loadStrategy.unload(this);
	}

	/**
	 * public isReady
	 *
	 *	Checks to see if the data has been loaded on this asset.
	 * 
	 * @return {Boolean}
	 */
	public isReady(): boolean {
		return (this.getState() === AssetState.LOADED);
	}

	/**
	 * public setAttribute
	 *
	 *	Sets data details for this asset.
	 * 
	 * @param {String} key   
	 * @param {Object} value 
	 */
	public setAttribute(key: string, value: any): void {
		this._attributes[key] = value;
	}

	/**
	 * public getAttribute
	 *
	 *	Gets data details from this asset.
	 * 
	 * @param  {String} key 
	 * @return {Object}     
	 */
	public getAttribute(key: string): any {
		return this._attributes[key];
	}

	/**
	 * public isAttribute
	 *
	 *	Checks for existance of a data detail on this asset.
	 * 
	 * @param  {String}  key 
	 * @return {Boolean}     
	 */
	public isAttribute(key: string): boolean {
		return !!this._attributes[key];
	}

	/**
	 * public removeAttribute
	 *
	 *	Removes a data attribute from this asset.
	 * 
	 * @param  {String} key 
	 * @return {void}     
	 */
	public removeAttribute(key: string): void {
		delete this._attributes[key];
	}

	/**
	 * public hook onStateChange
	 *
	 * 	Invoked when state changes.
	 * 
	 * @param  {AssetState} state Possible values:
	 *                     			- AssetState.NOT_LOADED
	 *                              - AssetState.LOADING
	 *                              - AssetState.LOADED
	 * @deprecated Use on(AssetEventType.STATE_CHANGE) instead.
	 * @return {void}       
	 */
	public onStateChange(state: AssetState): void {}

	/**
	 * public onDataChange
	 *
	 *	Invoked when data changes.
	 * 
	 * @param  {Mixed} data Must be prepared to handle null.
	 * @deprecated Use on(AssetEventType.DATA_CHANGE) instead.
	 * @return {void}      
	 */
	public onDataChange(data: Object): void {}

	/**
	 * public onError
	 *
	 *	Invoked when there was an error while loading asset data.
	 *  Note: Prior usage was a hook function. Now this should be treated as a protected method,
	 *  however TypeScript doesn't have "friend" class support, and AssetLoader needs to invoke this method.
	 * 
	 *  Use 
	 * 
	 * 		on(AssetEvents.ERROR)
	 * 
	 *  OR
	 * 
	 * 		load().catch((error) => { ... })
	 *  
	 * to receive the error instead.
	 * 
	 * @param  {Object} error
	 * @return {void}       
	 */
	public onError(error?: Object): void {
		this.emit(AssetEvents.ERROR, error);
	}
}
