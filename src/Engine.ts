import {ViewPort, Camera, LogManager, SeverityEnum} from './Utils';
import {AudioEngine, HTML5AudioEngine} from './Audio';
import {AssetFactory,AssetType,	AssetState} from './Assets';
import {RenderingEngine,GroupLogicEngine,TwoDimensionalRenderingEngine, LogicEngine} from './Engines';

//Typescript Testing Imports
import {GridMap,Entity} from './Entities';
import {ControllerFactory} from './Inputs';
import {Animation,Spritesheet} from './Assets';
import {CollisionEmitter} from './Utils';

//End//

export default class Engine {
	protected static _instance: Engine;
	private _renderingEngine : RenderingEngine;
	public audioEngine : AudioEngine;
	public logManager : LogManager;
	public assetFactory : AssetFactory;
	public logicEngine : LogicEngine;
	public viewPort : ViewPort;
	private debugMode : boolean;

	constructor () {
		if (Engine._instance) {
			throw new Error('Engine is a singleton');
		}
		Engine._instance = this;

		this.debugMode = false;

		this.logManager = LogManager.getSingleton();

		//Setup the default AssetFactory
		this.assetFactory = AssetFactory.getSingleton();

		this.audioEngine = new HTML5AudioEngine();

		//Create the ViewPort
		this.viewPort = new ViewPort();

		this.logManager.log(SeverityEnum.INFO, 'Engine has started.');
	}

	public static getSingleton(): Engine {
		if (!Engine._instance) {
			new Engine();
		}

		return Engine._instance;
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