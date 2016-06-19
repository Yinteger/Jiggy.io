import * as Events from 'events';
import EntityModel from "./EntityModel";

export default class EntityView extends Events.EventEmitter {
	public visible : boolean;

	constructor () {
		super();
		this.visible = true;
	}

	public attachListener (model : EntityModel) : void {
		model.on(ModelEventTypes.ATTR_CHANGE, (attribute: string, value: any) => {this.notify(attribute, value)});
		model.sync(this);	
	}

	public deattachListener (model : EntityModel) : void {
		model.removeListener(this);
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