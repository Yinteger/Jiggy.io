import Engine from "../../Source/Engine";
import TwoDRenderingEngine from "../../Source/Engines/TwoDRenderingEngine";
import HTML5AudoiEngine from "../../Source/Audio/HTML5AudioEngine";
import Entity from "../../Source/Entities/Entity";
import Spritesheet from "../../Source/Utils/Spritesheet";
import GridMap from "../../Source/Entities/GridMap";
import Animation from "../../Asset/Animation";

class PalletDemo extends Engine {
	constructor () {
		super();
		this.viewPort.setSize({width: 500, height: 500});
		this.renderingEngine = new TwoDRenderingEngine();
		this.audioEngine = new HTML5AudioEngine();
	}

	private _createLoadingScreen () : Entity {
		var hud : Entity = new Entity();
		hud.width = this.viewPort.size.width;
		hud.height = this.viewPort.size.height;

		var loadingSprite : Spritesheet = new Spritesheet();



		return hud;
	}

	private _createMainMap () : Entity {
		var mapContainer : Entity = new Entity();

		var layer1 : GridMap = new GridMap({width: 16, height: 16}, {x: 50, y: 50});
		var layer2 : GridMap = new GridMap({width: 16, height: 16}, {x: 50, y: 50});
		var layer3 : GridMap = new GridMap({width: 16, height: 16}, {x: 50, y: 50});

		container.width = layer1.width;
		container.height = layer1.height;

		mapContainer.addChild(layer1);		
		mapContainer.addChild(layer2);		
		mapContainer.addChild(layer3);

		//TODO: Framework Level Data Driven Map Generation

		//Set Grass Trails & Background Tiles
		var layer1Iterator : Iterator = layer1.iterator();
		while(iterator.hasNext()) {
			var tile : Entity = iterator.next();
			tile.setTexture(mapTilesheet.getSprite('grass'));
		}

		//Set other tile graphics

		return mapContainer;
	}

	private _createMapSpritesheet () : Spritesheet {
		var mapSpritesheet : Spritesheet = new Spritesheet();
	}
}



declare var window._PalletDemo : PalletDemo;
window._PalletDemo = new PalletDemo();