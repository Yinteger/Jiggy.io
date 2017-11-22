import {Asset} from '../../src/assets/Asset';
import {Iterator} from '../../src/utils/Iterator';
import {getInstance} from '../../src/core';
import {AudioEngine, AudioEvents} from '../../src/audio';
import {IDGenerator} from '../../src/utils';

export class PlayList {
    private _assets: Array<Asset>;
    private _iterator: Iterator<Asset>;
    private _index: number;
    private _name: string;
    private _id: string;

    public constructor(name: string, list: Array<Asset>) {
        this._assets = list;
        this._name = name;
        this._id = IDGenerator.generate();
        this._iterator = new Iterator<Asset>(this._assets);
        this._index = -1;
        var audioPlayer: AudioEngine = getInstance().getAudioEngine();

        audioPlayer.on(AudioEvents.ENDED, (name: string) => {
            console.log('ended', name);
            if (this._isOurs(name)) {
                setTimeout(() => {
                    this.playNext();
                }, 500);
            }
        });

        // audioPlayer.on('started', (name: string) => {
        //     console.log('started', name);
        // });

        while (this._iterator.hasNext()) {
            var asset: Asset = this._iterator.next();
            this._index++;
            audioPlayer.addAudio(this._getName(), asset, 1);
        }

        this._index = -1;
        this._iterator.setToBeginning();
    }

    private _isOurs(name: string): boolean {
        return name.indexOf(this._id) > -1;
    }

    private _getName(): string {
        console.log(this._name + this._index.toString());
        return this._id + this._name + this._index.toString();
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