import * as Events from 'events';
import {Dimension} from "../Interfaces/Dimension";
import {Coordinate} from "../Interfaces/Coordinate";
import {Color} from "../Interfaces/Color";
import Iterator from "../Utils/Iterator";
import {EntityModel, ModelEventTypes} from "./EntityModel";
import EntityView from "./EntityView";

export default class Entity extends Events.EventEmitter {
	public view : EntityView;
	protected _model : EntityModel;
	protected _children : Entity[];
	private _regions : Entity[][][];
	private _regionDimension : Dimension;
	private _regionList : {[key: string]: Coordinate[]};
	protected _parent : Entity;
	private _modified : boolean;
	private _notifierKeys : string[];
	private _parentNotifierKeys : string[];
	private _modelCB : {(attribute: string, value: any, oldValue: any) : void}

	constructor (model? : EntityModel) {
		super();
		var useDefaults :  boolean = false;

		//Check to see if a model was passed in
		if (!model) {
			//No model was passed in, so create the default model for an Entity
			model = new EntityModel();
			useDefaults = true;
		}
		
		//TODO figure out how to decide what EntityView class we should use...
		this.view = new EntityView();
		this.model = model;
		
		this._children = new Array(); //Array to store all the children entities

		//Region Management
		this._regions = []//Array of generated 'regions' of children to make children searching more efficient, by splitting them up into regions by position & dimensions
		this._regionDimension; //The dimensions of the regions for this Entity
		this._regionList = {}; //Mapping of Children to Region(s) so we don't have to search

		//Layer Management
		// this.layers = [[]]; //Layers for rendering so children can be rendering in proper order
		// this.layerList = {}; //Mapping of Children to Layers so we don't have to search

		this._parent = null; //Parent is the entity that contains this one
		this._modified = false; //Whether or not this Entity has been modified
		this._notifierKeys = ['width', 'height',  'color', 'texture', 'textures']; //Model attributes in which we should change isModified for
		this._parentNotifierKeys = ['x', 'y']; //Array of attributes to flag the parent as modified, anything in notifierKeys will do so by default, this list is for keys that don't mark this entity as isMOdified but should mark the parents

		this._modelCB = (attribute: string, value: any, oldValue: any) => {
			if (this._notifierKeys.indexOf(attribute) > -1) {
				this._setModified(true);
			} else if (this._parent && this._parentNotifierKeys.indexOf(attribute) > -1) {
				this._parent._setModified(true);
			}
		}

		if (useDefaults) {
			this._setDefaults();
		}
	}

	get ID () {
		return this.model.ID;
	}

	get parent () {
		return this._parent;
	}

	get regions () {
		return this._regions;
	}

	get regionDimension () {
		return this._regionDimension;
	}

	get type () {
		return this.model.type;
	}

	set type (type: string) {
		this.model.type = type;
	}

	get model ()   : EntityModel {
		return this._model;
	}

	set model (model : EntityModel) {
		var view = this.view;
		var oldModel = this.model;

		if (oldModel) {
			view.deattachListener(oldModel);
			oldModel.removeListener(ModelEventTypes.ATTR_CHANGE.toString(), this._modelCB);
		}

		this.model = model;
		view.attachListener(model);
		model.on(ModelEventTypes.ATTR_CHANGE.toString(),  this._modelCB);
	}

	get height () : number {
		return this.model.getAttribute('height');
	}

	set height (height: number) {
		this.model.setAttribute('height', height);
		this._generateRegions();
	}

	get width () : number {
		return this.model.getAttribute('width');
	}

	set width (width: number) {
		this.model.setAttribute('width', width);
		this._generateRegions();
	}

	get x () {
		return this.model.getAttribute('x');
	}

	set x (x : number) {
		this.model.setAttribute('x', x);
		if (this.parent) {
			this.parent._updateChildsRegion(this);
		}
	}

	get x2 () : number {
		return this.x + this.width;
	}

	get y () {
		return this.model.getAttribute('y');
	}

	set y (y: number) {
		this.model.setAttribute('y', y);
		if (this.parent) {
			// this.parent._updateChildsRegion(this); //Commented out until setX & SetY are combined or something...
		}
	}

	get y2 () : number {
		return this.y + this.height;
	}

