/// <reference path="../../src/assets/WebpackAssetSupport.d.ts" />
/// <reference path="../../src/core/CodeSplitSupport.d.ts" />

import {Engine} from '../../src/core';
import {Entity, LocationUpdateEvent} from '../../src/entities';
import {TwoDimensionalRenderingEngine, GroupLogicEngine} from '../../src/engines';
import {Camera, CollisionEmitter, Color, Coordinate} from '../../src/utils';
import {Mouse, MouseMoveEvent, MouseEvents} from '../../src/inputs';
import {Asset, AssetType, AssetGroupLoader, AssetGroupDefinition, AssetGroup} from '../../src/assets';
import * as BallTexture from './resources/ball.png';
import * as LoadingTexture from './resources/LoadingView.png';
import * as boopSound from './resources/boop.mp3';

import {Map, MapItem} from './Map';
import {Map1} from './Map1';
import {Vector2D} from './Vector2D';
import {PlayList} from './Playlist';

const DEFAULT_SPEED: number = 3;
const DEFAULT_DIRECTION: Vector2D = new Vector2D(0, -1);
const SPEED_STEP = 0.5;

class BlockBuster extends Engine {
    private blocks: Array<Entity>;
    private collisionEmitter: CollisionEmitter;
    private ball: Entity;
    private player: Entity;
    private activeScene: Entity;
    private gameScene: Entity;
    private camera: Camera;
    private direction: Vector2D;
    private speed: number;
    private paused: boolean; 
    private blocksDestroyed: number;
    private _gameAssets: AssetGroup;
    private _playlist: PlayList;

    constructor() {
        super();

        this.paused = true;
        this.blocksDestroyed = 0;

        this.getViewPort().setSize({
            width: 800,
            height: 600
        });
        this.setRenderingEngine(new TwoDimensionalRenderingEngine());
        this.setLogicEngine(new GroupLogicEngine());

        this.collisionEmitter = new CollisionEmitter();
        this.blocks = this._generateBlockMap(Map1);
        
        this.ball = new Entity();
        this.ball.setWidth(16);
        this.ball.setHeight(16);
        
        var ballTexture: Asset = this.getAssetFactory().build(AssetType.IMAGE, BallTexture);
        ballTexture.load().then(() => {
            this.ball.setTexture(ballTexture);
        });

        this.player = new Entity();
        this.player.setColor(new Color(255,255,255));
        this.player.setWidth(64);
        this.player.setHeight(16);

        this.player.setY(600 - this.player.getHeight() - 50);
        this.player.setX(800 / 2 - this.player.getWidth() / 2);

        this.ball.setX(this.player.getX() + this.player.getWidth() /2);
        this.ball.setY(this.player.getY() - 50);

        this.gameScene = new Entity();
        this.gameScene.setColor(new Color(0,0,0));
        this.gameScene.setWidth(800);
        this.gameScene.setHeight(600);

        for (var i: number = 0; i < this.blocks.length; i++) {
            this.gameScene.addChild(this.blocks[i]);
            this.collisionEmitter.addEntity(this.blocks[i]);
        }

        this.gameScene.addChild(this.player);
        this.gameScene.addChild(this.ball);
        
        this.camera = new Camera(this._getLoadingScene(), null, {
            width : this.gameScene.getWidth(),
            height : this.gameScene.getHeight()
        }, null, {
            width : this.gameScene.getWidth(),
            height : this.gameScene.getHeight()
        });

        this.getRenderingEngine().addCamera(this.camera);

        this.collisionEmitter.addCollisionListener(this._ballCollide.bind(this));
        this.collisionEmitter.addEntity(this.player);
        this.collisionEmitter.addEntity(this.ball);

        this.direction = DEFAULT_DIRECTION;
        this.speed = DEFAULT_SPEED;

        this.getLogicEngine().addLogic('move_player', this._updatePlayerPosition.bind(this), 25);
        this.getLogicEngine().addLogic('ball_move', this._moveBall.bind(this), 25);

        var boop: Asset = this.getAssetFactory().build(AssetType.AUDIO, boopSound);
        boop.load().then(() => {
            this.getAudioEngine().addAudio('boop', boop, 8);
        });
    }

    private _setPlaylist(playListAssets: Array<Asset>): void {
        this._playlist = new PlayList('pl', playListAssets);
        this._playlist.playNext();
    }

