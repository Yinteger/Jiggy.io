//Singleton
zen.assets.TextAssetBuilder = function() {

};

zen.assets.TextAssetBuilder.build = function (font, text, maxWidth, height, color) {
	var textViewPort = new zen.ViewPort();
	// document.body.appendChild(textViewPort.canvas);

	var textAsset = new zen.assets.Asset(zen.assets.AssetFactory.TYPES.IMAGE);

	textViewPort.setFont(font);
	textViewPort.setColor(color || "green");
	textViewPort.setTextBaseline("hanging");

	if (!maxWidth) {
		maxWidth = textViewPort.measureText(text).width;
	}

	textViewPort.setSize(maxWidth, height);
	textViewPort.setFont(font);
	textViewPort.setColor(color || "green");
	textViewPort.setTextBaseline("hanging");

	textViewPort.drawText(text, 0, 0, maxWidth);

	textAsset.setData(textViewPort.getImage());

	delete textViewPort;

	return textAsset;
};