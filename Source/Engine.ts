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
import {ControllerFactory} from './Inputs/ControllerFactory';
import GridMap from "./Entities/GridMap";
import Entity from "./Entities/Entity";
import {Animation} from "./Assets/Animation";
import {AssetState} from "./Assets/Asset";
import {Spritesheet} from "./Assets/Spritesheet";
//End//

export default class Engine {
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

		this.logManager.log(SeverityEnum.INFO, 'Engine has started.');
	}

	set renderingEngine (renderingEngine : RenderingEngine) {
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