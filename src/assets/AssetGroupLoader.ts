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
    name: string;
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

            json.load().then((assetGroupDefs: Asset) => {
                var data: AssetGroupDefinition = assetGroupDefs.getData();

                var iterator: Iterator<AssetDefinition> = new Iterator<AssetDefinition>(data.assets);
                var group: AssetGroup = new AssetGroup();

                while(iterator.hasNext()) {
                    var assetDef: AssetDefinition = iterator.next();
                    var asset: Asset = this._assetFactory.build(assetDef.type, assetDef.source);
                    group.addAsset(assetDef.name, asset);
                }

                resolve(group);
            }).catch(reject);
        });
    }
}