	get z () {
		return this.model.getAttribute('z');
	}

	set z (z: number) {
		this.model.setAttribute('z', z);
	}

	get visible () : boolean {
		return this.model.getAttribute('visible');
	}

	set visible (state: boolean) {
		this.model.setAttribute('visible', state);
	}

	get color () : Color {
		var data = this.model.getAttribute('color');
		// return [data.r, data.g, data.b, data.r];
		return data;
	}

	get texture () : Asset {
		return this.model.texture;
	}

	set texture (asset  : Asset) {
		if (asset.getType() !== zen.assets.AssetFactory.TYPES.IMAGE) {
			throw new Error('Texture asset must be of type IMAGE.');
		}

		this.model.texture = asset;
		this._setModified(true);
	}


	/**
	 * public isModified
	 *
	 *	Indicates whether this Entity has been modified since the last render frame.
	 * 
	 * @return {Boolean}
	 */
	 public isModified () : boolean {
		return this._modified;
	 }

	/**
	 * public addChild
	 *
	 *	Adds a child entity node to this entity.
	 * 
	 * @param {zen.entities.Entity} child 
	 * @return {void}  
	 */
	 public addChild (child : Entity) : void {
		var parent = child.parent;
		if (parent) {
			parent.removeChild(child);
		}
		this._children.push(child);
		child.parent = this;

		//Region Management
		this._putChildInRegion(child);
	 }

	/**
	 * public removeChild
	 *
	 *	Removes a child entity node from this entity.
	 * 
	 * @param  {zen.entities.Entity} child 
	 * @return {void}       
	 */
	 public removeChild (child : Entity) : void {
		if (this.isChild(child)) {
			var idx = this.indexOf(child);
			this._children.splice(idx, 1);
		}

		//Region Management
		this._removeChildFromRegions(child);
		delete this._regionList[child.ID];
	 }	 

	/**
	 * public removeAllChildren
	 *
	 *	Removes all child nodes of this entity.
	 * 
	 * @return {void} 
	 */
	 public removeAllChildren () : void {
		var child : Entity;
		while (child = this.getChildAt(0)) {
			this.removeChild(child);	
		}
	 }

	/**
	 * public isChild
	 *
	 *	Checks to see if the given entity is a child of
	 *	this entity.
	 * 
	 * @param  {zen.entities.Entity}  child 
	 * @return {Boolean}       
	 */
	 public isChild (child : Entity) : boolean {
		return (this.indexOf(child) > -1);
	 }

	/**
	 * public indexOf
	 *
	 *	Finds the index of the given entity.
	 * 
	 * @param  {zen.entities.Entity} child 
	 * @return {Integer}       
	 */
	 public indexOf (child : Entity) : number {
		return this._children.indexOf(child);
	 }

	/**
	 * public childCount
	 *
	 *	Counts the number of child nodes inside this entity.
	 * 
	 * @return {Integer} 
	 */
	 public childCount () : number {
		return this._children.length;
	 }

	/**
	 * public getChildAt
	 *
	 *	Gets a child entity at the given index.
	 * 
	 * @param  {Integer} index 
	 * @return {zen.entities.Entity}       
	 */
	 public getChildAt (index: number) : Entity {
		return this._children[index];
	 }

	/**
	 * private setModified
	 *
	 *	Sets whether this Entity has been modified since the last render
	 *	frame.
	 * 
	 * @param {Boolean} state
	 */
	 private _setModified (state: boolean) : void {
		this._modified = state;
		if (this._parent) {
			this._parent._setModified(state);
		}
	 }

	/**
	 * public iterator DEPRECATED - use getChildren()
	 *
	 *	Creates a child node iterator for this entity.
	 * 
	 * @return {Object} {
	 *         hasNext : function()
	 *         next : function()
	 *         hasPrevious : function()
	 *         previous : function()
	 * }
	 */
	 public iterator () : Iterator {
		return new Iterator(this._children);
	 }

