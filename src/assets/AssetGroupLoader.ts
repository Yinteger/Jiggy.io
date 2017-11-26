
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

    /**
     * Loads an AssetGroup defined by a JSON structure.
     * 
     * Expected JSON structure by using the interfaces above:
     * {
     *      assets [
     *          {
     *              name : string,
     *              type : AssetType (use the string value),
     *              source : string
     *          }
     *      ]
     * }
     * 
     * Note, the returned AssetGroup will be in an unloaded state.
     * 
     * The file must be a JSON file.
     * 
     * @param path 
     */
    public load(path: string): Promise<AssetGroup> {
        return new Promise<AssetGroup>((resolve, reject) => {
            var json: Asset = this._assetFactory.build(AssetType.JSON, path);

            json.load().then((assetGroupDefs: Asset) => {
                var data: AssetGroupDefinition = assetGroupDefs.getData();
                resolve(this._createGroup(data));
            }).catch(reject);
        });
    }

    public loadFromAsset(asset: Asset): AssetGroup {
        if (asset.getType() !== AssetType.JSON) {
            throw new Error('loadFromAsset expects a JSON asset.');
        }

        return this._createGroup(asset.getData());
    }

    public loadFromMemory(data: AssetGroupDefinition): AssetGroup {
        return this._createGroup(data);
    }

    private _createGroup(data: AssetGroupDefinition): AssetGroup {
        var iterator: Iterator<AssetDefinition> = new Iterator<AssetDefinition>(data.assets);
        var group: AssetGroup = new AssetGroup();

        while(iterator.hasNext()) {
            var assetDef: AssetDefinition = iterator.next();
            var asset: Asset = this._assetFactory.build(assetDef.type, assetDef.source);
            group.addAsset(assetDef.name, asset);
        }

        return group;
    }
}
