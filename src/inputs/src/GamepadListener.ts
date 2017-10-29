//Global interface alias
type NativeGamepadEvent = GamepadEvent;
type NativeGamepad = Gamepad;

import { GamePad } from "./GamePad";
import * as Events from 'events';


export const enum GamePadListenerEvents {
    GamePadAdded = "GAMEPADADDED",
    GamePadRemoved = "GAMEPADREMOVED"
}

/**
 * Listens to the window and detects any new gamePads plugged in.  GamePads may only be detected once a button is clicked.
 */
export class GamePadListener extends Events.EventEmitter {
    private static _instance: GamePadListener;
    private _activeGamePads: GamePad[];
    private _gamePadPollTimer: number;

    private constructor() {
        super();

        //NOTE: GamePad events only fire on Firefox
        //window.addEventListener("gamepadconnected", () => {
        //    var gamePads: NativeGamepad[] = navigator.getGamepads();
        //    //Identify the new Gamepad by index
        //    for (var i = 0; i < gamePads.length; i++) {
        //        if (!this._activeGamePads[i]) {
        //            //There is no GamePad at this index, register the new one and emit it
        //            var gamePad: GamePad = this._buildGamePad(i);
        //            this.emit(InputManagerEvents.GamePadAdded, gamePad);
        //        }   
        //    }
        //});

        //window.addEventListener("gamepaddisconnected", () => {
        //    var gamePads: NativeGamepad[] = navigator.getGamepads();
        //    //Identify the deleted Gamepad by index
        //    for (var i = 0; i < this._activeGamePads.length; i++) {
        //        if (!gamePads[i]) {
        //            //There is no GamePad at this index, register the new one and emit it;
        //            var gamePad: GamePad = this._activeGamePads[i];
        //            this.emit(InputManagerEvents.GamePadRemoved, gamePad);
        //        }
        //    }
        //});

        if (navigator.getGamepads) {
            //Build initial set of gamepads
            this._buildGamePads();

            //Poll for new gamepads or deactivated gamepads
            this._gamePadPollTimer = window.setInterval(() => {
                var gamePads: NativeGamepad[] = navigator.getGamepads();
                //Identify the new Gamepad by index
                for (var i = 0; i < gamePads.length; i++) {
                    if (gamePads[i] && !this._activeGamePads[i]) {
                        //There is no GamePad at this index, register the new one and emit it
                        var gamePad: GamePad = this._buildGamePad(i);
                        this.emit(GamePadListenerEvents.GamePadAdded, gamePad);
                    } else if (!gamePads[i] && this._activeGamePads[i]) {
                        var gamePad: GamePad = this._activeGamePads[i];
                        delete this._activeGamePads[i];
                        this.emit(GamePadListenerEvents.GamePadRemoved, gamePad);
                    }
                }
            }, 15);
        } else {
            console.log("Browser does not support GamePad API");
        }
    }

    private _buildGamePads(): void {
        var gamePads: NativeGamepad[] = navigator.getGamepads();
        this._activeGamePads = [];

        for (var i = 0; i < gamePads.length; i++) {
            if (gamePads[i]) {
                this._buildGamePad(i);
            }
        }
    }

    /**
     * 
     * @param index - Index in the HTML5 gamePad API that this GamePad represents.  An index is used over the object so polling update checks can be done.
     */
    private _buildGamePad(index: number): GamePad {
        var gamePad: GamePad = new GamePad(index);
        this._activeGamePads[index] = gamePad;
        return gamePad;
    }

    static getInstance(): GamePadListener {
        GamePadListener._instance = GamePadListener._instance || new GamePadListener();
        return GamePadListener._instance;
    }

    public hasGamePads(): boolean {
        return this._activeGamePads.length > 0;
    }

    public getGamePads(): GamePad[] {
        return this._activeGamePads;
    }
}