	/**
	 * public getChildren
	 *
	 *	Returns an Iterator of Children.  Can pass
	 *	in a set of coordinates to get children in a specific
	 *	region of coordinates relative to the entity (0,0 is top left of this entity).
	 *	If only the starTCoordinate is specified, looks up children who intersect with that point.
	 *	If both arguements are passed in, looks for children who intersect with the rect the coords create.
	 *	If neither are provided, just returns an iterator of all children.
	 *
	 * Not recursive, only checks it's own children
	 *
	 *
	 * @param {zen.data.Coordinate} startCoordinate, optional, The Starting coordinate to loop for children.  Passing only 
	 * this param in will look for children that intersect with this coordinate.
	 * @param { zen.data.Coordinate} endCoordinate, optional, The End coordinate to loop for children.  Passing in this param
	 * creates a region to look for children instead of just a specific point
	 * @return Iterator
	 */
	 public getChildren (startCoordinate? : Coordinate, endCoordinate? : Coordinate) : Iterator {
		if (startCoordinate && endCoordinate) { //Area Lookup
			var startRegion = this._coordinateToRegion(startCoordinate);
			var endRegion = this._coordinateToRegion(endCoordinate);

			//Loop through all regions in the coordinates and collect the children
			var children : Entity[] = [];

			for (var x = startRegion.x; x <= endRegion.x; x ++) {
				for (var y = startRegion.y; y <= endRegion.y; y ++) {
					children = children.concat(this._getChildrenInRegion({x, y}));
				}
			}

			return new Iterator(children);
		} else if (startCoordinate) { //Point Lookup
			var region = this._coordinateToRegion(startCoordinate);

			//Loop through and determine who intersects with the point
			var children : Entity[] = [];

			var childrenIterator = new Iterator(this._getChildrenInRegion({x: region.x, y: region.y}));
			while(childrenIterator.hasNext()) {
				var child = childrenIterator.next();
				var childCoordinate = child.getCoordinate();
				var childOuterCoordinate = child.getOuterCoordinate();

				if (childCoordinate.x <= startCoordinate.x && childCoordinate.y <= startCoordinate.y
					&& childOuterCoordinate.x >= startCoordinate.x && childOuterCoordinate.y >= startCoordinate.y) {
					//Intersects with the startCoordinate
					children.push(child);
				}
			}

			return new Iterator(children);
		} else { //All Lookup
			return new Iterator(this._children);
		}
	 }

	 public findChildren (startCoordinate : Coordinate, endCoordinate : Coordinate) : Entity[] {
		var children : Entity[] = [];

		if (this._children.length > 0) {
			//Find the Region the coordinates belond to
			if (startCoordinate && !endCoordinate) {
				var region = this._coordinateToRegion(startCoordinate);
				var regionChildren = this._getChildrenInRegion({x: region.x, y: region.y});
				if (regionChildren.length > 0) {
					var childrenIterator = new Iterator(regionChildren);
					// var childrenIterator = new zen.util.Iterator(this.children);

					//Loop through all children in that region to see if they intersect
					while(childrenIterator.hasNext()) {
						var iterChild = childrenIterator.next();
						let childCoordinate = iterChild.getCoordinate();
						let childOuterCoordinate = iterChild.getOuterCoordinate();

						if (childCoordinate.x <= startCoordinate.x && childCoordinate.y <= startCoordinate.y
							&& childOuterCoordinate.x >= startCoordinate.x && childOuterCoordinate.y >= startCoordinate.y) {
							//Intersects with the startCoordinate
							children.push(iterChild);

							//See if we can get a deeper child...
							let deeperChildren = iterChild.findChildren({x: startCoordinate.x - childCoordinate.x, y: startCoordinate.y - childCoordinate.y});
							if (deeperChildren) {
								children = children.concat(deeperChildren);
							}
						}
					}
				}
			} else if (startCoordinate && endCoordinate) {
				var startRegion = this._coordinateToRegion(startCoordinate);
				var endRegion = this._coordinateToRegion(endCoordinate);
				var childrenVisited : Entity[] = [];
				//Loop through the regions
				for (var x = startRegion.x; x <= endRegion.x; x ++) {
					for (var y = startRegion.y; y <= endRegion.y; y ++) {
						var regionChildren = this._getChildrenInRegion({x, y});

						for (var regionChildI in regionChildren) {
							var regionChild = regionChildren[regionChildI];

							if (childrenVisited.indexOf(regionChild) === -1) {
								childrenVisited.push(regionChild);
								let childCoordinate = regionChild.getCoordinate();
								let childOuterCoordinate = regionChild.getOuterCoordinate();

								var xCollission = false;
								var yCollision = false;

								if ((startCoordinate.x < childOuterCoordinate.x && endCoordinate.x > childCoordinate.x)
								    || (endCoordinate.x > childCoordinate.x && startCoordinate.x < childOuterCoordinate.x)) {
								    xCollission = true;
								}

								if ((startCoordinate.y < childOuterCoordinate.y && endCoordinate.y > childCoordinate.y)
								    || (endCoordinate.y > childCoordinate.y && startCoordinate.y < childOuterCoordinate.y)) {
								     yCollision = true;
								 }

								if (xCollission && yCollision) {
								    children.push(regionChild);	

								    let deeperChildren = regionChild.findChildren({x: startCoordinate.x - childCoordinate.x, y: startCoordinate.y - childCoordinate.y}, {x: endCoordinate.x - childOuterCoordinate.x, y: endCoordinate.y - childOuterCoordinate.y})
									if (deeperChildren) {
										children = children.concat(deeperChildren);
									}
								}
							}
						}
					}
				}
			}
		}
		
		return children;
	 }

