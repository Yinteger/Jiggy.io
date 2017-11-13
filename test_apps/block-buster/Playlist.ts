import {Asset} from '../../src/assets/Asset';
import {Iterator} from '../../src/utils/Iterator';
import {getInstance} from '../../src/core';
import {AudioEngine} from '../../src/audio';

export class PlayList {
    private _assets: Array<Asset>;
    private _iterator: Iterator<Asset>;
    private _index: number;
    private _name: string;

    public constructor(name: string, list: Array<Asset>) {
        this._assets = list;
        this._name = name;
        this._iterator = new Iterator<Asset>(this._assets);
        this._index = -1;
        var audioPlayer: AudioEngine = getInstance().getAudioEngine();

        audioPlayer.on('ended', () => {
            console.log('ended');
        });

        audioPlayer.on('started', () => {
            console.log('started');
        });

        audioPlayer.on('stop', () => {
            console.log('stopped');
        });

        while (this._iterator.hasNext()) {
            var asset: Asset = this._iterator.next();
            this._index++;
            audioPlayer.addAudio(this._getName(), asset, 1);
        }

        this._index = -1;
        this._iterator.setToBeginning();
    }

    private _getName(): string {
        return this._name + this._index.toString();
    }

    public playNext(): void {
        var asset: Asset = this._iterator.next();
        this._index++;

        getInstance().getAudioEngine().playAudio(this._getName());

        if (!this._iterator.hasNext()) {
            this._iterator.setToBeginning();
            this._index = -1;
        }
    }
}