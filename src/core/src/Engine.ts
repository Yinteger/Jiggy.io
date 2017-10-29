import {ViewPort, Camera, LogManager, SeverityEnum} from '@jiggy/utils';
import {AudioEngine, HTML5AudioEngine} from '@jiggy/audio';
import {AssetFactory,AssetType,	AssetState} from '@jiggy/assets';
import {RenderingEngine,GroupLogicEngine,TwoDimensionalRenderingEngine, LogicEngine} from '@jiggy/engines';

//Typescript Testing Imports
import {GridMap,Entity} from '@jiggy/entities';
import {ControllerFactory} from '@jiggy/inputs';
import {Animation,Spritesheet} from '@jiggy/assets';
import {CollisionEmitter} from '@jiggy/utils';
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

		this.debugMode = false;

		this.logManager = LogManager.getSingleton();

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

export { Engine };
