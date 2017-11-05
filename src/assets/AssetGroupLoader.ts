import {Asset} from './Asset';
import {AssetType} from './AssetType';
import {AssetGroup} from './AssetGroup';
import {AssetFactory} from './AssetFactory';
import {getInstance} from '../core/Instance';
import {Iterator} from '../utils/Iterator';

export interface AssetGroupDefinition {
    assets: Array<AssetDefinition>;
}

export interface AssetDefinition {
    type: AssetType;
    source: string;
}

export class AssetGroupLoader {
    private _assetFactory: AssetFactory;

    public constructor() {
        this._assetFactory = getInstance().getAssetFactory();
    }

    public load(path: string): Promise<AssetGroup> {
        return new Promise<AssetGroup>((resolve, reject) => {
            var json: Asset = this._assetFactory.build(AssetType.JSON, path);

            json.load().then((asset: Asset) => {
                var data: AssetGroupDefinition = asset.getData();

                var iteartor = new Iterator<AssetDefinition>()
            });
        });
    }
}

