import {Asset, AssetType} from "./";
import {ViewPort} from "../utils/";

export class  TextAssetBuilder {
	public build (font: string, text: string, maxWidth: number, height: number, color: string) : Asset {
		var textViewPort : ViewPort = new ViewPort();
		var textAsset : Asset = new Asset(AssetType.IMAGE);

		textViewPort.setFont(font);
		textViewPort.setColor(color || "green");
		textViewPort.setTextBaseline("hanging");

		if (!maxWidth) {
			maxWidth = textViewPort.measureText(text).width;
		}

		textViewPort.size = ({width: maxWidth, height});
		textViewPort.setFont(font);
		textViewPort.setColor(color);
		textViewPort.setTextBaseline("hanging");

		textViewPort.drawText(text, 0, 0, maxWidth);

		textAsset.setData(textViewPort.getImage());

		// delete textViewPort;

		return textAsset;
	}
}