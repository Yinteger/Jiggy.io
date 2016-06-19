import * as Events from 'events';
import Iterator from "../Utils/Iterator";



export enum ModelEventTypes {
	ATTR_CHANGE = 1,
	ATTR_DELETE = 2,
	TEXTURE_CHANGE = 3,
	TEXTURE_DELETE = 4
}

interface AttrChangeEvent {
	attribute : string,
	oldValue : any,
	value : any
}

interface shortAttrChangeEvent {
	attribute : string,
	value : any
}

interface AttrDeleteEvent {
	attribute : string,
	value : any
}

interface TextureChangeEvent {
	attribute: string,
	name: string,
	value: Asset
}

export default class EntityModel extends Events.EventEmitter {
	private _attributes : {[key: string]: any};
	private _id : string;
	public type : string;
	private _texture : Asset;

	get ID () : string {
		return this._id;
	}

	set texture (texture: Asset) {
		this._texture = asset;
		this.emit(ModelEventTypes.TEXTURE_CHANGE, {
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
		this.emit(ModelEventTypes.ATTR_CHANGE, {
			attribute : key,
			oldValue : oldValue,
			value : value
		});
	}

	public removeAttribute(key: string) : void {
		var value = this.getAttribute(key);
		delete this._attributes[key];
		if (this._isNotifierKey(key)) {
			this.emit(ModelEventTypes.ATTR_DELETE, {
				attribute : key,
				value : value
			});
		}
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

	public iterator () : Iterator {
		return new Iterator(this._attributes);
	}

	public sync (listener : any) : void {
		var evt = ModelEventTypes.ATTR_CHANGE;
		var iter = this.iterator();
		var item;
		while (iter.hasNext()) {
			item = iter.next();
			listener.notify(evt, {
				attribute 	: item.key,
				value 		: item.value
			});
		}
		// listener.notify(evt, {
		// 	attribute 	: 'textures',
		// 	value 		: this.collectTextures()
		// });
	}

}