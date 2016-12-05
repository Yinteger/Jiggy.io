import {
	AssetLoader,
	AudioLoader,
	ImageLoader,
	JSONLoader,
	Asset,
	AssetState,
	AssetType
} from './';

interface AssetCache {
	[url: string]: Asset;
}

export class AssetFactory {
	private _assetLoader: AssetLoader;
	private _audioLoader: AudioLoader;
	private _imageLoader: ImageLoader;
	private _jsonLoader: JSONLoader;
	private _cache: AssetCache;
	private static _instance: AssetFactory;

	constructor() {
		if (AssetFactory._instance) {
			throw new Error('AssetFactory is a singleton. Use AssetFactory.getSingleton()');
		}

		AssetFactory._instance = this;

		this._assetLoader = new AssetLoader();
		this._audioLoader = new AudioLoader();
		this._imageLoader = new ImageLoader();
		this._jsonLoader = new JSONLoader();
		this._cache = {};
	}

	public static getSingleton(): AssetFactory {
		if (!AssetFactory._instance) {
			new AssetFactory();
		}
		return AssetFactory._instance;
	}

	/**
	 * public build
	 *
	 *	Builds an asset of the given type.
	 *	See zen.assets.AssetFactory.TYPES enumeration.
	 * 
	 * @param  {zen.assets.AssetFactory.TYPES} type 
	 * @param  {String} url  
	 * @return {zen.assets.Asset}      
	 */
	public build(type: AssetType, url: string): Asset {
		var asset: Asset;
		var cache: Asset = this._cache[url];
		if (cache) {
			asset = this._clone(cache);
		}
		else {
			asset = new Asset(type, url);
		}

		if (!cache) {
			switch(type) {
				default:
					break;
				case AssetType.RAW:
					asset.setLoadStrategy(this._assetLoader);
					this._configureRawAsset(asset, url);
					break;
				case AssetType.IMAGE:
					asset.setLoadStrategy(this._imageLoader);
					this._configureImageAsset(asset, url);
					break;
				case AssetType.AUDIO:
					asset.setLoadStrategy(this._audioLoader);
					this._configureAudioAsset(asset, url);
					break;
				case AssetType.JSON:
					asset.setLoadStrategy(this._jsonLoader);
					this._configureJSONAsset(asset, url);
					break;
			}
			this._cache[url] = asset;
		}

		return asset;
	}

	/**
	 * protected _configureRawAsset
	 *
	 *	Sets up specific asset details for Raw type assets.
	 * 
	 * @param  {zen.assets.Asset} asset 
	 * @param  {String} url   
	 * @return {void}       
	 */
	protected _configureRawAsset(asset: Asset, url: string): void {}

	/**
	 * protected _configureImageAsset
	 *
	 *	Sets up specific asset details for Image type assets.
	 * 
	 * @param  {zen.assets.Asset} asset 
	 * @param  {String} url   
	 * @return {void}       
	 */
	protected _configureImageAsset(asset: Asset, url: string): void {
		var img: HTMLImageElement = document.createElement('img');
		img.addEventListener('load', function() {
			asset.setState(AssetState.LOADED);
		});
		asset.setData(img);
	}

	/**
	 * protected _configureJSONAsset
	 *
	 *	Sets up specific asset details for JSON type assets.
	 * 
	 * @param  {zen.assets.Asset} asset 
	 * @param  {String} url   
	 * @return {void}       
	 */
	protected _configureJSONAsset(asset: Asset, url: string): void {}

	/**
	 * protected _configureAudioAsset
	 *
	 *	Sets up specific asset details for Audio type assets.
	 * 
	 * @param  {zen.assets.Asset} asset 
	 * @param  {String} url
	 * @return {void}       
	 */
	protected _configureAudioAsset(asset: Asset, url: string): void {
		var audio: HTMLAudioElement = document.createElement('audio');
		audio.addEventListener('canplaythrough', function() {
			asset.setState(AssetState.LOADED);
		});
		asset.setData(audio);
	}

	/**
	 * protected _clone
	 *
	 *	Clones a given asset.
	 * 
	 * @param  {zen.assets.Asset} asset 
	 * @return {void}       
	 */
	protected _clone(asset: Asset): Asset {
		var type: AssetType = asset.getType();
		var clone = new Asset(type, asset.getSource());
		this._cloneAssetData(clone, asset, type);
		return clone;
	}

	/**
	 * protected _cloneAssetData
	 *
	 *	Can be overridden, but subclasses should always call this as a super
	 *	method. Provides implementation to cloning each specific type of asset.
	 * 
	 * @param  {zen.assets.Asset} clone The clone
	 * @param  {zen.assets.Asset} asset The original
	 * @param  {Enumeration} type  
	 * @return {void}       
	 */	
	protected _cloneAssetData(clone: Asset, asset: Asset, type: AssetType): void {
		var data: any = null;
		switch(type) {
			default:
				data = asset.getData();
				break;
			case AssetType.IMAGE:
				data = this._cloneNode(<Node>asset.getData());
				break;
			case AssetType.AUDIO:
				data = this._cloneNode(<Node>asset.getData());
				break;
		}

		clone.setLoadStrategy(asset.getLoadStrategy());
		clone.setData(data);
	}

	/**
	 * protected _cloneNode
	 *
	 *	Clones a node style asset.
	 * 
	 * @param  {HTMLDomElement} node 
	 * @return {HTMLDomElement}      a clone
	 */
	protected _cloneNode(node: Node): Node {
		if (node) {
			return node.cloneNode(true);
		}
		else {
			return null;
		}
	}
}
