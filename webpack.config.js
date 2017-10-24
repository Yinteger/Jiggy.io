/// <binding ProjectOpened='Watch - Development' />
var WebpackNotifierPlugin = require('webpack-notifier');
var path = require("path");
module.exports = {
	// context: path.join(__dirname + path.sep + "src"),
    entry: "./src/index.ts",
    output: {
        filename: "./dist/pack/engine.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { enforce: 'pre', test: /\.js$/, loader: "source-map-loader" }
        ]
    },
	plugins: [
        new WebpackNotifierPlugin({ alwaysNotify: true, skipFirstNotification: true})
	],
	watchOptions: {
		poll: true
	},
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
    },
};