	/**
	 * public findTopChildAt
	 *
	 * Tries to find the deepest child at the top most layer at this coordinates.
	 * TODO: Update this to support Layers once we have layers...
	 *
	 * @param {Coordinate} [coordinate] [Coordinate relative to this entity to loop from]
	 * @return Entity
	 */
	 public findTopChildAt (coordinate : Coordinate) : Entity|boolean {
		var child = false;

		//Find the Region the coordinates belond to
		var region = this._coordinateToRegion(coordinate);
		var regionChildren = this._getChildrenInRegion({x: region.x, y: region.y});
		var childrenIterator = new Iterator(regionChildren);
		childrenIterator.setToEnd();

		//Loop through all children in that region to see if they intersect
		while(childrenIterator.hasPrev() && !child) {
			var iterChild = childrenIterator.prev();
			var childCoordinate = iterChild.getCoordinate();
			var childOuterCoordinate = iterChild.getOuterCoordinate();

			if (childCoordinate.x <= coordinate.x && childCoordinate.y <= coordinate.y
				&& childOuterCoordinate.x >= coordinate.x && childOuterCoordinate.y >= coordinate.y) {
				//Intersects with the startCoordinate
				child = iterChild;

				//See if we can get a deeper child...
				var deeperChild = iterChild.findTopChildAt({x: coordinate.x - childCoordinate.x, y: coordinate.y - childCoordinate.y});
				if (deeperChild) {
					child = deeperChild;
				}
			}
		}
		
		return child;
	 }

	 public getCoordinate () : Coordinate {
	 	return {x: this.x, y: this.y};
	 }

	 public getOuterCoordinate () : Coordinate {
	 	return {x: this.x2, y: this.y2};
	 }

	 public getAbsoluteY () : number {
		var entity : Entity = this;
		var y = 0;
		while (entity) {
			y += entity.y;
			entity = entity.parent;
		}
		return y;
	 }

	 public getAbsoluteY2 () : number {
		return this.getAbsoluteY() + this.height;
	 }

	 public getAbsoluteX () : number {
		var entity : Entity = this;
		var x = 0;
		while (entity) {
			x += entity.x;
			entity = entity.parent;
		}
		return x;
	 }

	 public getAbsoluteX2 () : number {
		return this.getAbsoluteX() + this.width;
	 }

	/**
	 * public setLocation
	 *
	 *	Sets the coordinates of this entity. All arguments are optional.
	 * 
	 * @param {Integer} x 
	 * @param {Integer} y 
	 * @param {Integer} z 
	 */
	 public setLocation (coordinate : Coordinate) : void {
	 	this.x = coordinate.x;
	 	this.y = coordinate.y;
	 }

	/**
	 * public getLocation
	 *
	 *	Gets the coordinates of this entity.
	 * 
	 * @return {Object} {
	 *         x : integer,
	 *         y : integer,
	 *         z : integer
	 * }
	 */
	 public getLocation ()  : Coordinate {
	 	return {
	 		x: this.x,
	 		y: this.y
	 	};
	 }

