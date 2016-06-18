import ViewPort from "./Utils/ViewPort";

export default class Engine {
	public renderingEngine : RenderingEngine;
	public audioEngine : AudioEngine;
	public logManager : LogManager;
	public assetFactory : AssetFactory;
	public viewPort : ViewPort;
	private debugMode : boolean;

	constructor () {
		this.debugMode = false;

		this.logManager = LogManager;

		//Setup the default AssetFactory
		this.assetFactory = AssetFactory;

		this.audioEngine = new HTML5AudioEngine();

		//Create the ViewPort
		this.viewPort = new ViewPort();

		//If Engine is ready, notify our callback
		if (this.onInit) {
			this.logManager.log(LogManager.INFO, 'Engine has started.');
			this.onInit(this.viewPort.canvas)
		} else {
			this.logManager.log(LogManager.WARNING, 'No onInit specified for Zengine. How will you know when to start using it?!');
		}
	}
}