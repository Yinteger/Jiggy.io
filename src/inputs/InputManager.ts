//Global interface alias
type NativeGamepadEvent = GamepadEvent;
type NativeGamepad = Gamepad;

import { GamePad } from "./GamePad";
import * as Events from 'events';


export const enum InputManagerEvents {
    GamePadAdded = "GAMEPADADDED",
    GamePadRemoved = "GAMEPADREMOVED"
}

export class InputManager extends Events.EventEmitter {
    private static _instance: InputManager;
    private _activeGamePads: GamePad[];

    private constructor () {
        super();

        window.addEventListener("gamepadconnected", (gamePad: NativeGamepadEvent) => {
            //Build initial set of gamepads
            this._buildGamePads();
            this.emit(InputManagerEvents.GamePadAdded);
        });

        window.addEventListener("gamepaddisconnected", (gamePad: NativeGamepadEvent) => {
            //Build initial set of gamepads
            this._buildGamePads();
            this.emit(InputManagerEvents.GamePadRemoved);
        });

        //Build initial set of gamepads
        this._buildGamePads();
    }

    private _buildGamePads() : void {
        var gamePads: NativeGamepad[] = navigator.getGamepads();
        this._activeGamePads = [];

        for (var i = 0; i < gamePads.length; i++) {
            if (gamePads[i]) {
                var gamePad: GamePad = new GamePad(i);
                this._activeGamePads.push(gamePad);
            }
        }
    }

    static getInstance(): InputManager {
        InputManager._instance = InputManager._instance || new InputManager();
        return InputManager._instance;
    }

    public hasGamePads(): boolean {
        return this._activeGamePads.length > 0;
    }

    public getGamePads(): GamePad[] {
        return this._activeGamePads;
    }
}