	 public setSize (dimension : Dimension) : void {
	 	this._setModified(true);
	 	this.width = dimension.width;
	 	this.height = dimension.height;
	 }

	 public getSize () : Dimension {
	 	return {width: this.width, height: this.height};
	 }

	/**
	 * private _setDefaults
	 *
	 *	Sets the default attributes for this entity.
	 * 
	 * @return {void} 
	 */
	 private _setDefaults () : void {
		this.setLocation({x: 0, y: 0});
		this.setSize({width: 0, height: 0});
		this.visible = true;
		// this.setColor(0,0,0,0);
	 }

	/**
	 * private _generateRegions
	 *
	 *	Genetates regions of children to make searches more efficient
	 * 
	 * @return {void} 
	 */
	 private _generateRegions () : void {
		this._regions = []; //Start fresh
		this._regionList = {};

		//Pref we want 100 by 100 region, try to aim as close to it as we can
		if (this.width <= 100) {
			var regionWidth = this.width / 2;
		} else {
			var regionWidth = 50;

		}

		if (this.height <= 100) {
			var regionHeight = this.height / 2;
		} else {
			var regionHeight = 50;
		}

		this._regionDimension = {width: regionWidth, height: regionHeight};

		//Generate the Arrays
		var xCount = Math.ceil(this.width / regionWidth);
		var yCount = Math.ceil(this.height / regionHeight);

		for (var x = 0; x < xCount; x ++) {
			this._regions[x] = [];
			for (var y = 0; y < yCount; y ++) {
				this._regions[x][y] = [];
			}
		}

		//Populate Arrays
		var childrenIterator = this.iterator();
		while (childrenIterator.hasNext()) {
			this._putChildInRegion(childrenIterator.next());
		}
	 }

	 private _putChildInRegion (child: Entity) : void {
		// console.log("Generating start region");
		var startRegion = this._coordinateToRegion({x: child.x, y: child.y});
		// console.log("Generator end region");
		var endRegion = this._coordinateToRegion({x: child.x2, y: child.y2});

		this._regionList[child.ID] = [];

		if (!isNaN(startRegion.x) && !isNaN(startRegion.y) && !isNaN(endRegion.x) && !isNaN(endRegion.y)) {
			//Compare both Regions and add the entity to those regions, and all in between
			for (var x = startRegion.x; x <= endRegion.x; x ++) {
				if (this._regions[x]) { //Overflow protection
					for (var y = startRegion.y; y <= endRegion.y; y ++) {
						if (this._regions[x][y]) { //Overflow Protection
							this._regions[x][y].push(child);
							this._regionList[child.ID].push({x, y});
						}
					}
				}
			}
		} else {
			// zen.app.getLogManager().log(zen.util.LogManager.WARNING, "Unable to put child into region - Out of Bounds", child);
		}
	 }

	 private _getChildrenInRegion (regionCoordinate : Coordinate) : Entity[] {
		if (this._regions[regionCoordinate.x] && this._regions[regionCoordinate.x][regionCoordinate.y]) {
			return this._regions[regionCoordinate.x][regionCoordinate.y];
		} else {
			return [];
		}
	 }

	 private _removeChildFromRegions (child: Entity) : void {
		//Clear Child out of existing regions
		if (this._regionList[child.ID])  {
			for (var i in this._regionList[child.ID]) {
				var coord = this._regionList[child.ID][i];
				this._regions[coord.x][coord.y].splice(this._regions[coord.x][coord.y].indexOf(child), 1);
			}
		}
	 }

	 private _updateChildsRegion (child: Entity) : void {
		this._removeChildFromRegions(child);

		//Add it back into new regions
		this._putChildInRegion(child);
	 }

	 private _coordinateToRegion (coordinate: Coordinate) : Coordinate {
		// console.log('Coordinate To Region', coordinate);
		// console.log('Region Dimension', this.regionDimension);
		var x = Math.floor(coordinate.x / this._regionDimension.width);
		var y = Math.floor(coordinate.y / this._regionDimension.height);
		// console.log('Region Coordinates', new zen.data.Coordinate(x, y));
		return {x, y};
	 }
}