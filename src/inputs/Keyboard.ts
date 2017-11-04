import * as Events from 'events';
import {Event} from "../interfaces";


//Keycode values taken from https://github.com/wesbos/keycodes
export const KeyboardKeys  = {
    0: 48,
    1: 49,
    2: 50,
    3: 51,
    4: 52,
    5: 53,
    6: 54,
    7: 55,
    8: 56,
    9: 57,
    "BREAK": 3,
    "BACKSPACE": 8,
    "TAB": 9,
    "CLEAR": 12,
    "ENTER": 13,
    "SHIFT": 16,
    "CTRL": 17,
    "ALT": 18,
    "PAUSE": 19,
    "CAPSLOCK": 20,
    "ESCAPE": 27,
    "SPACEBAR": 32,
    "PAGEUP": 33,
    "PAGEDOWN": 34,
    "END": 35,
    "HOME": 36,
    "LEFTARROW": 37,
    "UPARROW": 38,
    "RIGHTARROW": 39,
    "DOWNARROW": 40,
    "SELECT": 41,
    "PRINT": 42,
    "EXECUTE": 43,
    "PRINTSCREEN": 44,
    "INSERT": 45,
    "DELETE": 46,
    "COLON": 58,
    "SEMICOLON": 59,
    "LESSTHAN": 60,
    "EQUALS": 61,
    "AMPERSAT": 64,
    "A": 65,
    "B": 66,
    "C": 67,
    "D": 68,
    "E": 69,
    "F": 70,
    "G": 71,
    "H": 72,
    "I": 73,
    "J": 74,
    "K": 75,
    "L": 76,
    "M": 77,
    "N": 78,
    "O": 79,
    "P": 80,
    "Q": 81,
    "R": 82,
    "S": 83,
    "T": 84,
    "U": 85,
    "V": 86,
    "W": 87,
    "X": 88,
    "Y": 89,
    "Z": 90,
    "WINDOWSKEY": 91,
    "RIGHTWINDOWSKEY": 92,
    "WINDOWSMENU": 93,
    "NUM0": 96,
    "NUM1": 97,
    "NUM2": 98,
    "NUM3": 99,
    "NUM4": 100,
    "NUM5": 101,
    "NUM6": 102,
    "NUM7": 103,
    "NUM8": 104,
    "NUM9": 105,
    "NUMMULTIPLY": 106,
    "NUMADD": 107,
    "NUMPERIOD": 108,
    "NUMSUBTRACT": 109,
    "DECIMALPOINT": 110,
    "NUMDIVIDE": 111,
    "F1": 112,
    "F2": 113,
    "F3": 114,
    "F4": 115,
    "F5": 116,
    "F6": 117,
    "F7": 118,
    "F8": 119,
    "F9": 120,
    "F10": 121,
    "F11": 122,
    "F12": 123,
    "F13": 124,
    "F14": 125,
    "F15": 126,
    "F16": 127,
    "F17": 128,
    "F18": 129,
    "F19": 130,
    "F20": 131,
    "F21": 132,
    "F22": 133,
    "F23": 134,
    "F24": 135,
    "NUMLOCK": 144,
    "SCROLLLOCK": 145,
    "CARET": 160,
    "EXCLAMATION": 161,
    "POUND": 163,
    "MONEYSIGN": 164,
}
//"ù":"165","page backward":"166","page forward":"167","closing paren (AZERTY)":"169","*":"170","~ + * key":"171","minus (firefox), mute/unmute":"173","decrease volume level":"174","increase volume level":"175","next":"176","previous":"177","stop":"178","play/pause":"179","e-mail":"180","mute/unmute (firefox)":"181","decrease volume level (firefox)":"182","increase volume level (firefox)":"183","semi-colon / ñ":"186","equal sign ":"187","comma":"188","dash ":"189","period ":"190","forward slash / ç":"191","grave accent / ñ":"192","?, / or °":"193","numpad period (chrome)":"194","open bracket ":"219","back slash ":"220","close bracket ":"221","single quote ":"222","`":"223","left or right ⌘ key (firefox)":"224","altgr":"225","< /git >":"226","GNOME Compose Key":"230","XF86Forward":"233","XF86Back":"234","toggle touchpad":"255"}
export const enum KeyboardEvents {
    KeyUp = "KEYUP",
    KeyDown = "KEYDOWN"
}

export interface KeyUp extends Event {
    key:  number;
}

export interface KeyDown extends Event {
    key: number;
}

export class Keyboard extends Events.EventEmitter {
    private _buttonMap : {[key: string]: any}; //Mapping of Button Values
    private _buttonsActive : {[key: string]: boolean};//Mapping of Buttons that are actively being used by the user right now (Ex: Keyboard button down)
    private static _instance: Keyboard;

    constructor () {
        super();
        this._buttonMap = {};
        this._buttonsActive = {};

        window.addEventListener("keydown", (e: KeyboardEvent) => {
            if (!this.isButtonActive(e.which)) {
                this._setButtonActive(e.which, true);
                this._setButtonValue(e.which, true);

                let event : KeyUp = {
                    type: KeyboardEvents.KeyDown,
                    source: this,
                    key: e.which
                };

                this.emit(KeyboardEvents.KeyDown, event);
            }
        }, true);

        window.addEventListener("keyup", (e: KeyboardEvent) => {
            this._setButtonActive(e.which, false);
            this._setButtonValue(e.which, false);

            let event : KeyDown = {
                type: KeyboardEvents.KeyUp,
                source: this,
                key: e.which
            };

            this.emit(KeyboardEvents.KeyUp, event);
        }, true);
    }

    protected _setButtonActive (id: number, active: boolean) : void {
        this._buttonsActive[id] = active;
    }

    public isButtonActive (id: number) : boolean {
        return this._buttonsActive[id] === true;
    }

    public getButtonValue (id: number) : any {
        return this._buttonMap[id];
    }

    protected _setButtonValue (id: number, value: any) : void {
        this._buttonMap[id] = value;
    }

    static getInstance(): Keyboard {
        Keyboard._instance = Keyboard._instance || new Keyboard();
        return Keyboard._instance;
    }
}