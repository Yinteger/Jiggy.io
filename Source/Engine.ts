import ViewPort from "./Utils/ViewPort";
import Camera from "./Utils/Camera";
import {AudioEngine} from './Audio/AudioEngine';
import HTML5AudioEngine from "./Audio/HTML5AudioEngine";
import {AssetFactory, AssetType} from './Assets/AssetFactory';
import RenderingEngine from "./Engines/RenderingEngine";
import {LogManager, SeverityEnum} from "./Utils/LogManager";

//Typescript Testing Imports
import TwoDRenderingEngine from "./Engines/TwoDRenderingEngine";
import GroupLogicEngine from "./Engines/GroupLogicEngine";
import GridMap from "./Entities/GridMap";
import Entity from "./Entities/Entity";
import {Animation} from "./Assets/Animation";
import {AssetState} from "./Assets/Asset";
import {Spritesheet} from "./Assets/Spritesheet";
//End//

class Engine {
	private _renderingEngine : RenderingEngine;
	public audioEngine : AudioEngine;
	public logManager : LogManager;
	public assetFactory : AssetFactory;
	public viewPort : ViewPort;
	private debugMode : boolean;

	constructor () {
		this.debugMode = false;

		this.logManager = LogManager.getInstance();

		//Setup the default AssetFactory
		this.assetFactory = AssetFactory.getSingleton();

		this.audioEngine = new HTML5AudioEngine();

		//Create the ViewPort
		this.viewPort = new ViewPort();

		//If Engine is ready, notify our callback
		if (this.onInit) {
			this.logManager.log(SeverityEnum.INFO, 'Engine has started.');
			this.onInit(this.viewPort.canvas)
		} else {
			this.logManager.log(SeverityEnum.WARNING, 'No onInit specified for Zengine. How will you know when to start using it?!');
		}
	}

	set renderingEngine (renderingEngine : RenderingEngine) : void {
		if (this.renderingEngine) {
			//Stop the old rendering engine
		}

		this._renderingEngine = renderingEngine;

		//Start the new Rendering engine, pass in View Port, etc...
		this._renderingEngine.viewPort = this.viewPort;
		this._renderingEngine.startRendering();
	}

	get renderingEngine () : RenderingEngine {
		return this._renderingEngine;
	}
}

declare var window.PopcornEngine : Engine;
window.PopcornEngine = new Engine();

declare var window.PopcornTwoDEngine : TwoDRenderingEngine;
window.PopcornTwoDEngine = new TwoDRenderingEngine();

declare var window.PopcornEntity : Entity;
window.PopcornEntity = Entity;

declare var window.PopcornCamera : Camera;
window.PopcornCamera = Camera;

declare var window.PopcornAssetFactory : AssetFactory;
window.PopcornAssetFactory = AssetFactory.getSingleton();

declare var window.PopcornAssetFactoryEnum : AssetType;
window.PopcornAssetFactoryEnum = AssetType;

declare var window.PopcornAssetState : AssetState;
window.PopcornAssetState = AssetState;

declare var window.PopcornSpritesheet : Spritesheet;
window.PopcornSpritesheet = Spritesheet;

declare var window.PopcornAnimation : Animation;
window.PopcornAnimation = Animation;