    private _getLoadingScene(): Entity {
        var view: Entity = new Entity();
        view.setSize({
            width: 800,
            height: 600
        });

        var asset: Asset = this.getAssetFactory().build(AssetType.IMAGE, LoadingTexture);
        asset.load();

        var loader: AssetGroupLoader = new AssetGroupLoader();
        require.ensure(['./resources.ts'], (require) => {
            var resources: AssetGroupDefinition = require('./resources.ts');
            this._gameAssets = loader.loadFromMemory(resources);
            this._gameAssets.load().then(() => {
                this._setPlaylist([
                    // this._gameAssets.getAsset('bgm1'),
                    this._gameAssets.getAsset('bgm2'),
                    this._gameAssets.getAsset('bgm3')
                ]);
                this._setActiveScene(this._getStartScreen());
            });
        });

        view.setTexture(asset);
        return view;
    }

    private _getStartScreen(): Entity {
        var view: Entity = new Entity();
        view.setSize({
            width: 800,
            height: 600
        });

        view.setTexture(this._gameAssets.getAsset('startGameTexture'));

        var startGameHotspot: Entity = new Entity();
        // startGameHotspot.setColor(Color.fromString('red'));
        startGameHotspot.setPosition(new Coordinate(250, 500));
        startGameHotspot.setSize({
            width: 400,
            height: 80
        });

        var onClick = (e: any) => {
            var child: Entity | boolean = view.findTopChildAt(new Coordinate(e.x, e.y));

            if (child instanceof Entity && child === startGameHotspot) {
                Mouse.getInstance().removeListener(MouseEvents.LeftButtonUp, onClick);
                this._setActiveScene(this.gameScene);
                this.paused = false;
            }
            else {
                // Do nothing
            }
        };

        Mouse.getInstance().on(MouseEvents.LeftButtonUp, onClick);

        view.addChild(startGameHotspot);

        return view;
    }

    private _getGameWonScreen(): Entity {
        var view: Entity = new Entity();
        view.setSize({
            width: 800,
            height: 600
        });

        view.setTexture(this._gameAssets.getAsset('gameWonTexture'));

        var startGameHotspot: Entity = new Entity();
        // startGameHotspot.setColor(Color.fromString('red'));
        startGameHotspot.setPosition(new Coordinate(250, 450));
        startGameHotspot.setSize({
            width: 400,
            height: 80
        });

        var onClick = (e: any) => {
            var child: Entity | boolean = view.findTopChildAt(new Coordinate(e.x, e.y));

            if (child instanceof Entity && child === startGameHotspot) {
                Mouse.getInstance().removeListener(MouseEvents.LeftButtonUp, onClick);
                this._reset();
            }
            else {
                // Do nothing
            }
        };

        Mouse.getInstance().on(MouseEvents.LeftButtonUp, onClick);

        view.addChild(startGameHotspot);

        return view;
    }

    private _getGameLostScreen(): Entity {
        var view: Entity = new Entity();
        view.setSize({
            width: 800,
            height: 600
        });

        view.setTexture(this._gameAssets.getAsset('gameLostTexture'));

        var startGameHotspot: Entity = new Entity();
        // startGameHotspot.setColor(Color.fromString('red'));
        startGameHotspot.setPosition(new Coordinate(250, 450));
        startGameHotspot.setSize({
            width: 400,
            height: 80
        });

        var onClick = (e: any) => {
            var child: Entity | boolean = view.findTopChildAt(new Coordinate(e.x, e.y));

            if (child instanceof Entity && child === startGameHotspot) {
                Mouse.getInstance().removeListener(MouseEvents.LeftButtonUp, onClick);
                this._reset();
            }
            else {
                // Do nothing
            }
        };

        Mouse.getInstance().on(MouseEvents.LeftButtonUp, onClick);

        view.addChild(startGameHotspot);

        return view;
    }

    private _setActiveScene(view: Entity): void {
        this.camera.setScene(view);
    }

    private _reset(): void {
        this.blocksDestroyed = 0;
        this.paused = true;
        this.direction = DEFAULT_DIRECTION;
        this.speed = DEFAULT_SPEED;

        for (var i: number = 0; i < this.blocks.length; i++) {
            this.gameScene.addChild(this.blocks[i]);
            this.collisionEmitter.addEntity(this.blocks[i]);
        }

        if (this.player.getParent()) {
            this.player.getParent().removeChild(this.player);
        }

        if (this.ball.getParent()) {
            this.ball.getParent().removeChild(this.ball);
        }

        this.player.setY(600 - this.player.getHeight() - 50);
        this.player.setX(800 / 2 - this.player.getWidth() / 2);

        this.ball.setX(this.player.getX() + this.player.getWidth() /2);
        this.ball.setY(this.player.getY() - 50);

        this.gameScene.addChild(this.player);
        this.gameScene.addChild(this.ball);

        this._setActiveScene(this.gameScene);

        this.paused = false;
    }

