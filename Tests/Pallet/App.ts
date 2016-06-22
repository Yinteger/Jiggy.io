import Engine from "../../Source/Engine";
import {TwoDRenderingEngine} from "../../Source/Engines";
import {HTML5AudioEngine} from "../../Source/Audio";
import {Entity, GridMap} from "../../Source/Entities";
import {Iterator} from "../../Source/Utils";
import {Animation, TextAssetBuilder, Spritesheet} from "../../Source/Assets";

class PalletDemo extends Engine {
	private _mapSpritesheet : Spritesheet;

	constructor () {
		super();
		this.viewPort.size = ({width: 500, height: 500});
		this.renderingEngine = new TwoDRenderingEngine();
		this.audioEngine = new HTML5AudioEngine();

		this.renderingEngine.HUDEntity = (this._createLoadingScreen());
		this._loadResources();
	}

	private _createLoadingScreen () : Entity {
		var textAssetBuilder : TextAssetBuilder = new TextAssetBuilder();

		var hud : Entity = new Entity();
		hud.width = this.viewPort.size.width;
		hud.height = this.viewPort.size.height;

		var loadingText : Entity = new Entity();
		loadingText.width = 165;
		loadingText.height = 50;
		loadingText.x = (this.viewPort.size.width / 2) - 100;
		loadingText.y = (this.viewPort.size.height / 2) - 25;
		hud.addChild(loadingText);

		var loading0 = textAssetBuilder.build("35px Georgia", "Loading", 165, 50, "red");
		var loading1 = textAssetBuilder.build("35px Georgia", "Loading.", 165, 50, "red");
		var loading2 = textAssetBuilder.build("35px Georgia", "Loading..", 165, 50, "red");
		var loading3 = textAssetBuilder.build("35px Georgia", "Loading...", 165, 50, "red");

		var loadingAnim : Animation = new Animation(loadingText, [
			{'asset': loading0,'delay': 250},
			{'asset': loading1, 'delay': 250},
			{'asset': loading2, 'delay': 250},
			{'asset': loading3, 'delay': 250}
		]);

		loadingAnim.start();


		return hud;
	}

	private _createMainMap () : Entity {
		var mapContainer : Entity = new Entity();

		var layer1 : GridMap = new GridMap({width: 16, height: 16}, {x: 50, y: 50});
		var layer2 : GridMap = new GridMap({width: 16, height: 16}, {x: 50, y: 50});
		var layer3 : GridMap = new GridMap({width: 16, height: 16}, {x: 50, y: 50});

		mapContainer.width = layer1.width;
		mapContainer.height = layer1.height;

		mapContainer.addChild(layer1);		
		mapContainer.addChild(layer2);		
		mapContainer.addChild(layer3);

		//TODO: Framework Level Data Driven Map Generation

		//Set Grass Trails & Background Tiles
		var layer1Iterator : Iterator = layer1.iterator();
		while(layer1Iterator.hasNext()) {
			var tile : Entity = layer1Iterator.next();
			tile.texture = (this._mapSpritesheet.getSprite('grass'));
		}

		//Set other tile graphics

		return mapContainer;
	}

	private _loadResources () : void {
		this._loadMapSpritesheet();
	}

	private _loadMapSpritesheet () : void {
		// var mapSpritesheet : Spritesheet = new Spritesheet();
	}
}



// declare var window._PalletDemo : PalletDemo;
// window._PalletDemo = new PalletDemo();