import * as Events from 'events';
import {EntityModel, ModelEventTypes} from "./EntityModel";

export default class EntityView extends Events.EventEmitter {
	public visible : boolean;
	private _notifyCallback : {(attribute: string, value: any) : void};

	constructor () {
		super();
		this.visible = true;
		this._notifyCallback = (attribute: string, value: any) => {this.notify(attribute, value)}
	}

	public attachListener (model : EntityModel) : void {
		model.on(ModelEventTypes.ATTR_CHANGE.toString(), this._notifyCallback);
		// model.sync(this);	
	}

	public deattachListener (model : EntityModel) : void {
		model.removeListener(ModelEventTypes.ATTR_CHANGE.toString(), this._notifyCallback);
		// this._clear();
	}

	public notify (event: string, data: any) : void {
		switch(data.attribute) {
			case 'visible':
				this.visible = data.value;
				break;
			/*case 'x':
				break;
			case 'y':
				break;
			case 'width':
				this._setWidth(data.value);
				break;
			case 'height':
				this._setHeight(data.value);
				break;
			case 'color':
				var c = data.value;
				this._setColor(
					c[zen.entities.EntityView.static.R], 
					c[zen.entities.EntityView.static.G], 
					c[zen.entities.EntityView.static.B], 
					c[zen.entities.EntityView.static.A]
				);
				break;*/
		}
	}
}