    private _onGameWin(): void {
        this.paused = true;
        this._setActiveScene(this._getGameWonScreen());
    }

    private _onGameOver(): void {
        this.paused = true;
        this._setActiveScene(this._getGameLostScreen());
    }

    private _moveBall(): void {
        if (this.paused) {
            return;
        }

        var ballPos: Coordinate = this.ball.getPosition();

        ballPos.incrementX(this.speed * Math.cos(this.direction.getAngle()));
        ballPos.incrementY(this.speed * Math.sin(this.direction.getAngle()));

        if (ballPos.getX() < 0) {
            ballPos.setX(1);

            var normal: Vector2D = new Vector2D(0, 1);
            var dirNormal: Vector2D = this.direction.normal();

            this.direction = dirNormal.reflect(normal);
        }
        else if (ballPos.getX() + this.ball.getWidth() > this.getViewPort().getSize().width) {
            ballPos.setX(this.getViewPort().getSize().width - this.ball.getWidth() - 1);
            var normal: Vector2D = new Vector2D(0, 1);
            var dirNormal: Vector2D = this.direction.normal();

            this.direction = dirNormal.reflect(normal);            
        }

        if (ballPos.getY() < 0) {
            ballPos.setY(1);
            var normal: Vector2D = new Vector2D(1, 0);
            var dirNormal: Vector2D = this.direction.normal();

            this.direction = dirNormal.reflect(normal);            
        }
        else if (ballPos.getY() > this.getViewPort().getSize().height) {
            this._onGameOver();
        }

        this.ball.setPosition(ballPos);
    }

    private _updatePlayerPosition(): void {
        var coords: Coordinate = Mouse.getInstance().getCurrentCoordinates();

        var x: number = coords.getX() - (this.player.getWidth() / 2);
        this.player.setX(x);
    }

    private _ballCollide(e1: Entity, e2: Entity, event: LocationUpdateEvent): void {
        var ball: Entity;
        var block: Entity;

        if (e1 === this.ball) {
            ball = e1;
            block = e2;
        }
        else {
            ball = e2;
            block = e1;
        }

        var ballX: number = ball.getX() + ball.getWidth() / 2;
        var dirNormal: Vector2D = this.direction.normal();;

        if (this.player === block) {

            var blockX1: number = block.getX();
            var blockX2: number = block.getX2();
    
            var ratio: number = (ballX - blockX1) / (blockX2 - blockX1);
            if (ratio < 0.1) {
                ratio = 0.1;
            }
            else if (ratio > 0.9) {
                ratio = 0.9;
            }

            var radians: number = ((180 * ratio) + 180) * Math.PI / 180;
            
            this.direction = new Vector2D(1, 0).rotate(radians);
        }
        else {
            this.getAudioEngine().playAudio('boop');

            var normal: Vector2D;

            if (ballX >= block.getX() && ballX <= block.getX2()) {
                normal = new Vector2D(1,0);
            }
            else {
                normal = new Vector2D(0,1);
            }

            this.direction = dirNormal.reflect(normal);
        
            this.gameScene.removeChild(block);
            this.collisionEmitter.removeEntity(block);
            this.blocksDestroyed++;
        }

        if (this.blocksDestroyed === this.blocks.length) {
            this._onGameWin();
        }
        else {
            console.log(this.blocksDestroyed, this.blocks.length);
        }

        // Every 3 blocks destroyed, increment speed by SPEED_STEP.
        this.speed = DEFAULT_SPEED + (Math.floor(this.blocksDestroyed / 3) * SPEED_STEP);
    }

    private _generateBlockMap(map: Map): Array<Entity> {
        var blocks: Array<Entity> = [];

        for (var i: number = 0; i < map.blocks.length; i++) {
            var block: MapItem = map.blocks[i];

            var entity: Entity = new Entity();
            entity.setColor(block.color);
            entity.setX(block.x);
            entity.setY(block.y);
            entity.setWidth(block.width);
            entity.setHeight(block.height);
            blocks.push(entity);
        }

        return blocks;
    }
}

// (<any>window).test = function(): void {
//     var normal = new Vector2D(4, 0);
//     var direction = new Vector2D(1, 1);

//     var x = 2 * ()
// };

(<any>window).BlockBuster = new BlockBuster();