/// <reference path="../../src/assets/WebpackAssetSupport.d.ts" />

import {Engine} from '../../src/core';
import {Entity, LocationUpdateEvent} from '../../src/entities';
import {TwoDimensionalRenderingEngine, GroupLogicEngine} from '../../src/engines';
import {Camera, CollisionEmitter, Color} from '../../src/utils';
import {Mouse, MouseMoveEvent, MouseEvents} from '../../src/inputs';
import {Coordinate} from '../../src/interfaces';
import {Asset, AssetType} from '../../src/assets';
import * as BallTexture from './resources/ball.png';

import {Map, MapItem} from './Map';
import {Map1} from './Map1';

const SPEED: number = 2;

class BlockBuster extends Engine {
    private blocks: Array<Entity>;
    private collisionEmitter: CollisionEmitter;
    private ball: Entity;
    private player: Entity;
    private scene: Entity;
    private camera: Camera;
    private direction: number;
    private speed: number;
    private paused: boolean; 
    constructor() {
        super();

        this.paused = true;

        this.getViewPort().setSize({
            width: 800,
            height: 600
        });
        this.setRenderingEngine(new TwoDimensionalRenderingEngine());
        this.setLogicEngine(new GroupLogicEngine());

        this.collisionEmitter = new CollisionEmitter();
        this.blocks = this._generateBlockMap(Map1);
        
        this.ball = new Entity(); //TODO texture
        this.ball.setWidth(16);
        this.ball.setHeight(16);
        
        var ballTexture: Asset = this.getAssetFactory().build(AssetType.IMAGE, BallTexture);
        ballTexture.load().then(() => {
            this.ball.setTexture(ballTexture);
            this.paused = false;
        });

        this.player = new Entity();
        this.player.setColor(new Color(255,255,255));
        this.player.setWidth(64);
        this.player.setHeight(16);

        this.player.setY(600 - this.player.getHeight() - 50);
        this.player.setX(800 / 2 - this.player.getWidth() / 2);

        this.ball.setX(this.player.getX() + this.player.getWidth() /2);
        this.ball.setY(this.player.getY() - 50);

        this.scene = new Entity();
        this.scene.setColor(new Color(0,0,0));
        this.scene.setWidth(800);
        this.scene.setHeight(600);

        for (var i: number = 0; i < this.blocks.length; i++) {
            // console.log(i, this.blocks[i]);
            // var block: Entity = this.blocks[i];
            this.scene.addChild(this.blocks[i]);
        }

        this.scene.addChild(this.player);
        this.scene.addChild(this.ball);
        
        this.camera = new Camera(this.scene, null, {
            width : this.scene.getWidth(),
            height : this.scene.getHeight()
        }, null, {
            width : this.scene.getWidth(),
            height : this.scene.getHeight()
        });

        this.getRenderingEngine().addCamera(this.camera);

        this.collisionEmitter.addCollisionListener(this._ballCollide.bind(this));
        this.collisionEmitter.addEntity(this.player);
        this.collisionEmitter.addEntity(this.ball);

        this.direction = 270;
        this.speed = 2;

        this.getLogicEngine().addLogic('move_player', this._updatePlayerPosition.bind(this), 25);
        this.getLogicEngine().addLogic('ball_move', this._moveBall.bind(this), 25);
    }

    private _moveBall(): void {
        if (this.paused) {
            return;
        }

        var ballPos: Coordinate = this.ball.getLocation();

        ballPos.x += this.speed * Math.cos(this.direction * Math.PI / 180);
        ballPos.y += this.speed * Math.sin(this.direction * Math.PI / 180);

        if (ballPos.x < 0) {
            ballPos.x = 1;
            if (this.direction > 180 && this.direction < 270) {
                this.direction += 90;
            }
            else if (this.direction > 90 && this.direction < 180) {
                this.direction -= 90;
            } 
        }
        else if (ballPos.x + this.ball.getWidth() > this.getViewPort().getSize().width) {
            ballPos.x = this.getViewPort().getSize().width - this.ball.getWidth() - 1;
            if (this.direction > 270 && this.direction < 359) {
                this.direction -= 90;
            }
            else if (this.direction > 0 && this.direction < 90) {
                this.direction += 90;
            }
        }

        if (ballPos.y < 0) {
            ballPos.y = 1;
            if (this.direction > 180 && this.direction < 270) {
                this.direction -= 90;
            }
            else if (this.direction > 270 && this.direction < 359) {
                this.direction = (this.direction + 90) - 360;
            }
        }
        else if (ballPos.y > this.getViewPort().getSize().height) {
            //game over
            console.log('GAME OVER! TODO');

            ballPos.y = this.getViewPort().getSize().height;
            if (this.direction > 90 && this.direction < 180) {
                this.direction += 90;
            }
            else if (this.direction > 0 && this.direction < 90) {
                this.direction -= 90;
            }
        }

        this.ball.setLocation(ballPos);
    }

    private _updatePlayerPosition(): void {
        var coords: Coordinate = Mouse.getInstance().getCurrentCoordinates();

        var x: number = coords.x - (this.player.getWidth() / 2);
        // this.player.setLocation(coords);
        this.player.setX(x);
    }

    private _flipDirection(direction: number): number {
        var out: number = direction + 180;

        while (out > 360) {
            out -= 360;
        }

        return out;
    }

    private _ballCollide(e1: Entity, e2: Entity, event: LocationUpdateEvent): void {
        // console.log(e1, e2, event);
        // this.speed = 0;

        var ball: Entity;
        var block: Entity;

        if (e1 === this.ball) {
            ball = e1;
            block = e2;
        }
        else {
            ball = e2;
            block =  e1;
        }

        var ballX: number = ball.getX() + ball.getWidth() / 2;
        var blockX1: number = block.getX();
        var blockX2: number = block.getX2();

        var ratio: number = (ballX - blockX1) / (blockX2 - blockX1);

        console.log('ratio', ratio);

        // Protect from a perfect horizontal direction
        if (ratio === 0) {
            ratio = 0.1;
        }
        else if (ratio === 1) {
            ratio = 0.9;
        }

        this.direction = 180 * ratio;

        if (this.player === block) {
            this.speed++;
            this.direction = this._flipDirection(this.direction);
        }
        else {
            this.scene.removeChild(block);
            this.collisionEmitter.removeEntity(block);
        }

        // e1.setColor(new Color(255,0,0));
        // e2.setColor(new Color(0,0,255));
    }

    private _generateBlockMap(map: Map): Array<Entity> {
        // this.blocks = map.blocks;
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

            this.collisionEmitter.addEntity(entity);
        }

        return blocks;
    }
}

(<any>window).BlockBuster = new BlockBuster();