import {Entity} from "../../src/entities";
import {Animation, Spritesheet, Asset} from "../../src/assets";
import {Coordinate} from "../../src/utils";
import {getInstance, Engine} from '../../src/core';

export default class Character extends Entity {
	public moving :  boolean;
	private _activeAnim : Animation;
	private _endTexture : Asset;
	private _upAnim : Animation;
	private _downAnim : Animation;
	private _leftAnim : Animation;
	private _rightAnim : Animation;
	public tileX : number;
	public tileY : number;
	private _characterSpritesheet : Spritesheet;

	constructor (character_spritesheet : Spritesheet) {
		super();

		this.setWidth(14);
		this.setHeight(21);

		this._characterSpritesheet = character_spritesheet;

		this._upAnim = new Animation(this, [
			{"asset": character_spritesheet.getSprite('player_up_step1'), "delay": 250}, 
			{"asset": character_spritesheet.getSprite("player_up"), "delay": 250}, 
			{"asset": character_spritesheet.getSprite("player_up_step2"), "delay": 250}, 
			{"asset": character_spritesheet.getSprite("player_up"), "delay": 250}]);

		this._downAnim = new Animation(this, [
			{"asset": character_spritesheet.getSprite("player_down_step1"), "delay": 250}, 
			{"asset": character_spritesheet.getSprite("player_down"), "delay": 250}, 
			{"asset": character_spritesheet.getSprite("player_down_step2"), "delay": 250}, 
			{"asset": character_spritesheet.getSprite("player_down"), "delay": 250}]);

		this._leftAnim = new Animation(this, [
			{"asset": character_spritesheet.getSprite("player_left_step2"), "delay": 250}, 
			{"asset": character_spritesheet.getSprite("player_left"), "delay": 250}, 
			{"asset": character_spritesheet.getSprite("player_left_step1"), "delay": 250}, 
			{"asset": character_spritesheet.getSprite("player_left"), "delay": 250}]);

		this._rightAnim = new Animation(this, [
			{"asset": character_spritesheet.getSprite("player_right_step2"), "delay": 250}, 
			{"asset": character_spritesheet.getSprite("player_right"), "delay": 250}, 
			{"asset": character_spritesheet.getSprite("player_right_step1"), "delay": 250}, 
			{"asset": character_spritesheet.getSprite("player_right"), "delay": 250}]);
	}

    private _move(coordinates: Coordinate): void {
        console.log("Setting player pos to", coordinates);
		var game: Engine = getInstance();
		// var Engine: Core.Engine = (<any>window)._PalletDemo;
		game.getLogicEngine().removeLogic(this.getID() + "_endmove");
		// var collision =  mapl2.findChildren(new zen.data.Coordinate(player.getX2() + 3, player.getY2() - 5),  new zen.data.Coordinate(player.getX2() + 3, player.getY2()));
		var collision = false;
		var updatedCoordinates = false;
		var x = coordinates.getX();
		var y = coordinates.getY();

		//TODO: Fix Magic Numbers... 16 is so only the bottom balf of the sprite is collision but the +1 is fixing it to check rpoper tile...
		var potCollisions = this.getParent().findChildren(new Coordinate(x + 1, y + 16));
		for (var i in potCollisions) {
			if (potCollisions[i] != this && potCollisions[i].isCollisionable()) {
				collision = true;
			}
		}

		if (!collision) {
			game.getLogicEngine().addLogic(this.getID() + "_move", () => {

				if (this.getX() != x) {
					if (this.getX() > x) {
						this.setX(this.getX() - 2);

						if (!updatedCoordinates) {
							this.tileX -= 1;
							updatedCoordinates = true;
						}

					} else {
						this.setX(this.getX() + 2);

						if (!updatedCoordinates) {
							this.tileX += 1;
							updatedCoordinates = true;
						}
					}
				}

				if (this.getY() != y) {
					if (this.getY() > y) {
						this.setY(this.getY() - 2);

						if (!updatedCoordinates) {
							this.tileY -= 1;
							updatedCoordinates = true;
						}
					} else {
						this.setY((this.getY()) + 2);


						if (!updatedCoordinates) {
							this.tileY += 1;
							updatedCoordinates = true;
						}
					}
				};

				// tilePosition.setTexture(zen.assets.TextAssetBuilder.build("15px Georgia", "X: " + character.tileX + " Y: " + character.tileY, 75, 50, "black"));

				if (this.getX() == x && this.getY() == y || collision) {
					game.getLogicEngine().removeLogic(this.getID() + "_move");
					this.moving = false;

					game.getLogicEngine().addLogic(this.getID() + "_endmove", () => {
						this._activeAnim.stop();
						delete this._activeAnim;
						this.setTexture(this._endTexture);
						game.getLogicEngine().removeLogic(this.getID() + "_endmove");
					}, 50);

				}
			}, 50);	
		} else {
			this.moving = false;
			this._activeAnim.stop();
			delete this._activeAnim;
			this.setTexture(this._endTexture);
		}
	}

	public moveLeft () : void {
		if (!this.moving) {

			if (this._activeAnim && this._activeAnim != this._leftAnim) {
				this._activeAnim.stop();
			}
			
			this._endTexture = this._characterSpritesheet.getSprite("player_left");
			this._leftAnim.start();
			this._activeAnim = this._leftAnim;
			this.moving = true;
			this._move(new Coordinate(this.getX() - 16, this.getY()));
		}
	}

	public moveUp () : void {
		if (!this.moving) {
			if (this._activeAnim && this._activeAnim != this._upAnim) {
				this._activeAnim.stop();
			}

			this._endTexture = this._characterSpritesheet.getSprite("player_up");
			this._upAnim.start();
			this._activeAnim = this._upAnim;
			this.moving = true;
			this._move(new Coordinate(this.getX(), this.getY() - 16));

		}
	}

	public moveRight () : void {
		if (!this.moving) {
			if (this._activeAnim && this._activeAnim != this._rightAnim) {
				this._activeAnim.stop();
			}

			this._endTexture = this._characterSpritesheet.getSprite("player_right");
			this._rightAnim.start();
			this._activeAnim = this._rightAnim;
			this.moving = true;
			this._move(new Coordinate(this.getX() + 16, this.getY()));
		}
	}

	public moveDown () : void {
		if (!this.moving) {
			if (this._activeAnim && this._activeAnim != this._downAnim) {
				this._activeAnim.stop();
			}

			this._endTexture = this._characterSpritesheet.getSprite("player_down");
			this._downAnim.start();
			this._activeAnim = this._downAnim;
			this.moving = true;
			this._move(new Coordinate(this.getX(), this.getY() + 16));
		}
	}

}