import { Entity } from "../../src/entities/";
import { Spritesheet } from "../../src/assets/";
export default class Character extends Entity {
    moving: boolean;
    private _activeAnim;
    private _endTexture;
    private _upAnim;
    private _downAnim;
    private _leftAnim;
    private _rightAnim;
    tileX: number;
    tileY: number;
    private _characterSpritesheet;
    constructor(character_spritesheet: Spritesheet);
    private _move(coordinates);
    moveLeft(): void;
    moveUp(): void;
    moveRight(): void;
    moveDown(): void;
}
