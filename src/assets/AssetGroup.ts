import {Asset} from './Asset';
import {AssetState} from './AssetState';
import {getInstance} from '../core/Instance';

export interface AssetMap {
    [key: string]: Asset;
}

export class AssetGroup {
    private _assets: AssetMap;

    public constructor(assetMap: AssetMap = {}) {
        this._assets = assetMap;
    }

    /**
     * Adds an asset to a group.
     * 
     * Note this will not the load the asset.
     * 
     * @param name 
     * @param asset 
     */
    public addAsset(name: string, asset: Asset): void {
        if (this._assets[name]) {
            getInstance().getLogManager().warn(`Asset "${name}" already exists in Asset Group.`);
            return;
        }

        this._assets[name] = asset;
    }

    /**
     * Removes the asset from the group.
     * 
     * This will unload the asset if the asset is loaded.
     * 
     * @param name 
     */
    public removeAsset(name: string): void {
        var asset: Asset = this._assets[name];

        if (!asset) {
            return;
        }

        if (asset.getState() === AssetState.LOADED) {
            asset.unload();
        }

        delete this._assets[name];
    }

    /**
     * 
     * Gets the asset by name.
     * 
     * @param name 
     */
    public getAsset(name: string): Asset {
        return this._assets[name];
    }

    /**
     * Loads all assets in the NOT_LOADED state. Promise will return
     * once all resources are loaded.
     */
    public load(): Promise<void> {
        var promises: Promise<Asset>[] = [];

        for (var name in this._assets) {
            var asset: Asset = this._assets[name];

            if (asset.getState() === AssetState.NOT_LOADED) {
                promises.push(asset.load());
            }
        }

        if (promises.length === 0) {
            return Promise.resolve();
        }

        // Create new Promise to obey typing.
        return new Promise<void>((resolve, reject) => {
            Promise.all(promises).then(() => {
                resolve();
            }).catch(reject);
        });
    }

    /**
     * Unloads all assets in the LOADED state.
     */
    public unload(): Promise<void> {
        var promises: Promise<Asset>[] = [];

        for (var name in this._assets) {
            var asset: Asset = this._assets[name];

            if (asset.getState() === AssetState.LOADED) {
                promises.push(asset.unload());
            }
        }

        if (promises.length === 0) {
            return Promise.resolve();
        }

        // Create new Promise to obey typing.
        return new Promise<void>((resolve, reject) => {
            Promise.all(promises).then(() => {
                resolve();
            }).catch(reject);
        });
    }
}
