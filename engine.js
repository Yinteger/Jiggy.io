//Create top level packages
var zen = {
	engines : {},
	entities: {},
}

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
	this._init();
};