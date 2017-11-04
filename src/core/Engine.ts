import {ViewPort, Camera, LogManager, SeverityEnum} from '../utils';
import {AudioEngine, HTML5AudioEngine} from '../audio';
import {AssetFactory,AssetType,	AssetState} from '../assets';
import {RenderingEngine,GroupLogicEngine,TwoDimensionalRenderingEngine, LogicEngine} from '../engines';
import {setInstance} from './Instance';

//Typescript Testing Imports
// import {GridMap,Entity} from '../entities';
//import {ControllerFactory} from '../inputs';
// import {Animation,Spritesheet} from '../assets';
// import {CollisionEmitter} from '../utils';
//End//

export default class Engine {
	private _renderingEngine : RenderingEngine;
	private _audioEngine : AudioEngine;
	private _logManager : LogManager;
	private _assetFactory : AssetFactory;
	private _logicEngine : LogicEngine;
	private _viewPort : ViewPort;
	private _debugMode : boolean;

	public constructor () {
		setInstance(this);

		this._debugMode = false;

		this._logManager = LogManager.getSingleton();

		//Setup the default AssetFactory
		this._assetFactory = AssetFactory.getSingleton();

		this._audioEngine = new HTML5AudioEngine();

		//Create the ViewPort
		this._viewPort = new ViewPort();

		this._logManager.log(SeverityEnum.INFO, 'Engine has started.');
	}

	public isDebugEnabled(): boolean {
		return this._debugMode;
	}

	public setRenderingEngine(renderingEngine: RenderingEngine): void {
		if (this._renderingEngine) {
			//Stop the old rendering engine
		}

		this._renderingEngine = renderingEngine;

		//Start the new Rendering engine, pass in View Port, etc...
		this._renderingEngine.setViewPort(this._viewPort);
		this._renderingEngine.startRendering();
	}

	public getRenderingEngine(): RenderingEngine {
		return this._renderingEngine;
	}

	public setLogManager(logManager: LogManager): void {
		this._logManager = logManager;
	}

	public getLogManager(): LogManager {
		return this._logManager;
	}

	public setAssetFactory(assetFactory: AssetFactory): void {
		this._assetFactory = assetFactory;
	}

	public getAssetFactory(): AssetFactory {
		return this._assetFactory;
	}

	public getViewPort(): ViewPort {
		return this._viewPort;
	}

	public setAudioEngine(audioEngine: AudioEngine): void {
		this._audioEngine = audioEngine;
	}

	public getAudioEngine(): AudioEngine {
		return this._audioEngine;
	}

	public setLogicEngine(logicEngine: LogicEngine): void {
		this._logicEngine = logicEngine;
	}

	public getLogicEngine(): LogicEngine {
		return this._logicEngine;
	}
}

export { Engine };
