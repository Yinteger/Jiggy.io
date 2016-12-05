import * as Events from 'events';
import {Iterator, IDGenerator} from "./.";
import {Asset} from "../assets/Asset";
import {
	ModelEventTypes,
	ShortAttrChangeEvent,
	TextureChangeEvent,
	AttrDeleteEvent
} from './';

export class EntityModel extends Events.EventEmitter {
	private _attributes : {[key: string]: any};
	private _id : string;
	public type : string;
	private _texture : Asset;

	constructor () {
		super();
		this._attributes = {};
		this._id = IDGenerator.getSingleton().generate();
		this.type = 'generic';
	}

	get ID () : string {
		return this._id;
	}

	set texture (asset: Asset) {
		this._texture = asset;
		this.emit(ModelEventTypes.TEXTURE_CHANGE.toString(), {
			attribute : 'texture',
			name : name,
			value : asset
		});
	}

	get texture () : Asset {
		return this._texture;
	}

	public setAttribute (key : string, value : any) : void {
		var oldValue = this.getAttribute(key);
		this._attributes[key] = value;
		this.emit(ModelEventTypes.ATTR_CHANGE.toString(), {
			attribute : key,
			oldValue : oldValue,
			value : value
		});
	}

	public removeAttribute(key: string) : void {
		var value = this.getAttribute(key);
		delete this._attributes[key];
		// if (this._isNotifierKey(key)) {
			var data : AttrDeleteEvent = {
				type: ModelEventTypes.ATTR_DELETE.toString(),
				attribute : key,
				value : value,
				source: this
			};

			this.emit(ModelEventTypes.ATTR_DELETE.toString(), data);
		// }
	}

	public getAttribute (key : string) : any {
		return this._attributes[key];
	}

	public hasAttribute (key: string) : boolean {
		if (this._attributes[key]) {
			return true;
		}
		else {
			return false;
		}
	}

	// public iterator () : Iterator {
	// 	// return new Iterator(this._attributes);
	// }

	public sync (listener : any) : void {
		// var evt = ModelEventTypes.ATTR_CHANGE.toString();
		// var iter = this.iterator();
		// var item : any;
		// while (iter.hasNext()) {
		// 	item = iter.next();
		// 	listener.notify(evt, {
		// 		attribute 	: item.key,
		// 		value 		: item.value
		// 	});
		// }
		// listener.notify(evt, {
		// 	attribute 	: 'textures',
		// 	value 		: this.collectTextures()
		// });
	}

}