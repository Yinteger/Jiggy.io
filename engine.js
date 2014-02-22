//Create top level packages
var zen = {
	engines : {},
	entities: {},
	util 	: {},

	ENGINE_DIR : '/popcorn-engine/',
	FRAMEWORK_DIR : '/popcorn-framework/',

	/**
	 * public generateID
	 *
	 *	Generates a GUID (Global Unique IDentifier)
	 * 
	 * @return {String} 
	 */
	generateID: function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16|0, v = c === 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},

	/**
	 * public extends
	 *
	 *	Used to create class definitions.
	 * 
	 * @param  {Function} baseClass  Optional base constructor. Pass null if there is no base class.
	 * @param  {Function} subClass   The constructor
	 * @param  {Object} properties	 The definition of the Class. 
	 * @return {void}            
	 */
	extends: function(baseClass, subClass, properties) {
		if (baseClass) {
	   		subClass.prototype = Object.create(baseClass.prototype);
	  	}

	  	subClass.prototype.constructor = subClass;

	  	if (properties) {
	   		for (var i in properties) {
	   		 	subClass.prototype[i] = properties[i];
	   		}
	  	}
	}
};

//Initialize the Game Engine (Singleton)
zen.engine = function (onInit) {
	//Hash table of Cameras for the game
	this.cameras = {

	};

	//Different sub engines this engine will use
	this.renderingEngine = null;
	this.soundEngine = null;
	this.physicEngine = null;

	//Variable to hold the Viewport, aka the Canvas
	this.viewPort = null;

	//onInit is called once the Engine is initialized
	this.onInit = onInit;

	//Begin loading dependencies for the Engine to start
	this._loadDependencies();
};

zen.engine.prototype.setRenderingEngine = function (renderingEngine) {
	if (this.renderingEngine) {
		//Stop the old rendering engine
	}

	this.renderingEngine = renderingEngine;

	//Start the new Rendering engine, pass in View Port, etc...
};

zen.engine.prototype.setSoundEngine = function (soundEngine) {
	this.soundEngine = soundEngine;
};

zen.engine.prototype.setPhysicEngine = function (physicEngine) {

};

zen.engine.prototype._init = function () {
	//Create the ViewPort

	//If Engine is ready, notify our callback
	if (this.onInit) {
		this.onInit()
	} else {
		console.warn('No onInit specified for Zengine. How will you know when to start using it?!');
	}
};

zen.engine.prototype._loadDependencies = function () {
	//Make sure all Engine dependencies are loaded, then call the _init
	var self = this;

	//DEVELOPMENT CODE ONLY
	var basync = new Basync();

	//ENGINES PACkAGE

	//ENTITIES PACKAGE
	basync.addDependency('zen.entities.EntityModel', zen.ENGINE_DIR + 'entities/EntityModel', [
		'zen.util.Observer'
	]);
	basync.addDependency('zen.entities.Entity', zen.ENGINE_DIR + 'entities/Entity', [
		'zen.entities.EntityModel',
		'zen.entities.EntityView'
	]);
	basync.addDependency('zen.entities.EntityView', zen.ENGINE_DIR + 'entities/EntityView');

	//UTIL PACkAGE
	basync.addDependency('zen.util.Observer', zen.ENGINE_DIR + 'util/Observer');

	basync.onReady(function() {
		self._init();
	});

	basync.importAll();
};