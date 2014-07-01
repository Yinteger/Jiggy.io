//Create top level packages
var zen = {
	assets  : {},
	audio 	: {},
	engines : {},
	entities: {},
	util 	: {},

	app 	: null,

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
	 * @param  {Object} staticProperties Optional. Defines a list of 
	 *                                   variables or functions that 
	 *                                   should be statically available
	 *                                   on the sub class.
	 * @return {void}            
	 */
	extends: function(baseClass, subClass, properties, staticProperties) {
		if (baseClass) {
			subClass.prototype = Object.create(baseClass.prototype);
		}

		subClass.prototype.constructor = subClass;

		if (properties) {
			for (var i in properties) {
				subClass.prototype[i] = properties[i];
			}
		}

		if (staticProperties) {
			for (var i in staticProperties) {
				subClass[i] = staticProperties[i];
			}
		}
	}
};

//Initialize the Game Engine (Singleton)
zen.engine = function (onInit) {
	zen.app = this;
	
	//Hash table of Cameras for the game
	this.cameras = {

	};

	//Different sub engines this engine will use
	this.renderingEngine = null;
	this.audioEngine = null;
	this.physicEngine = null;

	//Factories
	this.assetFactory = null;

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
	this.renderingEngine.setViewPort(this.viewPort);
	this.renderingEngine.startRendering();

};

zen.engine.prototype.setAudioEngine = function (audioEngine) {
	this.audioEngine = audioEngine;
};

zen.engine.prototype.setPhysicEngine = function (physicEngine) {

};

zen.engine.prototype.setLogicEngine = function (logicEngine) {
	this.logicEngine = logicEngine;
},

zen.engine.prototype.setAssetFactory = function(assetFactory) {
	this.assetFactory = assetFactory;
},

zen.engine.prototype._init = function () {
	//Setup the default AssetFactory
	this.setAssetFactory(zen.assets.AssetFactory.getSingleton());

	this.setAudioEngine(new zen.audio.HTML5AudioEngine());

	//Create the ViewPort
	this.viewPort = new zen.ViewPort();

	//If Engine is ready, notify our callback
	if (this.onInit) {
		this.onInit(this.viewPort.getCanvas())
	} else {
		console.warn('No onInit specified for Zengine. How will you know when to start using it?!');
	}
};

zen.engine.prototype._loadDependencies = function () {
	//Make sure all Engine dependencies are loaded, then call the _init
	var self = this;

	//DEVELOPMENT CODE ONLY
	var basync = new Basync();

	//Base Package
	basync.addDependency('zen.ViewPort', zen.ENGINE_DIR + 'ViewPort');

	//ASSETS PACKAGE
	basync.addDependency('zen.assets.AssetFactory', zen.ENGINE_DIR + 'assets/AssetFactory', [
		'zen.assets.Asset',
		'zen.assets.AssetLoader',
		'zen.assets.ImageLoader',
		'zen.assets.AudioLoader',
		'zen.assets.JSONLoader'
	]);
	basync.addDependency('zen.assets.Asset', zen.ENGINE_DIR + 'assets/Asset');
	basync.addDependency('zen.assets.AssetLoader', zen.ENGINE_DIR + 'assets/AssetLoader');
	basync.addDependency('zen.assets.ImageLoader', zen.ENGINE_DIR + 'assets/ImageLoader', [
		'zen.assets.AssetLoader',
	]);
	basync.addDependency('zen.assets.AudioLoader', zen.ENGINE_DIR + 'assets/AudioLoader', [
		'zen.assets.AssetLoader',
	]);
	basync.addDependency('zen.assets.JSONLoader', zen.ENGINE_DIR + 'assets/JSONLoader', [
		'zen.assets.AssetLoader',
	]);

	//AUDIO PACKAGE
	basync.addDependency('zen.audio.AudioEngine', zen.ENGINE_DIR + 'audio/AudioEngine', [
		'zen.assets.AssetFactory'
	]);
	basync.addDependency('zen.audio.HTML5AudioEngine', zen.ENGINE_DIR + 'audio/HTML5AudioEngine', [
		'zen.audio.AudioEngine'
	]);

	//ENGINES PACkAGE
	basync.addDependency('zen.engines.RenderingEngine', zen.ENGINE_DIR + "engines/RenderingEngine");
	basync.addDependency('zen.engines.TwoDRenderingEngine', zen.ENGINE_DIR + "engines/2DRenderingEngine", ['zen.engines.RenderingEngine']);
	basync.addDependency('zen.engines.LogicEngine', zen.ENGINE_DIR + "engines/LogicEngine");
	basync.addDependency('zen.engines.GroupLogicEngine', zen.ENGINE_DIR + "engines/GroupLogicEngine");

	//ENTITIES PACKAGE
	basync.addDependency('zen.entities.EntityModel', zen.ENGINE_DIR + 'entities/EntityModel', [
		'zen.util.Observer'
	]);
	basync.addDependency('zen.entities.Entity', zen.ENGINE_DIR + 'entities/Entity', [
		'zen.entities.EntityModel',
		'zen.entities.EntityView'
	]);
	basync.addDependency('zen.entities.EntityView', zen.ENGINE_DIR + 'entities/EntityView');
	basync.addDependency('zen.entities.EntityView2D', zen.ENGINE_DIR + 'entities/EntityView2D', [
		'zen.entities.EntityView'
	]);
	//UTIL PACkAGE
	basync.addDependency('zen.util.Observer', zen.ENGINE_DIR + 'util/Observer');
	basync.addDependency('zen.util.Camera', zen.ENGINE_DIR + "util/Camera");

	basync.onReady(function() {
		self._init();
	});

	basync.importAll();
};