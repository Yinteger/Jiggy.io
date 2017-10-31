import * as Events from 'events';
import {EntityModel, ModelEventTypes, AttrChangeEvent} from "./";

export class EntityView extends Events.EventEmitter {
	protected _visible : boolean;
	// private _notifyCallback : {(attribute: string, value: any) : void};
	protected _bindedFuncs :  {[key: string] : (event: Event) => void};
	protected _model : EntityModel;

	public constructor (model: EntityModel) {
		super();
		this._visible = true;
		this._model = model;
		this._bindedFuncs = {};

		// this._notifyCallback = (data: any) => {this.notify(data)}
		this._attachEvents();


	}

	public setVisible (visible: boolean): void {
		this._visible = visible;
	}

	public getVisible (): boolean {
		return this._visible;
	}

	public setModel (model: EntityModel): void {
		if (this._model) {
			this._detachEvents();
		}
		this._model = model;
		this._attachEvents();
	}

	private _handleAttrChange (e: AttrChangeEvent) : void {
		//Do stuff
		// console.log(this.visible);
		// this._detachEvents();
	}

	private _attachEvents () : void {
		this._model.on(ModelEventTypes.ATTR_CHANGE.toString(), (this._bindedFuncs[ModelEventTypes.ATTR_CHANGE.toString()] = this._handleAttrChange.bind(this)));
		
		// model.sync(this);	
	}

	private _detachEvents () : void {
		this._model.removeListener(ModelEventTypes.ATTR_CHANGE.toString(), this._bindedFuncs[ModelEventTypes.ATTR_CHANGE.toString()]);
		// this._clear();
	}
}