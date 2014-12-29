//Create top level packages
var zen = {
	assets  : {},
	audio 	: {},
	data 	: {},
	engines : {},
	entities: {},
	events  : {},
	inputs  : {},
	util 	: {},

	app 	: null,

	ENGINE_DIR : '/popcorn-engine/',
	FRAMEWORK_DIR : '/popcorn-framework/',

	/**
	 * public generateID
	 *
	 * 	TODO: Move this into a Utilities class or package or something..
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
	 *	Used to create class definitions. TODO: Move this somewheres else...
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
	this.InputManager = null;

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

zen.engine.prototype.setInputManager = function(inputManager) {
	this.inputManager = inputManager;
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

	//DATA PACKAGE
	basync.addDependency('zen.data.DataManager', zen.ENGINE_DIR + 'data/DataManager', [
		'zen.util.Observer'
	]);
	basync.addDependency('zen.data.Dimension', zen.ENGINE_DIR + 'data/Dimension');
	basync.addDependency('zen.data.Coordinate', zen.ENGINE_DIR + 'data/Coordinate');

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

	//EVENTS PACKAGE
	
	//INPUTS PACKAGE
	basync.addDependency('zen.inputs.Controller', zen.ENGINE_DIR + 'inputs/Controller');
	basync.addDependency('zen.inputs.InputManager', zen.ENGINE_DIR + 'inputs/InputManager', [
		'zen.inputs.ControllerFactory'
	]);
	basync.addDependency('zen.inputs.ControllerFactory', zen.ENGINE_DIR + 'inputs/ControllerFactory', [
		'zen.inputs.KeyboardController',
		'zen.inputs.MouseController'
	]);
	basync.addDependency('zen.inputs.KeyboardController', zen.ENGINE_DIR + 'inputs/KeyboardController', [
		'zen.inputs.Controller'
	]);
	basync.addDependency('zen.inputs.MouseController', zen.ENGINE_DIR + 'inputs/MouseController', [
		'zen.inputs.Controller'
	]);

	//UTIL PACkAGE
	basync.addDependency('zen.util.Observer', zen.ENGINE_DIR + 'util/Observer');
	basync.addDependency('zen.util.Camera', zen.ENGINE_DIR + "util/Camera");
	basync.addDependency('zen.util.Iterator', zen.ENGINE_DIR + "util/Iterator");

	basync.onReady(function() {
		self._init();
	});

	basync.importAll();
};